
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b-2 border-goias-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-goias-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">GO</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-goias-green">
                Calculadora UST - SGG/GO
              </h1>
              <p className="text-sm text-gray-600">
                Secretaria-Geral de Governo de Goiás
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Sistema Interno</div>
            <div className="text-xs text-goias-gold font-medium">
              Unidades de Serviço Técnico
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
