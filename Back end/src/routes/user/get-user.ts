import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { jwtPayload } from "../../lib/interfaces/jwt-payload";
import { prisma } from "../../lib/prisma";

export const getUser = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get('/user', 
  async (request, reply) => {
    
    const { id } = await request.jwtDecode() as jwtPayload

    const user = await prisma.user.findFirst({
      where: {
        id
      },
      select: {
        url: true,
        name: true,
        image: true,
        email: true,
      }
    })

    if (!user) {
      return reply.status(404).send({ error: 'User not found' });
    }

    return user
  })
}