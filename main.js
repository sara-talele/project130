song1 = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreleftwrist = 0;
scorerightwrist = 0;

song1_status = "";
song2_status = "";

function preload() {

    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");

}

function setup() {

    canvas = createCanvas(600, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);

}

function modelLoaded() {

    console.log('pose is initiallized');

}

function gotPoses(results) {

    if (results.length > 0) {

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        scoreleftwrist = results[0].pose.keypoints[9].score;
        scorerightwrist = results[0].pose.keypoints[10].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

    }

}

function draw() {
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    image(video, 0, 0, 600, 400);
    fill("#FF0000");
    stroke("#FF0000");

    if (scoreleftwrist > 0.1) {

        circle(leftWristX, leftWristY, 20);
        song1.stop();

        if (song2_status == false) {

            song2.play();
            document.getElementById("song").innerHTML = 'Peter Pan playing'

        }

    }

    if (scorerightwrist > 0.1) {

        circle(rightWristX, rightWristY, 20);
        song2.stop();

        if (song1_status == false) {

            song1.play();
            document.getElementById("song").innerHTML = 'Harry Potter playing'

        }

    }

}