var leftWristX = 0;
var leftWristY = 0;

var rightWristX = 0;
var rightWristY = 0;

var leftWristScore = 0;
var rightWristScore = 0;

var songStatus = "";

function preload() {
    harryPotterSong = loadSound("music.mp3");
    PeterPanSong = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(500, 400)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotPoses)
}

function modelLoaded() {
    console.log("The model has loaded!")
}

function draw() {
    image(video, 0, 0, 500, 400)

    if (leftWristScore > 0.2) {
        fill("red")
        circle(leftWristX, leftWristY, 20)
        harryPotterSong.stop()
        if (!PeterPanSong.isPlaying()) {
            PeterPanSong.play();
        }
        document.getElementById("songNameHolder").innerHTML = "The song playing is the Peter Pan theme song!"
    }
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results)
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        leftWristScore = results[0].pose.keypoints[9].score;
        rightWristScore = results[0].pose.keypoints[10].score;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log(leftWristX, leftWristY)
        console.log(rightWristX, rightWristY)

    }
}
