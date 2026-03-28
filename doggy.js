const birthDateInput = document.getElementById("birthDate");
const targetDateInput = document.getElementById("targetDate");
const calculateBtn = document.getElementById("calculateBtn");
const resultDiv = document.getElementById("result");

const STORAGE_KEY = "miaoLiBirthDate";
const DEFAULT_BIRTH_DATE = "2023-02-28";

// 初始化日期
window.addEventListener("DOMContentLoaded", () => {
  const savedBirthDate = localStorage.getItem(STORAGE_KEY);
  birthDateInput.value = savedBirthDate || DEFAULT_BIRTH_DATE;

  const today = new Date().toISOString().split("T")[0];
  targetDateInput.value = today;
});

// 出生日期變更時立即儲存
birthDateInput.addEventListener("change", () => {
  localStorage.setItem(STORAGE_KEY, birthDateInput.value);
});

calculateBtn.addEventListener("click", () => {
  const birthDate = new Date(birthDateInput.value);
  const targetDate = new Date(targetDateInput.value);

  if (!birthDateInput.value || !targetDateInput.value) {
    resultDiv.textContent = "請選擇完整日期";
    return;
  }

  if (targetDate < birthDate) {
    resultDiv.textContent = "計算日期不能早於出生日期";
    return;
  }

  // 再次確保按下計算時也同步保存
  localStorage.setItem(STORAGE_KEY, birthDateInput.value);

  const diffMs = targetDate - birthDate;
  const dogYears = diffMs / (1000 * 60 * 60 * 24 * 365.2425);

  let humanYears;
  if (dogYears <= 2) {
    humanYears = dogYears * 10.5;
  } else {
    humanYears = 21 + (dogYears - 2) * 4;
  }

  resultDiv.innerHTML = `
    妙麗現在大約 ${dogYears.toFixed(1)} 歲，換算人類年齡大約是 ${humanYears.toFixed(1)} 歲。<br>
    狗的年齡是 ${dogYears.toFixed(1)} 歲<br>
    換算人類的年齡是 ${humanYears.toFixed(1)} 歲
  `;
});