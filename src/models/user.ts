import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema<User>({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  email: { type: String, required: true, unique: true, match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

export const UserModel = mongoose.model<User>('user', UserSchema);
