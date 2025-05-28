import express from 'express';
import * as Standards from '../controllers/standardController.js';

const router = express.Router();

// function to handle errors (if they already have a status and message just pass them along)
function handleError(res, error) {
  const status = error.statusCode || 500;
  const message = error.message || 'Internal Error';
  return res.status(status).json({ error: message });
}

const handleGetAll = async (req, res) => {
  try {
    const result = await Standards.retrieveStandards();
    return res.json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

router.route('/')
  .get(handleGetAll);

export default router;
