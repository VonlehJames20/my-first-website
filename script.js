
const habits = [
  "Coding",
  "Going to work",
  "Reading self-help books / Bible",
  "Practicing public speaking",
  "Exercise",
  "Avoiding social media"
];

const todayKey = new Date().toLocaleDateString("en-CA");
const storageKey = "habits-" + todayKey;

let completed = JSON.parse(localStorage.getItem(storageKey)) || [];

const habitList = document.getElementById("habitList");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const todayDate = document.getElementById("todayDate");
const resetBtn = document.getElementById("resetBtn");

todayDate.textContent = new Date().toDateString();

function saveProgress() {
  localStorage.setItem(storageKey, JSON.stringify(completed));
}

function toggleHabit(index) {
  if (completed.includes(index)) {
    completed = completed.filter(function (i) {
      return i !== index;
    });
  } else {
    completed.push(index);
  }
  saveProgress();
  render();
}

function updateProgress() {
  const percent = (completed.length / habits.length) * 100;
  progressText.textContent = completed.length + " of " + habits.length + " habits done";
  progressFill.style.width = percent + "%";
}

function render() {
  habitList.innerHTML = "";

  habits.forEach(function (habit, index) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "habit" + index;
    checkbox.checked = completed.includes(index);
    checkbox.addEventListener("change", function () {
      toggleHabit(index);
    });

    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.textContent = habit;

    if (checkbox.checked) {
      li.classList.add("done");
    }

    li.appendChild(checkbox);
    li.appendChild(label);
    habitList.appendChild(li);
  });

  updateProgress();
}

resetBtn.addEventListener("click", function () {
  completed = [];
  saveProgress();
  render();
});

render();