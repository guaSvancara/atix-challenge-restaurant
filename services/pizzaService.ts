import {
  arrayStringInterface,
  foodtypeInterface,
  ingredientInterface,
  ingredientTypeInterface,
  ingredientAllergentInterface,
} from '../interfaces/interfaces';
const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');
const Foodtype = require('../models/foodtype');

export const hasAllegensService = async (
    allergens: string[],
    recipe: string): Promise<boolean> => {
  const {ingredients} = await Recipe.findOne({
    where: {name: recipe},
    include: [
      {
        model: Ingredient,
        include: [
          Foodtype,
        ],
      },
    ],
  });


  const ingredientsArray: foodtypeInterface[] = ingredients.map(
      (ingredient: ingredientInterface) => ({
        name: ingredient.foodtype.name,
        isAllergen: ingredient.foodtype.isAllergen,
      }
      ));

  const allergensArray: arrayStringInterface[] = allergens.map(
      (allergen: string) => ({
        name: allergen,
      }
      ));

  for (let i = 0; i < ingredientsArray.length; i++) {
    for (let j = 0; j < allergensArray.length; j++) {
      if ((ingredientsArray[i].isAllergen) &&
        (ingredientsArray[i].name == allergensArray[j].name)) {
        return true;
      }
    }
  }
  return false;
};

export const hasFoodTypeService = async (
    foodtype: string[],
    recipe: string): Promise<boolean> => {
  const {ingredients} = await Recipe.findOne({
    where: {name: recipe},
    include: [
      {
        model: Ingredient,
        include: [
          Foodtype,
        ],
      },
    ],
  });
  const ingredientsArray: foodtypeInterface[] = ingredients.map(
      (ingredient: ingredientInterface) => ({
        name: ingredient.foodtype.name,
      }
      ));
  const foodtypeArray: arrayStringInterface[] = foodtype.map(
      (foodtype: string) => ({
        name: foodtype,
      }
      ));
  for (let i = 0; i < ingredientsArray.length; i++) {
    for (let j = 0; j < foodtypeArray.length; j++) {
      if (ingredientsArray[i].name == foodtypeArray[j].name) {
        return true;
      }
    }
  }
  return false;
};

export const removefoodTypesService = async (
    foodtype: string[],
    recipe: string): Promise<ingredientTypeInterface[]> => {
  const {ingredients} = await Recipe.findOne({
    where: {name: recipe},
    include: [
      {
        model: Ingredient,
        include: [
          Foodtype,
        ],
      },
    ],
  });
  const ingredientsArray: ingredientTypeInterface[] = ingredients.map(
      (ingredient: ingredientInterface) => ({
        name: ingredient.name,
        foodtype: ingredient.foodtype.name,
      }
      ));
  const foodtypeArray: arrayStringInterface[] = foodtype.map(
      (foodtype: string) => ({
        name: foodtype,
      }
      ));
  let responseArray: ingredientTypeInterface[] = [];
  responseArray = ingredientsArray.filter((ingredients) => {
    for (let j = 0; j < foodtypeArray.length; j++) {
      if (ingredients.foodtype == foodtypeArray[j].name) {
        return false;
      }
    }
    return true;
  });
  return responseArray;
};

export const removeAllergensService = async (
    allergens: string[],
    recipe: string): Promise<ingredientAllergentInterface[]> => {
  const {ingredients} = await Recipe.findOne({
    where: {name: recipe},
    include: [
      {
        model: Ingredient,
        include: [
          Foodtype,
        ],
      },
    ],
  });
  const ingredientsArray: ingredientAllergentInterface[] = ingredients.map(
      (ingredient: ingredientInterface) => ({
        name: ingredient.name,
        isAllergen: ingredient.foodtype.isAllergen,
        foodtype: ingredient.foodtype.name,
      }
      ));

  const allergensArray: arrayStringInterface[] = allergens.map(
      (foodtype: string) => ({
        name: foodtype,
      }
      ));
  let responseArray: ingredientAllergentInterface[] = [];
  responseArray = ingredientsArray.filter((ingredients) => {
    for (let j = 0; j < allergensArray.length; j++) {
      if (ingredients.foodtype == allergensArray[j].name) {
        return false;
      }
    }
    return true;
  });
  return responseArray;
};

export const getCaloriesService = async (recipe: string): Promise<number> => {
  const {ingredients} = await Recipe.findOne({
    where: {name: recipe},
    include: [
      {
        model: Ingredient,
      },
    ],
  });
  let calories: number = 0;
  ingredients.map((ingredient: ingredientInterface) => {
    calories = calories + ingredient.calories;
  });

  return calories;
};

export const doubleIngredientsService = async (
    ingredient: string[],
    recipe: string) => {
  const {ingredients} = await Recipe.findOne({
    where: {name: recipe},
    include: [
      {
        model: Ingredient,
        include: [
          Foodtype,
        ],
      },
    ],
  });
  const ingredientsArray: arrayStringInterface[] = ingredients.map(
      (ingredient: ingredientInterface) => ({
        name: ingredient.name,
      }
      ));

  const ingredientsDuplicateArray: arrayStringInterface[] = ingredient.map(
      (ingredient: string) => ({
        name: ingredient,
      }
      ));
  const responseArray: arrayStringInterface[] = [];
  for (let i = 0; i < ingredientsArray.length; i++) {
    responseArray.push(ingredientsArray[i]);
    for (let j = 0; j < ingredientsDuplicateArray.length; j++) {
      if ((ingredientsArray[i].name == ingredientsDuplicateArray[j].name)) {
        responseArray.push(ingredientsArray[i]);
      }
    }
  }
  return responseArray;
};
