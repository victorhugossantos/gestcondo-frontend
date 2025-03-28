import React from "react";

const Card = ({title, description, children, className}) => {
    return (
        <div className={`bg-white p-6 rounded-lg shadow-lg ${className}`}>
            <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
            <p className="text-gray-500">{description}</p>
            <div className="mt-4">
                {children}
            </div>
        </div>
    )
}

export default Card