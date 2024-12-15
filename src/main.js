import { signal } from './old-bird-soft';

const dice = (side = 6) => Math.random() * side + 1 | 0;

const questImageList = Array(357).fill('../mid/flogon')
  .map((fn, idx) => fn + (4000 + idx) + '.jpeg')
  .sort(_ => Math.random() - 0.5);

  const spriteSheetList = Array(23).fill('../sheets/sprite-')
  .map((fn, idx) => fn + (7000 + idx) + '.png')
  .sort(_ => Math.random() - 0.5);

let counter = 0;
const body = document.querySelector('body');
const sprite = document.querySelector('figure');
const sel = document.getElementById('selector');
const debug = document.getElementById('monitor');
const title = document.querySelector('article');

const log = info => debug.innerText = JSON.stringify(info);

let drag = false;
sel.onclick = e => {
  e.preventDefault()
  drag = !drag;
};
body.onmousemove = (e) => {
  if (!drag) return;
  e.preventDefault();
  // console.log(e)
  // debug.innerText = JSON.stringify({dice: Array(10).fill().map(dice)});
  const {screenX, screenY, clientX, clientY} = e;
  log({screenX, screenY, clientX, clientY});
  sel.style.left =  `calc(${clientX}px - 2.5rem)`
  sel.style.top =  `calc(${clientY}px - 2.5rem)`
}


const nextDay = () => {
  let stopAnim;
  clearTimeout(stopAnim);
  const img = questImageList[counter % questImageList.length];
  const sheet = spriteSheetList[counter % spriteSheetList.length];
  
  body.style.backgroundImage = `url(${img})`;
  sprite.style.backgroundImage = `url(${sheet})`;

  title.style.left = '100vw'
  stopAnim = setTimeout(_ => title.style.left = '0', 2000);

  counter ++ ;
};

document.querySelector('button').onclick = nextDay;

nextDay();

document.addEventListener("keydown", 
  /** @type {(e:KeyboardEvent) => void} */
  (e) => {
    const {key, altKey, ctrlKey, shiftKey} = e;
    const shortKey = {key, altKey, ctrlKey, shiftKey};
    log(shortKey);
    console.log(shortKey);
    if (key === "[") { foo --; }
    if (key === "]") { foo ++; }
    if (key === "0") { document.location = "/marker.html"; }
  }
);

const foo = signal(log, {foo: 42});