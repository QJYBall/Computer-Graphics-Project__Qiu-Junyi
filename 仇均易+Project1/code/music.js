var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext;

var file, input_file;
var BufferSourceNode, AnalyserNode;
var canvas, ctx;

var LoadFile = function() {
    var fileReader = new FileReader();
    fileReader.onload = function(e) {
        input_file = e.target.result;
        DecodeMusic();
    }
    fileReader.readAsArrayBuffer(file);
}

var DecodeMusic = function() {
    audioContext.decodeAudioData(input_file, function(buffer) {
        MusicProcess(buffer);
    }); 
}

var MusicProcess = function(buffer) {
    if(BufferSourceNode) {
        BufferSourceNode.stop();
    }
    BufferSourceNode = audioContext.createBufferSource();
    BufferSourceNode.connect(AnalyserNode);
    AnalyserNode.connect(audioContext.destination);
    BufferSourceNode.buffer = buffer;
    BufferSourceNode.start(0);
    ShowMessage(false);
    window.requestAnimationFrame(render);
}

var ShowMessage = function(bool_value) {
    var message = document.getElementById('message');
    if(bool_value) {
        message.className = "show";
    }else {
        message.className = "";
    }
}

var render = function() {
    ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#00BFFF";
    ctx.lineWidth = 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var MusicArray = new Uint8Array(AnalyserNode.frequencyBinCount);
    AnalyserNode.getByteFrequencyData(MusicArray);
    // var step = Math.round(MusicArray.length / 60);
    // for (var i = 0; i < 40; i++) {
    //     var energy = (MusicArray[step * i] / 256.0) * 50;
    //     for (var j = 0; j < energy; j++) {
    //         ctx.beginPath();
    //         ctx.moveTo(20 * i + 2, 200 + 4 * j);
    //         ctx.lineTo(20 * (i + 1) - 2, 200 + 4 * j);
    //         ctx.stroke();
    //         ctx.beginPath();
    //         ctx.moveTo(20 * i + 2, 200 - 4 * j);
    //         ctx.lineTo(20 * (i + 1) - 2, 200 - 4 * j);
    //         ctx.stroke();
    //     }
    //     ctx.beginPath();
    //     ctx.moveTo(20 * i + 2, 200);
    //     ctx.lineTo(20 * (i + 1) - 2, 200);
    //     ctx.stroke();
    // }
    var du = 2;
    var R= 165;
    var potInt = {x:400,y:215};
    for (var i = 0; i < 91; i++) {
        var value = MusicArray[i] / 10;
        ctx.beginPath();
        Rv1 = (R -2*value);
        Rv2 = (R +2*value);
        ctx.strokeStyle = "#00BFFF";
        ctx.moveTo(Math.sin((i * du) / 180 * Math.PI) * Rv1 + potInt.x,-Math.cos((i * du) / 180 * Math.PI) * Rv1 + potInt.y);
        ctx.lineTo(Math.sin((i * du) / 180 * Math.PI) * Rv2 + potInt.x,-Math.cos((i * du) / 180 * Math.PI) * Rv2 + potInt.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "#40E0D0";
        ctx.moveTo(-Math.sin((i * du) / 180 * Math.PI) * Rv1 + potInt.x,-Math.cos((i * du) / 180 * Math.PI) * Rv1 + potInt.y);
        ctx.lineTo(-Math.sin((i * du) / 180 * Math.PI) * Rv2 + potInt.x,-Math.cos((i * du) / 180 * Math.PI) * Rv2 + potInt.y);
        ctx.stroke();
    } 
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.arc(potInt.x, potInt.y, R, 0, 2 * Math.PI, false); 
    ctx.stroke(); 
    ctx.closePath();

    window.requestAnimationFrame(render);
}

window.onload = function() {
    audioContext = new AudioContext();
    AnalyserNode = audioContext.createAnalyser();
    AnalyserNode.fftSize = 256;

    var FileSelector = document.getElementById('FileSelector');
    FileSelector.onchange = function() {
        if (FileSelector.files[0]) {
            file = FileSelector.files[0];
            ShowMessage(true);
            LoadFile();
        }
    }

    canvas = document.getElementById('canvas');
}