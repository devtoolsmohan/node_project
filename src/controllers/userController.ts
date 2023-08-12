import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import db from '../utils/db';
import { secretKey , authenticateToken} from '../middleware/authMiddleware';
const saltRounds = 5;


export async function registerUser(req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser: User = await db.one('INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [firstName, lastName, email, hashedPassword]
        );
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "User Can't Register." });
    }}

export async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        const user: User | null = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);

        if (!user) {
            return res.status(401).json({ error: 'User not found.' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Incorrect password.' });
        }
        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '5d' });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while logging in.' });
    }
}

export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await db.any('SELECT * FROM users');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function currentUser(req: Request, res: Response) {
    const { userId } = req.body.currentuser.userId;
    console.log('[userId]',userId);
    try {
        const users = await db.one('SELECT * FROM users ');
        const existingUser: User | null = await db.oneOrNone('SELECT * FROM users WHERE id = $1', [userId]);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}



