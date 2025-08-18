import React from 'react';
import { 
  TrendingUp, 
  Package, 
  Calendar, 
  DollarSign,
  Eye,
  Star,
  Settings
} from 'lucide-react';

const AdminDashboard = () => {
  // Dados simulados para o dashboard
  const stats = [
    {
      title: 'Total de Pacotes',
      value: '12',
      change: '+2 este mês',
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'Reservas Ativas',
      value: '47',
      change: '+15 esta semana',
      icon: Calendar,
      color: 'bg-orange-500'
    },
    {
      title: 'Receita Total',
      value: 'R$ 180.250',
      change: '+12% este mês',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Taxa de Conversão',
      value: '23%',
      change: '+5% esta semana',
      icon: TrendingUp,
      color: 'bg-purple-500'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'Nova reserva criada',
      user: 'João Silva',
      package: 'Dubai Premium',
      time: '2 horas atrás',
      type: 'reservation'
    },
    {
      id: 2,
      action: 'Pacote atualizado',
      user: 'Admin',
      package: 'Paris Romântico',
      time: '5 horas atrás',
      type: 'package'
    },
    {
      id: 3,
      action: 'Lead convertido',
      user: 'Maria Santos',
      package: 'Tailândia Exótica',
      time: '1 dia atrás',
      type: 'reservation'
    },
    {
      id: 4,
      action: 'Pacote criado',
      user: 'Admin',
      package: 'Argentina Completa',
      time: '2 dias atrás',
      type: 'package'
    }
  ];

  const topPackages = [
    { name: 'Dubai Premium', bookings: 15, revenue: 'R$ 45.000' },
    { name: 'Paris Romântico', bookings: 12, revenue: 'R$ 36.000' },
    { name: 'Tailândia Exótica', bookings: 10, revenue: 'R$ 25.000' },
    { name: 'Argentina Completa', bookings: 8, revenue: 'R$ 16.000' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Visão geral do sistema STL Turismo</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Última atualização</p>
          <p className="text-sm font-medium">{new Date().toLocaleString('pt-BR')}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Atividade Recente</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Ver tudo
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  {activity.type === 'reservation' && <Calendar className="w-4 h-4 text-blue-600" />}
                  {activity.type === 'package' && <Package className="w-4 h-4 text-blue-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">
                    {activity.user} {activity.package !== '-' && `• ${activity.package}`}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Packages */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Pacotes Mais Vendidos</h2>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-4">
            {topPackages.map((pkg, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{pkg.name}</p>
                  <p className="text-sm text-gray-600">{pkg.bookings} reservas</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{pkg.revenue}</p>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">4.8</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <Package className="w-6 h-6 text-gray-400" />
            <span className="text-gray-600 font-medium">Criar Pacote</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors">
            <Eye className="w-6 h-6 text-gray-400" />
            <span className="text-gray-600 font-medium">Ver Reservas</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
            <Calendar className="w-6 h-6 text-gray-400" />
            <span className="text-gray-600 font-medium">Gerenciar Leads</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
            <Settings className="w-6 h-6 text-gray-400" />
            <span className="text-gray-600 font-medium">Configurações</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
