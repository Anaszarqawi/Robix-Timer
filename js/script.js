var Scrambow = require('scrambow').Scrambow;
var [ms, sec, min, hr] = [0, 0, 0, 0];

let milliseconds = 0;
let timerElement = $('.timer')

var timerInterval = null
var run = false
var scores = [];
let isPressed = false;
var deg = 180
var scramble = ""
var viewIndex = 0
const timeView = $('.scoreViewer .time-data');
const scrambleView = $('.scoreViewer .scramble-data');
var currentSession = 1
var sessions = ['1', '2', '3', '4', '5']

var threebythree = new Scrambow(); // Defaults to 3x3

$(document).ready(function() {
    if (localStorage.getItem('newPlayer') == null) {
        localStorage.setItem('currentSession', 1);
        localStorage.setItem('sessions', JSON.stringify(sessions));
        localStorage.setItem(`scores1`, []);
        localStorage.setItem('newPlayer', false);
        loadSessions();
        generateScramble();
    } else {
        currentSession = localStorage.getItem(`currentSession`);
        try {
            scores = JSON.parse(localStorage.getItem(`scores${currentSession}`));
        } catch (error) {
            scores = [];
        }
        sessions = JSON.parse(localStorage.getItem('sessions'));
        loadSessions();
        generateScramble();

        console.log(currentSession);
        printScores();
        printInViewer();
        calcTimerMisc()
    }
});


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
            $('.refresh-icon').css('cursor', 'not-allowed');
            $('.edit-icon').css('cursor', 'not-allowed');
            timerInterval = setInterval(timer, 10)
            milliseconds = 0
            timerElement.css("transform", "scale(1.1)");
            timerElement.css("opacity", "1");


        } else {
            run = false
            timerElement.css("transform", "scale(1.0)");
            clearInterval(timerInterval);
            timerInterval = null;
            $('.refresh-icon').css('cursor', 'pointer');
            $('.edit-icon').css('cursor', 'pointer');
            addToStorage()
            generateScramble()
            printScores()
            printInViewer()
            calcTimerMisc()
        }
    }
})


// Start Menu Functions

const loadSessions = () => {
    let sessionSelector = $('.sessionsContainer .sessions');
    sessionSelector.empty()
    sessions.forEach(value => {
        $(sessionSelector).append(
            `<option class="session" value="${value}">${value}</option>`
        );
    });
    $('.sessions').val(`${currentSession}`);
}

const printScores = () => {
    var scoresElement = $(".scores")
    scoresElement.empty();

    var reversedScores = scores.slice().reverse();
    reversedScores.forEach(scoreID => {
        scoresElement.append(`<il class='score'>${+msToHms(scoreID.time) || msToHms(scoreID.time)}</il>`)
    });
}

$('.scoresMenu').click(function(e) {
    $('.menuScores').toggleClass('openMenu');
    $('.container').toggleClass('openMenuContainer');
});

const printInViewer = () => {
    // console.table(scores);
    var reversedScores = scores.slice().reverse();
    if (reversedScores.length == 0) {
        $('.scoreViewer').css('display', 'none');
    } else {
        $('.scoreViewer').css('display', 'flex');
        timeView.text(+msToHms(reversedScores[0].time));
        scrambleView.text(reversedScores[0].scramble);
        $($('.score')[0]).addClass('highlight');
        viewIndex = 0;
    }
};

$('.next').click(function(e) {
    var reversedScores = scores.slice().reverse();
    if (viewIndex < reversedScores.length - 1) {
        $('.score').removeClass('highlight');
        viewIndex++;
        // console.log(viewIndex);
        timeView.text(+msToHms(reversedScores[viewIndex].time));
        scrambleView.text(reversedScores[viewIndex].scramble);
        $($('.score')[viewIndex]).addClass('highlight');

    }
});

$('.back').click(function(e) {
    var reversedScores = scores.slice().reverse();
    if (viewIndex > 0) {
        $('.score').removeClass('highlight');
        viewIndex--;
        timeView.text(+msToHms(reversedScores[viewIndex].time));
        scrambleView.text(reversedScores[viewIndex].scramble);
        $($('.score')[viewIndex]).addClass('highlight');

    }
});

$(document).on('click', '.score', (scoreElement) => {
    let index = $($('.score')).index(scoreElement.target);
    $('.score').removeClass('highlight');
    $($('.score')[index]).addClass('highlight');
    // console.log(index);
    var reversedScores = scores.slice().reverse();
    timeView.text(+msToHms(reversedScores[index].time));
    scrambleView.text(reversedScores[index].scramble);
    viewIndex = index;
});

$('.sessions').on('input', (element) => {
    currentSession = $('.sessions').val();
    console.log(currentSession);
    $('.createSession').css('display', 'none');
    localStorage.setItem('currentSession', currentSession);
    try {
        scores = JSON.parse(localStorage.getItem(`scores${currentSession}`));
    } catch (error) {
        scores = []
    }
    if (scores == null) {
        scores = [];
        localStorage.setItem(`scores${currentSession}`, []);
    }
    printScores();
    calcTimerMisc();
    printInViewer();

});

$('.add').click(() => {
    $('.createSession').css('display', 'none');
    let name = $('.createSession .name-input').val();
    $('.createSession .name-input').val('');
    $('.sessions').append(
        `<option class="session" value="${name}">${name}</option>`
    );
    $('.sessions').val(name)
    sessions.push(name)
    currentSession = name
    localStorage.setItem('currentSession', currentSession);
    localStorage.setItem('sessions', JSON.stringify(sessions));
    localStorage.setItem(`scores${currentSession}`, []);
    scores = []

    loadSessions()
    printScores();
    printInViewer();
});

$('.new').click(function(e) {
    $('.createSession').css('display', 'flex');
    $('.scoreViewer').css('display', 'none');
    scores = [];
    printScores();
    return;
});

$('.remove').click(function(e) {
    console.log("Remove");

    localStorage.removeItem(`scores${currentSession}`);
    $('.titleContainer .sessions').val($('.session').first().val());

    var indexRemoved = sessions.indexOf(currentSession);
    console.log(currentSession);
    console.log(indexRemoved);
    if (indexRemoved !== -1) {
        sessions.splice(indexRemoved, 1);
    }

    currentSession = sessions[0]
    localStorage.setItem('currentSession', sessions[0]);
    localStorage.setItem('sessions', JSON.stringify(sessions));
    console.log(sessions);
    scores = []

    loadSessions()
    printScores()
    printInViewer()
});

// End Menu Functions

// Start Timer Functions

const timer = () => {
    milliseconds += 1;
    timerElement.text(msToHms(milliseconds));
    // timerElement.text((milliseconds))
};

const msToHms = (ms) => {
    let [sec, min, hr] = [0, 0, 0, 0];
    hr = (ms / 360000) | 0;
    ms %= 360000;
    min = (ms / 6000) | 0;
    ms %= 6000;
    sec = (ms / 100) | 0;
    ms %= 100;

    let s = sec < 10 ? '0' + sec : sec;
    let mi = ms < 10 ? '0' + ms : ms;

    if (hr == 0 && min == 0) {
        return `${s}.${mi}`;
    } else if (hr == 0) {
        return `${min}:${s}.${mi}`;
    } else {
        return `${hr}:${min}:${s}.${mi}`;
    }
};

const generateScramble = () => {
    scramble = threebythree.get()[0].scramble_string
    $(".scramble").text(scramble);

}

$(".refresh-icon").click(function(e) {
    if (timerInterval == null) {
        $(this).css("transform", `rotate(${deg}deg)`);
        deg += 180
        generateScramble()
    }
});

$('.edit-icon').click(function(e) {
    if (timerInterval == null) {
        $('.scramble').focus();
    }
});

const calcTimerMisc = () => {
    let [sum, mean, best, avg5, avg10] = [0, 0, 0, 0, 0]
    let count = scores.length;
    let timerMisc = $('.timerMisc .text');
    var reversedScores = scores.slice().reverse();
    var times = []
    for (let i = 0; i < reversedScores.length; i++) {
        sum += +reversedScores[i].time;
        if (i == 4) {
            avg5 = (sum / 5) | 0;
        }
        if (i == 9) {
            avg10 = (sum / 10) | 0;
        }
        times.push(+reversedScores[i].time);
    }
    mean = sum / count | 0
    $(timerMisc[0]).text(`Mean: ${+msToHms(mean)}`)
    $(timerMisc[1]).text(`Best: ${+msToHms(Math.min(...times))}`)
    $(timerMisc[2]).text(`Count: ${count}`)
    $(timerMisc[3]).text(`Avg5: ${+msToHms(avg5)}`)
    $(timerMisc[4]).text(`Avg10: ${+msToHms(avg10)}`)
};
// End Timer Functions

// local Storage Functions

const addToStorage = () => {
    scores.push({
        time: milliseconds,
        scramble: $('.scramble').text(),
    });
    // console.log(currentSession);
    localStorage.setItem(`scores${currentSession}`, JSON.stringify(scores));
    // console.table(scores);
};