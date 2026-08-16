// Content Brain MAX — zero-cost local strategy engine.
// This module deliberately separates strategy architecture from UI so the
// library can keep growing without turning page.js into one giant template.

export const CONTENT_ARCHITECTURES = [
  {id:'proof-first',name:'Proof First',stages:['Trust','Convert'],hook:'Start with something the viewer can see, verify or compare.',beats:['Show the proof','Name what changed','Explain why it matters','Connect it to the buyer decision'],metric:'qualified replies'},
  {id:'objection-reversal',name:'Objection Reversal',stages:['Trust','Convert'],hook:'Say the hesitation out loud before the customer does.',beats:['Name the objection','Agree with the reasonable part','Reveal what they may be missing','Give a low-pressure next step'],metric:'DMs / enquiries'},
  {id:'mistake-fix',name:'Mistake → Fix',stages:['Attract','Trust'],hook:'Name one recognisable mistake, not a vague problem.',beats:['Show the mistake','Explain the consequence','Demonstrate the fix','Give a save-worthy rule'],metric:'saves'},
  {id:'diagnosis',name:'Expert Diagnosis',stages:['Trust'],hook:'Diagnose the symptom the customer notices and the cause they often miss.',beats:['Name the symptom','Reveal the likely cause','Show what you inspect','Explain the better decision'],metric:'profile visits'},
  {id:'demo',name:'Demonstration',stages:['Attract','Trust','Convert'],hook:'Show before you explain.',beats:['Open on the action/result','Demonstrate one useful detail','Explain the choice','Show the finished outcome'],metric:'watch time'},
  {id:'comparison',name:'Comparison',stages:['Trust','Convert'],hook:'Put two realistic options side by side without trashing either.',beats:['Name option A','Name option B','Explain who each suits','Give a decision rule'],metric:'shares'},
  {id:'micro-story',name:'Micro Story',stages:['Attract','Trust'],hook:'Open at the moment something changed, not at the beginning.',beats:['Moment of tension','What you noticed','What you changed','Lesson the viewer can use'],metric:'completion rate'},
  {id:'behind-choice',name:'Behind the Choice',stages:['Trust'],hook:'Reveal a small professional decision customers normally never see.',beats:['Show the choice','Explain the trade-off','Show why you chose it','Connect it to quality/result'],metric:'saves'},
  {id:'faq-decision',name:'Decision FAQ',stages:['Attract','Trust','Convert'],hook:'Answer the question people ask just before buying.',beats:['Ask the real question','Give the short answer','Add the condition/exception','Give the next step'],metric:'search views'},
  {id:'transformation',name:'Transformation',stages:['Trust','Convert'],hook:'Show the outcome first, then explain the path honestly.',beats:['Reveal outcome','Show starting point','Name the key intervention','Set realistic expectation'],metric:'leads'},
  {id:'myth-test',name:'Myth Test',stages:['Attract','Trust'],hook:'Test a common belief instead of simply calling it a myth.',beats:['State the belief','Show a real example/test','Explain what actually matters','Give the practical rule'],metric:'comments'},
  {id:'direct-response',name:'Direct Response',stages:['Convert'],hook:'Lead with the customer situation and desired outcome, not the business name.',beats:['Call out the situation','Clarify the result','Show credible proof/process','Make one specific offer'],metric:'leads'}
];

export const PLATFORM_RULES = {
  Instagram:{format:'Reel',seconds:'20–35 sec',firstFrame:'Result, mistake, comparison or strong visual detail.',search:'Put the exact topic naturally in spoken line, on-screen text and caption.',cta:'Prefer save/share/DM based on funnel stage.'},
  TikTok:{format:'Native short video',seconds:'18–30 sec',firstFrame:'Start mid-action or with a direct tension statement.',search:'Say the searchable question or problem naturally.',cta:'Use conversational reply/comment prompts; avoid corporate language.'},
  YouTube:{format:'Short',seconds:'25–45 sec',firstFrame:'Promise the answer/result immediately.',search:'Use a clear query-style title and repeat the core phrase naturally.',cta:'Point to the next useful lesson or enquiry only when earned.'},
  Facebook:{format:'Native video / post',seconds:'25–50 sec',firstFrame:'Human face, recognisable local/customer situation or visible result.',search:'Use plain-language category and location terms when relevant.',cta:'Ask a meaningful question or invite a message.'},
  LinkedIn:{format:'Text / native video',seconds:'35–60 sec',firstFrame:'Specific observation, tension or result — no motivational warm-up.',search:'Use professional problem/category language naturally.',cta:'Invite a relevant professional response, save or conversation.'}
};

const HOOK_FAMILIES = {
  proof:['Here’s the part I’d look at before believing the claim:','This is what good {topic} actually looks like up close:','Don’t take our word for it — look at this:'],
  correction:['If you’re doing {topic} this way, fix this first:','The expensive mistake isn’t what most people think:','Before you change everything, check this one thing:'],
  curiosity:['There’s a small detail in {topic} that changes the whole result:','Most customers never see this decision — but they feel the result:','This looks simple. The important part is what happens next:'],
  decision:['If you’re choosing {offer}, use this rule:','Who should actually choose {offer} — and who shouldn’t?','Before you pay for {offer}, ask this:'],
  story:['This nearly went wrong — and the fix was surprisingly small:','A customer question changed how we explain this:','The moment we knew this needed a different approach:']
};

export function safeText(value,fallback=''){const x=(value||'').trim();return /^(everyone|anyone|people|n\/a|none)$/i.test(x)?fallback:x}
export function chooseArchitecture(index,stage){const eligible=CONTENT_ARCHITECTURES.filter(x=>x.stages.includes(stage));return eligible[index%eligible.length]}
export function hookOptions({index=0,topic='this',offer='this service',stage='Attract'}){
 const family=stage==='Convert'?'decision':stage==='Trust'?(index%2?'proof':'curiosity'):(index%2?'correction':'story');
 return HOOK_FAMILIES[family].map(x=>x.replaceAll('{topic}',topic).replaceAll('{offer}',offer));
}
export function searchPhrase({industry,topic,offer}){return [safeText(topic),safeText(offer),safeText(industry)].find(Boolean)||'practical advice'}
export function buildCreativeBrief({index,stage,p,topic,proof}){
 const architecture=chooseArchitecture(index,stage), platform=PLATFORM_RULES[p.platform]||PLATFORM_RULES.Instagram;
 const audience=safeText(p.audience,'the customer this is designed for');
 const offer=safeText(p.offer,'your service');
 const hooks=hookOptions({index,topic,offer,stage});
 return {architecture,platform,audience,offer,hooks,search:searchPhrase({industry:p.industry,topic:p.topic||topic,offer:p.offer}),proof:safeText(p.proof,proof),objective:stage==='Attract'?'Earn attention from the right people':stage==='Trust'?'Reduce uncertainty with useful proof':'Turn earned trust into a clear next step'};
}
