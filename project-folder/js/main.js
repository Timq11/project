document.addEventListener("DOMContentLoaded", function () {
  initializeGoals();
  renderGoals();

  document.getElementById("search").addEventListener("input", filterGoals);
  document
    .getElementById("categoryFilter")
    .addEventListener("change", filterGoals);
  document
    .getElementById("statusFilter")
    .addEventListener("change", filterGoals);
});

function renderGoals(goalsToRender = null) {
  const goals = goalsToRender || getGoals();
  const container = document.getElementById("goalsContainer");
  container.innerHTML = "";

  if (goals.length === 0) {
    container.innerHTML =
      '<p>Нет целей. <a href="form.html">Добавить первую цель</a></p>';
    return;
  }

  goals.forEach((goal) => {
    const goalCard = createGoalCard(goal);
    container.appendChild(goalCard);
  });
}

function createGoalCard(goal) {
  const card = document.createElement("div");
  card.className = `goal-card ${goal.completed ? "completed" : ""}`;

  const completedLabel = goal.completed ? "Выполнено" : "";

  card.innerHTML = `
        <h3><i class="fas fa-bullseye"></i> ${goal.title}</h3>
        <p>Категория: ${goal.category}</p>
        <p>Дедлайн: ${formatDate(goal.deadline)}</p>
        <p>Приоритет: ${goal.priority}</p>
        <div class="progress">
          <div class="progress-bar" style="width: ${goal.progress}%"></div>
        </div>
        <p>Прогресс: <span class="progress-percent">${goal.progress}%</span></p>
        <div class="progress-controls">
          <input type="range" class="progress-slider" min="0" max="100" value="${goal.progress}" data-id="${goal.id}">
          <span class="progress-slider-value">${goal.progress}%</span>
        </div>
        <div class="checkbox-container">
            <div class="checkbox-wrapper">
              <input id="goal-${goal.id}" type="checkbox" ${goal.completed ? "checked" : ""} ${goal.progress == 100 ? "disabled" : ""} onchange="toggleGoalStatus('${goal.id}')">
              <label for="goal-${goal.id}">Маркер</label>
            </div>
            <span class="status-text">${completedLabel}</span>
        </div>
        <button class="delete-btn" onclick="deleteGoal('${goal.id}')"><i class="fas fa-trash"></i> Удалить</button>
    `;

  const slider = card.querySelector(".progress-slider");
  const sliderValue = card.querySelector(".progress-slider-value");
  const progressBar = card.querySelector(".progress-bar");
  const progressPercent = card.querySelector(".progress-percent");
  const statusText = card.querySelector(".status-text");

  slider.addEventListener("input", function () {
    const value = Number(this.value);
    sliderValue.textContent = `${value}%`;
    progressBar.style.width = `${value}%`;
    progressPercent.textContent = `${value}%`;

    const goals = getGoals();
    const current = goals.find((g) => g.id === this.dataset.id);
    if (current) {
      current.progress = value;
      current.completed = value === 100;
      const checkbox = card.querySelector("input[type='checkbox']");
      if (current.completed) {
        statusText.textContent = "Выполнено";
        card.classList.add("completed");
        checkbox.checked = true;
        checkbox.disabled = true;
      } else {
        statusText.textContent = "";
        card.classList.remove("completed");
        checkbox.checked = false;
        checkbox.disabled = false;
      }
      saveGoals(goals);
    }
  });

  return card;
}

function deleteGoal(id) {
  if (confirm("Вы уверены, что хотите удалить эту цель?")) {
    const goals = getGoals();
    const updatedGoals = goals.filter((goal) => goal.id !== id);
    saveGoals(updatedGoals);
    renderGoals();
  }
}

function toggleGoalStatus(id) {
  const goals = getGoals();
  const goal = goals.find((g) => g.id === id);
  if (goal) {
    if (goal.progress == 100 && goal.completed) {
      // Если прогресс 100%, нельзя убирать маркер
      return;
    }
    goal.completed = !goal.completed;
    if (goal.completed) {
      goal.progress = 100;
    }
    saveGoals(goals);
    renderGoals();
  }
}

function filterGoals() {
  const searchTerm = document.getElementById("search").value.toLowerCase();
  const categoryFilter = document.getElementById("categoryFilter").value;
  const statusFilter = document.getElementById("statusFilter").value;

  let goals = getGoals();

  if (searchTerm) {
    goals = goals.filter((goal) =>
      goal.title.toLowerCase().includes(searchTerm),
    );
  }

  if (categoryFilter) {
    goals = goals.filter((goal) => goal.category === categoryFilter);
  }

  if (statusFilter) {
    if (statusFilter === "active") {
      goals = goals.filter((goal) => !goal.completed);
    } else if (statusFilter === "completed") {
      goals = goals.filter((goal) => goal.completed);
    }
  }

  renderGoals(goals);
}
