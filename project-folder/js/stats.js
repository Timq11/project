

document.addEventListener("DOMContentLoaded", function () {
  renderStats();
});

function renderStats() {
  const goals = getGoals();
  const container = document.getElementById("statsContainer");

  const totalGoals = goals.length;
  const completedGoals = calculateCompletedGoals(goals);
  const activeGoals = totalGoals - completedGoals;
  const categoryStats = getCategoryStats(goals);
  const mostPopularCategory = getMostPopularCategory(categoryStats);
  const completionPercentage =
    totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  container.innerHTML = `
        <div class="stat-card">
            <h3>Всего целей</h3>
            <p>${totalGoals}</p>
        </div>
        <div class="stat-card">
            <h3>Выполнено</h3>
            <p>${completedGoals}</p>
        </div>
        <div class="stat-card">
            <h3>Активные</h3>
            <p>${activeGoals}</p>
        </div>
        <div class="stat-card">
            <h3>Процент выполнения</h3>
            <p>${completionPercentage}%</p>
        </div>
        <div class="stat-card">
            <h3>Самая популярная категория</h3>
            <p>${mostPopularCategory || "Нет данных"}</p>
        </div>
    `;

  
  if (Object.keys(categoryStats).length > 0) {
    const categoryStatsHtml = Object.entries(categoryStats)
      .map(
        ([category, count]) =>
          `<div class="stat-card"><h3>${category}</h3><p>${count}</p></div>`,
      )
      .join("");
    container.innerHTML += categoryStatsHtml;
  }
}
