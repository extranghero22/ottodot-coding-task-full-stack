"use strict";(()=>{var e={};e.id=760,e.ids=[760],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3685:e=>{e.exports=require("http")},5687:e=>{e.exports=require("https")},5477:e=>{e.exports=require("punycode")},2781:e=>{e.exports=require("stream")},7310:e=>{e.exports=require("url")},9796:e=>{e.exports=require("zlib")},9684:(e,r,t)=>{t.r(r),t.d(r,{headerHooks:()=>f,originalPathname:()=>w,patchFetch:()=>I,requestAsyncStorage:()=>m,routeModule:()=>p,serverHooks:()=>g,staticGenerationAsyncStorage:()=>h,staticGenerationBailout:()=>b});var s={};t.r(s),t.d(s,{POST:()=>d});var o=t(5419),a=t(9108),i=t(9678),n=t(973),u=t(9983),c=t(8070);let l=new n.$D(process.env.GOOGLE_API_KEY||"");async function d(e){try{let{session_id:r,user_answer:t,time_spent_seconds:s}=await e.json();if(!r||null==t)return c.Z.json({error:"Missing session_id or user_answer"},{status:400});let{data:o,error:a}=await u.O.from("math_problem_sessions").select("*").eq("id",r).single();if(a||!o)return c.Z.json({error:"Session not found"},{status:404});let i=Number(t)===Number(o.correct_answer),n=l.getGenerativeModel({model:"gemini-2.0-flash"}),d=`You are a helpful and encouraging math tutor for Primary 5 students (age 10-11) following Singapore Primary Mathematics pedagogy.

PEDAGOGICAL PRINCIPLES (from Singapore Math Curriculum):
- Build confidence and foster interest in mathematics
- Develop thinking, reasoning, and communication skills
- Focus on conceptual understanding over memorization
- Provide timely, specific feedback that helps students improve
- Be encouraging but honest about errors
- Support metacognition (help students reflect on their thinking)

CONTEXT:
Original Problem: ${o.problem_text}
Correct Answer: ${o.correct_answer}
Student's Answer: ${t}
Is Correct: ${i}

FEEDBACK REQUIREMENTS:
${i?`CORRECT ANSWER - Your feedback should:
- Celebrate their success warmly and specifically
- Briefly explain WHY the solution works (build understanding)
- Encourage them to try more problems
- 2-3 sentences maximum`:`INCORRECT ANSWER - Your feedback should:
- Acknowledge their effort positively
- Identify the specific ERROR or MISCONCEPTION (e.g., "It looks like you added instead of subtracted")
- Give a HINT about the correct approach WITHOUT revealing the full answer
- Encourage them to try again with this new understanding
- 3-4 sentences maximum`}

TONE: Warm, encouraging, age-appropriate (10-11 years old), patient, growth-mindset focused

Return ONLY the feedback text (no JSON, no markdown, no special formatting).`,p=await n.generateContent(d),m=(await p.response).text().trim(),{data:h,error:g}=await u.O.from("math_problem_submissions").insert({session_id:r,user_answer:Number(t),is_correct:i,feedback_text:m,time_spent_seconds:s||0}).select().single();if(g)throw console.error("Database error:",g),Error("Failed to save submission to database");return c.Z.json({is_correct:i,feedback:m,correct_answer:o.correct_answer})}catch(e){return console.error("Error submitting answer:",e),c.Z.json({error:"Failed to submit answer. Please try again."},{status:500})}}let p=new o.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/submit-answer/route",pathname:"/api/submit-answer",filename:"route",bundlePath:"app/api/submit-answer/route"},resolvedPagePath:"C:\\Users\\alexa\\Desktop\\Ottodot\\ottodot-coding-task-full-stack\\app\\api\\submit-answer\\route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:m,staticGenerationAsyncStorage:h,serverHooks:g,headerHooks:f,staticGenerationBailout:b}=p,w="/api/submit-answer/route";function I(){return(0,i.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:h})}},9983:(e,r,t)=>{t.d(r,{O:()=>i});var s=t(2964);let o="https://qjrtfzzfrfeopzsndhcx.supabase.co",a="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqcnRmenpmcmZlb3B6c25kaGN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2NDQzNzQsImV4cCI6MjA3NTIyMDM3NH0.F_TNrNkCjPaNlWUu6Q0M60TEtpU995ALiyp5wrWDkOE";if(!o||!a)throw Error("Missing Supabase environment variables");let i=(0,s.eI)(o,a)}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[638,932,973],()=>t(9684));module.exports=s})();