/**
 * Utilitários da aplicação
 */

// Mapear nome do componente para URL amigável
const pageMap = {
  Home: '/',
  Precos: '/precos',
  Cadastro: '/cadastro',
  ClientDashboard: '/dashboard',
  BookCleaning: '/agendar',
  ClientRequests: '/meus-pedidos',
  ClientProfilePage: '/perfil',
  CleanerDashboard: '/minhas-faxinas',
  CleanerSchedule: '/agenda',
  CleanerAvailability: '/disponibilidade',
  CleanerProfile: '/perfil-faxineira',
  CleanerRewards: '/recompensas',
  CleanerWithdrawals: '/saques',
  AdminDashboard: '/admin',
  AdminCleaners: '/admin/faxineiras',
  AdminRequests: '/admin/pedidos',
  AdminWithdrawals: '/admin/saques',
  AdminSettings: '/admin/configuracoes',
  AdminSupport: '/admin/suporte',
}

/**
 * Cria URL da página baseado no nome do componente
 * @param {string} pageName - Nome do componente
 * @returns {string} URL amigável
 */
export const createPageUrl = (pageName) => {
  return pageMap[pageName] || '/'
}

/**
 * Formata moeda brasileira
 * @param {number} value
 * @returns {string} Valor formatado
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

/**
 * Formata telefone
 * @param {string} phone
 * @returns {string} Telefone formatado
 */
export const formatPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length !== 11) return phone
  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
}

/**
 * Valida email
 * @param {string} email
 * @returns {boolean}
 */
export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Valida CPF
 * @param {string} cpf
 * @returns {boolean}
 */
export const validateCPF = (cpf) => {
  const cleaned = cpf.replace(/\D/g, '')
  if (cleaned.length !== 11) return false
  
  let sum = 0
  let remainder
  
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (11 - i)
  }
  
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleaned.substring(9, 10))) return false
  
  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (12 - i)
  }
  
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleaned.substring(10, 11))) return false
  
  return true
}

/**
 * Trunca texto com ellipsis
 * @param {string} text
 * @param {number} length
 * @returns {string}
 */
export const truncateText = (text, length = 50) => {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

/**
 * Delay em milissegundos
 * @param {number} ms
 * @returns {Promise}
 */
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Calcula preço do serviço
 * @param {number} hours - Horas de serviço
 * @param {boolean} includeProducts - Incluir produtos
 * @param {string} type - Tipo de serviço
 * @param {object} settings - Configurações de preço
 * @returns {object} Detalhes do preço
 */
export const calculatePrice = (
  hours = 2,
  includeProducts = false,
  type = 'padrao',
  settings = { first_hour_price: 40, additional_hour_price: 20, products_price: 30 }
) => {
  const firstHour = settings.first_hour_price || 40
  const additionalHour = settings.additional_hour_price || 20
  const productsPrice = includeProducts ? (settings.products_price || 30) : 0

  let basePrice = firstHour
  if (hours > 1) {
    basePrice += (hours - 1) * additionalHour
  }

  // Aplicar desconto se necessário (exemplo: tipo 'desconto')
  const discount = type === 'desconto' ? basePrice * 0.1 : 0

  const total = basePrice + productsPrice - discount

  return {
    firstHour,
    additionalHours: (hours - 1) * additionalHour,
    productsPrice,
    discount,
    total,
    breakdown: {
      'Primeira hora': firstHour,
      'Horas adicionais': (hours - 1) * additionalHour,
      'Produtos': productsPrice,
      'Desconto': -discount,
    },
  }
}

/**
 * Gera ID único
 * @returns {string}
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
