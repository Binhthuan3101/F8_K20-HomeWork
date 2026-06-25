//Thêm và xóa phần tử trong mảng
const numbers = [1, 2, 3, 4, 5, 6, ,];
// thêm phần tử ở cuối
numbers.push(6);
// thêm phần tử ở đầu
numbers.unshift(0);
// xóa phần tử cuối mảng
numbers.pop();
// xóa phần tử đầu mảng
numbers.shift();
// tạo phần tử empty
// delete numbers[1];
console.log(numbers);


// Duyệt mảng
const numbers1 = [1, 2, 3, 4, 5, 6];
for (const number of numbers1) {
    console.log(number);
}

numbers1.forEach((number) => {
    console.log("Giá trị", number);
    // console.log("Số thứ tự", index);
    
});

let items = ["bút", "sách", "vở", "Thước"];

console.log(items.find((item) => {
    if (item==="vở") {
        return true;
    }
    return false;
}));

console.log(items.findIndex(item=>item==="vở"));
console.log(items.includes("bút"));

console.log(items.some(item => {
    if (item === "vở") {
        return true;
    }
    return false;
}));


console.log(items.every(item => {
    if (item.length >= 2) {
        return true;
    }
    return false;
}));


// lọc và biến đổi
let scores = [45, 78, 90, 33, 62, 88];
//lọc ra các điểm số lớn hơn 50
console.log(scores.filter(score => {
    return score > 50 ? true : false;
}));


//Cộng thêm 5 mỗi điểm
console.log(scores.map(score => {
    return score + 5;
}));

//Phương thức sắp xếp mảng
let names = ["Nam", "Anh", "Lan", "Bình"];
console.log(
names.sort()
);
//sắp xếp mảng số theo thứ tự tăng dần
let numbers2 = [5, 20, 1, 100, 3];
console.log(numbers2.sort((a, b) => {
    return a - b;
}));
//giảm dần
console.log(numbers2.sort((a, b) => {
    return b - a;
}));
//Đảo ngược
console.log(numbers2.reverse());

//Tách nối và sao chép các phần tử trong mảng
const fruits = ["banana", "apple", "orange", "mango", "kiwi"];
console.log(fruits.slice(1, 4));
console.log(fruits.slice(1));
console.log(fruits.slice(-5, -1));
console.log(fruits.slice(0));

const newFruits = fruits.slice();
console.log(newFruits);

newFruits.splice(2, 1, "grape");
console.log(newFruits);

newFruits.splice(3, 1);
console.log(newFruits);
//Nối hai mảng
const fruits2 = ["grape", "pear"];
const newFruits2 = fruits.concat(fruits2);
console.log(newFruits2);

//nối mảng thành chuỗi và ngược lại
console.log("Danh sách các loại trái cây: ", fruits.join(", "));
console.log(newFruits2.join(", "));

const fruitsString = "banana, apple, orange, mango, kiwi, grape, pear";
const fruitsArray = fruitsString.split(" ");
console.log(fruitsArray);
