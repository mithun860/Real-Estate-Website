import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetToken: { type: String },
    resetTokenExpire: { type: Date },
    isAdmin: { 
        type: Boolean, 
        default: false 
    },
    lastLogin: { type: Date },
    loginAttempts: { type: Number, default: 0 },
    accountLocked: { type: Boolean, default: false }
}, { timestamps: true });

// Password hashing middleware
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Password comparison method
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Method to check if user is admin
UserSchema.methods.isAdminUser = function() {
    return this.isAdmin || this.email === process.env.ADMIN_EMAIL;
};

const User = mongoose.model('User', UserSchema);
export default User;