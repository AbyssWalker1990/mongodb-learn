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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const db_1 = __importDefault(require("../db"));
class BookController {
    constructor() {
        this.path = '/books';
        this.router = express_1.default.Router();
        this.initRoutes = () => {
            this.router.get(`${this.path}/`, this.getAllBooks);
            this.router.get(`${this.path}/:bookId`, this.getBookById);
        };
        this.getAllBooks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var e_1, _a;
            const bookList = [];
            try {
                const data = db_1.default.collection('books').find();
                try {
                    for (var data_1 = __asyncValues(data), data_1_1; data_1_1 = yield data_1.next(), !data_1_1.done;) {
                        const book = data_1_1.value;
                        bookList.push(book);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (data_1_1 && !data_1_1.done && (_a = data_1.return)) yield _a.call(data_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            catch (error) {
                res.status(500).json({ error });
            }
            res.status(200).json({ message: bookList });
        });
        this.getBookById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const bookId = new mongodb_1.ObjectId(req.params.bookId);
            try {
                const data = yield db_1.default.collection('books').findOne({ _id: bookId });
                res.status(200).json({ book: data });
            }
            catch (error) {
                res.status(500).json({ err: 'Cant find' });
            }
        });
        this.initRoutes();
    }
}
exports.default = BookController;
