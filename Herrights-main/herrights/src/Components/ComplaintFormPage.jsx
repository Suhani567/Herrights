import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ComplaintFormPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    complaintType: '',
    victimName: '',
    victimAge: '',
    victimGender: 'female',
    contactNumber: '',
    email: '',
    address: '',
    incidentDate: '',
    incidentLocation: '',
    incidentDescription: '',
    witnesses: '',
    policeStation: '',
    previousComplaints: '',
    urgency: 'medium',
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const complaintTypes = [
    'Domestic Violence',
    'Sexual Harassment at Workplace',
    'Sexual Assault',
    'Dowry Harassment',
    'Cyber Crime/Stalking',
    'Property Dispute',
    'Child Marriage',
    'Other'
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low - Not urgent', description: 'Matter can be addressed within a few weeks' },
    { value: 'medium', label: 'Medium - Needs attention', description: 'Matter should be addressed within a few days' },
    { value: 'high', label: 'High - Urgent', description: 'Immediate attention required' },
    { value: 'emergency', label: 'Emergency', description: 'Life-threatening situation, immediate help needed' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Submit to backend API
      const response = await fetch('http://localhost:8000/api/complaints/submit/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage(`Complaint submitted successfully! Your complaint ID is: ${data.complaint_id}. You will receive a confirmation email shortly.`);
        // Reset form after successful submission
        setFormData({
          complaintType: '',
          victimName: '',
          victimAge: '',
          victimGender: 'female',
          contactNumber: '',
          email: '',
          address: '',
          incidentDate: '',
          incidentLocation: '',
          incidentDescription: '',
          witnesses: '',
          policeStation: '',
          previousComplaints: '',
          urgency: 'medium',
          additionalInfo: ''
        });
      } else {
        setSubmitMessage(`Error: ${data.error || 'Failed to submit complaint'}`);
      }
    } catch (error) {
      setSubmitMessage('Error submitting complaint. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'emergency': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">File a Complaint</h1>
              <p className="text-gray-600 mt-1">Follow an easy step-by-step process to file complaints or register FIRs correctly</p>
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

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Submit Message */}
          {submitMessage && (
            <div className={`mb-6 p-4 rounded-lg border-l-4 ${
              submitMessage.includes('Error')
                ? 'bg-red-50 border-red-400 text-red-700'
                : 'bg-green-50 border-green-400 text-green-700'
            }`}>
              {submitMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Complaint Type */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type of Complaint *
                </label>
                <select
                  name="complaintType"
                  value={formData.complaintType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="">Select complaint type</option>
                  {complaintTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Victim Information */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Victim Information</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="victimName"
                  value={formData.victimName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  name="victimAge"
                  value={formData.victimAge}
                  onChange={handleInputChange}
                  required
                  min="1"
                  max="120"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  name="victimGender"
                  value={formData.victimGender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              {/* Incident Details */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Incident Details</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Incident *
                </label>
                <input
                  type="date"
                  name="incidentDate"
                  value={formData.incidentDate}
                  onChange={handleInputChange}
                  required
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location of Incident *
                </label>
                <input
                  type="text"
                  name="incidentLocation"
                  value={formData.incidentLocation}
                  onChange={handleInputChange}
                  required
                  placeholder="Address or location where incident occurred"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Description of Incident *
                </label>
                <textarea
                  name="incidentDescription"
                  value={formData.incidentDescription}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  placeholder="Please provide a detailed description of what happened, including sequence of events, what was said or done, and any other relevant details..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Witnesses (if any)
                </label>
                <textarea
                  name="witnesses"
                  value={formData.witnesses}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Names and contact information of any witnesses to the incident"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              {/* Additional Information */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Additional Information</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Police Station
                </label>
                <input
                  type="text"
                  name="policeStation"
                  value={formData.policeStation}
                  onChange={handleInputChange}
                  placeholder="Name of police station (optional)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency Level *
                </label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${getUrgencyColor(formData.urgency)}`}
                >
                  {urgencyLevels.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {urgencyLevels.find(level => level.value === formData.urgency)?.description}
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Any Previous Complaints
                </label>
                <select
                  name="previousComplaints"
                  value={formData.previousComplaints}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes, I have filed complaints before</option>
                  <option value="no">No, this is my first complaint</option>
                  <option value="tried">I tried to file but faced issues</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Any additional information you think might be helpful..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting Complaint...
                  </div>
                ) : (
                  'Submit Complaint'
                )}
              </button>
            </div>
          </form>

          {/* Help Section */}
          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Need Help?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div>
                <p className="font-medium mb-1">Emergency Contacts:</p>
                <ul className="space-y-1">
                  <li>• Police: 100</li>
                  <li>• Women Helpline: 181</li>
                  <li>• Domestic Violence: 1091</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-1">Important Notes:</p>
                <ul className="space-y-1">
                  <li>• All information is kept confidential</li>
                  <li>• You can file anonymously if needed</li>
                  <li>• Legal aid available for eligible cases</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintFormPage;
