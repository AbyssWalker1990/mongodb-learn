"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BookController_1 = __importDefault(require("./controllers/BookController"));
class App {
    constructor(PORT, controllers) {
        this.PORT = PORT;
        this.initMiddlewares = () => {
            this.app.use(express_1.default.urlencoded({ extended: false }));
            this.app.use(express_1.default.json());
        };
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
        this.initMiddlewares();
        this.initControllers(controllers);
    }
}
const app = new App(3000, [
    new BookController_1.default()
]);
app.listen();
