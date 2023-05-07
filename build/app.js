"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const BookController_1 = __importDefault(require("./controllers/BookController"));
const dbConnection = new db_1.default();
const database = dbConnection.getDB();
class App {
    constructor(PORT, controllers) {
        this.PORT = PORT;
        this.initControllers = (controllers) => {
            controllers.forEach((controller) => {
                this.app.use('/', controller.router);
            });
        };
        this.listen = () => {
            this.app.listen(this.PORT, () => {
                console.log(`App listening on PORT: ${this.PORT}`);
            });
        };
        this.PORT = PORT;
        this.app = (0, express_1.default)();
        this.initControllers(controllers);
    }
}
const app = new App(3000, [
    new BookController_1.default()
]);
app.listen();
// async function test () {
//   try {
//     console.log('Started')
//     const books = database.collection('books')
//     const book = await books.findOne({title: "1984"})
//     console.log(book)
//   } catch (error) {
//     console.log(error)
//   } finally {
//     console.log('finally')
//     await client.close()
//   }
// }
// test()
