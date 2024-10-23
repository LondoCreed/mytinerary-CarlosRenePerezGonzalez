import { useState, useEffect } from 'react'

const DataFetcher = ({ apiUrl, children }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl)
        const result = await response.json()
        setData(result.response)
      } catch (error) {
        setError('Error fetching data.')
        console.error(error)
      } finally {
        setLoading(false)
      }
    };

    fetchData()
  }, [apiUrl])

  return children({ data, loading, error })
}

export default DataFetcher
