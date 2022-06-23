import {Request, Response} from 'express';
import {
  hasAllegensService,
  hasFoodTypeService,
  removeAllergensService,
  getCaloriesService,
  removefoodTypesService,
  doubleIngredientsService,
} from '../services/pizzaService';

export const hasAllergens = async (req: any, res: Response) => {
  try {
    const allergens: string[] = req.query.allergens;
    const recipe: string = req.query.recipe;
    const hasAllergen = await hasAllegensService(allergens, recipe);
    res.json({
      hasAllergen,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: 'Recipe doesn\'t exist',
    });
  }
};

export const hasFoodTypes = async (req: any, res: Response) => {
  try {
    console.log(req.query);
    const foodtype: string[] = req.query.foodtype;
    const recipe: string = req.query.recipe;
    const hasFoodType = await hasFoodTypeService(foodtype, recipe);
    res.json({
      hasFoodType,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: 'Recipe doesn\'t exist',
    });
  }
};

export const removefoodTypes = async (req: Request, res: Response) => {
  try {
    const {foodtype, recipe} = req.body;
    const result = await removefoodTypesService(foodtype, recipe);
    res.json({
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: 'Recipe doesn\'t exist',
    });
  }
};

export const removeAllergens = async (req: Request, res: Response) => {
  try {
    const {allergens, recipe} = req.body;
    const result = await removeAllergensService(allergens, recipe);
    res.json({
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: 'Recipe doesn\'t exist',
    });
  }
};

export const getCalories = async (req: any, res: Response) => {
  try {
    const recipe: string = req.params.recipe;
    const calories = await getCaloriesService(recipe);
    res.json({
      calories,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: 'Recipe doesn\'t exist',
    });
  }
};

export const doubleIngredients = async (req: Request, res: Response) => {
  try {
    const {ingredients} = req.body;
    const recipe: string = req.params.recipe;
    const result = await doubleIngredientsService(ingredients, recipe);
    res.json({
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: 'Recipe doesn\'t exist',
    });
  }
};


