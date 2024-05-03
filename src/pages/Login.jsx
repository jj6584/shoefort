import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import COVER_IMAGE from '../assets/shoe.jpg';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await axios.post('http://localhost:4001/login', { email, password });

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                navigate('/');
            }
        } catch (error) {
            setError('Invalid email or password');
        }
    };
    

    return (
        <div className="w-full h-screen flex items-start">
            <div className='relative w-1/2 h-full flex flex-col'>
                <div className='absolute top-[20%] left-[10%] flex flex-col'>
                    <h1 className='text-4xl text-white font-bold my-4'>Where every shoe tells a story</h1>
                    <p className='text-xl text-white font-normal'>Register now and get a 50% off shoe discount</p>
                </div>
                <img src={COVER_IMAGE} className="w-full h-full object-cover"/>
            </div>

            <div className='w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between items-center'>
                <h1 className='w-full max-w-[550px] mx-auto text-xl text-[#ea580c] font-semibold mr-auto'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                    </svg>
                    ShoeFort.
                </h1>

                <form className='w-full flex flex-col max-w-[550px]' onSubmit={handleSubmit} style={{ paddingBottom: '15rem' }}>
                    <div className='w-full flex flex-col mb-2'>
                        <h3 className='text-3xl text-[#ea580c] font-semibold mb-2'>Login</h3>
                        <p className='text-base text-[#ea580c]  mb-2'>Welcome Back! Please enter your details.</p>
                    </div>

                    <input 
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full text-black py-2 my-2 bg-transparent border-b border-[#ea580c] outline-none focus:outline-none hover:border-black transition duration-300'
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full text-black py-2 my-2 bg-transparent border-b border-[#ea580c] outline-none focus:outline-none hover:border-black transition duration-300'
                    />

                    {error && <p className="text-red-500">{error}</p>}

                    <button type='onSubmit' disabled={loading} onClick={handleSubmit} className='w-full text-white my-2 font-semibold bg-[#ea580c] rounded-md p-4 text-center flex items-center justify-center cursor-pointer hover:bg-black transition duration-300'>
                     {loading ? 'Logging in...' : 'Log in'}
                    </button>

                    <Link to="/SignIn" className="text-blue-500 mt-4">Don't have an account? Sign up here.</Link>
                </form>
            </div>
        </div>
    );
};

export default Login;