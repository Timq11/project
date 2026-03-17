

function getGoals() {
  const goals = localStorage.getItem("goals");
  return goals ? JSON.parse(goals) : [];
}

function saveGoals(goals) {
  localStorage.setItem("goals", JSON.stringify(goals));
}

function initializeGoals() {
  if (getGoals().length === 0) {
    const initialGoals = [
      {
        id: "1",
        title: "Подготовить проект по JavaScript",
        category: "Study",
        deadline: "2026-03-25",
        priority: "High",
        progress: 60,
        description: "Сделать все страницы и подключить localStorage",
        completed: false,
        createdAt: "2026-03-17",
      },
      {
        id: "2",
        title: "Начать бегать 3 раза в неделю",
        category: "Health",
        deadline: "2026-04-15",
        priority: "Medium",
        progress: 30,
        description: "Постепенно развивать дисциплину",
        completed: false,
        createdAt: "2026-03-17",
      },
      {
        id: "3",
        title: "Накопить на новый телефон",
        category: "Finance",
        deadline: "2026-06-01",
        priority: "High",
        progress: 50,
        description: "Откладывать часть дохода каждую неделю",
        completed: false,
        createdAt: "2026-03-17",
      },
    ];
    saveGoals(initialGoals);
  }
}
