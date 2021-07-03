//https://teachablemachine.withgoogle.com/models/PGLgd-ipK/     
Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90,
});
camera = document.getElementById("camera");

Webcam.attach('#camera');


function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='captured_image' src='" + data_uri + "'>";
    });
}
console.log("ml5.version", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Z_yCdj9au/model.json", Model_lodaded)
function Model_lodaded() {
    console.log("Model_loaded");
}
function speak() {
    var synth = window.speechSynthesis;
    var data_1 = "The First Prediction Is " + prediction_1;
    var data_2 = "And The Second Prediction Is " + prediction_2;
    var Utterthis = new SpeechSynthesisUtterance(data_1 + data_2);
    synth.speak = (Utterthis);
}

function check_function() {
    img = document.getElementById("captured_image");
    classifier.classify(img, got_result);
}
function got_result(error, result) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML = result[0].label;
        document.getElementById("result_emotion_name2").innerHTML = result[1].label;
        prediction_1 = result[0].label;
        prediction_2 = result[1].label;
        speak();
        if (result[0].label == "Mom") {
            document.getElementById("update_emoji").innerHTML = "&#128512;";
        }
        if (result[0].label == "Father") {
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }
        if (result[0].label == "Aiden") {
            document.getElementById("update_emoji").innerHTML = "&#128548;";
        }
        if (result[1].label == "Darren") {
            document.getElementById("update_emoji2").innerHTML = "&#128512;";
        }
    }
}
//https://teachablemachine.withgoogle.com/models/PGLgd-ipK/model.json 