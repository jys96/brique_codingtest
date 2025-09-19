function solve(heights) {
  const N = heights.length;
  const stack = [];
  const result = new Array(N).fill(0);

  for (let i = 0; i < N; i++) {
    const h = heights[i];

    // 현재 탑보다 낮거나 같은 탑은 제거 (수신 불가)
    while (stack.length > 0 && stack[stack.length - 1].height <= h) {
      stack.pop();
    }

    // 스택의 최상단 탑이 현재 탑의 신호 수신
    if (stack.length > 0) {
      result[i] = stack[stack.length - 1].index + 1; // 1-based 인덱스
    } else {
      result[i] = 0;
    }

    // 현재 탑을 스택에 추가
    stack.push({ height: h, index: i });
  }

  return result;
}

document.addEventListener("DOMContentLoaded", () => {
  const inputEl = document.getElementById("heights");
  const buttonEl = document.getElementById("run");
  const resultEl = document.getElementById("result");

  buttonEl.addEventListener("click", () => {
    const inputStr = inputEl.value.trim();
    if (!inputStr) {
      alert("탑 높이를 입력하세요.");
      return;
    }

    const heights = inputStr.split(/\s+/).map(Number);
    const result = solve(heights);
    resultEl.textContent = result.join(" ");
  });
});
