document.addEventListener("DOMContentLoaded", async () => {
    const apiKey = "3d91f234c65044319765466987a45926"; 
    const apiBaseUrl = "https://api.spoonacular.com";

    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get("id");
    if (!recipeId) {
        document.body.innerHTML = "<p>Error: Recipe ID is missing in the URL!</p>";
        return;
    }
    try {
        // once we the recipe id -> fetch the recipe details from the api -> recipe section of spoonacular
        const response = await fetch(`${apiBaseUrl}/recipes/${recipeId}/information?apiKey=${apiKey}`);
        if (!response.ok){
            throw new Error("Failed to fetch recipe details.");
        }

        const recipe = await response.json();

        const recipeContainer = document.createElement("div");
        recipeContainer.classList.add("recipe-details");

        recipeContainer.innerHTML = `
            <h1>${recipe.title}</h1>
            <img src="${recipe.image}" alt="${recipe.title}">
            <p><strong>Servings:</strong> ${recipe.servings}</p>
            <p><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>
            <h2>Ingredients:</h2>
            <ul>
                ${recipe.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join("")}
            </ul>
            <h2>Instructions:</h2>
            <p>${recipe.instructions || "No instructions available."}</p>
        `;

        document.body.appendChild(recipeContainer);
    } 
    catch (error) {
        console.error("Error fetching recipe details:", error);
        document.body.innerHTML = "<p>Error loading recipe details. Please try again later.</p>";
    }
});
