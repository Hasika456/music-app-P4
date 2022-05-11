song1="";
song2="";
scoreLeftWrist=0;
song1_status="";
song2_status="";

leftWristY=0;
leftWristX=0;

rightWristY=0;
rightWristX=0;

function preload(){
    song1=loadSound("harry_potter.mp3");
    song2=loadSound("believer_song.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0,0,600,500);
    fill("#e76f51");
    stroke("#e76f51")
    

    if(scoreLeftWrist>0.2){
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if(song1_status==false){
            song1.play();
            document.getElementById("song_name").innerHTML="Playing - Harry Potter theme song";
        }
    }
}


function modelLoaded(){
    console.log("PoseNet is initialized");
}

function gotPoses(results){
    if(results.length>0){
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("Score = " + scoreLeftWrist);
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;

        console.log("Left wrist Y = " + leftWristY + "   Left wrist X = " + leftWristX + "    ||   Right wrist Y = " + rightWristY + "    Right wrist X = " + rightWristX);
        
    }
}