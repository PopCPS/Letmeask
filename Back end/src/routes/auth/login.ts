import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../lib/prisma";
import { compareSync } from "bcrypt";
import z from "zod";

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

    const token = await reply.jwtSign({ id: user.id })

    reply.cookie('token', token, {
      maxAge: 1000 * 60,
      path: '/',
      sameSite: 'none',
      httpOnly: true,
      secure: true,
  }).send('Cookie all set!');

    return ({ user, token })
  }
)}