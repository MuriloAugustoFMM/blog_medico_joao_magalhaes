import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

import { prisma } from '@/lib/prisma'

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/login',
  },

  providers: [
    Credentials({
      credentials: {
        email: {
          label: 'E-mail',
          type: 'email',
        },
        password: {
          label: 'Senha',
          type: 'password',
        },
      },

      async authorize(credentials) {
        if (
          !credentials?.email ||
          !credentials?.password
        ) {
          return null
        }

        const email = String(credentials.email)
          .trim()
          .toLowerCase()

        const password = String(credentials.password)

        const user = await prisma.adminUser.findUnique({
          where: {
            email,
          },
        })

        if (!user) {
          return null
        }

        const valid = await bcrypt.compare(
          password,
          user.passwordHash
        )

        if (!valid) {
          return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }

      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.role = token.role
      }

      return session
    },
  },

  debug: process.env.NODE_ENV === 'development',
})
