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

import User from '../models/User.js';

export async function createUser(userFields) {
  const user = new User();
  user.email = userFields.email;
  user.password = userFields.password; // need to hash this
  user.role = userFields.role;
  user.firstName = userFields.firstName;
  user.lastName = userFields.lastName;
  user.school = userFields.school;
  user.folders = userFields.folders;
  try {
    const saveduser = await user.save();
    return saveduser;
  } catch (error) {
    throw new Error(`create user error: ${error.message}`);
  }
}
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
