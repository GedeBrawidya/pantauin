import { useState } from 'react'

export default function LoginPage({ onLogin }: { onLogin: (username: string, password: string) => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!username || !password) {
      setError('Username dan password wajib diisi')
      return
    }
    setError('')
    onLogin(username, password)
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-200 to-blue-400 p-4">
      <div className="w-full max-w-xs bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-8 items-center">
        <div className="flex flex-col items-center gap-2">
          <img src="/vite.svg" alt="Pantauin Logo" className="w-16 h-16 mb-2" />
          <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight">Pantauin</h1>
          <p className="text-gray-500 text-center text-base mt-1">Monitoring & Tracking Pekerjaan Lapangan</p>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mt-2">
          <div>
            <label className="block text-sm font-semibold text-blue-700 mb-1">Username</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 outline-none text-base bg-blue-50"
              placeholder="Masukkan username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-blue-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 outline-none text-base bg-blue-50 pr-12"
                placeholder="Masukkan password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-700 text-sm"
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
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-lg shadow hover:bg-blue-700 transition mt-2"
          >
            Login
          </button>
        </form>
        <div className="w-full flex justify-end">
          <button className="text-blue-500 hover:underline text-sm font-semibold">Forgot password?</button>
        </div>
      </div>
      <div className="mt-8 text-xs text-gray-400 text-center">&copy; 2025 Pantauin. All rights reserved.</div>
    </div>
  )
} 