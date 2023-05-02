import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const accessTokenSecret = process.env.JWTSECRET as string;

  if (!accessTokenSecret) {
    throw new Error('JWTSECRET environment variable is not defined');
  }

  jwt.verify(token, accessTokenSecret, (err: jwt.VerifyErrors | null, decoded?: JwtPayload | string) => {
    if (err || !decoded || typeof decoded === 'string' || !decoded.currentUserEmail) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.currentUserEmail = decoded.currentUserEmail;
    next();
  });
};

export default authenticate;
