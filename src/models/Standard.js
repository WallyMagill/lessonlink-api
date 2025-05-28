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
  grade: String,
  domain: String,
  anchorStandard: String,
  standardCode: String,
}, {
  // these allow us to make our own functions of sorts within the schema
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

const StandardModel = mongoose.model('Standard', StandardSchema);

export default StandardModel;
