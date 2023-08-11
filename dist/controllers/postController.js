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
exports.deletePost = exports.updatePost = exports.getPost = exports.createPost = exports.getAllposts = void 0;
const db_1 = __importDefault(require("../utils/db"));
function getAllposts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.userId;
        try {
            const posts = yield db_1.default.any('SELECT * FROM posts WHERE userid = $1', [userId]);
            res.status(200).json(posts);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching posts.' });
        }
    });
}
exports.getAllposts = getAllposts;
function createPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userid, name, description, date } = req.body;
        try {
            const newPost = yield db_1.default.one('INSERT INTO posts (userid, name, description, date) VALUES ($1, $2, $3, $4) RETURNING *', [userid, name, description, date]);
            res.status(201).json(newPost);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Post can't Created." });
        }
    });
}
exports.createPost = createPost;
function getPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const postId = req.params.id;
        try {
            const post = yield db_1.default.oneOrNone('SELECT * FROM posts WHERE id = $1', [postId]);
            if (!post) {
                return res.status(404).json({ error: 'Post not found.' });
            }
            res.status(200).json(post);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching the post.' });
        }
    });
}
exports.getPost = getPost;
function updatePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const postId = req.params.id;
        const { userid, name, description, date } = req.body;
        try {
            const updatedPost = yield db_1.default.oneOrNone('UPDATE posts SET userid = $1, name = $2, description = $4, date = $5 WHERE id = $3 RETURNING *', [userid, name, postId, description, date]);
            if (!updatedPost) {
                return res.status(404).json({ error: 'Post not updated.' });
            }
            res.status(200).json(updatedPost);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while updating the post.' });
        }
    });
}
exports.updatePost = updatePost;
function deletePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const postId = req.params.id;
        try {
            const deletedPost = yield db_1.default.oneOrNone('DELETE FROM posts WHERE id = $1 RETURNING *', [postId]);
            if (!deletedPost) {
                return res.status(404).json({ error: 'Post not found.' });
            }
            res.status(200).json({ message: 'Post deleted successfully.' });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while deleting the post.' });
        }
    });
}
exports.deletePost = deletePost;
//# sourceMappingURL=postController.js.map