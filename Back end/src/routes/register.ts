import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import { hashSync } from "bcrypt";
import z from "zod";

export async function register(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/auth/register', {
    schema: {
      body: z.object({
        name: z.string().min(4),
        email: z.string().email(),
        password: z.string().min(8),
        image: z.string().url().optional(),
      }),
    },
  }, async (request) => {
   const {
    name,
    email,
    password,
    image,
   } = request.body

   let user = await prisma.user.findFirst({
    where: {
      email
    }
   })

   if (user) {
    throw Error("Usuário já existe!")
   }

   user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
      image,
    }
   }) 

   return { user }
  })
}
