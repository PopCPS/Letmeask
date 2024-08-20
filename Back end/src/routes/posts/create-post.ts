import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { jwtPayload } from "../../lib/interfaces/jwt-payload";

export const createPost = async (app: FastifyInstance) => {
 app.withTypeProvider<ZodTypeProvider>().post('/post', {
    schema: {
      body: z.object({
        title: z.string(),
        question: z.string()
      })
    },
 }, async (request, reply) => {
    const {
      title,
      question,
    } = request.body

    if(!title) {
      reply.code(400).send({ error: 'Título obrigatório!'})
      return
    }
    if(!question) {
      reply.code(400).send({ error: 'Pergunta obrigatória!'})
      return
    } 

    const { id } = await request.jwtDecode() as jwtPayload

    await prisma.post.create({
      data: {
        title,
        question,
        user_id: id,
        created_at: new Date(),
      },
    })

  })
}
