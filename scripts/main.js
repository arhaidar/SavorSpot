const apiKey = "edebe1f3aab54b84b21fed375ef07917";
const apiBaseUrl = "https://api.spoonacular.com";


const search_inp = document.getElementById("searchInput");
const search_but = document.getElementById("searchButton");
const lucky_but = document.getElementById("feelingLuckyButton");

async function search_recipes() {
    const query = search_inp.value.trim();
    if (!query) {
        alert("Please enter a recipe name!");
        return;
    }
    const cook_time = document.getElementById("cookTime").value;
    const dish_type = document.getElementById("dishType").value;
    const difficulty = document.getElementById("difficulty").value;
    const intolerances = document.getElementById("intolerances").value.trim();

    // replace the spaces/delims with a comma for the 
    // API call -> requires comma separation:
    /*          intolerances:	string	gluten	A comma-separated list of intolerances. 
                                All recipes returned must not contain ingredients that are not suitable for people with the intolerances entered. 
                                See a full list of supported intolerances.
    */
    const formatted_intolerances = intolerances ? intolerances.replace(/[\s,]+/g, ",").toLowerCase() : undefined; // https://www.w3schools.com/jsref/jsref_replace.asp

    const params = new URLSearchParams({
        apiKey,
        query,
        maxReadyTime: cook_time !== "none" ? cook_time : undefined,
        type: dish_type !== "none" ? dish_type : undefined,
        intolerances: formatted_intolerances || undefined,
        number: 10, // Number of recipes to fetch
    });

    try {
        const response = await fetch(`${apiBaseUrl}/recipes/complexSearch?${params}`);
        if (!response.ok) {
            resultsContainer.innerHTML = "<p>Error fetching recipes. Please try again later.</p>";
            return;
        }

        const data = await response.json();
        console.log("Search Results:", data);

        localStorage.setItem("searchResults", JSON.stringify(data.results));
        window.location.href = "/results.html"; // redirect to search results
    } catch (error) {
        console.error("Error fetching recipes:", error);
        alert("Something went wrong. Please try again.");
    }
}

async function get_random_recipe() {
    try {
        const response = await fetch(`${apiBaseUrl}/recipes/random?apiKey=${apiKey}&number=1`);
        if (!response.ok) throw new Error("Failed to fetch random recipe!");

        const data = await response.json();
        console.log("Random Recipe:", data);

        // Redirect or Display Recipe
        localStorage.setItem("randomRecipe", JSON.stringify(data.recipes[0]));
        window.location.href = "/randomRecipe.html";
    } catch (error) {
        console.error("Error fetching random recipe:", error);
        alert("Something went wrong. Please try again.");
    }
}

search_but.addEventListener("click", search_recipes);
lucky_but.addEventListener("click", get_random_recipe);