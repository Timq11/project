document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("goalForm");
  form.addEventListener("submit", handleFormSubmit);

  const progressRange = document.getElementById("progressRange");
  const progressValue = document.getElementById("progressValue");

  if (progressRange && progressValue) {
    const updateProgressLabel = () => {
      progressValue.textContent = progressRange.value + "%";
    };

    progressRange.addEventListener("input", updateProgressLabel);
    updateProgressLabel();
  }
});

function validateForm(formData) {
  const errors = [];

  if (!formData.title.trim()) {
    errors.push("Название цели не может быть пустым");
  }

  if (!formData.category) {
    errors.push("Выберите категорию");
  }

  if (!formData.deadline) {
    errors.push("Укажите дедлайн");
  }

  if (!formData.priority) {
    errors.push("Выберите приоритет");
  }

  const progress = parseInt(formData.progress);
  if (isNaN(progress) || progress < 0 || progress > 100) {
    errors.push("Прогресс должен быть числом от 0 до 100");
  }

  return errors;
}

function createGoalObject(formData) {
  return {
    id: generateId(),
    title: formData.title.trim(),
    category: formData.category,
    deadline: formData.deadline,
    priority: formData.priority,
    progress: parseInt(formData.progress),
    description: formData.description.trim(),
    completed: false,
    createdAt: new Date().toISOString().split("T")[0],
  };
}

function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  const errors = validateForm(data);

  if (errors.length > 0) {
    alert("Ошибки валидации:\n" + errors.join("\n"));
    return;
  }

  const newGoal = createGoalObject(data);
  const goals = getGoals();
  goals.push(newGoal);
  saveGoals(goals);

  alert("Цель успешно добавлена!");
  window.location.href = "index.html";
}
