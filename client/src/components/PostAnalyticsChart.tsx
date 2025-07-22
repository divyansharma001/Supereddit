"use client";

import React, { useState, useEffect } from "react";
import api from "@/lib/axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";

interface AnalyticsDataPoint {
  upvotes: number;
  comments: number;
  createdAt: string;
}

export function PostAnalyticsChart({ postId }: { postId: string }) {
  const [data, setData] = useState<AnalyticsDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) return;
    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get<{ analytics: AnalyticsDataPoint[] }>(
          `/api/posts/${postId}/analytics`
        );
        setData(res.data.analytics);
      } catch (err) {
        setError("Failed to load analytics data.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [postId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500">
        <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Loading chart...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500 bg-red-50 rounded-lg">
        <p>{error}</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500 bg-slate-50 rounded-lg">
        <div className="text-center">
            <p className="font-semibold">No analytics data yet.</p>
            <p className="text-xs mt-1">Check back later. Data is updated hourly for posted content.</p>
        </div>
      </div>
    );
  }

  const formattedData = data.map((d) => ({
    ...d,
    name: dayjs(d.createdAt).format("MMM D, hA"),
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={formattedData}
          margin={{
            top: 5,
            right: 20,
            left: -10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis yAxisId="left" stroke="#3b82f6" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis yAxisId="right" orientation="right" stroke="#8b5cf6" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "0.5rem",
            }}
          />
          <Legend wrapperStyle={{ fontSize: "14px" }} />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="upvotes"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4, fill: "#3b82f6" }}
            activeDot={{ r: 6 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="comments"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{ r: 4, fill: "#8b5cf6" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// DAU/MAU mock data for Reddit
const mockDAUMAU = [
  { date: '2024-05-01', dau: 1200000, mau: 8000000 },
  { date: '2024-05-02', dau: 1300000, mau: 8100000 },
  { date: '2024-05-03', dau: 1100000, mau: 8050000 },
  { date: '2024-05-04', dau: 1400000, mau: 8200000 },
  { date: '2024-05-05', dau: 1250000, mau: 8150000 },
  { date: '2024-05-06', dau: 1350000, mau: 8300000 },
  { date: '2024-05-07', dau: 1280000, mau: 8250000 },
];

export function DAUMAUChart() {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-10 animate-fade-slide">
      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2" style={{fontFamily: 'Plus Jakarta Sans'}}>Reddit DAU / MAU Trends</h3>
      <p className="text-slate-600 text-sm mb-4">Daily and Monthly Active Users on Reddit (sample data)</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={mockDAUMAU} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} />
          <Legend wrapperStyle={{ fontSize: '14px' }} />
          <Line type="monotone" dataKey="dau" name="DAU" stroke="#FF4500" strokeWidth={2} dot={{ r: 4, fill: '#FF4500' }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="mau" name="MAU" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 