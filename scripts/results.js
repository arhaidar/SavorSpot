document.addEventListener("DOMContentLoaded", () => {
    const resultsContainer = document.getElementById("resultsContainer");
    const results = JSON.parse(localStorage.getItem("searchResults"));

    if (!results || results.length === 0) {
        resultsContainer.innerHTML = "<p>No recipes found. Try refining your search!</p>";
        return;
    }
    // only get the recipes that have valid image -> dont shw just alt text in case of no image
    const filteredResults = results.filter(recipe => recipe.image && recipe.image.trim() !== "");
    if(filteredResults.length === 0){ // no recipes with valid images
        resultsContainer.innerHTML = "<p>No recipes with valid images found. Try refining your search!</p>";
        return;
    }
    resultsContainer.innerHTML = filteredResults.map(recipe => `
        <div class="recipe-card">
            <img src="${recipe.image}" alt="${recipe.title}">
            <h2>${recipe.title}</h2>
            <a href="https://arhaidar.github.io/SavorSpot/pages/recipeDetails.html?id=${recipe.id}" class="view-button">View Recipe</a>
        </div>
    `).join("");
});
