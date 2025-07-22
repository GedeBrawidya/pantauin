import { useState, createContext, useContext } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPekerja from './pages/DashboardPekerja'
import DashboardSupervisi from './pages/DashboardSupervisi'
import PresensiPage from './pages/PresensiPage'
import TugasHarianPage from './pages/TugasHarianPage'

// Context untuk auth
const AuthContext = createContext<{
  role: null | 'pekerja' | 'supervisi',
  setRole: (r: null | 'pekerja' | 'supervisi') => void,
  user: { nama: string, jabatan: string, avatarUrl?: string } | null,
  setUser: (u: any) => void
}>({ role: null, setRole: () => {}, user: null, setUser: () => {} })

function AppRoutes() {
  const { role, setRole, user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  function handleLogin(username: string, password: string) {
    // Email dummy untuk login
    if ((username === 'supervisi@pantauin.com' || username === 'supervisi') && password === 'supervisi123') {
      setRole('supervisi')
      setUser({ nama: 'Supervisi', jabatan: 'Supervisor', avatarUrl: '' })
      navigate('/supervisi')
    } else if ((username === 'pekerja@pantauin.com' || username === 'pekerja') && password === 'pekerja123') {
      setRole('pekerja')
      setUser({ nama: 'Pekerja', jabatan: 'Operator Lapangan', avatarUrl: '' })
      navigate('/dashboard')
    }
  }

  return (
    <Routes>
      <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/dashboard" element={role === 'pekerja' ? <DashboardPekerja user={user!} onPresensi={() => navigate('/presensi')} /> : <Navigate to="/" />} />
      <Route path="/presensi" element={role === 'pekerja' ? <PresensiPage onSuccess={() => navigate('/tugas')} /> : <Navigate to="/" />} />
      <Route path="/tugas" element={role === 'pekerja' ? <TugasHarianPage /> : <Navigate to="/" />} />
      <Route path="/supervisi" element={role === 'supervisi' ? <DashboardSupervisi /> : <Navigate to="/" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export const App = () => {
  const [role, setRole] = useState<null | 'pekerja' | 'supervisi'>(null)
  const [user, setUser] = useState<any>(null)
  return (
    <AuthContext.Provider value={{ role, setRole, user, setUser }}>
      <AppRoutes />
    </AuthContext.Provider>
  )
}
