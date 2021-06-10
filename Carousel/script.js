const carousel=document.querySelector(".carousel");
const slidesCont=document.querySelector(".slides");
const slides=Array.from(slidesCont.children);
const dots=Array.from(carousel.querySelector(".dots").children);
const left = document.querySelector("#leftb");
const right = document.querySelector("#rightb");

function removeAllAndAdd(src, toremove, index, toadd){
    src.forEach((item, i)=>{
        item.classList.remove(toremove);
    });
    src[index].classList.add(toadd);
}

function enableOrDisable(cur) {
    if(cur==0){
        left.classList.remove("clickable");
        return;
    }
    if(cur==slides.length-1){
        right.classList.remove("clickable");
        return;
    }
    if(!left.classList.contains("clickable"))   left.classList.add("clickable");
    if(!right.classList.contains("clickable"))   right.classList.add("clickable");
}

function makeMove(e, i) {
    let cur = slides.findIndex((slide,i)=>slide.classList.contains('current'));

    if(e.srcElement.classList.contains("dot")){
        cur=i;
    }

    if(e.srcElement.id == "leftb"){
        if(cur==0) return;
        else    cur--;
    }

    if(e.srcElement.id == "rightb"){
        if(cur==slides.length-1) return;
        else    cur++;
    }

    removeAllAndAdd(slides, "current", cur, "current")
    removeAllAndAdd(dots, "curDot", cur, "curDot")
    enableOrDisable(cur)
}

left.addEventListener('click',(e)=>makeMove(e, 0));
right.addEventListener('click',(e)=>makeMove(e, 0));
dots.forEach((item,i)=>item.addEventListener('click',(e)=>makeMove(e, i)));
enableOrDisable(0);