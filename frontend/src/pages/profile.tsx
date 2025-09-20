// src/components/UserProfile.tsx
import React, { useState, useEffect } from "react";
import Graph from '../components/visuals'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
import axios from 'axios'
import {
    LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart
} from 'recharts';
import { useNavigate } from "react-router-dom";

const UserProfile: React.FC = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [games, setGames] = useState("");
    const [disorder, setDisorder] = useState("");
    const [Aidata, setAIData] = useState('')
    const [data, setData] = useState('')
    const [user, setUser] = useState('')
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ fullName, email, disorder });
        alert("Profile updated!");
    };

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userInfo = await axios.get(`${BACKEND_URL}/api/dashboard/user`, {
                    withCredentials: true
                })

                setUser(userInfo.data.user)


            } catch (error) {
                console.error("Error fetching user:", error.response?.data || error.message);
            }
        }

        getUserData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/dashboard/report`, { withCredentials: true });
                console.log("API response:", res.data); // 👈 debug
                setAIData(res.data); // 👈 use dataset
            } catch (error) {
                console.error("Error fetching dataset:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const getGames = async () => {
            try {
                const games = await axios.get(`${BACKEND_URL}/api/dashboard/games`, { withCredentials: true })
                setGames(games.data)
            } catch (error) {
                console.log(error.message)
            }
        }

        getGames()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/dashboard/report/data`, { withCredentials: true });
                console.log("API response:", res.data); // 👈 debug
                setData(res.data.dataset); // 👈 use dataset
            } catch (error) {
                console.error("Error fetching dataset:", error);
            }
        };
        fetchData();
    }, []);

    const useLogout = () => {
        const navigate = useNavigate();

        const logout = async () => {
            try {
                await axios.post("/api/logout", {}, { withCredentials: true });
                localStorage.clear(); // clear any local data if needed
                sessionStorage.clear();
                navigate("/"); // redirect to home/login
            } catch (err) {
                console.error("Logout failed:", err);
            }
        };

        return logout;
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-card-light dark:bg-card-dark p-6 flex flex-col justify-between rounded-r-lg shadow-lg">
                <div>
                    <div className="flex items-center justify-center mb-12">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-200 to-purple-200 flex items-center justify-center">
                            <img
                                alt="User avatar"
                                className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-800"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPi0hX38_G4Qr2HoQ_6M1GqAK5NgSyO4F8PQb5g14Q2NFgPtsPE8KVgk-zWn5-wtJ2z9ANYWr0TtZdTDeaePwj3_-YwMNL5RFXUUcUWpWLnQK_q3gMdUKtCkwWMmIgwFEySjo5c8egM2dlaifzm7mw0HEiFkRsh3uP_Kg-F79j4u0C2FyII_RHYm1PKNMCsDfXmF8WiLpNnqZLnEuZgnoAhYMhlDiBjaFtf8LIaNEO--DUeZFtmOjPhNxTHhz1I-EXyzXYqrJyjiU"
                            />
                        </div>
                    </div>
                    <nav className="space-y-4">
                        <a className="flex items-center gap-4 px-4 py-3 text-lg font-medium text-primary bg-indigo-100 dark:bg-indigo-900/50 rounded-lg" href="/">
                            {/* <span className="material-icons">home</span> */}
                            Home
                        </a>
                        <a className="flex items-center gap-4 px-4 py-3 text-lg font-medium text-muted-light dark:text-muted-dark hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors" href="/dashboard">
                            {/* <span className="material-icons">dashboard</span> */}
                            Dashboard
                        </a>
                    </nav>
                </div>
                <p onClick={() => useLogout} className="flex items-center gap-4 px-4 py-3 text-lg font-medium text-muted-light dark:text-muted-dark hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                    {/* <span className="material-icons">logout</span> */}
                    Logout
                </p>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-primary to-indigo-600 text-white p-8 rounded-lg mb-8 shadow-lg">
                        <h1 className="text-4xl font-bold">Welcome Back, {user.name}!</h1>
                        <p className="mt-2 text-indigo-200">Here's your personal health overview.</p>
                    </div>

                    <div className="space-y-8">
                        {/* Profile Details */}
                        <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold mb-4">Profile Details</h2>
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block text-sm font-medium text-muted-light dark:text-muted-dark" htmlFor="full-name">Full Name</label>
                                    <input
                                        className="mt-1 block w-full bg-background-light dark:bg-background-dark border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                                        id="full-name"
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-muted-light dark:text-muted-dark" htmlFor="email">Email Address</label>
                                    <input
                                        className="mt-1 block w-full bg-background-light dark:bg-background-dark border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-muted-light dark:text-muted-dark" htmlFor="disorder">Disorder / Condition</label>
                                    <input
                                        className="mt-1 block w-full bg-background-light dark:bg-background-dark border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                                        id="disorder"
                                        type="text"
                                        value={disorder}
                                        onChange={(e) => setDisorder(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition"
                                >
                                    Update Profile
                                </button>
                            </form>
                        </div>

                        {/* Progress Overview */}


                        <div className="bg-white backdrop-blur-sm rounded-3xl shadow-lg  p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">⏱️ Game performance over time</h3>
                            <div className="h-56">
                                <ResponsiveContainer>
                                    <ComposedChart data={data}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis yAxisId="left" label={{ value: "Score / Accuracy (%)", angle: -90, position: "insideLeft" }} />
                                        <YAxis yAxisId="right" orientation="right" label={{ value: "Time Played (mins)", angle: -90, position: "insideRight" }} />
                                        <Tooltip />
                                        <Legend />

                                        {/* Score line */}
                                        <Line yAxisId="left" type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />

                                        {/* Accuracy line */}
                                        <Line yAxisId="left" type="monotone" dataKey="accuracy" stroke="#82ca9d" strokeWidth={2} dot={{ r: 4 }} />

                                        {/* Time Played bar */}
                                        {/* <Bar yAxisId="right" dataKey="timePlayed" fill="#ffc658" barSize={30} /> */}
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        </div>


                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserProfile;