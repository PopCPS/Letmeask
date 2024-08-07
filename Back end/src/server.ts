import fastify from "fastify";
import cors from "@fastify/cors"
import { createUser } from "./routes/create-user";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

const app = fastify()

app.register(cors, {
  origin: true,
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createUser)

app.listen({ port: 3333 }).then(() => {
  console.log('Server running!')
})