import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'

// Layout
import Layout from '@/components/Layout'

// Páginas Públicas
import Home from '@/pages/Home'
import Precos from '@/pages/Precos'
import Cadastro from '@/pages/Cadastro'

// Páginas do Cliente
import ClientDashboard from '@/pages/ClientDashboard'
import BookCleaning from '@/pages/BookCleaning'
import ClientRequests from '@/pages/ClientRequests'
import ClientProfilePage from '@/pages/ClientProfilePage'

// Páginas da Faxineira
import CleanerDashboard from '@/pages/CleanerDashboard'
import CleanerSchedule from '@/pages/CleanerSchedule'
import CleanerAvailability from '@/pages/CleanerAvailability'
import CleanerProfile from '@/pages/CleanerProfile'
import CleanerRewards from '@/pages/CleanerRewards'
import CleanerWithdrawals from '@/pages/CleanerWithdrawals'

// Páginas Admin
import AdminDashboard from '@/pages/AdminDashboard'
import AdminCleaners from '@/pages/AdminCleaners'
import AdminRequests from '@/pages/AdminRequests'
import AdminWithdrawals from '@/pages/AdminWithdrawals'
import AdminSettings from '@/pages/AdminSettings'
import AdminSupport from '@/pages/AdminSupport'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<Layout currentPageName="Home"><Home /></Layout>} />
          <Route path="/precos" element={<Layout currentPageName="Precos"><Precos /></Layout>} />
          <Route path="/cadastro" element={<Layout currentPageName="Cadastro"><Cadastro /></Layout>} />

          {/* Rotas do Cliente */}
          <Route path="/dashboard" element={<Layout currentPageName="ClientDashboard"><ClientDashboard /></Layout>} />
          <Route path="/agendar" element={<Layout currentPageName="BookCleaning"><BookCleaning /></Layout>} />
          <Route path="/meus-pedidos" element={<Layout currentPageName="ClientRequests"><ClientRequests /></Layout>} />
          <Route path="/perfil" element={<Layout currentPageName="ClientProfilePage"><ClientProfilePage /></Layout>} />

          {/* Rotas da Faxineira */}
          <Route path="/minhas-faxinas" element={<Layout currentPageName="CleanerDashboard"><CleanerDashboard /></Layout>} />
          <Route path="/agenda" element={<Layout currentPageName="CleanerSchedule"><CleanerSchedule /></Layout>} />
          <Route path="/disponibilidade" element={<Layout currentPageName="CleanerAvailability"><CleanerAvailability /></Layout>} />
          <Route path="/perfil-faxineira" element={<Layout currentPageName="CleanerProfile"><CleanerProfile /></Layout>} />
          <Route path="/recompensas" element={<Layout currentPageName="CleanerRewards"><CleanerRewards /></Layout>} />
          <Route path="/saques" element={<Layout currentPageName="CleanerWithdrawals"><CleanerWithdrawals /></Layout>} />

          {/* Rotas Admin */}
          <Route path="/admin" element={<Layout currentPageName="AdminDashboard"><AdminDashboard /></Layout>} />
          <Route path="/admin/faxineiras" element={<Layout currentPageName="AdminCleaners"><AdminCleaners /></Layout>} />
          <Route path="/admin/pedidos" element={<Layout currentPageName="AdminRequests"><AdminRequests /></Layout>} />
          <Route path="/admin/saques" element={<Layout currentPageName="AdminWithdrawals"><AdminWithdrawals /></Layout>} />
          <Route path="/admin/configuracoes" element={<Layout currentPageName="AdminSettings"><AdminSettings /></Layout>} />
          <Route path="/admin/suporte" element={<Layout currentPageName="AdminSupport"><AdminSupport /></Layout>} />

          {/* Rota Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>

      {/* Notificações Sonner */}
      <Toaster position="bottom-right" richColors />
    </>
  )
}
