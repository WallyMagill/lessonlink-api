import express from 'express';
import * as Users from '../controllers/userController.js';
import { requireAuth } from '../services/passport.js';

const router = express.Router();

// function to handle errors (if they already have a status and message just pass them along)
function handleError(res, error) {
  const status = error.statusCode || 500;
  const message = error.message || 'Internal Error';
  return res.status(status).json({ error: message });
}

const handleGetSingle = async (req, res) => {
  try {
    const result = await Users.getUser(req.user.id);
    return res.json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

const handleUpdate = async (req, res) => {
  try {
    const result = await Users.updateUser(req.user.id, req.body);
    return res.json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

const handleDelete = async (req, res) => {
  try {
    const result = await Users.deleteUser(req.user.id);
    return res.json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

const handleAddFolder = async (req, res) => {
  try {
    const result = await Users.addFolder(req.user.id, req.body.foldername);
    return res.json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

const handleAddLessonToFolder = async (req, res) => {
  try {
    const result = await Users.addLessonToFolder(req.user.id, req.body.foldername, req.body.lessonId);
    return res.json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

const handleRemoveFolder = async (req, res) => {
  try {
    const result = await Users.removeFolder(req.user.id, req.body.foldername);
    return res.json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

const handleRenameFolder = async (req, res) => {
  try {
    const result = await Users.renameFolder(req.user.id, req.body.oldName, req.body.newName);
    return res.json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

const handleRemoveLessonFromFolder = async (req, res) => {
  try {
    const result = await Users.removeLessonFromFolder(req.user.id, req.body.foldername, req.body.lessonId);
    return res.json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

const handleToggle = async (req, res) => {
  try {
    const result = await Users.toggleTheme(req.user?.id);
    return res.json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

router.route('/')
  .get(requireAuth, handleGetSingle)
  .put(requireAuth, handleUpdate)
  .delete(requireAuth, handleDelete);

router.route('/theme')
  .put(requireAuth, handleToggle);

router.route('/folders')
  .post(requireAuth, handleAddFolder)
  .put(requireAuth, handleAddLessonToFolder)
  .delete(requireAuth, handleRemoveFolder);

router.route('/folders/rename')
  .put(requireAuth, handleRenameFolder);

router.route('/folders/lesson')
  .delete(requireAuth, handleRemoveLessonFromFolder);

export default router;
