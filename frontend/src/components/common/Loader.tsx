import React from 'react';
import { Oval } from 'react-loader-spinner';

const Loader: React.FC = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 backdrop-blur-sm z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
                <Oval
                    height={80}
                    width={80}
                    color="#3B82F6"
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="#93C5FD"
                    strokeWidth={3}
                    strokeWidthSecondary={3}
                />
                <p className="mt-4 text-gray-600 font-medium">Loading...</p>
            </div>
        </div>
    );
};

export default Loader;