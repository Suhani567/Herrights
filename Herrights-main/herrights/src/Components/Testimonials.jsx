import React from 'react';

const Testimonials = () => {
    return (
        <section className='py-20 bg bg-white text-center'>
            <h2 className='text-3xl font-bold text-gray-800 mb-6'> Voices of Change</h2>
            <p className='text-gray-600 mb-12 max-w-2xl mx-auto'>
                Real Stories from women who found guidance and strength with HerRights.
            </p>
            <div className='grid md:grid-cols-3 gap-8 max-w-5xl mx-auto'>
                <div className='p-6 bg-pink-50 rounded-xl shadow hover:shadow-lg transition'>
                    <p className='text-gray-700 italic'>
                        "HerRights gave me the courage to file a complaint confidently."
                    </p>
                    <h4 className='mt-4 font-semibold text-pink-600'> -Shreya , Jaipur</h4>
                </div>
                <div className='p-6 bg-pink-50 rounded-xl shadow hover:shadow-lg transition'>
                    <p className='text-gray-700 italic'>
                        "The resources were so simple, I finally understood my rights."
                    </p>
                    <h4 className='mt-4 font-semibold text-pink-600'> -Tamanna, Punjab</h4>
            </div>
                <div className='p-6 bg-pink-50 rounded-xl shadow hover:shadow-lg transition'>
                    <p className='text-gray-700 italic'>
                        "Loved the supportive community and rewards feature!"
                        </p>
                        <h4 className='mt-4 font-semibold text-pink-600'> -Shruti, Bihar</h4>
                    </div>
                    </div>
        </section>
    );
};

export default Testimonials;