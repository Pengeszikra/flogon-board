import { fragment, signal, delay } from './old-bird-soft';
import {assetList} from './shoot';
import {assets} from './asset';


const initialState = {
  run: 0,
  next: 0,
  deck: [],
}

const toolInitState = { 
  x: 0,  y: 0,
  w: 5,  h: 5,
  sheetIndex: 0,
  shoot: [],
  m: 10,
  n: 2,
  scrollSpeed: 0,
};

let scroll = 0;

const spriteBgImg = index => `url(${spriteSheetList[index]})`;

const dice = (side = 6) => Math.random() * side + 1 | 0;

const drawSprite = ({
  x, y, w, h, 
  m = toolInitState.m, 
  n = toolInitState.n, 
  sheetIndex =0
}) => (frg) => {
  frg.style.width = `${w}rem`;
  frg.style.height = `${h}rem`;
  frg.style.backgroundImage = spriteBgImg(sheetIndex);
  frg.style.backgroundSize = `${w * 4 / ( w/5)}rem ${h * 4 / (h /5)}rem`;
  const pos = `${(x/-m) + (w/n)}rem ${(y /-m) + (h/n)}rem`;
  // console.log(pos,x, m, w, n);
  frg.style.backgroundPosition = pos;
}

const toolRender = (tState) => {
  const {x, y, w, h, m, n, sheetIndex, scrollSpeed} = tState;
  sel.style.left =  `calc(${x}px - ${w/2}rem)`;
  sel.style.top =  `calc(${y}px - ${h/2}rem)`;
  sel.style.width = `${w}rem`;
  sel.style.height = `${h}rem`;
  sprite.style.backgroundImage = spriteBgImg(tool.sheetIndex);
  drawSprite(tState)(frg);
  log({m,n, sheetIndex, scrollSpeed})
}; 

const storeSprite = () => {
  // console.log(tool);
  const {x,y,w,h,sheetIndex, shoot} = tool;
  shoot.push({x,y,w,h,sheetIndex})
  const frg = fragment("#mob-o", "#gallery", `frg-${2000 + shoot.length}`);
  drawSprite(tool)(frg);
  frg.style.position = "relative";
  localStorage.setItem('-shoot-', JSON.stringify(shoot));
}

const render = (state, ...rest) => {
  // console.log(state, ...rest)
  // log(state);
  scoreIndicator.innerText = state.run;
  
} 

const state = signal(render)(initialState);
const tool = signal(toolRender)(toolInitState);

globalThis.ss = tool;

const questImageList = Array(357).fill('../mid/flogon')
  .map((fn, idx) => fn + (4000 + idx) + '.jpeg')
  .sort(_ => Math.random() - 0.5);

  const spriteSheetList = Array(33).fill('../sheets/sprite-')
  .map((fn, idx) => fn + (7000 + idx) + '.png')

let counter = 0;
const body = document.querySelector('body');
const visual1 = document.querySelector('#visual-1');
const sprite = document.querySelector('#sprite-sheet');
const sel = document.getElementById('selector');
const debug = document.getElementById('monitor');
const title = document.querySelector('article');
const nextButton = document.querySelector("button");
nextButton.classList.add("hidden")
const scoreIndicator = document.querySelector("#score");
const desk = document.querySelector("#desk");
// const marker = document.querySelector("#marker");

const log = info => debug.innerText = JSON.stringify(info);

let drag = false;
// sel.onclick = e => {e.preventDefault();drag = !drag;};

/** @type {(e:MouseEvent) => void} */
sprite.onmousemove = (e) => {
  if (!drag) return;
  e.preventDefault();
  const {screenX, screenY, clientX, clientY, offsetX, offsetY} = e;
  
  tool.x = offsetX;
  tool.y = offsetY;
} 

const titleAnim = (goIn) => title.style.left = goIn ? '0' : '100vw' ;

const nextDay = () => {
  state.run = 0;
  const img = questImageList[counter % questImageList.length];
 //  const sheet = spriteSheetList[counter % spriteSheetList.length];
  
  visual1.style.backgroundImage = `url(${img})`;
  counter ++ ;
};

const toggleUI = () => {
  frg.classList.toggle("hidden");
  sprite.classList.toggle("hidden");
  debug.classList.toggle("hidden");
  sel.classList.toggle("hidden");
  visual1.classList.toggle("hidden");
  // nextButton.classList.add("hidden");
  scoreIndicator.classList.add("hidden");
  desk.classList.toggle("hidden");
}

nextButton.onclick = nextDay;
nextDay();

/** @type {HTMLElement} */
document.querySelector("#left-side").onclick = () => tool.scrollSpeed = + 1;
document.querySelector("#center-area").onclick = () => tool.scrollSpeed = 0;
document.querySelector("#right-side").onclick = () => tool.scrollSpeed = - 1;

document.addEventListener("keydown", 
  /** @type {(e:KeyboardEvent) => void} */
  (e) => {
    const {key, altKey, ctrlKey, shiftKey} = e;
    const shortKey = {key, altKey, ctrlKey, shiftKey};
    
    // log(shortKey);
    switch (key) {
      case "c": return drag = !drag; 
      case ",": return titleAnim(true);
      case ".": return titleAnim(false);
      case "n": 
        scoreIndicator.classList.remove('hidden');
        // nextButton.classList.remove("hidden");
        return nextDay();
      case "z": return toggleUI();
      case "[": return selectSheet(-1);
      case "]": return selectSheet(+1);
      case "a": return tool.w = (+ tool.w - 0.1).toFixed(2);
      case "w": return tool.h = (+ tool.h - 0.1).toFixed(2);
      case "s": return tool.h = (+ tool.h + 0.1).toFixed(2);
      case "d": return tool.w = (+ tool.w + 0.1).toFixed(2);
      case "A": return tool.w = (+ tool.w - 1).toFixed(2);
      case "W": return tool.h = (+ tool.h - 1).toFixed(2);
      case "S": return tool.h = (+ tool.h + 1).toFixed(2);
      case "D": return tool.w = (+ tool.w + 1).toFixed(2);
      case "j": return tool.m ++;
      case "h": return tool.m --;
      case "k": return tool.n ++;
      case "l": return tool.n --;
      case "v": return storeSprite();
      case ";": return tool.scrollSpeed = + 1;
      case "'": return tool.scrollSpeed = - 1;
      case "\\": return tool.scrollSpeed = 0;
      case "o": return cardTryToEscape(dice(state.deck.length-1));
    }
  }
);


globalThis.state = state;

const selectSheet = (direction) => {
  tool.sheetIndex = Math.abs(tool.sheetIndex + direction) % spriteSheetList.length;
}

// const addRun = () => state.run += dice(12);
// const ts = setInterval(() => state.run ++, 100)

const frg = fragment("#mob-o", "#gallery", "frg-2000");
frg.style.position = 'relative';
frg.classList.add("hidden");

state.deck = Array(23).fill(0).map((_, idx) => {
  const crd = fragment("#card", "#desk", `crd-${9000 + idx}`);
  drawSprite(assetList[idx])(crd);
  const order = idx * 16 - (16 * 12);
  crd.style.transform = `translateX(${order}rem) translateY(22rem) scale(3)`;
  crd.onclick = () => state.run += dice(9);
  return [crd, order];
});

const flyOut = (x) => [
  `translateX(${x}rem) translateY(22rem) scale(3) rotateX(-50deg) translateZ(-2rem)`,
  `translateX(${x}rem) translateY(-22rem) scale(3) rotateX(-50deg) translateZ(-2rem)`, 
  `translateX(${x}rem) translateY(-22rem) scale(3) translateZ(-4rem) rotateX(-60deg)`,
  `translateX(${x}rem) translateY(-22rem) scale(3) translateZ(20rem) rotateX(-80deg)`,
  `translateX(${x}rem) translateY(10rem) scale(3) translateZ(20rem) rotateX(-60deg)`,
  `translateX(${x}rem) translateY(8rem) scale(3) translateZ(20rem) rotateX(-60deg)`,
  `translateX(${x}rem) translateY(10rem) scale(3) translateZ(20rem) rotateX(-55deg)`,
  `translateX(${x}rem) translateY(12rem) scale(3) translateZ(20rem) rotateX(-60deg)`,
  `translateX(${x}rem) translateY(10rem) scale(3) translateZ(20rem) rotateX(-65deg)`,
  `translateX(${x}rem) translateY(70rem) scale(3) translateZ(-80rem) rotateX(-60deg)`,
]
  

const cardTryToEscape = async(who) => {
  /** @type {[HTMLElement, number]} */
  const [escape, x] = state.deck[who];
  const sequence = [...flyOut(x)];
  setInterval(() => {
  const ani = sequence.shift();
    escape.style.transition = `transform 300ms linear`;
    escape.style.transform = ani;
  }, 300);
};

[
  ...assets,
  ...assets,
  ...assets,
  ...assets
].map((src, idx) => {
  const frg = fragment("#mob", "#desk", `frg-${5000 + idx}`);
  drawSprite(src)(frg);
  frg.style.outline = "none;"
  frg.style.transform = `
    translateX(${dice(400)-200}rem)
    translateY(${dice(70)-10}rem)
    translateZ(${dice(10)}rem)
    scale(2)
    rotateX(-50deg)
  `;
})

globalThis.desk = desk


const deskMotion = (x) => {
  
   const trans = `
    perspective(60vh)
    translateX(${x}px)
    translateZ(0px)
    rotateX(40deg)
    rotateY(0deg)
    rotateZ(0deg)
    scale(.64)
    `
    // rotateX(${x/2}deg)
    desk.style.transform = trans;
}

globalThis.dm = deskMotion;

const invScroll = setInterval(() => {
  if (!tool.scrollSpeed) return;
  deskMotion(scroll -= tool.scrollSpeed)
  state.run = -scroll;
}, 5);

body.onmouseleave = () => {
  state.bdrag = false;
}
