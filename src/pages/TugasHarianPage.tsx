import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CheckedIcon from '../assets/checked.png'
import ReportIcon from '../assets/report.png'

const DUMMY_TUGAS = [
  {
    id: 1,
    judul: 'Pemeriksaan Peralatan',
    deskripsi: 'Periksa kondisi semua peralatan kerja di area A',
    status: 'Belum',
  },
  {
    id: 2,
    judul: 'Pembersihan Area Kerja',
    deskripsi: 'Bersihkan dan rapikan area kerja sesuai SOP',
    status: 'Belum',
  },
  {
    id: 3,
    judul: 'Laporan Harian',
    deskripsi: 'Buat laporan aktivitas harian',
    status: 'Belum',
  },
]

export default function TugasHarianPage() {
  const [tab, setTab] = useState<'tugas' | 'laporan'>('tugas')
  const [catatan, setCatatan] = useState<{ [id: number]: string }>({})
  const [selesai, setSelesai] = useState<{ [id: number]: boolean }>({})
  const [files, setFiles] = useState<{ [id: number]: File | null }>({})
  const navigate = useNavigate()

  function handleChecklist(id: number, checked: boolean) {
    setSelesai(s => ({ ...s, [id]: checked }))
  }

  function handleFileChange(id: number, file: File | null) {
    setFiles(f => ({ ...f, [id]: file }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-700 mb-1 text-center">Tugas Hari Ini</h1>
        <div className="text-gray-500 mb-6 text-center">Silakan selesaikan tugas harian Anda di bawah ini.</div>
        {/* Tabs */}
        <div className="flex bg-white rounded-xl shadow mb-6 overflow-hidden">
          <button
            className={`flex-1 py-2 text-center font-semibold text-base transition ${tab === 'tugas' ? 'bg-blue-50 text-blue-700' : 'text-gray-400 hover:bg-blue-100'}`}
            onClick={() => setTab('tugas')}
          >
            <span className="inline-flex items-center gap-2"><img src={CheckedIcon} alt="Tugas" className="w-5 h-5 align-middle" /> Tugas</span>
          </button>
          <button
            className={`flex-1 py-2 text-center font-semibold text-base transition ${tab === 'laporan' ? 'bg-blue-50 text-blue-700' : 'text-gray-400 hover:bg-blue-100'}`}
            onClick={() => setTab('laporan')}
          >
            <span className="inline-flex items-center gap-2"><img src={ReportIcon} alt="Laporan" className="w-5 h-5 align-middle" /> Laporan</span>
          </button>
        </div>

        {/* Tab Content */}
        {tab === 'tugas' && (
          <div className="flex flex-col gap-6">
            {DUMMY_TUGAS.map(tugas => (
              <div key={tugas.id} className="bg-white rounded-xl shadow p-6 flex flex-col gap-3 border border-blue-100 relative">
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    className="mt-1 accent-blue-500 cursor-pointer"
                    checked={!!selesai[tugas.id]}
                    onChange={e => handleChecklist(tugas.id, e.target.checked)}
                  />
                  <div className="flex-1">
                    <div className={`font-bold text-lg ${selesai[tugas.id] ? 'line-through text-gray-400' : 'text-gray-800'}`}>{tugas.judul}</div>
                    <div className={`text-sm mb-1 ${selesai[tugas.id] ? 'line-through text-gray-300' : 'text-gray-500'}`}>{tugas.deskripsi}</div>
                  </div>
                  <span className="absolute right-6 top-6 text-xs px-3 py-1 rounded-full bg-green-50 text-green-500 border border-green-200">{selesai[tugas.id] ? 'Selesai' : 'Belum'}</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-700 mb-1">Catatan Pekerjaan</div>
                  <textarea
                    className="w-full border rounded-lg p-2 text-sm min-h-[60px] resize-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Tuliskan catatan atau hasil pemeriksaan..."
                    value={catatan[tugas.id] || ''}
                    onChange={e => setCatatan(c => ({ ...c, [tugas.id]: e.target.value }))}
                    disabled={!!selesai[tugas.id]}
                  />
                </div>
                <div className="flex gap-2 mt-2 items-center">
                  {/* Custom Upload Button, konsisten dengan DashboardPekerja */}
                  <label className="flex items-center gap-2 px-4 py-2 rounded border border-blue-200 bg-blue-50 text-blue-700 font-semibold text-sm hover:bg-blue-100 transition cursor-pointer w-fit">
                    <span className="material-icons text-base">upload</span> Upload Foto/Dokumen
                    <input
                      type="file"
                      className="hidden"
                      onChange={e => handleFileChange(tugas.id, e.target.files?.[0] || null)}
                      disabled={!!selesai[tugas.id]}
                    />
                  </label>
                  {/* Tampilkan nama file jika ada */}
                  {files[tugas.id] && (
                    <span className="text-xs text-gray-500 truncate max-w-[120px]">{files[tugas.id]?.name}</span>
                  )}
                  <button
                    className={`flex items-center gap-2 px-4 py-2 rounded bg-blue-400 text-white font-semibold text-sm hover:bg-blue-500 transition ${!catatan[tugas.id] || !files[tugas.id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!catatan[tugas.id] || !files[tugas.id] || !!selesai[tugas.id]}
                    onClick={() => setSelesai(s => ({ ...s, [tugas.id]: true }))}
                  >
                    <span className="material-icons text-base">check_circle</span> Selesai
                  </button>
                </div>
              </div>
            ))}
            <button
              className="mt-8 w-full py-4 rounded-xl bg-green-600 text-white font-bold text-lg shadow hover:bg-green-700 transition"
              onClick={() => navigate('/dashboard')}
            >
              Done Pekerjaan
            </button>
          </div>
        )}
        {tab === 'laporan' && (
          <div className="bg-white rounded-xl shadow p-8 text-center text-gray-400 font-semibold">
            Belum ada laporan.
          </div>
        )}
      </div>
    </div>
  )
} 