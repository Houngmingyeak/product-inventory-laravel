import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadPing() {
      try {
        const response = await fetch('/api/ping', {
          headers: {
            Accept: 'application/json',
          },
        })

        // fetch មិន throw error ពេល status 404/500 ដូច្នេះត្រូវពិនិត្យ response.ok ខ្លួនឯង
        if (!response.ok) {
          setError('Laravel API returned status ' + response.status)
          return
        }

        const result = await response.json()
        setData(result)
      } catch (err) {
        setError('Cannot connect to Laravel API')
      }
    }

    loadPing()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-white/60 bg-white/50 backdrop-blur-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">
          Product &amp; Inventory System
        </h1>

        {error && (
          <p className="rounded-lg bg-red-50 text-red-600 px-4 py-2 text-sm">
            {error}
          </p>
        )}

        {!error && !data && (
          <p className="text-slate-500 text-sm">Connecting to API...</p>
        )}

        {data && (
          <div className="space-y-2 text-sm text-slate-700">
            <p>
              <span className="font-semibold">API:</span> {data.message}
            </p>
            <p>
              <span className="font-semibold">Database:</span> {data.database}
            </p>
            <p>
              <span className="font-semibold">Driver:</span> {data.driver}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App