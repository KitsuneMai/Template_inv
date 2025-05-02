import React from "react";
import { Instagram, Facebook } from "lucide-react"; // Usa tus íconos preferidos

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#fa6223] w-full text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Columna izquierda */}
        <div className="flex flex-col space-y-2 text-left">
          <h3 className="text-2xl font-bold">Mi Centro Comercial</h3>
          <p>Cra. 11 #14-51</p>
          <p>Sogamoso, Boyacá</p>
          <p>3214606330</p>
        </div>

        {/* Columna centro */}
        <div className="flex flex-col items-center space-y-6">
          <h3 className="text-1xl font-bold">Síguenos</h3>
          <div className="flex flex-col items-center space-y-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-6 h-6 hover:scale-110 transition-transform" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-6 h-6 hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="flex flex-col space-y-2 text-right">
          <h3 className="text-1xl font-bold">Sobre nosotros</h3>
          <p>Metas</p>
          <p>Objetivos</p>
          <p>Contáctanos</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
