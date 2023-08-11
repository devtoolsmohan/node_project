"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const router = express_1.default.Router();
router.get('/posts', postController_1.getAllposts);
router.get('/posts/:id', postController_1.getPost);
router.post('/posts', postController_1.createPost);
router.put('/posts//:id', postController_1.updatePost);
router.delete('/posts/:id', postController_1.deletePost);
exports.default = router;
//# sourceMappingURL=postRoutes.js.map