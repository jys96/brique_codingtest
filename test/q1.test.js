const { processData } = require('../src/q1');
const fetch = require('node-fetch');

const url = 'https://drive.google.com/file/d/1Ah0gkauGCIqJHpFGhTgsEZCjYFRscjTh/view?usp=sharing';

// 테스트 작업 최대 1분 제한
test('processes q1 >>>', async () => {
  // download url 생성후 csv 가져오기
  const fileId = url.match(/\/d\/([^/]+)/);
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId[1]}`;
  const res = await fetch(downloadUrl);
  const data = await res.text();

  // 데이터 변환
  const lines = data.trim().split('\n');
  lines.shift(); 
  const datas = lines.map(line => line.replace(/,/g, ' ').trim().split(/\s+/));

  // 데이터 작업
  const result = processData(datas);

  // 결과 데이터 출력
  console.log(result.statistics);
  console.log('---------------------------------------------------------');
  console.log('The total number of lines: ', result.totalLines);
  console.log('The calculated lines: ', result.calculatedLines);
  console.log('The error values: ', result.errorValues);
}, 60000);