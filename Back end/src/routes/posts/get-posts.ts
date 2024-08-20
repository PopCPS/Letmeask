import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../lib/prisma";
import z from "zod";

export const getPost = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get('/getPosts', {
    schema: {
      querystring: z.object({
        page: z.string().default('1'),
      })
    },
  }, async (request) => {

    const { page } = request.query

    const skip = (parseInt(page) - 1) * 20
    const take = 20

    const posts = await prisma.post.findMany({
      skip,
      take,
      orderBy: {
        created_at: 'desc'
      },
      select: {
        id: true,
        title: true,
        question: true,
        reply: true,
        created_at: true,
        created_by: {
          select: {
            image: true,
            name: true,
            id: true,
            password: false,
            email: false,
          }
        }
      },
    })

    return posts

  })
}