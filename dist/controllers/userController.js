"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = exports.getAllUsers = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../utils/db"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const saltRounds = 5;
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { firstName, lastName, email, password } = req.body;
        try {
            const hashedPassword = yield bcryptjs_1.default.hash(password, saltRounds);
            const newUser = yield db_1.default.one('INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *', [firstName, lastName, email, hashedPassword]);
            res.status(201).json(newUser);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "User Can't Register." });
        }
    });
}
exports.registerUser = registerUser;
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const user = yield db_1.default.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
            if (!user) {
                return res.status(401).json({ error: 'User not found.' });
            }
            const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Incorrect password.' });
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, authMiddleware_1.secretKey, { expiresIn: '5d' });
            res.status(200).json({ token });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while logging in.' });
        }
    });
}
exports.loginUser = loginUser;
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield db_1.default.any('SELECT * FROM users');
            res.status(200).json(users);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    });
}
exports.getAllUsers = getAllUsers;
function currentUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.body.currentuser.userId;
        console.log('[userId]', userId);
        try {
            const users = yield db_1.default.one('SELECT * FROM users ');
            const existingUser = yield db_1.default.oneOrNone('SELECT * FROM users WHERE id = $1', [userId]);
            res.status(200).json(users);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    });
}
exports.currentUser = currentUser;
//# sourceMappingURL=userController.js.map