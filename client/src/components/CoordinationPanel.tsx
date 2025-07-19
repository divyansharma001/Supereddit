// client/src/components/CoordinationPanel.tsx

import React, { useState, useEffect } from 'react';
import api from '@/lib/axios';

// A simple Alert component
const Alert = ({ children }: { children: React.ReactNode }) => (
    <div className="p-3 mb-4 text-sm text-yellow-800 bg-yellow-100 border border-yellow-200 rounded-lg">
        <strong>Warning:</strong> {children}
    </div>
);

export function CoordinationPanel({ postId }: { postId: string }) {
    const [amount, setAmount] = useState<number>(10);
    const [history, setHistory] = useState<{created_at: string, amount: number, service: string}[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Fetch vote history when component mounts
        const fetchHistory = async () => {
            const res = await api.get(`/api/posts/${postId}/vote-history`);
            setHistory(res.data as { created_at: string; amount: number; service: string }[]);
        };
        fetchHistory();
    }, [postId, isLoading]); // Refetch after a purchase attempt

    const handlePurchase = async () => {
        setIsLoading(true);
        setError('');
        setSuccess('');
        try {
            const res = await api.post('/api/votes/purchase', { postId, amount });
            setSuccess(`Order placed successfully for ${amount} upvotes! Order ID: ${(res.data as { orderId: string }).orderId}`);
        } catch (err: unknown) {
            if (err && typeof err === 'object' && 'response' in err && err.response && typeof err.response === 'object' && 'data' in err.response && err.response.data && typeof err.response.data === 'object' && 'message' in err.response.data) {
                setError((err.response.data as { message?: string }).message || 'Failed to place order.');
            } else {
                setError('Failed to place order.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Engagement Coordination</h3>
            <Alert>
                Purchasing votes violates Reddit ToS and may lead to account suspension. Use for sandboxed testing only.
            </Alert>
            <div className="space-y-3 mt-4">
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-slate-700 mb-1">
                        Upvote Amount
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="1"
                    />
                </div>
                <button
                    onClick={handlePurchase}
                    disabled={isLoading || amount <= 0}
                    className="w-full px-4 py-2 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:bg-slate-400 flex items-center justify-center"
                >
                    {isLoading ? 'Processing...' : 'Purchase Upvotes'}
                </button>
                {success && <div className="text-sm text-green-600">{success}</div>}
                {error && <div className="text-sm text-red-600">{error}</div>}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200">
                <h4 className="text-md font-semibold text-slate-800 mb-2">Order History</h4>
                {history.length > 0 ? (
                    <ul className="space-y-2 text-sm">
                        {history.map((item, index) => (
                            <li key={index} className="flex justify-between p-2 bg-slate-50 rounded-md">
                                <span>{item.amount} votes via {item.service}</span>
                                <span className="text-slate-500">{new Date(item.created_at).toLocaleString()}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-slate-500">No orders placed for this post yet.</p>
                )}
            </div>
        </div>
    );
}