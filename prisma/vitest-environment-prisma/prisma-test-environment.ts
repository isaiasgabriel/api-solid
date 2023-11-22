import { randomUUID } from 'node:crypto'
import 'dotenv/config'
import { Environment } from 'vitest'
import { PrismaClient } from '@prisma/client'
import { execSync } from 'node:child_process'

const prisma = new PrismaClient()

function generateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a database URL')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  transformMode: 'ssr',
  name: 'prisma',
  async setup() {
    // setup são as config rodadas antes de cada suite de testes

    const schema = randomUUID()
    const databaseUrl = generateDatabaseUrl(schema)

    process.env.DATABASE_URL = databaseUrl

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      },
    }
  },
}
