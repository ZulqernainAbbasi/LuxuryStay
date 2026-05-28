import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { getUserData, storeRecentSearchCities } from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/', protect, getUserData);
userRouter.post('/store-recent-search',protect,storeRecentSearchCities)


export default userRouter;