import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimesCircle, FaUserCircle } from 'react-icons/fa'
import { HiMiniHomeModern } from "react-icons/hi2"
import { FaMountainCity } from "react-icons/fa6"


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <header className="bg-gray-900 text-white transition-all duration-300 z-50 relative">
      <div className="container mx-auto flex items-center p-4 justify-between lg:justify-center">
        
        <div className="flex items-center lg:absolute lg:left-8"> 
          <FaUserCircle className='text-3xl mr-3' />
        </div>
            
        <div className="text-2xl font-extrabold tracking-tight">
          <Link to="/" className="hover:text-gray-300 transition duration-300">
            My Tinerary
          </Link>
        </div>
       
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl">
            {isMenuOpen ? <FaTimesCircle /> : <FaBars />}
          </button>
        </div>
      
        <div className="hidden lg:flex items-center space-x-6 lg:absolute lg:right-8"> 
          <Link to="/" className="text-xl hover:text-gray-300 transition duration-300">
            Home
          </Link>
          <Link to="/cities" className="text-xl hover:text-gray-300 transition duration-300">
            Cities
          </Link>
        </div>
      </div>

      <div className={`fixed top-0 right-0 h-full w-56 bg-stone-900 bg-opacity-95 z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-end p-4">
          <button onClick={() => setIsMenuOpen(false)} className="text-2xl">
            <FaTimesCircle />
          </button>
        </div>
        <nav className="p-4">
          <ul className="flex flex-col items-center space-y-4">
            <li className='flex items-center'>
              <HiMiniHomeModern className='mr-1' />
              <Link to="/" className="flex items-center text-xl hover:text-gray-300 transition duration-300" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li className='flex items-center'>
              <FaMountainCity className='mr-1' />
              <Link to="/cities" className="flex items-center text-xl hover:text-gray-300 transition duration-300" onClick={() => setIsMenuOpen(false)}>
                Cities
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </header>
  )
}

export default Header
