import { NextFunction, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { RequestWithUser } from '@interfaces/auth.interface';
import { Roles } from '@utils/util';

const isAdminMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (req.user && req.user?.role == Roles.Admin) {
      next();
    } else {
      next(new HttpException(401, 'Only admins'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default isAdminMiddleware;
