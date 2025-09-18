const fetch = require('node-fetch');

/**
 * 사이트 호출
 * @param {string} url 호출할 사이트 url
 * @returns 호출한 데이터
 */
async function callRandomEndpoint(url) {
    const counts = {};

    for (let i = 0; i < 100; i++) {
        const response = await fetch(url);
        const data = await response.text();
        counts[data] = (counts[data] || 0) + 1;
    }

    const sortedCounts = Object.entries(counts).sort(([, a], [, b]) => b - a);

    return sortedCounts;
}

module.exports = { callRandomEndpoint };
