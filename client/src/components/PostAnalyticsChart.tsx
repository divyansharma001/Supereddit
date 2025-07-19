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