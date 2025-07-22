import { useState } from 'react'
import LogoPantauin from '../assets/LogoPantauin.png'

export default function LoginPage({ onLogin }: { onLogin: (username: string, password: string) => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!username || !password) {
      setError('Nama pengguna dan kata sandi wajib diisi')
      return
    }
    setError('')
    onLogin(username, password)
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#e6eaff] to-[#f3f5ff] p-4">
      <div className="w-full max-w-xs bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-8 items-center">
        <div className="flex flex-col items-center gap-2">
          <img src={LogoPantauin} alt="Logo Pantauin" className="w-20 h-20 mb-2 object-contain" />
          <h1 className="text-3xl font-extrabold text-[#324AB2] tracking-tight">Pantauin</h1>
          <p className="text-gray-500 text-center text-base mt-1">Sistem Monitoring & Presensi Pekerja</p>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mt-2">
          <div>
            <label className="block text-sm font-semibold text-[#324AB2] mb-1">Nama Pengguna</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-[#324AB2]/30 focus:ring-2 focus:ring-[#324AB2] outline-none text-base bg-[#f3f5ff]"
              placeholder="Masukkan nama pengguna"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#324AB2] mb-1">Kata Sandi</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-3 rounded-lg border border-[#324AB2]/30 focus:ring-2 focus:ring-[#324AB2] outline-none text-base bg-[#f3f5ff] pr-12"
                placeholder="Masukkan kata sandi"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#324AB2]/60 hover:text-[#324AB2] text-sm"
                onClick={() => setShowPassword(v => !v)}
                tabIndex={-1}
              >
                {showPassword ? 'Sembunyikan' : 'Lihat'}
              </button>
            </div>
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#324AB2] text-white font-bold text-lg shadow hover:bg-[#223080] transition mt-2"
          >
            Masuk
          </button>
        </form>
        <div className="w-full flex justify-end">
          <button className="text-[#324AB2] hover:underline text-sm font-semibold">Lupa kata sandi?</button>
        </div>
      </div>
      <div className="mt-8 text-xs text-gray-400 text-center">&copy; 2025 Pantauin. Hak cipta dilindungi undang-undang.</div>
    </div>
  )
} 