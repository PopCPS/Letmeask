import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";

export const getPost = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get('/getPosts', {

  }, async (request, reply) => {

    const posts = await prisma.post.findMany({
      select: {
        title: true,
        question: true,
        Reply: true,
        created_at: true,
        created_by: true
      },
    })

    return posts

  })
}