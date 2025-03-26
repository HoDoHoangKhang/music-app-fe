import React from 'react'

const Navbar = ({categories, activeCategory, setActiveCategory }) => {
    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-3 py-1 rounded-4xl cursor-pointer ${
                        activeCategory === category.id
                            ? "bg-white text-black"
                            : "bg-[#242424] text-white"
                    }`}
                >
                    {category.label}
                </button>
            ))}
        </div>
    );
};

export default Navbar
