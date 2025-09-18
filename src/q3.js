
const mysql = require('mysql2/promise');
const dateFormat = require('dateformat');

async function getEmployees() {
    // DB 연결
    const connection = await mysql.createConnection({
      host: 'codingtest.brique.kr',
      user: 'codingtest',
      password: '12brique!@',
      database: 'employees',
      dateStrings: true // 시간대 설정을 위해 설정
    });

    // 쿼리 조회
    const [rows] = await connection.execute(`
      SELECT 
          e.emp_no, 
          e.first_name, 
          e.last_name, 
          e.gender, 
          e.hire_date, 
          d.dept_name, 
          t.title,
          (SELECT MAX(s.salary) FROM salaries s WHERE s.emp_no = e.emp_no) as max_salary
      FROM 
          employees e
      JOIN 
          dept_emp de ON e.emp_no = de.emp_no
      JOIN 
          departments d ON de.dept_no = d.dept_no
      JOIN 
          titles t ON e.emp_no = t.emp_no
      WHERE 
          e.hire_date >= '2000-01-01'
          AND t.to_date = '9999-01-01'
          AND de.to_date = '9999-01-01'
      GROUP BY
          e.emp_no, d.dept_name;
    `);

  await connection.end(); // 연결 종료

  return rows.map(row => {
    return {
      ...row,
      hire_date: dateFormat(new Date(row.hire_date), 'yyyy-mm-dd')  // 날짜 데이터를 시간대 및 형식에 맞게 포맷
    };
  });
}

module.exports = { getEmployees };