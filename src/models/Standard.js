/**
 * Standard Model Schema
 *
 * Defines the structure for a Standard.
 *
 * Fields:
 * - subject: topic the standard is applied to
 * - grade: grade that the standard is written for
 * - domain: a broad idea related to grade and subject ex 'Operations and Algebraic Thinking'
 * - anchorStandard: Overarching Standard ex 'Understand addition as putting together and adding to'
 * - standardCode: code for a standard ex 'CCSS.Math.Content.K.CC.A.1'
 * - description: description of the standard
 *
 * Methods:
 * - Validation for required fields
 * - Search indexing
 * - Version tracking
 *
 * Citations:
 * Line 44-46 taken from stackOverflow
 */

import mongoose, { Schema } from 'mongoose';

const StandardSchema = new Schema({
  subject: String,
  objectives: String,
  overview: String,
  tag: String,
  materials: [String],
  steps: [String],
  standards: [String],
  grade: Number,
  subject: String,
  // below based on https://stackoverflow.com/questions/44147927/use-number-or-objectid-when-storing-a-reference-to-another-document-using-mongoo
  author: { type: Schema.Types.ObjectId, ref: 'User' }, // we store the teacher as their id
  status: { type: String, enum: ['private', 'shared'], default: 'private' }, // two options for status
  shared: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  forkedFrom: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
  feedback: [String],
}, {
  // these allow us to make our own functions of sorts within the schema
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

const LessonModel = mongoose.model('Lesson', LessonSchema);

export default LessonModel;
