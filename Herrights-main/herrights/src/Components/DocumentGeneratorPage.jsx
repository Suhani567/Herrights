import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DocumentGeneratorPage = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [formData, setFormData] = useState({});
  const [generatedDocument, setGeneratedDocument] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [documentTemplates, setDocumentTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch document templates from backend
  React.useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/documents/templates/');
        const data = await response.json();

        if (response.ok) {
          setDocumentTemplates(data.templates);
        } else {
          setError('Failed to load document templates');
        }
      } catch (error) {
        setError('Error loading document templates. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const categories = ['All', ...new Set(documentTemplates.map(template => template.category))];

  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTemplates = selectedCategory === 'All'
    ? documentTemplates
    : documentTemplates.filter(template => template.category === selectedCategory);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateDocument = async () => {
    setIsGenerating(true);
    try {
      // Call backend API to generate document
      const response = await fetch('http://localhost:8080/api/documents/generate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          template_id: selectedTemplate,
          user_data: formData
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setGeneratedDocument(data.generated_content);
        setShowPreview(true);
      } else {
        alert(`Error: ${data.error || 'Failed to generate document'}`);
      }
    } catch (error) {
      alert('Error generating document. Please check your connection and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateDomesticViolenceComplaint = (data) => {
    return `BEFORE THE HON'BLE COURT OF ${data.policeStation.toUpperCase()} POLICE STATION

COMPLAINT UNDER SECTION 12 OF THE PROTECTION OF WOMEN FROM DOMESTIC VIOLENCE ACT, 2005

I, ${data.victimName}, aged ${data.victimAge} years, residing at ${data.victimAddress}, do hereby solemnly affirm and state as follows:

1. That I am the Complainant herein.

2. That I am/was in a domestic relationship with ${data.perpetratorName}, who is my ${data.relationship}.

3. That the Respondent has subjected me to domestic violence on ${data.incidentDate} at ${data.victimAddress}.

4. That the details of the incident are as follows:
${data.incidentDescription}

5. That the following persons witnessed the incident:
${data.witnesses || 'None'}

6. That I am seeking the following reliefs:
   a) Protection Order under Section 18
   b) Residence Order under Section 19
   c) Monetary Relief under Section 20
   d) Custody Order under Section 21

7. That this complaint is made in good faith and in the interest of justice.

Date: ${new Date().toLocaleDateString()}
Place: ${data.victimAddress}

Complainant
${data.victimName}`;
  };

  const generateWorkplaceHarassmentComplaint = (data) => {
    return `INTERNAL COMPLAINT COMMITTEE
${data.companyName.toUpperCase()}

COMPLAINT OF SEXUAL HARASSMENT AT WORKPLACE

Date: ${new Date().toLocaleDateString()}

To,
The Presiding Officer,
Internal Complaints Committee,
${data.companyName},
${data.department}

Subject: Complaint regarding Sexual Harassment at Workplace under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013

Respected Sir/Madam,

I, ${data.complainantName}, aged ${data.complainantAge} years, working as ________________ in ${data.department} department, wish to bring to your kind notice that I have been subjected to sexual harassment at my workplace.

The details of the incident are as follows:

1. Name of the accused: ${data.harasserName}
2. Position of the accused: ${data.harasserPosition}
3. Date of incident: ${data.incidentDate}
4. Place of incident: ${data.companyName}, ${data.department}
5. Description of incident: ${data.incidentDescription}

6. Witnesses (if any): ${data.witnesses || 'None'}

7. Previous complaints (if any): ${data.previousComplaints || 'None'}

I request you to kindly take necessary action against the accused as per the provisions of the Sexual Harassment of Women at Workplace Act, 2013.

Thanking you,

Yours faithfully,
${data.complainantName}
Employee ID: __________
Department: ${data.department}
Contact Number: __________
Date: ${new Date().toLocaleDateString()}
Place: __________`;
  };

  const generateMaternityLeaveApplication = (data) => {
    return `${data.companyName.toUpperCase()}
${data.department.toUpperCase()}

APPLICATION FOR MATERNITY LEAVE

Date: ${new Date().toLocaleDateString()}

To,
The Manager (HR),
${data.companyName},
${data.department}

Subject: Application for Maternity Leave

Respected Sir/Madam,

I, ${data.employeeName}, bearing Employee ID ${data.employeeId}, working in ${data.department} department, wish to apply for maternity leave as per the provisions of the Maternity Benefit Act, 1961.

The details are as follows:

1. Expected Date of Delivery: ${data.expectedDeliveryDate}
2. Proposed Leave Period: From ${data.leaveStartDate} to ${data.leaveEndDate}
3. Total Leave Days: ${Math.ceil((new Date(data.leaveEndDate) - new Date(data.leaveStartDate)) / (1000 * 60 * 60 * 24))} days
4. Contact Number: ${data.contactNumber}
5. Emergency Contact Person: ${data.emergencyContact}
6. Emergency Contact Number: ${data.emergencyNumber}

I have attached the following documents:
1. Medical Certificate
2. Expected Delivery Date Certificate
3. Any other relevant documents

I request you to kindly grant me maternity leave for the above-mentioned period and sanction the maternity benefits as per the rules of the company and the Maternity Benefit Act, 1961.

Thanking you,

Yours faithfully,
${data.employeeName}
Employee ID: ${data.employeeId}
Department: ${data.department}
Date: ${new Date().toLocaleDateString()}`;
  };

  const generatePropertyInheritanceClaim = (data) => {
    return `IN THE COURT OF ________________

SUIT NO. ________ OF 20__

IN THE MATTER OF:
${data.claimantName} ... PLAINTIFF

VERSUS

1. State of __________
2. Other Legal Heirs ... DEFENDANTS

SUIT FOR DECLARATION AND PARTITION OF PROPERTY

MOST RESPECTFULLY SHOWETH:

1. That the Plaintiff is the daughter/wife of late ${data.deceasedName} who died on ${data.dateOfDeath}.

2. That the deceased ${data.deceasedName} was the owner of the property situated at ${data.propertyAddress}.

3. That the property is more particularly described as: ${data.propertyDescription}

4. That the Plaintiff is entitled to inherit the said property as per the provisions of the Hindu Succession Act, 1956 (as amended in 2005).

5. That the Plaintiff has requested the other legal heirs for partition of the property but they have refused.

6. That the other legal heirs are: ${data.otherHeirs || 'None mentioned'}

7. That the Plaintiff is entitled to _____ share in the said property.

8. That the cause of action arose on ${data.dateOfDeath} when the deceased died intestate.

9. That this Hon'ble Court has jurisdiction to try and entertain this suit.

PRAYER:

It is therefore most respectfully prayed that this Hon'ble Court may be pleased to:

a) Declare that the Plaintiff is entitled to _____ share in the property.
b) Pass a preliminary decree for partition of the property.
c) Pass a final decree for actual partition/division of the property.
d) Award costs of the suit in favour of the Plaintiff.
e) Pass any other order(s) as this Hon'ble Court may deem fit and proper.

Date: ${new Date().toLocaleDateString()}
Place: __________

PLAINTIFF
${data.claimantName}

THROUGH COUNSEL`;
  };

  const generateDivorcePetition = (data) => {
    return `IN THE FAMILY COURT AT __________

PETITION NO. _____ OF 20__

IN THE MATTER OF:
${data.husbandName} ... PETITIONER NO. 1
${data.wifeName} ... PETITIONER NO. 2

VERSUS

NIL ... RESPONDENT

PETITION FOR DISSOLUTION OF MARRIAGE BY MUTUAL CONSENT UNDER SECTION 13-B OF THE HINDU MARRIAGE ACT, 1955

MOST RESPECTFULLY SHOWETH:

1. That the Petitioners were married on ${data.marriageDate} at ${data.marriageAddress} according to Hindu rites and ceremonies.

2. That after marriage, the Petitioners lived together as husband and wife at ${data.currentHusbandAddress}.

3. That the Petitioners have been living separately since ${data.separationDate}.

4. That due to temperamental differences, the Petitioners could not live together and have mutually agreed to dissolve the marriage.

5. That there is no possibility of reconciliation between the Petitioners.

6. That the Petitioners have been living separately for more than one year.

7. That there are ${data.children || 'no'} children from this marriage.

8. That the Petitioners have settled all their claims regarding maintenance, alimony, custody of children, and property matters mutually.

9. That the settlement terms are: ${data.settlementTerms || 'As mutually agreed'}

10. That there is no collusion between the Petitioners in filing this petition.

11. That this Hon'ble Court has jurisdiction to entertain this petition.

PRAYER:

It is therefore most respectfully prayed that this Hon'ble Court may be pleased to:

a) Dissolve the marriage between the Petitioners by a decree of divorce by mutual consent.
b) Award costs of the petition in favour of the Petitioners.
c) Pass any other order(s) as this Hon'ble Court may deem fit and proper.

Date: ${new Date().toLocaleDateString()}
Place: __________

PETITIONER NO. 1
${data.husbandName}

PETITIONER NO. 2
${data.wifeName}

THROUGH COUNSEL`;
  };

  const generateMaintenanceApplication = (data) => {
    return `IN THE COURT OF JUDICIAL MAGISTRATE FIRST CLASS AT __________

CRL. M.P. NO. _____ OF 20__

IN THE MATTER OF:
${data.applicantName} ... PETITIONER

VERSUS

${data.respondentName} ... RESPONDENT

APPLICATION UNDER SECTION 125 OF THE CODE OF CRIMINAL PROCEDURE, 1973 FOR GRANT OF MAINTENANCE

MOST RESPECTFULLY SHOWETH:

1. That the Petitioner is the legally wedded wife of the Respondent.

2. That the Petitioner and Respondent were married on ${data.marriageDate}.

3. That the Petitioner and Respondent lived together as husband and wife till ${data.separationDate}.

4. That the Respondent has neglected and refused to maintain the Petitioner.

5. That the Petitioner has no independent source of income and is unable to maintain herself.

6. That the Respondent is working as ${data.respondentOccupation} and earns approximately ₹${data.respondentIncome} per month.

7. That the Petitioner earns approximately ₹${data.monthlyIncome} per month.

8. That the Petitioner has ${data.children || 'no'} children from this marriage.

9. That the details of children are: ${data.children || 'Not applicable'}

10. That the Petitioner requires ₹${data.requiredMaintenance} per month as maintenance.

11. That the Respondent has sufficient means to pay the maintenance.

12. That this Hon'ble Court has jurisdiction to entertain this application.

PRAYER:

It is therefore most respectfully prayed that this Hon'ble Court may be pleased to:

a) Direct the Respondent to pay ₹${data.requiredMaintenance} per month as maintenance to the Petitioner.
b) Award costs of the application in favour of the Petitioner.
c) Pass any other order(s) as this Hon'ble Court may deem fit and proper.

Date: ${new Date().toLocaleDateString()}
Place: __________

PETITIONER
${data.applicantName}

THROUGH COUNSEL`;
  };

  const downloadDocument = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedDocument], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedTemplate}_document.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const resetForm = () => {
    setSelectedTemplate('');
    setFormData({});
    setGeneratedDocument('');
    setShowPreview(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Generate Documents</h1>
              <p className="text-gray-600 mt-1">Quickly create applications and legal drafts with our guided auto-generation tool</p>
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
        <div className="max-w-6xl mx-auto">
          {!showPreview ? (
            <>
              {/* Loading State */}
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-600"></div>
                    <span className="text-gray-600">Loading document templates...</span>
                  </div>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Error Loading Templates</h3>
                      <p className="text-sm text-red-700 mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Category Filter */}
              {!loading && !error && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          selectedCategory === category
                            ? 'bg-pink-600 text-white'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-pink-50'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Document Templates Grid */}
              {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {filteredTemplates.map((template) => (
                    <div
                      key={template.id}
                      className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer border-2 ${
                        selectedTemplate === template.id ? 'border-pink-500' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">{template.title}</h3>
                          <span className="px-2 py-1 text-xs bg-pink-100 text-pink-800 rounded-full">
                            {template.category}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                        <div className="flex items-center text-pink-600 font-medium">
                          <span>Select Template</span>
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedTemplate && (
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    {documentTemplates.find(t => t.id === selectedTemplate)?.title} - Fill Details
                  </h2>

                  <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {documentTemplates.find(t => t.id === selectedTemplate)?.fields.map((field) => (
                      <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        {field.type === 'textarea' ? (
                          <textarea
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleInputChange}
                            required={field.required}
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          />
                        ) : field.type === 'date' ? (
                          <input
                            type="date"
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleInputChange}
                            required={field.required}
                            max={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          />
                        ) : field.type === 'number' ? (
                          <input
                            type="number"
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleInputChange}
                            required={field.required}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          />
                        ) : (
                          <input
                            type="text"
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleInputChange}
                            required={field.required}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          />
                        )}
                      </div>
                    ))}
                  </form>

                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={generateDocument}
                      disabled={isGenerating}
                      className="px-8 py-3 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isGenerating ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Generating Document...
                        </div>
                      ) : (
                        'Generate Document'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Document Preview */
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Generated Document Preview</h2>
                <div className="flex gap-3">
                  <button
                    onClick={downloadDocument}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Download Document
                  </button>
                  <button
                    onClick={resetForm}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Generate Another
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                  {generatedDocument}
                </pre>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Important Notes:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• This is a template document and may need customization based on your specific case</li>
                  <li>• Please consult a legal professional before using this document</li>
                  <li>• Ensure all information provided is accurate and complete</li>
                  <li>• Keep copies of all supporting documents</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentGeneratorPage;
