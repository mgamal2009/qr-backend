import { Request, Response } from 'express';
import { qrService } from '../services/qr.service';


export function getCurrentQr(req: Request, res: Response) {
  const uuid = qrService.getCurrent();
  res.json({ uuid, expiresInSeconds: 60 });
}