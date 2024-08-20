import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { jwtPayload } from "../../lib/interfaces/jwt-payload";

export const unlikePost = async (app: FastifyInstance) => [
  app.withTypeProvider<ZodTypeProvider>().delete('/post/like', {
    schema: {
      querystring: z.object({
        post_id: z.string().uuid(),
      })
    },
  }, async (request) => {
    const {
      post_id,
    } = request.query

    const { id } = await request.jwtDecode() as jwtPayload

    await prisma.postLike.delete({
      where: {
        post_id_user_id: {
          post_id,
          user_id: id
        }
      }
    })

  })
]