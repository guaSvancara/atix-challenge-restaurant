const recipe = require('../models/recipe');
const ingredient = require('../models/ingredient');
const foodtype = require('../models/foodtype');

foodtype.hasMany(ingredient);
ingredient.belongsTo(foodtype);
recipe.belongsToMany(ingredient, {through: 'recipe_ingredient'});
ingredient.belongsToMany(recipe, {through: 'recipe_ingredient'});
