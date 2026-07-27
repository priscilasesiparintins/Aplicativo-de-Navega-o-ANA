const steps = [
  {
    title: "Observe a equação",
    text: "x + 3 = 9. O x é o número que ainda não sabemos.",
  },
  {
    title: "Use a ação inversa",
    text: "Como o 3 está somando, fazemos menos 3 nos dois lados.",
  },
  {
    title: "Mantenha o equilíbrio",
    text: "x + 3 - 3 = 9 - 3. O lado esquerdo fica só com x.",
  },
  {
    title: "Veja a resposta",
    text: "9 - 3 = 6. Então x = 6.",
  },
  {
    title: "Confira",
    text: "Troque x por 6: 6 + 3 = 9. A resposta está correta.",
  },
];

let currentStep = 0;
let currentChallenge = { add: 5, answer: 8, result: 13 };

const stepsEl = document.querySelector("#steps");
const prevStep = document.querySelector("#prevStep");
const nextStep = document.querySelector("#nextStep");
const constantInput = document.querySelector("#constant");
const resultInput = document.querySelector("#result");
const equationPreview = document.querySelector("#equationPreview");
const answer = document.querySelector("#answer");
const challengeText = document.querySelector("#challengeText");
const challengeVisual = document.querySelector("#challengeVisual");
const choices = document.querySelector("#choices");
const feedback = document.querySelector("#feedback");
const newChallenge = document.querySelector("#newChallenge");

function renderSteps() {
  stepsEl.innerHTML = steps
    .map(
      (step, index) => `
        <article class="step ${index === currentStep ? "active" : ""}">
          <span class="step-number">${index + 1}</span>
          <div>
            <strong>${step.title}</strong>
            <p>${step.text}</p>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderEquationTool() {
  const add = Number(constantInput.value);
  const result = Number(resultInput.value);
  const x = result - add;
  equationPreview.textContent = `x + ${add} = ${result}`;
  answer.textContent =
    x > 0
      ? `ANA mostra: x = ${x}, porque ${result} - ${add} = ${x}.`
      : "Ajuste os valores para x ficar maior que zero.";
}

function makeTiles(count) {
  return Array.from({ length: Math.min(count, 12) })
    .map((_, index) => `<span class="tile">${index + 1}</span>`)
    .join("");
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function createChallenge() {
  const add = Math.floor(Math.random() * 7) + 2;
  const solution = Math.floor(Math.random() * 8) + 2;
  const result = add + solution;
  currentChallenge = { add, answer: solution, result };
  feedback.textContent = "";
  challengeText.textContent = `x + ${add} = ${result}`;
  challengeVisual.innerHTML = `<span class="tile variable">x</span>${makeTiles(add)}`;

  const options = shuffle([solution, solution + 1, Math.max(1, solution - 2)]);
  choices.innerHTML = options
    .map((option) => `<button type="button" data-value="${option}">${option}</button>`)
    .join("");
}

function checkAnswer(event) {
  const button = event.target.closest("button");
  if (!button) return;

  const value = Number(button.dataset.value);
  const allButtons = choices.querySelectorAll("button");
  allButtons.forEach((item) => {
    item.disabled = true;
    if (Number(item.dataset.value) === currentChallenge.answer) {
      item.classList.add("correct");
    }
  });

  if (value === currentChallenge.answer) {
    feedback.textContent = "Muito bem! Você manteve o equilíbrio da equação.";
  } else {
    button.classList.add("wrong");
    feedback.textContent = `Quase. Veja a pista: ${currentChallenge.result} - ${currentChallenge.add} = ${currentChallenge.answer}.`;
  }
}

prevStep.addEventListener("click", () => {
  currentStep = Math.max(0, currentStep - 1);
  renderSteps();
});

nextStep.addEventListener("click", () => {
  currentStep = Math.min(steps.length - 1, currentStep + 1);
  renderSteps();
});

constantInput.addEventListener("input", renderEquationTool);
resultInput.addEventListener("input", renderEquationTool);
choices.addEventListener("click", checkAnswer);
newChallenge.addEventListener("click", createChallenge);

renderSteps();
renderEquationTool();
createChallenge();
