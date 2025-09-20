import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart
} from 'recharts';
import {
  User, Calendar, Clock, TrendingUp, Filter, Award, Target,
  ChevronDown, Star, Trophy, Zap, Brain, Play, BookOpen, PenTool, Focus
} from 'lucide-react';
import Visual from '../components/visuals'

import axios from 'axios'
import { log } from 'console';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [user, setUser] = useState('')
  const [games, setGames] = useState('')
  const [data, setData] = useState('')
  const [Aidata , setAIData ] = useState('')

  // Category colors matching NeuroVia theme
  const categoryColors = {
    Dyslexia: '#10B981',     // Green
    Dyscalculia: '#8B5CF6',  // Purple  
    Dysgraphia: '#3B82F6',   // Blue
    ADHD: '#F97316'          // Orange
  };

  // Category world themes
  const worldThemes = {
    Dyslexia: { name: "Enchanted Story Forest", icon: "🌲", gradient: "from-green-400 to-emerald-600" },
    Dyscalculia: { name: "Candy Island", icon: "🍭", gradient: "from-purple-400 to-violet-600" },
    Dysgraphia: { name: "Ocean Quest", icon: "🌊", gradient: "from-blue-400 to-cyan-600" },
    ADHD: { name: "Space Mission", icon: "🚀", gradient: "from-orange-400 to-red-500" }
  };

  // Mock user data
  const userData = {
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    level: 7,
    progress: 68,
    totalGames: 42,
    totalTime: 127,
    overallProgress: 74,
    currentStreak: 5,
    totalBadges: 12
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

  // useEffect(() => {
  //   console.log(user);

  // }, [user])


  // Mock games data
  const gamesData = [
    { id: 1, name: "Word Spell Quest", category: "Dyslexia", date: "2024-09-07", score: 85, time: 12, world: "Enchanted Story Forest" },
    { id: 2, name: "Letter Formation Adventure", category: "Dysgraphia", date: "2024-09-06", score: 92, time: 18, world: "Ocean Quest" },
    { id: 3, name: "Reading Comprehension Journey", category: "Dyslexia", date: "2024-09-06", score: 78, time: 15, world: "Enchanted Story Forest" },
    { id: 4, name: "Focus Training Mission", category: "ADHD", date: "2024-09-05", score: 67, time: 10, world: "Space Mission" },
    { id: 5, name: "Number candy count", category: "Dyscalculia", date: "2024-09-05", score: 88, time: 14, world: "Crystal Island" },
    { id: 6, name: "Underwater Writing Challenge", category: "Dysgraphia", date: "2024-09-04", score: 94, time: 16, world: "Ocean Quest" },
    { id: 7, name: "Story Magic Reading", category: "Dyslexia", date: "2024-09-04", score: 82, time: 20, world: "Enchanted Story Forest" },
    { id: 8, name: "Galactic Attention Training", category: "ADHD", date: "2024-09-03", score: 71, time: 8, world: "Space Mission" }
  ];

  // Radar chart data
  const radarData = [
    { category: 'Dyslexia', performance: 80, fullMark: 100 },
    { category: 'Dyscalculia', performance: 88, fullMark: 100 },
    { category: 'Dysgraphia', performance: 93, fullMark: 100 },
    { category: 'ADHD', performance: 69, fullMark: 100 }
  ];

  // Progress over time data
  const progressData = [
    { week: 'Week 1', Dyslexia: 60, Dyscalculia: 65, Dysgraphia: 70, ADHD: 45 },
    { week: 'Week 2', Dyslexia: 68, Dyscalculia: 72, Dysgraphia: 78, ADHD: 52 },
    { week: 'Week 3', Dyslexia: 74, Dyscalculia: 78, Dysgraphia: 85, ADHD: 58 },
    { week: 'Week 4', Dyslexia: 80, Dyscalculia: 88, Dysgraphia: 93, ADHD: 69 }
  ];

  // Games per category data
  const categoryGamesData = [
    { category: 'Dyslexia', games: 8, color: categoryColors.Dyslexia },
    { category: 'Dyscalculia', games: 12, color: categoryColors.Dyscalculia },
    { category: 'Dysgraphia', games: 15, color: categoryColors.Dysgraphia },
    { category: 'ADHD', games: 7, color: categoryColors.ADHD }
  ];

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

  // Time distribution data
  const timeDistributionData = [
    { name: 'Dyslexia', value: 28, color: categoryColors.Dyslexia },
    { name: 'Dyscalculia', value: 35, color: categoryColors.Dyscalculia },
    { name: 'Dysgraphia', value: 42, color: categoryColors.Dysgraphia },
    { name: 'ADHD', value: 22, color: categoryColors.ADHD }
  ];

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


  console.log(data);

  // Achievements data
  const achievements = [
    { name: "Adventure Begins", description: "Complete first learning quest", earned: true, category: "General", icon: "🎯" },
    { name: "Candy Collector", description: "Master 5 number challenges", earned: true, category: "Dyscalculia", icon: "🍭" },
    { name: "Ocean Explorer", description: "Perfect 10 writing adventures", earned: true, category: "Dysgraphia", icon: "🌊" },
    { name: "Focus Hero", description: "7-day attention streak", earned: false, category: "ADHD", icon: "🚀" },
    { name: "Story Master", description: "Read 20 magical tales", earned: false, category: "Dyslexia", icon: "📚" }
  ];

  // Filter games by category
  const filteredGames = selectedCategory === 'All'
    ? gamesData
    : gamesData.filter(game => game.category === selectedCategory);

  // Get performance insights
  const getPerformanceInsights = () => {
    const best = radarData.reduce((prev, current) =>
      prev.performance > current.performance ? prev : current
    );
    const worst = radarData.reduce((prev, current) =>
      prev.performance < current.performance ? prev : current
    );

    return {
      strength: `Excellent progress in ${worldThemes[best.category]?.name || best.category}! Keep exploring this magical world.`,
      improvement: `New adventures await in ${worldThemes[worst.category]?.name || worst.category}. Ready for the challenge?`
    };
  };

  const insights = getPerformanceInsights();

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-60 right-20 w-24 h-24 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-r from-green-300 to-emerald-300 rounded-full opacity-15 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-6 space-y-6">

        {/* Magical Header Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/50">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div className="relative">
                <img
                  src={userData.avatar}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-purple-200 shadow-lg"
                />
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                  L{userData.level}
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Welcome back, {user && user.name}! 🌟
                </h1>
                <div className="flex items-center space-x-3 mt-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Adventure Progress</span>
                    <div className="w-40 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full h-3 shadow-inner">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 shadow-sm"
                        style={{ width: `${userData.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-purple-600">{userData.progress}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Adventure Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-2xl text-white shadow-lg transform hover:scale-105 transition-transform">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Quests Completed</p>
                  <p className="text-3xl font-bold">{userData.totalGames}</p>
                </div>
                <div className="text-4xl opacity-80">🎯</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-6 rounded-2xl text-white shadow-lg transform hover:scale-105 transition-transform">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Adventure Time</p>
                  <p className="text-3xl font-bold">{userData.totalTime}h</p>
                </div>
                <div className="text-4xl opacity-80">⏰</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-6 rounded-2xl text-white shadow-lg transform hover:scale-105 transition-transform">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Success Rate</p>
                  <p className="text-3xl font-bold">{userData.overallProgress}%</p>
                </div>
                <div className="text-4xl opacity-80">📈</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-2xl text-white shadow-lg transform hover:scale-105 transition-transform">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Streak Days</p>
                  <p className="text-3xl font-bold">{userData.currentStreak}</p>
                </div>
                <div className="text-4xl opacity-80">🔥</div>
              </div>
            </div>
          </div>
        </div>



        {/* Recent Adventures */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/50">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0 flex items-center">
              <Play className="w-6 h-6 mr-2 text-purple-500" />
              Recent Adventures
            </h2>
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-lg">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-gray-700"
              >
                <option value="All">All Worlds</option>
                {Object.keys(categoryColors).map(category => (
                  <option key={category} value={category}>{worldThemes[category].name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Adventure</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">World</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Score</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Time</th>
                </tr>
              </thead>
              <tbody>
                {games && games.map((game) => (
                  <tr key={game.id} className="border-b border-gray-100 hover:bg-purple-50/50 transition-colors">
                    <td className="py-4 px-4 font-medium text-gray-900">{game.gameName}</td>
                    <td className="py-4 px-4">
                      <span
                        className="px-4 py-2 rounded-full text-sm font-medium text-white shadow-lg"
                        style={{ backgroundColor: categoryColors[game.category] }}
                      >
                        { game.world }
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{new Date(game.timestamp).toISOString().split("T")[0]}</td>
                    <td className="py-4 px-4">
                      <span className={`font-bold px-3 py-1 rounded-full ${game.score >= 80 ? 'text-green-700 bg-green-100' :
                        game.score >= 70 ? 'text-yellow-700 bg-yellow-100' :
                          'text-red-700 bg-red-100'
                        }`}>
                        {game.score}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{game.timePlayed}sec</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>



        {/* Adventure Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* World Completion Stats */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/50">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🏆 World Completion Status</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryGamesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                  <XAxis dataKey="category" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '15px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="games" radius={[8, 8, 0, 0]}>
                    {categoryGamesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Time in Each World */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/50">
            <h3 className="text-xl font-bold text-gray-800 mb-4">⏱️ Game performance over time</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
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

        {/* AI Recommendations & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Magical AI Guide */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/50">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-purple-500" />
              🧙‍♂️ Your AI Learning Guide
            </h3>
            <div className="space-y-4">
              <div className="p-5 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border-l-4 border-orange-500 shadow-sm">
                <p className="text-orange-800 font-semibold flex items-center mb-2">
                  {Aidata && Aidata.summary.mostPlayedGame}
                </p>
                <p className="text-orange-700 text-sm">{Aidata && Aidata.trend}</p>
              </div>
              <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-l-4 border-green-500 shadow-sm">
                <p className="text-green-800 font-semibold flex items-center mb-2">
                  AI GUIDANCE
                </p>
                <p className="text-green-700 text-sm">{Aidata && Aidata.Guidance}</p>
              </div>
              <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border-l-4 border-blue-500 shadow-sm">
                <p className="text-blue-800 font-semibold flex items-center mb-2">
                  🌊 Ocean Champion
                </p>
                <p className="text-blue-700 text-sm">Amazing writing skills! You're becoming a true ocean explorer. Keep up the fantastic work!</p>
              </div>
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/50">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
              🏅 Achievement Badges
            </h3>
            {/* <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`flex items-center p-4 rounded-2xl transition-all ${achievement.earned
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 shadow-lg'
                    : 'bg-gray-50 border border-gray-200'
                    }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${achievement.earned ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gray-300'
                    }`}>
                    {achievement.earned ? achievement.icon : '🔒'}
                  </div>
                  <div className="ml-4 flex-1">
                    <p className={`font-semibold ${achievement.earned ? 'text-yellow-800' : 'text-gray-600'}`}>
                      {achievement.name}
                    </p>
                    <p className={`text-sm ${achievement.earned ? 'text-yellow-700' : 'text-gray-500'}`}>
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.earned && (
                    <div className="ml-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    </div>
                  )}
                </div>
              ))}
            </div> */}

            <Visual summary = {Aidata} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;