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
        <div class="scrambleContainer">
            <div class="scramble">D2 B2 U2 B2 L' U2 L R2 B2 L R U' F' U' L' U' B2 D L2</div>
            <?php include './assets/svg/refresh-icon.svg' ?>
        </div>
        <div class="timer">00.00</div>
    </div>
    <div class="menuScores">
        <span class="title">Scores</span>
        <input type="text" onkeyup="myFunction()" placeholder="Search comments" class="searchBar">
        <ul class="scores"></ul>
    </div>
    <script>
        <?php include './js/packages/jquery-3.6.0.min.js' ?>
        <?php include './js/bundle.js' ?>
        <?php include './js/searchInScores.js' ?>
    </script>
</body>

</html>