import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/HttpException';

export interface UserPayload extends JwtPayload {
  name: string;
  email: string;
  id: string;
}
export enum Roles {
  Company,
  Customer,
  All,
}
export interface AuthRequest extends Request {
  files: any;
  user: UserPayload;
}

const authMiddleware =
  (role: Roles) => (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) next(new HttpException(401, 'Token not found'));
      const verificationResponse = jwt.verify(
        token,
        process.env.JWT_SECRET
      ) as UserPayload;
      req.user = verificationResponse;
      next();
    } catch (error) {
      next(new HttpException(401, 'Unauthorized'));
    }
  };

export default authMiddleware;
