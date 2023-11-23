import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { search } from './search'
import { nearby } from './nearby'
import { create } from './create'

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  // pra todas as rotas desse arquivo ele vai executar o nosso middleware de autenticação

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', create)
}
