const t=document.querySelector("body"),e=document.querySelector("[data-start]"),r=document.querySelector("[data-stop]");let o=null;e.addEventListener("click",(function(){o=setInterval((()=>{t.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),e.setAttribute("disabled",!0)})),r.addEventListener("click",(function(){clearInterval(o),e.removeAttribute("disabled")}));
//# sourceMappingURL=01-color-switcher.93528421.js.map
