
const questImageList = Array(357).fill('../mid/flogon')
  .map((fn, idx) => fn + (4000 + idx) + '.jpeg')
  .sort(_ => Math.random() - 0.5);

let counter = 0;

const nextDay = () => {
  const img = questImageList[counter % questImageList.length];
  document.querySelector('body').style.backgroundImage = `url(${img})`;
  counter ++ ;
};

document.querySelector('button').onclick = nextDay;

nextDay();