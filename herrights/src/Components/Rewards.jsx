import { useEffect, useState } from "react";

export default function Rewards() {
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return (
      <div className="text-center p-6">
        <h2 className="text-2xl font-bold">🎉 Your Rewards</h2>
        <p className="text-lg mt-3">Loading your points...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6">
        <h2 className="text-2xl font-bold">🎉 Your Rewards</h2>
        <p className="text-lg mt-3 text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="text-center p-6">
      <h2 className="text-2xl font-bold">🎉 Your Rewards</h2>
      <p className="text-lg mt-3">You have <b>{points}</b> empowerment points.</p>
    </div>
  );
}

