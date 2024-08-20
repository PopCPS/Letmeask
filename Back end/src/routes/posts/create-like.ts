import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { jwtPayload } from "../../lib/interfaces/jwt-payload";

export const likePost = async (app: FastifyInstance) => [
  app.withTypeProvider<ZodTypeProvider>().post('/post/like', {
    schema: {
      body: z.object({
        post_id: z.string().uuid(),
      })
    }
  }, async (request) => {
    const {
      post_id,
    } = request.body

    const { id } = await request.jwtDecode() as jwtPayload

    await prisma.postLike.create({
      data: {
        user_id: id,
        post_id,
      }
    })

  })
]