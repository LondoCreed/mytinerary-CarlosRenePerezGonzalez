import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchCities = async (term = '') => {
    try {
      setLoading(true)
      const response = await fetch(`http://localhost:8080/api/cities?name=${term}`);
      const data = await response.json()
      setCities(data.response)
    } catch (error) {
      console.error('Error al obtener los datos:', error)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchCities()
  }, [])

  const handleSearchChange = (event) => {
    const term = event.target.value
    setSearchTerm(term)
    fetchCities(term)
  };

  return (
    <section className="py-16 p-5 text-center">
      <h2 className="text-3xl font-bold mb-4">Find your destiny</h2>
      <input
        type="text"
        className="border border-gray-300 px-4 py-2 mb-8 w-full max-w-md"
        placeholder="Search for a city..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {loading ? ( 
        <div className="flex items-center justify-center h-48"> 
          <p className="text-2xl font-bold text-center">Loading cities...</p> 
        </div>
      ) : cities.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map(city => (
            <div
              key={city._id}
              className="relative rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={city.photo}
                alt={city.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col justify-end p-4">
                <h3 className="text-xl font-bold text-white mb-2">{city.name}</h3>
                <Link
                  to={`/city/${city._id}`}
                  className="text-white bg-indigo-500 hover:bg-indigo-700 py-1 px-4 rounded"
                >
                  View City
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <section className="py-16  text-center">
          <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
            <div className="flex flex-col items-center">
              <p className="text-red-500 text-xl font-semibold mb-2">
                No matches found, please try searching again.
              </p>
              <p className="text-gray-600 mb-4">Check your spelling or try different keywords.</p>
            </div>
          </div>
        </section>
      )}
    </section>
  )
}

export default Cities
