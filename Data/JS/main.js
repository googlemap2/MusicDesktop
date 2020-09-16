

var task_tracks = document.getElementById("task-tracks");
var tracks = document.getElementById("tracks");
var pause = document.getElementById("pause");
var disc_img = document.getElementById("disc-img");
var song_title = document.getElementById("song");
var prev = document.getElementById("prev");
var play = document.getElementById("play");
var pause = document.getElementById("pause");
var next = document.getElementById("next");
var auto_next = document.getElementById("auto-next");
var loop = document.getElementById("loop");
var time = document.getElementById("time");


var checkPause = true;
var moveMusic = true;
var locationSong;
var boolAddList = false;
var listPath = [];
var clickMe = false;
var click_task_tracks = false;
var listMusic = [];
var oderSong = 0;
var musicID;


window.onload = () => {
    pause.style.display = "none";
    control.hideAutoNext();
    // style html
}

var control = {
    playing: false,
    autoNext: true,
    loop: false,
    hidePlay: () => {
        play.style.display = "none";
        pause.style.display = "block";
    },
    hidePause: () => {
        play.style.display = "block";
        pause.style.display = "none";
    },
    hideLoop: () => {
        loop.style.display = "none";
        auto_next.style.display = "block";
    },
    hideAutoNext: () => {
        loop.style.display = "block";
        auto_next.style.display = "none";
    }
    ,
    playMusic: () => {
        musicID = listMusic[locationSong].music.play();
    },
    pauseMusic: () => {
        listMusic[locationSong].music.pause(musicID);
    },
    volumeMusic: (v) => {
        listMusic[locationSong].music.volume(v);
    },
    stop: () => {
        listMusic[locationSong].music.stop(musicID);
    }
    ,
    loadTimeMusic: (time) => {
        return listMusic[locationSong].music.seek(time);
    },
    fullTimeMusic: (time) => {
        return listMusic[locationSong].music.duration(time);
    }
    ,
    forWard: () => {
        if (control.autoNext && control.playing && checkPause) {
            controlMain("next");
        }
    },
    loopMusic: (b) => {
        listMusic[locationSong].music.loop(b);
    }
    ,
    locationTitlePlaying: (ls) => {
        /*  disc_img.childNodes[0].replaceWith(listMusic[ls].imgTrack);*/
        song_title.innerText = listMusic[ls].nameTrack.innerText;
    },
    locationMusic: (i) => {
        resetBg(i);
        i.classList.add("ani-listsong");
        /* i.style.background = "#c054be";
         i.style.color = "#222222";*/
    }
}
var g;


function pushList(p) {
    p = p.replace(/[\/\\]/g, "/");
    listPath.push(p);
}

function pushListSong() {
    var r;

    if (listPath.length != 0) {
        listPath.forEach((item, index) => {
            r = item.substring(0, item.lastIndexOf("/"));
            g = item.substring(r.length + 1);
            addTrack(item, g.substring(0, g.lastIndexOf('.')), item.substring(0, item.lastIndexOf("/")));
        })
        boolAddList = true;
        locationSong = 0;
        valueID();
        control.locationTitlePlaying(locationSong);

    }
}

var songid = 0;

function addTrack(p, s, pimg) {
    var sound = new mainTrack(p, s, pimg);
    sound.nameTrack.setAttribute("song-id", "song" + songid);
    tracks.appendChild(sound.nameTrack);
    listMusic.push(sound);
    if (analyser == null) {
        analyser = Howler.ctx.createAnalyser();
        Howler.masterGain.connect(analyser);
        analyser.connect(Howler.ctx.destination);
        analyser.fftSize = 256;
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
    }
    songid++;
}

function controlMain(id) {
    control.volumeMusic(0.5);
    if (id == "play" && boolAddList) {
        control.playMusic();
        control.hidePlay();
        control.locationMusic(tracks.children[locationSong]);
        checkPause = false;
        control.playing = true;
    }
    if (id == "pause") {
        control.pauseMusic();
        control.hidePause();
        checkPause = true;
    }
    if (id == "next") {
        control.stop();
        locationSong++;
        if (locationSong < listMusic.length) {
            control.loadTimeMusic(0);
            control.locationTitlePlaying(locationSong);
            control.locationMusic(tracks.children[locationSong]);
            controlMain("play");
            console.log(locationSong);
        }
        else {
            locationSong = 0;
            controlMain("play");
            control.loadTimeMusic(0);
            control.locationMusic(tracks.children[locationSong]);
            control.locationTitlePlaying(locationSong);
        }
    }
    if (id == "prev") {
        control.stop();
        locationSong--;
        if (locationSong > 0) {
            control.loadTimeMusic(0);
            control.playMusic();
            control.locationMusic(tracks.children[locationSong]);
            control.locationTitlePlaying(locationSong);
        }
        else {
            locationSong = 0;
            control.loadTimeMusic(0);
            control.playMusic();
            control.locationMusic(tracks.children[locationSong]);
            control.locationTitlePlaying(locationSong);
        }
    }
    if (id == "auto-next") {
        control.loopMusic(false);
        control.loop = false;
        control.autoNext = true;
        control.hideAutoNext();
    }
    if (id == "loop") {
        control.autoNext = false;
        control.loopMusic(true);
        control.loop = true;
        control.hideLoop();
    }
}

var canvas = document.getElementById("canvas");
var canvasCtx = canvas.getContext("2d");
var dpi = window.devicePixelRatio;

function fixdpi() {
    canvas.setAttribute('width', WIDTH * dpi);
    canvas.setAttribute('height', HEIGHT * dpi);
}

let analyser = null;
let bufferLength = null;
let dataArray = null;
const WIDTH = canvas.width
const HEIGHT = canvas.height
var run = 1;

function mainTrack(path, song, pimg) {
    this.music = new Howl({
        src: [path],
        format: ['mp3'],
        html5: true,
    
        onplay: () => {
            canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
            const draw = () => {
                drawVisual = requestAnimationFrame(draw);
                fixdpi();
                analyser.getByteFrequencyData(dataArray);

                var my_gradient = canvasCtx.createLinearGradient(0, 0, 0, 170);
                canvasCtx.fillStyle = my_gradient;
                canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
                canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
                var barWidth = (WIDTH / bufferLength) * 2.5;
                var barHeight;
                var x = 0;
                for (var i = 0; i < bufferLength; i++) {
                    barHeight = dataArray[i] / 2;

                    canvasCtx.fillStyle = 'rgb(' + (barHeight + 200) + ',' + (barHeight + 90) + ',' + (barHeight + 190) + ')';
                    canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);


                    x += barWidth + 1;
                }
            }

            draw();

        }

    });
    //---------
    this.nameTrack = document.createElement("p");
    this.nameTrack.innerText = song;
    this.nameTrack.classList.add("item");
    /*  this.imgTrack = document.createElement("img");
      this.imgTrack.src = pimg + '/IMGTheSong/' + song + ".png";*/
    this.changeInfo = (path, song, pimg) => {
        this.music = new Howl({
            src: [path],
            html: true
        })
    }
    this.nameTrack.innerText = song;
    /*    this.imgTrack.src = pimg + '/IMGTheSong/' + song + ".png";*/

}

function reloadTimeValue() {
    time.value = ((control.loadTimeMusic() / control.fullTimeMusic()) * 100).toFixed(1);
}

function moveTimeValue() {
    listMusic[locationSong].music.seek(time.value / 100 * control.fullTimeMusic());
}

time.addEventListener("mousedown", function () {
    clearInterval(timing);
    time.onmousemove = () => { moveTimeValue(); }
});

time.addEventListener("mouseup", function () {
    timing = setInterval(function () {
        if (control.playing) {
            reloadTimeValue();
        }
    }, 1000 / 60);
    moveTimeValue();
    time.onmousemove = null;
})

var timing = setInterval(function () {
    if (control.playing) {
        reloadTimeValue();
    }
}, 1000 / 60);

function getTime(s) {
    var e = {
        hh: 0,
        mm: 0,
        ss: 0
    };

    e.hh = Math.floor(s / 60 / 60);
    e.mm = Math.floor((s - (e.hh * 60 * 60)) / 60);
    e.ss = Math.floor((s - (e.hh * 60 * 60) - (e.mm * 60)));

    return getDigits(e.hh, 2) + ":" + getDigits(e.mm, 2) + ":" + getDigits(e.ss, 2);
}

function getDigits(e, n) {
    for (var i = 0; i < n; i++) {
        e = "0" + e;
    }
    return e.slice(-n);
}

var loadTime = document.getElementById("loadTime");

function updateTimer() {
    loadTime.innerHTML = getTime(control.loadTimeMusic());
}

setInterval(function () {
    if (boolAddList) {

        if (time.value >= 100) {
            checkPause = true;
            control.forWard();
        }
        if (control.playing) {
            updateTimer();
        }
    }

}, 1000 / 60)


//style html

var rectBound;


function showCoords(e) {

    /*rectBound = e.target.getBoundingClientRect();*/

    var substringA = e.target.attributes["song-id"].value;
    substringA = substringA.substring(substringA.length - 1);

    control.stop();

    locationSong = parseInt(substringA);
    control.loadTimeMusic(0);

    controlMain("play");
    control.locationTitlePlaying(locationSong);
}

function resetBg() {
    for (var i = 0; i < tracks.children.length; i++) {
        locationRunning(tracks.children[i]);
    }
}

function locationRunning(e) {
    e.classList.remove("ani-listsong");
}


function valueID() {
    for (var i = 0; i < tracks.children.length; i++) {
        tracks.children[i].addEventListener("click", showCoords);
    }
}




