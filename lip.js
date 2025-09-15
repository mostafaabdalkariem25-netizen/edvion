// lib.js

// دالة لاختيار عنصر واحد
function $(selector) {
  return document.querySelector(selector);
}

// دالة لاختيار جميع العناصر المطابقة
function $all(selector) {
  return document.querySelectorAll(selector);
}
