/**
 * User Controller
 *
 * Handles all user-related operations:
 *
 * Functions:
 * - getProfile: Retrieve user profile
 * - updateProfile: Update user information
 * - deleteAccount: Remove user account
 * - getClasses: List user's classes
 * - updatePreferences: Modify user settings
 * - getNotifications: Fetch user notifications
 *
 * Features:
 * - Role-based access control
 * - Profile validation
 * - Data sanitization
 * - Activity logging
 */

import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config({ silent: true });

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

export const signin = (user) => {
  return tokenForUser(user);
};

export const getUsername = async ({ userId }) => {
  const existingUser = await User.findById({ userId });
  if (existingUser) {
    return existingUser.username;
  } else {
    return null;
  }
};

// note the lovely destructuring here indicating that we are passing in an object with these 3 keys
export const signup = async ({ username, email, password }) => {
  if (!username || !email || !password) {
    throw new Error('You must provide username, email and password');
  }

  // See if a user with the given email exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
  // If a user with email does exist, return an error
    throw new Error('Email is in use');
  }

  const user = new User();
  user.username = username;
  user.email = email;
  user.password = password;
  user.role = 'Teacher';
  user.school = 'No School Entered';
  user.folders = null;
  await user.save();
  return tokenForUser(user);
};

// export async function createUser(userFields) {
//   const user = new User();
//   user.email = userFields.email;
//   user.password = userFields.password; // need to hash this
//   user.role = userFields.role;
//   user.firstName = userFields.firstName;
//   user.lastName = userFields.lastName;
//   user.school = userFields.school;
//   user.folders = userFields.folders;
//   try {
//     const saveduser = await user.save();
//     return saveduser;
//   } catch (error) {
//     throw new Error(`create user error: ${error.message}`);
//   }
// }
export async function getUsers() {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    throw new Error(`couldn't find users: ${error.message}`);
  }
}
export async function getUser(id) {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error(`get user error with id: ${id}}`);
    }
    return user;
  } catch (error) { // !!! TODO This needs to be more sophisticated
    error.statusCode = 404;
    throw error;
  }
}
export async function deleteUser(id) {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error(`get user error with id: ${id}}`);
    }
    return user;
  } catch (error) { // !!! TODO This needs to be more sophisticated
    error.statusCode = 404;
    throw error;
  }
}
export async function updateUser(id, userFields) {
  try {
    const user = await User.findByIdAndUpdate(id, userFields, { new: true }); // set the option new to return updated object
    if (!user) {
      throw new Error(`get user error with id: ${id}}`);
    }
    return user;
  } catch (error) { // !!! TODO This needs to be more sophisticated
    error.statusCode = 404;
    throw error;
  }
}
