(() => {
  const context = document.getElementById("canvas").getContext("2d");
  const canvas = context.canvas;
  const sceneColor = "#00AAFF";
  const w = 220; // width of the frame in the Sprite Sheet
  const h = 450; // height of the frame in the Sprite Sheet
  const maxFrameLength = 3;
  const scale = 1; // scale of the frame
  let delay = 4; // delay till animating the next frame
  let count = 0; // counter for the delay
  let currentFrameX = 1; // start frameX

  const centerCanvas = () => {
    canvas.style.marginTop =
      `${((window.innerHeight / 2) - (canvas.height / 2))}px`;
  };

  const range = document.getElementById("fps")
  .addEventListener("change", (e) => { delay = e.target.value; });

  canvas.width = w * scale; canvas.height = h * scale;

  document.body.style.background = sceneColor;
  canvas.style.background = sceneColor;

  centerCanvas();

  const animate = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // we'll start with the second frame (index = 1) which is the start of
    // the walking cycle
    const frameX = currentFrameX;
    // only animate the first row of frames from the Sprite Sheet
    const frameY = 0;
    const sx = 8 + frameX * w;
    const sy = frameY * h;

    if (count > delay) {
      currentFrameX ++; count = 0;
    } else { count ++; }

    if (currentFrameX > maxFrameLength) currentFrameX = 1;

    context.drawImage(spriteSheet, sx, sy, w, h, 0, 0, w * scale, h * scale);
  };

  const frame = () => {
     animate(); requestAnimationFrame(frame);
  };

  const spriteSheet = new Image(); spriteSheet.src = "mario.png";

  spriteSheet.onload = () => { frame(); };

})();
