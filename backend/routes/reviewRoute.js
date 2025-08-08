import { createReview, editReview, getAllReview, deleteReview } from "../controllers/reviewController.js";
import { Router } from "express";
import { middlewareToProtect } from "../middlewares/authMiddleware.js";

const reviewRouter = Router()

reviewRouter.post('/createReview',middlewareToProtect,createReview)
reviewRouter.post('/editReview/:id',middlewareToProtect,editReview)
reviewRouter.post('/deleteReview/:id',middlewareToProtect,deleteReview)
reviewRouter.post('/allreview',getAllReview)

export default reviewRouter