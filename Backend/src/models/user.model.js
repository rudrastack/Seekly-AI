import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        verified: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);

UserSchema.pre('save', async function () {
    if (!this.isModified('password'));
    this.password = await bcrypt.hash(this.password, 10);
})

UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};
const userModel = mongoose.model('UserDB', UserSchema);
export default userModel;
