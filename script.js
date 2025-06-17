var timeout;


const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

// animation for first page
function firstPageAnim(){
    var t1 = gsap.timeline();
    t1.from('#nav',{
        y:'-10',
        opacity:0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
    .to('.boundingelem',{
        y:'0',
        duration: 1,
        ease: Expo.easeInOut,
        delay: -1,
        // delay in different element
        stagger: .2
    })
    .from("#herofooter",{
        y:"-10",
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    })
}

function circleChaptaKaro(){
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;


    window.addEventListener("mousemove", function(dets) {
           clearTimeout(timeout);

        // console.log(gsap.utils.clamp(.8, 1.2, dets.clientX - xprev));
        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale, yscale);

        // ye timeout function islye  banega kuki jab b mouse chlna band hoga tb vo scale x or y ka 1 1 ho jayega or vo normal circle ban jayega
        timeout = setTimeout(function () {
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100);
    });
}


// mouse k sath ball ka chlna
function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove", function(dets){
    this.document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
}

circleMouseFollower();
firstPageAnim();
circleChaptaKaro();

// photos k lye ...teeno elemt ko alag kro 
// 3no per mousemove lgao
// mouse pta kro kaha h 
// x t psotion pta kro kaha 
// x y psotion per image ko move kero

// teeno element ko sleect karo, uske baad teeno par ek mousemove lagao, jab mousemove ho to ye pata karo ki mouse kaha par hai, jiska matlab hai mouse ki x and y position pata karo, ab mouse ki x y position ke badle us image ko show karo and us image ko move karo, move karte waqt rotate karo, and jaise jaise mouse tez chale waise waise rotation bhi tez ho jaye

document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;
  
    elem.addEventListener("mouseleave", function (dets) {
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
      });
    });
  
    elem.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - elem.getBoundingClientRect().top;
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;
      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
      });
    });
  });