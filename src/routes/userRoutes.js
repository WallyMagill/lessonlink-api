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
    console.log(req.user);
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

router.route('/')
  .get(requireAuth, handleGetSingle)
  .put(requireAuth, handleUpdate)
  .delete(requireAuth, handleDelete);

export default router;
