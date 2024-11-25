import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../store/actions/authActions';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector(state => state.auth);

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        photo: '',
        country: ''
    });

    const [errors, setErrors] = useState({});

    const countries = [
        "Argentina", "Brasil", "Chile", "Colombia", "España",
        "Estados Unidos", "México", "Perú", "Uruguay", "Venezuela"
    ];

    const handleGoogleSignUp = () => {
        window.location.href = `http://localhost:8080/api/auth/signin/google`;
    };

    const validateStep1 = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.lastname.trim()) {
            newErrors.lastname = 'Last name is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        } else if (!/(?=.*[A-Z])/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one uppercase letter';
        } else if (!/(?=.*[0-9])/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one number';
        }

        if (formData.photo && !isValidUrl(formData.photo)) {
            newErrors.photo = 'Please enter a valid URL';
        }

        if (!formData.country) {
            newErrors.country = 'Please select a country';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (step === 1) {
            if (validateStep1()) {
                setStep(2);
            }
        } else {
            if (validateStep2()) {
                try {
                    await dispatch(signUp(formData));
                    navigate('/dashboard');
                } catch (error) {
                    setErrors(prev => ({
                        ...prev,
                        submit: error.message || 'Registration failed. Please try again.'
                    }));
                }
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-teal-400 via-blue-500 to-indigo-600 flex items-center justify-center p-6">
            <div className="w-full max-w-md login-section bg-white rounded-xl shadow-2xl">
                <div className="px-12 py-16">
                    <h2 className="text-4xl font-extrabold text-center text-black mb-8">
                        {step === 1 ? 'Get Started' : 'Complete Your Profile'}
                    </h2>
                    <p className="text-center text-black mb-12">
                        {step === 1 ? 'Enter your basic information' : 'Set up your security and preferences'}
                    </p>

                    {errors.submit && (
                        <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-lg mb-8 text-center">
                            {errors.submit}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {step === 1 ? (
                            <>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-lg ${errors.name ? 'bg-red-50 border-red-500' : 'bg-gray-100 border-transparent'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastname"
                                        value={formData.lastname}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-lg ${errors.lastname ? 'bg-red-50 border-red-500' : 'bg-gray-100 border-transparent'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    />
                                    {errors.lastname && <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>}
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-lg ${errors.email ? 'bg-red-50 border-red-500' : 'bg-gray-100 border-transparent'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-teal-500 hover:to-blue-600 transition duration-300 text-lg font-semibold"
                                >
                                    Continue
                                </button>

                                <div className="flex items-center justify-center my-8">
                                    <div className="w-full border-t border-gray-300"></div>
                                    <span className="px-4 text-black">Or</span>
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>

                                <button
                                    onClick={handleGoogleSignUp}
                                    type="button"
                                    className="w-full py-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-300 flex items-center justify-center text-lg"
                                >
                                    <img
                                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                        alt="Google logo"
                                        className="w-6 h-6 mr-2"
                                    />
                                    Sign up with Google
                                </button>
                            </>
                        ) : (
                            <>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-lg ${errors.password ? 'bg-red-50 border-red-500' : 'bg-gray-100 border-transparent'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    />
                                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Photo URL</label>
                                    <input
                                        type="url"
                                        name="photo"
                                        value={formData.photo}
                                        onChange={handleChange}
                                        placeholder="https://example.com/photo.jpg"
                                        className={`w-full px-4 py-3 rounded-lg ${errors.photo ? 'bg-red-50 border-red-500' : 'bg-gray-100 border-transparent'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    />
                                    {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo}</p>}
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Country</label>
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-lg ${errors.country ? 'bg-red-50 border-red-500' : 'bg-gray-100 border-transparent'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    >
                                        <option value="">Select a country</option>
                                        {countries.map(country => (
                                            <option key={country} value={country}>{country}</option>
                                        ))}
                                    </select>
                                    {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                                </div>

                                <div className="flex space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="w-full py-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300 text-lg font-semibold"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-lg hover:from-teal-500 hover:to-blue-600 transition duration-300 text-lg font-semibold"
                                    >
                                        {loading ? 'Creating Account...' : 'Create Account'}
                                    </button>
                                </div>
                            </>
                        )}
                    </form>

                    <p className="mt-8 text-center text-black text-lg">
                        Already have an account?{' '}
                        <Link to="/signin" className="text-red-600 hover:text-red-800 font-semibold">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;