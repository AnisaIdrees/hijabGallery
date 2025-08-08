import { createReview, editReview, getAllReview, deleteReview } from "../controllers/reviewController.js";
import { Router } from "express";
import { middlewareToProtect } from "../middlewares/authMiddleware.js";

const reviewRouter = Router()

reviewRouter.post('/createReview',middlewareToProtect,createReview)
reviewRouter.put('/editReview/:id',middlewareToProtect,editReview)
reviewRouter.delete('/deleteReview/:id',middlewareToProtect,deleteReview)
reviewRouter.get('/allReview',getAllReview)

export default reviewRouter