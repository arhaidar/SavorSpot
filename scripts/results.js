document.addEventListener("DOMContentLoaded", () => {
    const resultsContainer = document.getElementById("resultsContainer");
    const results = JSON.parse(localStorage.getItem("searchResults"));

    if (!results || results.length === 0) {
        resultsContainer.innerHTML = "<p>No recipes found. Try refining your search!</p>";
        return;
    }

    resultsContainer.innerHTML = results.map(recipe => `
        <div class="recipe-card">
            <img src="${recipe.image}" alt="${recipe.title}">
            <h2>${recipe.title}</h2>
            <a href="/recipeDetails.html?id=${recipe.id}" class="view-button">View Recipe</a>
        </div>
    `).join("");
});
