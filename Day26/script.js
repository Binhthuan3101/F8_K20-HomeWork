const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// const activeItem = $(".active");
// // console.log(activeItem);

// // // phần tử trước
// // console.log(activeItem.previousElementSibling);

// // //phần tử tiếp theo
// // console.log(activeItem.nextElementSibling);

// // //lấy cha
// // console.log(activeItem.parentElement);

// // //lấy con đầu tiên
// // console.log(activeItem.parentElement.firstElementChild);
// // //lấy con cuối cùng
// // console.log(activeItem.parentElement.lastElementChild);

// const eventMethodList = $(".event-method-list");
// // const liEls = $$(".event-method-list li");
// // console.log(eventMethodList.children[0]);

// // console.log(eventMethodList.closest());
// // eventMethodList.addEventListener("click", (e) => {
// //   console.log(e.currentTarget);
// // });

// const userForm = $("#name");
// // userForm.addEventListener("submit", (e) => {
// //   console.log(e.preventDefault());
// // });

// // activeItem.addEventListener("click", (e) => {
// //   console.log("Click ở phần tử con");
// // });

// // eventMethodList.addEventListener(
// //   "click",
// //   (e) => {
// //     console.log("Click ở phần tử cha");
// //   },
// //   { capture: true },
// // );

// // window.addEventListener("click", (e) => {
// //   console.log("Click ở phần tử window");
// // });


// //Event Delegation
// //gan 1 listener lên parent, dùng event.target

// activeItem.addEventListener("click", e => {
//     console.log(e);
    
// })

// // Nhóm event
// // Mouse/

// const userInput = $(".user-input");

// eventMethodList.addEventListener("mouseleave", e => {
//     console.log("Con trỏ chuột đang rời khỏi phần tử con");
    
// })
// eventMethodList.onMouseLeave = e => {
//     console.log("COn trỏ chuột đang rời đi");
// }
// eventMethodList.addEventListener("mouseover", e => {
//     console.log("Con trỏ chuột ở trên phần tử con");
    
// })


// // Sụ kiện pointer
// //event touch

// console.log(eventMethodList);
// //keyboard: keydown, keyup, keypress

const checkAll = $("#check-all");

const inputAll = $("#input-all");
const inputs = $$(".input-todo");
let checkedTodoNum = 0;
const checkedNum = $("#checked-num");
const todoList=$("#todo-list")
inputAll.addEventListener("change", e => {
    
    inputs.forEach(input => {
        input.checked = inputAll.checked;
    });
    if (inputAll.checked) {
        checkedTodoNum = inputs.length;
    }
    else {
        checkedTodoNum = 0;
    }
    checkedNum.textContent = checkedTodoNum;
})

inputs.forEach(input => {
    input.addEventListener("change", () => {
        checkedTodoNum += input.checked ? 1 : -1;
        checkedNum.textContent = checkedTodoNum; 
        switch (true) {
            case checkedTodoNum === inputs.length:
                inputAll.checked = true;
                inputAll.indeterminate = false; 
                break;
            case checkedTodoNum === 0:
                inputAll.checked = false;
                inputAll.indeterminate = false; 
                break;
            default:
                inputAll.checked = false;
                inputAll.indeterminate = true;
        }
        
    })
})