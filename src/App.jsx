/**
 * ╔══════════════════════════════════════════╗
 * ║      RMNDEV ARCADE PORTFOLIO v2.0        ║
 * ╠══════════════════════════════════════════╣
 * ║  SETUP:                                  ║
 * ║  npm install @supabase/supabase-js       ║
 * ║                                          ║
 * ║  SUPABASE TABLE SQL:                     ║
 * ║  ─────────────────────────────────────── ║
 * ║  create table projects (                 ║
 * ║    id uuid default gen_random_uuid()     ║
 * ║      primary key,                        ║
 * ║    title text not null,                  ║
 * ║    emoji text default '🎮',              ║
 * ║    level text default '01',              ║
 * ║    tagline text,                         ║
 * ║    description text,                     ║
 * ║    tech text[] default '{}',             ║
 * ║    color text default '#00ffcc',         ║
 * ║    difficulty text default 'MEDIUM',     ║
 * ║    status text default 'IN PROGRESS',    ║
 * ║    play_url text,                        ║
 * ║    github_url text,                      ║
 * ║    locked boolean default false,         ║
 * ║    sort_order integer default 0          ║
 * ║  );                                      ║
 * ║                                          ║
 * ║  Set in .env:                            ║
 * ║  VITE_SUPABASE_URL=...                   ║
 * ║  VITE_SUPABASE_ANON_KEY=...              ║
 * ╚══════════════════════════════════════════╝
 */

import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── SUPABASE CLIENT ─────────────────────────────────────────────────────────
const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL  || "";
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const supabase = SUPABASE_URL && SUPABASE_ANON
  ? createClient(SUPABASE_URL, SUPABASE_ANON)
  : null;

// ─── FALLBACK PROJECTS ───────────────────────────────────────────────────────
const FALLBACK_PROJECTS = [
  {
    id:"f1", title:"BOXHEAD: ZOMBIE ARENA", emoji:"🧟", level:"01",
    tagline:'"Survive waves of zombies"',
    description:"Top-down zombie survival game built with vanilla JS. Wave-based enemy spawning, scoring system, and retro pixel art.",
    tech:["HTML","CSS","JavaScript"], color:"#ff3333",
    difficulty:"EASY", status:"COMPLETE", locked:false, play_url:"", github_url:"", sort_order:0,
  },
  {
    id:"f2", title:"GROW-A-GARDEN CLONE", emoji:"🌱", level:"02",
    tagline:'"Roblox-inspired farming sim"',
    description:"HTML5 farming simulation inspired by Roblox's Grow-a-Garden. Plant, water, and harvest crops in a pixel world.",
    tech:["HTML5","JavaScript","Canvas"], color:"#00ff88",
    difficulty:"MEDIUM", status:"IN PROGRESS", locked:false, play_url:"", github_url:"", sort_order:1,
  },
  {
    id:"f3", title:"WEB PORTFOLIO", emoji:"🌐", level:"03",
    tagline:'"Your personal dev hub"',
    description:"Retro arcade-themed portfolio showcasing projects and skills. Built with React and Vite for blazing-fast performance.",
    tech:["React","Vite","Supabase"], color:"#00ffcc",
    difficulty:"HARD", status:"ACTIVE", locked:false, play_url:"", github_url:"", sort_order:2,
  },
  {
    id:"f4", title:"COMING SOON...", emoji:"❓", level:"??",
    tagline:'"?????  LOCKED  ?????"',
    description:"A mysterious project is in development. Stay tuned for the next level!",
    tech:["???"], color:"#555",
    difficulty:"???", status:"LOCKED", locked:true, play_url:"", github_url:"", sort_order:3,
  },
];

// ─── GLOBAL STYLES ───────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
    :root {
      --bg:#0a0a0a; --cyan:#00ffcc; --magenta:#ff00ff;
      --yellow:#ffff00; --red:#ff3333; --green:#00ff88;
      --white:#ffffff; --font:'Press Start 2P',monospace;
    }
    html,body { background:var(--bg); color:var(--white); font-family:var(--font); overflow-x:hidden; }

    /* CRT */
    .crt::before {
      content:''; position:fixed; inset:0; z-index:9999; pointer-events:none;
      background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.07) 2px,rgba(0,0,0,.07) 4px);
    }
    .crt::after {
      content:''; position:fixed; inset:0; z-index:9998; pointer-events:none;
      background:radial-gradient(ellipse at center,transparent 55%,rgba(0,0,0,.7) 100%);
    }

    /* Pixel cursor */
    * { cursor:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Crect width='4' height='4' fill='%2300ffcc'/%3E%3Crect x='4' y='4' width='4' height='4' fill='%2300ffcc'/%3E%3Crect x='8' y='8' width='4' height='4' fill='%2300ffcc'/%3E%3C/svg%3E") 0 0,crosshair; }

    /* Keyframes */
    @keyframes blink    { 0%,49%{opacity:1} 50%,100%{opacity:0} }
    @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
    @keyframes floatUp  { from{transform:translateY(10px);opacity:0} to{transform:translateY(0);opacity:1} }
    @keyframes glitch {
      0%,100%{text-shadow:0 0 10px var(--cyan),0 0 20px var(--cyan),0 0 40px var(--cyan)}
      25%{text-shadow:3px 0 10px var(--magenta),-3px 0 10px var(--cyan)}
      50%{text-shadow:-2px 0 10px var(--yellow),2px 0 10px var(--magenta)}
      75%{text-shadow:0 0 20px var(--cyan),4px 4px 20px var(--magenta)}
    }
    @keyframes marquee  { from{transform:translateX(100vw)} to{transform:translateX(-100%)} }
    @keyframes scrollBg { from{transform:translateY(0)} to{transform:translateY(-50%)} }
    @keyframes pulse    { 0%,100%{opacity:.5} 50%{opacity:1} }
    @keyframes shake    { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-4px)} 75%{transform:translateX(4px)} }
    @keyframes idle     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
    @keyframes charGlow {
      0%,100%{filter:drop-shadow(0 0 4px var(--magenta)) drop-shadow(0 0 8px var(--magenta))}
      50%{filter:drop-shadow(0 0 8px var(--cyan)) drop-shadow(0 0 16px var(--cyan))}
    }
    @keyframes shimmer  { 0%{background-position:-400px 0} 100%{background-position:400px 0} }

    .blink  { animation:blink 1s step-end infinite; }
    .glitch { animation:glitch 3s infinite; }
    .pulse  { animation:pulse 2s ease-in-out infinite; }

    /* Neon text */
    .neon-cyan    { color:var(--cyan);    text-shadow:0 0 8px var(--cyan),   0 0 20px var(--cyan); }
    .neon-magenta { color:var(--magenta); text-shadow:0 0 8px var(--magenta),0 0 20px var(--magenta); }
    .neon-yellow  { color:var(--yellow);  text-shadow:0 0 8px var(--yellow), 0 0 20px var(--yellow); }
    .neon-red     { color:var(--red);     text-shadow:0 0 8px var(--red),    0 0 20px var(--red); }
    .neon-green   { color:var(--green);   text-shadow:0 0 8px var(--green),  0 0 20px var(--green); }

    /* Borders */
    .pixel-border         { border:3px solid var(--cyan);    box-shadow:4px 4px 0 var(--magenta),0 0 18px rgba(0,255,204,.22); }
    .pixel-border-yellow  { border:3px solid var(--yellow);  box-shadow:4px 4px 0 var(--red),   0 0 18px rgba(255,255,0,.18); }
    .pixel-border-magenta { border:3px solid var(--magenta); box-shadow:4px 4px 0 var(--cyan),  0 0 18px rgba(255,0,255,.22); }

    /* Buttons */
    .arcade-btn {
      font-family:var(--font); font-size:10px; letter-spacing:1px;
      padding:12px 24px; background:transparent;
      border:3px solid var(--cyan); color:var(--cyan); text-shadow:0 0 8px var(--cyan);
      box-shadow:4px 4px 0 var(--magenta),0 0 12px rgba(0,255,204,.22);
      transition:all .1s; cursor:pointer;
    }
    .arcade-btn:hover  { transform:translate(-2px,-2px); box-shadow:6px 6px 0 var(--magenta),0 0 22px rgba(0,255,204,.45); }
    .arcade-btn:active { transform:translate(2px,2px);   box-shadow:2px 2px 0 var(--magenta); }
    .arcade-btn-yellow {
      font-family:var(--font); font-size:10px; padding:10px 20px; background:transparent;
      border:3px solid var(--yellow); color:var(--yellow); text-shadow:0 0 8px var(--yellow);
      box-shadow:4px 4px 0 var(--red),0 0 12px rgba(255,255,0,.18); transition:all .1s; cursor:pointer;
    }
    .arcade-btn-yellow:hover  { transform:translate(-2px,-2px); box-shadow:6px 6px 0 var(--red); }
    .arcade-btn-yellow:active { transform:translate(2px,2px); }
    .btn-sm {
      font-family:var(--font); font-size:7px; padding:7px 12px; background:transparent;
      border:2px solid var(--cyan); color:var(--cyan); text-shadow:0 0 6px var(--cyan);
      box-shadow:3px 3px 0 var(--magenta); transition:all .1s; cursor:pointer;
    }
    .btn-sm:hover  { transform:translate(-1px,-1px); box-shadow:4px 4px 0 var(--magenta); }
    .btn-sm:active { transform:translate(1px,1px); box-shadow:1px 1px 0 var(--magenta); }
    .btn-sm-y {
      font-family:var(--font); font-size:7px; padding:7px 12px; background:transparent;
      border:2px solid var(--yellow); color:var(--yellow); text-shadow:0 0 6px var(--yellow);
      box-shadow:3px 3px 0 var(--red); transition:all .1s; cursor:pointer;
    }
    .btn-sm-y:hover  { transform:translate(-1px,-1px); box-shadow:4px 4px 0 var(--red); }
    .btn-sm-y:active { transform:translate(1px,1px); }

    /* Inputs */
    .pixel-input {
      font-family:var(--font); font-size:9px; background:#111;
      border:2px solid var(--cyan); color:var(--cyan);
      padding:10px 14px; width:100%; outline:none;
      box-shadow:inset 0 0 10px rgba(0,255,204,.06); transition:box-shadow .2s;
    }
    .pixel-input:focus { box-shadow:inset 0 0 10px rgba(0,255,204,.15),0 0 12px rgba(0,255,204,.22); }
    .pixel-input::placeholder { color:#2a2a2a; }
    .pixel-textarea {
      font-family:var(--font); font-size:9px; background:#111;
      border:2px solid var(--cyan); color:var(--cyan);
      padding:10px 14px; width:100%; outline:none; resize:vertical; min-height:90px;
      box-shadow:inset 0 0 10px rgba(0,255,204,.06);
    }
    .pixel-textarea:focus { box-shadow:inset 0 0 10px rgba(0,255,204,.15),0 0 12px rgba(0,255,204,.22); }

    /* Stars */
    .stars-bg   { position:fixed; inset:0; overflow:hidden; z-index:0; pointer-events:none; }
    .stars-layer{ position:absolute; width:100%; height:200%; animation:scrollBg linear infinite; }

    /* Skeleton */
    .skeleton {
      background:linear-gradient(90deg,#111 25%,#1a1a1a 50%,#111 75%);
      background-size:800px 100%; animation:shimmer 1.4s infinite;
    }
  `}</style>
);

// ─── PIXEL CHARACTER SVG (16×16, perfect alignment) ──────────────────────────
const PixelChar = ({ size=80, primary="#ff00ff", secondary="#00ffcc", animated=true }) => {
  const S = size / 16; // pixel size
  // 0=transparent, 1=primary, 2=secondary, 3=dark
  const rows = [
    [0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],
    [0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,1,3,1,1,1,1,3,1,0,0,0,0],
    [0,0,0,0,1,1,2,1,1,2,1,1,0,0,0,0],
    [0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,1,2,2,2,2,1,0,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,1,2,1,1,1,1,1,1,1,1,2,1,0,0],
    [0,0,1,2,2,1,1,1,1,1,1,2,2,1,0,0],
    [0,0,1,1,1,2,2,2,2,2,2,1,1,1,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0],
    [0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0],
    [0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0],
    [0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0],
    [0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0],
  ];
  const colorOf = c => ({ 1:primary, 2:secondary, 3:"#050505" }[c]);
  return (
    <svg
      width={size} height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display:"block",
        imageRendering:"pixelated",
        animation: animated
          ? "idle 1.2s ease-in-out infinite, charGlow 2s ease-in-out infinite"
          : "none",
        overflow:"visible",
      }}
    >
      {rows.map((row,y) =>
        row.map((c,x) => c ? (
          <rect key={`${x}-${y}`}
            x={x*S} y={y*S} width={S} height={S}
            fill={colorOf(c)} />
        ) : null)
      )}
    </svg>
  );
};

// ─── MINI SPRITE (Home screen) ────────────────────────────────────────────────
const MiniSprite = ({ size=56 }) => {
  const S = size / 8;
  const rows = [
    [0,0,1,1,1,1,0,0],
    [0,1,1,2,2,1,1,0],
    [1,1,1,1,1,1,1,1],
    [1,2,1,1,1,1,2,1],
    [1,1,1,1,1,1,1,1],
    [0,1,0,1,1,0,1,0],
    [1,1,0,0,0,0,1,1],
    [1,0,0,0,0,0,0,1],
  ];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display:"block", imageRendering:"pixelated", filter:"drop-shadow(0 0 6px #00ffcc)" }}>
      {rows.map((row,y)=>row.map((c,x)=>c?(
        <rect key={`${x}-${y}`} x={x*S} y={y*S} width={S} height={S}
          fill={c===2?"#ff00ff":"#00ffcc"} />
      ):null))}
    </svg>
  );
};

// ─── STARS ───────────────────────────────────────────────────────────────────
const StarsBg = () => {
  const stars = Array.from({length:80},(_,i)=>({
    id:i, x:Math.random()*100, y:Math.random()*200,
    size:Math.random()*2+1, opacity:Math.random()*.6+.2,
  }));
  return (
    <div className="stars-bg">
      {[0,1].map(l=>(
        <div key={l} className="stars-layer" style={{animationDuration:`${40+l*20}s`}}>
          {stars.map(s=>(
            <div key={s.id} style={{
              position:"absolute",left:`${s.x}%`,top:`${s.y}%`,
              width:s.size,height:s.size,borderRadius:"50%",
              background:l===0?"#fff":"#00ffcc",opacity:s.opacity,
              boxShadow:l===1?`0 0 ${s.size*3}px #00ffcc`:"none",
            }}/>
          ))}
        </div>
      ))}
    </div>
  );
};

// ─── LOADING ──────────────────────────────────────────────────────────────────
const LoadingScreen = ({ onDone }) => {
  const [p, setP] = useState(0);
  const lines = ["> INITIALIZING ARCADE OS...","> LOADING PIXEL ASSETS...","> CALIBRATING JOYSTICK...","> BOOTING PORTFOLIO..."];
  useEffect(()=>{
    const t = setInterval(()=>setP(v=>{ if(v>=100){clearInterval(t);setTimeout(onDone,500);return 100;} return v+2; }),40);
    return()=>clearInterval(t);
  },[]);
  return (
    <div style={{position:"fixed",inset:0,background:"#0a0a0a",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:1000,gap:24,padding:32}}>
      <div className="neon-cyan glitch" style={{fontSize:"clamp(12px,3vw,22px)",letterSpacing:4,textAlign:"center"}}>ARCADE<br/>PORTFOLIO</div>
      <div style={{width:"100%",maxWidth:320,display:"flex",flexDirection:"column",gap:10}}>
        {lines.slice(0,Math.min(Math.floor(p/25)+1,4)).map((l,i,a)=>(
          <div key={i} style={{fontSize:7,color:i===a.length-1?"#00ffcc":"#2a2a2a",textShadow:i===a.length-1?"0 0 8px #00ffcc":"none"}}>{l}</div>
        ))}
      </div>
      <div style={{width:"100%",maxWidth:320}}>
        <div style={{fontSize:7,color:"#333",marginBottom:8}}>LOADING... {p}%</div>
        <div style={{height:16,background:"#111",border:"2px solid #1e1e1e",position:"relative",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${p}%`,background:"linear-gradient(90deg,#00ffcc,#ff00ff)",boxShadow:"0 0 12px #00ffcc",transition:"width .04s linear"}}/>
          <div style={{position:"absolute",top:0,bottom:0,width:3,left:`${p}%`,background:"#fff",boxShadow:"0 0 8px #fff",transform:"translateX(-50%)"}}/>
        </div>
      </div>
      <div className="blink" style={{fontSize:7,color:"#333"}}>PLEASE WAIT...</div>
    </div>
  );
};

// ─── SCANLINE BAR ─────────────────────────────────────────────────────────────
const RunScanline = ()=>(
  <div style={{position:"fixed",top:0,left:0,width:"100%",height:4,background:"linear-gradient(transparent,rgba(0,255,204,.1),transparent)",animation:"scanline 5s linear infinite",zIndex:9997,pointerEvents:"none"}}/>
);

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
const SECTIONS = ["HOME","ABOUT","SKILLS","PROJECTS","CONTACT"];
const NavBar = ({ active, onNav }) => (
  <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"rgba(10,10,10,.93)",backdropFilter:"blur(10px)",borderBottom:"2px solid #00ffcc",boxShadow:"0 2px 18px rgba(0,255,204,.15)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 24px",gap:12}}>
    <div className="neon-cyan" style={{fontSize:10,letterSpacing:2,whiteSpace:"nowrap"}}>▶ RMNDEV</div>
    <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
      {SECTIONS.map(s=>(
        <button key={s} onClick={()=>onNav(s)} style={{fontFamily:"var(--font)",fontSize:7,padding:"6px 10px",background:active===s?"var(--cyan)":"transparent",color:active===s?"#000":"#444",border:"1px solid",borderColor:active===s?"var(--cyan)":"#1e1e1e",cursor:"pointer",transition:"all .15s"}}
          onMouseEnter={e=>{if(active!==s){e.currentTarget.style.color="#00ffcc";e.currentTarget.style.borderColor="#00ffcc";}}}
          onMouseLeave={e=>{if(active!==s){e.currentTarget.style.color="#444";e.currentTarget.style.borderColor="#1e1e1e";}}}
        >{s}</button>
      ))}
    </div>
  </nav>
);

// ─── HOME ─────────────────────────────────────────────────────────────────────
const HomeSection = ({ onNav }) => {
  const [coins, setCoins] = useState(0);
  return (
    <section style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"80px 24px 40px",position:"relative",gap:28}}>
      <div style={{position:"absolute",top:88,right:24,fontSize:8,color:"#ffff00",textShadow:"0 0 8px #ffff00",display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
        <span>COINS</span>
        <span style={{fontSize:18,textShadow:"0 0 12px #ffff00"}}>{String(coins).padStart(2,"0")}</span>
        <button onClick={()=>setCoins(c=>c+1)} style={{fontFamily:"var(--font)",fontSize:7,background:"transparent",border:"1px solid #ffff00",color:"#ffff00",padding:"4px 8px",cursor:"pointer"}}>+COIN</button>
      </div>
      <div style={{fontSize:8,color:"#333",letterSpacing:2,animation:"pulse 2s ease-in-out infinite"}}>
        HI-SCORE &nbsp;<span className="neon-red">007420</span>
      </div>
      <div>
        <div className="glitch" style={{fontSize:"clamp(20px,5vw,52px)",lineHeight:1.3,color:"#00ffcc",textShadow:"0 0 10px #00ffcc,0 0 30px #00ffcc",letterSpacing:"clamp(2px,1vw,8px)"}}>
          RMNDEV<br/>ARCADE
        </div>
        <div style={{marginTop:14,fontSize:"clamp(8px,1.8vw,12px)",color:"#ff00ff",textShadow:"0 0 8px #ff00ff",letterSpacing:4}}>
          — INSERT COIN TO PLAY —
        </div>
      </div>
      {/* Mini sprite box — SVG centered perfectly */}
      <div style={{width:80,height:80,border:"3px solid #00ffcc",boxShadow:"4px 4px 0 #ff00ff,0 0 22px rgba(0,255,204,.32)",background:"#0d0d0d",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",flexShrink:0}}>
        <MiniSprite size={56}/>
        <div style={{position:"absolute",bottom:-8,right:-8,width:14,height:14,background:"#ff00ff",boxShadow:"0 0 8px #ff00ff"}}/>
      </div>
      <div className="blink" style={{fontSize:"clamp(10px,2vw,15px)",color:"#ffff00",textShadow:"0 0 10px #ffff00",letterSpacing:4}}>
        ▶ PRESS START ◀
      </div>
      <button className="arcade-btn" onClick={()=>onNav("ABOUT")} style={{fontSize:"clamp(8px,1.5vw,11px)"}}>[ START GAME ]</button>
      <div style={{position:"absolute",bottom:0,left:0,right:0,overflow:"hidden",fontSize:7,color:"#1e1e1e",borderTop:"1px solid #111",padding:"8px 0"}}>
        <span style={{display:"inline-block",whiteSpace:"nowrap",animation:"marquee 22s linear infinite"}}>
          ★ ARMAN DIZON ★ JUNIOR WEB DEVELOPER ★ PIXEL ENTHUSIAST ★ GAME BUILDER ★ FRONTEND DEV ★ REACT ★ SUPABASE ★ OPEN TO WORK &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
      </div>
    </section>
  );
};

// ─── ABOUT ────────────────────────────────────────────────────────────────────
const AboutSection = () => {
  const stats = [
    {label:"STR",val:72,color:"#ff3333"},
    {label:"INT",val:88,color:"#00ffcc"},
    {label:"DEX",val:65,color:"#ffff00"},
    {label:"CHA",val:80,color:"#ff00ff"},
  ];
  return (
    <section style={{padding:"100px 24px 60px",maxWidth:900,margin:"0 auto"}}>
      <div className="neon-yellow" style={{fontSize:10,letterSpacing:4,marginBottom:32,textAlign:"center"}}>─── CHARACTER SELECT ───</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:32}}>

        {/* ── Character card ── */}
        <div className="pixel-border" style={{padding:24,background:"#0d0d0d",position:"relative"}}>
          <div style={{fontSize:7,color:"#2a2a2a",marginBottom:16}}>
            PLAYER 1 &nbsp;<span className="blink" style={{color:"#00ffcc"}}>▌</span>
          </div>

          {/* Avatar container — flex center, fixed dimensions, SVG inside */}
          <div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            marginBottom:20,
          }}>
            <div style={{
              width:96,
              height:96,
              flexShrink:0,
              background:"#080808",
              border:"3px solid #ff00ff",
              boxShadow:"4px 4px 0 #00ffcc,0 0 20px rgba(255,0,255,.32)",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              overflow:"hidden",
            }}>
              {/* PixelChar is 72px inside a 96px box → 12px padding each side */}
              <PixelChar size={72} primary="#ff00ff" secondary="#00ffcc" animated={true}/>
            </div>
          </div>

          <div className="neon-cyan"    style={{fontSize:11,marginBottom:8,textAlign:"center"}}>ARMAN DIZON</div>
          <div className="neon-magenta" style={{fontSize:8, marginBottom:20,textAlign:"center"}}>JR. WEB DEVELOPER</div>

          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {[["CLASS","FRONTEND DEV"],["LEVEL","01"],["GUILD","IT GRADUATE"],["SERVER","PHILIPPINES 🇵🇭"]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:8}}>
                <span style={{color:"#333"}}>{k}:</span>
                <span className="neon-yellow">{v}</span>
              </div>
            ))}
          </div>

          <div style={{marginTop:20}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:7,color:"#333",marginBottom:5}}>
              <span>EXP</span><span className="neon-cyan">700/1000</span>
            </div>
            <div style={{height:10,background:"#111",border:"1px solid #1e1e1e"}}>
              <div style={{height:"100%",width:"70%",background:"linear-gradient(90deg,#00ffcc,#ff00ff)",boxShadow:"0 0 8px #00ffcc"}}/>
            </div>
          </div>

          <div style={{position:"absolute",top:10,right:10,fontSize:6,color:"#00ffcc",border:"1px solid #00ffcc",padding:"2px 5px"}}>NEW!</div>
        </div>

        {/* ── Bio + stats ── */}
        <div style={{display:"flex",flexDirection:"column",gap:20}}>
          <div className="pixel-border-yellow" style={{padding:20,background:"#0d0d0d"}}>
            <div className="neon-yellow" style={{fontSize:8,marginBottom:12}}>// BIO</div>
            <div style={{fontSize:8,color:"#777",lineHeight:2.4}}>
              IT graduate passionate about building web apps and game-style projects.
              Leveling up one commit at a time. Seeking to transform ideas into
              pixel-perfect, interactive experiences.
            </div>
          </div>

          <div className="pixel-border-magenta" style={{padding:20,background:"#0d0d0d"}}>
            <div className="neon-magenta" style={{fontSize:8,marginBottom:16}}>// BASE STATS</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              {stats.map(s=>(
                <div key={s.label}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:7,marginBottom:4}}>
                    <span style={{color:"#333"}}>{s.label}</span>
                    <span style={{color:s.color,textShadow:`0 0 6px ${s.color}`}}>{s.val}</span>
                  </div>
                  <div style={{height:8,background:"#111",border:"1px solid #1e1e1e"}}>
                    <div style={{height:"100%",width:`${s.val}%`,background:s.color,boxShadow:`0 0 5px ${s.color}`}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {["🎓 GRAD","💻 DEV","🎮 MAKER","🌐 WEB","⚡ FAST"].map(a=>(
              <div key={a} style={{fontSize:7,padding:"6px 10px",border:"1px solid #1e1e1e",color:"#333",background:"#0a0a0a"}}>{a}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── SKILLS ───────────────────────────────────────────────────────────────────
const SkillsSection = () => {
  const [hov, setHov] = useState(null);
  const groups = [
    {label:"FRONTEND",icon:"🎨",color:"#00ffcc",val:80,items:["HTML","CSS","JavaScript","React"]},
    {label:"BACKEND", icon:"⚙️",color:"#ff00ff",val:60,items:["Node.js","Express","REST API"]},
    {label:"DATABASE",icon:"🗄️",color:"#ffff00",val:55,items:["Supabase","Firebase","MySQL"]},
    {label:"TOOLS",   icon:"🔧",color:"#ff3333",val:72,items:["Git","GitHub","XAMPP","Vite"]},
  ];
  return (
    <section style={{padding:"100px 24px 60px",maxWidth:900,margin:"0 auto"}}>
      <div className="neon-cyan" style={{fontSize:10,letterSpacing:4,marginBottom:32,textAlign:"center"}}>─── SKILL TREE ───</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:18}}>
        {groups.map(g=>(
          <div key={g.label}
            onMouseEnter={()=>setHov(g.label)} onMouseLeave={()=>setHov(null)}
            style={{padding:18,background:"#0d0d0d",border:`2px solid ${hov===g.label?g.color:"#1a1a1a"}`,boxShadow:hov===g.label?`4px 4px 0 ${g.color}44,0 0 16px ${g.color}22`:"4px 4px 0 #111",transition:"all .18s",cursor:"default",transform:hov===g.label?"translate(-2px,-2px)":"none"}}>
            <div style={{fontSize:18,marginBottom:8}}>{g.icon}</div>
            <div style={{fontSize:9,color:g.color,textShadow:`0 0 8px ${g.color}`,marginBottom:12}}>{g.label}</div>
            <div style={{display:"flex",gap:3,marginBottom:10}}>
              {Array.from({length:10},(_,i)=>(
                <div key={i} style={{width:11,height:16,background:i<Math.round(g.val/10)?g.color:"#141414",border:`1px solid ${i<Math.round(g.val/10)?g.color:"#222"}`,boxShadow:i<Math.round(g.val/10)?`0 0 5px ${g.color}`:"none",transition:`all ${.05*i+.08}s`}}/>
              ))}
            </div>
            <div style={{fontSize:7,color:"#2a2a2a",marginBottom:hov===g.label?10:0}}>{g.val}/100</div>
            {hov===g.label&&(
              <div style={{display:"flex",flexDirection:"column",gap:4,animation:"floatUp .2s ease both"}}>
                {g.items.map(it=><div key={it} style={{fontSize:7,color:g.color,padding:"3px 6px",border:`1px solid ${g.color}22`,background:`${g.color}06`}}>▸ {it}</div>)}
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{marginTop:36}}>
        <div style={{fontSize:7,color:"#2a2a2a",marginBottom:14,textAlign:"center"}}>// TECH INVENTORY</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center"}}>
          {["HTML5","CSS3","JavaScript","React","Node.js","Supabase","Firebase","Git","GitHub","XAMPP","Vite","TailwindCSS"].map(t=>(
            <div key={t} style={{fontSize:7,padding:"6px 12px",background:"#0d0d0d",border:"1px solid #1a1a1a",color:"#444",transition:"all .15s",cursor:"default"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#00ffcc";e.currentTarget.style.color="#00ffcc";e.currentTarget.style.boxShadow="0 0 8px rgba(0,255,204,.2)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#1a1a1a";e.currentTarget.style.color="#444";e.currentTarget.style.boxShadow="none";}}
            >{t}</div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── PROJECTS (Supabase-powered) ──────────────────────────────────────────────
const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [selected, setSelected] = useState(null);
  const [live,     setLive]     = useState(false);

  useEffect(()=>{
    (async()=>{
      if(!supabase){
        setProjects(FALLBACK_PROJECTS); setLive(false); setLoading(false); return;
      }
      try {
        setLive(true);
        const {data,error:e} = await supabase
          .from("projects").select("*").order("sort_order",{ascending:true});
        if(e) throw e;
        setProjects(data?.length>0 ? data : FALLBACK_PROJECTS);
      } catch(err){
        setError(err.message);
        setProjects(FALLBACK_PROJECTS);
      } finally { setLoading(false); }
    })();
  },[]);

  const statusColor = s => ({COMPLETE:"#00ff88",ACTIVE:"#00ffcc","IN PROGRESS":"#ffff00",LOCKED:"#2a2a2a"}[s]||"#444");

  if(loading) return (
    <section style={{padding:"100px 24px 60px",maxWidth:1000,margin:"0 auto"}}>
      <div className="neon-magenta" style={{fontSize:10,letterSpacing:4,marginBottom:8,textAlign:"center"}}>─── LEVEL SELECT ───</div>
      <div style={{fontSize:8,color:"#444",marginBottom:32,textAlign:"center"}}><span className="blink">▶</span> FETCHING FROM DATABASE...</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:24}}>
        {[0,1,2,3].map(i=>(
          <div key={i} style={{background:"#0d0d0d",border:"2px solid #1a1a1a",overflow:"hidden"}}>
            <div className="skeleton" style={{height:32}}/>
            <div style={{padding:16}}>
              <div className="skeleton" style={{width:36,height:28,marginBottom:10,borderRadius:2}}/>
              <div className="skeleton" style={{width:"80%",height:9,marginBottom:8,borderRadius:2}}/>
              <div className="skeleton" style={{width:"55%",height:7,borderRadius:2}}/>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <section style={{padding:"100px 24px 60px",maxWidth:1000,margin:"0 auto"}}>
      <div className="neon-magenta" style={{fontSize:10,letterSpacing:4,marginBottom:8,textAlign:"center"}}>─── LEVEL SELECT ───</div>

      {/* DB status bar */}
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:10,marginBottom:28,flexWrap:"wrap"}}>
        <div style={{fontSize:7,color:"#333"}}>SELECT A PROJECT TO PLAY</div>
        <div style={{
          fontSize:6,padding:"3px 8px",
          border:`1px solid ${live&&!error?"#00ff88":"#222"}`,
          color:live&&!error?"#00ff88":"#333",
          boxShadow:live&&!error?"0 0 6px rgba(0,255,136,.18)":"none",
        }}>
          {live&&!error?"⬡ SUPABASE LIVE":error?"⬡ DB ERR → FALLBACK":"⬡ LOCAL DATA"}
        </div>
      </div>

      {error&&(
        <div style={{fontSize:7,color:"#ff3333",textAlign:"center",marginBottom:18,border:"1px solid #ff333318",padding:"8px 16px",background:"#ff33330a"}}>
          ⚠ {error.slice(0,72)}{error.length>72?"...":""} — USING FALLBACK
        </div>
      )}

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:24}}>
        {projects.map((p,idx)=>{
          const key = p.id??idx;
          const open = selected===key;
          return (
            <div key={key}
              onClick={()=>!p.locked&&setSelected(open?null:key)}
              style={{
                background:"#0d0d0d",
                cursor:p.locked?"not-allowed":"pointer",
                border:`2px solid ${open?p.color:"#1a1a1a"}`,
                boxShadow:open?`4px 4px 0 ${p.color}44,0 0 16px ${p.color}1a`:"4px 4px 0 #111",
                transition:"all .18s",
                opacity:p.locked?.4:1,
                transform:open?"translate(-2px,-2px)":"none",
              }}>
              {/* Top bar */}
              <div style={{background:open?p.color:"#0f0f0f",padding:"6px 12px",display:"flex",justifyContent:"space-between",fontSize:7}}>
                <span style={{color:open?"#000":"#2a2a2a"}}>LEVEL {p.level||String(idx+1).padStart(2,"0")}</span>
                <span style={{color:statusColor(p.status)}}>{p.status}</span>
              </div>
              <div style={{padding:16}}>
                <div style={{fontSize:24,marginBottom:8,lineHeight:1}}>{p.emoji}</div>
                <div style={{fontSize:9,color:p.color,textShadow:`0 0 8px ${p.color}`,marginBottom:6,lineHeight:1.6}}>{p.title}</div>
                <div style={{fontSize:7,color:"#333",marginBottom:12,fontStyle:"italic",lineHeight:1.6}}>{p.tagline}</div>
                {open&&(
                  <div style={{animation:"floatUp .25s ease both"}}>
                    <div style={{fontSize:7,color:"#666",lineHeight:2.2,marginBottom:12}}>{p.description||p.desc}</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:14}}>
                      {(p.tech||[]).map(t=><span key={t} style={{fontSize:6,padding:"3px 7px",border:`1px solid ${p.color}33`,color:p.color}}>{t}</span>)}
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      <button className="btn-sm-y" style={{flex:1}}
                        onClick={e=>{e.stopPropagation();p.play_url&&window.open(p.play_url,"_blank");}}>[ PLAY ]</button>
                      <button className="btn-sm" style={{flex:1}}
                        onClick={e=>{e.stopPropagation();p.github_url&&window.open(p.github_url,"_blank");}}>[ GITHUB ]</button>
                    </div>
                  </div>
                )}
                <div style={{display:"flex",justifyContent:"space-between",marginTop:12}}>
                  <span style={{fontSize:6,color:"#222"}}>DIFF: {p.difficulty}</span>
                  {!p.locked&&<span style={{fontSize:6,color:p.color}}>{open?"▲ CLOSE":"▼ INFO"}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!supabase&&(
        <div style={{marginTop:28,padding:"12px 18px",border:"1px dashed #1a1a1a",background:"#060606",fontSize:7,color:"#2a2a2a",lineHeight:2.2,textAlign:"center"}}>
          // ENABLE LIVE DATA: add <span style={{color:"#00ffcc"}}>VITE_SUPABASE_URL</span> &amp; <span style={{color:"#00ffcc"}}>VITE_SUPABASE_ANON_KEY</span> to .env<br/>
          // then create the <span style={{color:"#ff00ff"}}>projects</span> table — SQL schema at top of file
        </div>
      )}
    </section>
  );
};

// ─── CONTACT ─────────────────────────────────────────────────────────────────
const ContactSection = () => {
  const [form,  setForm]  = useState({name:"",email:"",message:""});
  const [status,setStatus]= useState(null);
  const [typed, setTyped] = useState("");
  useEffect(()=>{
    if(status!=="sent")return;
    const msg="MESSAGE SENT SUCCESSFULLY!"; let i=0; setTyped("");
    const t=setInterval(()=>{i++;setTyped(msg.slice(0,i));if(i>=msg.length)clearInterval(t);},55);
    return()=>clearInterval(t);
  },[status]);
  const submit=()=>{ if(!form.name||!form.email||!form.message){setStatus("error");return;} setStatus("sending"); setTimeout(()=>setStatus("sent"),1500); };
  return (
    <section style={{padding:"100px 24px 60px",maxWidth:700,margin:"0 auto"}}>
      <div className="neon-cyan" style={{fontSize:10,letterSpacing:4,marginBottom:32,textAlign:"center"}}>─── TERMINAL COMM ───</div>
      <div style={{background:"#050505",border:"2px solid #00ffcc",boxShadow:"4px 4px 0 #ff00ff,0 0 26px rgba(0,255,204,.15)"}}>
        <div style={{background:"#00ffcc",padding:"6px 12px",display:"flex",gap:6,alignItems:"center"}}>
          {["#ff3333","#ffff00","#00ff88"].map(c=><div key={c} style={{width:10,height:10,background:c,boxShadow:`0 0 6px ${c}`}}/>)}
          <span style={{fontSize:7,color:"#000",marginLeft:8,fontFamily:"var(--font)"}}>CONTACT_TERMINAL v2.0</span>
        </div>
        <div style={{padding:24}}>
          {["> ESTABLISHING CONNECTION...","> CONNECTION ESTABLISHED ✓","> ENTER TRANSMISSION DATA BELOW:"].map((l,i)=>(
            <div key={i} style={{fontSize:7,color:"#222",marginBottom:5,lineHeight:1.8}}>{l}</div>
          ))}
          <div style={{marginTop:20,display:"flex",flexDirection:"column",gap:16}}>
            {[{k:"name",label:"// CALLSIGN (NAME)",type:"text",ph:"ENTER NAME..."},{k:"email",label:"// FREQUENCY (EMAIL)",type:"email",ph:"ENTER EMAIL..."}].map(f=>(
              <div key={f.k}>
                <div style={{fontSize:7,color:"#00ffcc",marginBottom:6}}>{f.label}</div>
                <input className="pixel-input" type={f.type} placeholder={f.ph} value={form[f.k]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))}/>
              </div>
            ))}
            <div>
              <div style={{fontSize:7,color:"#00ffcc",marginBottom:6}}>// MESSAGE PAYLOAD</div>
              <textarea className="pixel-textarea" placeholder="> TYPE YOUR MESSAGE HERE..." value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))}/>
            </div>
            {status==="error"   && <div className="neon-red"   style={{fontSize:7,animation:"shake .3s ease"}}>✗ ERROR: ALL FIELDS REQUIRED. RETRY.</div>}
            {status==="sending" && <div className="neon-yellow" style={{fontSize:7}}><span className="blink">▶</span> TRANSMITTING...</div>}
            {status==="sent"    && <div className="neon-green"  style={{fontSize:7}}>✓ {typed}<span className="blink">_</span></div>}
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <button className="arcade-btn" onClick={submit} style={{flex:1,minWidth:140}}>[ SEND MESSAGE ]</button>
              <button className="arcade-btn-yellow" onClick={()=>{setForm({name:"",email:"",message:""});setStatus(null);}} style={{flex:1,minWidth:100}}>[ CLEAR ]</button>
            </div>
          </div>
          <div style={{marginTop:24,paddingTop:16,borderTop:"1px solid #0f0f0f",display:"flex",gap:10,flexWrap:"wrap"}}>
            {[{l:"GITHUB",i:"⌨"},{l:"LINKEDIN",i:"💼"},{l:"EMAIL",i:"📧"}].map(s=>(
              <button key={s.l} style={{fontFamily:"var(--font)",fontSize:7,padding:"6px 12px",background:"transparent",border:"1px solid #1a1a1a",color:"#333",cursor:"pointer",transition:"all .15s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="#ff00ff";e.currentTarget.style.color="#ff00ff";e.currentTarget.style.boxShadow="0 0 10px rgba(255,0,255,.2)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="#1a1a1a";e.currentTarget.style.color="#333";e.currentTarget.style.boxShadow="none";}}
              >{s.i} {s.l}</button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = ()=>(
  <footer style={{padding:24,textAlign:"center",borderTop:"1px solid #0f0f0f",fontSize:7,color:"#1a1a1a",display:"flex",flexDirection:"column",gap:8}}>
    <div>© 2025 ARMAN DIZON | RMNDEV ARCADE</div>
    <div>MADE WITH ♥ + LOTS OF COINS + SUPABASE</div>
    <div className="blink" style={{color:"#222"}}>— GAME OVER? NEVER —</div>
  </footer>
);

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [loading,setLoading] = useState(true);
  const [active, setActive]  = useState("HOME");
  const homeRef=useRef(), aboutRef=useRef(), skillsRef=useRef(), projectsRef=useRef(), contactRef=useRef();
  const rmap = {HOME:homeRef,ABOUT:aboutRef,SKILLS:skillsRef,PROJECTS:projectsRef,CONTACT:contactRef};

  const navTo = s => { setActive(s); rmap[s]?.current?.scrollIntoView({behavior:"smooth",block:"start"}); };

  useEffect(()=>{
    const fn=()=>{
      const y=window.scrollY+130; let cur="HOME";
      Object.entries(rmap).forEach(([k,r])=>{ if(r.current&&r.current.offsetTop<=y) cur=k; });
      setActive(cur);
    };
    window.addEventListener("scroll",fn);
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  if(loading) return <div className="crt"><GlobalStyles/><LoadingScreen onDone={()=>setLoading(false)}/></div>;

  return (
    <div className="crt" style={{position:"relative",minHeight:"100vh"}}>
      <GlobalStyles/>
      <StarsBg/>
      <RunScanline/>
      <NavBar active={active} onNav={navTo}/>
      <main style={{position:"relative",zIndex:1}}>
        <div ref={homeRef}><HomeSection onNav={navTo}/></div>
        <div ref={aboutRef}><AboutSection/></div>
        <div ref={skillsRef}><SkillsSection/></div>
        <div ref={projectsRef}><ProjectsSection/></div>
        <div ref={contactRef}><ContactSection/></div>
      </main>
      <Footer/>
    </div>
  );
}
