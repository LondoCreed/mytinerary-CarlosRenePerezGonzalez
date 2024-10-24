import { useState } from 'react'
import { Link } from 'react-router-dom'
import DataFetcher from './DataFetcher'

const CitiesAndSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const apiUrl = `http://localhost:8080/api/cities?name=${searchTerm}`

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

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

      <DataFetcher apiUrl={apiUrl}>
        {({ data: cities, loading, error }) => {
          if (loading) {
            return <p className="text-2xl font-bold text-center">Loading cities...</p>
          }

          return cities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {cities.map((city) => (
                <div key={city._id} className="relative rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={city.photo}
                    alt={city.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col justify-end p-4">
                    <div className='flex justify-between'><h3 className="text-xl font-bold text-white mb-2">{city.name}</h3>
                    <p className=" text-xl font-bold text-white mb-2">{city.country}</p></div>
                    <Link
                      to={`/city/${city._id}`}
                      className="text-white bg-purple-800 hover:bg-purple-500 py-1 px-4 rounded"
                    >
                      View City
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center  text-center">
            <p className="text-4xl font-bold text-gray-800 mb-2">No cities found matching your search.</p>
            <p className="text-xl text-gray-600 mb-4">Try adjusting your search term or explore some popular cities below.</p>
          </div>
          
          )
        }}
      </DataFetcher>
    </section>
  )
}

export default CitiesAndSearch
