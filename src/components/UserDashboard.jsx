import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsAuthenticated, selectUser } from '../store/actions/authActions';
import { FaMapMarkerAlt, FaMailBulk, FaPassport, FaLanguage } from 'react-icons/fa';
import { MdFlightTakeoff, MdPhotoCamera, MdFavorite } from 'react-icons/md';
import { BiWorld } from 'react-icons/bi';

const UserDashboard = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Profile */}
      <div className="h-[500px] relative bg-cover bg-center dash-section lg:h-[600px] md:h-[500px] sm:h-[400px]">
  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="flex flex-col lg:flex-row items-center gap-8 pt-6 px-4 lg:items-start">
      {/* Imagen del perfil */}
      <div className="relative">
        {user?.photo ? (
          <img
            src={user.photo}
            alt="Profile"
            className="w-56 h-56 rounded-full border-4 border-emerald-500 shadow-lg shadow-emerald-500/20"
          />
        ) : (
          <div className="w-56 h-56 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center text-6xl font-bold text-white shadow-lg">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
        )}
        <div className="absolute bottom-6 right-0 bg-emerald-500 rounded-full p-2 shadow-lg">
          <MdPhotoCamera className="text-white text-xl" />
        </div>
      </div>

      {/* Datos del perfil */}
      <div className="text-center lg:text-left pt-16">
        <h2 className="text-4xl font-bold text-white mb-2">
          {user?.name || 'User'} {user?.lastname || ''}
        </h2>
        <p className="text-emerald-400 font-medium mb-4">Travel Enthusiast</p>
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-gray-300">
          <div className="flex items-center gap-2">
            <FaMailBulk className="text-emerald-400" />
            <p>{user?.email || 'Not Provided'}</p>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-emerald-400" />
            <p>{user?.country || 'Unknown'}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Stats Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-300 border border-emerald-500/20">
            <MdFlightTakeoff className="text-3xl text-emerald-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{0}</p>
            <p className="text-sm text-gray-300">Trips Completed</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-300 border border-emerald-500/20">
            <BiWorld className="text-3xl text-emerald-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{0}</p>
            <p className="text-sm text-gray-300">Countries Visited</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-300 border border-emerald-500/20">
            <MdFavorite className="text-3xl text-emerald-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{0}</p>
            <p className="text-sm text-gray-300">Favorite Places</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-300 border border-emerald-500/20">
            <MdPhotoCamera className="text-3xl text-emerald-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{0}</p>
            <p className="text-sm text-gray-300">Travel Photos</p>
          </div>
        </div>

        {/* Travel Info Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl border border-emerald-500/20">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
                <FaPassport className="text-emerald-400" />
                Travel Style
              </h3>
              <div className="border-t border-emerald-500/20 mb-4"></div>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <span className="text-gray-300">Under construction</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl border border-emerald-500/20">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
                <FaLanguage className="text-emerald-400" />
                Languages
              </h3>
              <div className="border-t border-emerald-500/20 mb-4"></div>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                 <span className="text-gray-300">Under construction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
