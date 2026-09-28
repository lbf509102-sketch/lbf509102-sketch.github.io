import { useEffect, useRef, useState } from 'react'

const emotions = [
  {
    id: 'numb',
    label: '什么都感觉不到',
    hint: '像隔着一层雾',
    tone: 'sage',
    cards: [
      '感觉不到什么，也可以先这样待着。',
      '今天没有波澜，不代表你哪里出了问题。',
      '不需要现在就把感觉找回来。',
      '空空的这一刻，也可以被允许。',
      '什么都不想回应，就先不回应。',
      '你不必证明自己正在感受。',
      '此刻有些迟钝，也不需要道歉。',
      '不用急着确认自己怎么了。',
      '今天的你，可以只是安静地存在。',
      '没有感觉的时间，也算时间。',
    ],
    companions: ['先不用找回什么。', '安静也可以。', '慢一点。', '这里不催你。'],
  },
  {
    id: 'tearless',
    label: '想哭，哭不出来',
    hint: '难过堵在里面',
    tone: 'blue',
    cards: [
      '眼泪没来，不代表你不难过。',
      '哭不出来的时候，就在这里坐一会儿。',
      '堵在心里的东西，不必立刻说清。',
      '今天不用把难过表现得像难过。',
      '没有哭，也不需要责怪自己。',
      '这份难受，可以先没有出口。',
      '眼眶是干的，心里的重量也是真的。',
      '不必用眼泪证明这件事很痛。',
      '有些难过只是沉着，不会消失。',
      '你可以停在想哭的这一刻。',
    ],
    companions: ['眼泪不来，也没关系。', '先坐一会儿。', '不用证明。', '不急。'],
  },
  {
    id: 'silent',
    label: '不想解释',
    hint: '连说话都觉得费力',
    tone: 'rose',
    cards: [
      '可以不说。你不用解释。',
      '沉默不是失礼，你只是暂时不想开口。',
      '今天不回答任何问题，也可以。',
      '你不欠谁一份完整的说明。',
      '不想组织语言，就别勉强自己。',
      '这里不需要你把话说完。',
      '暂时不回应，也可以把安静留给自己。',
      '没有合适的话，就让安静留下来。',
      '你可以只点点头，也可以什么都不做。',
      '今天的沉默，不需要被纠正。',
    ],
    companions: ['不用把话补完整。', '安静也可以。', '先不说。', '这里不催你。'],
  },
  {
    id: 'tired',
    label: '撑得有点累',
    hint: '不是睡一觉就会好的累',
    tone: 'amber',
    cards: [
      '累了就是累了，不必先找到理由。',
      '今天少做一点，也不会亏欠谁。',
      '你可以暂时不那么能干。',
      '没有力气的时候，不用装作轻松。',
      '这一刻只剩一点力气，也够了。',
      '肩膀不用一直绷着。',
      '今天做不到的事，可以留在今天。',
      '你已经很累了，不必再把疲惫藏好。',
      '慢一点，不代表你落在了哪里。',
      '此刻不往前走，也不需要解释。',
    ],
    companions: ['今天先放下一点。', '少做一点。', '到这里也可以。', '不急着继续。'],
  },
  {
    id: 'unclear',
    label: '我也说不清',
    hint: '很多感觉混在一起',
    tone: 'violet',
    cards: [
      '说不清就说不清，不是每种感觉都需要名字。',
      '不知道怎么了，也是一种诚实。',
      '现在没有答案，不妨碍它真实存在。',
      '混在一起的感受，不用急着分开。',
      '你可以只知道自己不太好。',
      '今天先不定义自己。',
      '找不到准确的词，也没有关系。',
      '心里乱乱的，不需要立刻整理整齐。',
      '这份说不清，也值得被认真对待。',
      '不知道该从哪里说，就先不开始。',
    ],
    companions: ['不用现在想明白。', '先放着。', '可以没有答案。', '慢一点。'],
  },
  {
    id: 'alone',
    label: '只想自己待会儿',
    hint: '暂时不想回到人群',
    tone: 'teal',
    cards: [
      '想一个人待着，不需要向谁交代。',
      '今天暂时不见人，也不必解释。',
      '留一点安静给自己，不是拒绝所有人。',
      '暂时关上门，不代表你做错了什么。',
      '你可以晚一点再回到人群里。',
      '暂时不回应，也可以把安静留给自己。',
      '一个人待着，不等于你不在乎谁。',
      '今天的世界可以先小一点。',
      '暂时离远一点，也是一种空间。',
      '这里没有人催你重新热闹起来。',
    ],
    companions: ['门先关一会儿。', '不用马上回去。', '安静留给你。', '不催。'],
  },
]

const icons = {
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
  moon: <path d="M20.5 14.4A8 8 0 0 1 9.6 3.5 8.5 8.5 0 1 0 20.5 14.4Z" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  arrow: <><path d="m9 18 6-6-6-6" /></>,
  back: <><path d="m15 18-6-6 6-6" /></>,
  trash: <><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 10v6M14 10v6" /></>,
}

function Icon({ name, filled = false }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  )
}

function loadFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem('quiet-favorites-v1'))
    if (!Array.isArray(saved)) return []
    return saved.filter((item) => item && typeof item === 'object'
      && typeof item.id === 'string'
      && typeof item.text === 'string'
      && typeof item.emotionId === 'string'
      && typeof item.emotionLabel === 'string')
  } catch {
    return []
  }
}

function loadTheme() {
  try {
    return localStorage.getItem('quiet-theme-v1') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  } catch {
    return 'light'
  }
}

function readView() {
  const candidate = window.history.state?.view
  const view = ['home', 'card', 'favorites', 'about'].includes(candidate) ? candidate : 'home'
  if (view === 'card') {
    window.history.replaceState({ view: 'home' }, '', window.location.pathname)
    return 'home'
  }
  return view
}

function App() {
  const [view, setViewState] = useState(readView)
  const [activeEmotion, setActiveEmotion] = useState(null)
  const [card, setCard] = useState(null)
  const [companionCount, setCompanionCount] = useState(0)
  const [favorites, setFavorites] = useState(loadFavorites)
  const [theme, setTheme] = useState(loadTheme)
  const [confirmClear, setConfirmClear] = useState(false)
  const bags = useRef({})
  const lastPicked = useRef({})

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('quiet-theme-v1', theme) } catch { /* Private browsing may block storage. */ }
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#191a19' : '#ece9e2'
  }, [theme])

  useEffect(() => {
    try { localStorage.setItem('quiet-favorites-v1', JSON.stringify(favorites)) } catch { /* Favorites remain available for this session. */ }
  }, [favorites])

  useEffect(() => {
    const onPopState = () => setViewState(readView())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && view !== 'home') {
        setConfirmClear(false)
        window.history.replaceState({ view: 'home' }, '', window.location.pathname)
        setViewState('home')
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [view])

  function setView(nextView) {
    if (nextView === view) return
    if (nextView !== 'about') setConfirmClear(false)
    const updateHistory = nextView === 'home' ? 'replaceState' : 'pushState'
    window.history[updateHistory]({ view: nextView }, '', window.location.pathname)
    setViewState(nextView)
  }

  function pickCard(emotion) {
    let bag = bags.current[emotion.id]
    if (!bag?.length) {
      bag = emotion.cards.map((_, index) => index)
      for (let i = bag.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[bag[i], bag[j]] = [bag[j], bag[i]]
      }
      if (bag.at(-1) === lastPicked.current[emotion.id] && bag.length > 1) {
        ;[bag[0], bag[bag.length - 1]] = [bag[bag.length - 1], bag[0]]
      }
      bags.current[emotion.id] = bag
    }
    const index = bag.pop()
    lastPicked.current[emotion.id] = index
    setCard({ id: `${emotion.id}-${index}`, text: emotion.cards[index] })
  }

  function openEmotion(emotion) {
    setActiveEmotion(emotion)
    setCompanionCount(0)
    pickCard(emotion)
    setView('card')
  }

  function showNextCompanion() {
    if (!activeEmotion || companionCount >= activeEmotion.companions.length) return
    setCompanionCount((count) => count + 1)
  }

  function toggleFavorite() {
    if (!card || !activeEmotion) return
    setFavorites((items) => {
      if (items.some((item) => item.id === card.id)) return items.filter((item) => item.id !== card.id)
      return [...items, { ...card, emotionId: activeEmotion.id, emotionLabel: activeEmotion.label }]
    })
  }

  const isFavorite = card && favorites.some((item) => item.id === card.id)

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setView('home')} aria-label="返回情绪选择">
          <img src="/mark.svg" alt="" />
          <span>不用好起来</span>
        </button>
        <nav aria-label="应用工具">
          <button className="icon-button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} title={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'} aria-label={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}>
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
          </button>
          <button className="icon-button favorite-nav" onClick={() => setView('favorites')} title="收藏" aria-label="查看收藏">
            <Icon name="heart" />
          </button>
          <button className="icon-button" onClick={() => setView('about')} title="关于与安全支持" aria-label="打开关于与安全支持">
            <Icon name="info" />
          </button>
        </nav>
      </header>

      <main>
        {view === 'home' && <Home onChoose={openEmotion} />}
        {view === 'card' && activeEmotion && card && (
          <CardView
            emotion={activeEmotion}
            card={card}
            companions={activeEmotion.companions}
            companionCount={companionCount}
            isFavorite={isFavorite}
            onFavorite={toggleFavorite}
            onStay={showNextCompanion}
            onBack={() => setView('home')}
          />
        )}
        {view === 'favorites' && <Favorites items={favorites} onBack={() => setView('home')} onRemove={(id) => setFavorites((items) => items.filter((item) => item.id !== id))} />}
        {view === 'about' && <About favoriteCount={favorites.length} confirmClear={confirmClear} onBack={() => { setConfirmClear(false); setView('home') }} onAskClear={() => setConfirmClear(true)} onCancelClear={() => setConfirmClear(false)} onClear={() => { setFavorites([]); setConfirmClear(false) }} />}
      </main>
    </div>
  )
}

function Home({ onChoose }) {
  return (
    <section className="home-view view-enter">
      <div className="intro">
        <p className="eyebrow">此刻不用做得更好</p>
        <h1>你现在，比较像哪一种？</h1>
        <p>不用想准确。选一个靠近的就好。</p>
      </div>
      <div className="emotion-list" aria-label="选择此刻的感受">
        {emotions.map((emotion) => (
          <button key={emotion.id} className="emotion-row" onClick={() => onChoose(emotion)}>
            <span className={`emotion-dot ${emotion.tone}`} />
            <span className="emotion-copy">
              <strong>{emotion.label}</strong>
              <small>{emotion.hint}</small>
            </span>
            <span className="row-arrow"><Icon name="arrow" /></span>
          </button>
        ))}
      </div>
      <p className="quiet-note">没有记录，没有任务，也没有人催你。</p>
    </section>
  )
}

function CardView({ emotion, card, companions, companionCount, isFavorite, onFavorite, onStay, onBack }) {
  return (
    <section className="card-view view-enter">
      <button className="back-button" onClick={onBack}><Icon name="back" />换一种感受</button>
      <article className={`message-card ${emotion.tone}`} key={card.id}>
        <div className="card-meta">
          <span className={`emotion-dot ${emotion.tone}`} />
          <span>{emotion.label}</span>
        </div>
        <p aria-live="polite">{card.text}</p>
        <div className="companion-lines" aria-live="polite">
          {companions.slice(0, companionCount).map((line, index) => <p className="companion-line" key={`${emotion.id}-companion-${index}`}>{line}</p>)}
        </div>
        <button className={`save-button ${isFavorite ? 'saved' : ''}`} onClick={onFavorite} title={isFavorite ? '取消收藏' : '收藏这句话'} aria-label={isFavorite ? '取消收藏这句话' : '收藏这句话'} aria-pressed={isFavorite}>
          <Icon name="heart" filled={isFavorite} />
        </button>
      </article>
      {companionCount < companions.length && <div className="card-actions">
        <button className="text-button" onClick={onStay} aria-label="再坐一会儿">再坐一会儿</button>
      </div>}
      <p className={`leave-note ${companionCount === companions.length ? 'settled' : ''}`}>
        {companionCount === companions.length ? '可以停在这里。' : '你可以停在这里，也可以直接离开。'}
      </p>
    </section>
  )
}

function Favorites({ items, onBack, onRemove }) {
  return (
    <section className="simple-view view-enter">
      <button className="back-button" onClick={onBack}><Icon name="back" />回到首页</button>
      <div className="section-heading">
        <p className="eyebrow">只存在这台设备上</p>
        <h1>收藏的话</h1>
      </div>
      {items.length === 0 ? (
        <div className="empty-state">
          <Icon name="heart" />
          <p>这里还是空的。</p>
          <span>遇到想留下的话，再轻轻点一下心形。</span>
        </div>
      ) : (
        <div className="favorites-list">
          {[...items].reverse().map((item) => (
            <article className="favorite-item" key={item.id}>
              <small>{item.emotionLabel}</small>
              <p>{item.text}</p>
              <button className="icon-button remove-button" onClick={() => onRemove(item.id)} title="移出收藏" aria-label="移出收藏"><Icon name="trash" /></button>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

function About({ favoriteCount, confirmClear, onBack, onAskClear, onCancelClear, onClear }) {
  return (
    <section className="simple-view about-view view-enter">
      <button className="back-button" onClick={onBack}><Icon name="back" />回到首页</button>
      <div className="section-heading">
        <p className="eyebrow">关于这个空间</p>
        <h1>它只陪你坐一会儿。</h1>
      </div>
      <div className="about-section">
        <h2>隐私</h2>
        <p>无需登录，不上传你的选择和收藏，不接入广告或用户画像。收藏与主题偏好只保存在这台设备的浏览器中。</p>
      </div>
      <div className="about-section support-section">
        <h2>当你正处在危险中</h2>
        <p>这个工具不能替代专业帮助。如果你有伤害自己的念头，或此刻无法保证自己的安全，请立即联系能来到你身边的人或当地紧急服务。</p>
        <p>中国大陆可拨打 <a href="tel:12356">12356</a> 全国统一心理援助热线；紧急情况请拨打 <a href="tel:120">120</a> 或 <a href="tel:110">110</a>。</p>
      </div>
      <div className="about-section data-section">
        <div>
          <h2>本地数据</h2>
          <p>当前有 {favoriteCount} 条收藏。</p>
        </div>
        {confirmClear ? (
          <div className="confirm-actions" role="group" aria-label="确认清空收藏">
            <span>要清空吗？</span>
            <button className="quiet-button" onClick={onCancelClear}>先不清空</button>
            <button className="danger-button" onClick={onClear}>确认清空</button>
          </div>
        ) : (
          <button className="danger-button" onClick={onAskClear} disabled={favoriteCount === 0}><Icon name="trash" />清空收藏</button>
        )}
      </div>
      <p className="version">不用好起来 · 首个安静版本</p>
    </section>
  )
}

export default App
