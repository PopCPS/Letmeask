import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import { compareSync } from "bcrypt";
import * as jwt from 'jsonwebtoken'
import z from "zod";
import { JWT_SECRET } from "../lib/secrets";

export const signin = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post('/auth/signin', {
    schema: {
      body: z.object({
        email: z.string().email(),
        password: z.string()
      })
    }
  }, async (request) => {
    const { email, password } = request.body

    let user = await prisma.user.findFirst({
      where: {
        email
      }
    })

    if(!user) {
      throw Error("User doesn't exist!")
    }
    if(!compareSync(password, user.password)){
      throw Error("Incorrect password!")
    }

    const token = jwt.sign({
      userId: user.id
    }, JWT_SECRET)

    return ({ user, token })

  }
)}