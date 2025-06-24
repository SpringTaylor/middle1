let defaultImg, wImg, aImg, sImg, dImg;
let currentImg;
let img1, img2, img3, img4, popupImg, img5, img6, img34, img35, img36;
let img1t, img2t, img3t;

let startTime;
let fadeAlpha31 = 0;
let fadeAlpha32 = 0;
let fadeIn31 = false;
let startFadeOut31 = false;
let img31HiddenTime = null;
let startFadeIn32 = false;

let showPopup = false;
let start32Time = null;
let popupScale = 0;
let popupAnimating = false;
let hidePopup = false;

let showImg5 = false;
let img5StartTime = null;
let showImg6 = false;
let fadeOut32 = false;
let fadeInImg34 = false;
let img34Alpha = 0;

let img34FadeOutStarted = false;
let img34HideTime = null;

let showImg1t = false;
let showImg2t = false;
let showImg3t = false;
let img1tStartTime = null;
let img2tStartTime = null;
let img3tStartTime = null;
let img1tAlpha = 0;
let img2tAlpha = 0;
let img3tAlpha = 0;

let showImg35 = false;
let img35Alpha = 0;
let img35StartTime = null;

let showImg36 = false;
let img36Alpha = 0;
let img36StartTime = null;

let cols = 7;
let spacingX = 300;
let spacingY = 60;
let horizontalLines = [];
let verticalLines = [];
let moveSpeed = 4;
let vanishingPoint;
let cutoffY;
let extension = 30;
let displayTop = 500;
let displayBottom = 1080;

let fadeOutImg5 = false;
let img5Alpha = 255;
let img6Alpha = 255;

function preload() {
  defaultImg = loadImage('wasd.png');
  wImg = loadImage('W.png');
  aImg = loadImage('A.png');
  sImg = loadImage('S.png');
  dImg = loadImage('D.png');

  img1 = loadImage('3.png');
  img2 = loadImage('3g.png');
  img3 = loadImage('31.png');
  img4 = loadImage('32.png');
  popupImg = loadImage('3E.png');
  img5 = loadImage('3g2.png');
  img6 = loadImage('33.png');
  img34 = loadImage('34.png');
  img35 = loadImage('35.png');
  img36 = loadImage('36.png');

  img1t = loadImage('1t.png');
  img2t = loadImage('2t.png');
  img3t = loadImage('3t.png');
}

function setup() {
  createCanvas(1920, 1080);
  currentImg = defaultImg;
  startTime = millis();
  vanishingPoint = createVector(width / 2, 360);
  cutoffY = height / 2;
  initGrid();
}

function initGrid() {
  horizontalLines = [];
  verticalLines = [];
  for (let y = height; y >= vanishingPoint.y; y -= spacingY) {
    horizontalLines.push(y);
  }
  for (let i = 0; i < cols; i++) {
    let x = width / 2 - ((cols - 1) / 2) * spacingX + i * spacingX;
    verticalLines.push(x);
  }
}

function draw() {
  background(255);
  stroke(178, 178, 178);
  drawVerticalLines();
  updateAndDrawHorizontalLines();
  image(img1, 0, 0, width, height);
  image(img2, 0, 0, width, height);

  let elapsedTime = millis() - startTime;

  if (elapsedTime > 2000 && !startFadeOut31) {
    fadeIn31 = true;
  }

  if (fadeIn31 && fadeAlpha31 < 255 && !startFadeOut31) {
    fadeAlpha31 += 3;
  }

  if (startFadeOut31 && fadeAlpha31 > 0) {
    fadeAlpha31 -= 5;
    if (fadeAlpha31 <= 0 && img31HiddenTime === null) {
      img31HiddenTime = millis();
    }
  }

  if (fadeAlpha31 > 0) {
    tint(255, fadeAlpha31);
    image(img3, 0, 0, width, height);
    noTint();
  }

  if (img31HiddenTime !== null && millis() - img31HiddenTime > 3000 && !startFadeIn32) {
    startFadeIn32 = true;
    start32Time = millis();
  }

  if (startFadeIn32 && !fadeOut32 && fadeAlpha32 < 255) {
    fadeAlpha32 += 3;
  }
  if (fadeOut32 && fadeAlpha32 > 0) {
    fadeAlpha32 -= 5;
  }

  if (fadeAlpha32 > 0) {
    tint(255, fadeAlpha32);
    image(img4, 0, 0, width, height);
    noTint();
  }

  if (start32Time !== null && millis() - start32Time > 4000 && !showPopup) {
    showPopup = true;
    popupAnimating = true;
    popupScale = 0;
  }

  if (showPopup) {
    if (popupAnimating && !hidePopup && popupScale < 1) {
      popupScale += 0.05;
    } else if (hidePopup && popupScale > 0) {
      popupScale -= 0.05;
      if (popupScale <= 0) {
        showPopup = false;
        popupAnimating = false;
        showImg5 = true;
      }
    }

    if (popupScale > 0) {
      push();
      imageMode(CENTER);
      translate(width / 2, height / 2);
      scale(popupScale);
      image(popupImg, 0, 0, width, height);
      pop();
    }
  }

  if (showImg5) {
    if (img5StartTime === null) {
      img5StartTime = millis();
    }

    if (!fadeOutImg5) {
      image(img5, 0, 0, width, height);
      if (millis() - img5StartTime > 1000) {
        showImg6 = true;
      }
    } else {
      if (img5Alpha > 0) img5Alpha -= 5;
      if (img6Alpha > 0) img6Alpha -= 5;
    }

    if (img5Alpha > 0) {
      tint(255, img5Alpha);
      image(img5, 0, 0, width, height);
      noTint();
    }
  }

  if (showImg6) {
    if (img6Alpha > 0) {
      tint(255, img6Alpha);
      image(img6, 0, 0, width, height);
      noTint();
    }
  }

  if (img6Alpha <= 0 && !fadeInImg34) {
    fadeInImg34 = true;
    setTimeout(() => {
      img34Alpha = 0;
    }, 1000);
  }

  if (fadeInImg34 && img34Alpha < 255) {
    img34Alpha += 3;
  }

  if (img34Alpha > 0 && !img34FadeOutStarted) {
    tint(255, img34Alpha);
    image(img34, 0, 0, width, height);
    noTint();

    if (img34Alpha === 255 && img34HideTime === null) {
      img34HideTime = millis();
    }

    if (img34HideTime && millis() - img34HideTime > 4000) {
      img34FadeOutStarted = true;
    }
  }

  if (img34FadeOutStarted && img34Alpha > 0) {
    img34Alpha -= 5;
    tint(255, img34Alpha);
    image(img34, 0, 0, width, height);
    noTint();

    if (img34Alpha <= 0 && img1tStartTime === null) {
      showImg1t = true;
      img1tStartTime = millis();
    }
  }

  if (showImg1t) {
    if (img1tAlpha < 255) img1tAlpha += 5;
    tint(255, img1tAlpha);
    image(img1t, 0, 0, width, height);
    noTint();
    if (millis() - img1tStartTime > 1000) {
      showImg1t = false;
      showImg2t = true;
      img2tStartTime = millis();
    }
  }

  if (showImg2t) {
    if (img2tAlpha < 255) img2tAlpha += 5;
    tint(255, img2tAlpha);
    image(img2t, 0, 0, width, height);
    noTint();
    if (millis() - img2tStartTime > 1000) {
      showImg2t = false;
      showImg3t = true;
      img3tStartTime = millis();
    }
  }

  if (showImg3t) {
    if (img3tAlpha < 255) img3tAlpha += 5;
    tint(255, img3tAlpha);
    image(img3t, 0, 0, width, height);
    noTint();

    if (millis() - img3tStartTime > 1000 && !showImg35) {
      showImg35 = true;
      img35StartTime = millis();
    }
  }

  if (showImg35) {
    if (img35Alpha < 255) img35Alpha += 5;
    tint(255, img35Alpha);
    image(img35, 0, 0, width, height);
    noTint();

    if (millis() - img35StartTime > 2000 && !showImg36) {
      showImg36 = true;
      img36StartTime = millis();
    }
  }

  if (showImg36) {
    if (img36Alpha < 255) img36Alpha += 5;
    tint(255, img36Alpha);
    image(img36, 0, 0, width, height);
    noTint();
  }

  image(currentImg, 0, 0, width, height);
}

function drawVerticalLines() {
  for (let x of verticalLines) {
    let dx = vanishingPoint.x - x;
    let dy = vanishingPoint.y - height;
    let ratio = (cutoffY - height) / dy;
    let cutoffX = x + dx * ratio;
    let cutoffYLine = height + dy * ratio;
    let extendedY = cutoffYLine + extension;

    if (extendedY >= displayTop && height <= displayBottom) {
      line(x, height, cutoffX, extendedY);
    }
  }
}

function updateAndDrawHorizontalLines() {
  if (keyIsDown(83)) {
    for (let i = 0; i < horizontalLines.length; i++) {
      horizontalLines[i] += moveSpeed;
    }
    if (horizontalLines[0] > height) {
      horizontalLines.push(horizontalLines.shift() - (horizontalLines.length - 1) * spacingY);
    }
  }

  if (keyIsDown(87)) {
    for (let i = 0; i < horizontalLines.length; i++) {
      horizontalLines[i] -= moveSpeed;
    }
    if (horizontalLines[horizontalLines.length - 1] < vanishingPoint.y) {
      horizontalLines.unshift(horizontalLines.pop() + (horizontalLines.length - 1) * spacingY);
    }
  }

  let visibleLines = horizontalLines.filter(y => y >= vanishingPoint.y && y <= height && y >= displayTop && y <= displayBottom);
  let minY = min(visibleLines);

  for (let y of visibleLines) {
    if (y === minY) continue;
    let shrink = map(y, height, vanishingPoint.y, 0, 1);
    let halfWidth = ((cols - 1) / 2) * spacingX;
    let left = lerp(width / 2 - halfWidth, vanishingPoint.x, shrink);
    let right = lerp(width / 2 + halfWidth, vanishingPoint.x, shrink);
    line(left, y, right, y);
  }
}

function keyPressed() {
  updateCurrentImage(key);
  if (key === 'w' || key === 'W') {
    startFadeOut31 = true;
  }
}

function keyReleased() {
  if ('wasdWASD'.includes(key)) {
    currentImg = defaultImg;
  }
}

function updateCurrentImage(k) {
  switch (k.toLowerCase()) {
    case 'a':
      currentImg = aImg;
      break;
    case 's':
      currentImg = sImg;
      break;
    case 'd':
      currentImg = dImg;
      break;
  }
}

function mousePressed() {
  if (showPopup && !hidePopup && popupScale > 0) {
    let popupX = width / 2;
    let popupY = height / 2;
    let dx = (mouseX - popupX) / popupScale + popupX;
    let dy = (mouseY - popupY) / popupScale + popupY;

    if (dx >= 710 && dx <= 940 && dy >= 760 && dy <= 820) {
      fadeOut32 = true;
      hidePopup = true;
    }
  }
}

function doubleClicked() {
  if (showImg5) {
    let d = dist(mouseX, mouseY, 510, 930);
    if (d <= 90) {
      fadeOutImg5 = true;
    }
  }
}