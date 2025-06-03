import express from 'express';

import { requireSignin } from '../services/passport.js';
import * as UserController from '../controllers/userController.js';

const router = express.Router();

const handleSignin = async (req, res) => {
  try {
    console.log(req);
    const token = UserController.signin(req.user);
    res.json({ token, email: req.user.email });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
};

const handleSignup = async (req, res) => {
  try {
    const token = await UserController.signup(req.body);
    console.log(req);
    res.json({ token, email: req.body.email });
  } catch (error) {
    // res.status(422).send({ error: error.toString() });
    res.status(400).json({
      message: error.message || 'Signup failed. Please try again.',
    });
  }
};

router.route('/signup')
  .post(handleSignup);

router.route('/signin')
  .post(requireSignin, handleSignin);

export default router;
