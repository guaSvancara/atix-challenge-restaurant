import {Router} from 'express';
import {
  hasAllergens,
  hasFoodTypes,
  removefoodTypes,
  removeAllergens,
  getCalories,
  doubleIngredients,
} from '../controllers/pizza';

const router = Router(); // eslint-disable-line

router.get('/allergens', hasAllergens);
router.get('/foodtypes', hasFoodTypes);
router.post('/removeallergens', removeAllergens);
router.post('/removefoodtypes', removefoodTypes);
router.get('/:recipe/calories', getCalories);
router.post('/:recipe/doubleingredients', doubleIngredients);


export default router;
