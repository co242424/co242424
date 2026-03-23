import { Building2 } from 'lucide-react';

export default function RentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">월세 관리</h1>
        <p className="text-sm text-gray-500 mt-0.5">세입자별 월세 현황 및 입금 내역 관리</p>
      </div>
      <div className="card flex flex-col items-center justify-center h-64 gap-3 text-gray-500">
        <Building2 size={40} className="text-indigo-800" />
        <p className="text-sm">2단계에서 구현 예정</p>
        <p className="text-xs text-gray-600">월세 입금 확인, 연체 관리, CRUD 기능</p>
      </div>
    </div>
  );
}
