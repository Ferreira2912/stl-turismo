import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { db } from './firebase';

// Pacotes
export const getPackages = async (limitNum = 50) => {
  try {
    const q = query(
      collection(db, 'packages'), 
      where('active', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitNum)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Erro ao buscar pacotes:', error);
    return [];
  }
};

export const getFeaturedPackages = async () => {
  try {
    const q = query(
      collection(db, 'packages'), 
      where('featured', '==', true),
      where('active', '==', true),
      orderBy('createdAt', 'desc'),
      limit(6)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Erro ao buscar pacotes em destaque:', error);
    return [];
  }
};

export const addPackage = async (packageData) => {
  try {
    const docRef = await addDoc(collection(db, 'packages'), {
      ...packageData,
      active: true,
      featured: packageData.featured || false,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    const newPackage = {
      id: docRef.id,
      ...packageData,
      active: true,
      featured: packageData.featured || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    console.log('✅ Pacote criado no Firebase:', docRef.id);
    return newPackage;
  } catch (error) {
    console.error('❌ Erro ao criar pacote:', error);
    throw error;
  }
};

export const updatePackage = async (packageId, packageData) => {
  try {
    const docRef = doc(db, 'packages', packageId);
    const updateData = {
      ...packageData,
      updatedAt: new Date()
    };
    
    await updateDoc(docRef, updateData);
    
    const updatedPackage = {
      id: packageId,
      ...packageData,
      updatedAt: new Date()
    };
    
    console.log('✅ Pacote atualizado no Firebase:', packageId);
    return updatedPackage;
  } catch (error) {
    console.error('❌ Erro ao atualizar pacote:', error);
    throw error;
  }
};

export const deletePackage = async (packageId) => {
  try {
    // Soft delete - apenas marca como inativo
    const docRef = doc(db, 'packages', packageId);
    await updateDoc(docRef, {
      active: false,
      deletedAt: new Date(),
      updatedAt: new Date()
    });
    
    console.log('✅ Pacote desativado no Firebase:', packageId);
    return true;
  } catch (error) {
    console.error('❌ Erro ao desativar pacote:', error);
    throw error;
  }
};

export const getPackageById = async (packageId) => {
  try {
    const docRef = doc(db, 'packages', packageId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Erro ao buscar pacote por ID:', error);
    return null;
  }
};

// Destinos
export const getDestinations = async () => {
  try {
    const q = query(collection(db, 'destinations'), orderBy('name'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Erro ao buscar destinos:', error);
    return [];
  }
};

// Leads
export const createLead = async (leadData) => {
  try {
    const docRef = await addDoc(collection(db, 'leads'), {
      ...leadData,
      createdAt: new Date(),
      status: 'new'
    });
    console.log('✅ Lead criado no Firebase:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Erro ao criar lead:', error);
    throw error;
  }
};

// Reservas
export const createReservation = async (reservationData) => {
  try {
    const docRef = await addDoc(collection(db, 'reservations'), {
      ...reservationData,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('✅ Reserva criada no Firebase:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Erro ao criar reserva:', error);
    throw error;
  }
};

export const getReservations = async (limitNum = 50) => {
  try {
    const q = query(
      collection(db, 'reservations'),
      orderBy('createdAt', 'desc'),
      limit(limitNum)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Erro ao buscar reservas:', error);
    return [];
  }
};

export const updateReservationStatus = async (reservationId, status) => {
  try {
    const docRef = doc(db, 'reservations', reservationId);
    await updateDoc(docRef, {
      status,
      updatedAt: new Date()
    });
    return true;
  } catch (error) {
    console.error('Erro ao atualizar status da reserva:', error);
    throw error;
  }
};

// Blog Posts
export const getBlogPosts = async (limitNum = 10) => {
  try {
    const q = query(
      collection(db, 'blog_posts'),
      where('published', '==', true),
      orderBy('publishedAt', 'desc'),
      limit(limitNum)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Erro ao buscar posts do blog:', error);
    return [];
  }
};
