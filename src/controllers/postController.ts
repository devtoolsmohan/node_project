import { Request, Response } from 'express';
import { Post } from '../models/Post';
import db from '../utils/db';
import bcrypt from "bcryptjs";
import {User} from "../models/User";

export async function getAllposts(req: Request, res: Response) {
    const userId = req.userId;
    try {
        const posts = await db.any('SELECT * FROM posts WHERE userid = $1', [userId]);

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching posts.' });
    }
}

export async function createPost(req: Request, res: Response) {
    const { name, description, date } = req.body;
    const userId = req.userId;

    try {
        const newPost: User = await db.one('INSERT INTO posts (userid, name, description, date) VALUES ($1, $2, $3, $4) RETURNING *',
            [userId, name, description, date]
        );
        res.status(201).json(newPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Post can't Created." });
    }
}

export async function getPost(req: Request, res: Response) {
    const postId = req.params.id;

    try {
        const post = await db.oneOrNone('SELECT * FROM posts WHERE id = $1', [postId]);

        if (!post) {
            return res.status(404).json({ error: 'Post not found.' });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the post.' });
    }
}
export async function updatePost(req: Request, res: Response) {
    const postId = req.params.id;
    const { name, description, date } = req.body;

    try {
        const updatedPost = await db.oneOrNone('UPDATE posts SET name = $1, description = $3, date = $4 WHERE id = $2 RETURNING *',
            [name, postId, description, date ]);

        if (!updatedPost) {
            return res.status(404).json({ error: 'Post not updated.' });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the post.' });
    }}
export async function deletePost(req: Request, res: Response) {
    const postId = req.params.id;

    try {
        const deletedPost = await db.oneOrNone('DELETE FROM posts WHERE id = $1 RETURNING *', [postId]);

        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found.' });
        }

        res.status(200).json({ message: 'Post deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the post.' });
    }
}
