import { Landmark } from 'lucide-react';

export default function LoanPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">대출 관리</h1>
        <p className="text-sm text-gray-500 mt-0.5">은행 대출 및 이자 납부 관리</p>
      </div>
      <div className="card flex flex-col items-center justify-center h-64 gap-3 text-gray-500">
        <Landmark size={40} className="text-indigo-800" />
        <p className="text-sm">6단계에서 구현 예정</p>
        <p className="text-xs text-gray-600">대출 정보, 이자 내역, 만기일 알림</p>
      </div>
    </div>
  );
}
