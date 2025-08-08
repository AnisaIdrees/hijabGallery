import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    contact: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    status: {
        type: 'string',
        enum: ['active', 'blocked'],
        default: 'active'
    }
}, {
    timestamps: true
})

// hash password

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

// custom method
userSchema.methods.comparedPassword = function (plainTextPass) {
    return bcrypt.compare(plainTextPass, this.password)
}
const User = mongoose.model('user', userSchema)
export default User


