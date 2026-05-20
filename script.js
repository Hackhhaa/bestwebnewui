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

}

/* REMOVE DUP */

function removeDup(){

let lines=document.getElementById("result").value
.split("\n")
.filter(x=>x.trim()!=="")

let unique=[...new Set(lines)]

document.getElementById("result").value=unique.join("\n")

updateCount()

}

/* COPY */

function copyResult(){

let text=document.getElementById("result").value

navigator.clipboard.writeText(text)

}

/* COUNT */

function updateCount(){

let lines=document.getElementById("result").value
.split("\n")
.filter(x=>x)

document.getElementById("count").innerText=
"Acc checking done : "+lines.length

}

/* SAVE TXT */

function saveTxt(){

let text=document.getElementById("result").value

let blob=new Blob([text],{type:"text/plain"})

let a=document.createElement("a")

a.href=URL.createObjectURL(blob)

a.download="result.txt"

a.click()

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