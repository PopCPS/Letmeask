import fastify from "fastify";
import cors from "@fastify/cors"
import { signup } from "./routes/create-user";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { signin } from "./routes/get-user";
  
const app = fastify()

app.register(cors, {
  origin: true,
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(signin)
app.register(signup)

app.listen({ port: 3333 }).then(() => {
  console.log('Server running!')
})