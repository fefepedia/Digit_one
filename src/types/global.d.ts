import { Request } from 'express';

import { IUser } from '../models/User';

interface NujRequest extends Request {
  user: IUser;
}
