import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    throw new Error(
      'ADMIN_EMAIL e ADMIN_PASSWORD são obrigatórios.'
    )
  }

  const passwordHash = await bcrypt.hash(password, 12)

  const user = await prisma.adminUser.upsert({
    where: {
      email,
    },

    update: {
      passwordHash,
    },

    create: {
      email,
      passwordHash,
      name: 'Administrador',
      role: 'ADMIN',
    },
  })

  console.log(
    `Administrador criado: ${user.email}`
  )
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })