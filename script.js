document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('my-search');
    const searchResults = document.getElementById('search-results');

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
            fetchMeals(searchTerm);
        } else {
            clearResults();
        }
    });

    function fetchMeals(searchTerm) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                displayMeals(data.meals);
            })
            .catch(error => {
                console.error('Error fetching meals:', error);
            });
    }

    function displayMeals(meals) {
        searchResults.innerHTML = '';
        if (meals) {
            meals.forEach(meal => {
                const mealElement = document.createElement('div');
                mealElement.classList.add('meal');
                mealElement.innerHTML = `
                    <h3>${meal.strMeal}</h3>
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-image">
                `;
                searchResults.appendChild(mealElement);
            });
        } else {
            searchResults.innerHTML = '<p>No meals found.</p>';
        }
    }

    function clearResults() {
        searchResults.innerHTML = '';
    }
});
