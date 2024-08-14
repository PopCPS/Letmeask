import fastify from "fastify";
import cors from "@fastify/cors"
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { register } from "./routes/register";
import { login } from "./routes/login";
import fastifyCookie from "@fastify/cookie";
import { JWT_SECRET } from "./lib/secrets";
  
const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(fastifyCookie, {
  secret: JWT_SECRET, // Required for signing cookies
  parseOptions: {} // See the 'cookie' package for more options
});

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(login)
app.register(register)

app.listen({ port: 3333 }).then(() => {
  console.log('Server running!')
})