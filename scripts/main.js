const apiKey = "edebe1f3aab54b84b21fed375ef07917";
const apiBaseUrl = "https://api.spoonacular.com";


const search_inp = document.getElementById("searchInput");
const search_but = document.getElementById("searchButton");
const lucky_but = document.getElementById("feelingLuckyButton");

async function search_recipes() {
    console.log("search_recipes function called!"); // Debugging log
    const query = search_inp.value.trim();
    if (!query) {
        alert("Please enter a recipe name!");
        return;
    }
    const cook_time = document.getElementById("cookTime").value.trim();
    let max_ready_time;
    //DEBUG
    if (cook_time !== "none") {
        max_ready_time = parseInt(cook_time, 10);
        if (isNaN(max_ready_time)) {
            console.log("cook time wasn't a valid number: " + cook_time);
            max_ready_time = undefined; 
        } else {
            console.log("max_ready_time: " + max_ready_time);
        }
    } else {
        console.log("No specific cook time selected: " + cook_time);
        max_ready_time = undefined; // skip this parameter
    }

    

    const dish_type = document.getElementById("dishType").value;
    const difficulty = document.getElementById("difficulty").value;
    const intolerances = document.getElementById("intolerances").value.trim();

    // replace the spaces/delims with a comma for the API call -> requires comma separation:
    /*  
        intolerances:	        string	gluten	A comma-separated list of intolerances. 
                                All recipes returned must not contain ingredients that are not suitable for people with the intolerances entered. 
                                See a full list of supported intolerances.
    */
    const formatted_intolerances = intolerances ? intolerances.replace(/[\s,]+/g, ",").toLowerCase() : undefined; // https://www.w3schools.com/jsref/jsref_replace.asp

    // how to exlclude parameters to API call: -> use undefined
    // https://stackoverflow.com/questions/8356227/skipping-optional-function-parameters-in-javascript
    const params = new URLSearchParams({
        apiKey,
        query,
        max_ready_time: max_ready_time,
        type: dish_type !== "none" ? dish_type : undefined,
        intolerances: formatted_intolerances || undefined,
        number: 10, // Fetch 10 results
    });

    try {
        const response = await fetch(`${apiBaseUrl}/recipes/complexSearch?${params}`);
        if (!response.ok) {
            console.error(`Error: ${response.status} - ${response.statusText}`);
            alert(`Error fetching recipes: ${response.statusText}`);
            return;
        }

        const data = await response.json();
        console.log("Search Results:", data);

        if (!data.results || data.results.length === 0) {
            alert("No recipes found. Try refining your search!");
            return;
        }

        localStorage.setItem("searchResults", JSON.stringify(data.results));
        window.location.href = "/pages/results.html";
    } 
    catch (error) {
        console.error("Error fetching recipes:", error);
        alert("Something went wrong. Please try again.");
    }


    // Debugging
    // try{
    //     window.location.href = "/pages/results.html";
    // }
    // catch {
    //     alert("Something went wrong. Please try again.");
    // }
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