import React from "react";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

const SummaryVisuals = ({ summary }) => {
  // Pie data for overall stats
  const overallData = [
    { name: "Average Score", value:summary && summary.summary.averageScore },
    { name: "Average Accuracy", value:summary && summary.summary.averageAccuracy * 100 }, // %
  ];

  // Bar data for game stats
  const gameData = [
    {
      name:summary && summary.summary.highestScore.game,
      score:summary &&  summary.summary.highestScore.value,
      accuracy:summary && summary.summary.highestScore.accuracy * 100,
    },
  ];

  const COLORS = ["#4F46E5", "#10B981"];

  return (
    <div className="grid md:grid-cols-1 gap-6">
      {/* Pie chart */}
      <div className="bg-white shadow-md rounded-2xl p-4">
        <h2 className="text-lg font-semibold mb-2">Overall Performance</h2>
        <PieChart width={300} height={250}>
          <Pie
            data={overallData}
            cx={150}
            cy={100}
            outerRadius={80}
            dataKey="value"
            label
          >
            {overallData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Bar chart */}
      <div className="bg-white shadow-md rounded-2xl p-4">
        <h2 className="text-lg font-semibold mb-2">Highest Scoring Game</h2>
        <BarChart width={300} height={250} data={gameData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="score" fill="#4F46E5" />
          <Bar dataKey="accuracy" fill="#10B981" />
        </BarChart>
      </div>
    </div>
  );
};

export default SummaryVisuals;
