import { PrismaClient } from '../../src/generated/prisma/client.js'
import { PrismaPg } from "@prisma/adapter-pg";
import 'dotenv/config';
import pg from 'pg';

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool as any);

export const dbClient = new PrismaClient({ adapter });