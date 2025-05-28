/**
 * Lesson Controller
 *
 * Handles all lesson plan operations:
 *
 * Functions:
 * - createLesson: Create new lesson plan
 * - getLesson: Retrieve lesson details
 * - updateLesson: Modify existing lesson
 * - deleteLesson: Remove lesson
 * - listLessons: Get filtered lesson list
 * - publishLesson: Make lesson available
 * - duplicateLesson: Create lesson copy
 * - addFeedback: Add substitute feedback
 *
 * Features:
 * - Search and filtering
 * - Version control
 * - Access permissions
 * - Standards linking
 */
import mongoose from 'mongoose';
import User from '../models/User.js'; // or wherever your User model is
import Lesson from '../models/Lesson.js';

export async function createLesson(userId, lessonFields) {
  const lesson = new Lesson();
  lesson.title = lessonFields.title;
  lesson.objectives = lessonFields.objectives;
  lesson.overview = lessonFields.overview;
  lesson.tag = lessonFields.tag;
  lesson.materials = lessonFields.materials;
  lesson.steps = lessonFields.steps;
  lesson.standards = lessonFields.standards;
  lesson.grade = lessonFields.grade;
  lesson.subject = lessonFields.subject;
  lesson.author = userId;
  lesson.status = lessonFields.status;
  lesson.shared = lessonFields.shared;
  lesson.forkedFrom = lessonFields.forkedFrom;
  lesson.feedback = lessonFields.feedback;
  try {
    const savedlesson = await lesson.save();
    return savedlesson;
  } catch (error) {
    throw new Error(`create lesson error: ${error.message}`);
  }
}
export async function getLessons(userId) {
  try {
    if (!userId) {
      return await Lesson.find({ status: 'public' });
    } else {
      const objectId = new mongoose.Types.ObjectId(`${userId}`);

      const query = {
        $or: [
          { status: 'public' },
          { author: objectId },
          { shared: objectId },
        ],
      };
      return await Lesson.find(query);
    }
  } catch (error) {
    throw new Error(`couldn't find lessons: ${error.message}`);
  }
}
export async function getLesson(id) {
  try {
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      throw new Error(`get lesson error with id: ${id}}`);
    }
    return lesson;
  } catch (error) { // !!! TODO This needs to be more sophisticated
    error.statusCode = 404;
    throw error;
  }
}
export async function deleteLesson(id) {
  try {
    const lesson = await Lesson.findByIdAndDelete(id);
    if (!lesson) {
      throw new Error(`get lesson error with id: ${id}}`);
    }
    return lesson;
  } catch (error) { // !!! TODO
    error.statusCode = 404;
    throw error;
  }
}
export async function updateLesson(id, lessonFields) {
  try {
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      throw new Error(`Lesson not found with id: ${id}`);
    }
    // Allowlist of fields that can be updated
    const updatableFields = [
      'title',
      'objectives',
      'overview',
      'tag',
      'materials',
      'steps',
      'standards',
      'grade',
      'subject',
      'status',
      'feedback',
    ];

    // Apply only allowed fields
    updatableFields.forEach((field) => {
      if (lessonFields[field] !== undefined) {
        lesson[field] = lessonFields[field];
      }
    });

    const savedLesson = await lesson.save();
    if (!savedLesson) {
      throw new Error(`get lesson error with id: ${id}}`);
    }
    return savedLesson;
  } catch (error) { // !!! TODO
    error.statusCode = 404;
    throw error;
  }
}

export async function shareLessonWithEmail(lessonId, email) {
  const userToShare = await User.findOne({ email });

  if (!userToShare) {
    const error = new Error('User with that email does not exist');
    error.statusCode = 404;
    throw error;
  }

  const lesson = await Lesson.findById(lessonId);
  if (!lesson) {
    const error = new Error('Lesson not found');
    error.statusCode = 404;
    throw error;
  }

  if (!lesson.shared.includes(userToShare._id)) {
    lesson.shared.push(userToShare._id);
    await lesson.save();
  }

  return lesson;
}

// THIS FUNCTION MUST ADD THE AUTHOR OF THE LESSON BEING FORKED TO SHARED OF THIS NEW LESSON
export async function forkLesson(userId, lessonId) {
  // TODO !!!
  return null;
}
