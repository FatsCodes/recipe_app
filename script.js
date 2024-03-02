const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.getElementById('meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

apiKey = "bbc10b2bc1774e98bea9a0e1854c7e75"
searchBtn.addEventListener('click', getMealList);
searchBtn.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe')
} )


function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchInputTxt}&number=12&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            data.forEach(recipe => {
                html += `
                    <div class="meal-item">
                        <img src="${recipe.image}" alt="${recipe.title}">
                        <div class="meal-name">
                            <h3>${recipe.title}</h3>
                            <a href="#" class="recipe-btn" data-id="${recipe.id}">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        let recipeId = e.target.getAttribute('data-id');
        fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data));
    }
}

function mealRecipeModal(meal){
    console.log(meal);
    let html = `
            <h2 class="recipe-title">${meal.title}</h2>
            <p class="recipe-category">${meal.dishTypes}</p>
            <div class="recipe-instruct">
                <h3>Instructions:</h3>
                <p>${meal.instructions}</p>
            </div>
            <div class="recipe-meal-img">
                <img src="${meal.image}">
            </div>
            <div class="recipe-link">
                <a href="${meal.sourceUrl}" target="_blank">Recipe Link</a>
            </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}








searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);