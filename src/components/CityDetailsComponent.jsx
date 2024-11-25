import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchCityDetails, updateItineraryLikes } from '../store/actions/citiesActions';
import { FaDollarSign, FaClock, FaHeart } from 'react-icons/fa';

const CityDetailsComponent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { city, itineraries, loading, error } = useSelector(state => state.cities);
  const [expandedItinerary, setExpandedItinerary] = useState(null);

  useEffect(() => {
    dispatch(fetchCityDetails(id));
  }, [dispatch, id]);

  const handleLike = (itineraryId, action) => {
    dispatch(updateItineraryLikes({ itineraryId, action }));
  };

  const renderPriceIcons = (price) => {
    return [...Array(price)].map((_, index) => (
      <FaDollarSign key={index} className="text-green-500" />
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-2xl font-bold text-center">Loading city details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-red-500 font-bold">{error}</p>
      </div>
    );
  }

  return city ? (
    <div className="min-h-screen">
      <section className="relative h-[50vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${city.photo})` }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center p-4">
          <h2 className="text-5xl font-bold mb-4">{city.name}</h2>
        </div>
      </section>

      {/* Itineraries Section */}
      <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-bold mb-8 text-center text-white drop-shadow-md">
          Available Itineraries
        </h3>

        {(!itineraries || itineraries.length === 0) ? (
          <div className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 rounded-lg shadow-md p-8 text-center">
            <p className="text-2xl text-white font-semibold">No itineraries yet for this city</p>
            <p className="text-white mt-2">Be the first to create an amazing itinerary!</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            {itineraries.map((itinerary, index) => {
              // Seleccionar la atracción según el índice del itinerario
              const attractionIndex = index % city.attractions.length;
              const attraction = city.attractions[attractionIndex];

              return (
                <div
                  key={itinerary._id}
                  className="relative bg-gray-900 bg-opacity-80 rounded-lg shadow-lg w-full md:w-4/5 lg:w-4/5 overflow-hidden p-8"
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{ backgroundImage: `url(${city.photo})` }}
                  ></div>
                  <div className="relative p-6 text-white">
                    {/* Dynamic Title */}
                    <h4 className="text-2xl font-bold text-center p-6">
                      Discover {city.name}: {attraction || "Hidden Gems"}
                    </h4>
                    {/* Author */}
                    <div className="flex items-center mt-4 space-x-4 justify-center">
                      <img
                        src={itinerary.author.photo}
                        alt={itinerary.author.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400"
                      />
                      <h5 className="text-lg font-semibold">{itinerary.author.name}</h5>
                    </div>
                    {/* Stats */}
                    <div className="flex flex-col sm:flex-row sm:justify-around mt-4 space-y-4 sm:space-y-0">
                      <div className="flex items-center space-x-1">
                        <p className="text-white">Price:</p>
                        {renderPriceIcons(itinerary.price)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <p className="text-white">Duration:</p>
                        <FaClock className="text-white" />
                        <span>{itinerary.duration}h</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleLike(itinerary._id, itinerary.likes > 0 ? 'remove' : 'add')}
                          className="flex items-center space-x-1 text-white hover:text-red-500 transition-colors"
                        >
                          <p>Likes:</p>
                          <FaHeart className={itinerary.likes > 0 ? "text-red-500" : "text-white"} />
                          <span>{itinerary.likes}</span>
                        </button>
                      </div>
                    </div>
                    {/* View More Button */}
                    <button
                      onClick={() => setExpandedItinerary(
                        expandedItinerary === itinerary._id ? null : itinerary._id
                      )}
                      className="w-full bg-purple-800 hover:bg-purple-500 text-white py-2 px-4 rounded-md transition-colors mt-4"
                    >
                      {expandedItinerary === itinerary._id ? "View less" : "View more"}
                    </button>
                  </div>
                  {/* Expanded Content */}
                  {expandedItinerary === itinerary._id && (
                    <div className="px-4 pb-4 bg-gray-800 rounded-b-lg">
                      <div className="border-t border-gray-700 pt-4 text-center">
                        <p className="text-white">Activities and comments coming soon!</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Return Button */}
        <div className="text-center mt-12">
          <Link
            to="/cities"
            className="inline-block bg-purple-700 hover:bg-purple-500 text-white py-3 px-8 rounded-md transition-colors shadow-md"
          >
            Return to Cities
          </Link>
        </div>
      </section>
    </div>
  ) : null;
};

export default CityDetailsComponent;
