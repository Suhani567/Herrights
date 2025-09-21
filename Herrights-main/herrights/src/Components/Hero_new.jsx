import React from 'react'
import cardImage from '../Assets/card.png'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

const Hero = () => {
  const navigate = useNavigate()
  const { t } = useLanguage()

  return (
    <section className='container mx-auto flex flex-col md:flex-row justify-between items-center pt-44 pb-6 sm:px-6 lg:px-8 min-h-screen relative'>
      {/* Background gradient positioned more to the left */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-20 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-10 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      {/* left content */}
      <div className='w-full md:w-1/2 space-y-8 px-4 md:px-0 relative z-10'>
        <div className='space-y-4'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight'>
            {t('hero', 'title').split(' ').map((word, index) => (
              <span key={index} className={word.includes('Women') ? 'text-pink-600' : ''}>
                {word} {index < t('hero', 'title').split(' ').length - 1 ? ' ' : ''}
              </span>
            ))}
          </h1>
          <p className='text-lg md:text-xl text-gray-600 max-w-lg'>
            {t('hero', 'subtitle')}
          </p>
        </div>

        <div className='flex flex-col sm:flex-row gap-4'>
          <button
            className='px-6 py-3 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 hover:shadow-lg transition-all duration-300 hover:scale-105'
            onClick={() => navigate('/ask-ai')}
          >
            {t('hero', 'askAINow')}
          </button>

          <a href="#resources">
          <button className='px-6 py-3 border-2 border-pink-600 text-pink-600 font-semibold rounded-lg hover:bg-pink-50 transition-all duration-300'>
            {t('hero', 'exploreResources')}
          </button>
          </a>
        </div>

        <div className='flex items-center space-x-6 pt-4'>
          <div className='text-center'>
            <p className='text-2xl font-bold text-pink-600'>24/7</p>
            <p className='text-sm text-gray-600'>{t('hero', 'aiSupport')}</p>
          </div>
          <div className='text-center'>
            <p className='text-2xl font-bold text-pink-600'>100+</p>
            <p className='text-sm text-gray-600'>{t('hero', 'legalTopics')}</p>
          </div>
          <div className='text-center'>
            <p className='text-2xl font-bold text-pink-600'>{t('hero', 'safeSecure').split(' ')[0]}</p>
            <p className='text-sm text-gray-600'>{t('hero', 'safeSecure').split(' ')[1]}</p>
          </div>
        </div>
      </div>

      {/* right content */}
      <div className='w-full md:w-1/2 mt-12 md:mt-0 px-4 md:px-0 relative z-10'>
        <div className='relative'>
          <img
            src={cardImage}
            alt="Women's Rights Illustration"
            className='w-full max-w-sm mx-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300'
          />
          <div className='absolute -bottom-4 -left-4 w-16 h-16 bg-pink-100 rounded-full opacity-50'></div>
          <div className='absolute -top-4 -right-4 w-12 h-12 bg-purple-100 rounded-full opacity-50'></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
