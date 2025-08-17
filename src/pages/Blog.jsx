import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import WhatsAppButton from '../components/common/WhatsAppButton';

const Blog = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog de Viagens</h1>
            <p className="text-xl text-gray-600 mb-12">Dicas e histórias de viagem</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-12 text-center">
            <p className="text-lg text-gray-600">Página em desenvolvimento...</p>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Blog;
