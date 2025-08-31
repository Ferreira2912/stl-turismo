import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Filter, Copy } from 'lucide-react';
import { getAllPackages, deletePackage } from '../../services/database';
import AdminPackageForm from './AdminPackageForm';

const AdminPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [copyingPackage, setCopyingPackage] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadPackages();
  }, []);

  // Open create form when coming from dashboard quick action
  useEffect(() => {
    const hash = window.location.hash || '';
    if (hash === '#packages-new') {
      setShowForm(true);
      // normalize hash so it doesn't reopen on re-render
      setTimeout(() => {
        if (window.location.hash !== '#packages') {
          window.location.hash = '#packages';
        }
      }, 0);
    }
  }, []);

  const loadPackages = async () => {
    try {
      setLoading(true);
      const data = await getAllPackages();
      setPackages(data);
    } catch (error) {
      console.error('Erro ao carregar pacotes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (packageId) => {
    if (window.confirm('Tem certeza que deseja desativar este pacote?')) {
      try {
        await deletePackage(packageId);
        await loadPackages();
      } catch (error) {
        console.error('Erro ao deletar pacote:', error);
        alert('Erro ao deletar pacote');
      }
    }
  };

  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setCopyingPackage(null);
    setShowForm(true);
  };

  const handleCopy = (pkg) => {
    // Criar uma cópia do pacote removendo o ID e ajustando o título
    const packageCopy = {
      ...pkg,
      title: `${pkg.title} - Cópia`,
      active: false, // Start as inactive for review
      createdAt: null, // Will be set when saved
      updatedAt: null
    };
    delete packageCopy.id; // Remove ID para criar um novo pacote
    
    setCopyingPackage(packageCopy);
    setEditingPackage(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingPackage(null);
    setCopyingPackage(null);
  };

  const handleFormSuccess = () => {
    loadPackages();
  };

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.destination?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'active') return matchesSearch && pkg.active;
    if (filter === 'inactive') return matchesSearch && !pkg.active;
    
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pacotes</h1>
          <p className="text-gray-600">Gerencie todos os pacotes de turismo</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Novo Pacote</span>
        </button>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar pacotes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos</option>
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{packages.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ativos</p>
              <p className="text-2xl font-bold text-gray-900">
                {packages.filter(p => p.active).length}
              </p>
            </div>
          </div>
        </div>

        

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-full">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Inativos</p>
              <p className="text-2xl font-bold text-gray-900">
                {packages.filter(p => !p.active).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Pacotes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pacote
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destino
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Criado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPackages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        {pkg.images && pkg.images[0] ? (
                          <img
                            className="h-12 w-12 rounded-lg object-cover"
                            src={pkg.images[0]}
                            alt={pkg.title}
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                            <Eye className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">
                            {pkg.title}
                          </div>
                          
                        </div>
                        <div className="text-sm text-gray-500">
                          {pkg.duration}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{pkg.destination}</div>
                    <div className="text-sm text-gray-500 capitalize">{pkg.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      R$ {pkg.price?.toLocaleString('pt-BR')}
                    </div>
                    {pkg.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        R$ {pkg.originalPrice?.toLocaleString('pt-BR')}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      pkg.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {pkg.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {pkg.createdAt ? new Date(pkg.createdAt.seconds * 1000).toLocaleDateString('pt-BR') : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(pkg)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleCopy(pkg)}
                        className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                        title="Criar Cópia"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(pkg.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        title="Desativar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredPackages.length === 0 && (
            <div className="text-center py-12">
              <Eye className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum pacote encontrado</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? 'Tente uma busca diferente.' : 'Comece criando um novo pacote.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Formulário */}
      <AdminPackageForm
        isOpen={showForm}
        onClose={handleCloseForm}
        packageData={editingPackage || copyingPackage}
        onSuccess={handleFormSuccess}
        isCopy={!!copyingPackage}
      />
    </div>
  );
};

export default AdminPackages;
