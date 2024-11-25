import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBars, FaTimesCircle, FaUserCircle, FaSignOutAlt } from 'react-icons/fa'
import { HiMiniHomeModern } from "react-icons/hi2"
import { FaMountainCity } from "react-icons/fa6"
import { useSelector, useDispatch } from 'react-redux'
import { signOut, selectIsAuthenticated, selectUser } from '../store/actions/authActions'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const user = useSelector(selectUser)

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const handleLogout = async () => {
    try {
      const result = await dispatch(signOut()).unwrap();
      navigate('/signin');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <header className="bg-gray-900 text-white transition-all duration-300 z-50 relative">
      <div className="container mx-auto flex items-center p-4 justify-between lg:justify-center">

        <div className="flex items-center lg:absolute lg:left-8">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 hover:text-gray-300 transition-colors duration-300"
              >
                {user?.photo ? (
                  <img
                    src={user.photo} 
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-white/20"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-white font-bold">
                      {user?.name?.[0]?.toUpperCase()} 
                    </span>
                  </div>
                )}
                <span className="hidden lg:block font-medium">{user?.name}</span>
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-red-400 transition-colors duration-300"
                title="Logout"
              >
                <FaSignOutAlt size={20} />
              </button>
            </div>
          ) : (
            <Link to="/signin" className="flex items-center gap-2 hover:text-gray-300 transition-colors duration-300">
              <FaUserCircle className='text-3xl' />
              <span className="hidden lg:block">Login</span>
            </Link>
          )}
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
            {isAuthenticated && (
              <li className="w-full px-4 py-3 mb-4 bg-gray-800 rounded-lg">
                <button
                  onClick={() => {
                    navigate('/dashboard')
                    setIsMenuOpen(false)
                  }}
                  className="flex items-center gap-3 w-full"
                >
                  {user?.photo ? (
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-white text-lg font-bold">
                        {user?.name?.[0]?.toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="text-left">
                    <p className="font-medium">{user?.name}</p>
                  </div>
                </button>
              </li>
            )}
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
            {isAuthenticated ? (
              <li className='flex items-center'>
                <FaSignOutAlt className='mr-1' />
                <button
                  onClick={handleLogout}
                  className="text-xl text-red-400 hover:text-red-300 transition duration-300"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li className='flex items-center'>
                <FaUserCircle className='mr-1' />
                <Link
                  to="/signin"
                  className="flex items-center text-xl hover:text-gray-300 transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
            )}
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