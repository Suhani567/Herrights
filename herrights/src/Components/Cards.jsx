import React from 'react'

import card11 from '../Assets/card11.jpeg';
import card22 from '../Assets/card22.jpeg';
import card33 from '../Assets/card33.jpeg';
import card44 from '../Assets/card44.jpeg';

const cardsData = [
  {
    title: "Legal Rights ",
    description: "Learn your basic legal rights explained in simple terms with everyday examples.",
    image: card11,
    button : "Explore Laws"
  },
  {
    title: "File a Complaint",
    description: "Follow an easy step-by-step process to file complaints or register FIRs correctly.",
    image: card22,
    button: "File Now"
  },
  {
    title: "Generate Documents",
    description: "Quickly create applications and legal drafts with our guided auto-generation tool",
    image: card33,
    button : "Generate Document"
  },
  {
    title: "FAQs & Guidance",
    description: "Find clear answers to common legal questions and helpful resources for women.",
    image: card44,
    button : "Read FAQs"
  },
];

const Cards = () => {
  return (
    <section id="resources" className="py-16 px-6 bg-white relative z-10">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Explore Our Features
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {cardsData.map((card, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-purple-100 to-pink-200 rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:translate-y-2"
          >
            {/* Card Image */}
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />

            {/* Card Content */}
            <h3 className="text-xl font-semibold mb-3 text-pink-700">
              {card.title}
            </h3>
            <p className="text-gray-600 flex-grow">{card.description}</p>

            <button className="mt-4 px-4 py-2 rounded-lg border-2 border-pink-600 text-pink-600 font-semibold hover:bg-pink-50 transition-all duration-300">
              {card.button}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Cards;
