/* LOADING */

window.onload=function(){

setTimeout(()=>{

document.getElementById("loading").style.display="none"

},1800)

}

/* TAB */

function showTab(tabId){

document.querySelectorAll(".tab-content")
.forEach(tab=>{

tab.classList.remove("active-tab")

})

document.getElementById(tabId)
.classList.add("active-tab")

}

/* DETECT */

function detect(line){

if(line.includes(":")) return ":"

if(line.includes("|")) return "|"

if(line.includes(";")) return ";"

return ":"

}

/* CONVERT */

function convert(){

let data=document.getElementById("input").value.split("\n")

let mode=document.getElementById("mode").value

let out=[]

data.forEach(line=>{

line=line.trim()

if(!line) return

let sep=detect(line)

let p=line.split(sep)

if(mode==="userpass" && p.length>=2)
out.push(p[0]+":"+p[1])

if(mode==="user")
out.push(p[0])

if(mode==="pass" && p.length>=2)
out.push(p[1])

})

document.getElementById("result").value=out.join("\n")

updateCount()

notify("Convert Complete ✅")

}

/* REMOVE DUP */

function removeDup(){

let lines=document.getElementById("result").value
.split("\n")
.filter(x=>x.trim()!=="")

let unique=[...new Set(lines)]

document.getElementById("result").value=unique.join("\n")

updateCount()

notify("Duplicates Removed 🗑")

}

/* COPY */

function copyResult(){

let text=document.getElementById("result").value

navigator.clipboard.writeText(text)

notify("Copied Result 📋")

}

/* SAVE TXT */

function saveTxt(){

let text=document.getElementById("result").value

let blob=new Blob([text],{type:"text/plain"})

let a=document.createElement("a")

a.href=URL.createObjectURL(blob)

a.download="result.txt"

a.click()

notify("TXT Saved 💾")

}

/* COUNT */

function updateCount(){

let lines=document.getElementById("result").value
.split("\n")
.filter(x=>x)

document.getElementById("count").innerText=
"Acc checking done : "+lines.length

}

/* AUTO */

function autoConvert(text){

document.getElementById("input").value=text

convert()

}

/* FILE */

document.getElementById("fileInput")
.addEventListener("change",function(){

const file=this.files[0]

if(!file) return

const reader=new FileReader()

reader.onload=function(e){

autoConvert(e.target.result)

}

reader.readAsText(file)

})

/* DRAG DROP */

const dropZone=document.getElementById("dropZone")

dropZone.addEventListener("dragover",(e)=>{

e.preventDefault()

})

dropZone.addEventListener("drop",(e)=>{

e.preventDefault()

const file=e.dataTransfer.files[0]

if(!file) return

const reader=new FileReader()

reader.onload=function(e){

autoConvert(e.target.result)

}

reader.readAsText(file)

})

/* CLOCK */

setInterval(()=>{

let now=new Date()

let h=String(now.getHours()).padStart(2,"0")

let m=String(now.getMinutes()).padStart(2,"0")

let s=String(now.getSeconds()).padStart(2,"0")

document.getElementById("clock")
.innerText=`${h}:${m}:${s}`

},1000)

/* ONLINE USERS */

setInterval(()=>{

let random=Math.floor(
Math.random()*1+3
)

document.getElementById("onlineCount")
.innerText=random

},3000)

/* TOGGLE */

function toggleSwitch(el){

el.classList.toggle("active")

if(el.parentElement.innerText.includes("RGB")){

document.body.classList.toggle("rgb-mode")

}

}

/* NOTIFICATION */

function notify(text){

let div=document.createElement("div")

div.className="notify"

div.innerText=text

document.body.appendChild(div)

setTimeout(()=>{

div.remove()

},3000)

}