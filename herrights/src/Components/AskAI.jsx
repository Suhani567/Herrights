import React, {useState} from 'react';

const AskAI = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setAnswer("");

        // Validate input
        if (!question.trim()) {
            setError("Please enter a question.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/ask-ai/', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({question: question.trim()}),
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle different error scenarios
                if (response.status === 400) {
                    setError(data.error || "Please provide a valid question.");
                } else if (response.status === 500) {
                    setError(data.error || "Server error occurred. Please check your API key configuration.");
                } else {
                    setError(data.error || "Something went wrong with the API.");
                }
                return;
            }

            // Success case
            if (data.answer) {
                setAnswer(data.answer);
            } else {
                setError("No answer received from the AI service.");
            }
        } catch(err) {
            console.error("Fetch error:", err);
            if (err.name === 'TypeError' && err.message.includes('fetch')) {
                setError("Cannot connect to the server. Please make sure the backend server is running on http://localhost:8000");
            } else {
                setError(err.message || "Failed to fetch the answer. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10'>
            <h2 className='text-2xl font-bold mb-4'>Ask AI about your rights</h2>
            <form onSubmit={handleSubmit}>
                <input type="text"
                placeholder='Type your question..'
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className='w-full p-3 border rounded mb-4'
                required
                />
                <button
                   type='submit'
                   className='bg-blue-600 text-white px-6 py-3 rounded hover:bg-700 transition'
                   disabled={loading}
                >
                    {loading ? "Asking..." : "Ask AI"}

                </button>
            </form>

            {error && (
                <div className='mt-4 p-3 bg-red-100 text-red-700 rounded'>{error}</div>
            )}

            {answer && (
                <div className='mt-4 p-3 bg-green-100 text-green-700 rounded'>
                    <h3 className='font-bold'>Answer:</h3>
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

export default AskAI;
