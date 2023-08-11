// src/utils/db.ts
import pgPromise from 'pg-promise';

const pgp = pgPromise();

const connectionString = process.env.DATABASE_URL || 'postgres://mohan:password@localhost:5432/test_dev';

const db = pgp(connectionString);

export default db;


