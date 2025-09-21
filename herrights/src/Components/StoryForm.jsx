import { useState } from "react";

export default function StoryForm() {
  const [story, setStory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the async operation inside the synchronous handler
    const submitStory = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/share-story/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ story }),
        });

        const data = await res.json();
        alert(`✅ Story submitted! You earned ${data.points} points.`);
        setStory("");
      } catch (err) {
        console.error("Error:", err);
        alert("Something went wrong 😢");
      }
    };

    submitStory();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
      <textarea
        value={story}
        onChange={(e) => setStory(e.target.value)}
        placeholder="Share your story..."
        className="p-3 border rounded-xl w-full"
      />
      <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded-xl">
        Share Your Story
      </button>
    </form>
  );
}

