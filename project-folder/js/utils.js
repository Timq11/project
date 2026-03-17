

function generateId() {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU");
}

function calculateCompletedGoals(goals) {
  return goals.filter((goal) => goal.completed).length;
}

function getCategoryStats(goals) {
  const stats = {};
  goals.forEach((goal) => {
    stats[goal.category] = (stats[goal.category] || 0) + 1;
  });
  return stats;
}

function getMostPopularCategory(stats) {
  let max = 0;
  let category = "";
  for (const [key, value] of Object.entries(stats)) {
    if (value > max) {
      max = value;
      category = key;
    }
  }
  return category;
}
