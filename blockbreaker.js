function game() {
    // キャンバスの取得
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    // ブロックの情報
    var blockWidth = 40;
    var blockHeight = 20;
    var blocks = [];

    // ボールの情報
    var ballRadius = 10;
    var ballX = canvas.width / 2;
    var ballY = canvas.height - 30;
    var ballDx = 3;
    var ballDy = -3;

    // パドルの情報
    var paddleHeight = 10;
    var paddleWidth = 75;
    var paddleX = (canvas.width - paddleWidth) / 2;
    var rightPressed = false;
    var leftPressed = false;

    // スコアの情報
    var score = 0;

    // ブロックの初期化
    for (var c = 0; c < 5; c++) {
        blocks[c] = [];
        for (var r = 0; r < 3; r++) {
            blocks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }

    // イベントの設定
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    // ゲームのループ
    function draw() {
        // キャンバスをクリア
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // ブロックを描画
        for (var c = 0; c < 5; c++) {
            for (var r = 0; r < 3; r++) {
                if (blocks[c][r].status == 1) {
                    var blockX = (c * (blockWidth + 10)) + 30;
                    var blockY = (r * (blockHeight + 10)) + 30;
                    blocks[c][r].x = blockX;
                    blocks[c][r].y = blockY;
                    drawBlock(blockX, blockY);
                }
            }
        }

        // ボールを描画
        drawBall(ballX, ballY);

        // パドルを描画
        drawPaddle();

        // スコアを描画
        drawScore();

        // ボールの移動
        ballX += ballDx;
        ballY += ballDy;

        // ボールが壁に当たった時の処理
        if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
            ballDx = -ballDx;
        }
        if (ballY - ballRadius < 0) {
            ballDy = -ballDy;
        } else if (ballY + ballRadius > canvas.height) {
            if (ballX > paddleX && ballX < paddleX + paddleWidth) {
                ballDy = -ballDy;
            } else {
                alert("ゲームオーバー");
                document.location.reload();
            }
        }

        // パドルの移動
        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 7;
        } else if (leftPressed && paddleX > 0) {
            paddleX -= 7;
        }

        // ボールがブロックに当たった時の処理
        for (var c = 0; c < 5; c++) {
            for (var r = 0; r < 3; r++) {
                var b = blocks[c][r];
                if (b.status == 1) {
                    if (ballX > b.x && ballX < b.x + blockWidth && ballY > b.y && ballY < b.y + blockHeight) {
                        ballDy = -ballDy;
                        b.status = 0;
                        score++;
                        if (score == 15) {
                            alert("おめでとう！クリアしました！");
                            document.location.reload();
                        }
                    }
                }
            }
        }

        requestAnimationFrame(draw);
    }
    draw();

    // ブロックを描画する関数
    function drawBlock(x,y) {
        ctx.beginPath();
        ctx.rect(x, y, blockWidth, blockHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    // ボールを描画する関数
    function drawBall(x,y) {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2, false);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    // パドルを描画する関数
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    // スコアを描画する関数
    function drawScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: " + score, 8, 20);
    }

    // キーダウンのイベントハンドラ
    function keyDownHandler(e) {
        if (e.keyCode == 39) {
            rightPressed = true;
        } else if (e.keyCode == 37) {
            leftPressed = true;
        }
    }

    // キーアップのイベントハンドラ
    function keyUpHandler(e) {
        if (e.keyCode == 39) {
            rightPressed = false;
        } else if (e.keyCode == 37) {
            leftPressed = false;
        }
    }
}
