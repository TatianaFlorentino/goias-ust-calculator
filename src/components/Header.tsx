
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b-2 border-emerald-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/6a3debe7-f977-47ea-b20d-c518c74ca15e.png" 
                  alt="SGG/GO" 
                  className="w-14 h-14 object-contain"
                />
              </div>
              <div className="border-l-2 border-emerald-200 pl-4">
                <h1 className="text-2xl font-bold text-emerald-700">
                  Calculadora UST
                </h1>
                <p className="text-sm text-emerald-600 font-medium">
                  Secretaria-Geral de Governo de Goiás
                </p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-3">
              <div>
                <div className="text-sm font-medium text-emerald-700">Sistema Interno</div>
                <div className="text-xs text-amber-600 font-medium">
                  Unidades de Serviço Técnico
                </div>
              </div>
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-emerald-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
