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

import Lesson from '../models/Lesson.js';

export async function createLesson(lessonFields) {
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
  lesson.author = lessonFields.author;
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
export async function getLessons() {
  try {
    const lessons = await Lesson.find({});
    return lessons;
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
    const lesson = await Lesson.findByIdAndUpdate(id, lessonFields, { new: true }); // set the option new to return updated object
    if (!lesson) {
      throw new Error(`get lesson error with id: ${id}}`);
    }
    return lesson;
  } catch (error) { // !!! TODO
    error.statusCode = 404;
    throw error;
  }
}
