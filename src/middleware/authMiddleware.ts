import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const secretKey = 'mkt23';
export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.log('2222222222222222')

        return res.status(401).json({ error: 'Authentication token missing.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        console.log('dsdffddffddf')
        if (err) {
            return res.status(403).json({ error: 'Invalid token.' });
        }
        console.log('888888888888888888')
        console.log('decoded=========',decoded)
        // req.userId = decoded.userId;

        next();
    });
}