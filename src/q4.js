const LABELS = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
const dataInputsContainer = document.getElementById('data-inputs');
const randomBtn = document.getElementById('random-btn');

// 초기 데이터 생성
let temp_data = Array.from({ length: 12 }, () => (Math.random() * 35 - 5).toFixed(1));
let humidity_data = Array.from({ length: 12 }, () => (Math.random() * 50 + 40).toFixed(1));

// 차트 설정
const chartData = {
  labels: LABELS,
  datasets: [
    {
      label: "평균 기온",
      data: temp_data,
      borderColor: "blue",
      yAxisID: "y"
    },
    {
      label: "평균 습도",
      data: humidity_data,
      borderColor: "red",
      yAxisID: "y1"
    }
  ]
};

const config = {
  type: "line",
  data: chartData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        type: "linear",
        position: "left",
        title: { display: true, text: "기온(°C)" }
      },
      y1: {
        type: "linear",
        position: "right",
        title: { display: true, text: "습도(%)" },
        grid: { drawOnChartArea: false }
      }
    }
  }
};

// 차트 생성
const myChart = new Chart(document.getElementById("myChart"), config);

// 데이터 입력 테이블 렌더링 및 이벤트 리스너 설정
function renderTable() {
  dataInputsContainer.innerHTML = '';
  LABELS.forEach((label, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${label}</td>
      <td><input type="number" class="temp-input" value="${temp_data[index]}" data-index="${index}"></td>
      <td><input type="number" class="humidity-input" value="${humidity_data[index]}" data-index="${index}"></td>
    `;
    dataInputsContainer.appendChild(row);
  });

  // 이벤트 리스너 추가
  document.querySelectorAll('.temp-input, .humidity-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const index = e.target.dataset.index;
      if (e.target.classList.contains('temp-input')) {
        temp_data[index] = parseFloat(e.target.value);
      } else {
        humidity_data[index] = parseFloat(e.target.value);
      }
      myChart.update();
    });
  });
}

// 랜덤 버튼 이벤트 리스너
randomBtn.addEventListener('click', () => {
  temp_data = Array.from({ length: 12 }, () => (Math.random() * 35 - 5).toFixed(1));
  humidity_data = Array.from({ length: 12 }, () => (Math.random() * 50 + 40).toFixed(1));
  chartData.datasets[0].data = temp_data;
  chartData.datasets[1].data = humidity_data;
  renderTable();
  myChart.update();
});

// 초기 테이블 렌더링
renderTable();