import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-green-800">
      {/* Sidebar */}
      <Header />
      {/* Main content */}
      <div className="flex-1 flex flex-col">
       {/*  <Header /> */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;