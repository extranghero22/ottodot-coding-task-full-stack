"use strict";(()=>{var e={};e.id=73,e.ids=[73],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3685:e=>{e.exports=require("http")},5687:e=>{e.exports=require("https")},5477:e=>{e.exports=require("punycode")},2781:e=>{e.exports=require("stream")},7310:e=>{e.exports=require("url")},9796:e=>{e.exports=require("zlib")},4200:(e,t,r)=>{r.r(t),r.d(t,{headerHooks:()=>g,originalPathname:()=>w,patchFetch:()=>y,requestAsyncStorage:()=>d,routeModule:()=>m,serverHooks:()=>b,staticGenerationAsyncStorage:()=>h,staticGenerationBailout:()=>f});var o={};r.r(o),r.d(o,{POST:()=>c});var i=r(5419),a=r(9108),n=r(9678),s=r(973),l=r(9983),p=r(8070);let u=new s.$D(process.env.GOOGLE_API_KEY||"");async function c(e){try{let t;let{difficulty:r="medium",topic:o=null,user_id:i=null}=await e.json().catch(()=>({})),a=["easy","medium","hard"].includes(r)?r:"medium",n=u.getGenerativeModel({model:"gemini-2.0-flash"}),s={easy:`DIFFICULTY: EASY
- Use smaller numbers (within 100 for whole numbers, simple fractions like 1/2, 1/4)
- Single-step problems or very simple two-step problems
- Clear, straightforward contexts
- Basic operations without complex reasoning`,medium:`DIFFICULTY: MEDIUM
- Use moderate numbers (within 10,000 for whole numbers, fractions with denominators up to 12)
- Two to three-step problems
- Realistic contexts requiring some analysis
- May involve multiple operations or concepts`,hard:`DIFFICULTY: HARD
- Use larger numbers (up to 10 million for whole numbers, complex fractions)
- Multi-step problems (3-4 steps)
- Complex real-world scenarios requiring deeper reasoning
- May involve order of operations, brackets, or multiple concepts combined`},c=o?`
    REQUIRED TOPIC: Focus ONLY on "${o}" problems.
`:"",m=`Generate a multiple choice math word problem suitable for Primary 5 students (age 10-11) following the Singapore Primary Mathematics Syllabus.

    ${s[a]}
    ${c}
    CURRICULUM REQUIREMENTS - Choose ONE topic from:

    NUMBER & ALGEBRA:
    - Whole numbers (up to 10 million, order of operations with brackets)
    - Fractions (four operations, especially multiplication by whole numbers and proper fractions)
    - Decimals (multiplying/dividing by 10/100/1000, converting measurements)
    - Percentage (finding percentage of whole, discount, GST, annual interest)
    - Rate problems (quantity per unit of another quantity)

    MEASUREMENT & GEOMETRY:
    - Area of triangle (using base \xd7 height \xf7 2, composite figures)
    - Volume of cube/cuboid (including liquid volume, relationship between ℓ and cm\xb3)
    - Angles (on straight lines, at points, vertically opposite, finding unknowns)
    - Properties of triangles (isosceles, equilateral, right-angled, angle sum)
    - Properties of quadrilaterals (parallelogram, rhombus, trapezium)

    PROBLEM DESIGN PRINCIPLES:
    - Use realistic, age-appropriate contexts from everyday life
    - Focus on conceptual understanding, not just procedural skills
    - Encourage mathematical reasoning and problem-solving
    - Numbers should be within students' computational ability

    IMPORTANT: First solve the problem step by step to ensure you get the correct answer.
    Then create 3 plausible wrong answers (distractors) based on common student errors.

    Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks):
    {
      "problem_text": "A detailed word problem in a real-world context",
      "topic": "One of: Whole Numbers, Fractions, Decimals, Percentage, Rate, Area, Volume, Angles, Triangles, Quadrilaterals",
      "difficulty": "${a}",
      "options": [
        {"text": "Option A", "value": 10},
        {"text": "Option B", "value": 20},
        {"text": "Option C", "value": 30},
        {"text": "Option D", "value": 40}
      ],
      "correct_answer": 20,
      "solution_steps": "Clear step-by-step calculation showing working",
      "hint": "A helpful hint that guides toward the solution without revealing the answer"
    }

    VALIDATION CHECKLIST:
    - correct_answer MUST match one option value exactly
    - All option values are numbers (not strings)
    - Distractors represent common misconceptions (e.g., forgetting to carry, wrong operation, partial calculation)
    - Answer is mathematically CORRECT per solution_steps
    - Problem text is clear, unambiguous, and age-appropriate

    Example (Whole Numbers):
    Problem: A school library has 2,450 books. During the book fair, they bought 385 new books and donated 127 old books to charity. How many books does the library have now?
    Solution: 2,450 + 385 - 127 = 2,835 - 127 = 2,708
    Options: [2,562 (forgot donation), 2,708 (correct), 2,835 (forgot subtraction), 2,958 (added all)]

    Double-check your arithmetic before responding!`,d=await n.generateContent(m),h=(await d.response).text();try{let e=h.replace(/```json\n?/g,"").replace(/```\n?/g,"").trim();t=JSON.parse(e)}catch(e){throw console.error("Failed to parse AI response:",h),Error("Invalid AI response format")}if(!t.problem_text||!t.options||!Array.isArray(t.options)||4!==t.options.length||"number"!=typeof t.correct_answer)throw Error("Invalid problem data structure");if(!t.options.map(e=>e.value).includes(t.correct_answer))throw Error("Correct answer does not match any option");let{data:b,error:g}=await l.O.from("math_problem_sessions").insert({problem_text:t.problem_text,correct_answer:t.correct_answer,options:t.options,difficulty:a,topic:t.topic||null,hint_text:t.hint||null,solution_steps:t.solution_steps||null,user_id:i}).select().single();if(g)throw console.error("Database error:",g),Error("Failed to save problem to database");return p.Z.json({session_id:b.id,problem_text:b.problem_text,final_answer:b.correct_answer,options:b.options,difficulty:b.difficulty,topic:b.topic,hint:b.hint_text})}catch(e){return console.error("Error generating problem:",e),p.Z.json({error:"Failed to generate problem. Please try again."},{status:500})}}let m=new i.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/generate-problem/route",pathname:"/api/generate-problem",filename:"route",bundlePath:"app/api/generate-problem/route"},resolvedPagePath:"C:\\Users\\alexa\\Desktop\\Ottodot\\ottodot-coding-task-full-stack\\app\\api\\generate-problem\\route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:d,staticGenerationAsyncStorage:h,serverHooks:b,headerHooks:g,staticGenerationBailout:f}=m,w="/api/generate-problem/route";function y(){return(0,n.patchFetch)({serverHooks:b,staticGenerationAsyncStorage:h})}},9983:(e,t,r)=>{r.d(t,{O:()=>n});var o=r(2964);let i="https://qjrtfzzfrfeopzsndhcx.supabase.co",a="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqcnRmenpmcmZlb3B6c25kaGN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2NDQzNzQsImV4cCI6MjA3NTIyMDM3NH0.F_TNrNkCjPaNlWUu6Q0M60TEtpU995ALiyp5wrWDkOE";if(!i||!a)throw Error("Missing Supabase environment variables");let n=(0,o.eI)(i,a)}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[638,932,973],()=>r(4200));module.exports=o})();