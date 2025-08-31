import React from 'react';

const chefs = [
  { 
    name: 'Gordon Ramsay', 
    image: '/chef-gordon.png',
    style: 'Fiery precision & technique',
    personality: 'Passionate • Demanding • Expert'
  },
  { 
    name: 'Nonna Nina', 
    image: '/chef-nina.png',
    style: 'Traditional Italian comfort', 
    personality: 'Warm • Nurturing • Authentic'
  },
  { 
    name: 'Sanjyot Keer', 
    image: '/chef-sanjyot.png',
    style: 'Modern Indian fusion',
    personality: 'Creative • Innovative • Bold'
  }
];

const ChefModes = ({ selectedChef, onChefSelect }) => {
  return (
    <div className="glass-morphism p-4 sm:p-8">
      <div className="text-center mb-4 sm:mb-8">
        <h3 className="text-xl sm:text-2xl font-semibold text-neutral-800 mb-2 sm:mb-3">Choose Your Chef</h3>
        <p className="text-sm sm:text-base text-neutral-600 font-light px-2 sm:px-0">Each chef brings their unique style and expertise</p>
      </div>
      
      {/* Mobile: Stack vertically, Desktop: 3 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {chefs.map((chef) => (
          <div
            key={chef.name}
            onClick={() => onChefSelect(chef.name)}
            className={`relative p-4 sm:p-6 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-500 touch-manipulation ${
              selectedChef === chef.name
                ? 'chef-card-selected bg-white border-2 border-orange-300 scale-105'
                : 'bg-white/40 border border-white/30 hover:bg-white/60 transform hover:scale-105 active:scale-95'
            }`}
          >
            {/* Chef Image - Responsive sizing */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-3 sm:mb-4 rounded-full overflow-hidden shadow-lg">
              <img 
                src={chef.image} 
                alt={chef.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="text-center">
              <h4 className="font-semibold text-neutral-800 text-base sm:text-lg mb-1 sm:mb-2">{chef.name}</h4>
              <p className="text-orange-600 text-xs sm:text-sm font-medium mb-2 sm:mb-3">{chef.style}</p>
              <p className="text-neutral-500 text-xs leading-relaxed hidden sm:block">{chef.personality}</p>
            </div>
            
            {selectedChef === chef.name && (
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs sm:text-sm">✓</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChefModes;
