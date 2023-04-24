import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const accessTokenSecret = process.env.JWT_SECRET as string;

  if (!accessTokenSecret) {
    throw new Error('JWT_SECRET environment variable is not defined');
  }

  jwt.verify(token, accessTokenSecret, (err: jwt.VerifyErrors | null, decoded?: JwtPayload | string) => {
    if (err || !decoded || typeof decoded === 'string' || !decoded.currentUserEmail) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.currentUserEmail = decoded.currentUserEmail;
    next();
  });
};
