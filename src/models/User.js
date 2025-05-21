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

const UserSchema = new Schema({
  email: String,
  password: String,
  role: String,
  firstName: String,
  lastName: String,
  school: String,
  // folder is a list of dictionaries, key=name of the folder, value=id of lesson
  folders: {
    type: Map,
    of: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Lesson',
      },
    ],
    default: {},
  },
}, {
  // these allow us to make our own functions of sorts within the schema
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
