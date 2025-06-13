import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  Eye,
  Calendar,
  TrendingUp,
  AlertCircle,
  Loader,
} from "lucide-react";
import { backendurl } from "../App";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalViews: 0,
    pendingContacts: 0,
    viewsData: {},
    loading: true,
    error: null,
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Website Views Over Time",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${backendurl}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.data.success) {
        setStats({
          totalViews: response.data.totalViews,
          pendingContacts: response.data.pendingContacts,
          viewsData: response.data.viewsData,
          loading: false,
          error: null,
        });
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      setStats({
        ...stats,
        loading: false,
        error: error.message,
      });
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 300000);
    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      title: "Total Views",
      value: stats.totalViews,
      icon: Eye,
      color: "bg-purple-500",
      description: "Website page views",
    },
    {
      title: "Pending Contacts",
      value: stats.pendingContacts,
      icon: Calendar,
      color: "bg-orange-500",
      description: "Contact form submissions",
    },
  ];

  if (stats.loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <Loader className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (stats.error) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Error Loading Dashboard
          </h3>
          <p className="text-gray-500 mb-4">{stats.error}</p>
          <button
            onClick={fetchStats}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen pt-32 px-4 bg-gray-50"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Dashboard</h1>
            <p className="text-gray-600">Website analytics and contacts</p>
          </div>
          <button
            onClick={fetchStats}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Views Analytics</h2>
          <div className="h-[400px]">
            {stats.viewsData && Object.keys(stats.viewsData).length > 0 ? (
              <Line data={stats.viewsData} options={chartOptions} />
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">No view data available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;