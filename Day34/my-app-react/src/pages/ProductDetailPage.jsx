import { useParams } from "react-router";

export default function ProductDetailPage() {
    const { slug } = useParams();

    return (
        <div>
            <h1>Chi tiết sản phẩm</h1>
            <p>Bạn đang xem sản phẩm: <strong className="text-red-500">{slug}</strong></p>
        </div>
    );
}
