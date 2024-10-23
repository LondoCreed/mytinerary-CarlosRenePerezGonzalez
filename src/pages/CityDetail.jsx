import { useParams, Link } from 'react-router-dom'
import DataFetcher from '../components/DataFetcher'

const CityDetails = () => {
  const { id } = useParams()

  return (
    <DataFetcher apiUrl={`http://localhost:8080/api/cities/id/${id}`}>
      {({ data: city, loading, error }) => {
        if (loading) {
          return (
            <div className="flex items-center justify-center h-48">
              <p className="text-2xl font-bold text-center">Loading city details...</p>
            </div>
          )
        }

        if (error) {
          return (
            <div className="flex items-center justify-center h-48">
              <p className="text-red-500 font-bold">{error}</p>
            </div>
          )
        }

        return (
          <section className="relative h-screen">
            {city && (
              <>
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${city.photo})` }}
                ></div>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
                  <h2 className="text-5xl font-bold mb-4">{city.name}</h2>
                  <p className="text-2xl mb-8">Under construction</p>
                  <Link
                    to="/cities"
                    className="bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-6 rounded"
                  >
                    Return to Cities
                  </Link>
                </div>
              </>
            )}
          </section>
        )
      }}
    </DataFetcher>
  )
}

export default CityDetails
