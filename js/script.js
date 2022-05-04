var Scrambow = require('scrambow').Scrambow;
var [ms, sec, min, hr] = [0, 0, 0, 0];

let milliseconds = 0;
let timerElement = $('.timer')

var timerInterval = null
var run = false
var scores = [];
var scoreID = 0;
let isPressed = false;
var deg = 180
var scramble = ""



var threebythree = new Scrambow(); // Defaults to 3x3

$(document).ready(function() {
    if (localStorage.getItem("scoreID") == null || localStorage.getItem("scores") == null) {
        localStorage.setItem("scores", []);
        localStorage.setItem("scoreID", 0);
        scoreID = +localStorage.getItem("scoreID")
    } else {
        scoreID = +localStorage.getItem("scoreID")
        scores = JSON.parse(localStorage.getItem("scores"))

    }

    generateScramble()
    printScores(scores)

});

// $(document).on('keypress', asciCode => {
//     asciCode.preventDefault();
//     if (asciCode.which == 32) {
//         if (run == false) {
//             run = true;
//             console.log(run);
//             timerElement.css("transform", "scale(1.1)");
//             timerInterval = setInterval(timer, 10)
//             milliseconds = 0
//                 // [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
//             totalSec = 0
//                 // int = setInterval(displayTimer, 10);
//         } else {
//             run = false
//             console.log(run);

//             timerElement.css("transform", "scale(1.0)");
//             clearInterval(timerInterval);

//             generateScramble()
//             addToStorage()
//             printScores(scores)
//         }
//     }
// });

$(document).on('keydown', asciCode => {

    if (asciCode.which == 32) {
        asciCode.preventDefault();
        if (run == false) {
            if (!isPressed) {
                isPressed = true;
                timerElement.css("opacity", "0.5");

            }
        }
    }

});


$(document).on('keyup', asciCode => {
    asciCode.preventDefault();
    if (asciCode.which == 32) {
        if (run == false) {
            isPressed = false;
            run = true;
            $(".refresh-icon").css("display", "none");
            timerInterval = setInterval(timer, 10)
            milliseconds = 0
            timerElement.css("transform", "scale(1.1)");
            timerElement.css("opacity", "1");


        } else {
            run = false
            timerElement.css("transform", "scale(1.0)");
            clearInterval(timerInterval);
            $(".refresh-icon").css("display", "block");
            addToStorage()
            generateScramble()
            printScores(scores)
        }

    }
})

const printScores = (scores) => {
    var scoresElement = $(".scores")
    scoresElement.empty();

    var reversedScores = scores.slice().reverse();
    reversedScores.forEach(scoreID => {
        scoresElement.append(`<il class='score'>${+msToHms(scoreID.time) || msToHms(scoreID.time)}</il>`)
    });
}

const generateScramble = () => {
    scramble = threebythree.get()[0].scramble_string
    $(".scramble").text(scramble);
}

const addToStorage = () => {
    scoreID = localStorage.getItem("scoreID")

    scores[scoreID++] = ({
        "time": milliseconds,
        "scramble": scramble,
    })
    localStorage.setItem("scoreID", scoreID);
    localStorage.setItem("scores", JSON.stringify(scores));
}

const timer = () => {
    milliseconds += 1
    timerElement.text(msToHms(milliseconds))
        // timerElement.text((milliseconds))
}

const msToHms = ms => {
    let [sec, min, hr] = [0, 0, 0, 0]
    hr = ms / 360000 | 0;
    ms %= 360000
    min = ms / 6000 | 0
    ms %= 6000
    sec = ms / 100 | 0
    ms %= 100

    let s = sec < 10 ? "0" + sec : sec;
    let mi = ms < 10 ? "0" + ms : ms;

    if (hr == 0 && min == 0) {
        return (`${s}.${mi}`)
    } else if (hr == 0) {
        return (`${min}:${s}.${mi}`)
    } else {
        return (`${hr}:${min}:${s}.${mi}`)
    }
}

$(".refresh-icon").click(function(e) {
    $(this).css("transform", `rotate(${deg}deg)`);
    deg += 180
    generateScramble()
});

$(".scoresMenu").click(function(e) {
    $(".menuScores").toggleClass("openMenu");
    $(".container").toggleClass("openMenuContainer")
});

// $(window).click(function(element) {
//     if (!$(element.target).hasClass("menuScores")) {
//         if ($(".menuScores").hasClass("openMenu") && !$(element.target).hasClass("scoresMenu")) {
//             $(".menuScores").toggleClass("openMenu");
//         }
//         console.log(element);
//     }
// });

// $('.scoresMenu').click(function(event) {
//     event.stopPropagation();
//     $(".menuScores").toggleClass("openMenu");

// });