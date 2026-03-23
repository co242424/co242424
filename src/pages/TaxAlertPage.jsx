import { useMemo } from 'react';
import { Bell, CheckCircle2, Clock, Calendar } from 'lucide-react';
import { generateTaxSchedules, calculateDday, getScheduleStatus, getStatusColor, formatDday } from '../utils/taxSchedule';
import { formatDateKR } from '../utils/formatters';

const CATEGORY_ICONS = {
  '부가가치세': '🧾',
  '종합소득세': '📋',
  '재산세': '🏠',
  '종합부동산세': '🏢',
  '원천세': '💼',
  '세금계산서': '📄',
};

export default function TaxAlertPage({ taxCompletions, onToggleCompletion }) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const schedules = useMemo(() => generateTaxSchedules(currentYear), [currentYear]);

  const enriched = useMemo(() => {
    return schedules.map((s) => {
      const dday = calculateDday(s.dueDate);
      const status = getScheduleStatus(dday, taxCompletions[s.id]);
      return { ...s, dday, status };
    }).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }, [schedules, taxCompletions]);

  const grouped = useMemo(() => {
    const groups = {};
    enriched.forEach((s) => {
      const month = s.dueDate.slice(0, 7); // YYYY-MM
      if (!groups[month]) groups[month] = [];
      groups[month].push(s);
    });
    return groups;
  }, [enriched]);

  const stats = useMemo(() => ({
    total: enriched.length,
    completed: enriched.filter((s) => s.status === 'completed').length,
    urgent: enriched.filter((s) => s.status === 'urgent').length,
    overdue: enriched.filter((s) => s.status === 'overdue').length,
  }), [enriched]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">세금 알림</h1>
        <p className="text-sm text-gray-500 mt-0.5">{currentYear}년 세금 일정 관리</p>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: '전체 일정', value: stats.total, color: 'text-gray-300', bg: 'bg-[#1a1d27]' },
          { label: '처리완료', value: stats.completed, color: 'text-green-400', bg: 'bg-green-900/20' },
          { label: '임박 (7일 이내)', value: stats.urgent, color: 'text-red-400', bg: 'bg-red-900/20' },
          { label: '기한 초과', value: stats.overdue, color: 'text-orange-400', bg: 'bg-orange-900/20' },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className={`card ${bg} border-[#2d3148]`}>
            <p className="text-xs text-gray-500">{label}</p>
            <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* 월별 일정 */}
      <div className="space-y-6">
        {Object.entries(grouped).map(([month, items]) => {
          const [y, m] = month.split('-');
          const isPast = new Date(parseInt(y), parseInt(m) - 1) < new Date(now.getFullYear(), now.getMonth());
          return (
            <div key={month}>
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={15} className="text-indigo-400" />
                <h2 className={`text-sm font-semibold ${isPast ? 'text-gray-500' : 'text-white'}`}>
                  {y}년 {parseInt(m)}월
                </h2>
                <span className="text-xs text-gray-600">
                  ({items.filter((i) => i.status === 'completed').length}/{items.length} 완료)
                </span>
              </div>
              <div className="space-y-2">
                {items.map((item) => {
                  const colors = getStatusColor(item.status);
                  const isCompleted = item.status === 'completed';
                  return (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${colors.bg} ${colors.border} ${isCompleted ? 'opacity-60' : ''}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-lg">{CATEGORY_ICONS[item.category] || '📅'}</span>
                        <div className="min-w-0">
                          <p className={`text-sm font-medium ${isCompleted ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500">{item.description} • {formatDateKR(item.dueDate)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        {!isCompleted && (
                          <span className={`badge ${colors.badge} font-bold text-xs`}>
                            {formatDday(item.dday)}
                          </span>
                        )}
                        <button
                          onClick={() => onToggleCompletion(item.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            isCompleted
                              ? 'bg-green-900/40 text-green-400 hover:bg-red-900/40 hover:text-red-400'
                              : 'bg-[#2d3148] text-gray-400 hover:bg-green-900/40 hover:text-green-400'
                          }`}
                        >
                          <CheckCircle2 size={13} />
                          {isCompleted ? '완료' : '처리완료'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
