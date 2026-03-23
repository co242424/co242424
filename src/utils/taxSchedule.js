// 2026년 세금 일정 생성
export function generateTaxSchedules(year = 2026) {
  const schedules = [];

  // 부가세 신고 (1/4/7/10월 25일)
  const vatMonths = [1, 4, 7, 10];
  vatMonths.forEach((month) => {
    schedules.push({
      id: `vat-${year}-${month}`,
      type: 'vat',
      title: '부가세 신고',
      description: `${year}년 ${month === 1 ? '4분기' : month === 4 ? '1분기' : month === 7 ? '2분기' : '3분기'} 부가가치세 신고`,
      dueDate: `${year}-${String(month).padStart(2, '0')}-25`,
      category: '부가가치세',
      quarter: month === 1 ? 4 : month === 4 ? 1 : month === 7 ? 2 : 3,
    });
  });

  // 종합소득세 (5월 31일)
  schedules.push({
    id: `income-tax-${year}`,
    type: 'income_tax',
    title: '종합소득세 신고',
    description: `${year - 1}년 귀속 종합소득세 확정신고`,
    dueDate: `${year}-05-31`,
    category: '종합소득세',
  });

  // 재산세 (7월, 9월)
  schedules.push({
    id: `property-tax-${year}-7`,
    type: 'property_tax',
    title: '재산세 납부 (1기)',
    description: '건물분 재산세 1기 납부',
    dueDate: `${year}-07-31`,
    category: '재산세',
  });
  schedules.push({
    id: `property-tax-${year}-9`,
    type: 'property_tax',
    title: '재산세 납부 (2기)',
    description: '건물분 재산세 2기 납부',
    dueDate: `${year}-09-30`,
    category: '재산세',
  });

  // 종합부동산세 (12월)
  schedules.push({
    id: `jongbuse-${year}`,
    type: 'jongbuse',
    title: '종합부동산세 납부',
    description: `${year}년 종합부동산세 납부`,
    dueDate: `${year}-12-15`,
    category: '종합부동산세',
  });

  // 원천세 (매월 10일)
  for (let month = 1; month <= 12; month++) {
    schedules.push({
      id: `withholding-${year}-${month}`,
      type: 'withholding',
      title: '원천세 납부',
      description: `${year}년 ${month}월 원천세 납부`,
      dueDate: `${year}-${String(month).padStart(2, '0')}-10`,
      category: '원천세',
    });
  }

  // 세금계산서 발행 마감 (매월 말일 & 다음달 10일 - 여기서는 말일 기준)
  const monthEnds = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  for (let month = 1; month <= 12; month++) {
    const endDay = monthEnds[month - 1];
    schedules.push({
      id: `invoice-${year}-${month}`,
      type: 'invoice',
      title: '세금계산서 발행',
      description: `${year}년 ${month}월분 세금계산서 발행`,
      dueDate: `${year}-${String(month).padStart(2, '0')}-${endDay}`,
      category: '세금계산서',
    });
  }

  return schedules;
}

// D-day 계산
export function calculateDday(dueDateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(dueDateStr);
  dueDate.setHours(0, 0, 0, 0);
  const diff = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
  return diff;
}

// 일정 상태 (색상/우선순위)
export function getScheduleStatus(dday, isCompleted) {
  if (isCompleted) return 'completed';
  if (dday < 0) return 'overdue';
  if (dday <= 7) return 'urgent';
  if (dday <= 30) return 'warning';
  return 'normal';
}

export function getStatusColor(status) {
  switch (status) {
    case 'completed': return { bg: 'bg-green-900/30', border: 'border-green-700', text: 'text-green-400', badge: 'bg-green-900 text-green-300' };
    case 'overdue':   return { bg: 'bg-red-900/30', border: 'border-red-700', text: 'text-red-400', badge: 'bg-red-900 text-red-300' };
    case 'urgent':    return { bg: 'bg-red-900/20', border: 'border-red-800', text: 'text-red-400', badge: 'bg-red-900/60 text-red-300' };
    case 'warning':   return { bg: 'bg-yellow-900/20', border: 'border-yellow-800', text: 'text-yellow-400', badge: 'bg-yellow-900/60 text-yellow-300' };
    default:          return { bg: 'bg-[#1a1d27]', border: 'border-[#2d3148]', text: 'text-gray-400', badge: 'bg-[#2d3148] text-gray-300' };
  }
}

// D-day 텍스트
export function formatDday(dday) {
  if (dday === 0) return 'D-Day';
  if (dday > 0) return `D-${dday}`;
  return `D+${Math.abs(dday)}`;
}
