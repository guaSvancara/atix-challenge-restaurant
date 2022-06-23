export interface ingredientInterface {
    name: string;
    calories: number
    isAllergen: true;
    foodtype: foodtypeInterface;
  }

export interface foodtypeInterface{
  name: string,
  isAllergen: boolean
}

export interface arrayStringInterface{
  name: string
}

export interface recipeInterface{
  name: string,
  ingredients : ingredientInterface[]
}

export interface ingredientTypeInterface{
  name:string,
  foodtype:string
}

export interface ingredientAllergentInterface{
  name:string,
  isAllergen: boolean
  foodtype:string
}
