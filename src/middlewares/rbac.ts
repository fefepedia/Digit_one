import { Request, Response, NextFunction } from 'express';

export const ROLES = {
  ADMIN: 'admin',
  OPERATOR: 'operator',
  ACCOUNTANT: 'accountant',
};

export function checkUserRole(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).json({ message: `Access denied. User is not a ${role}.` });
    }
  };
}
