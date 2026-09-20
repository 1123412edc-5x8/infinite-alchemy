'use client'
import { useState } from 'react'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [marqueeText, setMarqueeText] = useState('歡迎來到無限煉製！探索無限可能！')
  const [marqueeEnabled, setMarqueeEnabled] = useState(true)
  const [message, setMessage] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === '55555thyree') {
      setIsAuthenticated(true)
      setMessage('')
    } else {
      setMessage('密碼錯誤，請重新輸入')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <h1 className="text-xl font-bold mb-4 text-gray-800 text-center">管理員後台</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">存取密碼</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="請輸入管理員密碼"
                required
              />
            </div>
            {message && <p className="text-red-500 text-xs">{message}</p>}
            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-md font-medium text-sm transition"
            >
              登入後台
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">無限煉製 - 管理後台</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1.5 rounded"
          >
            登出
          </button>
        </div>

        {/* 跑馬燈設定區塊 */}
        <div className="border-t pt-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">跑馬燈設定</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="marquee-toggle"
                checked={marqueeEnabled}
                onChange={(e) => setMarqueeEnabled(e.target.checked)}
                className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <label htmlFor="marquee-toggle" className="text-sm text-gray-700">
                啟用跑馬燈顯示
              </label>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">公告內容</label>
              <input
                type="text"
                value={marqueeText}
                onChange={(e) => setMarqueeText(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
