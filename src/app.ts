import express from 'express'
import BookController from './controllers/BookController'
import type Controller from './interfaces/controller.interface'

class App {
  private readonly app: express.Application
  constructor (public PORT: number, controllers: Controller[]) {
    this.PORT = PORT
    this.app = express()
    this.initMiddlewares()
    this.initControllers(controllers)
  }

  private readonly initMiddlewares = (): void => {
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(express.json())
  }

  private readonly initControllers = (controllers: Controller[]): void => {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router)
    })
  }

  public listen = (): void => {
    this.app.listen(this.PORT, () => {
      console.log(`App listening on PORT: ${this.PORT}`)
    })
  }
}

const app = new App(3000, [
  new BookController()
])
app.listen()
