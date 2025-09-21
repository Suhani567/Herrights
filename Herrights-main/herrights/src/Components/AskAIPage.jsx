import React, { useState } from 'react';

const AskAIPage = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setAnswer("");

        try {
            const response = await fetch('http://localhost:8000/api/ask-ai/', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question }),
            });

            if (!response.ok) {
                throw new Error("Something went wrong with the API.");
            }
            const data = await response.json();
            setAnswer(data.answer);
        } catch (err) {
            setError(err.message || "Failed to fetch the answer.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-20">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Ask AI About Your <span className="text-pink-600">Rights</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Get instant, confidential AI-powered guidance on legal questions and women's rights.
                        Our AI is trained to provide accurate, helpful information.
                    </p>
                </div>

                {/* Main AI Interface */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="question" className="block text-lg font-semibold text-gray-900 mb-3">
                                    Your Question
                                </label>
                                <textarea
                                    id="question"
                                    placeholder="Type your legal question here... (e.g., 'What are my rights regarding workplace harassment?' or 'How do I file for divorce in my state?')"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                                    rows="4"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !question.trim()}
                                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Getting AI Response...
                                    </div>
                                ) : (
                                    "Ask AI"
                                )}
                            </button>
                        </form>

                        {/* Error Message */}
                        {error && (
                            <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    {error}
                                </div>
                            </div>
                        )}

                        {/* Answer */}
                        {answer && (
                            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                                <div className="flex items-center mb-4">
                                    <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h3 className="text-xl font-semibold text-green-800">AI Response</h3>
                                </div>
                                <div className="prose prose-green max-w-none">
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{answer}</p>
                                </div>
                            </div>
                        )}

                        {/* Additional Info */}
                        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
                            <h4 className="font-semibold text-blue-800 mb-2">💡 Tips for Better Results:</h4>
                            <ul className="text-blue-700 space-y-1 text-sm">
                                <li>• Be specific about your situation and location</li>
                                <li>• Include relevant details like your state/country</li>
                                <li>• Ask one question at a time for clearer answers</li>
                                <li>• This AI provides general information, consult a lawyer for legal advice</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Back to Home Button */}
                <div className="text-center mt-8">
                    <a
                        href="/"
                        className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AskAIPage;
