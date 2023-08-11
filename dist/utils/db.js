"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/utils/db.ts
const pg_promise_1 = __importDefault(require("pg-promise"));
const pgp = (0, pg_promise_1.default)();
const connectionString = process.env.DATABASE_URL || 'postgres://mohan:password@localhost:5432/test_dev';
const db = pgp(connectionString);
exports.default = db;
//# sourceMappingURL=db.js.map