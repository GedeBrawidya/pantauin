import { useState } from 'react'
import QrScan from '../assets/qr-scan.png'

export default function DashboardPekerja({ onPresensi, user }: {
  onPresensi: () => void,
  user: { nama: string, jabatan: string, avatarUrl?: string }
}) {
  const [showProfile, setShowProfile] = useState(false)
  const [foto, setFoto] = useState<string | undefined>(user.avatarUrl)
  const [jumlahHadir, setJumlahHadir] = useState(18) // Dummy data
  const [jumlahTidakHadir, setJumlahTidakHadir] = useState(2) // Dummy data

  function handleFotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (f) {
      const reader = new FileReader()
      reader.onload = ev => setFoto(ev.target?.result as string)
      reader.readAsDataURL(f)
    }
  }

  // Ganti nama user dengan dummy
  const dummyUser = { ...user, nama: 'Supardi' };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#e6eaff] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-8 items-center">
        <div className="flex flex-col items-center gap-2 w-full">
          <img
            src={foto || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(dummyUser.nama)}
            alt="Foto Profil"
            className="w-20 h-20 rounded-full border-4 border-[#324AB2] shadow mb-2 object-cover"
          />
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-[#324AB2]">{dummyUser.nama}</h2>
            <div className="text-[#324AB2]/80 font-semibold text-lg">{dummyUser.jabatan}</div>
          </div>
        </div>
        {/* Card Jumlah Hadir & Tidak Hadir - Refined Design, No Animation */}
        <div className="flex flex-row gap-6 w-full justify-center items-center flex-wrap mt-2 mb-2">
          <div className="flex-1 min-w-[160px] max-w-[220px] bg-gradient-to-br from-green-100 to-green-50 border-2 border-green-300 rounded-2xl p-6 flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow duration-200 relative overflow-hidden">
            <span className="material-icons text-green-600 text-4xl mb-2"></span>
            <div className="text-3xl font-extrabold text-green-700 drop-shadow-lg mb-1">{jumlahHadir}</div>
            <div className="text-green-800 font-bold text-base mb-1">Hari Hadir Kerja</div>
            <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">Hadir</span>
          </div>
          <div className="flex-1 min-w-[160px] max-w-[220px] bg-gradient-to-br from-red-100 to-red-50 border-2 border-red-300 rounded-2xl p-6 flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow duration-200 relative overflow-hidden">
            <span className="material-icons text-red-500 text-4xl mb-2"></span>
            <div className="text-3xl font-extrabold text-red-600 drop-shadow-lg mb-1">{jumlahTidakHadir}</div>
            <div className="text-red-800 font-bold text-base mb-1">Hari Tidak Hadir</div>
            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">Absen</span>
          </div>
        </div>
        <button
          onClick={onPresensi}
          className="w-full py-4 rounded-xl bg-[#324AB2] text-white font-bold text-xl shadow hover:bg-[#223080] transition flex items-center justify-center gap-2"
        >
          <img src={QrScan} alt="QR Scan" className="w-6 h-6 mr-2 inline-block object-contain" /> Presensi QR
        </button>
        <button
          onClick={() => setShowProfile(true)}
          className="w-full py-3 rounded-xl bg-[#f3f5ff] text-[#324AB2] font-semibold text-lg hover:bg-[#e6eaff] transition flex items-center justify-center gap-2"
        >
          <span className="material-icons text-lg"></span> Lihat/Ubah Profil
        </button>
      </div>
      {/* Modal Profile */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-30">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-xs flex flex-col items-center gap-4">
            <div className="font-bold text-lg mb-2 text-[#324AB2]">Profil {dummyUser.nama}</div>
            <img src={foto || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(dummyUser.nama)} alt="Foto Profil" className="w-24 h-24 rounded-full border-4 border-[#324AB2] shadow object-cover" />
            <div className="w-full">
              <div className="font-semibold text-[#324AB2]">Nama</div>
              <div className="mb-2">{dummyUser.nama}</div>
              <div className="font-semibold text-[#324AB2]">Jabatan</div>
              <div className="mb-2">{dummyUser.jabatan}</div>
              <div className="font-semibold text-[#324AB2] mb-1">Foto Profil</div>
              {/* Custom Upload Button */}
              <label className="flex items-center gap-2 px-4 py-2 rounded border border-blue-200 bg-blue-50 text-blue-700 font-semibold text-sm hover:bg-blue-100 transition cursor-pointer w-fit">
                <span className="material-icons text-base">upload</span> Upload Foto
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFotoChange}
                  className="hidden"
                />
              </label>
            </div>
            <button className="mt-2 px-4 py-2 rounded bg-[#324AB2] text-white font-semibold hover:bg-[#223080] transition" onClick={() => setShowProfile(false)}>Tutup</button>
          </div>
        </div>
      )}
    </div>
  )
} 