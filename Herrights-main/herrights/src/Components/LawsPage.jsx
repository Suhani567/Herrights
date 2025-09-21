import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LawsPage = () => {
  const navigate = useNavigate();
  const [laws, setLaws] = useState([]);
  const [filteredLaws, setFilteredLaws] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sample data for women's rights laws (in a real app, this would come from API)
  const sampleLaws = [
    {
      id: 1,
      title: "Protection of Women from Domestic Violence Act, 2005",
      category: "Domestic Violence",
      description: "Provides protection to women from domestic violence and covers all women in domestic relationships.",
      content: "This act defines domestic violence broadly to include physical, sexual, verbal, emotional, and economic abuse. It provides for protection orders, residence orders, and monetary relief for victims.",
      importance: "High"
    },
    {
      id: 2,
      title: "Sexual Harassment of Women at Workplace Act, 2013",
      category: "Workplace Rights",
      description: "Prevents and addresses sexual harassment of women at workplace through internal complaints committees.",
      content: "Every employer with 10 or more employees must constitute an Internal Complaints Committee. The act covers all women including regular, temporary, ad-hoc employees, and daily wagers.",
      importance: "High"
    },
    {
      id: 3,
      title: "Maternity Benefit Act, 1961",
      category: "Maternity Rights",
      description: "Regulates employment of women in certain establishments for certain periods before and after childbirth.",
      content: "Provides for 26 weeks of paid maternity leave, mandatory crèche facilities, and protection against dismissal during maternity period.",
      importance: "High"
    },
    {
      id: 4,
      title: "Equal Remuneration Act, 1976",
      category: "Equal Pay",
      description: "Provides for payment of equal remuneration to men and women workers for same work or work of similar nature.",
      content: "Prohibits discrimination in recruitment, training, transfers, and promotions based on gender. Employers cannot reduce wages to meet equal pay requirements.",
      importance: "Medium"
    },
    {
      id: 5,
      title: "Prohibition of Child Marriage Act, 2006",
      category: "Child Rights",
      description: "Prohibits child marriage and makes it punishable with rigorous imprisonment and fine.",
      content: "The act defines child marriage as marriage where either party is below 18 years for females and 21 years for males. It provides for maintenance and residence for female contracting party.",
      importance: "High"
    },
    {
      id: 6,
      title: "Hindu Succession Act, 1956 (Amended 2005)",
      category: "Property Rights",
      description: "Governs succession and inheritance of property among Hindus, including equal rights for daughters.",
      content: "Daughters have equal coparcenary rights in ancestral property. The amendment removed gender discrimination in inheritance rights.",
      importance: "High"
    },
    {
      id: 7,
      title: "Medical Termination of Pregnancy Act, 1971",
      category: "Reproductive Rights",
      description: "Legalizes abortion under certain conditions and regulates the termination of pregnancies.",
      content: "Allows termination of pregnancy up to 20 weeks with the opinion of one doctor, and up to 24 weeks with the opinion of two doctors in certain cases.",
      importance: "Medium"
    },
    {
      id: 8,
      title: "Dowry Prohibition Act, 1961",
      category: "Dowry",
      description: "Prohibits the giving or taking of dowry and makes it punishable under law.",
      content: "The act covers giving, taking, or demanding dowry. It applies to all citizens of India and provides for minimum 5 years imprisonment and fine.",
      importance: "High"
    }
  ];

  const categories = ['all', 'Domestic Violence', 'Workplace Rights', 'Maternity Rights', 'Equal Pay', 'Child Rights', 'Property Rights', 'Reproductive Rights', 'Dowry'];

  useEffect(() => {
    // Simulate API call
    const fetchLaws = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLaws(sampleLaws);
        setFilteredLaws(sampleLaws);
        setLoading(false);
      } catch (err) {
        setError('Failed to load laws data');
        setLoading(false);
      }
    };

    fetchLaws();
  }, []);

  useEffect(() => {
    let filtered = laws;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(law =>
        law.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        law.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        law.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(law => law.category === selectedCategory);
    }

    setFilteredLaws(filtered);
  }, [searchTerm, selectedCategory, laws]);

  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading laws...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Women's Rights Laws</h1>
              <p className="text-gray-600 mt-1">Comprehensive legal information for women's protection and rights</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 text-pink-600 hover:text-pink-700 font-medium"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-6 py-6">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Laws
              </label>
              <input
                type="text"
                placeholder="Search by title, description, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="md:w-64">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredLaws.length} of {laws.length} laws
            {selectedCategory !== 'all' && (
              <span className="ml-2 text-pink-600">
                in {selectedCategory}
              </span>
            )}
          </p>
        </div>

        {/* Laws Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLaws.map((law) => (
            <div
              key={law.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              {/* Importance Badge */}
              <div className="p-4 pb-0">
                <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getImportanceColor(law.importance)}`}>
                  {law.importance} Priority
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {law.title}
                </h3>

                <div className="mb-3">
                  <span className="inline-block px-2 py-1 text-xs bg-pink-100 text-pink-800 rounded-full">
                    {law.category}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {law.description}
                </p>

                <button
                  onClick={() => {
                    // In a real app, this would open a modal or navigate to detail page
                    alert(`Detailed information about: ${law.title}\n\n${law.content}`);
                  }}
                  className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-300"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredLaws.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.881-6.13-2.33M15 19h-6" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No laws found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or category filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LawsPage;
