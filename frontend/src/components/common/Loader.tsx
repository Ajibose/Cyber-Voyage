import React, { useState, useEffect } from 'react';
import { Oval } from 'react-loader-spinner';
import { ReactTyped } from 'react-typed';

const Loader: React.FC = () => {
    const techJobFacts = [
        'Frontend Engineers focus on the user experience and ensure websites are responsive and interactive.',
        'Backend Developers handle the server, database, and application logic, making sure everything runs smoothly behind the scenes.',
        'Full Stack Developers work on both the frontend and backend, bridging the gap between user interaction and server logic.',
        'DevOps Engineers streamline the development process, automating deployment and monitoring to ensure continuous delivery.',
        'Mobile App Developers build applications for iOS and Android, catering to the growing demand for mobile-friendly solutions.',
        'Data Scientists analyze large datasets to uncover trends, patterns, and insights that help drive business decisions.',
        'Machine Learning Engineers create models that allow computers to learn from data and make predictions or decisions without explicit programming.',
        'Cybersecurity Analysts protect networks and data from threats, helping to prevent cyberattacks and data breaches.',
        'Cloud Architects design scalable and reliable cloud infrastructures, ensuring businesses can leverage cloud technologies efficiently.',
        'UI/UX Designers craft the overall user experience, focusing on creating visually appealing and easy-to-use interfaces.'
    ];

    const [, setRandomFact] = useState('');

    useEffect(() => {
        // Select a random fact when the component is mounted
        const randomIndex = Math.floor(Math.random() * techJobFacts.length);
        setRandomFact(techJobFacts[randomIndex]);
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 backdrop-blur-sm z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
                <Oval
                    height={80}
                    width={80}
                    color="#3B82F6"
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#93C5FD"
                    strokeWidth={3}
                    strokeWidthSecondary={3}
                />
                {/* <p className="mt-4 text-gray-600 font-medium">Loading...</p> */}
                <ReactTyped strings={["Loading"]} typeSpeed={100} loop />
            </div>
        </div>
    );
};

export default Loader;
