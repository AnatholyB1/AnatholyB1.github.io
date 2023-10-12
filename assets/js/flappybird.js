const canvasFlappy = document.getElementById("gameCanvasFlappy");
const ctxFlappy = canvasFlappy.getContext("2d");


let bird = {
    x: canvasFlappy.width / 5,
    y: canvasFlappy.height / 2,
    size: 20,
    dy: 1
};

let pipes = [];
let scoreFlappy = 0;
let gravity = 0.01;

function drawBird() {   
    ctxFlappy.fillStyle = "yellow";
    ctxFlappy.fillRect(bird.x, bird.y, bird.size, bird.size);
}

function drawPipes() {
    ctxFlappy.fillStyle = "green";
    for (let pipe of pipes) {
        ctxFlappy.fillRect(pipe.x, pipe.top.y, pipe.width, pipe.top.height);
        ctxFlappy.fillRect(pipe.x, pipe.bottom.y, pipe.width, pipe.bottom.height);
    }
}

function moveBird() {
    bird.y += bird.dy;
    bird.dy += gravity;
}

function movePipes() {
    for (let pipe of pipes) {
        pipe.x -= 1;

        if (bird.x + bird.size > pipe.x && bird.x < pipe.x + pipe.width &&
            (bird.y < pipe.top.height || bird.y + bird.size > canvasFlappy.height - pipe.bottom.height)) {
            // Collision detected - reset game
            pipes = [];
            scoreFlappy = 0;
            bird.y = canvasFlappy.height / 2;
            bird.dy = 1;
            return;
        }

        if (pipe.x + pipe.width === bird.x) {
            scoreFlappy++;
        }
    }

    if (pipes.length && pipes[0].x + pipes[0].width <= 0) {
        pipes.shift();
    }

    if (!pipes.length || pipes[pipes.length - 1].x === canvasFlappy.width / 2) {
        let pipeHeight = Math.floor(Math.random() * (canvasFlappy.height / 2));
        let gap = 250;

        pipes.push({
            x: canvasFlappy.width,
            width: 50,
            top: {
                y: 0,
                height: pipeHeight
            },
            bottom: {
                y: pipeHeight + gap,
                height: canvasFlappy.height - pipeHeight - gap
            }
        });
    }
}

canvasFlappy.addEventListener("click", () => {
    bird.dy = -1;
});

function mainLoop() {
    ctxFlappy.clearRect(0, 0, canvasFlappy.width, canvasFlappy.height);

    moveBird();
    movePipes();
    
    drawBird();
    drawPipes();

    ctxFlappy.fillStyle = "black";
    ctxFlappy.font = "20px Arial";
    ctxFlappy.fillText("scoreFlappy: " + scoreFlappy, 10, 20);

    requestAnimationFrame(mainLoop);
}

mainLoop();
