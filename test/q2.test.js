const { createServer, runClient } = require('../src/q2');

const PORT = 3000;

describe('processes q2 >>>', () => {
    let server;

    // 모든 테스트가 끝난 후 서버 종료
    afterAll((done) => {
        if (server) {
          server.close(done);
        } else {
          done();
        }
    });

    test('TCP asynchronous request', async () => {
        const messages = ['Ping', 'Ping', 'foobar'];
        const serverLogs = [];
        const clientLogs = [];

        const result = await new Promise((resolve) => {
          // 서버 생성
            server = createServer(PORT, (log) => serverLogs.push(log));

            server.on('listening', () => {
                runClient(PORT, messages, 
                    (log) => clientLogs.push(log), 
                    (responses) => {
                        resolve({ responses, clientLogs, serverLogs });
                    }
                );
            });
        });

        expect(result).toMatchSnapshot();
    }, 10000);
});
