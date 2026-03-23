import {
  LayoutDashboard,
  Building2,
  Receipt,
  Bell,
  Landmark,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Menu,
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: '대시보드', icon: LayoutDashboard },
  { id: 'rent', label: '월세 관리', icon: Building2 },
  { id: 'taxinvoice', label: '세금계산서', icon: Receipt },
  { id: 'taxalert', label: '세금 알림', icon: Bell },
  { id: 'loan', label: '대출 관리', icon: Landmark },
  { id: 'report', label: '리포트', icon: BarChart3 },
];

export default function Sidebar({ currentPage, onNavigate, collapsed, onToggle }) {
  return (
    <>
      {/* 모바일 오버레이 */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-30 flex flex-col
          bg-[#13151f] border-r border-[#2d3148]
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-16' : 'w-60'}
        `}
      >
        {/* 로고 */}
        <div className="flex items-center h-16 px-4 border-b border-[#2d3148] shrink-0">
          {!collapsed && (
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                <Building2 size={16} className="text-white" />
              </div>
              <span className="text-sm font-bold text-white whitespace-nowrap">
                지식산업센터
              </span>
            </div>
          )}
          {collapsed && (
            <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center mx-auto">
              <Building2 size={16} className="text-white" />
            </div>
          )}
        </div>

        {/* 네비게이션 */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {navItems.map(({ id, label, icon: Icon }) => {
              const active = currentPage === id;
              return (
                <li key={id}>
                  <button
                    onClick={() => onNavigate(id)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                      text-sm font-medium transition-all duration-150
                      ${active
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/30'
                        : 'text-gray-400 hover:bg-[#1e2130] hover:text-gray-200'
                      }
                      ${collapsed ? 'justify-center' : ''}
                    `}
                    title={collapsed ? label : undefined}
                  >
                    <Icon size={18} className="shrink-0" />
                    {!collapsed && <span className="truncate">{label}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* 접기/펼치기 버튼 */}
        <div className="px-2 pb-4">
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg
              text-gray-500 hover:text-gray-300 hover:bg-[#1e2130] transition-colors text-sm"
          >
            {collapsed ? <ChevronRight size={16} /> : (
              <>
                <ChevronLeft size={16} />
                <span>접기</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
