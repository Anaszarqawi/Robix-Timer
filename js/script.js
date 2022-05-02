let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timer = $('.timer')
let int = null;

var run = false

$(document).on('keypress', asciCode => {
    asciCode.preventDefault();
    if (asciCode.which == 32) {
        if (run == false) {
            run = true;
            timer.css("transform", "scale(1.1)");
            [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
            int = setInterval(displayTimer, 10);
        } else {
            run = false
            timer.css("transform", "scale(1.0)");
            clearInterval(int);
        }
    }
});



function displayTimer() {
    milliseconds += 1;
    if (milliseconds == 100) {
        milliseconds = 0;
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
            if (minutes == 60) {
                minutes = 0;
            }
        }
    }
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = milliseconds < 10 ? "0" + milliseconds : milliseconds < 100 ? "" + milliseconds : milliseconds;

    timer.text(`${m} : ${s} . ${ms}`);
}

// setInterval(displayTimer, 10);