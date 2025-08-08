import User from '../model/userSchema.js';
import { signinToken } from '../utils/token.js';
import jwt from 'jsonwebtoken'
import _sendEmail from '../utils/email.js'

export const singUp = async (req, res) => {
    try {

        const { name, email, password } = req.body

        if (!name || !email || !password) {
            res.status(400).json({
                success: false,
                message: 'missing required fields !',

            })
        }

        // user check
        const isExist = await User.findOne({ email })
        if (isExist) {
            return res.status(400).json({
                success: false,
                message: 'user already registered!'
            })
        }

        // create user
        const user = await User.create(req.body);
        const token = signinToken(user)
        res.status(201).json({
            success: true,
            message: 'user create succuessfully ! ',
            token,
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'signup failed',
            error: error.message
        })
    }
}


// login
export const login = async (req, res) => {

    try {
        const { email, password } = req.body
        // Step 1: Get user with password
        const user = await User.findOne({ email }).select('+password')// get password for comparison

        if (!email || !(await user.comparedPassword(password))) {
            res.status(401).json({
                success: false,
                message: 'invalid credential',

            })
        }

        // Step 2: Remove password before sending user data to client
        const token = signinToken(user)
        const userWithoutPaswd = user.toObject();
        delete userWithoutPaswd.password


        console.log(token ,"tokenn");
        
        res.status(201).json({
            user: userWithoutPaswd,
            token,
            success: true,
            user,
            message: 'users logged in successfully !'
        })
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: 'sign in failed',
            error: error.message
        })
    }
}

// forgot password
export const forgotPassword = async (req, res) => {
    console.log('check email controller');

    const { email } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).json(
            {
                success: false,
                message: 'user not found'
            }
        )
    }
    // reset token
    const resetToken = jwt.sign({ id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '10m' }

    )

    //resetUrl frontend
    const resetUrl = `${process.env.WEBSITE_URL}reset-password/${resetToken}`
    try {

        await _sendEmail({
            to: user.email,
            subject: 'Reset Password', html: `
            <div style="margin: 0 auto; width: 90%; height: 500px;">
            <h1 style="color: gold;" >Reset Password</h1>
            <p style="color: gray;">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam maxime vero libero.</p>
            <p>Click here to reset <a href="${resetUrl}">Reset </a></p>
        </div>
            `
        })
        res.status(201).json({
            success: true,
            message: "Password reset email sent successfully!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: `email send failed`
        })
    }
}

// reset password
export const resetPswd = async (req, res) => {
    const { token, password } = req.body
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id)
        console.log('decoded id', decoded.id);


        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            })
        }
        //update paswd
        user.password = password
        await user.save()
        res.status(200).json({
            success: true,
            message: 'password updated successfully'
        })
    } catch (error) {
        res.json(500).json({
            success: false,
            message: "reset password fail !",
            error: error.message
        })
    }
}

// profile
export const profile = (req, res) => {

    res.status(201).json({
        user: req.user,
        success: true,
    })
}


