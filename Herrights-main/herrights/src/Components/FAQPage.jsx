import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FAQPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqs = [
    {
      id: 1,
      question: "What should I do if I'm experiencing domestic violence?",
      answer: "If you're in immediate danger, call emergency services (100 in India). For non-emergency situations, you can file a complaint under the Protection of Women from Domestic Violence Act, 2005. You can approach the nearest police station, magistrate, or protection officer. Our platform can help you generate the necessary complaint documents.",
      category: "Domestic Violence",
      priority: "High"
    },
    {
      id: 2,
      question: "How do I file a sexual harassment complaint at my workplace?",
      answer: "Under the Sexual Harassment of Women at Workplace Act, 2013, you can file a complaint with your organization's Internal Complaints Committee (ICC) within 3 months of the incident. If the ICC is not functional or you're not satisfied with their response, you can approach the Local Complaints Committee. Keep records of all incidents, witnesses, and communications.",
      category: "Workplace Rights",
      priority: "High"
    },
    {
      id: 3,
      question: "What are my maternity leave rights?",
      answer: "The Maternity Benefit Act, 1961 provides for 26 weeks of paid maternity leave for the first two children. This includes 8 weeks before delivery and 18 weeks after delivery. You are also entitled to medical bonus, nursing breaks, and protection against dismissal during maternity period.",
      category: "Maternity Rights",
      priority: "High"
    },
    {
      id: 4,
      question: "Can I get equal pay for equal work?",
      answer: "Yes, the Equal Remuneration Act, 1976 ensures equal pay for men and women for the same work or work of similar nature. If you're being paid less than your male colleagues for the same job, you can file a complaint with the labor department or approach the appropriate authority.",
      category: "Equal Pay",
      priority: "Medium"
    },
    {
      id: 5,
      question: "What is the minimum age for marriage for women?",
      answer: "The Prohibition of Child Marriage Act, 2006 sets the minimum age for marriage as 18 years for women and 21 years for men. Marriages below this age are illegal and voidable. Child marriages can be reported to the authorities.",
      category: "Child Rights",
      priority: "High"
    },
    {
      id: 6,
      question: "Do daughters have equal rights to ancestral property?",
      answer: "Yes, the Hindu Succession (Amendment) Act, 2005 gives daughters equal coparcenary rights in ancestral property. Daughters have the same rights as sons to inherit and claim their share in ancestral property, regardless of when they were born.",
      category: "Property Rights",
      priority: "High"
    },
    {
      id: 7,
      question: "What is the time limit for filing a rape case?",
      answer: "There is no time limit for filing a rape case in India. However, for other sexual offenses, the limitation period varies. It's always advisable to report the incident as soon as possible to preserve evidence and ensure better investigation.",
      category: "Sexual Assault",
      priority: "High"
    },
    {
      id: 8,
      question: "Can I get maintenance from my husband during separation?",
      answer: "Yes, under Section 125 of the Criminal Procedure Code, you can claim maintenance from your husband if he neglects or refuses to maintain you. The amount is determined based on the husband's income and your reasonable needs.",
      category: "Maintenance",
      priority: "Medium"
    },
    {
      id: 9,
      question: "What documents do I need to file for divorce?",
      answer: "Documents typically required include marriage certificate, address proof, income proof, photographs, evidence of failed marriage attempts, and any other relevant evidence. Our document generator can help you create the necessary legal documents for filing divorce.",
      category: "Divorce",
      priority: "Medium"
    },
    {
      id: 10,
      question: "How can I protect myself from cyber stalking?",
      answer: "Save all evidence including screenshots, emails, messages, and URLs. Report to the cyber crime cell or police station. Under the IT Act, 2000, cyber stalking is punishable. You can also block the person on all platforms and change your privacy settings.",
      category: "Cyber Safety",
      priority: "Medium"
    },
    {
      id: 11,
      question: "What is the procedure for filing an FIR?",
      answer: "You can file an FIR at any police station. Provide details of the incident, date, time, place, description of accused, and witnesses. The police must register your FIR under Section 154 of CrPC. If they refuse, you can approach the Superintendent of Police or file a private complaint with the magistrate.",
      category: "Legal Procedure",
      priority: "High"
    },
    {
      id: 12,
      question: "Can I work night shifts as a woman?",
      answer: "Yes, but with certain restrictions for safety. Factories Act, 1948 allows women to work night shifts only in certain industries with adequate safety measures. Your employer must provide transportation and ensure workplace safety during night hours.",
      category: "Workplace Rights",
      priority: "Low"
    },
    {
      id: 13,
      question: "What is the punishment for dowry harassment?",
      answer: "Dowry harassment is punishable under Section 498A of IPC with imprisonment up to 3 years and fine. If it leads to death or suicide, it can result in 7-10 years imprisonment. The Dowry Prohibition Act, 1961 also provides for minimum 5 years imprisonment for demanding dowry.",
      category: "Dowry",
      priority: "High"
    },
    {
      id: 14,
      question: "How can I get protection from an abusive partner?",
      answer: "You can apply for protection orders under the Domestic Violence Act. These can include residence orders, monetary relief, custody orders, and compensation. Protection officers can help you file the application and ensure your safety during the legal process.",
      category: "Domestic Violence",
      priority: "High"
    },
    {
      id: 15,
      question: "What are my rights if I'm a victim of acid attack?",
      answer: "Victims of acid attacks are entitled to free medical treatment, rehabilitation, and compensation up to ₹10 lakhs under various government schemes. You can also file criminal charges under Sections 326A and 326B of IPC, which carry minimum 10 years imprisonment.",
      category: "Victim Rights",
      priority: "High"
    }
  ];

  const categories = ['all', 'Domestic Violence', 'Workplace Rights', 'Maternity Rights', 'Equal Pay', 'Child Rights', 'Property Rights', 'Sexual Assault', 'Maintenance', 'Divorce', 'Cyber Safety', 'Legal Procedure', 'Dowry', 'Victim Rights'];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">FAQs & Guidance</h1>
              <p className="text-gray-600 mt-1">Find clear answers to common legal questions and helpful resources for women.</p>
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
                Search FAQs
              </label>
              <input
                type="text"
                placeholder="Search questions or answers..."
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
            Showing {filteredFaqs.length} of {faqs.length} FAQs
            {selectedCategory !== 'all' && (
              <span className="ml-2 text-pink-600">
                in {selectedCategory}
              </span>
            )}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              <div className="border-l-4 border-pink-500">
                <div className="p-6">
                  {/* Priority Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(faq.priority)}`}>
                      {faq.priority} Priority
                    </span>
                    <span className="inline-block px-2 py-1 text-xs bg-pink-100 text-pink-800 rounded-full">
                      {faq.category}
                    </span>
                  </div>

                  {/* Question */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>

                  {/* Answer */}
                  <div className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.881-6.13-2.33M15 19h-6" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or category filter
            </p>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Need More Help?
            </h3>
            <p className="text-gray-600 mb-4">
              Can't find what you're looking for? Our AI assistant can provide personalized guidance.
            </p>
            <button
              onClick={() => navigate('/ask-ai')}
              className="px-6 py-3 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 hover:shadow-lg transition-all duration-300"
            >
              Ask AI Assistant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
