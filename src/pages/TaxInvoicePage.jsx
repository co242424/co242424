import { Receipt } from 'lucide-react';

export default function TaxInvoicePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">세금계산서 관리</h1>
        <p className="text-sm text-gray-500 mt-0.5">세입자별 세금계산서 발행 및 관리</p>
      </div>
      <div className="card flex flex-col items-center justify-center h-64 gap-3 text-gray-500">
        <Receipt size={40} className="text-indigo-800" />
        <p className="text-sm">4단계에서 구현 예정</p>
        <p className="text-xs text-gray-600">세금계산서 발행 내역, 미발행 알림, 분기별 요약</p>
      </div>
    </div>
  );
}
