import express from 'express';
import * as Lessons from '../controllers/lessonController.js';
import { requireAuth } from '../services/passport.js';

const router = express.Router();

// function to handle errors (if they already have a status and message just pass them along)
function handleError(res, error) {
  const status = error.statusCode || 500;
  const message = error.message || 'Internal Error';
  return res.status(status).json({ error: message });
}

const handleGetAll = async (req, res) => {
  try {
    const userId = req.user?.id || null;
    const result = await Lessons.getLessons(userId);
    return res.json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

const handleGetPublic = async (req, res) => {
  try {
    const result = await Lessons.getLessons(null);
    return res.json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

const handleCreate = async (req, res) => {
  try {
    const result = await Lessons.createLesson(req.user.id, req.body);
    return res.json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

const handleGetSingle = async (req, res) => {
  try {
    const result = await Lessons.getLesson(req.params.id);
    return res.json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

const handleUpdate = async (req, res) => {
  try {
    const result = await Lessons.updateLesson(req.user?.id, req.params.id, req.body);
    return res.json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

const handleDelete = async (req, res) => {
  try {
    const result = await Lessons.deleteLesson(req.user.id, req.params.id);
    return res.json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

const handleShareLesson = async (req, res) => {
  try {
    const { email } = req.body;
    const lessonId = req.params.id;

    const result = await Lessons.shareLessonWithEmail(lessonId, email);
    return res.json(result);
  } catch (error) {
    return handleError(res, error);
  }
};
router.route('/')
  .get(requireAuth, handleGetAll)
  .post(requireAuth, handleCreate);

router.route('/public')
  .get(handleGetPublic);

router.route('/:id')
  .get(handleGetSingle)
  .put(requireAuth, handleUpdate)
  .delete(requireAuth, handleDelete);

router.route('/:id/share')
  .post(requireAuth, handleShareLesson);

export default router;
