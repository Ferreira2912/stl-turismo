import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

// Upload de imagem para pacotes
export const uploadPackageImage = async (file, packageId) => {
  try {
    if (!file) {
      throw new Error('Nenhum arquivo selecionado');
    }

    // Criar referência única para a imagem
    const imageRef = ref(storage, `packages/${packageId}/${Date.now()}_${file.name}`);
    
    // Upload do arquivo
    const snapshot = await uploadBytes(imageRef, file);
    
    // Obter URL de download
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    console.log('✅ Imagem uploaded:', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('❌ Erro ao fazer upload da imagem:', error);
    throw error;
  }
};

// Upload múltiplo de imagens
export const uploadMultipleImages = async (files, packageId) => {
  try {
    const uploadPromises = Array.from(files).map(file => 
      uploadPackageImage(file, packageId)
    );
    
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error('❌ Erro ao fazer upload múltiplo:', error);
    throw error;
  }
};

// Deletar imagem
export const deletePackageImage = async (imageUrl) => {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
    console.log('✅ Imagem deletada:', imageUrl);
  } catch (error) {
    console.error('❌ Erro ao deletar imagem:', error);
    throw error;
  }
};