const searchFood = () => {
    const searchField = document.getElementById('input_field');
    const searchText = searchField.value;
    //  clear data
        searchField.value = " ";
    
    //load data
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.meals))
        .catch(error => console.log(error))
       
}


//display search result 
const displaySearchResult = (meals) => {
    const searchResult = document.getElementById('show_search_meals');
    searchResult.textContent = " ";

    meals.forEach((meal) => {
        searchResult.innerHTML += `
            <div class="col-span-1">
                <div class="bg-gray-800 rounded-md p-6 box-border">
                <div class="overflow-hidden rounded-md">
                    <img src="${meal.strMealThumb}" class="transform hover:scale-125 transition duration-700" alt="food">
                </div>
                    <div class="flex flex-col space-y-4">
                        <h5 class="text-2xl text-white font-semibold pt-4 text-center">${meal.strMeal}</h5>
                    </div>
                    <button
                    class="mt-4 px-6 py-3 bg-yellow-500 border border-yellow-500 rounded text-white hover:bg-white hover:text-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition duration-500 w-full"
                    type="button"  onclick="loadDetails(${meal.idMeal})">See Details</button>
                </div>
            </div>
        `
    });
}


//load meal details 
const loadDetails = (mealID) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => showDetails(data.meals[0]))
}

//show details details

const showDetails = (mealDetails) => {
    const mealDetailsContainer = document.getElementById('meal_details');
    mealDetailsContainer.innerHTML = " ";

    mealDetailsContainer.innerHTML = `
        <div class="flex mt-12">
            <div class="bg-gray-800 rounded-md p-6 box-border flex space-x-4">
            <div class="overflow-hidden rounded-md">
                <img src="${mealDetails.strMealThumb}" class="transform hover:scale-125 transition duration-700" alt="food">
            </div>
                <div class="flex flex-col">
                    <h5 class="text-2xl text-white font-semibold py-4">${mealDetails.strMeal}</h5>
                    <p class="text-justify text-gray-400 text-sm">${mealDetails.strInstructions.slice(0, 200)}</p>

                    <div class="my-4 flex items-end flex-grow space-x-4">
                        <span class="bg-yellow-400 px-6 py-2 rounded-full ">${mealDetails.strCategory}</span>
                        <span class="bg-yellow-400 px-6 py-2 rounded-full ">${mealDetails.strTags}</span>
                    </div>
                </div>

            </div>
        </div>
    `
}