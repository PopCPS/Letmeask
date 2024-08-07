import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import z from "zod";

export async function createUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/user', {
    schema: {
      body: z.object({
        name: z.string().min(4),
        email: z.string().email(),
        password: z.string().min(8),
        image: z.string().url()
      })
    },
  }, async (request) => {
   const {
    name,
    email,
    password,
    image,
   } = request.body

   const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
      image,
    }
   }) 

   return user
  })
}
