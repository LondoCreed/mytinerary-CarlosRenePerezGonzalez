import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../store/actions/authActions';

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector(state => state.auth);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await dispatch(signIn(formData));
            if (response.payload.success) {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = `http://localhost:8080/api/auth/signin/google?callbackUrl=${encodeURIComponent('http://localhost:5173/auth/google/callback')}`;
    };
    

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-600 to-teal-600 flex items-center justify-center p-6">
            <div className="w-full max-w-md login-section bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="px-8 py-10">
                    <h2 className="text-4xl font-extrabold text-center text-black mb-6">Welcome Back</h2>
                    <p className="text-center text-black mb-8">Sign in to continue to your account</p>

                    {error && (
                        <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-lg mb-6 text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 border focus:border-purple-500 focus:bg-white focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 border focus:border-purple-500 focus:bg-white focus:outline-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition duration-300 flex items-center justify-center"
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="flex items-center justify-center my-6">
                        <div className="w-full border-t border-gray-300"></div>
                        <span className="px-4 text-black ">Or</span>
                        <div className="w-full border-t border-gray-300"></div>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        className="w-full py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-300 flex items-center justify-center"
                    >
                        <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google logo"
                            className="w-6 h-6 mr-2"
                        />
                        Continue with Google
                    </button>

                    <p className="text-center text-black mt-6 text-lg">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-red-600 hover:text-red-800 font-semibold">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;