"use strict";(()=>{var e={};e.id=217,e.ids=[217],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3685:e=>{e.exports=require("http")},5687:e=>{e.exports=require("https")},5477:e=>{e.exports=require("punycode")},2781:e=>{e.exports=require("stream")},7310:e=>{e.exports=require("url")},9796:e=>{e.exports=require("zlib")},7282:(e,t,r)=>{r.r(t),r.d(t,{headerHooks:()=>d,originalPathname:()=>b,patchFetch:()=>x,requestAsyncStorage:()=>m,routeModule:()=>u,serverHooks:()=>l,staticGenerationAsyncStorage:()=>_,staticGenerationBailout:()=>h});var s={};r.r(s),r.d(s,{GET:()=>c});var o=r(5419),i=r(9108),a=r(9678),n=r(8070);let p=(0,r(2964).eI)("https://qjrtfzzfrfeopzsndhcx.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqcnRmenpmcmZlb3B6c25kaGN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2NDQzNzQsImV4cCI6MjA3NTIyMDM3NH0.F_TNrNkCjPaNlWUu6Q0M60TEtpU995ALiyp5wrWDkOE");async function c(e){try{let{searchParams:t}=new URL(e.url),r=t.get("user_id"),s=p.from("math_problem_sessions").select(`
        id,
        created_at,
        problem_text,
        correct_answer,
        options,
        difficulty,
        topic,
        hint_text,
        math_problem_submissions!inner(
          user_answer,
          is_correct,
          feedback_text,
          hint_used,
          time_spent_seconds,
          created_at
        )
      `).order("created_at",{ascending:!1}).limit(50);r&&(s=s.eq("user_id",r));let{data:o,error:i}=await s;if(i)return console.error("Error fetching history:",i),n.Z.json({error:"Failed to fetch problem history"},{status:500});let a=o?.map(e=>({session_id:e.id,created_at:e.created_at,problem_text:e.problem_text,correct_answer:e.correct_answer,options:e.options,difficulty:e.difficulty||"medium",topic:e.topic,hint_text:e.hint_text,user_answer:e.math_problem_submissions?.[0]?.user_answer,is_correct:e.math_problem_submissions?.[0]?.is_correct,feedback_text:e.math_problem_submissions?.[0]?.feedback_text,hint_used:e.math_problem_submissions?.[0]?.hint_used||!1,time_spent_seconds:e.math_problem_submissions?.[0]?.time_spent_seconds,submitted_at:e.math_problem_submissions?.[0]?.created_at}))||[];return n.Z.json({history:a})}catch(e){return console.error("Error in problem history API:",e),n.Z.json({error:"Internal server error"},{status:500})}}let u=new o.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/problem-history/route",pathname:"/api/problem-history",filename:"route",bundlePath:"app/api/problem-history/route"},resolvedPagePath:"C:\\Users\\alexa\\Desktop\\Ottodot\\ottodot-coding-task-full-stack\\app\\api\\problem-history\\route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:m,staticGenerationAsyncStorage:_,serverHooks:l,headerHooks:d,staticGenerationBailout:h}=u,b="/api/problem-history/route";function x(){return(0,a.patchFetch)({serverHooks:l,staticGenerationAsyncStorage:_})}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[638,932],()=>r(7282));module.exports=s})();