<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Robix Timer</title>
    <style>
        <?php include './scss/timer/style.css' ?>
    </style>
</head>

<body>
    <div class="container">
        <div class="scramble">D2 B2 U2 B2 L' U2 L R2 B2 L R U' F' U' L' U' B2 D L2</div>
        <div class="timer">00 . 00</div>
        <div class="menuScores">
            <ul class="scores"></ul>
        </div>
    </div>
    <script>
        <?php include './js/packages/jquery-3.6.0.min.js' ?>
        <?php include './js/bundle.js' ?>
    </script>
</body>

</html>