const net = require('net');

/**
 * 서버 실행
 * @param {number} port - 서버 포트 번호
 * @param {function(string): void} logCallback - 로그 메시지를 처리할 콜백 함수
 * @returns {net.Server} 생성된 서버 객체
 */
function createServer(port, logCallback) {
  const server = net.createServer((socket) => {
    let requestCount = 0;
    const receivedMessages = [];

    socket.on('data', (data) => { // 데이터 수신시
      const messages = data.toString().trim().split('\n');
      messages.forEach(message => {
        if (message) {
          requestCount++;
          receivedMessages.push({ id: requestCount, message });
          logCallback(`Received (${requestCount}): ${message}`);
        }
      });
    });

    socket.on('end', () => {  // 연결 종료 신호 수신시
      receivedMessages.forEach(({ id, message }) => {
        let response = message === 'Ping' ? 'Pong' : message;
        socket.write(`${response} (${id})\n`);
        logCallback(`Send: ${response} (${id})`);
      });

      socket.end(); // 종료
    });

    socket.on('error', (err) => { // 에러 발생시
      logCallback(`Socket error: ${err}`);
      console.error('Socket error:', err);
    });
  });

  server.listen(port, () => {
    let msg = `Server listening on port ${port}`;
    console.log(msg);
  });

  return server;
}

/**
 * 메인 함수
 * @param {number} port - 서버 포트 번호
 * @param {string[]} messages - 보낼 메시지 배열
 * @param {function(string): void} logCallback - 로그 메시지를 처리할 콜백 함수
 * @param {function(string[]): void} onEndCallback - 모든 응답을 받은 후 호출될 콜백
 */
function runClient(port, messages, logCallback, onEndCallback) {
  const client = new net.Socket();
  const responses = [];

  // 클라이언트 -> 서버
  client.connect(port, '127.0.0.1', () => { // 서버 연결
    messages.forEach((msg, index) => {
      client.write(`${msg}\n`); // 메세지 전송

      let message = `Send (${index + 1}): ${msg}`
      logCallback(message);
      console.log(message);
    });
    client.end(); // 연결 종료 신호 전송
  });

  // 서버 -> 클라이언트
  client.on('data', (data) => {
    const received = data.toString().trim().split('\n');
    received.forEach(msg => {
      if(msg) {
        responses.push(msg);  // 서버로부터 받은 응답 저장
        let message = `Received: ${msg}`
        logCallback(message);
        console.log(message);
      }
    });
  });

  client.on('close', () => {  // 연결 종료시
    onEndCallback(responses);
  });

  client.on('error', (err) => { // 에러 발생시
    logCallback(`Connection error: ${err}`);
    console.error('Connection error:', err);
  });
}

module.exports = { createServer, runClient };