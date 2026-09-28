import { useEffect, useRef, useState } from 'react'

const emotions = [
  {
    id: 'numb',
    label: '什么都感觉不到',
    hint: '像隔着一层雾',
    tone: 'sage',
    cards: [
      { text: '感觉不到什么，就先这样待着', companions: ['那就先这样待着', '不用找回什么', '先空着', '这里不催你'] },
      { text: '今天没什么波澜，那就没什么吧', companions: ['不用非要有感觉', '没有就没有', '先这样', '到这里也可以'] },
      { text: '感觉没回来，就先不回来', companions: ['不回来也可以', '不用催它', '先空着', '不急'] },
      { text: '空空的，就先空着', companions: ['不用急着填满', '什么都没有也可以', '先这样', '可以停在这里'] },
      { text: '什么都不想回应，就先不回应', companions: ['不回应也可以', '不用勉强开口', '先安静着', '不用说'] },
      { text: '不用证明自己正在感受', companions: ['不用证明', '感受不到也没关系', '就这样待着', '到这里也可以'] },
      { text: '此刻有些迟钝，也可以', companions: ['迟钝就迟钝吧', '不用急着清醒', '慢一点也行', '先这样'] },
      { text: '不用急着确认自己怎么了', companions: ['不确认也可以', '不知道就不知道', '先放着', '不急着想明白'] },
      { text: '今天可以只是安静地待着', companions: ['安静待着就很好', '不用做别的', '就这样', '可以停在这里'] },
      { text: '没有感觉的时间，也算时间', companions: ['算时间', '不用觉得浪费', '就这样过去也可以', '不用赶'] },
    ],
  },
  {
    id: 'tearless',
    label: '想哭，哭不出来',
    hint: '难过堵在里面',
    tone: 'blue',
    cards: [
      { text: '眼泪没来，难过也是真的', companions: ['难过就是难过', '不用眼泪证明', '堵着就堵着', '先让它待着'] },
      { text: '哭不出来的时候，就在这里坐一会儿', companions: ['那就坐一会儿', '不用急着哭', '先在这里', '到这里也可以'] },
      { text: '堵在心里的东西，不必立刻说清', companions: ['不用说清', '堵着也可以', '先让它堵着', '不急'] },
      { text: '难过不用看起来像难过', companions: ['不用看起来像', '怎样都可以', '就这样', '不用解释'] },
      { text: '没有哭，也可以', companions: ['不哭也可以', '不用责怪自己', '先这样', '这里不催你'] },
      { text: '这份难受，可以先没有出口', companions: ['没有出口也可以', '先堵着', '不用找路', '可以停在这里'] },
      { text: '眼眶是干的，心里的重量也是真的', companions: ['重量是真的', '不用否认', '就这样沉一会儿', '不用搬开'] },
      { text: '痛就是痛，不用眼泪证明', companions: ['痛就是痛', '不用证明', '先痛着', '不急'] },
      { text: '有些难过只是沉在那里', companions: ['沉在那里就沉在那里', '不用捞起来', '让它沉着', '先放着'] },
      { text: '你可以停在想哭的这一刻', companions: ['停在这里也可以', '不用往前', '就这一刻', '到这里也可以'] },
    ],
  },
  {
    id: 'silent',
    label: '不想解释',
    hint: '连说话都觉得费力',
    tone: 'rose',
    cards: [
      { text: '可以不说，你不用解释', companions: ['不说也可以', '不用解释', '先沉默', '这里不催你'] },
      { text: '沉默也可以', companions: ['沉默就沉默', '不用找话', '就这样安静', '可以停在这里'] },
      { text: '今天不回答任何问题，也可以', companions: ['不回答也可以', '不用应付', '先放着', '不急着回应'] },
      { text: '你不欠谁一份完整的说明', companions: ['不欠说明', '不用完整', '就这样', '不用补充'] },
      { text: '不想组织语言，就先不组织', companions: ['不组织也可以', '不用勉强', '先不说', '这里不催你'] },
      { text: '这里不需要你把话说完', companions: ['不用说完整', '半句也可以', '不说也行', '到这里也可以'] },
      { text: '暂时不回应，也可以', companions: ['不回应也可以', '不用急着答', '先安静', '不用开口'] },
      { text: '没有合适的话，就让安静留下来', companions: ['安静留下来就好', '不用找词', '就这样', '先放着'] },
      { text: '什么都不做，也可以', companions: ['不做也可以', '不用行动', '先待着', '可以停在这里'] },
      { text: '今天的沉默，就让它沉默', companions: ['沉默就沉默', '不用纠正', '让它这样', '不用改变'] },
    ],
  },
  {
    id: 'tired',
    label: '撑得有点累',
    hint: '不是睡一觉就会好的累',
    tone: 'amber',
    cards: [
      { text: '累了就是累了', companions: ['累了就累了', '不用找理由', '先歇着', '到这里也可以'] },
      { text: '今天少做一点，也可以', companions: ['少做一点也可以', '天不会塌', '先放下', '不急着补上'] },
      { text: '你可以暂时不那么能干', companions: ['不能干也可以', '不用撑着', '先这样', '可以停在这里'] },
      { text: '没有力气的时候，不用装作轻松', companions: ['不用装轻松', '没力气就没力气', '先歇着', '不用解释'] },
      { text: '这一刻只剩一点力气，也够了', companions: ['一点力气也够了', '不用更多', '就这样', '先停一会儿'] },
      { text: '肩膀不用一直绷着', companions: ['不用绷着', '松下来也可以', '先松一口气', '不急着起来'] },
      { text: '今天做不到的事，可以留在今天', companions: ['留到今天也可以', '不用带走', '先放着', '明天再说'] },
      { text: '你已经很累了，不必再把疲惫藏好', companions: ['不用藏', '累就累着', '先这样', '这里不催你'] },
      { text: '慢一点，也可以', companions: ['慢一点就慢一点', '不用赶', '就这样走', '不急'] },
      { text: '此刻不往前走，也不需要解释', companions: ['不往前走也可以', '不用解释', '先停着', '可以停在这里'] },
    ],
  },
  {
    id: 'unclear',
    label: '我也说不清',
    hint: '很多感觉混在一起',
    tone: 'violet',
    cards: [
      { text: '说不清就说不清，不是每种感觉都需要名字', companions: ['说不清就说不清', '不用命名', '先混着', '不急着分开'] },
      { text: '不知道怎么了，也可以', companions: ['不知道也可以', '不用弄清楚', '先这样', '可以停在这里'] },
      { text: '没有答案，也可以', companions: ['没有答案也可以', '不用找', '先放着', '不急'] },
      { text: '混在一起的感受，不用急着分开', companions: ['不用分开', '混着也可以', '先这样', '不用整理'] },
      { text: '你可以只知道自己不太好', companions: ['知道不太好就够了', '不用更多', '先这样', '到这里也可以'] },
      { text: '今天先不定义自己', companions: ['不定义也可以', '不用贴标签', '先放着', '不急着说明'] },
      { text: '找不到准确的词，也没有关系', companions: ['找不到也没关系', '不用准确', '先不说', '这里不催你'] },
      { text: '心里乱乱的，不需要立刻整理整齐', companions: ['乱就乱着', '不用整理', '先这样', '可以停在这里'] },
      { text: '说不清，也可以', companions: ['说不清也可以', '不用说明白', '先这样', '不急'] },
      { text: '不知道该从哪里说，就先不开始', companions: ['不开始也可以', '不用找头', '先停着', '到这里也可以'] },
    ],
  },
  {
    id: 'alone',
    label: '只想自己待会儿',
    hint: '暂时不想回到人群',
    tone: 'teal',
    cards: [
      { text: '想一个人待着，不需要向谁交代', companions: ['不用交代', '一个人待着就好', '先这样', '这里不催你'] },
      { text: '今天暂时不见人，也不必解释', companions: ['不见人也可以', '不用解释', '先关上门', '不急着打开'] },
      { text: '留一点安静给自己，也可以', companions: ['留一点安静', '不用给别人', '先这样', '安静留给你'] },
      { text: '暂时关上门，也可以', companions: ['关上门也可以', '不用马上开', '先关着', '可以停在这里'] },
      { text: '你可以晚一点再回到人群里', companions: ['晚一点也可以', '不用急着回', '先待着', '不急'] },
      { text: '暂时不回应，也可以', companions: ['不回应也可以', '不用勉强', '先安静', '不用开口'] },
      { text: '一个人待着，也可以', companions: ['一个人也可以', '不用陪谁', '先这样', '这里不催你'] },
      { text: '今天的世界可以先小一点', companions: ['小一点也可以', '不用那么大', '先缩着', '可以停在这里'] },
      { text: '暂时离远一点，也可以', companions: ['离远一点也可以', '不用靠近', '先这样', '不急着回来'] },
      { text: '这里没有人催你重新热闹起来', companions: ['不用热闹', '安静也可以', '先这样', '到这里也可以'] },
    ],
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
  const [farewell, setFarewell] = useState('')
  const bags = useRef({})
  const lastPicked = useRef({})
  const farewellTimer = useRef(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('quiet-theme-v1', theme) } catch { /* Private browsing may block storage. */ }
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#191a19' : '#ece9e2'
  }, [theme])

  useEffect(() => {
    try { localStorage.setItem('quiet-favorites-v1', JSON.stringify(favorites)) } catch { /* Favorites remain available for this session. */ }
  }, [favorites])

  useEffect(() => {
    const onPopState = () => {
      const nextView = readView()
      if (view === 'card' && nextView === 'home') showFarewell()
      setViewState(nextView)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [view])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && view !== 'home') {
        setConfirmClear(false)
        if (view === 'card') {
          showFarewell()
          window.history.replaceState({ view: 'home' }, '', window.location.pathname)
          setViewState('home')
          return
        }
        window.history.replaceState({ view: 'home' }, '', window.location.pathname)
        setViewState('home')
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [view])

  useEffect(() => () => window.clearTimeout(farewellTimer.current), [])

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
    const picked = emotion.cards[index]
    setCard({ id: `${emotion.id}-${index}`, text: picked.text, companions: picked.companions })
  }

  function openEmotion(emotion) {
    setActiveEmotion(emotion)
    setCompanionCount(0)
    pickCard(emotion)
    setView('card')
  }

  function showNextCompanion() {
    if (!card || companionCount >= card.companions.length) return
    setCompanionCount((count) => count + 1)
  }

  function showNextCard() {
    if (!activeEmotion) return
    setCompanionCount(0)
    pickCard(activeEmotion)
    window.scrollTo(0, 0)
  }

  function showFarewell() {
    const messages = ['门没锁，随时可以回来', '今天到这里也可以', '不用带走什么', '下次想来，再来', '这里一直在']
    setFarewell(messages[Math.floor(Math.random() * messages.length)])
    window.clearTimeout(farewellTimer.current)
    farewellTimer.current = window.setTimeout(() => setFarewell(''), 1600)
  }

  function leaveCard() {
    showFarewell()
    setView('home')
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
        <button className="brand" onClick={view === 'card' ? leaveCard : () => setView('home')} aria-label="返回情绪选择">
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
        {view === 'home' && <Home onChoose={openEmotion} farewell={farewell} />}
        {view === 'card' && activeEmotion && card && (
          <CardView
            emotion={activeEmotion}
            card={card}
            companions={card.companions}
            companionCount={companionCount}
            isFavorite={isFavorite}
            onFavorite={toggleFavorite}
            onStay={showNextCompanion}
            onNext={showNextCard}
            onBack={leaveCard}
          />
        )}
        {view === 'favorites' && <Favorites items={favorites} onBack={() => setView('home')} onRemove={(id) => setFavorites((items) => items.filter((item) => item.id !== id))} />}
        {view === 'about' && <About favoriteCount={favorites.length} confirmClear={confirmClear} onBack={() => { setConfirmClear(false); setView('home') }} onAskClear={() => setConfirmClear(true)} onCancelClear={() => setConfirmClear(false)} onClear={() => { setFavorites([]); setConfirmClear(false) }} />}
      </main>
    </div>
  )
}

function Home({ onChoose, farewell }) {
  return (
    <section className="home-view view-enter">
      <div className="intro">
        <p className="eyebrow">此刻不用做得更好</p>
        <h1>你现在，比较像哪一种？</h1>
        <p>不用选得准确，选一个靠近的就好</p>
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
      <p className={`quiet-note ${farewell ? 'farewell-note' : ''}`} aria-live="polite">
        {farewell || '没有记录，没有任务，也没有人催你'}
      </p>
    </section>
  )
}

function CardView({ emotion, card, companions, companionCount, isFavorite, onFavorite, onStay, onNext, onBack }) {
  return (
    <section className="card-view view-enter">
      <button className="back-button" onClick={onBack}><Icon name="back" />换一种状态</button>
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
      <div className="card-actions">
        {companionCount < companions.length && <button className="text-button" onClick={onStay} aria-label="再坐一会儿">再坐一会儿</button>}
        <button className="text-button" onClick={onNext} aria-label="看下一张卡片">下一张卡片</button>
      </div>
      <p className={`leave-note ${companionCount === companions.length ? 'settled' : ''}`}>
        可以停在这里，也可以看下一张卡片
      </p>
    </section>
  )
}

function Favorites({ items, onBack, onRemove }) {
  return (
    <section className="simple-view view-enter">
      <button className="back-button" onClick={onBack}><Icon name="back" />回到首页</button>
      <div className="section-heading">
        <p className="eyebrow">只留在这台设备里</p>
        <h1>收下的话</h1>
      </div>
      {items.length === 0 ? (
        <div className="empty-state">
          <Icon name="heart" />
        <p>这里还是空的</p>
          <span>遇到想留下的话，再轻轻点一下心形</span>
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
        <h1>它只陪你坐一会儿</h1>
      </div>
      <div className="about-section">
        <h2>隐私</h2>
        <p>无需登录，不上传你的选择和收藏，不接入广告或用户画像，收藏与主题偏好只保存在这台设备的浏览器中</p>
      </div>
      <div className="about-section support-section">
        <h2>当你正处在危险中</h2>
        <p>这个工具不能替代专业帮助，如果你有伤害自己的念头，或此刻无法保证自己的安全，请立即联系能来到你身边的人或当地紧急服务</p>
        <p>中国大陆可拨打 <a href="tel:12356">12356</a> 全国统一心理援助热线，紧急情况请拨打 <a href="tel:120">120</a> 或 <a href="tel:110">110</a></p>
      </div>
      <div className="about-section data-section">
        <div>
          <h2>本地数据</h2>
          <p>当前有 {favoriteCount} 条收藏</p>
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
