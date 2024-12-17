import { fragment, signal } from './old-bird-soft';
import {assetList} from './shoot';
import {assets} from './asset';

const initialState = {
  run: 0,
  score: 0,
  scoreTo: 0,
  deck: [],
}

const toolInitState = { 
  x: 0,  y: 0,
  w: 5,  h: 5,
  sheetIndex: 0,
  shoot: [],
  m: 10, // important number for sprite editor 
         // which is depend on main font size, currently: 10px;
  n: 2,  // less importan the 2 is always seems good.
         // figure out by number tweak
  scrollSpeed: 0,
};

let scroll = 0;
const tableSpeed = 4;
const HIDDEN = "hidden";

const spriteBgImg = index => `url(${spriteSheetList[index]})`;

const dice = (side = 6) => Math.random() * side + 1 | 0;
// const rnd = (side = 6) => Math.random() * side | 0;

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
  const {x,y,w,h,sheetIndex, shoot} = tool;
  shoot.push({x,y,w,h,sheetIndex})
  const frg = fragment("#mob-o", "#gallery", `frg-${2000 + shoot.length}`);
  drawSprite(tool)(frg);
  frg.style.position = "relative";
  localStorage.setItem('-shoot-', JSON.stringify(shoot));
}

const render = (state, ...rest) => {;
  scoreIndicator.innerText = state.run;
  highScore.innerText = state.scoreTo;
} 

const state = signal(render)(initialState);
const tool = signal(toolRender)(toolInitState);

const questImageList = Array(357).fill('../mid/flogon')
  .map((fn, idx) => fn + (4000 + idx) + '.jpeg')
  .sort(_ => Math.random() - 0.5);

  const spriteSheetList = Array(34).fill('../sheets/sprite-')
  .map((fn, idx) => fn + (7000 + idx) + '.png')

let counter = 0;
const body = document.querySelector('body');
const visual1 = document.querySelector('#visual-1');
const sprite = document.querySelector('#sprite-sheet');
const sel = document.getElementById('selector');
const debug = document.getElementById('monitor');
const title = document.querySelector('article');
const nextButton = document.querySelector("button");
nextButton.classList.add(HIDDEN)
const scoreIndicator = document.querySelector("#score");
const highScore = document.querySelector("#high-score");
const desk = document.querySelector("#desk");

const log = info => debug.innerText = JSON.stringify(info);

let drag = false;

/** @type {(e:MouseEvent) => void} */
sprite.onmousemove = (e) => {
  if (!drag) return;
  e.preventDefault();
  const {offsetX, offsetY} = e;
  // screenX, screenY, clientX, clientY, 
  tool.x = offsetX;
  tool.y = offsetY;
} 

const titleAnim = (goIn) => title.style.left = goIn ? '0' : '100vw' ;

const nextDay = () => {
  state.run = 0;
  const img = questImageList[counter % questImageList.length];
  
  visual1.style.backgroundImage = `url(${img})`;
  counter ++ ;
};

const toggleUI = () => {
  frg.classList.contains(HIDDEN)
    ? body.classList.add("bg-sky-500")
    : body.classList.add("bg-black");
  frg.classList.toggle(HIDDEN);
  sprite.classList.toggle(HIDDEN);
  debug.classList.toggle(HIDDEN);
  sel.classList.toggle(HIDDEN);
  visual1.classList.toggle(HIDDEN);
  // nextButton.classList.add(HIDDEN);
  scoreIndicator.classList.add(HIDDEN);
  highScore.classList.add(HIDDEN)
  desk.classList.toggle(HIDDEN);
}

nextButton.onclick = nextDay;
nextDay();

/** @type {HTMLElement} */
document.querySelector("#left-side").onclick = () => tool.scrollSpeed = + tableSpeed;
document.querySelector("#center-area").onclick = () => {
  callCard();
  tool.scrollSpeed = 0;
}
document.querySelector("#right-side").onclick = () => tool.scrollSpeed = - tableSpeed;

document.addEventListener("keydown", 
  /** @type {(e:KeyboardEvent) => void} */
  (e) => {
    const {key, altKey, ctrlKey, shiftKey} = e;
    // const shortKey = {key, altKey, ctrlKey, shiftKey};
    
    // log(shortKey);
    switch (key) {
      case "c": return drag = !drag; 
      case ",": return titleAnim(true);
      case ".": return titleAnim(false);
      case "n": return nextDay();
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
      case ";": return tool.scrollSpeed = + tableSpeed;
      case "'": callCard(); return tool.scrollSpeed =   0;
      case "\\": return tool.scrollSpeed = - tableSpeed;
    }
  }
);

const callCard = () => {
  const [id] = centerCard() || [];
  try {
    state.deck[id].isInHand = false;
    const who = state.deck[id];
    return cardTryToEscape(who);
  } catch (error) { 
    // E N D
  }
}

const selectSheet = (direction) => {
  tool.sheetIndex = Math.abs(tool.sheetIndex + direction) % spriteSheetList.length;
}

const frg = fragment("#mob-o", "#gallery", "frg-2000");
frg.style.position = 'relative';
frg.classList.add(HIDDEN);

/** 
 * @typedef {{
 *  id: string
 *  crd: HTMLElement
 *  order: number
 *  score: number
 *  isInHand: Boolean
 * }} Card 
 */

state.deck = Object.fromEntries(Array(23).fill(0).map((_, idx) => {
  const id = `crd-${9000 + idx}`;
  const crd = fragment("#card", "#desk", id);
  drawSprite(assetList[idx])(crd);
  const order = idx * 16 - (16 * 12);
  crd.style.transform = `translateX(${order}rem) translateY(22rem) scale(3)`;
  crd.onclick = () => state.run += dice(9);
  const score = dice(50) * 10 + 10;
  return [id, {crd, order, score,  isInHand: true}];
}));

const flyOut = (x) => [
  `translateX(${x}rem) translateY(-22rem) scale(3) rotateX(-50deg)    translateZ(-2rem)`, 
  `translateX(${x}rem) translateY(-22rem) scale(3) translateZ(-4rem)  rotateX(-60deg)`,
  `translateX(${x}rem) translateY(-22rem) scale(3) translateZ(20rem)  rotateX(-80deg)`,
  `translateX(${x}rem) translateY(10rem)  scale(3) translateZ(20rem)  rotateX(-60deg)`,
  `translateX(${x}rem) translateY(8rem)   scale(3) translateZ(20rem)  rotateX(-60deg)`,
  `translateX(${x}rem) translateY(10rem)  scale(3) translateZ(20rem)  rotateX(-55deg)`,
  `translateX(${x}rem) translateY(12rem)  scale(3) translateZ(20rem)  rotateX(-60deg)`,
  `translateX(${x}rem) translateY(10rem)  scale(3) translateZ(20rem)  rotateX(-65deg)`,
  `translateX(${x}rem) translateY(70rem)  scale(3) translateZ(-80rem) rotateX(-60deg)`,
]
  
/** @type {(who:Card) => void} */
const cardTryToEscape = async(who) => {
  const cardSpeed = 200;
  const {crd, order} = who;
  const sequence = [...flyOut(order)];
  const stop = setInterval(() => {
    const ani = sequence.shift();
    crd.style.transition = `transform ${cardSpeed}ms linear`;
    crd.style.transform = ani;
    if (sequence.length === 7) { state.score += dice(10) * 10;}
    if (!sequence.length) {clearInterval(stop)}
  }, cardSpeed);
};

[
  ...assets,
  ...assets,
  ...assets,
  // ...assets
].map((src, idx) => {
  const frg = fragment("#mob", "#desk", `frg-${5000 + idx}`);
  drawSprite(src)(frg);
  frg.style.outline = "none;"
  frg.style.transform = `
    translateX(${dice(400)-200}rem)
    translateY(${dice(50)-10}rem)
    translateZ(${dice(-7) - 3}rem)
    scale(2)
    rotateX(-50deg)
  `;
})

const deskMotion = (x) => {
   const trans = `
    perspective(60vh)
    translateX(${x}px)
    translateZ(0px)
    rotateX(40deg)
    rotateY(0deg)
    rotateZ(0deg)
    scale(.64)
    `;
    desk.style.transform = trans;
}

setInterval(() => {
  if (!tool.scrollSpeed) return;
  deskMotion(scroll -= tool.scrollSpeed)
  state.run = -scroll;
}, 5);

body.onmouseleave = () => {
  state.bdrag = false;
}

const highScoreAnim = () => {
  if (state.scoreTo < state.score) state.scoreTo += 5;  
  requestAnimationFrame(highScoreAnim);
}
requestAnimationFrame(highScoreAnim);

// new Audio('../media/James-8000.mp3').play();

const closeToCenter = (pos, center) => Math.abs(center - (pos.left + pos.width / 2));
/** @type {() => Card} */
const centerCard = () => {
  const center = window.innerWidth / 2;
  const inHand = Object
    .entries(state.deck)
    .filter(([,{isInHand}]) => isInHand)
  if (inHand.length < 1) return; // E N D
  return inHand
    .reduce((col, itm) => {
      const itmPos = closeToCenter(itm[1].crd.getBoundingClientRect(), center);
      const colPos = closeToCenter(col[1].crd.getBoundingClientRect(), center);
      return itmPos < colPos
        ? itm
        : col
    });
}