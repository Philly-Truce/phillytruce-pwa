var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
const MONGO_URI = process.env.DATABASE_URL || "";
if (!MONGO_URI) {
    throw new Error("Please define the MONGO_URI environment variable inside .env.local");
}
// @ts-ignore
let cached = global.mongoose || { conn: null, promise: null };
if (!cached) {
    // @ts-ignore
    cached = global.mongoose = { conn: null, promise: null };
}
function dbConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        if (cached.conn) {
            return cached.conn;
        }
        if (!cached.promise) {
            const opts = {
                bufferCommands: false,
            };
            cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
                return mongoose.connection;
            });
        }
        cached.conn = yield cached.promise;
        return cached.conn;
    });
}
export default dbConnect;
