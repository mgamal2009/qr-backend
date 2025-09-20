import {Request, Response, NextFunction} from 'express';
import {verifyJwt} from '../utils/jwt';


export interface AuthRequest extends Request {
  user?: { id: string; email?: string; iat?: number; exp?: number };
}


export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({error: 'Authorization header missing'});
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = verifyJwt<{ id: string; email: string }>(token);
    req.user = {id: payload.id, email: payload.email} as any;
    next();
  } catch (err: any) {
    return res.status(401).json({error: 'Invalid or expired token'});
  }
}