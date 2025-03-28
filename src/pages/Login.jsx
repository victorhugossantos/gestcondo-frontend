import React, { useState } from "react";

const Login = () =>{
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Logica de autenticação estará aqui
        console.log("Login realizado com sucesso!", {user, password});
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Usuario</label>
                       <input 
                            type="text" 
                            id="user"
                            name="user"
                            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                            valu e={user}
                            onChange={(e) => setUser(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password" 
                            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </form>
                <button 
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-lg py-3 hover:bg-blue-600 focus:outline-none"
                >
                    Entrar
                </button>

            </div>
        </div>
    )
};

export default Login