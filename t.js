(function(){
var n=navigator,d=document,w=window;
if(/bot|crawl|spider|headless|curl|wget/i.test(n.userAgent))return;
var E="https://crm.howtocfa.com/api/events";
var sid=Math.random().toString(36).slice(2,11);
var t0=Date.now(),mx=0,sent=0;
var p=new URLSearchParams(w.location.search);
var b={sid:sid,url:w.location.pathname,title:d.title,ref:d.referrer,
src:p.get("utm_source")||"",med:p.get("utm_medium")||"",
camp:p.get("utm_campaign")||"",sw:screen.width};
function snd(type,extra){
var o={};for(var k in b)o[k]=b[k];o.type=type;
if(extra)for(var k in extra)o[k]=extra[k];
try{n.sendBeacon(E,JSON.stringify(o));}catch(e){}
}
snd("pv");
var tick=0;
w.addEventListener("scroll",function(){
if(!tick){tick=1;requestAnimationFrame(function(){
var pct=Math.round(100*(w.scrollY+w.innerHeight)/d.documentElement.scrollHeight);
if(pct>mx)mx=Math.min(pct,100);tick=0;
});}
});
d.addEventListener("visibilitychange",function(){
if(d.visibilityState==="hidden"&&!sent){
sent=1;snd("eng",{sd:mx,top:Math.round((Date.now()-t0)/1000)});
}
});
d.addEventListener("click",function(e){
var el=e.target.closest('[data-track],a[href*="cfa-level-1-course"],a[href*="razorpay"],button[type="submit"]');
if(el){snd("click",{target:el.getAttribute("data-track")||el.innerText.trim().slice(0,50),href:el.href||""});}
});
})();
