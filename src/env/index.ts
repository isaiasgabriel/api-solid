import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌Invalid Environment Variables', _env.error.format())

  throw new Error('❌Invalid Environmet Variables')

  // Why 2 error messages?
  // 1. To show the reason of the error
  // 2. To stop our application
  // We can't run it without our environment variables
}

export const env = _env.data
