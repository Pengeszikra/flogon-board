
const questImageList = Array(357).fill('../mid/flogon')
  .map((fn, idx) => fn + (4000 + idx) + '.jpeg')
  .sort(_ => Math.random() - 0.5);
const spriteSheetList = Array(25).fill('../sheets/sprite-')
  .map((fn, idx) => fn + (7000 + idx) + '.png')
  .sort(_ => Math.random() - 0.5);

let counter = 0;
const body = document.querySelector('body');
const sprite = document.querySelector('figure');

const nextDay = () => {
  const img = questImageList[counter % questImageList.length];
  const sheet = spriteSheetList[counter % spriteSheetList.length];
  
  body.style.backgroundImage = `url(${img})`;
  sprite.style.backgroundImage = `url(${sheet})`;

  counter ++ ;
};

document.querySelector('button').onclick = nextDay;

nextDay();