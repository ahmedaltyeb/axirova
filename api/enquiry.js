import { createLeadSchema } from '../shared/leadSchema.js';
const attempts=new Map();
const WINDOW=10*60*1000;
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Method not allowed'});}
 const origin=req.headers.origin;
 if(origin){try{if(new URL(origin).host!==req.headers.host)return res.status(403).json({error:'Origin rejected'});}catch{return res.status(403).json({error:'Origin rejected'});}}
 if(!String(req.headers['content-type']||'').startsWith('application/json'))return res.status(415).json({error:'JSON required'});
 let body;try{if(Number(req.headers['content-length'])>16000)return res.status(413).json({error:'Payload too large'});body=typeof req.body==='string'?JSON.parse(req.body):req.body;if(JSON.stringify(body||{}).length>16000)return res.status(413).json({error:'Payload too large'});}catch{return res.status(400).json({error:'Invalid JSON'});}
 if(body?.website)return res.status(200).json({ok:true});
 const now=Date.now();for(const [key,entry] of attempts){if(entry.until<=now)attempts.delete(key);}
 const ip=req.headers['x-vercel-forwarded-for']||req.socket?.remoteAddress||'unknown';const entry=attempts.get(ip)||{count:0,until:now+WINDOW};
 if(entry.count>=5){res.setHeader('Retry-After',Math.ceil((entry.until-now)/1000));return res.status(429).json({error:'Too many requests'});}
 if(attempts.size>=10000&&!attempts.has(ip))return res.status(503).json({error:'Please retry later'});
 entry.count++;attempts.set(ip,entry);
 const parsed=createLeadSchema().safeParse(body);if(!parsed.success)return res.status(400).json({error:'Invalid enquiry'});
 const lead=parsed.data;
 try{
  let response;
  if(process.env.ENQUIRY_WEBHOOK_URL){response=await fetch(process.env.ENQUIRY_WEBHOOK_URL,{method:'POST',headers:{'Content-Type':'application/json',...(process.env.ENQUIRY_WEBHOOK_TOKEN?{Authorization:`Bearer ${process.env.ENQUIRY_WEBHOOK_TOKEN}`}:{})},body:JSON.stringify(lead),signal:AbortSignal.timeout(10000)});}
  else if(process.env.RESEND_API_KEY&&process.env.ENQUIRY_FROM_EMAIL&&process.env.ENQUIRY_TO_EMAIL){response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.ENQUIRY_FROM_EMAIL,to:[process.env.ENQUIRY_TO_EMAIL],...(lead.email?{reply_to:lead.email}:{}),subject:`Axirova ${lead.type||'project'} enquiry`,text:Object.entries(lead).filter(([k])=>k!=='website').map(([k,v])=>`${k}: ${v}`).join('\n')}),signal:AbortSignal.timeout(10000)});}
  else return res.status(503).json({error:'Enquiry delivery is not configured'});
  if(!response.ok)return res.status(502).json({error:'Delivery failed'});
  return res.status(200).json({ok:true});
 }catch{return res.status(502).json({error:'Delivery failed'});}
}
