// Error , classes, DOM
// Error
// const encodedURL = encodeURI("https://f8.edu.vn");
// console.log(decodeURI(encodedURL+"%%"));

// try {
//   // console.log(x);
//   console.log("Hello");

//   // throw new Error("Có lỗi xảy ra")
// } catch (error) {
//   console.log("Lỗi");
// } finally {
//   console.log("Hoàn thành");
// }

// Classes
//

// class User {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }


const User = class {
    
    constructor(name, age) {
        this._name = name;
        this._age = age;
    }
    info() {
        console.log(`Tên: ${this._name} tuổi: ${this._age}`);
        
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
}

const user1 = new User("Nguyễn Văn A", 20);
const user2 = new User("Nguyễn Thị B", 19);
user1.info();
user2.info();
console.log(User.address);


class Staff extends User{
    constructor(name, age, role) {
        super(name, age);
        this.role = role;
    }
    showRank() {
        console.log(this);
        
    }
}
const staff1 = new Staff("Nguyễn Văn B", 20, "Nhân viên marketing");
staff1.info();
const func = staff1.showRank;
func();
// class Staff extends User{
//     info() {
//         console.log("hi");
        
//     }
//     info(greeting) {
//         if (greeting) {
//             console.log(greeting);
            
//         }
//         console.log("Hi");
        
//     }
// }

// const staff = new Staff("Staff 1", 20);
// staff.info();
// staff.info("Good morning")
// const user = new User("Nguyễn Văn A", 20);
// console.log(user);
// //Lập trình tuần tự và lập trình hướng đối tượng
// // Tính đóng gói , kế thừa, đa hình, trừu tượng

// const userName = "Nguyễn Văn A";
// const productName = "Sản phẩm 1";
// const price = 1000000;
// const age = 20;
// const categories = ["Màn hình", "Bàn phím"];

// //tính trừu tượng
// class send{

// }
// class sendEmail{
    
// }

// class sendSMS{
    
// }