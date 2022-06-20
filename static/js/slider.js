const slider = document.querySelector(`input[type="range"]`);
const output = document.querySelector("output");

output.textContent = "€" + " " + parseInt(slider.value).toLocaleString("nl-NL")

slider.addEventListener("input", (e) => {
  budget = e.target.value
  let formatedBudget = parseInt(budget).toLocaleString("nl-NL")
  output.textContent = "€" + " " + formatedBudget
});

