import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

//componente del header
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Cierra el menú si la pantalla se hace más grande
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Previene el scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);
  
  //componente del header
  return (
    <header className={`bg-stone-800 bg-opacity-90 text-white transition-all duration-300 z-50 relative`}>
      <div className="container mx-auto flex items-center p-4">
        <div className="flex items-center mr-auto">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
          <span className="text-2xl font-extrabold tracking-tight">My Tinerary</span>
        <div className="flex items-center ml-auto">
          {/* Puedes agregar más iconos o enlaces aquí si es necesario */}
        </div>
      </div>

      {/* Menú lateral */}
      <div className={`fixed top-0 left-0 h-full w-56 bg-stone-900 bg-opacity-95 z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-end p-4">
          <button onClick={() => setIsMenuOpen(false)} className="text-2xl">
            <FaTimes />
          </button>
        </div>
        <nav className="p-4">
          <ul className="flex flex-col items-center space-y-4">
            <li>
              <Link to="/" className="flex items-center text-xl hover:text-gray-300 transition duration-300" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/cities" className="flex items-center text-xl hover:text-gray-300 transition duration-300" onClick={() => setIsMenuOpen(false)}>
                Cities
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay para cerrar el menú al hacer clic fuera */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;
