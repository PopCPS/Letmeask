import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import { compareSync } from "bcrypt";
import * as jwt from 'jsonwebtoken'
import z from "zod";
import { JWT_SECRET, WEB_DOMAIN } from "../lib/secrets";

export const login = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post('/auth/login', {
    schema: {
      body: z.object({
        email: z.string().email(),
        password: z.string()
      })
    }
  }, async (request, reply) => {
    const { email, password } = request.body

    let user = await prisma.user.findFirst({
      where: {
        email
      }
    })

    if(!user) {
      reply.code(401).send({ error: "Usuário não existe!" })
      return
    }
    if(!compareSync(password, user.password)){
      reply.code(401).send({ error: "Senha incorreta!" })
    }

    const token = jwt.sign({
      userId: user.id
    }, 
    JWT_SECRET,
    { 
      expiresIn: '7d'
    })

    reply.setCookie('authToken', token, {
      domain: WEB_DOMAIN,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return ({ user, token })
  }
)}