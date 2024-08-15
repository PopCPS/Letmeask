import fastify, { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export const createPost = async (app: FastifyInstance) => {
 app.withTypeProvider<ZodTypeProvider>().post('/post', {
    onRequest: [
      async (request, reply) => {
        try {
          await request.jwtVerify(); 
        } catch (err) {
          reply.code(401).send({ error: 'Unauthorized' });
        }
      }
    ],
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

    return request

    // const post = await prisma.post.create({
    //   data: {
    //     title,
    //     question,
    //     user_id: userId,
    //     created_at: new Date(),
    //   },
    // })

  })
}
