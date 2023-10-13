import express from 'express';
import User from '../../models/User';
import verify from '../../middlewares/authVerify';

const router = express.Router();

router.get(
  '/allusers',
  verify,
  async (req: express.Request, res: express.Response) => {
    try {
      const results = await User.find().exec(); // don't do this
      res.send(results);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

export default router;
