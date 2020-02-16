canvas = document.getElementById('canvas')
canvasContext = canvas.getContext('2d')
ballX = canvas.width / 2
ballY = canvas.height / 2
ballVelocityX = 10
ballVelocityY = 0.75 * ballVelocityX
paddleWidth = 10
paddleHeight = paddleWidth * 5
playerPaddleY = canvas.height / 5
aiPaddleY = playerPaddleY
playerScore = 0
aiScore = playerScore
winningScore = 10
pause = 1

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

window.onload = function () {
    setInterval(function () {
        movement()
        drawView()
    }, 50)

    if (pause = 1) {
        canvas.addEventListener('mousedown', function (event) {
            pause = 0
        })
    }

    
    document.onkeydown = function (event) {
        switch (event.keyCode) {
            case 38:
                moveup();
                break;
            case 40:
                movedown();
                break;
        }
    };
}

function mouse(event) {
    let rect = canvas.getBoundingClientRect()
    let root = document.documentElement
    let mouseX = event.clientX - rect.left - root.scrollLeft
    let mouseY = event.clientY - rect.top - root.scrollTop

    return {
        x: mouseX,
        y: mouseY
    }
}

function restart() {
    if (playerScore == winningScore || aiScore == winningScore) {
        pause = 1
    }

    ballVelocityX = -ballVelocityX
    ballX = canvas.width / 2
    ballY = canvas.height / 2
}

function ai() {
    if (aiPaddleY < ballY) {
        aiPaddleY += 15
    } else if (aiPaddleY > ballY) {
        aiPaddleY -= 14
    }
}

function movement() {
    ai()
    ballX += ballVelocityX
    ballY += ballVelocityY

    if (ballX < paddleHeight && pause == 0) {
        if (ballY > playerPaddleY && ballY < playerPaddleY + paddleHeight) {
            ballVelocityX = -ballVelocityX
        }
        if (ballX < 0) {
            aiScore++
            restart()
        }
    }

    if (ballX > canvas.width - paddleHeight && pause == 0) {
        if (ballY > aiPaddleY && ballY < aiPaddleY + paddleHeight) {
            ballVelocityX = -ballVelocityX
        }
        if (ballX > canvas.width) {
            playerScore++
            restart()
        }
    }

    if (ballX < 0 || ballX > canvas.width && pause == 1) {
        ballVelocityX = -ballVelocityX
    }
    if (ballY < 0 || ballY > canvas.height) {
        ballVelocityY = -ballVelocityY
    }
}

function drawView() {
    colorRect(0, 0, canvas.width, canvas.height, 'red')

    if (pause == 0) {
        colorRect(canvas.width / 2, 0, 1, canvas.height, 'white')
        colorRect(25, playerPaddleY, paddleWidth, paddleHeight, 'white')
        colorRect(canvas.width - 25, aiPaddleY, paddleWidth, paddleHeight, 'white')
        canvasContext.beginPath()
        canvasContext.arc(ballX, ballY, 10, 0, 2 * Math.PI)
        canvasContext.fill()
        canvasContext.font = "35px Courier New"
        canvasContext.fillText('Score: ' + playerScore, canvas.width / 2 - 200, canvas.height / 2 + 200)
        canvasContext.fillText('Score: ' + aiScore, canvas.width / 2 + 50, canvas.height / 2 + 200)
    } else {
        playerScore = aiScore = 0
        canvasContext.fillStyle = 'yellow'
        canvasContext.font = "70px Courier New"
        canvasContext.beginPath()
        canvasContext.arc(ballX, ballY, 50, 0, 2 * Math.PI)
        canvasContext.fill()
        canvasContext.fillText('AL presents', canvas.width / 2 - 200, canvas.height / 2)
        canvasContext.fillText('Pong', canvas.width / 2 - 60, canvas.height / 1.5)
        canvasContext.font = "35px Courier New"
        canvasContext.fillText('*Tap to play*', canvas.width / 2 - 120, canvas.height / 1.1)
    }
}

function colorRect(cX, cY, cWidth, cHeight, cColor) {
    canvasContext.fillStyle = cColor
    canvasContext.fillRect(cX, cY, cWidth, cHeight)
}

function moveup() {
    playerPaddleY -= 30;
}

function movedown() {
    playerPaddleY += 30;
}