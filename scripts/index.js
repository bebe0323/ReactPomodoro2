const sessionNumber = document.getElementById("sessionNumber");
const remainingMinute = document.getElementById("remainingMinute");
const remainingSecond = document.getElementById("remainingSecond");

//
let startStop = 0;
let sessionCounter = 1;
let sessionCheck = 0;
//
let sessionMinute = 50;
let breakMinute = 10;
const Y = 59;
let minute = 50;
let second = 0;
//

// gradient
const canvas = document.getElementById("percentage");
//
const ctx = canvas.getContext('2d');

// create the linear gradient
const gradient = ctx.createLinearGradient(0, canvas.height, canvas.width, canvas.height);

// gradient.addColorStop(0, 'white');
// gradient.addColorStop(1, 'white');
ctx.fillStyle = "white"; // or ctx.fillstyly = gradient

function change_session_break() {
    if(sessionCheck == 0) { // break starting
        sessionCheck = 1;
        // sessionNumber.textContent = "Break";
        minute = breakMinute;
        second = 0;
        run_time();
    }
    else { // session starts now
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        sessionCheck = 0;
        sessionCounter ++;
        // sessionNumber.textContent = "Session: " + sessionCounter;
        minute = sessionMinute;
        second = 0;
        run_time();
    }
}

let ok = 0;

function run_time() {
    console.log("starting");
    everysecond = setInterval(function() {
        if(ok == 1) clearInterval(everysecond);
        second --;
        //
        if(sessionCheck == 0) { // session is continueing
            let total = sessionMinute * 60;
            let cur = minute * 60+second;
            let percentage = 1 - (cur / total);
            // fill the rectangle with the gradient
            ctx.fillRect(0, 0, canvas.width * percentage, canvas.height);
        }
        //
        if(second == -1) {
            minute --;
            second = Y;
        }
        if(minute < 10) remainingMinute.textContent = "0" + minute;
        else remainingMinute.textContent = minute;
        if(second < 10) remainingSecond.textContent = "0" + second;
        else remainingSecond.textContent = second;
        if(minute == sessionMinute - 1 && second == Y && sessionCheck == 0) {
            sessionNumber.textContent = "Session: " + sessionCounter;
        }
        if(minute == breakMinute - 1 && second == Y && sessionCheck == 1) {
            sessionNumber.textContent = "Break";
        }
        if(minute <= 0 && second <= 0) {
            clearInterval(everysecond);
            var audio = new Audio('../assets/ReelAudio-14362.mp3');
            audio.play();
            change_session_break();
        }
        
    }, 1000);
}

const switchButton = document.getElementById("switchButton");
switchButton.addEventListener("click", function() {
    if(startStop == 0) {
        ok = 0;
        startStop = 1;
        switchButton.innerText = "Stop";
        run_time();
    }
    else {
        startStop = 0;
        ok = 1;
        switchButton.innerText = "Continue";
    }
});



const myModal = document.getElementById("myModal");
const buttonModal = document.getElementById("buttonModal");
const closeModal = document.getElementById("closeModal");

// modal open button clicked
buttonModal.addEventListener("click", function() {
    myModal.style.display = "block";
});

// modal close button clicked
closeModal.addEventListener("click", function() {
    console.log("close the modal");
    myModal.style.display = "none";
});

// anywhere on the window clicked 
window.onclick = function(event) {
    if(event.target == myModal) {
        myModal.style.display = "none";
    }
}

const saveChangesButton = document.getElementById("saveChangesButton");
// const NewSessionDuration = document.getElementById("NewSessionDuration").value;
// const NewBreakDuration = document.getElementById("NewBreakDuration").value;
saveChangesButton.addEventListener("click", function() {

    startStop = 0;
    ok = 1;

    console.log("saveChanges clicked");
    let NewSessionDuration = document.getElementById("NewSessionDuration").value;
    let NewBreakDuration = document.getElementById("NewBreakDuration").value;
    if(NewSessionDuration == "") {
        NewSessionDuration = 50;
    }
    if(NewBreakDuration == "") {
        NewBreakDuration = 10;
    }

    if(isNaN(NewSessionDuration) == true || isNaN(NewBreakDuration) == true) {
        alert("Give number as an input");
        return;
    }
    
    sessionMinute = NewSessionDuration;
    breakMinute = NewBreakDuration;
    minute = sessionMinute;
    second = 0;
    remainingMinute.textContent = minute;
    remainingSecond.textContent = "00";
    ctx.clearRect(0, 0, canvas.width, canvas.height); /* clearing the rectangle */
    switchButton.textContent = "Start";
    sessionNumber.textContent = "Session: 1";

    // after the button pressed, input value becomes placeholder
    var sessionForCSS = document.querySelector('#NewSessionDuration');
    sessionForCSS.placeholder = NewSessionDuration;
    sessionForCSS.value = "";
    var breakForCSS = document.querySelector('#NewBreakDuration');
    breakForCSS.placeholder = NewBreakDuration;
    breakForCSS.value = "";

    // session duration changed when the session was continuing
    
});

const restartButton = document.getElementById("restartButton");
restartButton.addEventListener("click", function() {
    console.log("restart button clicked");

    // session duration changed when the session was continuing
    startStop = 0;
    ok = 1;

    NewSessionDuration.value = '';
    NewBreakDuration.value = '';
    sessionMinute = 50;
    breakMinute = 10;
    minute = sessionMinute;
    second = 0;
    remainingMinute.textContent = 50;
    remainingSecond.textContent = "00";

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    switchButton.textContent = "Start";
    sessionNumber.textContent = "Session: 1";


    // after the button pressed, input value becomes placeholder
    var sessionForCSS = document.querySelector('#NewSessionDuration');
    sessionForCSS.placeholder = 50;
    sessionForCSS.value = "";
    var breakForCSS = document.querySelector('#NewBreakDuration');
    breakForCSS.placeholder = 10;
    breakForCSS.value = "";
    
    
});

const fullScreenButton = document.getElementById('fullScreenButton');
var checkFullScreen = 0;

fullScreenButton.addEventListener("click", function() {
    if(checkFullScreen == 0) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
    checkFullScreen = 1 - checkFullScreen;
});
