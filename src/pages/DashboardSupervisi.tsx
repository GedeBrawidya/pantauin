import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import LogopantauinFix from '../assets/logopantauin-fix.png'
import QrScan from '../assets/qr-scan.png'
import HomeIcon from '../assets/home.png'
import MemberIcon from '../assets/member.png'
import ReportIcon from '../assets/report.png'
import VisibilityIcon from '../assets/visibility.png'
import DownloadIcon from '../assets/downloads.png'
import GrowthIcon from '../assets/growth.png'
import CheckedIcon from '../assets/checked.png'
import ProjectManagementIcon from '../assets/project-management.png'


const DUMMY_PEGAWAI = [
  { id: 1, nama: 'Supardi', usia: 32, bidang: 'Teknik', status: 'Hadir' },
  { id: 2, nama: 'Budi Santoso', usia: 28, bidang: 'Bangunan', status: 'Tidak Hadir' },
  { id: 3, nama: 'Siti Aminah', usia: 30, bidang: 'Kebersihan', status: 'Hadir' },
  { id: 4, nama: 'Joko Widodo', usia: 35, bidang: 'Keamanan', status: 'Hadir' },
]

const DUMMY_HASIL = [
  { id: 1, nama: 'Supardi', tugas: 'Pemeriksaan Peralatan', status: 'Selesai', catatan: 'Sudah dicek, aman.' },
  { id: 2, nama: 'Budi Santoso', tugas: 'Pengecatan Dinding', status: 'Selesai', catatan: 'Sudah dicat, rapi.' },
]

const SIDEBAR_MENU = [
  { key: 'dashboard', label: 'Dashboard', icon: HomeIcon },
  { key: 'pekerja', label: 'Data Pekerja', icon: MemberIcon },
  { key: 'presensi', label: 'Presensi QR', icon: QrScan },
  { key: 'manajemen', label: 'Manajemen Tugas', icon: ProjectManagementIcon },
  { key: 'laporan', label: 'Laporan Pekerja', icon: ReportIcon },
]

export default function DashboardSupervisi() {
  const [sidebar, setSidebar] = useState('pekerja')
  const [manajemenTab, setManajemenTab] = useState<'assignment' | 'pantau'>('assignment')
  const [selectedPegawai, setSelectedPegawai] = useState<number[]>([])
  const [jenisTugas, setJenisTugas] = useState('')
  const [showQR, setShowQR] = useState<'masuk' | 'pulang' | null>(null)
  const [detailPegawai, setDetailPegawai] = useState<{ id: number, nama: string } | null>(null)
  const [showProfile, setShowProfile] = useState(false)
  const [foto, setFoto] = useState<string | undefined>(undefined)
  const user = { nama: 'Sujadi', jabatan: 'Supervisor', avatarUrl: foto }
  const [qrForm, setQrForm] = useState({ nama: '', detail: '', tanggal: '' });
  const [qrFormSubmitted, setQrFormSubmitted] = useState(false);
  const isQrFormValid = qrForm.nama && qrForm.detail && qrForm.tanggal;
  // Simulasi waktu sekarang (bisa diganti dengan new Date() jika ingin real time)
  const [dummyJam, setDummyJam] = useState<number | null>(null);
  const now = new Date();
  const jam = dummyJam !== null ? dummyJam : now.getHours();
  const menit = now.getMinutes();
  const isAfter17 = jam > 17 || (jam === 17 && menit >= 0);
  // Untuk demo, bisa ganti jam di atas dengan const jam = 16; atau 18;
  const [searchPekerja, setSearchPekerja] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const filteredPekerja = DUMMY_PEGAWAI.filter(p => p.nama.toLowerCase().includes(searchPekerja.toLowerCase()));
  const sortedPekerja = [...filteredPekerja].sort((a, b) => sortAsc ? a.nama.localeCompare(b.nama) : b.nama.localeCompare(a.nama));
  const [sidebarOpen ] = useState(true);
  const [searchLaporan, setSearchLaporan] = useState('');
  const [sortLaporan, setSortLaporan] = useState('nama-asc');
  const [filterLaporan, setFilterLaporan] = useState('all');

  function handleAssignTugas() {
    setSelectedPegawai([])
    setJenisTugas('')
    alert('Tugas berhasil diberikan ke pekerja terpilih!')
  }

  function getHasilByPegawai(nama: string) {
    return DUMMY_HASIL.filter(h => h.nama === nama)
  }

  function handleFotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (f) {
      const reader = new FileReader()
      reader.onload = ev => setFoto(ev.target?.result as string)
      reader.readAsDataURL(f)
    }
  }

  return (
    <div className="min-h-screen flex font-sans" style={{ background: '#fff' }}>
      {/* Sidebar dengan toggle */}
      <div className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-72' : 'w-28'} flex-shrink-0`} style={{ background: !sidebarOpen ? '#CAF0F8' : undefined }}>
        <aside
          className={`h-full flex flex-col justify-between py-4 ${sidebarOpen ? 'px-4' : 'px-4'} shadow-xl rounded-2xl m-4 transition-all duration-300 ${sidebarOpen ? '' : 'items-center'} overflow-hidden mt-6`}
          style={{ background: sidebarOpen ? '#e3f2fd' : '#CAF0F8', minHeight: 0, height: '90vh', maxWidth: '288px', marginTop: '2rem', marginBottom: 'auto' }}
        >
          <div>
            {/* Logo dan hamburger dalam satu baris, button minimize selalu tampil */}
            <div className={`flex items-center gap-2 mb-8 select-none transition-all duration-300`} style={{ minHeight: '48px' }}>
              <img src={LogopantauinFix} alt="Logo Pantauin" className="w-8 h-8 object-contain" />
              <span className="text-2xl font-bold tracking-wide whitespace-nowrap text-[#223080]">Pantauin</span>
            </div>
            {/* Sidebar */}
            <nav className={`flex flex-col gap-1 mt-2 ${sidebarOpen ? '' : 'items-center'}`}>
              {SIDEBAR_MENU.map(menu => (
                <button
                  key={menu.key}
                  className={`flex items-center justify-center font-bold tracking-wide transition-all duration-300 ease-in-out ${sidebarOpen ? 'gap-2 px-3 py-2 rounded-2xl w-full' : 'w-12 h-12 rounded-2xl'}
                      ${sidebar === menu.key
                        ? sidebarOpen ? 'bg-[#90e0ef] text-[#03045E]' : 'bg-[#90e0ef] text-[#03045E]'
                        : sidebarOpen ? 'hover:bg-[#caf0f8] hover:text-[#03045E]' : 'hover:bg-[#caf0f8]'}
                  `}
                  style={{
                    border: 'none',
                    outline: 'none',
                    minWidth: sidebarOpen ? 0 : 40,
                    maxWidth: sidebarOpen ? '100%' : 56,
                    width: sidebarOpen ? '100%' : 48,
                    color: sidebarOpen ? (sidebar === menu.key ? '#03045E' : '#03045E') : (sidebar === menu.key ? '#03045E' : '#03045E'),
                    background: !sidebarOpen && sidebar === menu.key ? '#90e0ef' : undefined,
                    borderRadius: 16,
                    fontWeight: sidebarOpen ? 700 : 700,
                    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)'
                  }}
                  onClick={() => setSidebar(menu.key)}
                  title={menu.label}
                >
                  {menu.icon ? (
                    <img src={menu.icon} alt={menu.label} className={`object-contain transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-5 h-5' : 'w-7 h-7'}`} style={{ filter: !sidebarOpen && sidebar === menu.key ? 'none' : !sidebarOpen ? 'grayscale(1) brightness(0.5)' : undefined, transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)' }} />
                  ) : (
                    <span className={sidebarOpen ? 'w-5 h-5 inline-block' : 'w-7 h-7 inline-block'} style={{ transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)' }}></span>
                  )}
                  {sidebarOpen && <span className="block w-full text-left transition-all duration-300 ease-in-out" style={{ transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)' }}>{menu.label}</span>}
                </button>
              ))}
            </nav>
          </div>
          {/* User profile at bottom, beri margin-bottom agar tidak mepet */}
          <div
            className={`flex items-center ${sidebarOpen ? 'gap-2 rounded-2xl px-4 py-3' : 'justify-center'} cursor-pointer shadow-lg hover:opacity-90 transition-all duration-200 mb-10`}
            style={{ background: sidebarOpen ? '#0077B6' : '#0077B6', color: 'white', minWidth: 0, borderRadius: 20, width: sidebarOpen ? undefined : 48, height: sidebarOpen ? undefined : 48, marginLeft: sidebarOpen ? 0 : 'auto', marginRight: sidebarOpen ? 0 : 'auto', marginTop: !sidebarOpen ? 96 : undefined }}
            onClick={() => setShowProfile(true)}
          >
            <img src={foto || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.nama)} alt="Profil" className="w-8 h-8 rounded-full object-cover border-2 border-white flex-shrink-0" />
            {sidebarOpen && <div className="truncate">
              <div className="font-semibold leading-tight truncate">{user.nama}</div>
              <div className="text-xs opacity-80 truncate">{user.jabatan}</div>
            </div>}
          </div>
        </aside>
      </div>
      {/* Main Content */}
      <main className="flex-1 p-8" style={{ background: '#ffffff', minHeight: '100vh' }}>
        {/* Header */}
        {/* <div className="flex items-center justify-between mb-8 select-none">
          <h1 className="text-2xl font-extrabold" style={{ color: '#223080', textShadow: '0 2px 8px #324AB233' }}>Dashboard Supervisor</h1>
        </div> */}
        {/* Content by menu */}
        {sidebar === 'dashboard' && (
          <section>
            <div className="mb-2">
              <h1 className="text-2xl font-extrabold" style={{ color: '#223080', textShadow: '0 2px 8px #324AB233' }}>Dashboard</h1>
              <div className="text-[#64748b] text-base mt-1">Selamat datang kembali, <span className="font-bold text-[#03045E]">Sujadi</span></div>
            </div>
            {/* Statistik Card */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
              <div className="bg-white rounded-xl shadow border border-[#90E0EF] p-5 flex flex-col gap-2" style={{ boxShadow: '0 2px 12px 0 #90e0ef33' }}>
                <div className="flex items-center gap-2 text-black font-semibold"><img src={MemberIcon} alt="Pekerja Aktif Hari Ini" className="w-6 h-6 object-contain" /> Pekerja Aktif Hari Ini</div>
                <div className="text-2xl font-bold text-[#03045E]">24</div>
                <div className="text-[#00B4D8] text-sm font-semibold">+22 hadir</div>
                <div className="text-[#03045E] text-sm font-semibold">-2 tidak hadir</div>
              </div>
              <div className="bg-white rounded-xl shadow border border-[#90E0EF] p-5 flex flex-col gap-2" style={{ boxShadow: '0 2px 12px 0 #90e0ef33' }}>
                <div className="flex items-center gap-2 text-black font-semibold"><img src={ReportIcon} alt="Laporan Masuk Hari Ini" className="w-6 h-6 object-contain" /> Laporan Masuk Hari Ini</div>
                <div className="text-2xl font-bold text-[#03045E]">7</div>
                <div className="text-[#0077B6] text-sm font-semibold">3 penting</div>
              </div>
              <div className="bg-white rounded-xl shadow border border-[#90E0EF] p-5 flex flex-col gap-2" style={{ boxShadow: '0 2px 12px 0 #90e0ef33' }}>
                <div className="flex items-center gap-2 text-black font-semibold"><img src={GrowthIcon} alt="Rata-rata Kehadiran" className="w-6 h-6 object-contain" /> Rata-rata Kehadiran</div>
                <div className="text-2xl font-bold text-[#03045E]">89%</div>
                <div className="text-[#0077B6] text-sm font-semibold">+2.1% dari minggu lalu</div>
              </div>
              <div className="bg-white rounded-xl shadow border border-[#90E0EF] p-5 flex flex-col gap-2" style={{ boxShadow: '0 2px 12px 0 #90e0ef33' }}>
                <div className="flex items-center gap-2 text-black font-semibold"><img src={CheckedIcon} alt="Tugas Terselesaikan" className="w-6 h-6 object-contain" /> Tugas Terselesaikan</div>
                <div className="text-2xl font-bold text-[#03045E]">156</div>
                <div className="text-[#03045E] text-sm">Minggu ini</div>
              </div>
            </div>
            {/* Menu Cepat */}
            <div className="text-xl font-bold text-[#1e293b] mb-2">Menu Cepat</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div
                className="bg-white rounded-xl shadow border border-[#e5e7eb] p-6 flex flex-col items-center gap-2 cursor-pointer hover:bg-blue-50 transition"
                onClick={() => setSidebar('manajemen')}
                title="Tambah Tugas"
              >
                <img src={ProjectManagementIcon} alt="Tambah Tugas" className="w-14 h-14 bg-[#e0e7ff] rounded-lg p-2 object-contain" />
                <div className="font-bold text-base mt-2 text-[#1e293b]">Tambah Tugas</div>
                <div className="text-[#64748b] text-sm mb-2">Buat tugas baru untuk pekerja</div>
              </div>
              <div
                className="bg-white rounded-xl shadow border border-[#e5e7eb] p-6 flex flex-col items-center gap-2 cursor-pointer hover:bg-blue-50 transition"
                onClick={() => setSidebar('presensi')}
                title="Generate QR"
              >
                <img src={QrScan} alt="Generate QR" className="w-14 h-14 bg-[#e0e7ff] rounded-lg p-2 object-contain" />
                <div className="font-bold text-base mt-2 text-[#1e293b]">Generate QR</div>
                <div className="text-[#64748b] text-sm mb-2">Buat QR code presensi</div>
              </div>
              <div
                className="bg-white rounded-xl shadow border border-[#e5e7eb] p-6 flex flex-col items-center gap-2 cursor-pointer hover:bg-blue-50 transition"
                onClick={() => setSidebar('laporan')}
                title="Cek Laporan"
              >
                <img src={ReportIcon} alt="Cek Laporan" className="w-14 h-14 bg-[#fff7ed] rounded-lg p-2 object-contain" />
                <div className="font-bold text-base mt-2 text-[#1e293b]">Cek Laporan</div>
                <div className="text-[#64748b] text-sm mb-2">Review laporan pekerja</div>
              </div>
            </div>
            {/* Aktivitas Terbaru */}
            <div className="bg-white rounded-xl shadow border border-[#e5e7eb] p-6">
              <div className="text-xl font-bold text-[#1e293b] mb-4">Aktivitas Terbaru</div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 bg-[#f1f5f9] rounded-lg px-4 py-3">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                  <span className="text-[#1e293b]">Ahmad Rizki telah menyelesaikan tugas "Pembersihan Area A"</span>
                  <span className="text-xs text-[#64748b] ml-auto">5 menit yang lalu</span>
                </div>
                <div className="flex items-center gap-2 bg-[#f1f5f9] rounded-lg px-4 py-3">
                  <span className="w-2 h-2 rounded-full bg-orange-500 inline-block"></span>
                  <span className="text-[#1e293b]">Laporan baru: "Kerusakan Peralatan" oleh Siti Nurhaliza</span>
                  <span className="text-xs text-[#64748b] ml-auto">15 menit yang lalu</span>
                </div>
                <div className="flex items-center gap-2 bg-[#f1f5f9] rounded-lg px-4 py-3">
                  <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
                  <span className="text-[#1e293b]">3 pekerja baru telah melakukan presensi masuk</span>
                  <span className="text-xs text-[#64748b] ml-auto">30 menit yang lalu</span>
                </div>
              </div>
            </div>
          </section>
        )}
        {sidebar === 'pekerja' && (
          <section>
            <h1 className="text-2xl font-extrabold mb-4" style={{ color: '#223080', textShadow: '0 2px 8px #324AB233' }}>Data Pekerja</h1>
            <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 rounded bg-[#324AB2] text-white font-semibold text-sm hover:bg-[#223080] transition shadow"
                  onClick={() => setSortAsc(s => !s)}
                >Sort {sortAsc ? 'A-Z' : 'Z-A'}</button>
                <button
                  className="px-4 py-2 rounded bg-green-600 text-white font-semibold text-sm hover:bg-green-700 transition shadow"
                  onClick={() => alert('Fitur tambah pekerja belum diimplementasi')}
                >+ Tambah Pekerja</button>
              </div>
              <input
                type="text"
                className="px-4 py-2 rounded border border-[#A5B4FC] focus:ring-2 focus:ring-[#324AB2] outline-none text-sm min-w-[180px]"
                placeholder="Cari nama pekerja..."
                value={searchPekerja}
                onChange={e => setSearchPekerja(e.target.value)}
              />
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto border border-[#90E0EF]" style={{ boxShadow: '0 2px 12px 0 #90e0ef33' }}>
              <table className="min-w-full text-sm text-left">
                <thead>
                  <tr className="bg-[#F3F5FF] text-[#223080]">
                    <th className="px-4 py-2 font-bold">No</th>
                    <th className="px-4 py-2 font-bold">Nama</th>
                    <th className="px-4 py-2 font-bold">Usia</th>
                    <th className="px-4 py-2 font-bold">Bidang</th>
                    <th className="px-4 py-2 font-bold">Status</th>
                    <th className="px-4 py-2 font-bold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPekerja.map((p, i) => (
                    <tr key={p.id} className="border-b last:border-0 hover:bg-[#F3F5FF]">
                      <td className="px-4 py-2">{i + 1}</td>
                      <td className="px-4 py-2 font-semibold text-[#03045E]">Supardi</td>
                      <td className="px-4 py-2">{p.usia}</td>
                      <td className="px-4 py-2">{p.bidang}</td>
                      <td className="px-4 py-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.status === 'Hadir' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>{p.status}</span>
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        <button className="px-3 py-1 rounded bg-[#324AB2] text-white text-xs font-semibold hover:bg-[#223080] transition">Edit</button>
                        {p.status === 'Hadir' ? (
                          <button className="px-3 py-1 rounded bg-red-100 text-red-600 text-xs font-semibold hover:bg-red-200 transition">Deactivate</button>
                        ) : (
                          <button className="px-3 py-1 rounded bg-green-100 text-green-700 text-xs font-semibold hover:bg-green-200 transition">Activate</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
        {sidebar === 'presensi' && (
          <section className="flex flex-col gap-8 items-start">
            <h1 className="text-2xl font-extrabold mb-4" style={{ color: '#223080', textShadow: '0 2px 8px #324AB233' }}>Presensi QR</h1>
            {/* Button Dummy Simulasi Jam */}
            <div className="flex gap-2 mb-2 justify-end">
              <button
                className="px-3 py-1 rounded font-semibold text-sm shadow border border-[#A5B4FC] bg-white hover:bg-[#A5B4FC] hover:text-white transition"
                onClick={() => setDummyJam(16)}
              >Set Jam &lt; 17:00</button>
              <button
                className="px-3 py-1 rounded font-semibold text-sm shadow border border-[#A5B4FC] bg-white hover:bg-[#324AB2] hover:text-white transition"
                onClick={() => setDummyJam(18)}
              >Set Jam &gt;= 17:00</button>
              <button
                className="px-3 py-1 rounded font-semibold text-sm shadow border border-[#A5B4FC] bg-white hover:bg-[#A5B4FC] hover:text-white transition"
                onClick={() => setDummyJam(null)}
              >Reset Jam</button>
              <span className="ml-4 text-sm font-bold" style={{ color: '#324AB2' }}>Jam sekarang: {jam.toString().padStart(2, '0')}:{menit.toString().padStart(2, '0')}</span>
            </div>
            {/* Flex row for QR Presensi box */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6 w-full mb-6">
              <h3 className="font-bold text-lg mb-2" style={{ color: '#223080' }}>Buat QR Presensi</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-sm mb-1" style={{ color: '#223080' }}>Nama Pekerjaan</label>
                  <input
                    type="text"
                    className="border rounded px-3 py-2 border-[#A5B4FC] focus:ring-2 focus:ring-[#324AB2] outline-none"
                    placeholder="Nama pekerjaan..."
                    value={qrForm.nama}
                    onChange={e => setQrForm(f => ({ ...f, nama: e.target.value }))}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-sm mb-1" style={{ color: '#223080' }}>Detail Pekerjaan</label>
                  <input
                    type="text"
                    className="border rounded px-3 py-2 border-[#A5B4FC] focus:ring-2 focus:ring-[#324AB2] outline-none"
                    placeholder="Detail pekerjaan..."
                    value={qrForm.detail}
                    onChange={e => setQrForm(f => ({ ...f, detail: e.target.value }))}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-sm mb-1" style={{ color: '#223080' }}>Tanggal</label>
                  <input
                    type="date"
                    className="border rounded px-3 py-2 border-[#A5B4FC] focus:ring-2 focus:ring-[#324AB2] outline-none"
                    value={qrForm.tanggal}
                    onChange={e => setQrForm(f => ({ ...f, tanggal: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex justify-end w-full">
                <button
                  className="py-3 px-8 rounded-lg font-bold text-lg transition-all duration-200 shadow"
                  style={{ background: isQrFormValid ? '#324AB2' : '#A5B4FC', color: 'white', cursor: isQrFormValid ? 'pointer' : 'not-allowed', letterSpacing: 1 }}
                  disabled={!isQrFormValid}
                  onClick={() => isQrFormValid && setQrFormSubmitted(true)}
                >Submit Data Presensi</button>
              </div>
            </div>
            {/* QR Masuk & QR Pulang */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {/* QR Masuk */}
              <div className="border rounded-2xl p-8 flex flex-col items-center gap-2 shadow-lg" style={{ background: 'white', borderColor: '#A5B4FC' }}>
                <img src={QrScan} alt="QR Scan" className="w-12 h-12 object-contain mb-1" />
                <div className="font-bold text-lg mt-2" style={{ color: '#223080' }}>QR Masuk</div>
                <div className="text-[#22308099] text-sm mb-2">Buat QR code untuk presensi masuk</div>
                {!qrFormSubmitted ? (
                  <button
                    className="w-full py-2 rounded font-semibold transition-all duration-200 shadow"
                    style={{ background: '#A5B4FC', color: 'white', cursor: 'not-allowed' }}
                    disabled
                  >Data belum diisi</button>
                ) : isAfter17 ? (
                  <button
                    className="w-full py-2 rounded font-semibold transition-all duration-200 shadow"
                    style={{ background: '#A5B4FC', color: 'white', cursor: 'not-allowed' }}
                    disabled
                  >Waktu habis</button>
                ) : (
                  <button
                    onClick={() => setShowQR('masuk')}
                    className="w-full py-2 rounded font-semibold transition-all duration-200 shadow"
                    style={{ background: '#324AB2', color: 'white' }}
                  >Buat QR Masuk</button>
                )}
              </div>
              {/* QR Pulang */}
              <div className="border rounded-2xl p-8 flex flex-col items-center gap-2 shadow-lg" style={{ background: 'white', borderColor: '#A5B4FC' }}>
                <img src={QrScan} alt="QR Scan" className="w-12 h-12 object-contain mb-1" />
                <div className="font-bold text-lg mt-2" style={{ color: '#223080' }}>QR Pulang</div>
                <div className="text-[#22308099] text-sm mb-2">Buat QR code untuk presensi pulang</div>
                {!qrFormSubmitted ? (
                  <button
                    className="w-full py-2 rounded font-semibold transition-all duration-200 shadow"
                    style={{ background: '#A5B4FC', color: 'white', cursor: 'not-allowed' }}
                    disabled
                  >Data belum diisi</button>
                ) : !isAfter17 ? (
                  <button
                    className="w-full py-2 rounded font-semibold transition-all duration-200 shadow"
                    style={{ background: '#A5B4FC', color: 'white', cursor: 'not-allowed' }}
                    disabled
                  >Belum bisa presensi</button>
                ) : (
                  <button
                    onClick={() => setShowQR('pulang')}
                    className="w-full py-2 rounded font-semibold transition-all duration-200 shadow"
                    style={{ background: '#324AB2', color: 'white' }}
                  >Buat QR Pulang</button>
                )}
              </div>
            </div>
          </section>
        )}
        {sidebar === 'manajemen' && (
          <section className="flex flex-col gap-8 items-start">
            <h1 className="text-2xl font-extrabold mb-4" style={{ color: '#223080', textShadow: '0 2px 8px #324AB233' }}>Manajemen Tugas</h1>
            {/* Tab Navigasi */}
            <div className="flex gap-2 mb-4 bg-[#F3F5FF] rounded-xl p-2 shadow-sm">
              <button
                className={`flex-1 px-2 py-1 rounded-lg font-bold text-sm transition-all duration-200 whitespace-nowrap
                  ${manajemenTab === 'assignment' ? 'bg-[#324AB2] text-white' : 'text-[#223080] bg-transparent hover:bg-[#e6eaff]'}
                `}
                style={{ minWidth: 0, maxWidth: 180 }}
                onClick={() => setManajemenTab('assignment')}
              >Berikan Tugas</button>
              <button
                className={`flex-1 px-2 py-1 rounded-lg font-bold text-sm transition-all duration-200 whitespace-nowrap
                  ${manajemenTab === 'pantau' ? 'bg-[#324AB2] text-white' : 'text-[#223080] bg-transparent hover:bg-[#e6eaff]'}
                `}
                style={{ minWidth: 0, maxWidth: 180 }}
                onClick={() => setManajemenTab('pantau')}
              >Pantau pekerjaan</button>
            </div>
            {/* Konten Tab */}
            {manajemenTab === 'assignment' && (
              <div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto border border-[#90E0EF]" style={{ boxShadow: '0 2px 12px 0 #90e0ef33' }}>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#223080' }}>Berikan Tugas ke Pekerja</h3>
                <table className="min-w-full text-sm text-left">
                  <thead>
                    <tr className="bg-[#F3F5FF] text-[#223080]">
                      <th className="px-4 py-2 font-bold">No</th>
                      <th className="px-4 py-2 font-bold">Nama</th>
                      <th className="px-4 py-2 font-bold">Usia</th>
                      <th className="px-4 py-2 font-bold">Bidang</th>
                      <th className="px-4 py-2 font-bold">Status</th>
                      <th className="px-4 py-2 font-bold">Checklist</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DUMMY_PEGAWAI.map((p, i) => (
                      <tr key={p.id} className="border-b last:border-0 hover:bg-[#F3F5FF]">
                        <td className="px-4 py-2">{i + 1}</td>
                        <td className="px-4 py-2 font-semibold text-[#03045E]">{p.nama}</td>
                        <td className="px-4 py-2">{p.usia}</td>
                        <td className="px-4 py-2">{p.bidang}</td>
                        <td className="px-4 py-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.status === 'Hadir' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>{p.status}</span>
                        </td>
                        <td className="px-4 py-2 text-center">
                          <input
                            type="checkbox"
                            checked={selectedPegawai.includes(p.id)}
                            onChange={e => setSelectedPegawai(sel => e.target.checked ? [...sel, p.id] : sel.filter(id => id !== p.id))}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex flex-col md:flex-row gap-2 mt-4 items-center">
                  <input
                    type="text"
                    className="border rounded px-3 py-2 border-primary/30 focus:ring-2 focus:ring-primary-dark outline-none text-sm"
                    style={{ borderColor: '#A5B4FC', maxWidth: 320 }}
                    placeholder="Jenis tugas..."
                    value={jenisTugas}
                    onChange={e => setJenisTugas(e.target.value)}
                  />
                  <button
                    className="px-4 py-2 rounded font-semibold text-sm transition-all duration-200 shadow"
                    style={{ background: '#324AB2', color: 'white', minWidth: 120 }}
                    disabled={selectedPegawai.length === 0 || !jenisTugas}
                    onClick={handleAssignTugas}
                  >Berikan Tugas</button>
                </div>
              </div>
            )}
            {manajemenTab === 'pantau' && (
              <div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto border border-[#90E0EF]" style={{ boxShadow: '0 2px 12px 0 #90e0ef33' }}>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#223080' }}>Pantau Pekerja & Hasil Tugas</h3>
                <table className="min-w-full text-sm text-left mb-4">
                  <thead>
                    <tr className="bg-[#F3F5FF] text-[#223080]">
                      <th className="px-4 py-2 font-bold">No</th>
                      <th className="px-4 py-2 font-bold">Nama</th>
                      <th className="px-4 py-2 font-bold">Usia</th>
                      <th className="px-4 py-2 font-bold">Bidang</th>
                      <th className="px-4 py-2 font-bold">Status</th>
                      <th className="px-4 py-2 font-bold">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DUMMY_PEGAWAI.map((p, i) => (
                      <tr key={p.id} className="border-b last:border-0 hover:bg-[#F3F5FF]">
                        <td className="px-4 py-2">{i + 1}</td>
                        <td className="px-4 py-2 font-semibold text-[#03045E]">{p.nama}</td>
                        <td className="px-4 py-2">{p.usia}</td>
                        <td className="px-4 py-2">{p.bidang}</td>
                        <td className="px-4 py-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.status === 'Hadir' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>{p.status}</span>
                        </td>
                        <td className="px-4 py-2">
                          <button className="px-3 py-1 rounded bg-[#324AB2] text-white text-xs font-semibold hover:bg-[#223080] transition" onClick={() => setDetailPegawai(p)}>Detail</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4">
                  <div className="font-semibold mb-1" style={{ color: '#223080' }}>Hasil Tugas Selesai:</div>
                  <table className="min-w-full text-sm text-left">
                    <thead>
                      <tr className="bg-[#F3F5FF] text-[#223080]">
                        <th className="px-4 py-2 font-bold">No</th>
                        <th className="px-4 py-2 font-bold">Nama</th>
                        <th className="px-4 py-2 font-bold">Tugas</th>
                        <th className="px-4 py-2 font-bold">Catatan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DUMMY_HASIL.map((h, i) => (
                        <tr key={h.id} className="border-b last:border-0 hover:bg-[#F3F5FF]">
                          <td className="px-4 py-2">{i + 1}</td>
                          <td className="px-4 py-2 font-semibold text-[#03045E]">{h.nama}</td>
                          <td className="px-4 py-2">{h.tugas}</td>
                          <td className="px-4 py-2 text-xs text-[#22308099]">{h.catatan}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        )}
        {sidebar === 'laporan' && (
          <section>
            <h1 className="text-2xl font-extrabold mb-4" style={{ color: '#223080', textShadow: '0 2px 8px #324AB233' }}>Laporan Tugas Harian Pekerja</h1>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <input
                type="text"
                placeholder="Cari nama atau tugas..."
                className="px-4 py-2 rounded border border-blue-200 focus:ring-2 focus:ring-blue-200 outline-none text-sm w-full md:w-64"
                value={searchLaporan || ''}
                onChange={e => setSearchLaporan(e.target.value)}
              />
              <select
                className="px-4 py-2 rounded border border-blue-200 text-sm bg-white w-full md:w-48"
                value={sortLaporan || 'nama-asc'}
                onChange={e => setSortLaporan(e.target.value)}
              >
                <option value="nama-asc">Urutkan Nama (A-Z)</option>
                <option value="nama-desc">Urutkan Nama (Z-A)</option>
                <option value="status-selesai">Status: Selesai dulu</option>
                <option value="status-dikerjakan">Status: Sedang Dikerjakan dulu</option>
              </select>
              <select
                className="px-4 py-2 rounded border border-blue-200 text-sm bg-white w-full md:w-48"
                value={filterLaporan || 'all'}
                onChange={e => setFilterLaporan(e.target.value)}
              >
                <option value="all">Semua Waktu</option>
                <option value="today">Hari Ini</option>
                <option value="this-week">Minggu Ini</option>
                <option value="this-month">Bulan Ini</option>
              </select>
            </div>
            <div className="flex flex-col gap-6">
              {(() => {
                // Data laporan dummy dengan field tanggal
                const laporanData = [
                  {
                    id: 1,
                    tugas: 'Pemeriksaan Peralatan',
                    pekerja: 'Ahmad Rizki',
                    status: 'Selesai',
                    waktu: '10:30',
                    tanggal: '2025-07-07',
                    catatan: 'Semua peralatan dalam kondisi baik. Tidak ada kerusakan ditemukan.',
                    file: true
                  },
                  {
                    id: 2,
                    tugas: 'Pembersihan Area Kerja',
                    pekerja: 'Ahmad Rizki',
                    status: 'Selesai',
                    waktu: '11:15',
                    tanggal: '2025-07-06',
                    catatan: 'Area kerja sudah dibersihkan sesuai SOP. Semua limbah sudah dibuang dengan benar.',
                    file: true
                  },
                  {
                    id: 3,
                    tugas: 'Laporan Harian',
                    pekerja: 'Ahmad Rizki',
                    status: 'Sedang Dikerjakan',
                    waktu: '',
                    tanggal: '2025-07-01',
                    catatan: '',
                    file: false
                  },
                  {
                    id: 4,
                    tugas: 'Pemeriksaan Peralatan',
                    pekerja: 'Siti Nurhaliza',
                    status: 'Selesai',
                    waktu: '09:45',
                    tanggal: '2025-07-03',
                    catatan: 'Peralatan area B telah diperiksa. Ditemukan 1 alat yang perlu maintenance ringan.',
                    file: true
                  },
                  {
                    id: 5,
                    tugas: 'Laporan Inspeksi',
                    pekerja: 'Budi Santoso',
                    status: 'Selesai',
                    waktu: '14:00',
                    tanggal: '2025-07-22',
                    catatan: 'Inspeksi area C selesai tanpa temuan.',
                    file: true
                  }
                ];
                // Filter waktu
                let filtered = laporanData.filter(laporan =>
                  (!searchLaporan ||
                    laporan.pekerja.toLowerCase().includes(searchLaporan.toLowerCase()) ||
                    laporan.tugas.toLowerCase().includes(searchLaporan.toLowerCase())
                  )
                );
                if (filterLaporan === 'today') {
                  const today = new Date();
                  const todayStr = today.toISOString().slice(0, 10);
                  filtered = filtered.filter(l => l.tanggal === todayStr);
                } else if (filterLaporan === 'this-week') {
                  const today = new Date();
                  const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
                  const lastDay = new Date(today.setDate(firstDay.getDate() + 6));
                  filtered = filtered.filter(l => {
                    const tgl = new Date(l.tanggal);
                    return tgl >= firstDay && tgl <= lastDay;
                  });
                } else if (filterLaporan === 'this-month') {
                  const today = new Date();
                  const month = today.getMonth();
                  const year = today.getFullYear();
                  filtered = filtered.filter(l => {
                    const tgl = new Date(l.tanggal);
                    return tgl.getMonth() === month && tgl.getFullYear() === year;
                  });
                }
                // Sort
                filtered = filtered.sort((a, b) => {
                  if (sortLaporan === 'nama-asc') return a.pekerja.localeCompare(b.pekerja);
                  if (sortLaporan === 'nama-desc') return b.pekerja.localeCompare(a.pekerja);
                  if (sortLaporan === 'status-selesai') return a.status === b.status ? 0 : a.status === 'Selesai' ? -1 : 1;
                  if (sortLaporan === 'status-dikerjakan') return a.status === b.status ? 0 : a.status === 'Sedang Dikerjakan' ? -1 : 1;
                  return 0;
                });
                return filtered.map((laporan) => (
                  <div key={laporan.id} className="bg-white rounded-2xl shadow p-6 mb-2 relative">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-bold text-lg text-[#223080]">{laporan.tugas}</div>
                        <div className="text-sm text-[#64748b]">Pekerja: {laporan.pekerja} {laporan.status === 'Selesai' && <span className="text-green-600 font-semibold ml-2">• Selesai: {laporan.waktu}</span>} <span className="ml-2 text-xs text-gray-400">{laporan.tanggal}</span></div>
                      </div>
                      <div>
                        {laporan.status === 'Selesai' ? (
                          <span className="px-4 py-1 rounded-full bg-blue-500 text-white text-sm font-bold absolute top-6 right-6">Selesai</span>
                        ) : (
                          <span className="px-4 py-1 rounded-full bg-gray-200 text-gray-700 text-sm font-bold absolute top-6 right-6">Sedang Dikerjakan</span>
                        )}
                      </div>
                    </div>
                    <div className="bg-[#f3f5ff] rounded-lg p-4 mb-3 flex items-start gap-2">
                      <div>
                        <div className="font-semibold text-[#223080] mb-1">Catatan:</div>
                        <div className="text-[#223080] text-sm">{laporan.catatan || <span className="italic text-gray-400">Belum ada catatan.</span>}</div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button className="flex items-center gap-1 px-4 py-2 rounded border border-gray-300 bg-gray-50 text-gray-700 font-semibold text-sm hover:bg-gray-100 transition" disabled={!laporan.file}>
                        <img src={VisibilityIcon} alt="Lihat File" className="w-5 h-5 object-contain align-middle" /> Lihat File
                      </button>
                      <button className="flex items-center gap-1 px-4 py-2 rounded border border-gray-300 bg-gray-50 text-gray-700 font-semibold text-sm hover:bg-gray-100 transition" disabled={!laporan.file}>
                        <img src={DownloadIcon} alt="Download" className="w-5 h-5 object-contain align-middle" /> Download
                      </button>
                    </div>
                  </div>
                ));
              })()}
            </div>
          </section>
        )}
      </main>
      {/* Modal QR Code */}
      {showQR && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-20">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-xs flex flex-col items-center gap-4">
            <div className="font-bold text-lg mb-2 text-primary-dark">{showQR === 'masuk' ? 'QR Masuk' : 'QR Pulang'}</div>
            <QRCodeSVG value={showQR === 'masuk' ? 'QR-MASUK-2025' : 'QR-PULANG-2025'} size={180} />
            <button className="mt-4 px-4 py-2 rounded bg-primary-accent hover:bg-primary-dark hover:text-white text-primary-dark font-semibold transition-all duration-200" onClick={() => setShowQR(null)}>Tutup</button>
          </div>
        </div>
      )}
      {/* Modal Profile */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-30">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-xs flex flex-col items-center gap-4">
            <div className="font-bold text-lg mb-2" style={{ color: '#223080' }}>Profil Supervisor</div>
            <img src={foto || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.nama)} alt="Foto Profil" className="w-24 h-24 rounded-full border-4" style={{ borderColor: '#324AB2' }} />
            <div className="w-full">
              <div className="font-semibold" style={{ color: '#223080' }}>Nama</div>
              <div className="mb-2">{user.nama}</div>
              <div className="font-semibold" style={{ color: '#223080' }}>Jabatan</div>
              <div className="mb-2">{user.jabatan}</div>
              <div className="font-semibold mb-1" style={{ color: '#223080' }}>Foto Profil</div>
              <label className="flex items-center gap-2 px-4 py-2 rounded border border-blue-200 bg-blue-50 text-blue-700 font-semibold text-sm hover:bg-blue-100 transition cursor-pointer w-fit">
                <span className="material-icons text-base">upload</span> Upload Foto
                <input type="file" className="hidden" onChange={handleFotoChange} />
              </label>
            </div>
            <button className="mt-2 px-4 py-2 rounded font-semibold transition-all duration-200" style={{ background: '#324AB2', color: 'white' }} onClick={() => setShowProfile(false)}>Tutup</button>
          </div>
        </div>
      )}
      {/* Modal Detail Tugas Pekerja */}
      {detailPegawai && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-30">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-xs flex flex-col items-center gap-4">
            <div className="font-bold text-lg mb-2 text-primary-dark">Detail Tugas: {detailPegawai.nama}</div>
            <div className="flex flex-col gap-2">
              {getHasilByPegawai(detailPegawai.nama).length === 0 && (
                <div className="text-primary-dark/60 text-center">Belum ada tugas selesai.</div>
              )}
              {getHasilByPegawai(detailPegawai.nama).map(h => (
                <div key={h.id} className="border rounded p-2 flex flex-col gap-1 bg-primary-bg">
                  <div className="font-semibold text-primary">{h.tugas}</div>
                  <div className="text-xs text-primary-dark/80">Catatan: {h.catatan}</div>
                </div>
              ))}
            </div>
            <button className="mt-4 px-4 py-2 rounded bg-primary-accent hover:bg-primary-dark hover:text-white text-primary-dark font-semibold transition-all duration-200" onClick={() => setDetailPegawai(null)}>Tutup</button>
          </div>
        </div>
      )}
    </div>
  )
}