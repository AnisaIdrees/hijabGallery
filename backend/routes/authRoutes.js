import {Router} from 'express'
import { forgotPassword, login, profile, resetPswd, singUp } from '../controllers/authenController.js'
import { middlewareToProtect } from '../middlewares/authMiddleware.js'
// import { middlewareToProtect } from '../middlewares/authMiddileware.js'

const router= Router()

router.post('/signup',singUp)
router.post('/login' , login)
router.post('/forgot-password',forgotPassword)
router.post('/reset-password',resetPswd)
router.get('/profile', middlewareToProtect ,profile)
export default router