const { getEmployees } = require('../src/q3');

test('processes q3 >>>', async () => {
    const employees = await getEmployees();

    expect(employees).toMatchSnapshot();
    console.log(employees);
}, 10000);