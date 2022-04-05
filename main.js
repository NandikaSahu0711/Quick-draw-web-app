function setup(){
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function preload(){
    classifier = ml5.imageClassifier('Doodlenet')
}

function clearCanvas(){
    background("white");
}

function draw(){
    // Set stoke weight to 10
    strokeWeight(13);
    // Set stroke color to purple
    stroke('purple');
    // if mouseis pressed, draw line between previous and current mouse positons 
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results){
    if (error) {
        console.error(error);
    }
    console.log(results);
    document.getElementById('label').innerHTML = 'Label: ' + results[0].label + "🎁🍟🍿🚋";
    document.getElementById('confidence').innerHTML = 'Confidence: ' + Math.round(results[0].confidence * 100) + '%';

    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}