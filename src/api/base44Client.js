/**
 * Base44 API Client
 * Configuração e integração com Base44 backend
 */

class Base44Client {
  constructor() {
    this.apiUrl = import.meta.env.VITE_BASE44_API_URL || 'https://api.base44.dev'
    this.clientId = import.meta.env.VITE_BASE44_CLIENT_ID
    this.clientSecret = import.meta.env.VITE_BASE44_CLIENT_SECRET
    this.token = localStorage.getItem('base44_token')
    this.user = null
  }

  // ============ AUTH METHODS ============
  auth = {
    login: async (email, password) => {
      try {
        const response = await fetch(`${this.apiUrl}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        })
        const data = await response.json()
        if (data.token) {
          this.token = data.token
          localStorage.setItem('base44_token', data.token)
          this.user = data.user
        }
        return data
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },

    register: async (userData) => {
      try {
        const response = await fetch(`${this.apiUrl}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        })
        return await response.json()
      } catch (error) {
        console.error('Register error:', error)
        throw error
      }
    },

    me: async () => {
      try {
        const response = await fetch(`${this.apiUrl}/auth/me`, {
          headers: this._getHeaders(),
        })
        if (response.status === 401) {
          this.logout()
          return null
        }
        const data = await response.json()
        this.user = data
        return data
      } catch (error) {
        console.error('Me error:', error)
        return null
      }
    },

    logout: () => {
      this.token = null
      this.user = null
      localStorage.removeItem('base44_token')
    },
  }

  // ============ ENTITIES METHOD ============
  entities = {
    CleanerProfile: this._createEntityClient('CleanerProfile'),
    ClientProfile: this._createEntityClient('ClientProfile'),
    CleaningRequest: this._createEntityClient('CleaningRequest'),
    Reward: this._createEntityClient('Reward'),
    Withdrawal: this._createEntityClient('Withdrawal'),
    PaymentSettings: this._createEntityClient('PaymentSettings'),
    Fine: this._createEntityClient('Fine'),
    AutomaticPayment: this._createEntityClient('AutomaticPayment'),
    RegularJob: this._createEntityClient('RegularJob'),
    CleanerAvailability: this._createEntityClient('CleanerAvailability'),
  }

  // ============ HELPER METHODS ============
  _getHeaders = () => {
    return {
      'Content-Type': 'application/json',
      ...(this.token && { 'Authorization': `Bearer ${this.token}` }),
    }
  }

  _createEntityClient = (entityName) => {
    return {
      list: async (filters = {}) => {
        try {
          const query = new URLSearchParams(filters).toString()
          const response = await fetch(
            `${this.apiUrl}/entities/${entityName}${query ? '?' + query : ''}`,
            { headers: this._getHeaders() }
          )
          if (response.status === 401) {
            this.logout()
            return []
          }
          return await response.json()
        } catch (error) {
          console.error(`List ${entityName} error:`, error)
          return []
        }
      },

      get: async (id) => {
        try {
          const response = await fetch(`${this.apiUrl}/entities/${entityName}/${id}`, {
            headers: this._getHeaders(),
          })
          return await response.json()
        } catch (error) {
          console.error(`Get ${entityName} error:`, error)
          return null
        }
      },

      create: async (data) => {
        try {
          const response = await fetch(`${this.apiUrl}/entities/${entityName}`, {
            method: 'POST',
            headers: this._getHeaders(),
            body: JSON.stringify(data),
          })
          return await response.json()
        } catch (error) {
          console.error(`Create ${entityName} error:`, error)
          throw error
        }
      },

      update: async (id, data) => {
        try {
          const response = await fetch(`${this.apiUrl}/entities/${entityName}/${id}`, {
            method: 'PUT',
            headers: this._getHeaders(),
            body: JSON.stringify(data),
          })
          return await response.json()
        } catch (error) {
          console.error(`Update ${entityName} error:`, error)
          throw error
        }
      },

      delete: async (id) => {
        try {
          const response = await fetch(`${this.apiUrl}/entities/${entityName}/${id}`, {
            method: 'DELETE',
            headers: this._getHeaders(),
          })
          return response.ok
        } catch (error) {
          console.error(`Delete ${entityName} error:`, error)
          return false
        }
      },
    }
  }
}

// Export singleton instance
export const base44 = new Base44Client()
