import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'

const DUMMY_PEGAWAI = [
  { id: 1, nama: 'Supardi' },
  { id: 2, nama: 'Budi Santoso' },
  { id: 3, nama: 'Siti Aminah' },
  { id: 4, nama: 'Joko Widodo' },
]

const DUMMY_HASIL = [
  { id: 1, nama: 'Supardi', tugas: 'Pemeriksaan Peralatan', status: 'Selesai', catatan: 'Sudah dicek, aman.' },
  { id: 2, nama: 'Budi Santoso', tugas: 'Pengecatan Dinding', status: 'Selesai', catatan: 'Sudah dicat, rapi.' },
]

export default function DashboardSupervisi() {
  const [showAssign, setShowAssign] = useState(false)
  const [showDaftar, setShowDaftar] = useState(false)
  const [selectedPegawai, setSelectedPegawai] = useState<number[]>([])
  const [jenisTugas, setJenisTugas] = useState('')
  const [showQR, setShowQR] = useState<'masuk' | 'pulang' | null>(null)
  const [detailPegawai, setDetailPegawai] = useState<{ id: number, nama: string } | null>(null)

  function handleAssignTugas() {
    setSelectedPegawai([])
    setJenisTugas('')
    setShowAssign(false)
    alert('Tugas berhasil diberikan ke pekerja terpilih!')
  }

  function getHasilByPegawai(nama: string) {
    return DUMMY_HASIL.filter(h => h.nama === nama)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Dashboard Supervisor</h1>
            <div className="text-gray-500 text-sm">Selamat Datang, Sujadi</div>
          </div>
          <button className="border px-3 py-1 rounded-lg text-gray-700 hover:bg-gray-100 font-semibold flex items-center gap-1">
            <span className="material-icons text-base">logout</span> Keluar
          </button>
        </div>
        {/* Card Menu */}
        <div className="flex flex-col gap-4">
          {/* QR Masuk */}
          <div className="border rounded-xl p-6 flex flex-col items-center gap-2">
            <span className="material-icons text-3xl text-green-600">qr_code_2</span>
            <div className="font-bold text-lg mt-2">QR Masuk</div>
            <div className="text-gray-500 text-sm mb-2">Buat QR code untuk presensi masuk</div>
            <button onClick={() => setShowQR('masuk')} className="w-full py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition">Buat QR Masuk</button>
          </div>
          {/* QR Pulang */}
          <div className="border rounded-xl p-6 flex flex-col items-center gap-2">
            <span className="material-icons text-3xl text-orange-500">qr_code_2</span>
            <div className="font-bold text-lg mt-2">QR Pulang</div>
            <div className="text-gray-500 text-sm mb-2">Buat QR code untuk presensi pulang</div>
            <button onClick={() => setShowQR('pulang')} className="w-full py-2 rounded bg-orange-500 text-white font-semibold hover:bg-orange-600 transition">Buat QR Pulang</button>
          </div>
          {/* Berikan Tugas */}
          <div className="border rounded-xl p-6 flex flex-col items-center gap-2">
            <span className="material-icons text-3xl text-blue-600">assignment</span>
            <div className="font-bold text-lg mt-2">Berikan Tugas</div>
            <div className="text-gray-500 text-sm mb-2">Assign tugas ke pekerja (bisa batch)</div>
            <button onClick={() => setShowAssign(true)} className="w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Berikan Tugas</button>
          </div>
          {/* Daftar Pekerja */}
          <div className="border rounded-xl p-6 flex flex-col items-center gap-2">
            <span className="material-icons text-3xl text-purple-600">groups</span>
            <div className="font-bold text-lg mt-2">Daftar Pekerja</div>
            <div className="text-gray-500 text-sm mb-2">Status presensi dan progress tugas pekerja</div>
            <button onClick={() => setShowDaftar(true)} className="w-full py-2 rounded bg-purple-600 text-white font-semibold hover:bg-purple-700 transition">Lihat Daftar</button>
          </div>
        </div>
      </div>
      {/* Modal QR Code */}
      {showQR && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-20">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-xs flex flex-col items-center gap-4">
            <div className="font-bold text-lg mb-2">{showQR === 'masuk' ? 'QR Masuk' : 'QR Pulang'}</div>
            <QRCodeSVG value={showQR === 'masuk' ? 'QR-MASUK-2025' : 'QR-PULANG-2025'} size={180} />
            <button className="mt-4 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold" onClick={() => setShowQR(null)}>Tutup</button>
          </div>
        </div>
      )}
      {/* Modal Assign Tugas */}
      {showAssign && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-10">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md flex flex-col gap-4">
            <div className="font-bold text-lg mb-2">Berikan Tugas ke Pekerja</div>
            <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
              {DUMMY_PEGAWAI.map(p => (
                <label key={p.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedPegawai.includes(p.id)}
                    onChange={e => setSelectedPegawai(sel => e.target.checked ? [...sel, p.id] : sel.filter(id => id !== p.id))}
                  />
                  <span>{p.nama}</span>
                </label>
              ))}
            </div>
            <input
              type="text"
              className="border rounded px-3 py-2 mt-2"
              placeholder="Jenis tugas..."
              value={jenisTugas}
              onChange={e => setJenisTugas(e.target.value)}
            />
            <button
              className="w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition mt-2"
              disabled={selectedPegawai.length === 0 || !jenisTugas}
              onClick={handleAssignTugas}
            >
              Berikan Tugas
            </button>
            <button className="text-gray-400 hover:underline mt-2" onClick={() => setShowAssign(false)}>Batal</button>
          </div>
        </div>
      )}
      {/* Modal Daftar Pekerja & Hasil Tugas */}
      {showDaftar && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-10">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md flex flex-col gap-4">
            <div className="font-bold text-lg mb-2">Daftar Pekerja & Hasil Tugas</div>
            <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
              {DUMMY_PEGAWAI.map(p => (
                <div key={p.id} className="flex items-center gap-2 cursor-pointer hover:underline" onClick={() => setDetailPegawai(p)}>
                  <span className="font-semibold">{p.nama}</span>
                  <span className="text-xs text-blue-500">(lihat detail tugas)</span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <div className="font-semibold mb-1">Hasil Tugas Selesai:</div>
              <div className="flex flex-col gap-2 max-h-32 overflow-y-auto">
                {DUMMY_HASIL.map(h => (
                  <div key={h.id} className="border rounded p-2 flex flex-col gap-1 bg-green-50">
                    <div className="font-semibold text-green-700">{h.nama} - {h.tugas}</div>
                    <div className="text-xs text-gray-500">Catatan: {h.catatan}</div>
                  </div>
                ))}
              </div>
            </div>
            <button className="text-gray-400 hover:underline mt-2" onClick={() => setShowDaftar(false)}>Tutup</button>
          </div>
        </div>
      )}
      {/* Modal Detail Tugas Pekerja */}
      {detailPegawai && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-30">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-xs flex flex-col gap-4">
            <div className="font-bold text-lg mb-2">Detail Tugas: {detailPegawai.nama}</div>
            <div className="flex flex-col gap-2">
              {getHasilByPegawai(detailPegawai.nama).length === 0 && (
                <div className="text-gray-400 text-center">Belum ada tugas selesai.</div>
              )}
              {getHasilByPegawai(detailPegawai.nama).map(h => (
                <div key={h.id} className="border rounded p-2 flex flex-col gap-1 bg-green-50">
                  <div className="font-semibold text-green-700">{h.tugas}</div>
                  <div className="text-xs text-gray-500">Catatan: {h.catatan}</div>
                </div>
              ))}
            </div>
            <button className="mt-4 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold" onClick={() => setDetailPegawai(null)}>Tutup</button>
          </div>
        </div>
      )}
    </div>
  )
}