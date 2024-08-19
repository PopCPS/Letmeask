import fastify, { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

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
    } 

    const { id } = await request.jwtDecode()

    const post = await prisma.post.create({
      data: {
        title,
        question,
        user_id: id,
        created_at: new Date(),
      },
    })

  })
}
