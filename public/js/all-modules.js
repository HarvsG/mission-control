"use strict";function addEvent(){const e=document.getElementById("events"),t=document.getElementById("event-template"),n=document.importNode(t.content,!0).firstElementChild;return null!=window.time&&window.time>new Date&&(n.children[2].innerHTML="T-"),e.insertBefore(n,e.firstChild),setTimeout(()=>n.classList.remove("hidden"),0),setTimeout(()=>n.classList.add("reverse"),600),n}function removeEvent(){const e=document.getElementById("events");e.children.length>1&&(e.firstElementChild.classList.add("hidden"),setTimeout(()=>e.removeChild(e.firstElementChild),600))}function addEventIfNeeded(){document.getElementById("events").firstElementChild.children[6].value.length>0&&addEvent()}async function save(){const e=arguments[0].element,t=await ajax.post("update",{id:e.id,value:e.value});document.querySelector(`#${e.id} + .editor-toolbar > a.fa-upload`).classList.add("highlight"),document.querySelector(".reddit").innerHTML=t}async function saveEvents(){const e=document.getElementById("events").children;let t=[];for(const n of e){const e=n.children,o="Posted"===e[1].getAttribute("data-content"),a=""===e[3].value?"":e[2].innerHTML+e[3].value.trim(),i=e[6].value.trim();""!==i&&t.push([o,a,i])}document.querySelector(".reddit").innerHTML=await ajax.post("update",{id:"events",value:t}),document.querySelector(".tab-events .fa-upload").classList.add("highlight")}async function createPost(){await ajax.get("update/create"),document.querySelector(".reddit").innerHTML="<div class=flex><span class=greyed-out>[empty post]</span></div>"}async function updateStats(){document.getElementById("status-liveupdate").innerHTML=await ajax.get("status")}function speechRecognition(){function e(){const e=document.activeElement.parentNode;e.classList.contains("reverse")&&e.previousElementSibling&&(console.log(e.previousElementSibling.children[3]),e.previousElementSibling.children[3].focus())}function t(e=!0){document.getElementById("mic").classList.remove(e?"fa-microphone":"fa-microphone-slash"),document.getElementById("mic").classList.add(e?"fa-microphone-slash":"fa-microphone")}if(null!==annyang)annyang.addCallback("soundstart",()=>t(!1)),annyang.addCallback("result",()=>t(!0)),annyang.addCallback("error",()=>t(!0)),annyang.addCallback("end",()=>t(!0)),annyang.addCommands({"show all":()=>document.getElementById("tabs").children[0].click(),"show events":()=>document.getElementById("tabs").children[1].click(),"show section":()=>document.getElementById("tabs").children[2].click(),"show sections":()=>document.getElementById("tabs").children[2].click(),"save (this) (section)":function(){try{const e=document.activeElement.parentNode.parentNode.previousElementSibling.children[0];e.classList.contains("fa")?e.click():e.children[0].classList.contains("fa")&&e.children[0].click()}catch(e){}},"next (event)":e,"post (event)":function(){const t=document.activeElement;if(!t.parentNode.classList.contains("reverse"))return;const n=t.parentNode.children[1];"Posted"!==n.getAttribute("data-content")&&n.click(),e(),saveEvents()},"create (a) (new) post":createPost,"update (the) stats":updateStats,"(add) (create) (a) new event":addEvent,"remove (the) (first) (top) event":removeEvent,"(set) (update) launch time":()=>document.getElementById("launchTime").showModal(),"(set) (update) countdown":()=>document.getElementById("launchTime").showModal(),"(change) (set) youtube (video)":()=>document.getElementById("yt-dialog").showModal(),"(show) (display) info":()=>document.getElementById("info").showModal(),"report (a) bug":()=>window.open("https://github.com/r-spacex/mission-control/issues/new"),"(open) github":()=>window.open("https://github.com/r-spacex/mission-control/"),"(show) source (code)":()=>window.open("https://github.com/r-spacex/mission-control/"),logout:()=>window.location="/logout","sign out":()=>window.location="/logout","(switch) (flip) interface":()=>document.body.classList.toggle("interface-left")}),annyang.start();else{const e=document.getElementById("mic");e.parentElement.removeChild(e)}}function autoRegisterDialog(){document.addEventListener("DOMContentLoaded",()=>{const e=document.body,t="dialog",n=dialogPolyfill.registerDialog;[].forEach.call(e.getElementsByTagName(t),n),new MutationObserver(e=>{e.forEach(e=>{[].forEach.call(e.addedNodes,e=>{e.nodeName.toLowerCase()===t?n(e):e.getElementsByTagName&&[].forEach.call(e.getElementsByTagName(t),n)})})}).observe(e,{childList:!0,subtree:!0})})}function saveIfEnter(e){13===e.keyCode&&saveEvents()}function _tabEvent(e,t){9===e.keyCode&&t.parentElement!==t.parentElement.parentElement.firstElementChild&&(e.preventDefault(),t.parentElement.previousElementSibling.children[3].focus())}function setSign(e){const t=e.value;["+","-"].includes(t[0])&&(e.previousElementSibling.innerHTML=`T${t[0]}`,e.value=t.substr(1))}function updateCountdown(){if(null==window.time||!0===window.hold_scrub)return;const e=document.getElementById("timer"),t=new Date,n=Math.abs(window.time-t),o=window.time>t?"-":"+",a=n/864e5|0,i=n%864e5/36e5|0,s=n%36e5/6e4|0,l=n%6e4/1e3|0,c=n%1e3/100|0;n<61e3&&100!==window.countdown_interval?(clearInterval(window.countdown),window.countdown=setInterval(updateCountdown,100),window.countdown_interval=100):61e3<=n&&n<366e4&&1e3!==window.countdown_interval?(clearInterval(window.countdown),window.countdown=setInterval(updateCountdown,1e3),window.countdown_interval=1e3):366e4<=n&&n<9e7&&6e4!==window.countdown_interval?(clearInterval(window.countdown),window.countdown=setInterval(updateCountdown,6e4),window.countdown_interval=6e4):n>=9e7&&36e5!==window.countdown_interval&&(clearInterval(window.countdown),window.countdown=setInterval(updateCountdown,36e5),window.countdown_interval=36e5);let d;d=a>0?`${a}d ${i}h`:i>0?`${i}h ${s}m`:s>0?`${s}:${l.padStart(2,"0")}`:`${l}.${c}`,e.innerHTML=`T${o}${d}`}function setLaunchTime(e){if(window.time=null==e?null:Date.parse(e),window.hold_scrub=!1,null==window.time){const e=document.getElementById("timer");e.innerHTML="Set launch time",e.classList.add("unset")}else document.getElementById("timer").classList.remove("unset"),updateCountdown();document.getElementById("launchTime").close(),ajax.post("update",{id:"time",value:window.time})}function insertTime(e){if(null!=window.time){const t=e.parentElement.children,n=document.getElementById("timer").innerHTML;t[2].innerHTML=n.slice(0,2),t[3].value=n.includes(".")?n.slice(2,-2):n.slice(2)}}function hotSwap(e){if(!(e instanceof HTMLInputElement))throw"Object must be HTMLInputElement";const t=new RegExp(Object.keys(hotSwapVals).join("|"),"g"),n=e.value.replace(t,e=>hotSwapVals[e]);e.value!==n&&(e.value=n)}function createIntervals(){setInterval(updateStats,3e5),window.countdown=setInterval(updateCountdown,1e3),window.countdown_interval=1e3}function registerMDEs(){document.querySelectorAll("textarea").forEach(e=>{new SimpleMDE({element:e,initialValue:e.getAttribute("data-initial")||"",toolbar:[{name:"save",action:save,className:"fa fa-upload",title:"Save to reddit"},"|","bold","italic","strikethrough","heading","|","quote","unordered-list","ordered-list","|","link","table","horizontal-rule","|","guide"],promptURLs:!0,status:!1,forceSync:!0,spellChecker:!1})}),document.querySelectorAll(".fa-upload").forEach(e=>e.animationend=(()=>e.classList.remove("highlight")))}function emergency(e){const t=addEvent().children,n=e.innerHTML;let o=document.getElementById("timer").innerHTML;["Hold","Scrub"].includes(n)&&(window.hold_scrub=!0),"."===o.substr(-2,1)&&(o=o.slice(0,-2)),null!=window.time&&(t[3].innerHTML=o.slice(0,2),t[4].value="."===o.substr(-2,1)?o.slice(2,-2):o.slice(2)),t[1].setAttribute("data-content","Posted"),t[6].value=messages[n],saveEvents()}function std_message(){addEvent().children[6].value=document.getElementById("events-dropdown").value}function showTab(e){const t=document.querySelectorAll(".tab-events"),n=document.querySelectorAll(".tab-section");document.querySelectorAll("#tabs > *").forEach(e=>e.classList.remove("current")),e.classList.add("current");const o=e.innerHTML,a={events:["Events","All"].includes(o)?"":"none",sections:["Sections","All"].includes(o)?"":"none"};t.forEach(e=>e.style.display=a.events),n.forEach(e=>e.style.display=a.sections)}function createSortable(){Sortable.create(document.getElementById("events"),{handle:".sort-icon",ghostClass:"ui-state-highlight",fallbackTolerance:3})}function datetimeSupport(){const e=document.createElement("input");if(e.setAttribute("type","datetime-local"),"datetime-local"===e.type){const e=document.getElementById("datetime-format");e.parentElement.removeChild(e)}}function removeLoadingModal(){const e=document.getElementById("loader");e.style.opacity=0,setTimeout(()=>e.parentNode.removeChild(e),500),window.noshow||document.getElementById("info").showModal()}async function setYoutube(){const e=document.getElementById("yt-dialog");e.showModal();const t=await new Promise(t=>{e.querySelector("button.update").onclick=(()=>{const n=e.querySelector("input").value.match(/(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=)?([\w-]{11,})/);n&&t(n[1])}),e.querySelector("button.clear").onclick=(()=>t(""))});document.querySelector(".youtube").setAttribute("src",t?`https://youtube.com/embed/${t}?autoplay=0`:""),await ajax.post("update",{id:"video",value:t}),e.close()}const ajax={timeout:3e3,_request:(e,t,n)=>new Promise((o,a)=>{const i=new XMLHttpRequest;i.timeout=ajax.timeout,i.open(e,t),"post"===e&&n instanceof Object&&i.setRequestHeader("Content-type","application/json;charset=UTF-8"),i.onload=function(){200===this.status?o(i.response):a({status:this.status,statusText:i.statusText})},i.onerror=function(){a({status:this.status,statusText:i.statusText})},i.ontimeout=i.onerror;const s=[];for(const e in n)s.push(`${encodeURIComponent(e)}=${encodeURIComponent(n[e])}`);"post"===e.toLowerCase()?i.send(JSON.stringify(n)):i.send(`'?${s.join("&")}`)}),get:(e,t={})=>ajax._request("get",e,t),post:(e,t={})=>ajax._request("post",e,t)},hotSwapVals={":music:":"♫",":tunes:":"♫",":rocket:":"🚀",":sat:":"🛰",":satellite:":"🛰",":sun:":"☀️",":sunny:":"☀️",":cloud:":"☁️",":cloudy:":"☁️",":fog:":"🌫️",":foggy:":"🌫️",":rain:":"🌧️",":rainy:":"🌧️",":thunder:":"⛈️",":lightning:":"⛈️",":yes:":"✔️",":ok:":"️️️✔️",":check:":"✔️",":no:":"❌",":x:":"❌"},messages={RUD:"RUD",Hold:"Hold",Scrub:"Scrub"};autoRegisterDialog(),window.onload=(()=>{registerMDEs(),createSortable(),datetimeSupport(),createIntervals()}),document.onreadystatechange=(()=>{"complete"===document.readyState&&(speechRecognition(),removeLoadingModal())});