// 호실 및 세입자 정보
export const initialTenants = [
  {
    id: 1,
    room: '101호',
    tenantName: '(주)테크스타트',
    monthlyRent: 1500000,
    deposit: 15000000,
    contractStart: '2024-01-01',
    contractEnd: '2025-12-31',
    area: 33.5,
    businessType: 'IT/소프트웨어',
    contactPhone: '010-1234-5678',
    email: 'admin@techstart.kr',
  },
  {
    id: 2,
    room: '203호',
    tenantName: '디자인랩 김민준',
    monthlyRent: 1200000,
    deposit: 12000000,
    contractStart: '2024-03-01',
    contractEnd: '2026-02-28',
    area: 26.4,
    businessType: '디자인/크리에이티브',
    contactPhone: '010-2345-6789',
    email: 'minjun@designlab.co.kr',
  },
  {
    id: 3,
    room: '305호',
    tenantName: '이지물류(주)',
    monthlyRent: 2000000,
    deposit: 20000000,
    contractStart: '2023-06-01',
    contractEnd: '2025-05-31',
    area: 49.6,
    businessType: '물류/유통',
    contactPhone: '010-3456-7890',
    email: 'info@ezilogis.com',
  },
  {
    id: 4,
    room: '412호',
    tenantName: '클라우드넷 박서준',
    monthlyRent: 1800000,
    deposit: 18000000,
    contractStart: '2024-07-01',
    contractEnd: '2026-06-30',
    area: 39.7,
    businessType: 'IT/클라우드',
    contactPhone: '010-4567-8901',
    email: 'sjpark@cloudnet.io',
  },
  {
    id: 5,
    room: '501호',
    tenantName: '바이오메드(주)',
    monthlyRent: 2500000,
    deposit: 25000000,
    contractStart: '2023-01-01',
    contractEnd: '2024-12-31',
    area: 66.1,
    businessType: '바이오/의료',
    contactPhone: '010-5678-9012',
    email: 'contact@biomed.co.kr',
  },
];

// 월세 입금 내역 (최근 6개월)
export const initialPayments = [
  // 2025년 10월
  { id: 101, tenantId: 1, year: 2025, month: 10, amount: 1500000, paidDate: '2025-10-05', status: 'paid' },
  { id: 102, tenantId: 2, year: 2025, month: 10, amount: 1200000, paidDate: '2025-10-03', status: 'paid' },
  { id: 103, tenantId: 3, year: 2025, month: 10, amount: 2000000, paidDate: '2025-10-07', status: 'paid' },
  { id: 104, tenantId: 4, year: 2025, month: 10, amount: 1800000, paidDate: '2025-10-04', status: 'paid' },
  { id: 105, tenantId: 5, year: 2025, month: 10, amount: 2500000, paidDate: '2025-10-06', status: 'paid' },
  // 2025년 11월
  { id: 106, tenantId: 1, year: 2025, month: 11, amount: 1500000, paidDate: '2025-11-05', status: 'paid' },
  { id: 107, tenantId: 2, year: 2025, month: 11, amount: 1200000, paidDate: '2025-11-04', status: 'paid' },
  { id: 108, tenantId: 3, year: 2025, month: 11, amount: 2000000, paidDate: '2025-11-08', status: 'paid' },
  { id: 109, tenantId: 4, year: 2025, month: 11, amount: 1800000, paidDate: '2025-11-03', status: 'paid' },
  { id: 110, tenantId: 5, year: 2025, month: 11, amount: 2500000, paidDate: '2025-11-06', status: 'paid' },
  // 2025년 12월
  { id: 111, tenantId: 1, year: 2025, month: 12, amount: 1500000, paidDate: '2025-12-05', status: 'paid' },
  { id: 112, tenantId: 2, year: 2025, month: 12, amount: 1200000, paidDate: '2025-12-04', status: 'paid' },
  { id: 113, tenantId: 3, year: 2025, month: 12, amount: 2000000, paidDate: '2025-12-09', status: 'paid' },
  { id: 114, tenantId: 4, year: 2025, month: 12, amount: 1800000, paidDate: '2025-12-03', status: 'paid' },
  { id: 115, tenantId: 5, year: 2025, month: 12, amount: 2500000, paidDate: '2025-12-07', status: 'paid' },
  // 2026년 1월
  { id: 116, tenantId: 1, year: 2026, month: 1, amount: 1500000, paidDate: '2026-01-06', status: 'paid' },
  { id: 117, tenantId: 2, year: 2026, month: 1, amount: 1200000, paidDate: '2026-01-05', status: 'paid' },
  { id: 118, tenantId: 3, year: 2026, month: 1, amount: 2000000, paidDate: '2026-01-08', status: 'paid' },
  { id: 119, tenantId: 4, year: 2026, month: 1, amount: 1800000, paidDate: '2026-01-04', status: 'paid' },
  { id: 120, tenantId: 5, year: 2026, month: 1, amount: 2500000, paidDate: '2026-01-07', status: 'paid' },
  // 2026년 2월
  { id: 121, tenantId: 1, year: 2026, month: 2, amount: 1500000, paidDate: '2026-02-05', status: 'paid' },
  { id: 122, tenantId: 2, year: 2026, month: 2, amount: 1200000, paidDate: '2026-02-04', status: 'paid' },
  { id: 123, tenantId: 3, year: 2026, month: 2, amount: 2000000, paidDate: '2026-02-10', status: 'paid' },
  { id: 124, tenantId: 4, year: 2026, month: 2, amount: 1800000, paidDate: '2026-02-03', status: 'paid' },
  { id: 125, tenantId: 5, year: 2026, month: 2, amount: 2500000, paidDate: '2026-02-07', status: 'paid' },
  // 2026년 3월 (이번 달 - 일부 미납)
  { id: 126, tenantId: 1, year: 2026, month: 3, amount: 1500000, paidDate: '2026-03-05', status: 'paid' },
  { id: 127, tenantId: 2, year: 2026, month: 3, amount: 1200000, paidDate: null, status: 'unpaid' },
  { id: 128, tenantId: 3, year: 2026, month: 3, amount: 2000000, paidDate: null, status: 'overdue' },
  { id: 129, tenantId: 4, year: 2026, month: 3, amount: 1800000, paidDate: '2026-03-04', status: 'paid' },
  { id: 130, tenantId: 5, year: 2026, month: 3, amount: 2500000, paidDate: null, status: 'unpaid' },
];

// 지출 내역
export const initialExpenses = [
  { id: 1, year: 2025, month: 10, category: '대출이자', amount: 1200000, description: '신한은행 대출이자', date: '2025-10-25' },
  { id: 2, year: 2025, month: 10, category: '관리비', amount: 350000, description: '건물 관리비', date: '2025-10-20' },
  { id: 3, year: 2025, month: 10, category: '기타', amount: 80000, description: '소모품 구입', date: '2025-10-15' },
  { id: 4, year: 2025, month: 11, category: '대출이자', amount: 1200000, description: '신한은행 대출이자', date: '2025-11-25' },
  { id: 5, year: 2025, month: 11, category: '관리비', amount: 350000, description: '건물 관리비', date: '2025-11-20' },
  { id: 6, year: 2025, month: 11, category: '세금', amount: 450000, description: '원천세', date: '2025-11-10' },
  { id: 7, year: 2025, month: 12, category: '대출이자', amount: 1200000, description: '신한은행 대출이자', date: '2025-12-25' },
  { id: 8, year: 2025, month: 12, category: '관리비', amount: 350000, description: '건물 관리비', date: '2025-12-20' },
  { id: 9, year: 2025, month: 12, category: '세금', amount: 2100000, description: '종합부동산세', date: '2025-12-15' },
  { id: 10, year: 2026, month: 1, category: '대출이자', amount: 1200000, description: '신한은행 대출이자', date: '2026-01-25' },
  { id: 11, year: 2026, month: 1, category: '관리비', amount: 350000, description: '건물 관리비', date: '2026-01-20' },
  { id: 12, year: 2026, month: 1, category: '세금', amount: 450000, description: '원천세', date: '2026-01-10' },
  { id: 13, year: 2026, month: 2, category: '대출이자', amount: 1200000, description: '신한은행 대출이자', date: '2026-02-25' },
  { id: 14, year: 2026, month: 2, category: '관리비', amount: 350000, description: '건물 관리비', date: '2026-02-20' },
  { id: 15, year: 2026, month: 2, category: '세금', amount: 450000, description: '원천세', date: '2026-02-10' },
  { id: 16, year: 2026, month: 3, category: '대출이자', amount: 1200000, description: '신한은행 대출이자', date: '2026-03-25' },
  { id: 17, year: 2026, month: 3, category: '관리비', amount: 350000, description: '건물 관리비', date: '2026-03-20' },
  { id: 18, year: 2026, month: 3, category: '세금', amount: 450000, description: '원천세', date: '2026-03-10' },
];

// 세금계산서 내역
export const initialTaxInvoices = [
  { id: 1, tenantId: 1, year: 2026, month: 1, supplyAmount: 1363636, taxAmount: 136364, totalAmount: 1500000, issueDate: '2026-01-10', status: 'issued' },
  { id: 2, tenantId: 2, year: 2026, month: 1, supplyAmount: 1090909, taxAmount: 109091, totalAmount: 1200000, issueDate: '2026-01-10', status: 'issued' },
  { id: 3, tenantId: 3, year: 2026, month: 1, supplyAmount: 1818182, taxAmount: 181818, totalAmount: 2000000, issueDate: '2026-01-10', status: 'issued' },
  { id: 4, tenantId: 4, year: 2026, month: 1, supplyAmount: 1636364, taxAmount: 163636, totalAmount: 1800000, issueDate: '2026-01-10', status: 'issued' },
  { id: 5, tenantId: 5, year: 2026, month: 1, supplyAmount: 2272727, taxAmount: 227273, totalAmount: 2500000, issueDate: '2026-01-10', status: 'issued' },
  { id: 6, tenantId: 1, year: 2026, month: 2, supplyAmount: 1363636, taxAmount: 136364, totalAmount: 1500000, issueDate: '2026-02-10', status: 'issued' },
  { id: 7, tenantId: 2, year: 2026, month: 2, supplyAmount: 1090909, taxAmount: 109091, totalAmount: 1200000, issueDate: '2026-02-10', status: 'issued' },
  { id: 8, tenantId: 3, year: 2026, month: 2, supplyAmount: 1818182, taxAmount: 181818, totalAmount: 2000000, issueDate: null, status: 'pending' },
  { id: 9, tenantId: 4, year: 2026, month: 2, supplyAmount: 1636364, taxAmount: 163636, totalAmount: 1800000, issueDate: '2026-02-10', status: 'issued' },
  { id: 10, tenantId: 5, year: 2026, month: 2, supplyAmount: 2272727, taxAmount: 227273, totalAmount: 2500000, issueDate: null, status: 'pending' },
  { id: 11, tenantId: 1, year: 2026, month: 3, supplyAmount: 1363636, taxAmount: 136364, totalAmount: 1500000, issueDate: null, status: 'pending' },
  { id: 12, tenantId: 2, year: 2026, month: 3, supplyAmount: 1090909, taxAmount: 109091, totalAmount: 1200000, issueDate: null, status: 'pending' },
  { id: 13, tenantId: 3, year: 2026, month: 3, supplyAmount: 1818182, taxAmount: 181818, totalAmount: 2000000, issueDate: null, status: 'pending' },
  { id: 14, tenantId: 4, year: 2026, month: 3, supplyAmount: 1636364, taxAmount: 163636, totalAmount: 1800000, issueDate: null, status: 'pending' },
  { id: 15, tenantId: 5, year: 2026, month: 3, supplyAmount: 2272727, taxAmount: 227273, totalAmount: 2500000, issueDate: null, status: 'pending' },
];

// 대출 정보
export const initialLoans = [
  {
    id: 1,
    bankName: '신한은행',
    loanAmount: 500000000,
    currentBalance: 480000000,
    interestRate: 3.5,
    startDate: '2022-06-01',
    maturityDate: '2027-06-01',
    repaymentType: '원리금균등',
    monthlyPayment: 1200000,
    description: '지식산업센터 담보대출',
  },
];

// 세금 일정 완료 여부
export const initialTaxScheduleCompletion = {};
