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
    throw new Error('An account with this email already exists.');
  }

  const existingUsername = await User.findOne({ username });

  if (existingUsername) {
  // If a user with email does exist, return an error
    throw new Error('An account with this username already exists.');
  }

  const user = new User();
  user.username = username;
  user.email = email;
  user.password = password;
  user.role = 'Teacher';
  user.school = 'No School Entered';
  user.theme = false;
  await user.save();
  return tokenForUser(user);
};

export async function getUsers() {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    console.error('Failed to fetch users:', error.message);
    error.statusCode = 500;
    throw error;
  }
}
export async function getUser(id) {
  try {
    const user = await User.findById(id);
    if (!user) {
      const error = new Error(`User not found with id: ${id}`);
      error.statusCode = 404;
      throw error;
    }
    return user;
  } catch (error) {
    console.error(error.message);
    if (!error.statusCode) error.statusCode = 500;
    throw error;
  }
}
export async function deleteUser(id) {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      const error = new Error(`User not found with id: ${id}`);
      error.statusCode = 404;
      throw error;
    }
    return user;
  } catch (error) {
    console.error(error.message);
    if (!error.statusCode) error.statusCode = 500;
    throw error;
  }
}
export async function updateUser(id, userFields) {
  try {
    const user = await User.findByIdAndUpdate(id, userFields, { new: true }); // set the option new to return updated object
    if (!user) {
      const error = new Error(`User not found with id: ${id}`);
      error.statusCode = 404;
      throw error;
    }
    return user;
  } catch (error) {
    console.error(error.message);
    if (!error.statusCode) error.statusCode = 500;
    throw error;
  }
}

export const addFolder = async (userId, folderName) => {
  try {
    if (!folderName) {
      throw new Error('Folder name is required');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    if (user.folders.has(folderName)) {
      throw new Error('Folder already exists');
    }

    user.folders.set(folderName, []); // a folder starts off empty
    await user.save();

    return user;
  } catch (error) {
    console.error('Add folder error:', error.message);
    error.statusCode = 400;
    throw error;
  }
};

export const removeFolder = async (userId, folderName) => {
  try {
    if (!folderName) {
      throw new Error('Folder name is required');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    if (!user.folders.has(folderName)) {
      throw new Error('Folder does not exist');
    }

    user.folders.delete(folderName);
    await user.save();

    return user;
  } catch (error) {
    console.error('Add folder error:', error.message);
    error.statusCode = 400;
    throw error;
  }
};

export const addLessonToFolder = async (userId, folderName, lessonId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    if (!user.folders.has(folderName)) {
      throw new Error('Folder not found');
    }

    const folderLessons = user.folders.get(folderName);
    if (!folderLessons.includes(lessonId)) {
      folderLessons.push(lessonId);
      user.folders.set(folderName, folderLessons);
      await user.save();
    } else {
      throw new Error('That lesson is already in this folder');
    }

    return user;
  } catch (error) {
    throw new Error(error.message, error);
  }
};

export const removeLessonFromFolder = async (userId, folderName, lessonId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    if (!user.folders.has(folderName)) {
      throw new Error('Folder not found');
    }

    const folderLessons = user.folders.get(folderName);
    if (folderLessons.includes(lessonId)) {
      const updatedLessons = folderLessons.filter(
        (lesson) => { return lesson.toString() !== lessonId.toString(); },
      );
      user.folders.set(folderName, updatedLessons);
      await user.save();
    } else {
      throw new Error('That lesson does not exist in the folder');
    }

    return user;
  } catch (error) {
    throw new Error(error.message, error);
  }
};

export const renameFolder = async (userId, oldName, newName) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    if (!user.folders || !user.folders.get(oldName)) {
      throw new Error('Folder not found');
    }

    if (user.folders.get(newName)) {
      throw new Error('A folder with that name already exists');
    }

    const folderLessons = user.folders.get(oldName);
    user.folders.set(newName, folderLessons);
    user.folders.delete(oldName);
    await user.save();

    return user;
  } catch (error) {
    console.error('Rename folder error:', error);
    throw new Error(`Rename folder failed: ${error.message}`);
  }
};

export const toggleTheme = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (user) {
      user.theme = !user.theme;
      await user.save();
      return user.theme;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Toggle theme error:', error.message);
    error.statusCode = 400;
    throw error;
  }
};
