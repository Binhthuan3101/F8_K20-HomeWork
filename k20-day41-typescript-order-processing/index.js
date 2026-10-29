//Bài 3
export function getOrderStatusMessage(status) {
    switch (status) {
        case "pending":
            return "Đơn hàng đang chờ xác nhận";
        case "confirmed":
            return "Đơn hàng đã được xác nhận";
        case "shipping":
            return "Đơn hàng đang được giao";
        case "completed":
            return "Đơn hàng đã giao thành công";
        case "cancelled":
            return "Đơn hàng đã bị hủy";
        default:
            const _exhaustiveCheck = status;
            return _exhaustiveCheck;
    }
}
export function handleOrderResult(result) {
    if (result.status === "success") {
        console.log("Tạo đơn hàng thành công!");
        console.log(`Mã đơn hàng: ${result.data.id}`);
        console.log(`Tổng tiền: ${result.data.totalAmount}`);
    }
    else {
        console.log(`Tạo đơn hàng thất bại: ${result.message}`);
    }
}
//Bài 6
export function findProductById(products, id) {
    return products.find((p) => p.id === id);
}
export function getProductName(product) {
    if (product) {
        return product.name;
    }
    return "Sản phẩm không tồn tại";
}
export function formatPhone(phone) {
    if (!phone || phone.trim() === "") {
        return "Chưa cập nhật";
    }
    return phone.trim();
}
//Bài  7
let orderIdCounter = 1000;
function generateOrderId() {
    return ++orderIdCounter;
}
function createOrder(user, products, cart, shippingInfo, paymentMethod, metadata) {
    if (!user) {
        return {
            status: "error",
            message: "Người dùng không tồn tại",
        };
    }
    if (!cart || cart.length === 0) {
        return { status: "error", message: "Giỏ hàng không được để trống." };
    }
    const productIdsSeen = new Set();
    for (const item of cart) {
        if (productIdsSeen.has(item.productId)) {
            return {
                status: "error",
                message: `Sản phẩm với mã ${item.productId} xuất hiện nhiều lần trong giỏ hàng.`,
            };
        }
        productIdsSeen.add(item.productId);
    }
    let totalAmount = 0;
    const orderItems = [];
    for (const cartItem of cart) {
        if (typeof cartItem.quantity !== "number" ||
            !Number.isInteger(cartItem.quantity) ||
            cartItem.quantity <= 0) {
            return {
                status: "error",
                message: `Số lượng mua cho sản phẩm ${cartItem.productId} không hợp lệ.`,
            };
        }
        const product = findProductById(products, cartItem.productId);
        if (!product) {
            return {
                status: "error",
                message: `Sản phẩm với mã ${cartItem.productId} không tồn tại.`,
            };
        }
        if (typeof product.price !== "number" ||
            isNaN(product.price) ||
            product.price < 0 ||
            !Number.isFinite(product.price)) {
            return {
                status: "error",
                message: `Giá sản phẩm ${product.name} không hợp lệ`,
            };
        }
        if (typeof product.stock !== "number" ||
            !Number.isInteger(product.stock) ||
            product.stock < 0) {
            return {
                status: "error",
                message: `Tồn kho sản phẩm ${product.name} không hợp lệ.`,
            };
        }
        if (cartItem.quantity > product.stock) {
            return {
                status: "error",
                message: `Sản phẩm ${product.name} vượt quá số lượng tồn kho.`,
            };
        }
        totalAmount += product.price * cartItem.quantity;
        orderItems.push({
            productId: product.id,
            productName: product.name,
            quantity: cartItem.quantity,
            uniPrice: product.price,
        });
    }
    if (!shippingInfo.receiverName || shippingInfo.receiverName.trim() === "") {
        return { status: "error", message: "Tên người nhận không được để trống." };
    }
    if (!shippingInfo.receiverPhone || shippingInfo.receiverPhone.trim() === "") {
        return {
            status: "error",
            message: "Số điện thoại người dùng không được để trống.",
        };
    }
    if (!shippingInfo.address || shippingInfo.address.trim() === "") {
        return {
            status: "error",
            message: "Địa chỉ giao hàng không được để trống.",
        };
    }
    const cleanedShippingInfo = {
        receiverName: shippingInfo.receiverName.trim(),
        receiverPhone: shippingInfo.receiverPhone.trim(),
        address: shippingInfo.address.trim(),
    };
    const newOrder = {
        id: generateOrderId(),
        userId: user.id,
        items: orderItems,
        totalAmount: totalAmount,
        status: "pending",
        paymentMethod: paymentMethod,
        createdAt: new Date(),
        receiverName: cleanedShippingInfo.receiverName,
        receiverPhone: cleanedShippingInfo.receiverPhone,
        address: cleanedShippingInfo.address,
        ...(metadata ? { metadata } : {}),
    };
    return { status: "success", data: newOrder };
}
// Bài 8
const users = [
    {
        id: 1,
        fullname: "Nguyễn Văn A",
        email: "an@example.com",
        phone: "09901234567",
    },
];
const products = [
    {
        id: 101,
        name: "Laptop",
        price: 15000000,
        stock: 5,
        category: "computer",
    },
    {
        id: 102,
        name: "Wireless Mouse",
        price: 350000,
        stock: 10,
        category: "accessory",
    },
];
const cart = [
    { productId: 101, quantity: 1 },
    { productId: 102, quantity: 2 },
];
const shippingInfo = {
    receiverName: "Nguyễn Văn B",
    receiverPhone: "0912334567",
    address: "Hà Nội",
};
const paymentMethod = "COD";
const metadata = {
    note: "Giao hàng vào buổi sáng",
    couponCode: "WELCOME10",
};
const currentUser = users[0];
const orderResult = createOrder(currentUser, products, cart, shippingInfo, paymentMethod, metadata);
handleOrderResult(orderResult);
