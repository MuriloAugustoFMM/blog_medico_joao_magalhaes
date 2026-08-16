import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { isValidPhoneBR } from '@/lib/phone'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, whatsapp, email } = body as {
      name?: string
      whatsapp?: string
      email?: string
    }

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Informe seu nome.' }, { status: 400 })
    }
    if (!whatsapp?.trim() || !isValidPhoneBR(whatsapp)) {
      return NextResponse.json(
        { error: 'Digite um WhatsApp válido, com DDD (ex: (11) 91234-5678).' },
        { status: 400 }
      )
    }
    if (email && !isValidEmail(email)) {
      return NextResponse.json({ error: 'E-mail inválido.' }, { status: 400 })
    }

    const cleanWhatsapp = whatsapp.trim()
    const cleanEmail = email?.trim() || null

    // Checagem prévia — dá uma mensagem específica em vez de um erro genérico
    const existingByPhone = await prisma.lead.findUnique({ where: { whatsapp: cleanWhatsapp } })
    if (existingByPhone) {
      return NextResponse.json(
        { error: 'Esse WhatsApp já está cadastrado. Em breve alguém da equipe entra em contato!' },
        { status: 409 }
      )
    }

    if (cleanEmail) {
      const existingByEmail = await prisma.lead.findUnique({ where: { email: cleanEmail } })
      if (existingByEmail) {
        return NextResponse.json(
          { error: 'Esse e-mail já está cadastrado. Em breve alguém da equipe entra em contato!' },
          { status: 409 }
        )
      }
    }

    let lead
    try {
      lead = await prisma.lead.create({
        data: {
          name: name.trim(),
          whatsapp: cleanWhatsapp,
          email: cleanEmail,
          source: 'pre-consulta',
        },
      })
    } catch (err) {
      // Fallback de segurança: se dois envios chegarem ao mesmo tempo (corrida),
      // a checagem acima pode não pegar — o banco garante a unicidade de qualquer forma.
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
        return NextResponse.json(
          { error: 'Esse contato já está cadastrado. Em breve alguém da equipe entra em contato!' },
          { status: 409 }
        )
      }
      throw err
    }

    if (resend && process.env.NOTIFICATION_EMAIL) {
      try {
        await resend.emails.send({
          from: process.env.NOTIFICATION_FROM_EMAIL || 'onboarding@resend.dev',
          to: process.env.NOTIFICATION_EMAIL,
          subject: `Novo contato: ${lead.name}`,
          html: `
            <p><strong>Nome:</strong> ${lead.name}</p>
            <p><strong>WhatsApp:</strong> ${lead.whatsapp}</p>
            <p><strong>E-mail:</strong> ${lead.email || 'não informado'}</p>
            <p><strong>Recebido em:</strong> ${new Date(lead.createdAt).toLocaleString('pt-BR')}</p>
          `,
        })
      } catch (emailErr) {
        console.error('Falha ao enviar notificação por e-mail:', emailErr)
      }
    }

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 })
  } catch (err) {
    console.error('Erro ao salvar lead:', err)
    return NextResponse.json(
      { error: 'Não foi possível enviar agora. Tente novamente.' },
      { status: 500 }
    )
  }
}
