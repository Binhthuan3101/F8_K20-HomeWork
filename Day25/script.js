// Dom
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
console.dir(document);
//phương thức truy cập html trong dom

// const btnEl = document.getElementById("btn-open");
// console.log(btnEl);

// const btnEls = document.getElementsByClassName("btn");
// console.log([...btnEls].forEach((btnEl) => {
//     console.log(btnEl)
// }));

// const btnEls = document.getElementsByTagName("button")
const btnOpenEl = document.querySelector("#btn-open");
const btnEls = document.querySelectorAll(".btn");
const parentEl = $(".parent")
const deleteBtnEl=$("#btn-deleted")
// console.log(btnOpenEl);
// console.log(btnEls);
// btnEls[0].remove();
// console.log(btnEls);


// console.log(btnEls);


// console.log(btnOpenEl.innerHTML);

// console.log(btnOpenEl.innerText);
// console.log(btnOpenEl.textContent);


// console.log(btnOpenEl.outerHTML);
// console.log(btnOpenEl.outerText);

// btnOpenEl.outerHTML = "<div>Hello</div>";
// console.log();

btnOpenEl.setAttribute("title", "Open button");
console.log(btnOpenEl.getAttribute("id"));
console.log(btnOpenEl.getAttribute("class"));
console.log(btnOpenEl.getAttribute("title"));
// btnOpenEl.removeAttribute("class");
console.log(btnOpenEl.id);
console.log(btnOpenEl.className);

// btnOpenEl.style = "color: red; background-color: brown !important;";
// btnOpenEl.style.color = "red";
// btnOpenEl.style.backgroundColor = "brown";
// btnOpenEl.className ="text-red-500 bg-blue-500"
// console.log(btnOpenEl.classList.add("text-orange-500!"));
// // console.log(btnOpenEl.classList.remove("bg-blue-400"));
// console.log(btnOpenEl.classList.toggle("scale-150"));
// console.log(btnOpenEl.classList.contains("bg-blue-500"));


const newBtn = document.createElement("button");
newBtn.textContent = "Info Button";
newBtn.className="text-white bg-green-400 px-2 py-1 rounded-md"
// deleteBtnEl.insertAdjacentElement("beforebegin", newBtn)
// deleteBtnEl.insertAdjacentElement("afterend", newBtn)
// parentEl.append(newBtn);
// parentEl.prepend(newBtn);
// parentEl.innerHTML=``

deleteBtnEl.insertAdjacentHTML("afterend", "<button class='bg-green-400 px-2 py-1 text-white rounded-md'>Hello</button>");
const hello = deleteBtnEl.nextElementSibling;
// deleteBtnEl.remove();

//
// const products = [
//     { id: 1, name: "Product 1", price: 100 },
//     { id: 2, name: "Product 2", price: 200 },
//     { id: 3, name: "Product 3", price: 300 }
// ];

// btnOpenEl.onclick = function () {
//     console.log("Open button clicked");
    
// }

function handleClick() {
    console.log("click");
    
}

btnOpenEl.addEventListener("click", handleClick)
btnOpenEl.addEventListener("click", function () {
    console.log("Hello");
    
})

btnOpenEl.addEventListener("click", function () {
    deleteBtnEl.className = "bg-purple-500 text-white rounded-md px-2 py-1";
    deleteBtnEl.innerText = "Thay đổi nút Hello";
})
// btnOpenEl.removeEventListener("click", handleClick)
console.log(btnOpenEl);


deleteBtnEl.addEventListener("click", function () {
    hello.className = "bg-purple-400 text-white rounded-md px-2 py-1";
    hello.innerText = "Xin chào tất cả các bạn";
})