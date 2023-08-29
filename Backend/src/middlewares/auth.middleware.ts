import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface UserPayload extends JwtPayload {
  name: string;
  email: string;
  id: string;
}

export interface AuthRequest extends Request {
  files: any;
  user: UserPayload;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).send({ message: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as UserPayload;
    if (!decoded) return res.status(401).send({ message: 'Unauthorized' });
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ message: 'Unauthorized' });
  }
};

export default authMiddleware;
