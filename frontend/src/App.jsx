import { useState, useEffect, useRef, useCallback } from "react";

/* ════════════════════════════════════════════════════════
   GLOBAL STYLES — all keyframes + responsive rules
════════════════════════════════════════════════════════ */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600;700&family=Outfit:wght@300;400;600;700;800&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Outfit', sans-serif; background: #000; color: #fff; overflow-x: hidden; }
  body.light-mode { background: #f5f5f5; color: #1a1a1a; }

  @keyframes codefall {
    0%   { transform: translateY(-50px); opacity: 0; }
    10%  { opacity: 0.7; }
    90%  { opacity: 0.7; }
    100% { transform: translateY(100vh); opacity: 0; }
  }
  @keyframes particleRise {
    0%   { transform: translateY(100vh) translateX(0) scale(0); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { transform: translateY(-100vh) translateX(80px) scale(1); opacity: 0; }
  }
  @keyframes floatCircle {
    0%,100% { transform: translate(0,0) scale(1); }
    25%     { transform: translate(30px,-30px) scale(1.1); }
    50%     { transform: translate(-20px,20px) scale(0.9); }
    75%     { transform: translate(20px,30px) scale(1.05); }
  }
  @keyframes lineMove {
    0%   { transform: translateX(-110%); }
    100% { transform: translateX(110%); }
  }
  @keyframes orbFloat {
    0%,100% { transform: translate(0,0); opacity: 0.6; }
    50%     { transform: translate(40px,-40px); opacity: 0.9; }
  }
  @keyframes logoFloat {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-4px); }
  }
    @keyframes scrollReveal {
    from { opacity: 0; transform: translateY(60px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes heroGlow {
    0%,100% { transform: translate(0,0); }
    50%     { transform: translate(-18px,-18px); }
  }
  @keyframes blink {
    0%,50%   { border-color: transparent; }
    51%,100% { border-color: #ff5a00; }
  }
  @keyframes bracketPulse {
    0%,100% { transform: scale(1);    opacity: 0.07; }
    50%     { transform: scale(1.15); opacity: 0.14; }
  }
  @keyframes symbolDrift {
    0%,100% { transform: translate(0,0) rotate(0deg); opacity: 0; }
    10%,90% { opacity: 0.25; }
    50%     { transform: translate(90px,-90px) rotate(180deg); }
  }
  @keyframes scrollDot {
    0%,100% { transform: translateY(0); opacity: 1; }
    50%     { transform: translateY(8px); opacity: 0.3; }
  }
  @keyframes imageFloat {
    0%,100% { transform: translateY(0) rotate(0deg); }
    33%     { transform: translateY(-12px) rotate(1deg); }
    66%     { transform: translateY(-6px) rotate(-1deg); }
  }
  @keyframes pulseGlow {
    0%,100% { box-shadow: 0 8px 30px rgba(255,90,0,0.3); }
    50%     { box-shadow: 0 20px 55px rgba(255,90,0,0.6); }
  }
  @keyframes underlinePop {
    from { width: 0; opacity: 0; }
    to   { width: 80px; opacity: 1; }
  }
  @keyframes cardReveal {
    from { opacity: 0; transform: translateY(36px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes progressFill {
    from { width: 0%; }
  }
  @keyframes progressGlow {
    0%,100% { box-shadow: 0 0 6px rgba(255,90,0,0.5); }
    50%     { box-shadow: 0 0 18px rgba(255,90,0,0.9); }
  }
  @keyframes iconBounce {
    0%,100% { transform: translateY(0) scale(1); }
    40%     { transform: translateY(-8px) scale(1.15); }
    60%     { transform: translateY(-4px) scale(1.08); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes counterUp {
    from { opacity: 0; transform: scale(0.5); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes menuSlide {
    from { opacity: 0; transform: translateY(-10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes successPop {
    0%  { transform: scale(0.8); opacity: 0; }
    60% { transform: scale(1.05); }
    100%{ transform: scale(1); opacity: 1; }
  }
  @keyframes sending {
    0%,100% { opacity: 1; }
    50%     { opacity: 0.4; }
  }
  @keyframes tagPop {
    from { opacity: 0; transform: scale(0.85); }
    to   { opacity: 1; transform: scale(1); }
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .nav-desktop-links { display: none !important; }
    .hamburger-btn     { display: flex !important; }
    .about-grid        { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
    .info-grid-inner   { grid-template-columns: 1fr !important; }
    .image-code-hint   { display: none !important; }
    .skills-grid       { grid-template-columns: 1fr !important; }
    .projects-grid     { grid-template-columns: 1fr !important; }
    .contact-info-grid { grid-template-columns: 1fr !important; }
    .contact-main-grid { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 480px) {
    .project-links-row { flex-direction: column !important; }
    .skill-tags-row    { flex-wrap: wrap !important; }
    .contact-form-inner{ padding: 1.2rem !important; }
  }
  @media (min-width: 769px) {
    .hamburger-btn { display: none !important; }
    .mobile-menu   { display: none !important; }
  }
`;

/* ════════════════════════════════════════════════════════
   SHARED: BG ANIMATION
════════════════════════════════════════════════════════ */
function BgAnimation({ isLight }) {
  const rainRef = useRef(null);
  const bgRef   = useRef(null);

  useEffect(() => {
    const el = rainRef.current; if (!el) return;
    const tokens = ['<','>','{','}','[]','();','const','let','if','fn','=>','&&','0x','//'];
    const go = () => {
      const c = document.createElement('div');
      Object.assign(c.style, {
        position:'absolute', pointerEvents:'none',
        color: isLight ? 'rgba(255,64,0,0.5)' : 'rgba(255,90,0,0.6)',
        fontFamily:"'Fira Code',monospace", fontSize:`${Math.random()*4+11}px`,
        opacity:'0', left:Math.random()*100+'%',
        animationName:'codefall', animationDuration:(Math.random()*6+5)+'s',
        animationDelay:Math.random()*2+'s', animationTimingFunction:'linear',
        animationFillMode:'both', whiteSpace:'nowrap',
      });
      c.textContent = tokens[Math.floor(Math.random()*tokens.length)];
      el.appendChild(c); setTimeout(()=>c.remove(), 9000);
    };
    const id = setInterval(go, 300);
    for(let i=0;i<18;i++) setTimeout(go, i*150);
    return ()=>clearInterval(id);
  }, [isLight]);

  useEffect(() => {
    const el = bgRef.current; if (!el) return;
    const go = () => {
      const p = document.createElement('div');
      Object.assign(p.style, {
        position:'absolute', borderRadius:'50%', pointerEvents:'none',
        width:`${Math.random()*3+2}px`, height:`${Math.random()*3+2}px`,
        background: isLight ? '#ff4000' : '#ff5a00',
        left:Math.random()*100+'%', opacity:'0',
        animationName:'particleRise', animationDuration:(Math.random()*10+12)+'s',
        animationDelay:Math.random()*4+'s', animationTimingFunction:'linear',
      });
      el.appendChild(p); setTimeout(()=>p.remove(), 16000);
    };
    const id = setInterval(go, 600);
    for(let i=0;i<15;i++) setTimeout(go, i*120);
    return ()=>clearInterval(id);
  }, [isLight]);

  const a = isLight ? '0.07' : '0.14';
  return (
    <div ref={bgRef} style={{ position:'fixed', inset:0, zIndex:-1, pointerEvents:'none', overflow:'hidden', background:'inherit' }}>
      {[{w:320,h:320,top:'8%',left:'8%',d:'0s'},{w:420,h:420,top:'58%',right:'6%',d:'3s'},{w:260,h:260,bottom:'8%',left:'48%',d:'6s'}].map((c,i)=>(
        <div key={i} style={{ position:'absolute', width:c.w, height:c.h, borderRadius:'50%', background:`radial-gradient(circle,rgba(255,90,0,${a}) 0%,transparent 70%)`, top:c.top, left:c.left, right:c.right, bottom:c.bottom, animationName:'floatCircle', animationDuration:'22s', animationDelay:c.d, animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }}/>
      ))}
      {['18%','48%','78%'].map((top,i)=>(
        <div key={i} style={{ position:'absolute', height:'1px', width:'100%', top, background:`linear-gradient(90deg,transparent,${isLight?'#ff4000':'#ff5a00'},transparent)`, opacity:isLight?0.15:0.25, animationName:'lineMove', animationDuration:'9s', animationDelay:`${i*2.5}s`, animationTimingFunction:'linear', animationIterationCount:'infinite' }}/>
      ))}
      {[{top:'28%',right:'18%',d:'0s'},{bottom:'38%',left:'12%',d:'4s'}].map((o,i)=>(
        <div key={i} style={{ position:'absolute', width:160, height:160, borderRadius:'50%', background:`radial-gradient(circle,rgba(255,90,0,${isLight?'0.18':'0.38'}) 0%,transparent 70%)`, filter:'blur(45px)', top:o.top, right:o.right, bottom:o.bottom, left:o.left, animationName:'orbFloat', animationDuration:'13s', animationDelay:o.d, animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }}/>
      ))}
      <div ref={rainRef} style={{ position:'absolute', inset:0, overflow:'hidden' }}/>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   SHARED: HAMBURGER + THEME BUTTON
════════════════════════════════════════════════════════ */
function Hamburger({ open, onClick, isLight }) {
  const bar = (extra={}) => ({
    display:'block', width:'24px', height:'2.5px',
    background: isLight ? '#1a1a1a' : '#fff',
    borderRadius:'2px', transition:'all 0.32s ease', ...extra,
  });
  return (
    <button className="hamburger-btn" onClick={onClick} aria-label="Toggle menu"
      style={{ background:'none', border:'none', cursor:'pointer', display:'flex', flexDirection:'column', gap:'5px', padding:'6px', zIndex:1100 }}>
      <span style={bar({ transform: open?'translateY(7px) rotate(45deg)':'none' })}/>
      <span style={bar({ opacity: open?0:1, transform: open?'scaleX(0)':'scaleX(1)' })}/>
      <span style={bar({ transform: open?'translateY(-7px) rotate(-45deg)':'none' })}/>
    </button>
  );
}

function ThemeBtn({ isLight, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} aria-label="Toggle theme"
      style={{ width:'clamp(36px,5vw,46px)', height:'clamp(36px,5vw,46px)', background:isLight?'#fff':'#111', border:'2px solid #ff5a00', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:'clamp(0.95rem,2vw,1.25rem)', transition:'all 0.3s ease', flexShrink:0, boxShadow:hov?'0 6px 24px rgba(255,90,0,0.6)':'0 3px 14px rgba(255,90,0,0.3)', transform:hov?'rotate(180deg) scale(1.1)':'none' }}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      {isLight ? '☀️' : '🌙'}
    </button>
  );
}

/* ════════════════════════════════════════════════════════
   SHARED: NAVBAR — active link tracks scroll position
════════════════════════════════════════════════════════ */
const NAV_ITEMS = [
  { label:'Home',     href:'#home' },
  { label:'About',    href:'#about' },
  { label:'Skills',   href:'#skills' },
  { label:'Projects', href:'#projects' },
  { label:'Contact',  href:'#contact' },
];

function Navbar({ isLight, toggleTheme, scrolled, activeSection }) {
  const [open, setOpen] = useState(false);
  const [hov,  setHov]  = useState(null);

  useEffect(()=>{
    const fn=()=>{ if(window.innerWidth>768) setOpen(false); };
    window.addEventListener('resize', fn);
    return ()=>window.removeEventListener('resize', fn);
  },[]);

  const navBg = scrolled ? (isLight?'rgba(245,245,245,0.93)':'rgba(0,0,0,0.93)') : 'transparent';
  const shadow = scrolled ? (isLight?'0 4px 30px rgba(0,0,0,0.12)':'0 4px 30px rgba(255,90,0,0.18)') : 'none';

  return (
    <>
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:1000, padding:'clamp(0.9rem,2vw,1.5rem) clamp(1rem,5vw,5%)', backdropFilter:'blur(14px)', background:navBg, boxShadow:shadow, transition:'all 0.3s ease', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <a href="#home" style={{ fontFamily:"'Fira Code',monospace", fontSize:'clamp(1.2rem,3.5vw,1.8rem)', fontWeight:700, background:'linear-gradient(135deg,#ff5a00,#ff8800)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', textDecoration:'none', animation:'logoFloat 3s ease-in-out infinite', letterSpacing:'-0.5px' }}>&lt;SH /&gt;</a>

        <ul className="nav-desktop-links" style={{ display:'flex', gap:'clamp(1.2rem,3vw,2.8rem)', listStyle:'none' }}>
          {NAV_ITEMS.map((n,i)=>{
            const active = activeSection === n.href.replace('#','');
            return (
              <li key={n.label}>
                <a href={n.href}
                  style={{ color:(hov===i||active)?'#ff5a00':(isLight?'#1a1a1a':'#ddd'), textDecoration:'none', fontWeight:600, fontSize:'clamp(0.85rem,1.5vw,1rem)', transition:'color 0.25s', position:'relative', paddingBottom:'4px' }}
                  onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}>
                  {n.label}
                  <span style={{ position:'absolute', bottom:0, left:0, height:'2px', borderRadius:'2px', background:'linear-gradient(90deg,#ff5a00,#ff8800)', width:(hov===i||active)?'100%':'0%', transition:'width 0.3s ease' }}/>
                </a>
              </li>
            );
          })}
        </ul>

        <div style={{ display:'flex', alignItems:'center', gap:'0.7rem' }}>
          <ThemeBtn isLight={isLight} onClick={toggleTheme}/>
          <Hamburger open={open} onClick={()=>setOpen(o=>!o)} isLight={isLight}/>
        </div>
      </nav>

      {open && (
        <div className="mobile-menu" style={{ position:'fixed', top:'clamp(60px,10vw,80px)', left:0, right:0, zIndex:999, background:isLight?'rgba(245,245,245,0.97)':'rgba(8,8,8,0.97)', backdropFilter:'blur(18px)', borderBottom:'1px solid rgba(255,90,0,0.2)', boxShadow:'0 12px 45px rgba(0,0,0,0.45)', animation:'menuSlide 0.25s ease', padding:'0.5rem 0 1rem' }}>
          {NAV_ITEMS.map((n,i)=>(
            <a key={n.label} href={n.href} onClick={()=>setOpen(false)}
              style={{ display:'flex', alignItems:'center', gap:'10px', padding:'0.85rem clamp(1rem,5vw,2rem)', color:activeSection===n.href.replace('#','')?'#ff5a00':(isLight?'#1a1a1a':'#ddd'), textDecoration:'none', fontWeight:600, fontSize:'1rem', borderBottom:i<NAV_ITEMS.length-1?`1px solid rgba(255,90,0,${isLight?'0.09':'0.11'})`:'none', transition:'all 0.2s' }}
              onMouseEnter={e=>{ e.currentTarget.style.color='#ff5a00'; e.currentTarget.style.paddingLeft='clamp(1.4rem,6vw,2.5rem)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.paddingLeft='clamp(1rem,5vw,2rem)'; }}>
              <span style={{ fontFamily:"'Fira Code',monospace", color:'#ff5a00', fontSize:'0.78rem', minWidth:'22px' }}>0{i+1}.</span>
              {n.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION 1: HOME
════════════════════════════════════════════════════════ */
function useTyping(texts, speed=100, del=50, pause=2000) {
  const [disp, setDisp]  = useState('');
  const [idx,  setIdx]   = useState(0);
  const [ci,   setCi]    = useState(0);
  const [isDel,setIsDel] = useState(false);
  useEffect(()=>{
    const cur = texts[idx]; let t;
    if (!isDel && ci < cur.length)       t = setTimeout(()=>{ setDisp(cur.slice(0,ci+1)); setCi(c=>c+1); }, speed);
    else if (!isDel && ci===cur.length)  t = setTimeout(()=>setIsDel(true), pause);
    else if (isDel && ci > 0)            t = setTimeout(()=>{ setDisp(cur.slice(0,ci-1)); setCi(c=>c-1); }, del);
    else if (isDel && ci===0)            { setIsDel(false); setIdx(i=>(i+1)%texts.length); }
    return ()=>clearTimeout(t);
  },[ci,isDel,idx,texts,speed,del,pause]);
  return disp;
}

function HomeSection({ isLight }) {
  const heroRef = useRef(null);
  const typed   = useTyping(['Developer','Creative Thinker','Problem Solver']);
  const binary  = useRef(Array.from({length:3200},(_,i)=>i%82===81?'\n':(Math.random()>0.5?'1':'0')).join('')).current;

  useEffect(()=>{
    const hero = heroRef.current; if(!hero) return;
    const defs=[{char:'{',top:'12%',left:'5%',delay:'0s'},{char:'}',top:'12%',right:'5%',delay:'1.5s'},{char:'<',bottom:'14%',left:'8%',delay:'0.7s'},{char:'>',bottom:'14%',right:'8%',delay:'2.2s'}];
    const els = defs.map(d=>{
      const div=document.createElement('div');
      div.textContent=d.char;
      Object.assign(div.style,{ position:'absolute', fontFamily:"'Fira Code',monospace", fontSize:'100px', color:'rgba(255,90,0,0.07)', pointerEvents:'none', userSelect:'none', animationName:'bracketPulse', animationDuration:'3.5s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite', animationDelay:d.delay, top:d.top||'auto', bottom:d.bottom||'auto', left:d.left||'auto', right:d.right||'auto' });
      hero.appendChild(div); return div;
    });
    return ()=>els.forEach(e=>e.remove());
  },[]);

  useEffect(()=>{
    const hero=heroRef.current; if(!hero) return;
    const syms=['</>','{}','[]','()','//','==','!=','&&','||','++','fn','=>'];
    const created=[];
    const add=()=>{
      const div=document.createElement('div');
      div.textContent=syms[Math.floor(Math.random()*syms.length)];
      Object.assign(div.style,{ position:'absolute', fontFamily:"'Fira Code',monospace", fontSize:`${Math.random()*10+18}px`, color:isLight?'rgba(255,64,0,0.25)':'rgba(255,90,0,0.25)', pointerEvents:'none', userSelect:'none', left:Math.random()*88+'%', top:Math.random()*85+'%', animationName:'symbolDrift', animationDuration:(Math.random()*10+12)+'s', animationDelay:Math.random()*2+'s', animationTimingFunction:'ease-in-out' });
      hero.appendChild(div); created.push(div); setTimeout(()=>div.remove(),16000);
    };
    const id=setInterval(add,2200); for(let i=0;i<10;i++) setTimeout(add,i*400);
    return ()=>{ clearInterval(id); created.forEach(e=>e.remove()); };
  },[isLight]);

  return (
    <section id="home" ref={heroRef} style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'clamp(5rem,12vw,9rem) clamp(1rem,6vw,5%) clamp(2rem,5vw,4rem)', background:'transparent', position:'relative', overflow:'hidden', transition:'background 0.5s' }}>
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', userSelect:'none', fontFamily:"'Fira Code',monospace", fontSize:'clamp(8px,1.1vw,12px)', color:`rgba(255,90,0,${isLight?'0.025':'0.04'})`, lineHeight:1.6, overflow:'hidden', whiteSpace:'pre' }}>{binary}</div>
      <div aria-hidden style={{ position:'absolute', width:'min(520px,65vw)', height:'min(520px,65vw)', background:'radial-gradient(circle,rgba(255,90,0,0.1) 0%,transparent 70%)', borderRadius:'50%', top:'-26%', right:'-20%', animation:'heroGlow 7s ease-in-out infinite' }}/>
      <div aria-hidden style={{ position:'absolute', width:'min(400px,52vw)', height:'min(400px,52vw)', background:'radial-gradient(circle,rgba(255,90,0,0.07) 0%,transparent 70%)', borderRadius:'50%', bottom:'-20%', left:'-18%', animation:'heroGlow 9s ease-in-out infinite reverse' }}/>

      <div style={{ textAlign:'center', zIndex:2, width:'100%', maxWidth:'820px' }}>
        <p style={{ fontFamily:"'Fira Code',monospace", color:'#ff5a00', fontSize:'clamp(0.68rem,1.8vw,0.9rem)', letterSpacing:'3px', textTransform:'uppercase', marginBottom:'clamp(0.8rem,2vw,1.2rem)', animation:'fadeInUp 0.8s ease 0.1s both' }}>&lt;!-- Portfolio --&gt;</p>

        <h1 style={{ fontFamily:"'Outfit',sans-serif", fontSize:'clamp(1.9rem,6.5vw,4.5rem)', fontWeight:800, lineHeight:1.1, marginBottom:'clamp(0.8rem,2.5vw,1.3rem)', background:'linear-gradient(135deg,#ff5a00 0%,#ff8800 55%,#ffaa00 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', animation:'fadeInUp 0.8s ease 0.25s both', letterSpacing:'-1px' }}>
          Hi, I'm Somnath Hake
        </h1>

        <p style={{ fontSize:'clamp(0.95rem,2.8vw,1.4rem)', color:isLight?'#555':'#aaa', marginBottom:'clamp(1.8rem,4vw,2.6rem)', animation:'fadeInUp 0.8s ease 0.4s both', fontWeight:400 }}>
          Student &nbsp;|&nbsp;{' '}
          <span style={{ fontFamily:"'Fira Code',monospace", display:'inline-block', color:'#ff5a00', borderRight:'2.5px solid #ff5a00', paddingRight:'3px', animation:'blink 0.7s step-end infinite', minWidth:'4px' }}>{typed}</span>
        </p>

        <div style={{ display:'flex', gap:'clamp(0.6rem,2vw,1rem)', justifyContent:'center', flexWrap:'wrap', animation:'fadeInUp 0.8s ease 0.55s both' }}>
          <HeroBtn href="#contact" primary>Get In Touch</HeroBtn>
          <HeroBtn href="assets/resume.pdf" download>Download CV</HeroBtn>
        </div>

        <div style={{ marginTop:'clamp(2.5rem,6vw,4.5rem)', display:'flex', flexDirection:'column', alignItems:'center', gap:'6px', animation:'fadeInUp 0.8s ease 0.7s both', opacity:0.7 }}>
          <span style={{ color:'#ff5a00', fontSize:'0.68rem', letterSpacing:'3px', textTransform:'uppercase', fontFamily:"'Fira Code',monospace" }}>scroll</span>
          <div style={{ width:'20px', height:'34px', border:`2px solid ${isLight?'rgba(0,0,0,0.18)':'rgba(255,255,255,0.15)'}`, borderRadius:'12px', display:'flex', justifyContent:'center', paddingTop:'6px' }}>
            <div style={{ width:'3px', height:'8px', background:'#ff5a00', borderRadius:'3px', animation:'scrollDot 1.4s ease-in-out infinite' }}/>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroBtn({ href, children, primary, download }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} download={download}
      style={{ display:'inline-block', borderRadius:'50px', fontWeight:700, fontFamily:"'Outfit',sans-serif", textDecoration:'none', cursor:'pointer', transition:'all 0.3s ease', fontSize:'clamp(0.85rem,2vw,1rem)', padding:'clamp(0.75rem,2vw,1rem) clamp(1.5rem,4vw,2.5rem)', ...(primary ? { background:hov?'linear-gradient(135deg,#ff3a00,#ff6a00)':'linear-gradient(135deg,#ff5a00,#ff7a00)', color:'#fff', boxShadow:hov?'0 14px 40px rgba(255,90,0,0.65)':'0 8px 25px rgba(255,90,0,0.4)', transform:hov?'translateY(-3px)':'none' } : { background:hov?'linear-gradient(135deg,#ff5a00,#ff7a00)':'transparent', color:hov?'#fff':'#ff5a00', border:'2px solid #ff5a00', boxShadow:hov?'0 14px 40px rgba(255,90,0,0.5)':'0 4px 18px rgba(255,90,0,0.15)', transform:hov?'translateY(-3px)':'none' }) }}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      {children}
    </a>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION 2: ABOUT
════════════════════════════════════════════════════════ */
const INFO_ITEMS = [
  { icon:'📧', label:'Email',     value:'somnathhake09@gmail.com' },
  { icon:'📱', label:'Phone',     value:'+91 8767 75 0962' },
  { icon:'📍', label:'Location',  value:'Old Sangvi, Pune-411027, Maharashtra' },
  { icon:'🎓', label:'Education', value:'Bvoc (Software Development) Student' },
];

function InfoCard({ icon, label, value, isLight }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ background:isLight?'#fff':'#0d0d0d', border:`1px solid ${hov?'#ff5a00':'rgba(255,90,0,0.18)'}`, borderRadius:'14px', padding:'clamp(1rem,2.5vw,1.5rem)', transition:'all 0.3s ease', transform:hov?'translateY(-6px)':'none', boxShadow:hov?'0 14px 38px rgba(255,90,0,0.28)':isLight?'0 4px 15px rgba(0,0,0,0.07)':'0 2px 12px rgba(0,0,0,0.3)', cursor:'default' }}>
      <strong style={{ display:'flex', alignItems:'center', gap:'8px', color:'#ff5a00', marginBottom:'0.5rem', fontSize:'clamp(0.82rem,1.8vw,0.95rem)', fontWeight:700 }}><span>{icon}</span>{label}</strong>
      <span style={{ color:isLight?'#555':'#aaa', fontSize:'clamp(0.78rem,1.7vw,0.9rem)', lineHeight:1.55, wordBreak:'break-word' }}>{value}</span>
    </div>
  );
}

function AboutSection({ isLight }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting) setVisible(true); },{threshold:0.1});
    if(ref.current) obs.observe(ref.current);
    return()=>obs.disconnect();
  },[]);

  return (
    <section id="about" ref={ref} style={{ minHeight:'100vh', padding:'clamp(5.5rem,13vw,9rem) clamp(1rem,5vw,5%) clamp(3rem,6vw,5rem)', position:'relative', opacity:visible?1:0, transform:visible?'translateY(0)':' translateY(60px)', transition:'opacity 0.8s ease, transform 0.8s ease' }}>
      <div style={{ textAlign:'center', marginBottom:'clamp(2.5rem,6vw,4rem)' }}>
        <p style={{ fontFamily:"'Fira Code',monospace", color:'#ff5a00', fontSize:'clamp(0.68rem,1.5vw,0.85rem)', letterSpacing:'3px', textTransform:'uppercase', marginBottom:'0.6rem', animation:visible?'fadeInUp 0.7s ease 0.1s both':'none', opacity:visible?undefined:0 }}></p>
        <h2 style={{ display:'inline-block', fontFamily:"'Outfit',sans-serif", fontSize:'clamp(1.8rem,5vw,2.8rem)', fontWeight:800, background:'linear-gradient(135deg,#ff5a00,#ff8800)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', position:'relative', paddingBottom:'18px', animation:visible?'fadeInUp 0.7s ease 0.2s both':'none', opacity:visible?undefined:0 }}>
          About Me
          <span style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', height:'4px', background:'linear-gradient(90deg,#ff5a00,#ff8800)', borderRadius:'2px', display:'block', animation:visible?'underlinePop 0.8s ease 0.4s both':'none' }}/>
        </h2>
      </div>

      <div className="about-grid" style={{ maxWidth:'1160px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(2rem,5vw,4.5rem)', alignItems:'center' }}>
        <div style={{ animation:visible?'fadeInLeft 0.8s ease 0.15s both':'none', opacity:visible?undefined:0 }}>
          <div style={{ width:'100%', height:'clamp(260px,38vw,430px)', background:'linear-gradient(135deg,#ff5a00 0%,#ff8800 55%,#ffaa00 100%)', borderRadius:'24px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'clamp(5rem,13vw,8.5rem)', animation:'imageFloat 6s ease-in-out infinite, pulseGlow 4s ease-in-out infinite', position:'relative', overflow:'hidden', cursor:'default' }}>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(255,255,255,0.18) 0%,transparent 55%,rgba(255,255,255,0.06) 100%)', borderRadius:'24px', pointerEvents:'none' }}/>
            <div className="image-code-hint" style={{ position:'absolute', top:'14px', left:'16px', fontFamily:"'Fira Code',monospace", fontSize:'clamp(0.58rem,1.2vw,0.75rem)', color:'rgba(255,255,255,0.45)', lineHeight:1.7 }}>
              {/* {'// developer.js'}<br/>{'const me = {'}<br/>{'  passion: true,'}<br/>{'  learning: ∞,'}<br/>{'  coffee: required'}<br/>{'}'} */}
            </div>
            <div style={{ position:'absolute', bottom:'14px', right:'16px', fontFamily:"'Fira Code',monospace", fontSize:'clamp(0.55rem,1.1vw,0.7rem)', color:'rgba(255,255,255,0.4)' }}>{'</developer>'}</div>
            👨‍💻
          </div>
        </div>

        <div style={{ animation:visible?'fadeInRight 0.8s ease 0.3s both':'none', opacity:visible?undefined:0 }}>
          <p style={{ fontFamily:"'Fira Code',monospace", color:'#ff5a00', fontSize:'clamp(0.68rem,1.8vw,0.82rem)', letterSpacing:'3px', textTransform:'uppercase', marginBottom:'clamp(0.6rem,1.5vw,1rem)' }}></p>
          <h3 style={{ fontFamily:"'Outfit',sans-serif", fontSize:'clamp(1.35rem,3.5vw,2rem)', fontWeight:700, lineHeight:1.2, marginBottom:'clamp(0.9rem,2vw,1.3rem)', background:'linear-gradient(135deg,#ff5a00,#ff8800)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Hello! I'm a Student Developer</h3>
          <p style={{ color:isLight?'#555':'#bbb', marginBottom:'clamp(0.8rem,2vw,1.2rem)', fontSize:'clamp(0.88rem,1.9vw,1.05rem)', lineHeight:1.9 }}>
            I'm a passionate student with a love for technology and innovation. Currently pursuing my degree in BVOC Software Devlopment, I spend my time learning new technologies, building projects, and constantly pushing myself to grow.
          </p>
          <p style={{ color:isLight?'#555':'#bbb', marginBottom:'clamp(1.2rem,3vw,2rem)', fontSize:'clamp(0.88rem,1.9vw,1.05rem)', lineHeight:1.9 }}>
            I believe in the power of creativity and continuous learning to make a positive impact. My journey in tech has taught me that every challenge is an opportunity to learn something new.
          </p>
          <div className="info-grid-inner" style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'clamp(0.75rem,2vw,1.1rem)' }}>
            {INFO_ITEMS.map(item=><InfoCard key={item.label} {...item} isLight={isLight}/>)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION 3: SKILLS
════════════════════════════════════════════════════════ */
const SKILLS = [
  { icon:'💻', title:'Web Development',  subtitle:'Building modern, responsive web apps', tags:['HTML','CSS','JavaScript','React'], pct:85 },
  { icon:'⚙️', title:'Programming',      subtitle:'Core languages for backend & systems',  tags:['Python','C++'], pct:80 },
  { icon:'🤖', title:'AI-Assisted Website Development',  subtitle:'Using AI to accelerate web development and improve design quality.', tags:['AI Tools'], pct:85 },
  // { icon:'🎨', title:'UI/UX Design',     subtitle:'Crafting intuitive user experiences',   tags:['Figma','Adobe XD','Canva'],       pct:75 },
  // { icon:'🔧', title:'Problem Solving',  subtitle:'Algorithms, logic & data structures',  tags:['DSA','Algorithms','OOP'],pct:90 },
  { icon:'🗄️', title:'Database',         subtitle:'Relational & NoSQL data management',   tags:['MySQL','MongoDB Altas'],pct:70 },
  { icon:'🔗', title:'Version Control',  subtitle:'Collaborative development & CI/CD',    tags:['Git','GitHub'],pct:85 },
];

function SkillBar({ pct, isLight, triggered }) {
  return (
    <div style={{ marginTop:'1.2rem', position:'relative' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'6px' }}>
        <span style={{ fontFamily:"'Fira Code',monospace", fontSize:'0.72rem', color:isLight?'#888':'#666', letterSpacing:'1px' }}>proficiency</span>
        <span style={{ fontFamily:"'Fira Code',monospace", fontWeight:700, fontSize:'clamp(0.82rem,1.5vw,0.95rem)', color:'#ff5a00', animation:triggered?'counterUp 0.5s ease 0.3s both':'none', opacity:triggered?undefined:0 }}>{pct}%</span>
      </div>
      <div style={{ height:'10px', borderRadius:'10px', background:isLight?'#e8e8e8':'#111', overflow:'hidden', position:'relative', boxShadow:isLight?'inset 0 1px 3px rgba(0,0,0,0.1)':'inset 0 1px 4px rgba(0,0,0,0.6)' }}>
        <div style={{ height:'100%', borderRadius:'10px', background:'linear-gradient(90deg,#ff3a00,#ff5a00,#ff8800)', backgroundSize:'200% 100%', animation:triggered?`progressFill 1.4s cubic-bezier(0.4,0,0.2,1) 0.2s both, shimmer 2s linear 1.6s infinite, progressGlow 2s ease-in-out 1.6s infinite`:'none', width:triggered?`${pct}%`:'0%', position:'relative' }}>
          {triggered && <div style={{ position:'absolute', right:'0', top:'50%', transform:'translate(50%,-50%)', width:'14px', height:'14px', borderRadius:'50%', background:'#fff', boxShadow:'0 0 8px #ff5a00', border:'2px solid #ff5a00' }}/>}
        </div>
      </div>
    </div>
  );
}

function SkillCard({ icon, title, subtitle, tags, pct, isLight, delay, triggered }) {
  const [hov,setHov]=useState(false); const [iconAni,setIconAni]=useState(false);
  return (
    <div onMouseEnter={()=>{ setHov(true); setIconAni(true); }} onMouseLeave={()=>{ setHov(false); setTimeout(()=>setIconAni(false),600); }}
      style={{ background:isLight?'#fff':'#0a0a0a', padding:'clamp(1.3rem,2.5vw,2rem)', borderRadius:'16px', border:`1px solid ${hov?'#ff5a00':'rgba(255,90,0,0.15)'}`, boxShadow:hov?'0 20px 55px rgba(255,90,0,0.35)':isLight?'0 6px 24px rgba(0,0,0,0.09)':'0 6px 24px rgba(0,0,0,0.5)', transform:hov?'translateY(-10px)':'translateY(0)', transition:'all 0.35s ease', animation:`cardReveal 0.6s ease ${delay} both`, position:'relative', overflow:'hidden' }}>
      {hov && <div style={{ position:'absolute', inset:0, pointerEvents:'none', background:'linear-gradient(135deg,transparent 40%,rgba(255,90,0,0.04) 50%,transparent 60%)', backgroundSize:'200% 200%', animation:'shimmer 1.5s linear infinite' }}/>}
      <div style={{ fontSize:'clamp(2.2rem,4vw,3rem)', marginBottom:'0.9rem', display:'inline-block', animation:iconAni?'iconBounce 0.6s ease':'none' }}>{icon}</div>
      <h3 style={{ fontFamily:"'Outfit',sans-serif", fontSize:'clamp(1.1rem,2.5vw,1.45rem)', fontWeight:700, marginBottom:'0.3rem', background:'linear-gradient(135deg,#ff5a00,#ff8800)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{title}</h3>
      <p style={{ color:isLight?'#666':'#888', fontSize:'clamp(0.8rem,1.5vw,0.92rem)', marginBottom:'0.9rem', lineHeight:1.6 }}>{subtitle}</p>
      <div className="skill-tags-row" style={{ display:'flex', gap:'0.4rem', flexWrap:'wrap', marginBottom:'0.2rem' }}>
        {tags.map(t=><span key={t} style={{ background:`rgba(255,90,0,${isLight?'0.07':'0.12'})`, color:isLight?'#cc3a00':'#ff7a30', padding:'0.22rem 0.65rem', borderRadius:'20px', fontSize:'clamp(0.68rem,1.2vw,0.78rem)', border:'1px solid rgba(255,90,0,0.22)', fontFamily:"'Fira Code',monospace", fontWeight:600 }}>{t}</span>)}
      </div>
      <SkillBar pct={pct} isLight={isLight} triggered={triggered}/>
    </div>
  );
}

function SkillsSection({ isLight }) {
  const [visible,setVisible]=useState(false); const [triggered,setTriggered]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting){ setVisible(true); setTimeout(()=>setTriggered(true),400); } },{threshold:0.1});
    if(ref.current) obs.observe(ref.current);
    return()=>obs.disconnect();
  },[]);
  const avgPct = Math.round(SKILLS.reduce((a,s)=>a+s.pct,0)/SKILLS.length);

  return (
    <section id="skills" ref={ref} style={{ minHeight:'100vh', padding:'clamp(6rem,12vw,9rem) clamp(1rem,5vw,5%) clamp(3rem,6vw,5rem)', position:'relative', opacity:visible?1:0, transform:visible?'translateY(0)':' translateY(60px)', transition:'opacity 0.8s ease, transform 0.8s ease' }}>
      <div style={{ textAlign:'center', marginBottom:'clamp(1.5rem,3vw,2.5rem)' }}>
        <p style={{ fontFamily:"'Fira Code',monospace", color:'#ff5a00', fontSize:'clamp(0.68rem,1.5vw,0.85rem)', letterSpacing:'3px', textTransform:'uppercase', marginBottom:'0.6rem', animation:visible?'fadeInUp 0.7s ease 0.1s both':'none', opacity:visible?undefined:0 }}></p>
        <h2 style={{ display:'inline-block', fontFamily:"'Outfit',sans-serif", fontSize:'clamp(1.8rem,5vw,2.8rem)', fontWeight:800, background:'linear-gradient(135deg,#ff5a00,#ff8800)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', position:'relative', paddingBottom:'18px', animation:visible?'fadeInUp 0.7s ease 0.2s both':'none', opacity:visible?undefined:0 }}>
          My Skills
          <span style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', width:'clamp(50px,8vw,80px)', height:'4px', background:'linear-gradient(135deg,#ff5a00,#ff8800)', borderRadius:'2px', display:'block' }}/>
        </h2>
        <p style={{ marginTop:'clamp(1.5rem,3vw,2rem)', color:isLight?'#666':'#888', fontSize:'clamp(0.88rem,1.8vw,1.05rem)', maxWidth:'540px', margin:'clamp(1.5rem,3vw,2rem) auto 0', lineHeight:1.7, animation:visible?'fadeInUp 0.7s ease 0.3s both':'none', opacity:visible?undefined:0 }}>
          Technologies and tools I work with — each bar reflects hands-on experience.
        </p>
      </div>

      {visible && (
        <div style={{ maxWidth:'1200px', margin:'0 auto clamp(2rem,4vw,3rem)', display:'flex', flexWrap:'wrap', gap:'clamp(0.8rem,2vw,1.2rem)', justifyContent:'center', animation:'fadeInUp 0.7s ease 0.35s both' }}>
          {[{label:'Skills',val:`${SKILLS.length}`},{label:'Avg Proficiency',val:`${avgPct}%`},{label:'Top Skill',val:'Problem Solving'},{label:'Currently',val:'Learning React and Python'}].map((s,i)=>(
            <div key={i} style={{ background:isLight?'#fff':'#0d0d0d', border:'1px solid rgba(255,90,0,0.18)', borderRadius:'12px', padding:'clamp(0.6rem,1.5vw,0.9rem) clamp(1rem,2.5vw,1.5rem)', textAlign:'center', minWidth:'120px', boxShadow:isLight?'0 3px 12px rgba(0,0,0,0.07)':'none' }}>
              <div style={{ fontFamily:"'Fira Code',monospace", fontSize:'clamp(1.1rem,2.5vw,1.4rem)', fontWeight:700, color:'#ff5a00' }}>{s.val}</div>
              <div style={{ fontSize:'clamp(0.65rem,1.2vw,0.78rem)', color:isLight?'#888':'#666', marginTop:'2px', fontWeight:600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="skills-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(300px,100%),1fr))', gap:'clamp(1.2rem,2.5vw,2rem)', maxWidth:'1200px', margin:'0 auto' }}>
        {SKILLS.map((s,i)=><SkillCard key={s.title} {...s} isLight={isLight} triggered={triggered} delay={`${0.1+i*0.1}s`}/>)}
      </div>
      <p style={{ textAlign:'center', marginTop:'clamp(2.5rem,5vw,4rem)', fontFamily:"'Fira Code',monospace", color:'rgba(255,90,0,0.4)', fontSize:'clamp(0.68rem,1.5vw,0.85rem)', letterSpacing:'3px', textTransform:'uppercase' }}></p>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION 4: PROJECTS
════════════════════════════════════════════════════════ */
const PROJECTS = [
  { emoji:'🎨', image:'/portfolio-preview.png', title:'Portfolio Website',   desc:'A responsive personal portfolio showcasing my work and skills using modern web technologies.',             tags:['HTML','CSS','JavaScript','React','Nodejs','MongoDB'],     btn1:{label:'Live Demo',    href:'#'}, btn2:{label:'GitHub',     href:'https://github.com/somnathhake09/My-Portfolio'} },
  { emoji:'🏰', image:'/shivaji-maharaj-website.png', title:'Chhatrapati Shivaji Maharaj Historical Website', desc:'A fully responsive historical website showcasing the life, legacy, forts, and Swarajya journey of Chhatrapati Shivaji Maharaj with modern UI and Marathi support.', tags:['HTML','CSS','JavaScript','Responsive Design','UI/UX','AI-Assisted Development'], btn1:{label:'Live Demo',href:'https://somnathhake09.github.io/Ch-Shivaji-Maharaj-/'}, btn2:{label:'GitHub',href:'https://github.com/somnathhake09/Ch-Shivaji-Maharaj-'} }//   { emoji:'🤖', image:'\ai-chatbot.png', title:'AI Chatbot',          desc:'Built an intelligent chatbot using Python and natural language processing for customer support.',           tags:['Python','NLP','AI'],            btn1:{label:'Try It',      href:'#'}, btn2:{label:'GitHub',     href:'#'} },
//   { emoji:'🛒', image:'\e-commerce-platform.png', title:'E-Commerce Platform', desc:'Full-stack e-commerce website with payment integration, admin panel, and inventory management.',           tags:['React','Node.js','MongoDB'],    btn1:{label:'Live Demo',   href:'#'}, btn2:{label:'GitHub',     href:'#'} },
//   { emoji:'📊', image:'\data-visualization.png', title:'Data Visualization',  desc:'Interactive dashboard for analyzing and visualizing complex datasets with real-time updates.',             tags:['D3.js','React','API'],          btn1:{label:'View Demo',   href:'#'}, btn2:{label:'GitHub',     href:'#'} },
//   { emoji:'🎮', image:'\game-development.png', title:'Game Development',    desc:'2D platformer game built with Unity featuring custom physics, animations, and level design.',              tags:['Unity','C#','Game Design'],     btn1:{label:'Play Now',    href:'#'}, btn2:{label:'GitHub',     href:'#'} },
];
const FILTER_MAP = { 'All':()=>true, 'React':p=>p.tags.includes('React'), 'Python':p=>p.tags.includes('Python'), 'JavaScript':p=>p.tags.includes('JavaScript'), 'AI':p=>p.tags.includes('AI') };

function FilterBar({ active, onChange, isLight }) {
  return (
    <div style={{ display:'flex', flexWrap:'wrap', gap:'0.6rem', justifyContent:'center', marginBottom:'clamp(2rem,4vw,3rem)', animation:'fadeInUp 0.7s ease 0.3s both' }}>
      {Object.keys(FILTER_MAP).map(f=>(
        <button key={f} onClick={()=>onChange(f)} style={{ padding:'0.45rem clamp(0.9rem,2vw,1.3rem)', borderRadius:'50px', border:'2px solid', borderColor:active===f?'#ff5a00':`rgba(255,90,0,${isLight?'0.25':'0.3'})`, background:active===f?'linear-gradient(135deg,#ff5a00,#ff7a00)':(isLight?'#fff':'#0a0a0a'), color:active===f?'#fff':(isLight?'#555':'#aaa'), fontWeight:700, fontSize:'clamp(0.75rem,1.5vw,0.88rem)', cursor:'pointer', transition:'all 0.25s ease', fontFamily:"'Outfit',sans-serif", boxShadow:active===f?'0 4px 16px rgba(255,90,0,0.4)':'none' }}>
          {f}
        </button>
      ))}
    </div>
  );
}

function ProjectCard({ emoji, image, title, desc, tags, btn1, btn2, isLight, delay }) {
  const [hov,setHov]=useState(false);
  const gradients=['linear-gradient(135deg,#ff5a00,#ff8800)','linear-gradient(135deg,#ff3a00,#ff6a00,#ffaa00)','linear-gradient(135deg,#ff6a00,#ff9500)','linear-gradient(135deg,#ff4500,#ff7a00)','linear-gradient(135deg,#ff5a00,#ffaa00)','linear-gradient(135deg,#ff3000,#ff6500)'];
  const grad=gradients[Math.abs(title.length)%gradients.length];
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ background:isLight?'#fff':'#0a0a0a', borderRadius:'16px', overflow:'hidden', border:`1px solid ${hov?'#ff5a00':'rgba(255,90,0,0.15)'}`, boxShadow:hov?'0 20px 55px rgba(255,90,0,0.35)':isLight?'0 6px 24px rgba(0,0,0,0.1)':'0 6px 24px rgba(0,0,0,0.5)', transform:hov?'translateY(-10px)':'translateY(0)', transition:'all 0.35s ease', display:'flex', flexDirection:'column', animation:`cardReveal 0.6s ease ${delay} both` }}>
      <div style={{ width:'100%', height:'clamp(160px,20vw,210px)', background:image?'#111':grad, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'clamp(3rem,6vw,4.5rem)', transition:'transform 0.4s ease', transform:hov?'scale(1.04)':'scale(1)', position:'relative', overflow:'hidden', flexShrink:0 }}>
        {image
          ? <img src={image} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', opacity:hov?1:0.85, transition:'opacity 0.3s ease' }}/>
          : <>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.15) 50%,transparent 60%)', backgroundSize:'200% 100%', animation:'shimmer 2.5s linear infinite' }}/>
              <span style={{ zIndex:1 }}>{emoji}</span>
            </>
        }
        <div style={{ position:'absolute', top:'10px', right:'10px', background:'rgba(0,0,0,0.35)', backdropFilter:'blur(6px)', borderRadius:'6px', padding:'3px 8px', fontFamily:"'Fira Code',monospace", fontSize:'0.65rem', color:'rgba(255,255,255,0.9)', letterSpacing:'1px' }}>// project</div>
      </div>
      <div style={{ padding:'clamp(1rem,2.5vw,1.5rem)', display:'flex', flexDirection:'column', flex:1 }}>
        <h3 style={{ fontFamily:"'Outfit',sans-serif", fontSize:'clamp(1.1rem,2.5vw,1.4rem)', fontWeight:700, marginBottom:'0.5rem', background:grad, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{title}</h3>
        <p style={{ color:isLight?'#666':'#999', fontSize:'clamp(0.82rem,1.5vw,0.95rem)', lineHeight:1.7, marginBottom:'1rem', flex:1 }}>{desc}</p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem', marginBottom:'1.1rem' }}>
          {tags.map((t,i)=><span key={t} style={{ background:`rgba(255,90,0,${isLight?'0.08':'0.12'})`, color:isLight?'#cc3a00':'#ff7a30', padding:'0.25rem 0.7rem', borderRadius:'20px', fontSize:'clamp(0.72rem,1.2vw,0.82rem)', border:'1px solid rgba(255,90,0,0.25)', fontFamily:"'Fira Code',monospace", fontWeight:600, animation:`tagPop 0.4s ease ${0.05*i}s both` }}>{t}</span>)}
        </div>
        <div className="project-links-row" style={{ display:'flex', gap:'0.75rem' }}>
          <ProjBtn label={btn1.label} href={btn1.href} isLight={isLight} primary/>
          <ProjBtn label={btn2.label} href={btn2.href} isLight={isLight}/>
        </div>
      </div>
    </div>
  );
}

function ProjBtn({ label, href, isLight, primary }) {
  const [hov,setHov]=useState(false);
  return (
    <a href={href} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ flex:1, padding:'clamp(0.5rem,1.5vw,0.7rem)', textAlign:'center', borderRadius:'8px', textDecoration:'none', fontWeight:700, fontSize:'clamp(0.78rem,1.4vw,0.9rem)', fontFamily:"'Outfit',sans-serif", transition:'all 0.3s ease', border:'2px solid #ff5a00', background:hov?'linear-gradient(135deg,#ff5a00,#ff7a00)':(primary?'rgba(255,90,0,0.08)':'transparent'), color:hov?'#fff':(isLight?'#cc3a00':'#ff5a00'), borderColor:hov?'transparent':'#ff5a00', transform:hov?'translateY(-2px)':'none', boxShadow:hov?'0 6px 18px rgba(255,90,0,0.4)':'none', whiteSpace:'nowrap' }}>
      {label}
    </a>
  );
}

function ProjectsSection({ isLight }) {
  const [filter,setFilter]=useState('All'); const [visible,setVisible]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting) setVisible(true); },{threshold:0.1});
    if(ref.current) obs.observe(ref.current);
    return()=>obs.disconnect();
  },[]);
  const filtered=PROJECTS.filter(FILTER_MAP[filter]||(() =>true));
  return (
    <section id="projects" ref={ref} style={{ minHeight:'100vh', padding:'clamp(6rem,12vw,9rem) clamp(1rem,5vw,5%) clamp(3rem,6vw,5rem)', position:'relative', opacity:visible?1:0, transform:visible?'translateY(0)':' translateY(60px)', transition:'opacity 0.8s ease, transform 0.8s ease' }}>
      <div style={{ textAlign:'center', marginBottom:'clamp(2rem,4vw,3.5rem)' }}>
        <p style={{ fontFamily:"'Fira Code',monospace", color:'#ff5a00', fontSize:'clamp(0.68rem,1.5vw,0.85rem)', letterSpacing:'3px', textTransform:'uppercase', marginBottom:'0.6rem', animation:visible?'fadeInUp 0.7s ease 0.1s both':'none', opacity:visible?undefined:0 }}></p>
        <h2 style={{ display:'inline-block', fontFamily:"'Outfit',sans-serif", fontSize:'clamp(1.8rem,5vw,2.8rem)', fontWeight:800, background:'linear-gradient(135deg,#ff5a00,#ff8800)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', position:'relative', paddingBottom:'18px', animation:visible?'fadeInUp 0.7s ease 0.2s both':'none', opacity:visible?undefined:0 }}>
          My Projects
          <span style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', width:'clamp(50px,8vw,80px)', height:'4px', background:'linear-gradient(135deg,#ff5a00,#ff8800)', borderRadius:'2px', display:'block' }}/>
        </h2>
        <p style={{ marginTop:'clamp(1.5rem,3vw,2rem)', color:isLight?'#666':'#888', fontSize:'clamp(0.88rem,1.8vw,1.05rem)', maxWidth:'560px', margin:'clamp(1.5rem,3vw,2rem) auto 0', lineHeight:1.7, animation:visible?'fadeInUp 0.7s ease 0.3s both':'none', opacity:visible?undefined:0 }}>
          A selection of things I've built — from web apps to games, each one a learning adventure.
        </p>
      </div>
      {visible && <FilterBar active={filter} onChange={setFilter} isLight={isLight}/>}
      <div className="projects-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(320px,100%),1fr))', gap:'clamp(1.2rem,2.5vw,2rem)', maxWidth:'1200px', margin:'0 auto' }}>
        {filtered.map((p,i)=><ProjectCard key={p.title} {...p} isLight={isLight} delay={`${i*0.1}s`}/>)}
      </div>
      {filtered.length===0 && <div style={{ textAlign:'center', padding:'4rem', color:isLight?'#999':'#555', fontFamily:"'Fira Code',monospace" }}>// no projects match this filter</div>}
      <p style={{ textAlign:'center', marginTop:'clamp(2.5rem,5vw,4rem)', fontFamily:"'Fira Code',monospace", color:'rgba(255,90,0,0.4)', fontSize:'clamp(0.68rem,1.5vw,0.85rem)', letterSpacing:'3px', textTransform:'uppercase' }}></p>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION 5: CONTACT
════════════════════════════════════════════════════════ */
const INFO_CARDS = [
  { icon:'📧', title:'Email',    value:'somnathhake09@gmail.com', link:'mailto:somnathhake09@gmail.com' },
  { icon:'📱', title:'Phone',    value:'+91 8767 75 0962',        link:'tel:+918767750962' },
  { icon:'📍', title:'Location', value:'Old Sangvi, Pune-411027, Maharashtra' },
];
const SOCIALS = [
  { href:'mailto:somnathhake09@gmail.com', title:'Email', icon:'✉' },
  { href:'https://www.linkedin.com/in/somnath-hake-09/', title:'LinkedIn', icon:'in' },
  { href:'https://github.com/somnathhake09', title:'GitHub', icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.111.82-.261.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.51 11.51 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg> },
  { href:'https://wa.me/918767750962?text=Hello%20I%20liked%20your%20portfolio.%20Can%20you%20create%20a%20website%20for%20me?', title:'WhatsApp', icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26C2.001 6.44 6.437 2.006 11.889 2.006c2.64 0 5.122 1.03 6.988 2.898A9.825 9.825 0 0 1 21.77 11.9c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg> },
  { href:'#', title:'Twitter/X', icon:'𝕏' },
];

function ContactCard({ icon, title, value, link, isLight, delay }) {
  const [hov,setHov]=useState(false);
  const inner=(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ background:isLight?'#fff':'#0a0a0a', padding:'clamp(1.3rem,3vw,2rem)', borderRadius:'14px', textAlign:'center', border:`1px solid ${hov?'#ff5a00':'rgba(255,90,0,0.15)'}`, boxShadow:hov?'0 18px 50px rgba(255,90,0,0.32)':isLight?'0 6px 24px rgba(0,0,0,0.09)':'0 6px 24px rgba(0,0,0,0.5)', transform:hov?'translateY(-8px)':'translateY(0)', transition:'all 0.32s ease', animation:`cardReveal 0.6s ease ${delay} both`, cursor:link?'pointer':'default', textDecoration:'none', display:'block', color:'inherit' }}>
      <div style={{ fontSize:'clamp(2rem,4vw,2.5rem)', marginBottom:'0.8rem' }}>{icon}</div>
      <h3 style={{ fontFamily:"'Outfit',sans-serif", fontSize:'clamp(1rem,2vw,1.25rem)', fontWeight:700, marginBottom:'0.4rem', background:'linear-gradient(135deg,#ff5a00,#ff8800)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{title}</h3>
      <p style={{ color:isLight?'#666':'#999', fontSize:'clamp(0.78rem,1.5vw,0.92rem)', lineHeight:1.5, wordBreak:'break-word' }}>{value}</p>
    </div>
  );
  return link ? <a href={link}>{inner}</a> : inner;
}

function FormField({ label, id, type='text', placeholder, value, onChange, required, isLight, textarea, error }) {
  const [focused,setFocused]=useState(false);
  const base={ width:'100%', padding:'clamp(0.75rem,2vw,1rem)', background:isLight?'#f0f0f0':'#060606', border:`2px solid ${error?'#ff3030':focused?'#ff5a00':'rgba(255,90,0,0.2)'}`, borderRadius:'10px', color:isLight?'#1a1a1a':'#fff', fontSize:'clamp(0.88rem,1.8vw,1rem)', fontFamily:"'Outfit',sans-serif", transition:'all 0.3s ease', outline:'none', boxShadow:focused?'0 0 18px rgba(255,90,0,0.28)':'none', resize:textarea?'vertical':undefined, minHeight:textarea?'clamp(120px,18vw,160px)':undefined };
  return (
    <div style={{ marginBottom:'clamp(1rem,2.5vw,1.5rem)' }}>
      <label htmlFor={id} style={{ display:'block', color:'#ff5a00', marginBottom:'0.45rem', fontWeight:700, fontSize:'clamp(0.82rem,1.5vw,0.95rem)', fontFamily:"'Outfit',sans-serif" }}>
        {label}{required && <span style={{ color:'#ff3030', marginLeft:'3px' }}>*</span>}
      </label>
      {textarea ? <textarea id={id} name={id} placeholder={placeholder} value={value} onChange={onChange} required={required} style={base} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}/> : <input id={id} name={id} type={type} placeholder={placeholder} value={value} onChange={onChange} required={required} style={base} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}/>}
      {error && <p style={{ color:'#ff3030', fontSize:'0.75rem', marginTop:'4px', fontFamily:"'Fira Code',monospace" }}>{error}</p>}
    </div>
  );
}

function SocialLink({ href, title, children, isLight, delay }) {
  const [hov,setHov]=useState(false);
  return (
    <a href={href} title={title} target="_blank" rel="noreferrer" onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ width:'clamp(48px,7vw,60px)', height:'clamp(48px,7vw,60px)', background:hov?'linear-gradient(135deg,#ff5a00,#ff8800)':(isLight?'#fff':'#0d0d0d'), borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:hov?'#fff':'#ff5a00', fontSize:'clamp(1.1rem,2.5vw,1.5rem)', textDecoration:'none', border:`2px solid ${hov?'transparent':'rgba(255,90,0,0.3)'}`, boxShadow:hov?'0 12px 35px rgba(255,90,0,0.5)':isLight?'0 4px 14px rgba(0,0,0,0.1)':'0 4px 14px rgba(0,0,0,0.4)', transform:hov?'translateY(-6px)':'translateY(0)', transition:'all 0.3s ease', animation:`cardReveal 0.6s ease ${delay} both` }}>
      {children}
    </a>
  );
}

function ContactSection({ isLight }) {
  const [visible,setVisible]=useState(false);
  const [form,setForm]=useState({name:'',email:'',subject:'',message:''});
  const [errors,setErrors]=useState({});
  const [status,setStatus]=useState('idle');
  const ref=useRef(null);

  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting) setVisible(true); },{threshold:0.08});
    if(ref.current) obs.observe(ref.current);
    return()=>obs.disconnect();
  },[]);

  const validate=()=>{ const e={}; if(!form.name.trim()) e.name='// name is required'; if(!form.email.trim()) e.email='// email is required'; else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email='// invalid email format'; if(!form.message.trim()) e.message='// message is required'; return e; };
  const handleChange=e=>{ setForm(f=>({...f,[e.target.name]:e.target.value})); if(errors[e.target.name]) setErrors(err=>({...err,[e.target.name]:undefined})); };
  const handleSubmit=e=>{ e.preventDefault(); const errs=validate(); if(Object.keys(errs).length){ setErrors(errs); return; } setStatus('sending'); setTimeout(()=>{ setStatus('success'); setForm({name:'',email:'',subject:'',message:''}); setTimeout(()=>setStatus('idle'),4000); },1800); };

  return (
    <section id="contact" ref={ref} style={{ minHeight:'100vh', padding:'clamp(6rem,12vw,9rem) clamp(1rem,5vw,5%) clamp(3rem,6vw,5rem)', position:'relative', opacity:visible?1:0, transform:visible?'translateY(0)':' translateY(60px)', transition:'opacity 0.8s ease, transform 0.8s ease' }}>
      <div style={{ textAlign:'center', marginBottom:'clamp(2rem,4vw,3.5rem)' }}>
        <p style={{ fontFamily:"'Fira Code',monospace", color:'#ff5a00', fontSize:'clamp(0.68rem,1.5vw,0.85rem)', letterSpacing:'3px', textTransform:'uppercase', marginBottom:'0.6rem', animation:visible?'fadeInUp 0.7s ease 0.1s both':'none', opacity:visible?undefined:0 }}></p>
        <h2 style={{ display:'inline-block', fontFamily:"'Outfit',sans-serif", fontSize:'clamp(1.8rem,5vw,2.8rem)', fontWeight:800, background:'linear-gradient(135deg,#ff5a00,#ff8800)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', position:'relative', paddingBottom:'18px', animation:visible?'fadeInUp 0.7s ease 0.2s both':'none', opacity:visible?undefined:0 }}>
          Get In Touch
          <span style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', width:'clamp(50px,8vw,80px)', height:'4px', background:'linear-gradient(135deg,#ff5a00,#ff8800)', borderRadius:'2px', display:'block' }}/>
        </h2>
        <p style={{ marginTop:'clamp(1.5rem,3vw,2rem)', color:isLight?'#666':'#888', fontSize:'clamp(0.88rem,1.8vw,1.05rem)', maxWidth:'560px', margin:'clamp(1.5rem,3vw,2rem) auto 0', lineHeight:1.7, animation:visible?'fadeInUp 0.7s ease 0.3s both':'none', opacity:visible?undefined:0 }}>
          I'm always open to new opportunities and collaborations. Feel free to reach out!
        </p>
      </div>

      <div className="contact-info-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'clamp(1rem,2.5vw,1.8rem)', maxWidth:'1000px', margin:'0 auto clamp(2rem,4vw,3rem)', animation:visible?'fadeInUp 0.7s ease 0.35s both':'none', opacity:visible?undefined:0 }}>
        {INFO_CARDS.map((c,i)=><ContactCard key={c.title} {...c} isLight={isLight} delay={`${0.1+i*0.1}s`}/>)}
      </div>

      <div className="contact-main-grid" style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr', gap:'clamp(1.5rem,3vw,2.5rem)', maxWidth:'1000px', margin:'0 auto' }}>
        <div style={{ animation:visible?'fadeInLeft 0.8s ease 0.4s both':'none', opacity:visible?undefined:0 }}>
          <div className="contact-form-inner" style={{ background:isLight?'#fff':'#0a0a0a', padding:'clamp(1.5rem,4vw,2.5rem)', borderRadius:'18px', border:'1px solid rgba(255,90,0,0.12)', boxShadow:isLight?'0 8px 40px rgba(0,0,0,0.1)':'0 8px 40px rgba(0,0,0,0.5)' }}>
            <p style={{ fontFamily:"'Fira Code',monospace", color:'#ff5a00', fontSize:'0.75rem', letterSpacing:'2px', marginBottom:'1.2rem', opacity:0.7 }}>// send_message()</p>
            {status==='success' ? (
              <div style={{ textAlign:'center', padding:'2rem', animation:'successPop 0.5s ease both' }}>
                <div style={{ fontSize:'3.5rem', marginBottom:'1rem' }}>✅</div>
                <h3 style={{ fontFamily:"'Outfit',sans-serif", fontSize:'1.4rem', fontWeight:700, color:'#22cc66', marginBottom:'0.5rem' }}>Message Sent!</h3>
                <p style={{ color:isLight?'#555':'#888', fontSize:'0.95rem' }}>Thanks for reaching out. I'll get back to you soon!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 1rem' }}>
                  <FormField label="Name"    id="name"    placeholder="Somnath Hake"       value={form.name}    onChange={handleChange} required isLight={isLight} error={errors.name}/>
                  <FormField label="Email"   id="email"   type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required isLight={isLight} error={errors.email}/>
                </div>
                <FormField label="Subject"  id="subject"  placeholder="Project enquiry / collaboration" value={form.subject}  onChange={handleChange} isLight={isLight}/>
                <FormField label="Message"  id="message"  placeholder="Hello! I'd love to work together on..." value={form.message} onChange={handleChange} required isLight={isLight} textarea error={errors.message}/>
                <button type="submit" disabled={status==='sending'}
                  style={{ width:'100%', padding:'clamp(0.85rem,2vw,1.1rem) 2rem', background:status==='sending'?'rgba(255,90,0,0.5)':'linear-gradient(135deg,#ff5a00,#ff7a00)', color:'#fff', border:'none', borderRadius:'50px', fontSize:'clamp(0.92rem,2vw,1.05rem)', fontWeight:700, cursor:status==='sending'?'not-allowed':'pointer', transition:'all 0.3s ease', boxShadow:'0 8px 25px rgba(255,90,0,0.4)', fontFamily:"'Outfit',sans-serif", animation:status==='sending'?'sending 1s ease infinite':'none' }}
                  onMouseEnter={e=>{ if(status!=='sending'){ e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 14px 40px rgba(255,90,0,0.6)'; }}}
                  onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 8px 25px rgba(255,90,0,0.4)'; }}>
                  {status==='sending' ? '⏳  Sending...' : '🚀  Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:'clamp(1rem,2vw,1.5rem)', animation:visible?'fadeInRight 0.8s ease 0.5s both':'none', opacity:visible?undefined:0 }}>
          <div style={{ background:isLight?'#fff':'#0a0a0a', borderRadius:'14px', padding:'clamp(1rem,2.5vw,1.5rem)', border:'1px solid rgba(34,204,102,0.3)', boxShadow:isLight?'0 4px 18px rgba(0,0,0,0.08)':'none' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'0.6rem' }}>
              <span style={{ width:'10px', height:'10px', borderRadius:'50%', background:'#22cc66', boxShadow:'0 0 8px #22cc66', display:'inline-block', animation:'sending 1.5s ease infinite' }}/>
              <span style={{ fontFamily:"'Fira Code',monospace", color:'#22cc66', fontSize:'0.78rem', fontWeight:700, letterSpacing:'1px' }}>AVAILABLE FOR WORK</span>
            </div>
            <p style={{ color:isLight?'#555':'#888', fontSize:'clamp(0.78rem,1.4vw,0.88rem)', lineHeight:1.6 }}>Open to internships, freelance projects, and full-time opportunities.</p>
          </div>
          <div style={{ background:isLight?'#fff':'#0a0a0a', borderRadius:'14px', padding:'clamp(1rem,2.5vw,1.5rem)', border:'1px solid rgba(255,90,0,0.15)', boxShadow:isLight?'0 4px 18px rgba(0,0,0,0.08)':'none' }}>
            <h4 style={{ fontFamily:"'Fira Code',monospace", color:'#ff5a00', fontSize:'0.8rem', letterSpacing:'2px', textTransform:'uppercase', marginBottom:'0.7rem' }}>// response_time</h4>
            {[{ch:'📧',label:'Email',val:'< 24 hours'},{ch:'📱',label:'WhatsApp',val:'< 2 hours'},{ch:'💼',label:'LinkedIn',val:'< 24 hours'}].map(r=>(
              <div key={r.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0.4rem 0', borderBottom:'1px solid rgba(255,90,0,0.08)' }}>
                <span style={{ color:isLight?'#666':'#888', fontSize:'0.85rem' }}>{r.ch} {r.label}</span>
                <span style={{ fontFamily:"'Fira Code',monospace", color:'#ff5a00', fontSize:'0.78rem', fontWeight:700 }}>{r.val}</span>
              </div>
            ))}
          </div>
          <div style={{ background:isLight?'#fff':'#0a0a0a', borderRadius:'14px', padding:'clamp(1rem,2.5vw,1.5rem)', border:'1px solid rgba(255,90,0,0.15)', boxShadow:isLight?'0 4px 18px rgba(0,0,0,0.08)':'none' }}>
            <h4 style={{ fontFamily:"'Fira Code',monospace", color:'#ff5a00', fontSize:'0.8rem', letterSpacing:'2px', textTransform:'uppercase', marginBottom:'0.9rem' }}>// quick_links</h4>
            {[{label:'Download CV',href:'assets/resume.pdf',icon:'📄'},{label:'View Projects',href:'#projects',icon:'🚀'},{label:'See My Skills',href:'#skills',icon:'⚙️'}].map(l=>(
              <a key={l.label} href={l.href} style={{ display:'flex', alignItems:'center', gap:'8px', padding:'0.5rem 0', color:isLight?'#555':'#888', textDecoration:'none', fontSize:'0.88rem', transition:'all 0.2s', borderBottom:'1px solid rgba(255,90,0,0.07)' }}
                onMouseEnter={e=>{ e.currentTarget.style.color='#ff5a00'; e.currentTarget.style.paddingLeft='8px'; }}
                onMouseLeave={e=>{ e.currentTarget.style.color=isLight?'#555':'#888'; e.currentTarget.style.paddingLeft='0'; }}>
                <span>{l.icon}</span>{l.label}<span style={{ marginLeft:'auto', color:'#ff5a00', opacity:0.5 }}>→</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ textAlign:'center', marginTop:'clamp(2.5rem,5vw,4rem)', animation:visible?'fadeInUp 0.7s ease 0.6s both':'none', opacity:visible?undefined:0 }}>
        <h3 style={{ fontFamily:"'Outfit',sans-serif", fontSize:'clamp(1.1rem,2.5vw,1.5rem)', fontWeight:700, marginBottom:'clamp(1rem,2.5vw,1.5rem)', background:'linear-gradient(135deg,#ff5a00,#ff8800)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Connect With Me</h3>
        <div style={{ display:'flex', justifyContent:'center', gap:'clamp(0.8rem,2vw,1.5rem)', flexWrap:'wrap' }}>
          {SOCIALS.map((s,i)=><SocialLink key={s.title} href={s.href} title={s.title} isLight={isLight} delay={`${0.7+i*0.08}s`}>{s.icon}</SocialLink>)}
        </div>
      </div>
      <p style={{ textAlign:'center', marginTop:'clamp(2.5rem,5vw,4rem)', fontFamily:"'Fira Code',monospace", color:'rgba(255,90,0,0.4)', fontSize:'clamp(0.68rem,1.5vw,0.85rem)', letterSpacing:'3px', textTransform:'uppercase' }}></p>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   ROOT — wires everything together
════════════════════════════════════════════════════════ */
export default function PortfolioSPA() {
  const [isLight, setIsLight] = useState(()=>{ try { const v=localStorage.getItem('theme')==='light'; if(v) document.body.className='light-mode'; return v; } catch { return false; } });
  const [scrolled, setScrolled]         = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleTheme = useCallback(()=>{
    setIsLight(v=>{ const n=!v; try{localStorage.setItem('theme',n?'light':'dark');}catch{} document.body.className=n?'light-mode':''; return n; });
  },[]);

  /* Scroll tracking — updates navbar active link */
  useEffect(()=>{
    const sections = ['home','about','skills','projects','contact'];
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const scrollY = window.scrollY + window.innerHeight * 0.35;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollY) { setActiveSection(sections[i]); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive:true });
    return ()=>window.removeEventListener('scroll', onScroll);
  },[]);

  return (
    <>
      <style>{globalStyles}</style>
      <div style={{ fontFamily:"'Outfit',sans-serif", background:'transparent', color:isLight?'#1a1a1a':'#fff', transition:'background 0.5s ease, color 0.5s ease', minHeight:'100vh' }}>
        <BgAnimation isLight={isLight}/>
        <Navbar isLight={isLight} toggleTheme={toggleTheme} scrolled={scrolled} activeSection={activeSection}/>
        <HomeSection    isLight={isLight}/>
        <AboutSection   isLight={isLight}/>
        <SkillsSection  isLight={isLight}/>
        <ProjectsSection isLight={isLight}/>
        <ContactSection isLight={isLight}/>

        {/* ── SCROLL TO TOP BUTTON ── */}
        <button
          onClick={()=>window.scrollTo({ top:0, behavior:'smooth' })}
          title="Back to Top"
          style={{
            position:'fixed', bottom:'2rem', right:'2rem', zIndex:9999,
            width:'48px', height:'48px', borderRadius:'50%', border:'2px solid #ff5a00',
            background: scrolled ? 'linear-gradient(135deg,#ff5a00,#ff8800)' : 'transparent',
            color:'#fff', fontSize:'1.3rem', cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow: scrolled ? '0 4px 20px rgba(255,90,0,0.5)' : 'none',
            opacity: scrolled ? 1 : 0,
            transform: scrolled ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
            transition:'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
            pointerEvents: scrolled ? 'auto' : 'none',
          }}
        >
          ↑
        </button>
      </div>
    </>
  );
}