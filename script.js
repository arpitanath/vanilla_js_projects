const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal");

//Search meal and fetch from API
function searchMeal(e) {
  e.preventDefault();

  //Clear previous meals
  single_mealEl.innerHTML = "";

  const term = search.value;

  //check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(data => data.json())
      .then(data => {
        if (data.meals == null) {
          resultHeading.innerHTML = `<p> Please search with some other ingredient </p>`;
        } else {
          resultHeading.innerHTML = `<h2> Search Results for "${term}" :</h2>`;
          mealsEl.innerHTML = data.meals
            .map(
              meal => `
          <div class ="meal">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <div class="meal-info" data-mealID="${meal.idMeal}">
          <h3>${meal.strMeal}</h3>
          </div>
          </div>
          `
            )
            .join("");
        }
        console.log(data.meals);
      });

    //clear serch Text
    search.value = "";
  } else {
    alert("Please enter a valid value");
  }
}

//get random meals
function randomMeal() {
  resultHeading.innerHTML = "";
  mealsEl.innerHTML = "";
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

//fetch meal by id
function getMealById(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];
      addMealToDOM(meal);
      console.log(data);
    });
}

//Add meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]}` + "-" + `${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  single_mealEl.innerHTML = `
  <div class="single-meal">
  <h1>${meal.strMeal}</h1>
  <img src="${meal.strMealThumb}"/>
  <div class="single-main-info">
  ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
  ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
  </div>
  <div class="main">
  <p>${meal.strInstructions}</p>
  <h2>Ingredients</h2>
  <ul>
  ${ingredients.map(ing => `<li>${ing}</li>`).join("")}
  </ul>
  </div>
  </div>
  `;
}

//Adding Event Listeners
submit.addEventListener("submit", searchMeal);
random.addEventListener("click", randomMeal);

mealsEl.addEventListener("click", e => {
  const mealInfo = e.path.find(item => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealById(mealID);
  }
  console.log(mealInfo);
});
