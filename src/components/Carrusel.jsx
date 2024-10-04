import { useState, useEffect } from 'react';

const cities = [
  { name: "New York", image: "https://th.bing.com/th/id/R.0faf7e911308759d6b2249ac6ecc0155?rik=Ngcl8k4U0ghavg&pid=ImgRaw&r=0" },
  { name: "London", image: "https://plus.unsplash.com/premium_photo-1664303991463-36449a65d3d6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bG9uZG9uJTIwZW5nbGFuZHxlbnwwfHwwfHx8MA%3D%3D" },
  { name: "Paris", image: "https://wallpapers.com/images/hd/paris-desktop-wallpaper-ctt26p0uve9skjly.jpg" },
  { name: "Tokyo", image: "https://th.bing.com/th/id/R.dd5daa7672ea566beacdbe2329234fa1?rik=io0gbaOgx%2fT1zg&pid=ImgRaw&r=0" },
  { name: "Sydney", image: "https://wallpapercave.com/wp/76YMeDJ.jpg" },
  { name: "Rio de Janeiro", image: "https://images.hdqwalls.com/download/rio-de-janeiro-brazil-cityscape-evening-sunset-hy-1920x1080.jpg" },
  { name: "Cape Town", image: "https://cdn.wallpapersafari.com/25/78/rbLaM6.jpg" },
  { name: "Rome", image: "https://www.pixelstalk.net/wp-content/uploads/images1/Rome-wallpaper-free-hd.jpg" },
  { name: "Moscow", image: "https://th.bing.com/th/id/R.505e44f236422933be1b2e00dd84a1d0?rik=dQOJvHbq2TwYag&pid=ImgRaw&r=0" },
  { name: "Toronto", image: "https://th.bing.com/th/id/R.46b38bb4cdcff30f21c2a59bb6f81966?rik=XP7QW1l2dOj5Uw&pid=ImgRaw&r=0" },
  { name: "Dubai", image: "https://th.bing.com/th/id/R.97a8f71c89678f8571ba48f4fdf495ad?rik=4mvYJQJkS2HAOA&pid=ImgRaw&r=0" },
  { name: "Beijing", image: "https://c4.wallpaperflare.com/wallpaper/767/647/605/night-lights-china-skyline-beijing-wallpaper-preview.jpg" },
];

const Carrusel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Cambiar slide automáticamente cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Función para cambiar de slide manualmente
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Dividir las ciudades en slides de 4 elementos cada uno
  const slides = [];
  for (let i = 0; i < cities.length; i += 4) {
    slides.push(cities.slice(i, i + 4));
  }

  return (
    <section className="mt-8">
      <h2 className="text-center text-3xl font-bold mb-6">Popular Mytineraries</h2>

      <div className="relative w-full">
        {/* Slides */}
        <div className="overflow-hidden relative h-[300px]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex transition-transform duration-700 ease-in-out ${
                index === currentSlide ? 'translate-x-0' : 'translate-x-full'
              }`}
              style={{ transform: `translateX(${(index - currentSlide) * 100}%)` }}
            >
              {slide.map((city, idx) => (
                <div key={idx} className="w-1/4 p-4">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-60 object-cover rounded-md"
                  />
                  <h3 className="text-center mt-2 font-semibold">{city.name}</h3>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Controles manuales */}
        <div className="absolute top-1/2 transform -translate-y-1/2 left-4">
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700"
            onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
          >
            Prev
          </button>
        </div>
        <div className="absolute top-1/2 transform -translate-y-1/2 right-4">
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700"
            onClick={() => goToSlide((currentSlide + 1) % slides.length)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Indicadores para cambiar de slide */}
      <div className="flex justify-center mt-4 mb-5">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 mx-1 rounded-full ${
              index === currentSlide ? 'bg-red-500' : 'bg-gray-300'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Carrusel;
