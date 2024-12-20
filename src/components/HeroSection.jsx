import { Link } from 'react-router-dom'
import { WiDaySunny } from "react-icons/wi"

const Hero = () => {
  return (
    <section className="hero-section relative fix bg-cover bg-center lg:h-[600px] md:h-[500px] sm:h-[400px] w-auto flex items-center justify-center text-white overflow-hidden">
      
      <div className="relative z-10 text-center p-4 ">
        <h2 className=" lg:text-4xl  md:text-5xl font-bold drop-shadow-md">Hello, welcome to My Tinerary</h2>
        <h1 className="text-4xl  md:text-5xl font-bold drop-shadow-md">Discover Your Next Adventure</h1>
        <div className='flex justify-center items-center'><WiDaySunny className='text-4xl md:text-5xl font-bold drop-shadow-md' /></div>
        
        <p className="mt-3 text-lg max-w-lg mx-auto text">
          Find your perfect trip, designed by insiders who know and love their cities!
        </p>
        <Link 
          to="./Cities"
          className="mt-6 inline-block bg-purple-800 hover:bg-red-500 text-white py-2 px-6 rounded-lg transition duration-300">
          Explore Now
        </Link>
      </div>
    </section>
  )
}

export default Hero
