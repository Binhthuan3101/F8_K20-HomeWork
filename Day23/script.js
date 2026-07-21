// // Scope, Date, Temporal, Error trong JavaScript
// console.log(new Date());
// // Ngày 20 tháng 7 năm 2026
// const date = new Date("2026-07-20")
// console.log(date);

// // Lấy thời gian hiện tại
// console.log(Date.now());

// console.log(Date.parse(date));

// const date = new Date();
// console.log(date.getFullYear());
// console.log(date.getMonth());
// console.log(date.getDate());

// console.log(date.getDay());
// console.log(date.getHours());
// console.log(date.getMinutes());
// console.log(date.getSeconds());
// console.log(date.getMilliseconds());
// console.log(date.getTime()-Date.now());

// console.log(date.getUTCFullYear());
// console.log(date.getUTCMonth());
// console.log(date.getUTCDate());

// console.log(date.getUTCDay());
// console.log(date.getUTCHours());
// console.log(date.getUTCMinutes());
// console.log(date.getUTCSeconds());
// console.log(date.getUTCMilliseconds());
// console.log(date.getTime() - Date.now());

// const dayInWeek = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
// const date = new Date("2026-07-19T00:00:00+07:00");
// console.log(`Bây giờ là: ${date.getHours()} giờ ${date.getMinutes()} phút ${date.getSeconds()} giây, ${dayInWeek[date.getDay()]} ngày ${date.getDate()} tháng ${date.getMonth()} năm ${date.getFullYear()}`)

// console.log(date.getTimezoneOffset());

// const date = new Date();
// const futureDate= new Date(Date.now() + 3600 * 1000)
// console.log(futureDate * date);

// date.setFullYear(2025);
// date.setMonth(10);
// date.setDate(15);
// date.setHours(20);
// date.setMinutes(30);
// date.setSeconds(45);
// date.setMilliseconds(500);
// date.setTime(Date.now()-60*60*1000)
// console.log(date);

// // Scope
// // Global Scope
// const a = 10;

// // function Scope
// function greeting() {
//     const string = "Hello";
//     console.log(string);
    
// }

// greeting();
// // Block Scope
// if (true) {
//     const b = 10;
//     console.log(b);
    
// }

// for (let i = 0; i < 5; i++){
//     console.log(i);
    
// }

// while (true) {
//     break;
// }
// {
//     const c = 30;
//     var d = 50;
// }
// console.log(d);


let a = 10;
{
    var b = 20;
    {
        const c = 30;
        {
            function test() {
                let d = 40;
                {
                    console.log(c);
                    
                }
            }
           
        }
    } test();
}
console.dir(Date)
console.log(Temporal);
console.log(Temporal.Instant.from("2026-07-20T20:55:00+07:00").
epochMilliseconds
);
console.dir(new Date("2026-07-20T20:55:00+07:00"));
