let chart;  // 確保 chart 變數可以在外部使用

// 在頁面加載完成後初始化圖表
window.onload = function() {
    initializeChart(); // 初始化圖表
};

function generateHoles() {
    let A = parseInt(document.getElementById("A").value);
    let B = parseFloat(document.getElementById("B").value);
    let C = parseFloat(document.getElementById("C").value);
    let result = "";
    let chartData = []; // 用來儲存座標的資料
    
    for (let i = 0; i < A; i++) {
        let angle = C + (i * 360 / A);
        let x = (B * Math.cos(angle * Math.PI / 180)).toFixed(3);
        let y = (B * Math.sin(angle * Math.PI / 180)).toFixed(3);
        result += `X${x} Y${y}\n`;

        // 加入每一個座標點到 chartData 中
        chartData.push({ x: parseFloat(x), y: parseFloat(y) });
    }

    document.getElementById("message").value = result;

    // 更新圖表
    updateChart(chartData);
}

function copyText() {
    let textArea = document.getElementById("message");
    textArea.select();
    document.execCommand("copy");
    alert("已複製到剪貼簿！");
}// 確保 chart 變數可以在外部使用

// 在頁面加載完成後初始化圖表
window.onload = function() {
    initializeChart(); // 初始化圖表
};

function generateHoles() {
    let A = parseInt(document.getElementById("A").value);
    let B = parseFloat(document.getElementById("B").value);
    let C = parseFloat(document.getElementById("C").value);
    let result = "";
    let chartData = []; // 用來儲存座標的資料
    
    for (let i = 0; i < A; i++) {
        let angle = C + (i * 360 / A);
        let x = (B * Math.cos(angle * Math.PI / 180)).toFixed(3);
        let y = (B * Math.sin(angle * Math.PI / 180)).toFixed(3);
        result += `X${x} Y${y}\n`;

        // 加入每一個座標點到 chartData 中
        chartData.push({ x: parseFloat(x), y: parseFloat(y) });
    }

    document.getElementById("message").value = result;

    // 更新圖表
    updateChart(chartData);
}

function copyText() {
    let textArea = document.getElementById("message");
    textArea.select();
    document.execCommand("copy");
    alert("已複製到剪貼簿！");
}

function initializeChart() {
    const ctx = document.getElementById('coordinateChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: '孔位座標',
                    data: [],  // 初始資料為空
                    backgroundColor: '#ef476f',
                    borderColor: '#ef476f',
                    borderWidth: 2,
                    fill: false,
                    lineTension: 0,
                    showLine: false,
                    pointRadius: 10,
                },
                {
                    label: 'PCD 圓弧',
                    data: [],  // 初始資料為空
                    backgroundColor: 'black',
                    borderColor: 'black',
                    borderWidth: 2,
                    fill: false,
                    lineTension: 0,
                    showLine: false,
                    pointRadius: 0.5,
                    pointHitRadius: 0
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    min: -100, 
                    max: 100,
                    ticks: {
                        stepSize: 10,
                    },
                },
                y: {
                    type: 'linear',
                    min: -100, 
                    max: 100,
                    ticks: {
                        stepSize: 10,
                    },
                },
            },
            aspectRatio: 1,
        }
    });
}

function updateChart(chartData) {
    // 更新圖表的資料
    chart.data.datasets[0].data = chartData;
    let B = parseFloat(document.getElementById("B").value); // 圓的半徑

    // 計算圓弧上的點
    const numPoints = 500; // 點的數量
    const startAngle = 0; // 起始角度
    const angleStep = (2 * Math.PI) / numPoints; // 每個點的角度增量

    const arcPoints = [];
    const centerX = 0; // 圓心 x
    const centerY = 0; // 圓心 y
    for (let i = 0; i <= numPoints; i++) {
        const angle = startAngle + i * angleStep; // 順時針方向增加角度
        const arcX = centerX + B * Math.cos(angle); // X 座標
        const arcY = centerY + B * Math.sin(angle); // Y 座標
        arcPoints.push({ x: arcX, y: arcY });
    }

    // 更新圓弧資料
    chart.data.datasets[1].data = arcPoints;

    // 找出 x 和 y 的最大值和最小值
    let xMax = Math.max(...chartData.map(p => p.x));
    let xMin = Math.min(...chartData.map(p => p.x));
    let yMax = Math.max(...chartData.map(p => p.y));
    let yMin = Math.min(...chartData.map(p => p.y));

    // 設置坐標軸的範圍
    chart.options.scales.x.max = B + 50;
    chart.options.scales.y.max = B + 50;
    chart.options.scales.x.min = -B - 50;
    chart.options.scales.y.min = -B - 50;

    // 重新渲染圖表
    chart.update();
}

















