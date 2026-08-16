// Remove tudo que não for dígito
export function onlyDigits(value: string): string {
  return value.replace(/\D/g, '')
}

// Formata enquanto o usuário digita: (11) 91234-5678
export function formatPhoneBR(value: string): string {
  const digits = onlyDigits(value).slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  const isCell = digits.length >= 11
  const splitAt = isCell ? 7 : 6
  return `(${digits.slice(0, 2)}) ${digits.slice(2, splitAt)}-${digits.slice(splitAt)}`
}

// Valida DDD (11-99) + número com 8 ou 9 dígitos (total: 10 ou 11 dígitos)
export function isValidPhoneBR(value: string): boolean {
  const digits = onlyDigits(value)
  if (digits.length !== 10 && digits.length !== 11) return false

  const ddd = parseInt(digits.slice(0, 2), 10)
  if (ddd < 11 || ddd > 99) return false

  // celular (11 dígitos) precisa começar com 9 depois do DDD
  if (digits.length === 11 && digits[2] !== '9') return false

  return true
}

// Gera o link do WhatsApp a partir do número salvo (com ou sem formatação/DDI)
export function toWhatsAppLink(value: string): string {
  let digits = onlyDigits(value)
  if (!digits.startsWith('55')) digits = `55${digits}`
  return `https://wa.me/${digits}`
}
