"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.secretKey = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.secretKey = 'mkt23';
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        console.log('2222222222222222');
        return res.status(401).json({ error: 'Authentication token missing.' });
    }
    jsonwebtoken_1.default.verify(token, exports.secretKey, (err, decoded) => {
        console.log('dsdffddffddf');
        if (err) {
            return res.status(403).json({ error: 'Invalid token.' });
        }
        console.log('888888888888888888');
        console.log('decoded=========', decoded);
        // req.userId = decoded.userId;
        next();
    });
}
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=authMiddleware.js.map