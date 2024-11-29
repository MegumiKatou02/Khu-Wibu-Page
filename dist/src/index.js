"use strict";
var _a;
(_a = document.getElementById("changeTextBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    const h1 = document.querySelector("h1");
    if (h1.textContent == "Test thoi :3!") {
        h1.textContent = "You clicked the button!";
    }
    else {
        h1.textContent = "dd";
    }
});
