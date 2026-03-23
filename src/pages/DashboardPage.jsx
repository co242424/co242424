import { useMemo } from 'react';
import {
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle2,
  Calendar, ArrowRight, Building2, FileText, Bell, Clock,
} from 'lucide-react';
import { generateTaxSchedules, calculateDday, getScheduleStatus, getStatusColor, formatDday } from '../utils/taxSchedule';
import { formatKRW, formatDateShort } from '../utils/formatters';

// 지표 카드 컴포넌트
function MetricCard({ title, value, sub, icon: Icon, color, trend }) {
  const colorMap = {
    indigo: 'text-indigo-400 bg-indigo-900/30',
    green: 'text-green-400 bg-green-900/30',
    red: 'text-red-400 bg-red-900/30',
    yellow: 'text-yellow-400 bg-yellow-900/30',
  };

  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{title}</p>
          <p className="mt-1.5 text-2xl font-bold text-white">{value}</p>
        </div>
        <div className={`p-2.5 rounded-lg ${colorMap[color]}`}>
          <Icon size={20} />
        </div>
      </div>
      {sub && (
        <p className="text-xs text-gray-500 border-t border-[#2d3148] pt-2.5">{sub}</p>
      )}
      {trend !== undefined && (
        <div className="flex items-center gap-1 text-xs border-t border-[#2d3148] pt-2.5">
          {trend >= 0 ? (
            <TrendingUp size={12} className="text-green-400" />
          ) : (
            <TrendingDown size={12} className="text-red-400" />
          )}
          <span className={trend >= 0 ? 'text-green-400' : 'text-red-400'}>
            전월 대비 {trend >= 0 ? '+' : ''}{formatKRW(trend)}
          </span>
        </div>
      )}
    </div>
  );
}

// 미납 세입자 알림 배너
function UnpaidAlert({ unpaidTenants }) {
  if (!unpaidTenants.length) return null;
  return (
    <div className="bg-red-900/20 border border-red-800/60 rounded-xl px-4 py-3 flex items-start gap-3">
      <AlertTriangle size={18} className="text-red-400 mt-0.5 shrink-0" />
      <div>
        <p className="text-sm font-semibold text-red-300">이번 달 미입금 세입자</p>
        <div className="mt-1.5 flex flex-wrap gap-2">
          {unpaidTenants.map((t) => (
            <span
              key={t.id}
              className="inline-flex items-center gap-1 text-xs bg-red-900/50 text-red-300 px-2.5 py-1 rounded-full border border-red-800/50"
            >
              <Building2 size={11} />
              {t.room} {t.tenantName}
              {t.status === 'overdue' && (
                <span className="text-red-400 font-bold"> (연체)</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// 세금 일정 위젯
function TaxScheduleWidget({ schedules, completedMap, onNavigate }) {
  const now = new Date();
  const upcoming = useMemo(() => {
    return schedules
      .map((s) => {
        const dday = calculateDday(s.dueDate);
        const status = getScheduleStatus(dday, completedMap[s.id]);
        return { ...s, dday, status };
      })
      .filter((s) => s.status !== 'completed' && s.dday >= -3 && s.dday <= 60)
      .sort((a, b) => a.dday - b.dday)
      .slice(0, 6);
  }, [schedules, completedMap]);

  return (
    <div className="card flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell size={18} className="text-indigo-400" />
          <h2 className="text-sm font-semibold text-white">다가오는 세금 일정</h2>
        </div>
        <button
          onClick={() => onNavigate('taxalert')}
          className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          전체보기 <ArrowRight size={12} />
        </button>
      </div>

      {upcoming.length === 0 ? (
        <div className="flex items-center justify-center h-24 text-gray-500 text-sm">
          <CheckCircle2 size={16} className="mr-2 text-green-500" />
          30일 이내 일정 없음
        </div>
      ) : (
        <ul className="space-y-2">
          {upcoming.map((item) => {
            const colors = getStatusColor(item.status);
            return (
              <li
                key={item.id}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg border ${colors.bg} ${colors.border}`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Clock size={13} className={colors.text} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-200 truncate">{item.title}</p>
                    <p className="text-xs text-gray-500">{formatDateShort(item.dueDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className={`badge ${colors.badge} font-bold`}>
                    {formatDday(item.dday)}
                  </span>
                  <span className={`badge ${colors.badge}`}>
                    {item.category}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// 최근 입금 내역
function RecentPayments({ payments, tenants }) {
  const recent = useMemo(() => {
    return [...payments]
      .filter((p) => p.status === 'paid' && p.paidDate)
      .sort((a, b) => new Date(b.paidDate) - new Date(a.paidDate))
      .slice(0, 5)
      .map((p) => ({
        ...p,
        tenant: tenants.find((t) => t.id === p.tenantId),
      }));
  }, [payments, tenants]);

  return (
    <div className="card flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <FileText size={18} className="text-green-400" />
        <h2 className="text-sm font-semibold text-white">최근 입금 내역</h2>
      </div>
      <div className="space-y-2">
        {recent.map((p) => (
          <div key={p.id} className="flex items-center justify-between py-2 border-b border-[#2d3148] last:border-0">
            <div>
              <p className="text-sm text-gray-200">{p.tenant?.room} {p.tenant?.tenantName}</p>
              <p className="text-xs text-gray-500">{p.paidDate} • {p.year}년 {p.month}월분</p>
            </div>
            <span className="text-sm font-semibold text-green-400">{formatKRW(p.amount)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 호실 현황 요약
function RoomSummary({ tenants, currentPayments }) {
  return (
    <div className="card flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Building2 size={18} className="text-indigo-400" />
        <h2 className="text-sm font-semibold text-white">이번 달 호실 현황</h2>
      </div>
      <div className="space-y-2">
        {tenants.map((t) => {
          const payment = currentPayments.find((p) => p.tenantId === t.id);
          const status = payment?.status || 'unpaid';
          const statusConfig = {
            paid: { label: '입금완료', cls: 'bg-green-900/50 text-green-300 border-green-800/50' },
            unpaid: { label: '미입금', cls: 'bg-yellow-900/50 text-yellow-300 border-yellow-800/50' },
            overdue: { label: '연체', cls: 'bg-red-900/50 text-red-300 border-red-800/50' },
          };
          const cfg = statusConfig[status];
          return (
            <div key={t.id} className="flex items-center justify-between py-1.5">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-medium text-indigo-400 bg-indigo-900/30 px-2 py-0.5 rounded">{t.room}</span>
                <span className="text-sm text-gray-200">{t.tenantName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-300">{formatKRW(t.monthlyRent)}</span>
                <span className={`badge border ${cfg.cls}`}>{cfg.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function DashboardPage({ tenants, payments, expenses, taxCompletions, onNavigate }) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const taxSchedules = useMemo(() => generateTaxSchedules(currentYear), [currentYear]);

  // 이번 달 입금 데이터
  const currentMonthPayments = useMemo(
    () => payments.filter((p) => p.year === currentYear && p.month === currentMonth),
    [payments, currentYear, currentMonth]
  );

  // 지난달 입금 데이터
  const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const lastYear = currentMonth === 1 ? currentYear - 1 : currentYear;
  const lastMonthPayments = useMemo(
    () => payments.filter((p) => p.year === lastYear && p.month === lastMonth),
    [payments, lastYear, lastMonth]
  );

  // 이번 달 수입
  const currentIncome = useMemo(
    () => currentMonthPayments.filter((p) => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
    [currentMonthPayments]
  );

  // 지난달 수입
  const lastIncome = useMemo(
    () => lastMonthPayments.filter((p) => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
    [lastMonthPayments]
  );

  // 이번 달 지출
  const currentExpenses = useMemo(
    () => expenses
      .filter((e) => e.year === currentYear && e.month === currentMonth)
      .reduce((sum, e) => sum + e.amount, 0),
    [expenses, currentYear, currentMonth]
  );

  // 순수익
  const netProfit = currentIncome - currentExpenses;

  // 미납/연체 세입자
  const unpaidTenants = useMemo(() => {
    return tenants
      .map((t) => {
        const payment = currentMonthPayments.find((p) => p.tenantId === t.id);
        return { ...t, status: payment?.status || 'unpaid', payment };
      })
      .filter((t) => t.status !== 'paid');
  }, [tenants, currentMonthPayments]);

  // 연체 건수
  const overdueCount = unpaidTenants.filter((t) => t.status === 'overdue').length;

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h1 className="text-xl font-bold text-white">대시보드</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {currentYear}년 {currentMonth}월 현황
        </p>
      </div>

      {/* 미납 알림 */}
      <UnpaidAlert unpaidTenants={unpaidTenants} />

      {/* 핵심 지표 카드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="이번달 총 수입"
          value={formatKRW(currentIncome)}
          icon={TrendingUp}
          color="green"
          trend={currentIncome - lastIncome}
        />
        <MetricCard
          title="이번달 총 지출"
          value={formatKRW(currentExpenses)}
          icon={TrendingDown}
          color="red"
          sub={`대출이자 + 관리비 + 세금`}
        />
        <MetricCard
          title="순수익"
          value={formatKRW(netProfit)}
          icon={TrendingUp}
          color={netProfit >= 0 ? 'indigo' : 'red'}
          sub={`수입 - 지출`}
        />
        <MetricCard
          title="연체 현황"
          value={`${overdueCount}건`}
          icon={AlertTriangle}
          color={overdueCount > 0 ? 'red' : 'green'}
          sub={unpaidTenants.length > 0 ? `미입금 ${unpaidTenants.length}건 포함` : '이번달 전원 납부'}
        />
      </div>

      {/* 하단 그리드 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 세금 일정 위젯 */}
        <TaxScheduleWidget
          schedules={taxSchedules}
          completedMap={taxCompletions}
          onNavigate={onNavigate}
        />

        {/* 호실 현황 */}
        <RoomSummary tenants={tenants} currentPayments={currentMonthPayments} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 최근 입금 내역 */}
        <RecentPayments payments={payments} tenants={tenants} />

        {/* 월별 요약 */}
        <div className="card flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-yellow-400" />
            <h2 className="text-sm font-semibold text-white">월별 수입 요약</h2>
          </div>
          <div className="space-y-2.5">
            {[-5, -4, -3, -2, -1, 0].map((offset) => {
              let y = currentYear;
              let m = currentMonth + offset;
              while (m <= 0) { m += 12; y -= 1; }
              while (m > 12) { m -= 12; y += 1; }
              const monthPay = payments
                .filter((p) => p.year === y && p.month === m && p.status === 'paid')
                .reduce((sum, p) => sum + p.amount, 0);
              const monthExp = expenses
                .filter((e) => e.year === y && e.month === m)
                .reduce((sum, e) => sum + e.amount, 0);
              const net = monthPay - monthExp;
              const isCurrentMonth = offset === 0;
              return (
                <div key={`${y}-${m}`} className={`flex items-center justify-between py-1.5 ${isCurrentMonth ? 'border border-indigo-800/50 bg-indigo-900/10 rounded-lg px-2' : ''}`}>
                  <span className="text-xs text-gray-400 w-16 shrink-0">{y}.{String(m).padStart(2, '0')}{isCurrentMonth && ' (현재)'}</span>
                  <div className="flex-1 mx-3 bg-[#2d3148] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${Math.min(100, (monthPay / 9000000) * 100)}%` }}
                    />
                  </div>
                  <span className={`text-xs font-medium w-20 text-right shrink-0 ${net >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {net >= 0 ? '+' : ''}{(net / 10000).toFixed(0)}만
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
