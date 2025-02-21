function generateHoles() {
    let A = parseInt(document.getElementById("A").value);
    let B = parseFloat(document.getElementById("B").value);
    let C = parseFloat(document.getElementById("C").value);
    let result = "";
    
    for (let i = 0; i < A; i++) {
        let angle = C + (i * 360 / A);
        let x = (B * Math.cos(angle * Math.PI / 180)).toFixed(3);
        let y = (B * Math.sin(angle * Math.PI / 180)).toFixed(3);
        result += `X${x} Y${y}\n`;
    }
    document.getElementById("message").value = result;
}

function copyText() {
    let textArea = document.getElementById("message");
    textArea.select();
    document.execCommand("copy");
    alert("已複製到剪貼簿！");
}