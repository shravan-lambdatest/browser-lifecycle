//src="https://www.youtube.com/embed/tgbNymZ7vqY"
let count = 0;
let newtime = (new Date()).getTime();
const getState = () => {
  if (document.visibilityState === 'hidden') {
    return 'hidden';
  }
  if (document.hasFocus()) {
    return 'active';
  }
  return 'passive';
};
document.onfreeze = (e) => {
  console.log("Main, Worker event: Freeze");
};
document.addEventListener('resume', (event) => {
  console.log("Main, Worker event: Resume");
});
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    console.log("Main, Worker event: visibilityChange - visible");
  } else {
    console.log("Main, Worker event: visibilityChange - hidden");
  }
});
window.addEventListener('focus', (event) => {
  console.log("Main, Worker event: focus", event);
});

window.addEventListener('blur', (event) => {
  console.log("Main, Worker event: blur", event);
});

setInterval(()=> {
    time = newtime;
    newtime = (new Date()).getTime();
    console.log("Main: Interval", Math.round((newtime - time)/1000), "Count", ++count, "State", getState())
}, 3000);

function testWorker() {
  let count = 0;
  let newtime = (new Date()).getTime();
  setInterval(()=> {
      time = newtime;
      newtime = (new Date()).getTime();
      console.log("Worker: Interval", Math.round((newtime - time)/1000), "Count", ++count);
  }, 3000);
}

const worker = new Worker(URL.createObjectURL(new Blob(["("+testWorker.toString()+")()"], {type: 'text/javascript'})));;

