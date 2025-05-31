import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaHome, FaUserInjured, FaPrescription, FaRobot } from 'react-icons/fa';

const navigation = [
  { name: 'Home', path: '/', icon: FaHome },
  { name: 'Patients List', path: '/patients', icon: FaUserInjured },
  { name: 'Prescription Checker', path: '/prescription-checker', icon: FaPrescription },
  { name: 'AI Assistant', path: '/chatbot', icon: FaRobot },
];

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <nav className="w-64 bg-white shadow-lg fixed h-full">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-primary">DocDashboard</h1>
        </div>
        <div className="space-y-1 p-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-150 ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 ml-64 min-h-screen">
        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
} 