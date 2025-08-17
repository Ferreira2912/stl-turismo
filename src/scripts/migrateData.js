import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase.js';
import { mockPackages, mockDestinations } from '../data/mockData.js';

// Função para migrar pacotes
export const migratePackages = async () => {
  console.log('🚀 Iniciando migração de pacotes...');
  
  try {
    for (const packageData of mockPackages) {
      // Usar o ID do mock como ID do documento
      await setDoc(doc(db, 'packages', packageData.id), {
        ...packageData,
        createdAt: new Date(),
        updatedAt: new Date(),
        priority: Math.floor(Math.random() * 100), // Para ordenação
        views: 0,
        bookings: 0
      });
      console.log(`✅ Pacote migrado: ${packageData.title}`);
    }
    console.log('🎉 Migração de pacotes concluída!');
  } catch (error) {
    console.error('❌ Erro na migração de pacotes:', error);
    throw error;
  }
};

// Função para migrar destinos
export const migrateDestinations = async () => {
  console.log('🚀 Iniciando migração de destinos...');
  
  try {
    for (const destination of mockDestinations) {
      await setDoc(doc(db, 'destinations', destination.id), {
        ...destination,
        createdAt: new Date(),
        updatedAt: new Date(),
        packagesCount: 0 // Contador de pacotes associados
      });
      console.log(`✅ Destino migrado: ${destination.name}`);
    }
    console.log('🎉 Migração de destinos concluída!');
  } catch (error) {
    console.error('❌ Erro na migração de destinos:', error);
    throw error;
  }
};

// Função para executar todas as migrações
export const runAllMigrations = async () => {
  console.log('🔄 Iniciando migração completa dos dados...');
  
  try {
    await migratePackages();
    await migrateDestinations();
    console.log('🎊 Migração completa realizada com sucesso!');
  } catch (error) {
    console.error('💥 Erro na migração:', error);
    throw error;
  }
};
