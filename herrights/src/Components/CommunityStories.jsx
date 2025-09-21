import React, { useState, useEffect } from 'react';

import {PenSquare, Gift, X} from 'lucide-react';

const CommunityStories = () => {
    const [showStoryModal, setShowStoryModal] = useState(false);
    const [showRewardsModal, setShowRewardsModal] = useState(false);
    const [story, setStory] = useState("");
    const [points, setPoints] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user rewards
    useEffect(() => {
        const fetchPoints = async () => {
            try {
                setLoading(true);
                const res = await fetch("http://localhost:8000/api/user-rewards/");
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                setPoints(data.points || 0);
                setError(null);
            } catch (err) {
                console.error("Error fetching rewards:", err);
                setError("Unable to load rewards. Please check if the backend server is running.");
                setPoints(0);
            } finally {
                setLoading(false);
            }
        };

        fetchPoints();
    }, []);

    const handleStorySubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8000/api/share-story/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ story }),
            });

            const data = await res.json();
            if (res.ok) {
                alert(`✅ Story submitted! You earned ${data.points} points.`);
                setStory("");
                setShowStoryModal(false);
                // Refresh points
                const pointsRes = await fetch("http://localhost:8000/api/user-rewards/");
                const pointsData = await pointsRes.json();
                setPoints(pointsData.points || 0);
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Something went wrong 😢");
        }
    };

    return (
        <>
            <section id="stories" className='py-20 px-6 bg-gradient-to-br from-pink-50 to-purple-100'>
                <div className='max-w-5xl mx-auto text-center'>

                    {/* heading */}
                    <h2 className='text-3xl font-bold mb-6 text-gray-800'>
                        Share Your Story, <span className='text-pink-600'>Earn Rewards</span>
                    </h2>

                    <p className='text-gray-600 mb-10 max-w-2xl mx-auto'>
                        Every voice matters. Share your experience and inspire other women.
                        For every story you share, you’ll earn <span className="font-semibold text-pink-700"> empowerment points </span>
                        that unlock rewards and recognition in our community.
                    </p>

                    {/* Buttons */}

                    <div className='flex flex-col sm:flex-row justify-center gap-4'>
                        <button
                            className='flex items-center gap-2 px-6 py-3 bg-pink-600 text-white font-semibold rounded-xl hover:bg-pink-700 transition'
                            onClick={() => setShowStoryModal(true)}
                        >
                            <PenSquare className = "w-5 h-5" />
                            Share Your Story
                        </button>

                        <button
                            className='flex items-center gap-2 px-6 py-3 border-2 border-pink-600 text-pink-600 font-semibold rounded-xl hover:bg-pink-50 transition'
                            onClick={() => setShowRewardsModal(true)}
                        >
                            <Gift className = "w-5 h-5" />
                            View Rewards
                        </button>
                    </div>

                    {/* Coming soon  */}
                    <p className='mt-6 text-lg text-gray-500 italic'>
                        Web3 Rewards feature coming soon – Earn tokens for every contribution!
                    </p>
                </div>
            </section>

            {/* Story Modal */}
            {showStoryModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Share Your Story</h3>
                            <button
                                onClick={() => setShowStoryModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleStorySubmit} className="flex flex-col gap-4">
                            <textarea
                                value={story}
                                onChange={(e) => setStory(e.target.value)}
                                placeholder="Share your story..."
                                className="p-3 border rounded-xl w-full h-32 resize-none"
                                required
                            />
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowStoryModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600"
                                >
                                    Share Story
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Rewards Modal */}
            {showRewardsModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-800">🎉 Your Rewards</h3>
                            <button
                                onClick={() => setShowRewardsModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {loading ? (
                            <p className="text-center text-gray-600">Loading your points...</p>
                        ) : error ? (
                            <p className="text-center text-red-500">{error}</p>
                        ) : (
                            <div className="text-center">
                                <p className="text-lg">You have <b className="text-pink-600">{points}</b> empowerment points.</p>
                                <p className="text-sm text-gray-600 mt-2">Keep sharing stories to earn more points!</p>
                            </div>
                        )}

                        <div className="mt-4 text-center">
                            <button
                                onClick={() => setShowRewardsModal(false)}
                                className="px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default CommunityStories;
