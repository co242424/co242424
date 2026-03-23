import { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import RentPage from './pages/RentPage';
import TaxInvoicePage from './pages/TaxInvoicePage';
import TaxAlertPage from './pages/TaxAlertPage';
import LoanPage from './pages/LoanPage';
import ReportPage from './pages/ReportPage';
import { useLocalStorage } from './hooks/useLocalStorage';
import {
  initialTenants,
  initialPayments,
  initialExpenses,
  initialTaxInvoices,
  initialLoans,
  initialTaxScheduleCompletion,
} from './data/sampleData';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // 데이터 상태 (localStorage 동기화)
  const [tenants, setTenants] = useLocalStorage('re_tenants', initialTenants);
  const [payments, setPayments] = useLocalStorage('re_payments', initialPayments);
  const [expenses, setExpenses] = useLocalStorage('re_expenses', initialExpenses);
  const [taxInvoices, setTaxInvoices] = useLocalStorage('re_taxInvoices', initialTaxInvoices);
  const [loans, setLoans] = useLocalStorage('re_loans', initialLoans);
  const [taxCompletions, setTaxCompletions] = useLocalStorage('re_taxCompletions', initialTaxScheduleCompletion);

  const handleToggleTaxCompletion = (scheduleId) => {
    setTaxCompletions((prev) => ({
      ...prev,
      [scheduleId]: !prev[scheduleId],
    }));
  };

  const renderPage = () => {
    const commonProps = { tenants, payments, expenses, taxInvoices, loans, taxCompletions, onNavigate: setCurrentPage };

    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage {...commonProps} />;
      case 'rent':
        return <RentPage {...commonProps} setPayments={setPayments} setTenants={setTenants} />;
      case 'taxinvoice':
        return <TaxInvoicePage {...commonProps} setTaxInvoices={setTaxInvoices} />;
      case 'taxalert':
        return <TaxAlertPage taxCompletions={taxCompletions} onToggleCompletion={handleToggleTaxCompletion} />;
      case 'loan':
        return <LoanPage {...commonProps} setLoans={setLoans} />;
      case 'report':
        return <ReportPage {...commonProps} />;
      default:
        return <DashboardPage {...commonProps} />;
    }
  };

  const sidebarWidth = sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60';

  return (
    <div className="min-h-screen bg-[#0f1117] text-gray-100">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((c) => !c)}
      />

      {/* 메인 콘텐츠 */}
      <main className={`transition-all duration-300 ${sidebarWidth} min-h-screen`}>
        {/* 모바일 헤더 */}
        <div className="sticky top-0 z-10 flex items-center h-14 px-4 bg-[#0f1117]/80 backdrop-blur border-b border-[#2d3148] lg:hidden">
          <button
            onClick={() => setSidebarCollapsed((c) => !c)}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-[#1e2130]"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <span className="ml-3 text-sm font-semibold text-white">지식산업센터 관리</span>
        </div>

        <div className="p-4 lg:p-6 max-w-7xl">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
