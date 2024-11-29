document.getElementById("changeTextBtn")?.addEventListener("click", function() {
  const h1 = document.querySelector("h1")!;
  if(h1.textContent == "Test thoi :3!") {
    h1.textContent = "You clicked the button!";
  }
  else {
    h1.textContent = "dd";
  }
});
