

function locomotive(){
gsap.registerPlugin(ScrollTrigger);
// --- SETUP START ---
// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
// ScrollTrigger.defaults({ scroller: "#main" });
// --- SETUP END ---
// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}

function canvas(){
    
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");            //every 2D tool of canvas is stored here.

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});

function files(index) {
  var data = [];
  for(let i=1;i<=300;i++){
    if(i<=9){
        data.push(`assets/CYBERFICTION-IMAGES/male000${i}.png`);
    }
    else if(i>=10 && i<=99){
        data.push(`assets/CYBERFICTION-IMAGES/male00${i}.png`);
    }
    else if(i>=100 && i<=300){
        data.push(`assets/CYBERFICTION-IMAGES/male0${i}.png`);
    }
  }
  return data[index];
}

const frameCount = 300;

const images = [];
const imageSeq = {
  frame: 1,
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = files(i);
  images.push(img);
}

gsap.to(imageSeq, {
  frame: frameCount - 1,
  snap: "frame",
  ease: `none`,
  scrollTrigger: {
    scrub: 0.15,
    trigger: `#page0>canvas`,
    //   set start end according to preference
    start: `top top`,
    end: `600% top`,
    scroller: `#main`,
  },
  onUpdate: render,
});

images[1].onload = render;          //jab image load hogi tab start mai konsi image shown karni hai, is the meaning of this line.

function render() {
  scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.max(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;           //KEEPS IMAGE IN THE CENTER OF SCREEN ON X AXIS
  var centerShift_y = (canvas.height - img.height * ratio) / 2;         //....................................ON Y AXIS
  ctx.clearRect(0, 0, canvas.width, canvas.height);         //HELPS TO CLEAR PERVIOUS IMAGE.
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}

//THIS IS USE TO ADD SCROLLTRIGGER WITHOUT USING GSAP,
//IT CAN ALSO BE WRITTEN USING GSAP.
ScrollTrigger.create({

  trigger: "#page0>canvas",
  pin: true,
  // markers:true,
  scroller: `#main`,
//   set start end according to preference
  start: `top top`,
  end: `600% top`,
});

gsap.to("#page1",{
  scrollTrigger:{
    trigger:`#page1`,
    start:`top top`,
    end:`bottom top`,
    pin:true,                   // USE TO PIN CANVAS (SO THAT WHEN PAGE 3'S BOTTOM COMES THE CANAVAS'S 300TH FRAME IS EXECUTED (I.E CANAVAS IS FULLY DISPLAYED )
    //                             IF SET TO FALSE THE ONLY 200-250 FRAMES WILL BE EXECUTED
    scroller:`#main`
  }
});
gsap.to("#page2",{
  scrollTrigger:{
    trigger:`#page2`,
    start:`top top`,
    end:`bottom top`,
    pin:true,                   // USE TO PIN CANVAS (SO THAT WHEN PAGE 3'S BOTTOM COMES THE CANAVAS'S 300TH FRAME IS EXECUTED (I.E CANAVAS IS FULLY DISPLAYED )
    //                             IF SET TO FALSE THE ONLY 200-250 FRAMES WILL BE EXECUTED
    scroller:`#main`
  }
});
gsap.to("#page3",{
  scrollTrigger:{
    trigger:`#page3`,
    start:`top top`,
    end:`bottom top`,
    pin:true,                   // USE TO PIN CANVAS (SO THAT WHEN PAGE 3'S BOTTOM COMES THE CANAVAS'S 300TH FRAME IS EXECUTED (I.E CANAVAS IS FULLY DISPLAYED )
    //                             IF SET TO FALSE THE ONLY 200-250 FRAMES WILL BE EXECUTED
    scroller:`#main`
  }
  });
}
locomotive();
canvas();
window.addEventListener("load",()=>{
    let loaderDiv = document.querySelector("#loader");
    loaderDiv.style.opacity = "0";
    // loaderDiv.style.height = "0%";
    loaderDiv.style.width = "0%";
    loaderDiv.style.zIndex = "0";
})
