import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const secretKey = 'mkt23';
export function authenticateToken(req: Request & {userId?: any}, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Authentication token missing.' });
    }
    jwt.verify(token, secretKey, (err, decoded: any) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token.' });
        }
        req.userId = decoded.userId;

        next();
    });
}