<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Robix Timer</title>
    <style>
        <?php include './scss/container/style.css' ?><?php include './scss/nav/style.css' ?><?php include './scss/menuScores/menuScores.css' ?>
    </style>
</head>

<body>
    <div class="container">
        <?php include './php/nav.php' ?>
        <?php include './php/scramble.php' ?>
        <div class="timer">00.00</div>
        <?php include './php/timerMisc.php' ?>
    </div>
    <?php include './php/menuScores.php' ?>
    <script>
        <?php include './js/packages/jquery-3.6.0.min.js' ?>
        <?php include './js/bundle.js' ?>
        <?php include './js/searchInScores.js' ?>
    </script>
</body>

</html>