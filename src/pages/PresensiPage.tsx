import { useRef, useState, useEffect } from 'react'
import { BrowserMultiFormatReader } from '@zxing/browser'

export default function PresensiPage({ onSuccess }: { onSuccess?: (result?: string) => void } = {}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [scanning, setScanning] = useState(true)
  const controlsRef = useRef<any>(null)

  useEffect(() => {
    let stop = false
    if (videoRef.current && scanning) {
      const codeReader = new BrowserMultiFormatReader()
      codeReader.decodeFromVideoDevice(undefined, videoRef.current, (result, err) => {
        if (result && !stop) {
          setScanning(false)
          stop = true
          onSuccess && onSuccess(result.getText())
        }
        if (err && !(err instanceof DOMException)) {
          setError('Gagal membaca QR. Pastikan QR terlihat jelas.')
        }
      }).then(controls => {
        controlsRef.current = controls
      })
    }
    return () => {
      stop = true
      if (controlsRef.current) controlsRef.current.stop()
    }
  }, [onSuccess, scanning])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center gap-6">
        <div className="text-2xl font-bold text-blue-700">Scan QR Presensi</div>
        <video ref={videoRef} className="w-64 h-64 bg-black rounded-lg" autoPlay muted playsInline />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          onClick={() => setScanning(true)}
          className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          disabled={scanning}
        >{scanning ? 'Scanning...' : 'Scan Ulang'}</button>
        <button
          onClick={() => onSuccess && onSuccess('dummy-presensi')}
          className="px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition mt-2"
        >Simulasi Presensi Berhasil</button>
      </div>
    </div>
  )
}
