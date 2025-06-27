import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginBgImage from '../assets/LoginBgImage.jpg';
import LoginSideImage from '../assets/LoginSideImage.jpg';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState('payroll');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username === 'Sudhakar' && password === '658') {
            navigate('/');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 overflow-hidden">
            {/* Background Image */}
            <img
                src={LoginBgImage}
                alt="Background"
                className="absolute w-full h-full object-cover z-0"
            />

            {/* Main Login Card */}
            <div className="relative z-10 flex w-[900px] h-[520px] bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Left Side Graphic */}
                <div className="hidden md:block w-1/2">
                    <img
                        src={LoginSideImage}
                        alt="Side Graphic"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 px-10 py-8 flex flex-col justify-center">
                    {/* Avatar & Title */}
                    <div className="flex flex-col items-center mb-4">
                        <div className="w-10 h-10 bg-gray-300 rounded-full mb-2" />
                        <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
                    </div>

                    {/* Role Radio */}
                    <div className="flex justify-center gap-6 mb-6 text-sm text-gray-700">
                        <label className="flex items-center gap-1 cursor-pointer">
                            <input
                                type="radio"
                                name="role"
                                value="payroll"
                                checked={role === 'payroll'}
                                onChange={() => setRole('payroll')}
                            />
                            For Payroll
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer">
                            <input
                                type="radio"
                                name="role"
                                value="employee"
                                checked={role === 'employee'}
                                onChange={() => setRole('employee')}
                            />
                            For Employee
                        </label>
                    </div>

                    {/* Login Form */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md pr-16"
                                required
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-2.5 text-sm text-gray-500 cursor-pointer"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </span>
                        </div>

                        {error && (
                            <p className="text-sm text-red-500">{error}</p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-full"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
