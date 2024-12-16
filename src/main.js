import { fragment, signal } from './old-bird-soft';
import {assetList} from './shoot';

const initialState = {
  run: 0,
  next: 0,
}

const toolInitState = { 
  x: 0,  y: 0,  w: 5,  h: 5,
  sheetIndex: 0,
  shoot: [],
  m: 14,
  n: 3,
};



const dice = (side = 6) => Math.random() * side + 1 | 0;

const toolRender = ({x, y, w, h, m, n}) => {
  sel.style.left =  `calc(${x}px - ${w/2}rem)`;
  sel.style.top =  `calc(${y}px - ${h/2}rem)`;
  sel.style.width = `${w}rem`;
  sel.style.height = `${h}rem`;
  sprite.style.backgroundImage = `url(${spriteSheetList[tool.sheetIndex]})`;
  
  frg.style.width = `${w}rem`;
  frg.style.height = `${h}rem`;

  frg.style.backgroundSize = `${w * 4 / ( w/5)}rem ${h * 4 / (h /5)}rem`;
  frg.style.backgroundPosition = `${(x/-m) + (w/n)}rem ${(y /-m) + (h/n)}rem`;
  log({m,n})
}; 

const storeSprite = () => {
  console.log(tool);
  const {x,y,w,h,sheetIndex} = tool;
  tool.shoot.push({x,y,w,h,sheetIndex})
}

const render = (state, ...rest) => {
  // console.log(state, ...rest)
  log(state);
  scoreIndicator.innerText = state.run;
  
} 

const state = signal(render)(initialState);
const tool = signal(toolRender)(toolInitState);

globalThis.ss = tool;

const questImageList = Array(357).fill('../mid/flogon')
  .map((fn, idx) => fn + (4000 + idx) + '.jpeg')
  .sort(_ => Math.random() - 0.5);

  const spriteSheetList = Array(23).fill('../sheets/sprite-')
  .map((fn, idx) => fn + (7000 + idx) + '.png')

let counter = 0;
const body = document.querySelector('body');
const visual1 = document.querySelector('#visual-1');
const sprite = document.querySelector('#sprite-sheet');
const sel = document.getElementById('selector');
const debug = document.getElementById('monitor');
const title = document.querySelector('article');
const nextButton = document.querySelector("button");
const scoreIndicator = document.querySelector("#score");
// const marker = document.querySelector("#marker");

const log = info => debug.innerText = JSON.stringify(info);

let drag = false;
// sel.onclick = e => {e.preventDefault();drag = !drag;};

/** @type {(e:MouseEvent) => void} */
sprite.onmousemove = (e) => {
  if (!drag) return;
  e.preventDefault();
  const {screenX, screenY, clientX, clientY, offsetX, offsetY} = e;
  log({screenX, screenY, clientX, clientY, offsetX, offsetY});
  
  tool.x = offsetX;
  tool.y = offsetY;

  // sel.style.left =  `calc(${offsetX}px - 2.5rem)`
  // sel.style.top =  `calc(${offsetY}px - 2.5rem)`
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
  sprite.classList.toggle("hidden");
  debug.classList.toggle("hidden");
  sel.classList.toggle("hidden");
  visual1.classList.toggle("hidden");
  nextButton.classList.add("hidden");
  scoreIndicator.classList.add("hidden");
}

nextButton.onclick = nextDay;
nextDay();

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
        nextButton.classList.remove("hidden");
        return nextDay();
      case "z": 
        clearInterval(ts);
        return toggleUI();
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
    }
  }
);


globalThis.state = state;

const selectSheet = (direction) => {
  tool.sheetIndex = Math.abs(tool.sheetIndex + direction) % spriteSheetList.length;
}

const addRun = () => state.run += dice(12);

const ts = setInterval(() => state.run ++, 100)

const frg = fragment("#mob", "body", "frg-2200");
globalThis.frg = frg;
globalThis.assetList = assetList;
