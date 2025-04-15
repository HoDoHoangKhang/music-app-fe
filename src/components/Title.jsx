import React from "react";

const Title = ({ title, onClick }) => {
    return (
        <div className="flex items-center justify-between">
            <h1 className="my-5 font-bold text-2xl">{title}</h1>
            <button
                onClick={onClick}
                className="font-bold hover:underline hover:cursor-pointer"
            >
                Show all
            </button>
        </div>
    );
};

export default Title;
