import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => { 
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-600 to-teal-600">
      <Header />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout