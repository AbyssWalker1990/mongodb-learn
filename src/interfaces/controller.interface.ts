import { type Router } from 'express'

interface Controller {
  readonly path: string
  readonly router: Router

  initRoutes: () => void
}

export default Controller