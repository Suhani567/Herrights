import React from 'react';
import {Facebook, Twitter, Instagram, Mail} from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const Footer = () =>{
    const { t } = useLanguage();

    return (
        <footer className='bg-gray-900 text-gray-300 py-10 px-6'>
            <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>

                {/* About */}

             <div>
                <h2 className='text-xl font-bold text-white mb-3'> {t('footer', 'title')} </h2>
                <p className='text-sm text-gray-400'>
                     {t('footer', 'description')}
                </p>
             </div>

             {/* Quick Links */}

             <div>
                <h3 className='text-lg font-semibold text-white mb-3'>{t('footer', 'quickLinks')}</h3>
                <ul className='space-y-2'>
                    <li><a href="#home" className='hover:text-pink-500'>{t('footer', 'home')}</a></li>
                    <li><a href="#resources" className='hover:text-pink-500'>{t('footer', 'resources')}</a></li>
                    <li><a href="#stories" className='hover:text-pink-500'>{t('footer', 'communityStories')}</a></li>
                    <li><a href="#about" className='hover:text-pink-500'>{t('footer', 'aboutUs')}</a></li>
                </ul>
             </div>

             {/* Contact and socials */}

             <div>
                <h3 className='text-lg font-semibold text-white mb-3'>{t('footer', 'connect')}</h3>
                <div className='flex space-x-4'>
                    <a href="#" className='hover:text-pink-500'><Facebook size={20}/></a>
                    <a href="#" className='hover:text-pink-500'><Twitter size={20}/></a>
                    <a href="#" className='hover:text-pink-500'><Instagram size={20}/></a>
                    <a href= "contact@herrights.com" className='hover:text-pink-500'><Mail size={20} /></a>

                </div>
             </div>
            </div>

           {/* Copyright */}

           <div className='border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500'>
            {t('footer', 'copyright').replace('{year}', new Date().getFullYear())}
           </div>
        </footer>
    )
}

export default Footer;
