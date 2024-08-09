import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import { hashSync } from "bcrypt";
import z from "zod";

export async function signup(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/auth/signup', {
    schema: {
      body: z.object({
        name: z.string().min(4),
        email: z.string().email(),
        password: z.string().min(8),
        image: z.string().url().optional(),
      })
    },
  }, async (request) => {
   const {
    name,
    email,
    image,
    password,
   } = request.body

   let user = await prisma.user.findFirst({
    where: {
      email
    }
   })

   if (user) {
    throw Error("User already exists!")
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
