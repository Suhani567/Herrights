import React, { createContext, useContext, useState } from 'react';

// Translation data
const translations = {
  EN: {
    // Navbar
    nav: {
      home: "Home",
      askAI: "Ask AI",
      laws: "Laws",
      resources: "Resources",
      contactSupport: "Contact/Support",
      login: "Login",
      english: "English",
      hindi: "हिंदी"
    },

    // Hero Section
    hero: {
      title: "Empowering Women with Knowledge & Rights",
      subtitle: "Get instant access to legal information, AI-powered guidance, and comprehensive resources to understand and protect your rights. Your safety and empowerment matter.",
      askAINow: "Ask AI Now",
      exploreResources: "Explore Resources",
      aiSupport: "AI Support",
      legalTopics: "Legal Topics",
      safeSecure: "Safe & Secure"
    },

    // Footer
    footer: {
      title: "HerRights",
      description: "Empowering women with knowledge, AI support, and community. Together, we build a safer and stronger future.",
      quickLinks: "Quick Links",
      connect: "Connect",
      copyright: "© {year} HerRights. Built with ❤️ by Suhani. All rights reserved.",
      home: "Home",
      communityStories: "Community Stories",
      aboutUs: "About Us"
    },

    // Login Page
    login: {
      welcomeBack: "Welcome Back",
      signInToAccount: "Sign in to your account to continue",
      emailAddress: "Email Address",
      password: "Password",
      signIn: "Sign In",
      signingIn: "Signing In...",
      dontHaveAccount: "Don't have an account?",
      goBackToHome: "Go back to Home",
      loginSuccessful: "Login Successful!",
      welcomeBackMessage: "Welcome back to HerRights. You will be redirected to the home page shortly.",
      continueToHome: "Continue to Home",
      emailRequired: "Email is required",
      invalidEmail: "Please enter a valid email address",
      passwordRequired: "Password is required",
      passwordTooShort: "Password must be at least 6 characters long",
      loginFailed: "Login failed. Please try again."
    },

    // Common
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success",
      submit: "Submit",
      cancel: "Cancel",
      back: "Back",
      next: "Next",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      view: "View",
      search: "Search",
      filter: "Filter",
      sort: "Sort"
    }
  },

  HI: {
    // Navbar
    nav: {
      home: "होम",
      askAI: "AI से पूछें",
      laws: "कानून",
      resources: "संसाधन",
      contactSupport: "संपर्क/सहायता",
      login: "लॉगिन",
      english: "English",
      hindi: "हिंदी"
    },

    // Hero Section
    hero: {
      title: "ज्ञान और अधिकारों के साथ महिलाओं को सशक्त बनाना",
      subtitle: "कानूनी जानकारी, AI-संचालित मार्गदर्शन और व्यापक संसाधनों तक तत्काल पहुंच प्राप्त करें ताकि आप अपने अधिकारों को समझ सकें और उनकी रक्षा कर सकें। आपकी सुरक्षा और सशक्तिकरण मायने रखता है।",
      askAINow: "अभी AI से पूछें",
      exploreResources: "संसाधन देखें",
      aiSupport: "AI सहायता",
      legalTopics: "कानूनी विषय",
      safeSecure: "सुरक्षित और संरक्षित"
    },

    // Footer
    footer: {
      title: "HerRights",
      description: "महिलाओं को ज्ञान, AI सहायता और समुदाय के साथ सशक्त बनाना। साथ मिलकर, हम एक सुरक्षित और मजबूत भविष्य का निर्माण करते हैं।",
      quickLinks: "त्वरित लिंक",
      connect: "जुड़ें",
      copyright: "© {year} HerRights। ❤️ के साथ Suhani द्वारा बनाया गया। सभी अधिकार सुरक्षित।",
      home: "होम",
      communityStories: "समुदाय की कहानियां",
      aboutUs: "हमारे बारे में"
    },

    // Login Page
    login: {
      welcomeBack: "वापसी पर स्वागत है",
      signInToAccount: "जारी रखने के लिए अपने खाते में साइन इन करें",
      emailAddress: "ईमेल पता",
      password: "पासवर्ड",
      signIn: "साइन इन करें",
      signingIn: "साइन इन हो रहा है...",
      dontHaveAccount: "कोई खाता नहीं है?",
      goBackToHome: "होम पर वापस जाएं",
      loginSuccessful: "लॉगिन सफल!",
      welcomeBackMessage: "HerRights में वापसी पर स्वागत है। आपको शीघ्र ही होम पेज पर पुनः निर्देशित किया जाएगा।",
      continueToHome: "होम पर जारी रखें",
      emailRequired: "ईमेल आवश्यक है",
      invalidEmail: "कृपया एक वैध ईमेल पता दर्ज करें",
      passwordRequired: "पासवर्ड आवश्यक है",
      passwordTooShort: "पासवर्ड कम से कम 6 वर्ण लंबा होना चाहिए",
      loginFailed: "लॉगिन विफल। कृपया पुनः प्रयास करें।"
    },

    // Common
    common: {
      loading: "लोड हो रहा है...",
      error: "त्रुटि",
      success: "सफलता",
      submit: "सबमिट करें",
      cancel: "रद्द करें",
      back: "वापस",
      next: "अगला",
      save: "सहेजें",
      delete: "मिटाएं",
      edit: "संपादित करें",
      view: "देखें",
      search: "खोजें",
      filter: "फ़िल्टर",
      sort: "क्रमबद्ध करें"
    }
  }
};

// Create context
const LanguageContext = createContext();

// Custom hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Language provider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('EN');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'EN' ? 'HI' : 'EN');
  };

  const t = (section, key) => {
    return translations[language][section]?.[key] || key;
  };

  const value = {
    language,
    toggleLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
