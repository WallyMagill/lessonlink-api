/**
 * User Model Schema
 *
 * Defines the structure for user accounts in the LessonLink platform.
 *
 * Fields:
 * - email: Unique email address for login
 * - password: Hashed password
 * - role: User role (teacher, substitute, admin, parent)
 * - firstName: User's first name
 * - lastName: User's last name
 * - school: Associated school
 * - folders: stores all the users folders which contain their lessons organized as they like
 *            A folder is a key-value pair
 *            The key will be a name defined by the user (ex. Algebra)
 *            The value will be an Array that stores all relevent Lesson IDs
 *            NOTE: Nested folders are not supported
 * - createdAt: stored by timestamps
 * - lastLogin: stored by timestamps
 *
 * Methods:
 * - Password hashing
 * - JWT token generation
 * - Role-based access control
 */
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
  email: String,
  password: String,
  role: String,
  username: String,
  school: String,
  theme: Boolean,
  // folder is a list of dictionaries, key=name of the folder, value=id of lesson
  folders: {
    type: Map,
    of: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
    default: {},
  },
}, {
  // these allow us to make our own functions of sorts within the schema
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

UserSchema.pre('save', async function beforeUserSave(next) {
  // get access to the user model
  const user = this;

  if (!user.isModified('password')) return next();

  try {
    // salt, hash, then set password to hash
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return next();
  } catch (error) {
    return next(error);
  }
});

// note use of named function rather than arrow notation, required here
UserSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  const comparison = await bcrypt.compare(candidatePassword, this.password);
  return comparison;
};

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
