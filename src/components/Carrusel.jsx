import { useState, useEffect } from 'react'

const Carrusel = () => {
  const [cities, setCities] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [itemsPerSlide, setItemsPerSlide] = useState(4)
  const [disableTransition, setDisableTransition] = useState(false)

  useEffect(() => {
    
    const fetchCities = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/cities')
        const data = await response.json()
        setCities(data.response.slice(0, 12))
      } catch (error) {
        console.error('Error to fetch data:', error)
      }
    }

    fetchCities()
  }, [])

  useEffect(() => {
    const Resize = () => {
      let newItemsPerSlide = 4
      if (window.innerWidth < 640) {
        newItemsPerSlide = 1
      } else if (window.innerWidth < 768) {
        newItemsPerSlide = 2
      } else if (window.innerWidth < 1024) {
        newItemsPerSlide = 3
      }

      if (newItemsPerSlide !== itemsPerSlide) {
        setDisableTransition(true)
        setItemsPerSlide(newItemsPerSlide)

        const newSlideCount = Math.ceil(cities.length / newItemsPerSlide);
        if (currentSlide >= newSlideCount) {
          setCurrentSlide(newSlideCount - 1)
        }

        setTimeout(() => setDisableTransition(false), 100)
      }
    }

    Resize()
    window.addEventListener('resize', Resize);
    return () => window.removeEventListener('resize', Resize)
  }, [itemsPerSlide, currentSlide, cities.length])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % Math.ceil(cities.length / itemsPerSlide))
    }, 5000)
    return () => clearInterval(interval)
  }, [itemsPerSlide, cities.length])

  const goToSlide = (index) => {
    const totalSlides = Math.ceil(cities.length / itemsPerSlide)
    if (index < 0) {
      setCurrentSlide(totalSlides - 1)
    } else if (index >= totalSlides) {
      setCurrentSlide(0)
    } else {
      setCurrentSlide(index)
    }
  };

  const slides = [];
  for (let i = 0; i < cities.length; i += itemsPerSlide) {
    slides.push(cities.slice(i, i + itemsPerSlide))
  }

  return (
    <section className="mt-8">
      <h2 className="text-center text-3xl font-bold mb-6 text-white">Popular Mytineraries</h2>

      <div className="relative w-full">
        <div className="overflow-hidden relative h-[300px]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex ${!disableTransition && 'transition-transform duration-700 ease-in-out'}`}
              style={{ transform: `translateX(${(index - currentSlide) * 100}%)` }}
            >
              {slide.map((city, idx) => (
                <div key={idx} className={`p-4 ${itemsPerSlide === 1 ? 'w-full' : itemsPerSlide === 2 ? 'w-1/2' : itemsPerSlide === 3 ? 'w-1/3' : 'w-1/4'}`}>
                  <img
                    src={city.photo}
                    alt={city.name}
                    className="w-full h-60 object-cover rounded-md"
                  />
                  <h3 className="text-center mt-2 font-semibold text-white">{city.name}</h3>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="absolute top-1/2 transform -translate-y-1/2 left-6">
          <button
            className="bg-purple-800 text-white px-4 py-2 rounded-full hover:bg-red-700"
            onClick={() => goToSlide(currentSlide - 1)}
          >
            Prev
          </button>
        </div>
        <div className="absolute top-1/2 transform -translate-y-1/2 right-6">
          <button
            className="bg-purple-800 text-white px-4 py-2 rounded-full hover:bg-red-700"
            onClick={() => goToSlide(currentSlide + 1)}
          >
            Next
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-4 mb-5">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 mx-1 rounded-full ${index === currentSlide ? 'bg-red-500' : 'bg-gray-300'}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}

export default Carrusel
