import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { WEB_DOMAIN } from "../../lib/secrets";

export const logout = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post('/auth/logout', {

  }, async (request, reply) => {
    if(reply.getHeader('authToken')) {
      reply.setCookie('authToken', '', {
        domain: WEB_DOMAIN,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: Date.now()
      }).send('Logged out successfully!')
    }
  }
)}