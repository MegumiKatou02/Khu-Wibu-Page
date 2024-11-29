document.getElementById("changeTextBtn")?.addEventListener("click", function() {
  const h1 = document.querySelector("h1")!;
  if(h1.textContent == "Welcome to My Static TypeScript Website!") {
    h1.textContent = "You clicked the button!";
  }
  else {
    h1.textContent = "Welcome to My Static TypeScript Website!";
  }
});
