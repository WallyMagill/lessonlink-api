/**
 * Lesson Model Schema
 *
 * Defines the structure for lesson plans in the LessonLink platform.
 *
 * Fields:
 * - title: Lesson title
 * - objectives: Learning objectives
 * - overview: brief description of lesson
 * - tag: Teacher chosen tag to organize on home page
 * - materials: Required materials list
 * - steps: Array of lesson steps/activities
 * - standards: Array of linked teaching standards
 * - grade: Target grade level
 * - subject: Subject area
 * - author: Reference to creating teacher
 * - status: Shared/Private
 * - shared: Array of teachers it has been shared with
 * - createdAt: stored by timestamps
 * - updatedAt: stored by timestamps
 * - forkedFrom: Reference to original lesson id this lesson is based on (will act as foreign key)
 * - feedback: Array of substitute feedback
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

const LessonSchema = new Schema({
  title: String,
  objectives: String,
  overview: String,
  tag: String,
  materials: [String],
  steps: [String],
  standards: [String],
  grade: Number,
  subject: String,
  content: { type: String, default: '' },
  // below based on https://stackoverflow.com/questions/44147927/use-number-or-objectid-when-storing-a-reference-to-another-document-using-mongoo
  author: { type: Schema.Types.ObjectId, ref: 'User' }, // we store the teacher as their id
  status: { type: String, enum: ['public', 'protected'], default: 'public' }, // two options for status
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
