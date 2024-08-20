import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import z from "zod";

// const paginationSchema = z.object({
//   page: z.number().min(1).default(1),
//   pageSize: z.number().min(1).max(100).default(20),
// });

export const getPost = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get('/getPosts', {
    schema: {
      querystring: z.object({
        page: z.string().default('1'),
      })
    },
  }, async (request) => {

    const { page } = request.query

    console.log(request.query)

    const skip = (parseInt(page) - 1) * 20
    const take = 20

    const posts = await prisma.post.findMany({
      skip,
      take,
      orderBy: {
        created_at: 'desc'
      },
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