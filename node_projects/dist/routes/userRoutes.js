"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.get('/', authMiddleware_1.authenticateToken, userController_1.getAllUsers);
router.post('/profile', authMiddleware_1.authenticateToken, userController_1.currentUser);
router.post('/register', userController_1.registerUser);
router.post('/login', userController_1.loginUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map