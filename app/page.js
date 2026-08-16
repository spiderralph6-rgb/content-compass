'use client';

import { useState } from 'react';

const week = [
  ['MON','Authority','Reel','3 reasons your social media isn’t growing.'],
  ['TUE','Education','Carousel','Stop asking: What should I post?'],
  ['WED','Engagement','Conversation','What’s your biggest social media struggle?'],
  ['THU','Trust','Reel','Show how you plan a week of content.'],
  ['FRI','Leads','Post','Teach one solution and invite people to contact you.'],
  ['SAT','Personality','Story','Do you plan ahead or wing it?'],
  ['SUN','Repurpose','Carousel','Turn your best post into three new ideas.'],
];

const instant = {
  goal:'Build authority', format:'30-second Reel',
  hook:'You’re probably making social media harder than it needs to be.',
  script:'Before you create your next post, decide three things: who you are speaking to, what problem you are solving, and what you want the viewer to do next. Clear strategy makes content easier.',
  shot:'Film a clean talking-head video. Put each of the three questions on screen as you mention it.',
  caption:'Posting more isn’t always the answer. Before your next post ask: Who am I talking to? What problem am I solving? What should they do next? Clear strategy makes content much easier.',
  cta:'Save this before planning your next post.'
};

export default function Home(){
  const [screen,setScreen]=useState('home');
  const [saved,setSaved]=useState(false);
  const [toast,setToast]=useState('');
  const copy=async(text)=>{try{await navigator.clipboard.writeText(text);setToast('Copied to clipboard ✓');setTimeout(()=>setToast(''),1800)}catch{setToast('Ready to copy');}};
  return <main className="shell">
    <header><div className="brand"><span className="logo">✦</span><div><b>CONTENT COMPASS</b><small>Never wonder what to post again.</small></div></div><button className="avatar">RS</button></header>
    {screen==='home' && <>
      <section className="hero"><span className="eyebrow">YOUR CONTENT CO-PILOT</span><h1>What will you<br/><em>create today?</em></h1><p>Turn your strategy into content people actually want to see.</p></section>
      <button className="action primary" onClick={()=>setScreen('post')}><span>⚡</span><div><b>I NEED SOMETHING TO POST NOW</b><small>Get a complete ready-to-create post</small></div><i>›</i></button>
      <button className="action secondary" onClick={()=>setScreen('week')}><span>✦</span><div><b>CREATE MY WEEK</b><small>Plan 7 days in one tap</small></div><i>›</i></button>
      <h3 className="sectionTitle">YOUR WORKSPACE</h3>
      <div className="grid">
        <button onClick={()=>setScreen('week')}><span>▦</span><b>Content Calendar</b><small>7 posts planned</small></button>
        <button onClick={()=>setScreen('ideas')}><span>💡</span><b>Idea Bank</b><small>{saved?'1 saved idea':'Save inspiration'}</small></button>
        <button onClick={()=>setScreen('pillars')}><span>◎</span><b>Content Pillars</b><small>Shape your strategy</small></button>
        <button><span>◒</span><b>Content Mix</b><small>Keep it balanced</small></button>
      </div>
      <section className="tip"><span>COMPASS TIP</span><p>Consistency beats intensity. One useful post today is better than seven rushed posts next month.</p></section>
    </>}
    {screen==='post' && <Page title="Today's Content" back={()=>setScreen('home')}>
      <div className="chips"><span>🎯 {instant.goal}</span><span>📱 {instant.format}</span></div>
      <Card label="HOOK" text={instant.hook}/><Card label="SCRIPT" text={instant.script}/><Card label="SHOT LIST" text={instant.shot}/><Card label="CAPTION" text={instant.caption}/><Card label="CTA" text={instant.cta}/>
      <div className="buttonRow"><button onClick={()=>copy(instant.caption)}>📋 Copy Caption</button><button onClick={()=>setSaved(true)}>💾 {saved?'Saved':'Save'}</button></div>
      <button className="wide" onClick={()=>setScreen('week')}>♻ Repurpose into my week</button>
    </Page>}
    {screen==='week' && <Page title="My Content Week" back={()=>setScreen('home')}><p className="intro">A balanced week designed to build authority, trust and engagement.</p><div className="week">{week.map((d,i)=><article key={d[0]}><div className="day"><b>{d[0]}</b><span>0{i+1}</span></div><div><small>{d[1]} · {d[2]}</small><h3>{d[3]}</h3></div><i>›</i></article>)}</div><button className="wide" onClick={()=>setScreen('post')}>⚡ Create today's post</button></Page>}
    {screen==='ideas' && <Page title="Idea Bank" back={()=>setScreen('home')}>{saved?<Card label="SAVED IDEA" text={instant.hook}/>:<div className="empty">💡<h2>Your best ideas live here.</h2><p>Save generated posts and inspiration so you never lose a good idea.</p><button className="wide" onClick={()=>setScreen('post')}>Generate an idea</button></div>}</Page>}
    {screen==='pillars' && <Page title="Content Pillars" back={()=>setScreen('home')}><p className="intro">Your pillars keep your content varied, recognizable and connected to your goals.</p><div className="pillars">{['Education','Authority','Sales','Personal','Behind the Scenes','Psychology','Faith & Values','Inspiration','Entertainment'].map(x=><button key={x}>✓ {x}</button>)}</div></Page>}
    {toast&&<div className="toast">{toast}</div>}
    <nav><button className={screen==='home'?'active':''} onClick={()=>setScreen('home')}>⌂<small>Home</small></button><button onClick={()=>setScreen('week')}>▦<small>Plan</small></button><button className="plus" onClick={()=>setScreen('post')}>＋</button><button onClick={()=>setScreen('ideas')}>💡<small>Ideas</small></button><button onClick={()=>setScreen('pillars')}>◎<small>Strategy</small></button></nav>
  </main>
}
function Page({title,back,children}){return <section className="page"><div className="pageHead"><button onClick={back}>‹</button><div><small>CONTENT COMPASS</small><h1>{title}</h1></div></div>{children}</section>}
function Card({label,text}){return <section className="card"><small>{label}</small><p>{text}</p></section>}
