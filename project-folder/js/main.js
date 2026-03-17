// main.js - Логика главной страницы

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

  card.innerHTML = `
        <h3>${goal.title}</h3>
        <p>Категория: ${goal.category}</p>
        <p>Дедлайн: ${formatDate(goal.deadline)}</p>
        <p>Приоритет: ${goal.priority}</p>
        <p>Прогресс: ${goal.progress}%</p>
        <div class="checkbox-container">
            <input type="checkbox" ${goal.completed ? "checked" : ""} onchange="toggleGoalStatus('${goal.id}')">
            <label>Выполнено</label>
        </div>
        <button class="delete-btn" onclick="deleteGoal('${goal.id}')">Удалить</button>
    `;

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
    goal.completed = !goal.completed;
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
