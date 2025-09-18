// -------- 헬퍼 함수 --------

/**
 * 합계 계산 함수
 * 
 * @param {number[]} numbers - 숫자 배열
 * @returns {number} 총합
 */
const getSum = (numbers) => numbers.reduce((acc, val) => acc + val, 0);

/**
 * 평균값 계산 함수
 * 
 * @param {number[]} numbers - 숫자 배열
 * @returns {number} 평균값
 */
const getAverage = (numbers) => getSum(numbers) / numbers.length;

/**
 * 표준편차 계산 함수
 * 
 * @param {number[]} numbers - 숫자 배열
 * @returns {number} 표준편차
 */
const getStandardDeviation = (numbers) => {
    const avg = getAverage(numbers);
    const squareDiffs = numbers.map(val => Math.pow(val - avg, 2));
    const avgSquareDiff = getAverage(squareDiffs);

    return Math.sqrt(avgSquareDiff);
};

/**
 * 중간값 계산 함수
 * 
 * @param {number[]} numbers - 숫자 배열
 * @returns {number} 중간값
 */
const getMedian = (numbers) => {
    const sorted = [...numbers].sort((a, b) => a - b); 
    const mid = Math.floor(sorted.length / 2);

    // 배열의 길이가 짝수면 중앙의 두 값의 평균, 홀수면 중앙값을 반환
    if (sorted.length % 2 === 0) {
        return (sorted[mid - 1] + sorted[mid]) / 2;
    }
    return sorted[mid];
};




/**
 * 메인 데이터 처리 함수
 * 
 * @param {Array} datas - CSV 데이터
 * @returns {{totalLines: number, calculatedLines: number, errorValues: Array, statistics: Array}}
 */
 function processData(datas) {
    let totalLines = 0;         // 총 라인(행) 수
    let calculatedLines = 0;    // 성공적으로 계산된 라인(행)의 수
    const errorValues = [];     // 숫자가 아닌 값을 수집할 배열
    const statistics = [];      // 계산된 통계 결과를 저장할 배열

    datas.forEach(values => {     // 라인(행) 작업
        const numbers = [];
        let hasError = false;   // 숫자가 아닌 데이터가 포함 여부

        totalLines++;

        values.forEach(val => { // 각 데이터 작업업
            const num = Number(val);

            // 숫자가 아닌 데이터인 경우 계산을 작업을 하면 안되므로 오류 변수 값 변경하고, 오류 배열에 라인(행) 데이터 추가
            if (isNaN(num)) {
                hasError = true;
                errorValues.push(val);
            } else {
                numbers.push(num);
            }
        });

        // 해당 라인에 오류가 없고, 숫자가 하나 이상 존재하면 통계를 계산
        if (!hasError && numbers.length > 0) {
            const min = Math.min(...numbers);
            const max = Math.max(...numbers);
            const sum = getSum(numbers);
            const avg = getAverage(numbers);
            const stdDev = getStandardDeviation(numbers);
            const median = getMedian(numbers);

            calculatedLines++;

            // 계산 결과 형식 문자 생성 (최소값 최대값 합계 평균 표준편차 중간값)
            const resultString = `${min.toFixed(1)} ${max.toFixed(1)} ${sum.toFixed(1)} ${avg.toFixed(1)} ${stdDev} ${median.toFixed(1)}`;

            statistics.push(resultString);
        }
    });

    return {
        totalLines,
        calculatedLines,
        errorValues,
        statistics
    };
}

module.exports = {
    getSum,
    getAverage,
    getStandardDeviation,
    getMedian,
    processData
};
