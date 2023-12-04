var select = document.getElementById ("header__search-select-js")
var option = document.getElementById("header__search-option-js")
var iconLabel = document.getElementById("iconLabel")
var check = document.getElementById('search__icon-id')
// var input__serachElement = document.getElementById("input__search-id");
// console.log(input__serachElement);
// var placeElement = input__serachElement.getAttribute("placeholder")
// select.onclick = function() {
//     if( a == 1) {
//         option.classList.add("header__search-item--active")
//         iconLabel.innerHTML =  '<i class="fa-solid fa-chevron-up"></i>'
//     }
     
// }
var a = 1;
function addActive() {
        option.classList.add("header__search-item--active")
        iconLabel.innerHTML =  '<i class="fa-solid fa-angle-up"></i>'
}

function removeActive() {
        option.classList.remove("header__search-item--active")
        iconLabel.innerHTML =  '<i class="fa-solid fa-angle-down"></i>'
}
select.addEventListener('click', addActive);
check.addEventListener('click', removeActive);

// if(a == 1){
//     select.addEventListener('click', addActive);
//     a = 0;
// }
// if( a == 0){
//     select.addEventListener('click', removeActive);
//     a = 1
// }


console.log(a);
if(a == 0) {
    console.log('hello')
    }
// select.onclick = function() {
//     if( a == 0) {
//         option.classList.add("header__search-item--active")
//         iconLabel.innerHTML =  '<i class="fa-solid fa-chevron-up"></i>'
//     }
//     a = 1; 
// }

// function removeActive() {
//         option.classList.remove("header__search-item--active")
//         iconLabel.innerHTML =  '<i class="fa-solid fa-angle-up"></i>'
// }
// if(a == 0) {
//     select.addEventListener('click', removeActive)
// }
var bodyE = document.querySelector("body")

console.log(iconLabel)

var selectLabelElement = document.getElementById("title")
var selectItemLabelElement1 = document.getElementById("item-title1")
// console.log(selectItemLabelElement1);
selectItemLabelElement1.onclick = function() {
    selectLabelElement.innerHTML = 'Tất cả hình ảnh'
    option.classList.remove("header__search-item--active")
    input__serachElement.placeholder = "Tìm kiếm tất cả hình ảnh"
    iconLabel.innerHTML =  '<i class="fa-solid fa-angle-down"></i>'

    // removeActive();
}
// selectItemLabelElement1.addEventListener('click', removeActive);
var selectItemLabelElement2 = document.getElementById("item-title2")
// console.log(selectItemLabelElement2)
selectItemLabelElement2.onclick = function() {
    selectLabelElement.innerHTML = "Ảnh" 
    input__serachElement.placeholder = "Tìm kiếm ảnh"
    option.classList.remove("header__search-item--active")
    iconLabel.innerHTML =  '<i class="fa-solid fa-angle-down"></i>'
    // selectLabelElement.innerHTML = selectItemLabelElement2
}
var selectItemLabelElement3 = document.getElementById("item-title3")
selectItemLabelElement3.onclick = function() {
    selectLabelElement.innerHTML = 'Minh họa'  
    input__serachElement.placeholder = "Tìm kiếm minh họa"
    option.classList.remove("header__search-item--active")
    iconLabel.innerHTML =  '<i class="fa-solid fa-angle-down"></i>'
}
var selectItemLabelElement4 = document.getElementById("item-title4")
selectItemLabelElement4.onclick = function() {
    selectLabelElement.innerHTML = 'Vectors'  
    input__serachElement.placeholder = "Tìm kiếm vectors"
    option.classList.remove("header__search-item--active")
    iconLabel.innerHTML =  '<i class="fa-solid fa-angle-down"></i>'
}
var selectItemLabelElement5 = document.getElementById("item-title5")
selectItemLabelElement5.onclick = function() {
    selectLabelElement.innerHTML = 'Video'  
    input__serachElement.placeholder = "Tìm kiếm video"
    option.classList.remove("header__search-item--active")
    iconLabel.innerHTML =  '<i class="fa-solid fa-angle-down"></i>'
}
var selectItemLabelElement6 = document.getElementById("item-title6")
selectItemLabelElement6.onclick = function() {
    selectLabelElement.innerHTML = 'Âm nhạc'  
    input__serachElement.placeholder = "Tìm kiếm âm nhạc"
    option.classList.remove("header__search-item--active")
    iconLabel.innerHTML =  '<i class="fa-solid fa-angle-down"></i>'
}
var selectItemLabelElement7 = document.getElementById("item-title7")
selectItemLabelElement7.onclick = function() {
    selectLabelElement.innerHTML = 'Hiệu ứng âm thanh'  
    input__serachElement.placeholder = "Tìm kiếm âm thanh"
    option.classList.remove("header__search-item--active")
    iconLabel.innerHTML =  '<i class="fa-solid fa-angle-down"></i>'
}
var selectItemLabelElement8 = document.getElementById("item-title8")
selectItemLabelElement8.onclick = function() {
    selectLabelElement.innerHTML = 'Gif'   
    input__serachElement.placeholder = "Tìm kiếm gif"
    option.classList.remove("header__search-item--active")
    iconLabel.innerHTML =  '<i class="fa-solid fa-angle-down"></i>'
}
var selectItemLabelElement9 = document.getElementById("item-title9")
selectItemLabelElement9.onclick = function() {
    selectLabelElement.innerHTML = 'Người dùng' 
    input__serachElement.placeholder = "Tìm kiếm người dùng"
    option.classList.remove("header__search-item--active")
    iconLabel.innerHTML =  '<i class="fa-solid fa-angle-down"></i>'
}