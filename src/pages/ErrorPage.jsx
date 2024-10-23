import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-r from-red-500 to-yellow-500">
      <h1 className="text-4xl font-bold text-white">¡Ups!</h1>
      <p className="text-2xl text-white mb-4">No encontramos la página que buscas.</p>
      <p className="text-lg text-white mb-8">Puede que el enlace esté roto o la página haya sido eliminada.</p>
      <Link to="/" className="bg-white text-red-500 hover:bg-gray-200 py-2 px-4 rounded">
        Volver a la página de inicio
      </Link>
    </div>
  )
}

export default ErrorPage;
