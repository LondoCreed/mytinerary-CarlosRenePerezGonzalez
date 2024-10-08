import '@fortawesome/fontawesome-free/css/all.min.css' //
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h5 className="text-xl font-bold mb-4">About us</h5>
            <p className="mb-2">We are a travel agency, focused on providing the best travel experience, get to know us and be part of this experience.</p>
            <p><strong>Email:</strong> d.londocreed@gmail.com</p>
          </div>
          <div className='hidden md:block'>
            <h5 className="text-xl font-bold mb-4">Navigation</h5>
            <ul className="flex flex-col space-y-1">
              <li className='flex items-center'>
                <Link to="/" className="flex items-center text-xl hover:text-gray-300 transition duration-300" >
                  Home
                </Link>
              </li>
              <li className='flex items-center'>
                <Link to="/cities" className="flex items-center text-xl hover:text-gray-300 transition duration-300">
                  Cities
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xl font-bold mb-4">Follow us</h5>
            <ul>
              <li><a href="https://www.facebook.com" className="text-gray-400 hover:text-white flex items-center"><i className="fab fa-facebook-f mr-2"></i> Facebook</a></li>
              <li><a href="https://www.twitter.com" className="text-gray-400 hover:text-white flex items-center"><i className="fab fa-twitter mr-1"></i> Twitter</a></li>
              <li><a href="https://www.instagram.com" className="text-gray-400 hover:text-white flex items-center"><i className="fab fa-instagram mr-2"></i> Instagram</a></li>
              <li><a href="https://www.linkedin.com" className="text-gray-400 hover:text-white flex items-center"><i className="fab fa-linkedin mr-2"></i> LinkedIn</a></li>
            </ul>
          </div>

          <div className='hidden md:block'>
            <h5 className="text-xl font-bold mb-4">Location</h5>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509317!2d144.9537353159046!3d-37.81627927975139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5775c2f0b0b82a9!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1616921887877!5m2!1sen!2sau"
              width="100%" height="150" allowFullScreen="" loading="lazy" className="border-0"
            ></iframe>
          </div>
        </div>
        <hr className="my-6 border-gray-700" />
        <div className="text-center">
          <p>&copy; 2024 My Tinerary. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
