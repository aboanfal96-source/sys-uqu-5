"use strict";
var BIN_ID="69df4b13856a68218936f05b";
var BIN_KEY="$2a$10$iFWch8vEFrt/rm0bVxgMp.0wCdarwvpQEyN276lqaPTPnD1ERwEx2";
var ANT_KEY="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";
var ADMIN_PW="Jaser54321@";

var PAGES=["pgL","pgAL","pgEF","pgA"];
function showPg(id){PAGES.forEach(function(p){document.getElementById(p).classList.remove("on");});document.getElementById(id).classList.add("on");var r=document.getElementById("hRole");if(id==="pgA"){r.textContent="🔐 مدير القسم";r.className="hbtn hbtn-a";}else if(id==="pgEF"){r.textContent="👷 بوابة الموظفين";r.className="hbtn hbtn-e";}else{r.textContent="نظام الدراسات الخمسة";r.className="hbtn hbtn-e";}}

function ge(id){return document.getElementById(id);}
function gv(id){return ge(id).value.trim();}
function fmtN(n){return Number(String(n||0).replace(/,/g,"")).toLocaleString("ar-SA");}
function fmtD(s){if(!s)return"—";return new Date(s).toLocaleDateString("ar-SA",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});}
function ov(on,tx){ge("ov").classList.toggle("on",on);if(tx)ge("otx").textContent=tx;}

async function readDB(){var r=await fetch("https://api.jsonbin.io/v3/b/"+BIN_ID+"/latest",{headers:{"X-Master-Key":BIN_KEY}});if(!r.ok)throw new Error("DB error "+r.status);var d=await r.json();return(d.record&&d.record.requests)?d.record.requests:[];}
async function writeDB(list){var r=await fetch("https://api.jsonbin.io/v3/b/"+BIN_ID,{method:"PUT",headers:{"Content-Type":"application/json","X-Master-Key":BIN_KEY},body:JSON.stringify({requests:list.slice(0,200)})});if(!r.ok)throw new Error("Save error "+r.status);}

ge("cEmp").addEventListener("click",function(){showPg("pgEF");});
ge("cAdm").addEventListener("click",function(){showPg("pgAL");setTimeout(function(){ge("pw").focus();},100);});
ge("lbtn").addEventListener("click",doLogin);
ge("pw").addEventListener("keypress",function(e){if(e.key==="Enter")doLogin();});
ge("bbk").addEventListener("click",function(){showPg("pgL");});
ge("sbBtn").addEventListener("click",submitReq);
ge("btnNW").addEventListener("click",function(){ge("okBox").style.display="none";ge("fInner").style.display="block";document.querySelectorAll("#fInner input,#fInner textarea,#fInner select").forEach(function(e){e.value="";});ge("sbBtn").disabled=false;ge("sbBtn").innerHTML="📨 إرسال طلب الدراسة";});
ge("btnRef").addEventListener("click",loadAdmin);
ge("btnOut").addEventListener("click",function(){showPg("pgL");});
ge("btnCR").addEventListener("click",function(){ge("repMod").classList.remove("on");});
ge("t1").addEventListener("click",function(){swTab(1);});
ge("t2").addEventListener("click",function(){swTab(2);});
ge("t3").addEventListener("click",function(){swTab(3);});
ge("logoBtn").addEventListener("click",function(){showPg("pgL");});
ge("hRole").addEventListener("click",function(){showPg("pgL");});

function doLogin(){var pw=gv("pw");ge("lerr").textContent="";if(!pw){ge("lerr").textContent="أدخل كلمة المرور";return;}if(pw!==ADMIN_PW){ge("lerr").textContent="كلمة المرور غير صحيحة";return;}showPg("pgA");loadAdmin();}

async function submitReq(){
  var rn=gv("rn"),dp=gv("dp"),pn=gv("pn"),pt=gv("pt"),co=gv("co"),du=gv("du"),de=gv("de"),ju=gv("ju");
  if(!rn||!dp||!pn||!pt||!co||!du||!de||!ju){alert("يرجى ملء جميع الحقول المطلوبة (●)");return;}
  ge("sbBtn").disabled=true;ge("sbBtn").innerHTML="⏳ جاري الإرسال...";
  try{var list=await readDB();var id="REQ-"+Date.now();list.unshift({id:id,status:"pending",submittedAt:new Date().toISOString(),requesterName:rn,department:dp,phone:gv("ph"),email:gv("em"),projectName:pn,projectType:pt,location:gv("lo"),costConstruction:co,duration:du,fiscalYear:gv("fy")||"1446-1447 هـ",beneficiary:gv("be")||"منسوبو الجامعة",description:de,justification:ju,notes:gv("no")});await writeDB(list);ge("fInner").style.display="none";ge("okBox").style.display="block";ge("okId").textContent="رقم الطلب: "+id;}
  catch(e){alert("خطأ: "+e.message);ge("sbBtn").disabled=false;ge("sbBtn").innerHTML="📨 إرسال طلب الدراسة";}
}

async function loadAdmin(){try{var list=await readDB();renderAdmin(list);}catch(e){alert("خطأ: "+e.message);}}

function swTab(n){[1,2,3].forEach(function(i){ge("t"+i).classList.toggle("on",i===n);});ge("tp").style.display=n===1?"flex":"none";ge("td").style.display=n===2?"flex":"none";ge("tl").style.display=n===3?"block":"none";ge("tp").style.flexDirection="column";ge("td").style.flexDirection="column";}

function renderAdmin(reqs){
  var pend=reqs.filter(function(r){return r.status==="pending";});var done=reqs.filter(function(r){return r.status!=="pending";});var gen=reqs.filter(function(r){return r.status==="generated";});var rej=reqs.filter(function(r){return r.status==="rejected";});
  ge("s1").textContent=pend.length;ge("s2").textContent=gen.length;ge("s3").textContent=reqs.length;ge("s4").textContent=rej.length;
  ge("tp").innerHTML=pend.length?pend.map(mkCard).join(""):"<div style='text-align:center;color:#aaa;padding:22px'>لا توجد طلبات جديدة</div>";
  ge("td").innerHTML=done.length?done.map(mkCard).join(""):"<div style='text-align:center;color:#aaa;padding:14px'>لا توجد طلبات معالجة</div>";
  var logAll=gen.map(function(r){return{date:r.reviewedAt,name:r.projectName,who:r.requesterName,dept:r.department,c:"#0d7a7a",ic:"✅ تم التوليد"};}).concat(rej.map(function(r){return{date:r.reviewedAt,name:r.projectName,who:r.requesterName,dept:r.department,c:"#c03030",ic:"❌ مرفوض"};})).sort(function(a,b){return new Date(b.date)-new Date(a.date);});
  ge("tl").innerHTML=logAll.length?logAll.map(function(l){return"<div class='li'><div class='ld' style='background:"+l.c+"'></div><div class='lt2'><strong>"+l.ic+": "+l.name+"</strong><br>"+l.who+" · "+l.dept+"</div><div class='ldt'>"+fmtD(l.date)+"</div></div>";}).join(""):"<div style='text-align:center;color:#aaa;padding:28px'>لا يوجد سجل بعد</div>";
}

function mkCard(r){
  var sb=r.status==="pending"?"<span class='stb sp'>⏳ قيد الانتظار</span>":r.status==="generated"?"<span class='stb sg'>📄 تقرير مُولَّد</span>":"<span class='stb sr2'>❌ مرفوض</span>";
  var acts="";
  if(r.status==="pending"){acts="<input class='ni' id='nt_"+r.id+"' placeholder='ملاحظات (اختياري)...'><button class='bok' onclick=\"doAct('"+r.id+"','approved')\">✅ موافقة وتوليد التقرير</button><button class='bno' onclick=\"doAct('"+r.id+"','rejected')\">❌ رفض</button>";}
  else if(r.status==="generated"){acts="<button class='bvw' onclick=\"viewRep('"+r.id+"')\">👁 عرض التقرير</button>";}
  return"<div class='rc "+r.status+"' id='c_"+r.id+"'><div class='rct'><div><div class='rcn'>"+r.projectName+"</div><div class='rcm'>"+r.requesterName+" · "+r.department+" · "+fmtD(r.submittedAt)+"</div></div>"+sb+"</div><div class='rcd'><div class='di'><div class='dl'>النوع</div><div class='dv'>"+r.projectType+"</div></div><div class='di'><div class='dl'>التكلفة</div><div class='dv'>"+fmtN(r.costConstruction)+" ريال</div></div><div class='di'><div class='dl'>المدة</div><div class='dv'>"+r.duration+" شهر</div></div><div class='di'><div class='dl'>الموقع</div><div class='dv'>"+(r.location||"—")+"</div></div><div class='di'><div class='dl'>المستفيد</div><div class='dv'>"+(r.beneficiary||"—")+"</div></div><div class='di'><div class='dl'>السنة المالية</div><div class='dv'>"+(r.fiscalYear||"—")+"</div></div></div><div class='rdesc'>"+r.description+"</div>"+(r.justification?"<div class='rdesc' style='border-color:rgba(201,162,39,.3);background:#fffdf5'><strong>المبررات:</strong> "+r.justification+"</div>":"")+"<div class='ra'>"+acts+"</div></div>";
}

async function doAct(id,action){
  if(action==="rejected"&&!confirm("هل تريد رفض هذا الطلب؟"))return;
  var nt=ge("nt_"+id);var notes=nt?nt.value:"";
  var btn=document.querySelector("#c_"+id+" .bok");if(btn){btn.disabled=true;btn.textContent="جاري المعالجة...";}
  ov(true,action==="approved"?"جاري توليد التقرير... (30-60 ثانية)":"جاري معالجة الطلب...");
  try{
    var list=await readDB();var idx=list.findIndex(function(r){return r.id===id;});if(idx===-1)throw new Error("الطلب غير موجود");
    var item=list[idx];item.adminNotes=notes;item.reviewedAt=new Date().toISOString();
    if(action==="rejected"){item.status="rejected";list[idx]=item;await writeDB(list);ov(false);loadAdmin();return;}
    var cn=parseFloat(String(item.costConstruction||"0").replace(/,/g,""))||0;var sn=Math.round(cn*0.10),tot=cn+sn,opx=Math.round(tot*0.00025*30),grd=tot+opx,dn=parseInt(item.duration)||12;
    var fn2=function(n){return Number(n).toLocaleString("ar-SA");};
    var info="المشروع: "+item.projectName+" | الموقع: "+(item.location||"جامعة أم القرى")+" | النوع: "+item.projectType+" | الوصف: "+item.description+" | المبررات: "+(item.justification||"")+" | التكلفة: "+fn2(cn)+" ريال | الإشراف: "+fn2(sn)+" ريال | الإجمالي: "+fn2(tot)+" ريال | المدة: "+item.duration+" شهر | المستفيد: "+(item.beneficiary||"منسوبو الجامعة");
    var SYS="أنت خبير استشاري لدراسات الجدوى. أجب بنص عربي فقط. استخدم العلامات المحددة.";
    var q1="بيانات: "+info+"\n\nاكتب:\n\nVISION:\n[4 جمل رؤية 2030]\n\nPROGRAMS:\n- [ب1]\n- [ب2]\n- [ب3]\n\nOBJECTIVES:\n- [ه1]\n- [ه2]\n- [ه3]\n- [ه4]\n- [ه5]\n\nOBJ_D1:\n[شرح1]\n\nOBJ_D2:\n[شرح2]\n\nOBJ_D3:\n[شرح3]\n\nPROBLEMS:\n- [م1]\n- [م2]\n- [م3]\n\nPI1:\n[أثر1]\n\nPI2:\n[أثر2]\n\nPI3:\n[أثر3]\n\nALIGNMENT:\n[3 جمل]\n\nSITUATION:\n[3 جمل]\n\nDEMAND:\n[4 جمل]\n\nURGENCY:\n[جملتان]\n\nNEG1:\n[ت1]\n\nNEG2:\n[ت2]\n\nNEG3:\n[ت3]\n\nNEG4:\n[ت4]\n\nBEN_A:\n[أمني]\n\nBEN_S:\n[اجتماعي]\n\nBEN_U:\n[عمراني]\n\nBEN_O:\n[تشغيلي]\n\nCONTRACT:\n[4 جمل]\n\nPAYMENT:\n[جدول دفعات]\n\nPROCS:\n- [و1]\n- [و2]\n- [و3]\n- [و4]\n- [و5]";
    var q2="بيانات: "+info+"\nمدة: "+dn+" شهر\n\nاكتب:\n\nVE1:\n[مقترح1]\n\nVE2:\n[مقترح2]\n\nVE3:\n[مقترح3]\n\nVE4:\n[مقترح4]\n\nR1:\n[خطر1]\n\nR1M:\n[م1]\n\nR2:\n[خطر2]\n\nR2M:\n[م2]\n\nR3:\n[خطر3]\n\nR3M:\n[م3]\n\nR4:\n[خطر4]\n\nR4M:\n[م4]\n\nR5:\n[خطر5]\n\nR5M:\n[م5]\n\nR6:\n[خطر6]\n\nR6M:\n[م6]";
    var H={"Content-Type":"application/json","x-api-key":ANT_KEY,"anthropic-version":"2023-06-01"};
    var call=async function(q){var r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:H,body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:3000,system:SYS,messages:[{role:"user",content:q}]})});var d=await r.json();return d.content?d.content.map(function(b){return b.text||"";}).join(""):"";}
    var res=await Promise.all([call(q1),call(q2)]);
    item.status="generated";item.generatedData={t1:res[0],t2:res[1],cn:cn,sn:sn,tot:tot,opx:opx,grd:grd,dn:dn};
    list[idx]=item;await writeDB(list);ov(false);showReport(item);loadAdmin();
  }catch(e){ov(false);if(btn){btn.disabled=false;btn.textContent="✅ موافقة وتوليد التقرير";}alert("خطأ: "+e.message);}
}

async function viewRep(id){ov(true,"جاري تحميل التقرير...");try{var list=await readDB();var req=list.find(function(x){return x.id===id;});ov(false);if(req)showReport(req);else alert("لم يتم العثور على التقرير");}catch(e){ov(false);alert("خطأ: "+e.message);}}

function showReport(req){
  var gd=req.generatedData;if(!gd){alert("بيانات التقرير غير متوفرة");return;}
  var t1=gd.t1,t2=gd.t2;
  var d={vision:sec(t1,"VISION:\n"),programs:lns(t1,"PROGRAMS:\n"),objectives:lns(t1,"OBJECTIVES:\n"),od1:sec(t1,"OBJ_D1:\n"),od2:sec(t1,"OBJ_D2:\n"),od3:sec(t1,"OBJ_D3:\n"),problems:lns(t1,"PROBLEMS:\n"),pi1:sec(t1,"PI1:\n"),pi2:sec(t1,"PI2:\n"),pi3:sec(t1,"PI3:\n"),alignment:sec(t1,"ALIGNMENT:\n"),situation:sec(t1,"SITUATION:\n"),demand:sec(t1,"DEMAND:\n"),urgency:sec(t1,"URGENCY:\n"),neg1:sec(t1,"NEG1:\n"),neg2:sec(t1,"NEG2:\n"),neg3:sec(t1,"NEG3:\n"),neg4:sec(t1,"NEG4:\n"),benA:sec(t1,"BEN_A:\n"),benS:sec(t1,"BEN_S:\n"),benU:sec(t1,"BEN_U:\n"),benO:sec(t1,"BEN_O:\n"),contract:sec(t1,"CONTRACT:\n"),payment:sec(t1,"PAYMENT:\n"),procs:lns(t1,"PROCS:\n"),ve1:sec(t2,"VE1:\n"),ve2:sec(t2,"VE2:\n"),ve3:sec(t2,"VE3:\n"),ve4:sec(t2,"VE4:\n"),r1:sec(t2,"R1:\n"),r1m:sec(t2,"R1M:\n"),r2:sec(t2,"R2:\n"),r2m:sec(t2,"R2M:\n"),r3:sec(t2,"R3:\n"),r3m:sec(t2,"R3M:\n"),r4:sec(t2,"R4:\n"),r4m:sec(t2,"R4M:\n"),r5:sec(t2,"R5:\n"),r5m:sec(t2,"R5M:\n"),r6:sec(t2,"R6:\n"),r6m:sec(t2,"R6M:\n")};
  var p={name:req.projectName,loc:req.location,typ:req.projectType,dur:req.duration,yr:req.fiscalYear||"1446-1447 هـ",spv:"إدارة المشاريع",ben:req.beneficiary||"منسوبو الجامعة",cn:gd.cn,sn:gd.sn,tot:gd.tot,opx:gd.opx,grd:gd.grd,desc:req.description,jst:req.justification,dn:gd.dn};
  ge("mtt").textContent="تقرير: "+req.projectName;ge("rTitle").textContent=req.projectName;ge("rMeta").textContent="جامعة أم القرى · "+(req.location||"")+" · "+(req.fiscalYear||"");
  ge("repMod").classList.add("on");build(p,d);
}

setInterval(function(){if(ge("pgA").classList.contains("on"))loadAdmin();},60000);
