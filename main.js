const canvas = document.getElementById('memeCanvas');
const ctx = canvas.getContext('2d');
const imgFile = document.getElementById('imgfile');
const topInput = document.getElementById('topText');
const bottomInput = document.getElementById('bottomText');
const fontSizeInput = document.getElementById('fontSize');
const alignSelect = document.getElementById('align');
const outlineSelect = document.getElementById('outline');
const genBtn = document.getElementById('genBtn');
const downloadBtn = document.getElementById('downloadBtn');
const clearBtn = document.getElementById('clearBtn');

let baseImage = new Image();

function drawMeme() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (baseImage.complete && baseImage.src) {
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  }

  const fontSize = parseInt(fontSizeInput.value);
  const align = alignSelect.value;
  const outline = outlineSelect.value === 'true';

  ctx.font = `bold ${fontSize}px Impact`;
  ctx.textAlign = align;
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = fontSize / 10;

  const topText = topInput.value.toUpperCase();
  const bottomText = bottomInput.value.toUpperCase();

  // Top text
  if (outline) ctx.strokeText(topText, canvas.width / 2, fontSize + 10);
  ctx.fillText(topText, canvas.width / 2, fontSize + 10);

  // Bottom text
  if (outline) ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
  ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
}

function loadImage(src) {
  baseImage = new Image();
  baseImage.onload = () => drawMeme();
  baseImage.src = src;
}

imgFile.addEventListener('change', () => {
  const file = imgFile.files[0];
  if (file) loadImage(URL.createObjectURL(file));
});

genBtn.addEventListener('click', drawMeme);

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'meme.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});

clearBtn.addEventListener('click', () => {
  topInput.value = '';
  bottomInput.value = '';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  loadImage('https://via.placeholder.com/800x800?text=Upload+an+Image');
});

// Default placeholder
loadImage('https://via.placeholder.com/800x800?text=Upload+an+Image');
