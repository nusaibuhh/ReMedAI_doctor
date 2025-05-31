import { FaUserMd, FaUserInjured, FaCalendarCheck, FaClock } from 'react-icons/fa';

const stats = [
  { name: 'Total Patients', value: '1,284', icon: FaUserInjured, color: 'bg-blue-500' },
  { name: 'Appointments Today', value: '12', icon: FaCalendarCheck, color: 'bg-green-500' },
  { name: 'Pending Reviews', value: '8', icon: FaClock, color: 'bg-yellow-500' },
  { name: 'Years Experience', value: '15', icon: FaUserMd, color: 'bg-purple-500' },
];

const upcomingAppointments = [
  {
    id: 1,
    patientName: 'Sarah Johnson',
    time: '10:00 AM',
    type: 'Follow-up',
    status: 'Confirmed',
  },
  {
    id: 2,
    patientName: 'Michael Brown',
    time: '11:30 AM',
    type: 'New Patient',
    status: 'Pending',
  },
  {
    id: 3,
    patientName: 'Emily Davis',
    time: '2:00 PM',
    type: 'Check-up',
    status: 'Confirmed',
  },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, Dr. Smith!</h1>
        <p className="mt-2 text-gray-600">Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className={`inline-flex p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Appointments */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Appointments</h2>
        <div className="divide-y divide-gray-200">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="py-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{appointment.patientName}</h3>
                <p className="text-gray-600">{appointment.type}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-900">{appointment.time}</p>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    appointment.status === 'Confirmed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {appointment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 