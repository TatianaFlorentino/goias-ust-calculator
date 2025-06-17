
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b-2 border-emerald-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 flex items-center justify-center">
              <img 
                src="/lovable-uploads/a41d1a68-3c77-487b-8f15-cf0463297315.png" 
                alt="SGG/GO" 
                className="w-12 h-12 object-contain filter brightness-0 saturate-100"
                style={{
                  filter: 'invert(34%) sepia(64%) saturate(1534%) hue-rotate(120deg) brightness(94%) contrast(91%)'
                }}
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-emerald-700">
                Calculadora UST - SGG/GO
              </h1>
              <p className="text-sm text-gray-600">
                Secretaria-Geral de Governo de Goiás
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Sistema Interno</div>
            <div className="text-xs text-amber-600 font-medium">
              Unidades de Serviço Técnico
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
