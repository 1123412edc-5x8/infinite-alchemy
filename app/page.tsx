'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Marquee from '@/components/Marquee'

// 初始化 Supabase 客戶端
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://luixjpaveppifzbuadpo.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface ElementItem {
  id: string
  name: string
  emoji: string
}

const INITIAL_ELEMENTS: ElementItem[] = [
  { id: '1', name: '水', emoji: '💧' },
  { id: '2', name: '火', emoji: '🔥' },
  { id: '3', name: '風', emoji: '🌬️' },
  { id: '4', name: '土', emoji: '🌱' },
]

export default function Home() {
  const [elements, setElements] = useState<ElementItem[]>(INITIAL_ELEMENTS)
  const [selected, setSelected] = useState<ElementItem[]>([])
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // 檢查登入狀態
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const handleSelect = (item: ElementItem) => {
    if (selected.length < 2) {
      const newSelected = [...selected, item]
      setSelected(newSelected)
      
      if (newSelected.length === 2) {
        // 簡單合成邏輯示範
        setTimeout(() => {
          combineElements(newSelected[0], newSelected[1])
        }, 300)
      }
    }
  }

  const combineElements = (el1: ElementItem, el2: ElementItem) => {
    // 範例合成：水 + 火 = 蒸汽
    const comboKey = [el1.name, el2.name].sort().join('+')
    
    if (comboKey === '水+火' && !elements.some(e => e.name === '蒸汽')) {
      setElements([...elements, { id: Date.now().toString(), name: '蒸汽', emoji: '💨' }])
    }
    
    setSelected([])
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* 跑馬燈區塊 */}
      <Marquee text="歡迎來到無限煉製！組合元素創造萬物！" />

      {/* 頂部導覽列 */}
      <header className="p-4 border-b border-slate-800 flex justify-between items-between items-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
          無限煉製 🧪
        </h1>
        <div>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">{user.email}</span>
              <button
                onClick={handleLogout}
                className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-full border border-slate-700"
              >
                登出
              </button>
            </div>
          ) : (
            <button
              onClick={handleGoogleLogin}
              className="text-xs bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-1.5 rounded-full transition"
            >
              Google 登入
            </button>
          )}
        </div>
      </header>

      {/* 遊戲工作區 */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {/* 合成對話框/選擇區 */}
        <div className="w-full max-w-md h-40 bg-slate-800/50 rounded-2xl border border-slate-700/50 flex items-center justify-center gap-4 mb-8">
          {selected.length === 0 && <span className="text-slate-500 text-sm">點擊下方元素進行組合</span>}
          {selected.map((item, idx) => (
            <div key={idx} className="bg-slate-700 px-4 py-2 rounded-xl flex items-center gap-2 text-lg animate-bounce">
              <span>{item.emoji}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        {/* 已解鎖元素清單 */}
        <div className="w-full max-w-xl">
          <h2 className="text-xs font-semibold text-slate-400 mb-3 tracking-wider uppercase">已解鎖元素</h2>
          <div className="flex flex-wrap gap-2">
            {elements.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className="bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700 px-3 py-2 rounded-xl flex items-center gap-2 text-sm transition"
              >
                <span>{item.emoji}</span>
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
      }
