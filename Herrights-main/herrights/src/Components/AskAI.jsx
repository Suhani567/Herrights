import React, {useState} from 'react';

const AskAI = () => {
    const [question,setQuestion] = useState("");
    const [answer,setAnswer] = useState("");
    const [loading,setLoading] = useState("");
    const [error,setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setAnswer("");

        try {
            const response = await fetch('http://localhost:8000/api/ask-ai/',{
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({question}),
            });

            if(!response.ok){
                throw new Error("Something went wrong with the API.");
            }
            const data = await response.json();
            setAnswer(data.answer);
        } catch(err) {
            setError(err.message || "Failed to fetch the answer.");

        }finally{
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
