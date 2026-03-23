// 원화 포맷
export function formatKRW(amount) {
  return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount);
}

// 숫자 포맷 (단위: 만원)
export function formatManWon(amount) {
  const manWon = Math.round(amount / 10000);
  return `${manWon.toLocaleString('ko-KR')}만원`;
}

// 날짜 포맷 (YYYY-MM-DD → YYYY년 MM월 DD일)
export function formatDateKR(dateStr) {
  if (!dateStr) return '-';
  const [y, m, d] = dateStr.split('-');
  return `${y}년 ${parseInt(m)}월 ${parseInt(d)}일`;
}

// 날짜 포맷 (YYYY-MM-DD → M월 D일)
export function formatDateShort(dateStr) {
  if (!dateStr) return '-';
  const [, m, d] = dateStr.split('-');
  return `${parseInt(m)}월 ${parseInt(d)}일`;
}

// YYYY년 MM월
export function formatYearMonth(year, month) {
  return `${year}년 ${month}월`;
}

// 연체일수 계산
export function calcOverdueDays(year, month) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // 해당 월 마지막날 기준
  const dueDate = new Date(year, month - 1 + 1, 0);
  if (today <= dueDate) return 0;
  return Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
}
