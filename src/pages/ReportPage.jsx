import { BarChart3 } from 'lucide-react';

export default function ReportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">리포트</h1>
        <p className="text-sm text-gray-500 mt-0.5">수익/지출 분석 및 차트</p>
      </div>
      <div className="card flex flex-col items-center justify-center h-64 gap-3 text-gray-500">
        <BarChart3 size={40} className="text-indigo-800" />
        <p className="text-sm">3단계에서 구현 예정</p>
        <p className="text-xs text-gray-600">월별 추이 차트, 연간 요약, 카테고리별 파이차트</p>
      </div>
    </div>
  );
}
