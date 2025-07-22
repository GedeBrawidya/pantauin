export default function DashboardPekerja({ onPresensi, onProfile, user }: {
  onPresensi: () => void,
  onProfile: () => void,
  user: { nama: string, jabatan: string, avatarUrl?: string }
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-8 items-center">
        <div className="flex flex-col items-center gap-2 w-full">
          <img
            src={user.avatarUrl || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.nama)}
            alt="Avatar"
            className="w-20 h-20 rounded-full border-4 border-blue-300 shadow mb-2"
          />
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-blue-700">{user.nama}</h2>
            <div className="text-blue-500 font-semibold text-lg">{user.jabatan}</div>
          </div>
        </div>
        <button
          onClick={onPresensi}
          className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-xl shadow hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          Presensi QR
        </button>
        <button
          onClick={onProfile}
          className="w-full py-3 rounded-xl bg-gray-100 text-blue-700 font-semibold text-lg hover:bg-gray-200 transition"
        >
          Lihat Profil
        </button>
      </div>
    </div>
  )
} 