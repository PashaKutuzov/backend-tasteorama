import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },

    password: { type: String, required: true },
    privacyPolicyAcceptedAt: { type: Date, required: true },

    favorites: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
    myRecipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
  },
  { timestamps: true, versionKey: false }
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('User', usersSchema);
