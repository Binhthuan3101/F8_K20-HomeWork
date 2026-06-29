console.log("Hello world!");


const name1 = "John";
const name2 = 'John';
const name3 = `john`;
const name4 = "Jo\"hn";

const name5 = new String("John");
const name6 = new String("John");
const name = "John Doe Hello";
const temp = new String("John Doe");
console.log(name5);
console.log(name6 == name5);
/*
\b backspace
\n Xuống dòng
\f form feed
\r Carriage return
\t tab ngang
\v tab dọc
 */

console.log(temp.length);
console.log(name.length);

// Hủy biến tạm
// temp = null;
// Độ dài chuỗi
console.log(name1.length);

// Phương thức truy xuất ký tự trong chuỗi
console.log(name1.at(-1));
console.log(name1.charAt(-1));
console.log(name1[0]);
// lấy sô kí tư unicode
console.log(name.charCodeAt(0));
console.log(name.codePointAt(0));


// Phương thức truy xuất chuỗi con
// slice
console.log(name.slice(0, 4));
console.log(name.slice(-3));
console.log(name.substring(1, 4));
console.log(name.substr(1, 1));

// Phương thức tìm kiếm trong chuỗi
console.log(name.indexOf("o"));
console.log(name.lastIndexOf("o"));
console.log(name.search("o"));
console.log(name.includes("o"));
console.log(name.match("o"));
console.log(name.matchAll("o"));
console.log(name.startsWith("Jo",0));
console.log(name.endsWith("oe",8));

// PHương thức nối chuỗi
console.log(name.concat(", ","Jane"));

const numbers = "123"
// Phương thức làm đầy chuỗi
console.log(numbers.padStart(5, "0"));
console.log(numbers.padEnd(5,"0"));

// Phương thức khác
// trim cắt tất cả các dấu cách
console.log(name.trim());
console.log(name.trimStart());
console.log(name.trimEnd());

// Viết thường viết hoa
console.log(name.toLowerCase());
console.log(name.toUpperCase());

// chuyển chuỗi thành mảng
console.log(name.split("e"));

console.log(name.replace("o", "a"));
console.log(name.replaceAll(/o/g, "a"));



const paragraph = `Mình từng tích hợp OpenAI API vào một app nội bộ, chạy ngon 2 tháng đầu. Tháng thứ 3, hóa đơn tăng gấp đôi vì context window dài hơn mình ước tính. Đó là lúc mình nhận ra: chọn API không phải chỉ là "cái nào xịn hơn" - mà là cái nào phù hợp với use case và ngân sách của bạn.

Hiện tại có 3 nhà cung cấp đang chiếm phần lớn thị phần AI API cho developer: OpenAI (GPT-4o, o1), Anthropic (Claude 3.5 Sonnet/Haiku), và Google (Gemini 1.5 Pro/Flash). Ba cái tên này xuất hiện trong hầu hết mọi tech stack khi team muốn thêm AI vào sản phẩm web.

Bài này mình sẽ không nói "API X tốt nhất" vì không có câu trả lời chung. Thay vào đó, mình sẽ đi qua từng tiêu chí mà dev web thực sự cần quan tâm: chất lượng đầu ra, context window, multimodal, và chi phí triển khai.`;
console.log(paragraph.replaceAll("\n\n", " ").replaceAll("AI","XXX"));

const fullname = "nguyen van a";
//Nguyen Van A
console.log(fullname.split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" "));







