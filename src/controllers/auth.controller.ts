import {Request, Response} from 'express';
import {PrismaClient} from '@prisma/client';
import bcrypt from "bcryptjs";
import {signJwt} from '../utils/jwt';
import {validationResult} from 'express-validator';
import {sendResetEmail} from '../utils/email';


const prisma = new PrismaClient();


export async function register(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()});


  const {email, password} = req.body as { email: string; password: string };
  const existing = await prisma.user.findUnique({where: {email}});
  if (existing) return res.status(400).json({error: 'Email already exists'});


  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({data: {email, passwordHash}});
  const token = signJwt({id: user.id, email: user.email});
  res.json({token, user: {id: user.id, email: user.email}});
}


export async function login(req: Request, res: Response) {
  const {email, password} = req.body as { email: string; password: string };
  const user = await prisma.user.findUnique({where: {email}});
  if (!user) return res.status(401).json({error: 'Invalid credentials'});
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({error: 'Invalid credentials'});
  const token = signJwt({id: user.id, email: user.email});
  res.json({token, user: {id: user.id, email: user.email}});
}


export async function forgotPassword(req: Request, res: Response) {
  const {email} = req.body as { email: string };
  if (!email) return res.status(400).json({error: 'Email required'});
  const user = await prisma.user.findUnique({where: {email}});
  if (!user) return res.status(200).json({message: 'If the email exists, a reset link was sent'});


  const token = Math.random().toString(36).slice(2, 12);
  const expiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour
  await prisma.user.update({where: {id: user.id}, data: {resetToken: token, resetTokenExpiry: expiry}});


  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
  await sendResetEmail(email, resetLink);
  res.json({message: 'If the email exists, a reset link was sent'});
}


export async function me(req: Request, res: Response) {
// requireAuth middleware sets req.user
  const userId = (req as any).user?.id;
  if (!userId) return res.status(401).json({error: 'Unauthorized'});
  const user = await prisma.user.findUnique({where: {id: userId}});
  if (!user) return res.status(404).json({error: 'User not found'});
  res.json({id: user.id, email: user.email, createdAt: user.createdAt});
}