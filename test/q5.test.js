const { callRandomEndpoint } = require('../src/q5');
const url = 'http://codingtest.brique.kr:8080/random';

test('processes q4 >>>', async () => {
    const results = await callRandomEndpoint(url);
    let log = [];
    let total = 0;

    // 중복 호출 수 계산
    results.forEach(([value, count]) => {
        total += count;

        let t = `count: ${count} Value: ${value}`;
        log.push(t);
        console.log(t);
    });

    // 검증 및 데이터 출력
    expect(total).toBe(100);
    console.log(`Total count: ${total}`);
    expect(`
        ${log}
        
        Total count: ${total}
    `).toMatchSnapshot();
}, 30000);
