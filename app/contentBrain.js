// Content Brain MAX — zero-cost local strategy engine.
// Strategy is separated from UI so quality can keep improving without paid APIs.

export const CONTENT_ARCHITECTURES = [
  {id:'proof-first',name:'Proof First',stages:['Trust','Convert'],beats:['Show the proof','Name what changed','Explain why it matters','Connect it to the buyer decision'],metric:'qualified replies'},
  {id:'objection-reversal',name:'Objection Reversal',stages:['Trust','Convert'],beats:['Name the objection','Validate the reasonable concern','Show what resolves it','Give a low-pressure next step'],metric:'DMs / enquiries'},
  {id:'mistake-fix',name:'Mistake → Fix',stages:['Attract','Trust'],beats:['Show the mistake','Explain the consequence','Demonstrate the fix','Give one memorable rule'],metric:'saves'},
  {id:'diagnosis',name:'Expert Diagnosis',stages:['Trust'],beats:['Name the symptom','Reveal the likely cause','Show what you inspect','Explain the better decision'],metric:'profile visits'},
  {id:'demo',name:'Demonstration',stages:['Attract','Trust','Convert'],beats:['Open on action/result','Demonstrate one useful detail','Explain the choice','Show the outcome'],metric:'watch time'},
  {id:'comparison',name:'Comparison',stages:['Trust','Convert'],beats:['Show option A','Show option B','Explain who each suits','Give a decision rule'],metric:'shares'},
  {id:'micro-story',name:'Micro Story',stages:['Attract','Trust'],beats:['Start at tension','Reveal what you noticed','Show what changed','Give the lesson'],metric:'completion rate'},
  {id:'behind-choice',name:'Behind the Choice',stages:['Trust'],beats:['Show a hidden decision','Explain the trade-off','Show why you chose it','Connect it to quality'],metric:'saves'},
  {id:'faq-decision',name:'Decision FAQ',stages:['Attract','Trust','Convert'],beats:['Ask the buying question','Give the short answer','Add the exception','Give the next step'],metric:'search views'},
  {id:'transformation',name:'Transformation',stages:['Trust','Convert'],beats:['Reveal outcome','Show starting point','Name the intervention','Set realistic expectation'],metric:'leads'},
  {id:'myth-test',name:'Myth Test',stages:['Attract','Trust'],beats:['State the belief','Test it visually','Explain what matters','Give the rule'],metric:'comments'},
  {id:'direct-response',name:'Direct Response',stages:['Convert'],beats:['Call out the situation','Clarify the result','Show credible proof','Make one specific offer'],metric:'leads'}
];

export const PLATFORM_RULES = {
  Instagram:{format:'Reel',seconds:'20–35 sec',firstFrame:'Result, mistake, comparison or strong visual detail.',search:'Use the real search phrase in speech, on-screen text and caption.',cta:'Save/share for value; DM only after trust is earned.'},
  TikTok:{format:'Native short video',seconds:'18–30 sec',firstFrame:'Start mid-action or with tension. Never introduce the business first.',search:'Say the exact question/problem naturally.',cta:'Use conversational replies and comments, not corporate CTAs.'},
  YouTube:{format:'Short',seconds:'25–45 sec',firstFrame:'Promise the answer or show the outcome immediately.',search:'Use a query-style title and natural spoken keyword.',cta:'Point to the next useful lesson or enquiry when earned.'},
  Facebook:{format:'Native video / post',seconds:'25–50 sec',firstFrame:'Use a real person, local/customer situation or visible result.',search:'Use plain-language category/location terms where relevant.',cta:'Invite a meaningful comment or message.'},
  LinkedIn:{format:'Text / native video',seconds:'35–60 sec',firstFrame:'Specific observation, tension or result. No motivational warm-up.',search:'Use professional problem/category language naturally.',cta:'Invite a relevant professional response or conversation.'}
};

const HOOK_FAMILIES = {
 proof:['Don’t take the claim at face value — check this first:','This is the detail I’d use to judge {topic}:','Here’s the proof I’d want to see before paying for {offer}:'],
 correction:['If {topic} keeps disappointing you, check this before changing everything:','The costly mistake with {topic} usually happens before the work even starts:','Most people focus on the obvious part of {topic}. I’d check this instead:'],
 curiosity:['Customers rarely see this part of {topic}, but they definitely feel the result:','This tiny decision changes the result more than the flashy stuff:','The interesting part of {topic} isn’t what you see first — it’s this:'],
 decision:['Before you pay for {offer}, ask this one question:','{offer}: who is it actually right for — and who should skip it?','If you’re comparing options for {offer}, use this rule:'],
 story:['We almost did this the obvious way. Then one detail changed the plan:','A customer asked a question that exposed a problem in how this is usually explained:','This looked completely normal until we noticed one thing:']
};

const WEAK_PHRASES=['make better decisions','clear decisions lead to better outcomes','three things to remember','the kind of customer we help','our ideal customer','here is the practical version','simply tell you we are good','everyone'];

export function safeText(value,fallback=''){const x=(value||'').trim();return !x||/^(everyone|anyone|people|n\/a|none|all)$/i.test(x)?fallback:x}
export function chooseArchitecture(index,stage){const eligible=CONTENT_ARCHITECTURES.filter(x=>x.stages.includes(stage));return eligible[index%eligible.length]}
export function hookOptions({index=0,topic='this',offer='this service',stage='Attract'}){const family=stage==='Convert'?'decision':stage==='Trust'?(index%2?'proof':'curiosity'):(index%2?'correction':'story');return HOOK_FAMILIES[family].map(x=>x.replaceAll('{topic}',topic).replaceAll('{offer}',offer))}
export function searchPhrase({industry,topic,offer}){const candidates=[safeText(topic),safeText(offer),safeText(industry)];return candidates.find(x=>x&&x.length>3)||'practical advice'}

export function qualityCheck(text,{topic='',audience='',proof=''}={}){
 const t=(text||'').trim(),lower=t.toLowerCase();
 const problems=[];
 if(t.length<18)problems.push('too short to be useful');
 if(WEAK_PHRASES.some(x=>lower.includes(x)))problems.push('contains generic/filler language');
 if((t.match(/\b(first|second|third)\b/gi)||[]).length>=3)problems.push('formulaic list structure');
 if(audience&&audience.length>4&&!lower.includes(audience.toLowerCase())&&t.length>120)problems.push('does not reflect the audience');
 if(topic&&topic.length>4&&!lower.includes(topic.toLowerCase())&&t.length>120)problems.push('drifts away from the topic');
 if(/^(welcome|hi |hello|hey |today i want|my name is)/i.test(t))problems.push('wastes the opening');
 if(proof&&/trust us|believe us/i.test(lower))problems.push('asks for trust instead of showing proof');
 return {pass:problems.length===0,score:Math.max(0,100-problems.length*18),problems};
}

export function buildCreativeBrief({index,stage,p,topic,proof}){
 const architecture=chooseArchitecture(index,stage),platform=PLATFORM_RULES[p.platform]||PLATFORM_RULES.Instagram;
 const audience=safeText(p.audience,'a specific customer with this problem');
 const offer=safeText(p.offer,'this service');
 const hooks=hookOptions({index,topic,offer,stage});
 const search=searchPhrase({industry:p.industry,topic:p.topic||topic,offer:p.offer});
 return {architecture,platform,audience,offer,hooks,search,proof:safeText(p.proof,proof),objective:stage==='Attract'?'Earn attention from the right person with a specific problem':stage==='Trust'?'Reduce uncertainty using useful evidence':'Turn earned trust into one clear commercial next step'};
}
