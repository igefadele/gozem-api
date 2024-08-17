
import dotenv from 'dotenv';
import { env } from "process";

dotenv.config();
export const PORT: number = env.PORT as unknown as number || 3000;
export const BASE_URL: string = env.BASE_URL as string;
export const SECURE_COOKIE: string = env.SECURE_COOKIE as string;
export const SESSION_SECRET: string = env.SESSION_SECRET as string;
export const MONGODB_URL: string = env.MONGODB_URL as string;
