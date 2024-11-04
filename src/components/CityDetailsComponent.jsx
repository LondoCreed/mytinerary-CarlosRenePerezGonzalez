import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchCityDetails, updateItineraryLikes } from '../store/actions/citiesActions';
import { FaDollarSign, FaClock, FaHeart, FaChevronDown, FaChevronUp } from 'react-icons/fa';

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
    <div className="min-h-screen ">
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
        <h3 className="text-3xl font-bold mb-8 text-center text-gray-900">
          Available Itineraries
        </h3>

        {(!itineraries || itineraries.length === 0) ? (
          <div className=" bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-lg shadow-md p-8 text-center">
            <p className="text-2xl text-black">No itineraries yet for this city</p>
            <p className="text-gray-900 mt-2">Be the first to create an amazing itinerary!</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            {itineraries.map((itinerary) => (
              <div
                key={itinerary._id}
                className="bg-white rounded-lg shadow-md w-full md:w-4/5 lg:w-4/5"
              >
                {/* Author Info */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-4">
                    <img
                      src={itinerary.author.photo}
                      alt={itinerary.author.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <h4 className="font-semibold text-xl">{itinerary.author.name}</h4>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4" >
                  {/* Stats Row */}
                  <div className="flex justify-around mb-4">
                    <div className="flex items-center space-x-1">
                      <p>Price: </p>{renderPriceIcons(itinerary.price)}
                    </div>
                    <div className="flex items-center space-x-2">
                      <p>Duration: </p><FaClock className="text-gray-500" />
                      <span>{itinerary.duration}h</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleLike(itinerary._id, itinerary.likes > 0 ? 'remove' : 'add')}
                        className="flex items-center space-x-1 hover:text-red-500 transition-colors"
                      >
                        <p>Likes: </p><FaHeart className={itinerary.likes > 0 ? "text-red-500" : "text-gray-400"} />
                        <span>{itinerary.likes}</span>
                      </button>
                    </div>
                  </div>

                  {/* Hashtags */}
                  <div className="flex flex-wrap gap-2 mb-4 justify-center">
                    {itinerary.hashtags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-purple-800 text-base px-3 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>


                  {/* View More Button */}
                  <button
                    onClick={() => setExpandedItinerary(
                      expandedItinerary === itinerary._id ? null : itinerary._id
                    )}
                    className="w-full bg-purple-800 hover:bg-purple-500 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>{expandedItinerary === itinerary._id ? "View less" : "View more"}</span>
                    {expandedItinerary === itinerary._id ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>

                {/* Expanded Content */}
                {expandedItinerary === itinerary._id && (
                  <div className="px-4 pb-4">
                    <div className="border-t border-gray-200 pt-4">
                      <div className="text-center">
                        <p className="text-gray-600 text-lg">Under construction</p>
                        <p className="text-gray-500 text-sm mt-2">Activities and comments coming soon!</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Return Button */}
        <div className="text-center mt-12">
          <Link
            to="/cities"
            className="inline-block bg-purple-800 hover:bg-purple-500 text-white py-3 px-8 rounded-md transition-colors"
          >
            Return to Cities
          </Link>
        </div>
      </section>
    </div>
  ) : null;
}

export default CityDetailsComponent
