import express from 'express';
import * as Users from '../controllers/userController.js';

const router = express.Router();

// function to handle errors (if they already have a status and message just pass them along)
function handleError(res, error) {
  const status = error.statusCode || 500;
  const message = error.message || 'Internal Error';
  return res.status(status).json({ error: message });
}

const handleGetAll = async (req, res) => {
  try {
    const result = await Users.getUsers();
    return res.json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

const handleCreate = async (req, res) => {
  try {
    const result = await Users.createUser(req.body);
    return res.json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

const handleGetSingle = async (req, res) => {
  try {
    const result = await Users.getUser(req.params.id);
    return res.json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

const handleUpdate = async (req, res) => {
  try {
    const result = await Users.updateUser(req.params.id, req.body);
    return res.json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

const handleDelete = async (req, res) => {
  try {
    const result = await Users.deleteUser(req.params.id);
    return res.json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

router.route('/')
  .get(handleGetAll)
  .post(handleCreate);

router.route('/:id')
  .get(handleGetSingle)
  .put(handleUpdate)
  .delete(handleDelete);

export default router;
