// client/src/components/CoordinationPanel.tsx

import React, { useState } from 'react';

export function CoordinationPanel() {
    const [amount] = useState<number>(10);
    // Dummy history for visual effect
    const history = [
        { created_at: new Date().toISOString(), amount: 10, service: 'DemoService' },
        { created_at: new Date().toISOString(), amount: 20, service: 'DemoService' }
    ];
    return (
        <div className="relative bg-white rounded-xl shadow-sm border border-slate-200 p-6 overflow-hidden">
            {/* Overlay */}
            <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-10 pointer-events-auto">
                <span className="text-slate-400 font-semibold text-base">Engagement features coming soon</span>
            </div>
            <div className="blur-sm opacity-60 pointer-events-none select-none">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Engagement Coordination</h3>
                <div className="space-y-3 mt-4">
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-slate-700 mb-1">
                            Upvote Amount
                        </label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            disabled
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-100"
                            min="1"
                        />
                    </div>
                    <button
                        disabled
                        className="w-full px-4 py-2 font-semibold text-white bg-red-600 rounded-lg flex items-center justify-center opacity-70 cursor-not-allowed"
                    >
                        Purchase Upvotes
                    </button>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200">
                    <h4 className="text-md font-semibold text-slate-800 mb-2">Order History</h4>
                    <ul className="space-y-2 text-sm">
                        {history.map((item, index) => (
                            <li key={index} className="flex justify-between p-2 bg-slate-50 rounded-md">
                                <span>{item.amount} votes via {item.service}</span>
                                <span className="text-slate-500">{new Date(item.created_at).toLocaleString()}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}