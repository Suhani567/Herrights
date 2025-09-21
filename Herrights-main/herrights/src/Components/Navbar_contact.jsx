import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { language, toggleLanguage, t } = useLanguage();

    const navLinks = [
        {href: "/",label: t('nav', 'home')},
        {href: "/ask-ai",label: t('nav', 'askAI')},
        {href: "/laws",label: t('nav', 'laws')},
        // {href: "#guides",label: "Guides"},
        {href: "#resources",label: t('nav', 'resources')},
        {href: "/#contact",label: t('nav', 'contactSupport')}
    ];

   return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between px-4 sm:px-6 lg:px-8 md:h-20 h-16">


            {/* logo */}
            <div className="flex items-center gap-1 cursor-pointer">
               <img src="logo.png" alt="herrights logo" className="w-12 h-12 rounded-full object-cover transition duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-400/50" />
               <span className='text-xl font-bold text-pink-600'>HerRights</span>
            </div>

            {/* nav links */}

            <ul className='hidden md:flex flex-wrap items-center gap-4 lg:gap-6 xl:gap-8  text-gray-700 font-medium'>
            {navLinks.map((link) => (
                <li key={link.href} className='relative group'>
                  {link.href.startsWith('/') && !link.href.includes('#') ? (
                    <Link
                      to={link.href}
                      className='cursor-pointer hover:text-pink-600 transition-colors'
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <span
                       onClick={() => {
                        if (link.href.includes('#')) {
                          // Handle hash navigation
                          const hash = link.href.split('#')[1];
                          if (link.href.startsWith('/')) {
                            // Navigate to home page first, then scroll
                            navigate('/');
                            setTimeout(() => {
                              const element = document.getElementById(hash);
                              if(element) element.scrollIntoView({behavior: 'smooth'});
                            }, 100);
                          } else {
                            const element = document.getElementById(hash);
                            if(element) element.scrollIntoView({behavior: 'smooth'});
                          }
                        }
                       }}
                       className='cursor-pointer hover:text-pink-600 transition-colors'

                    >
                      {link.label}
                    </span>
                  )}
                    <span className='absolute left-0 -bottom-1 w-0 h-0.5 bg-pink-600 transition-all group-hover:w-full'></span>
                </li>
            ))}
</ul>


       {/* right side : language toggle and login button  */}
       <div className='hidden md:flex items-center gap-3 lg:gap-4'>


        <button
        onClick={toggleLanguage}
        className='px-3 md:px-3 py-1 rounded-lg border border-pink-600 text-pink-600 hover:bg-pink-100 transition'
        >
        {t('nav', language === "EN" ? 'hindi' : 'english')}

        </button>


        <button
            onClick={() => navigate('/login')}
            className='px-3 md:px-4 py-2 rounded-lg bg-pink-600 text-white font-medium shadow-md hover:scale-105 transition'
        >
            {t('nav', 'login')}
        </button>
       </div>

       {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-pink-600 focus:outline-none"
            >
              {/* Hamburger icon */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
</div>
         {/* Mobile Menu DRopdown*/}
         {isOpen && (
            <div className='absolute right-4 top-16 w-48 bg-white border border-gray-200 shadow-lg lg:hidden'>
                <ul className='flex flex-col space-y-2 px-4 py-3 text-gray-700 font-medium'>
                    {navLinks.map((link) => (
                        <li key={link.href}>

                        {link.href.startsWith('/') && !link.href.includes('#') ? (
                          <Link
                            to={link.href}
                            className='block hover:text-pink-600 transition'
                            onClick={() => setIsOpen(false)}
                          >
                            {link.label}
                          </Link>
                        ) : (
                          <a
                            href={link.href}
                            className='block hover:text-pink-600 transition'
                            onClick={() => setIsOpen(false)}
                          >
                            {link.label}
                          </a>
                        )}
                        </li>
                    ))}
                 </ul>

                   {/* language + login (mobile) */}
    <div className="flex flex-col gap-3 px-6 pb-4">
      <button
        onClick={toggleLanguage}
        className="px-3 py-2 rounded-lg border border-pink-600 text-pink-600 hover:bg-pink-100 transition"
      >
        {t('nav', language === "EN" ? 'hindi' : 'english')}
      </button>

      <button
        onClick={() => {
          navigate('/login');
          setIsOpen(false);
        }}
        className="px-4 py-2 rounded-lg bg-pink-600 text-white font-medium shadow-md hover:scale-105 transition"
      >
        {t('nav', 'login')}
      </button>
    </div>
            </div>
         )}

    </nav>
   );
};
export default Navbar;
