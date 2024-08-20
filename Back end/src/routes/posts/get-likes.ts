import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { jwtPayload } from "../../lib/interfaces/jwt-payload";

export const getLike = async (app: FastifyInstance) => [
  app.withTypeProvider<ZodTypeProvider>().get('/post/like', {
    schema: {
      querystring: z.object({
        post_id: z.string().uuid(),
      })
    }
  }, async (request) => {
    const {
      post_id,
    } = request.query

    let didUserLike = false
    const { id } = await request.jwtDecode() as jwtPayload
    
    const userLike = await prisma.postLike.findFirst({
      where: {
        user_id: id,
        post_id
      }
    })

    console.log(userLike)

    if(userLike) {
      didUserLike = true
    }

    const likes = await prisma.postLike.findMany({
      where: {
        post_id,
      },
      select: {
        post_id: true,
      }
    })


    return ({ likes, didUserLike })
  })
]