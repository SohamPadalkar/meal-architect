import React from 'react';

const RecipeDisplay = ({ recipe, chef }) => {
  return (
    <div className="glass-morphism p-4 sm:p-8">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-2">{recipe.title}</h3>
        <p className="text-orange-600 font-medium text-sm sm:text-base">by Chef {chef}</p>
      </div>
      
      {/* Mobile: Stack vertically, Desktop: Side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div>
          <h4 className="text-base sm:text-lg font-semibold text-neutral-800 mb-3 sm:mb-4">Ingredients:</h4>
          <ul className="space-y-2">
            {recipe.ingredients?.map((ingredient, index) => (
              <li key={index} className="flex items-start">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-400 rounded-full mr-2 sm:mr-3 mt-2 flex-shrink-0"></span>
                <span className="text-sm sm:text-base text-neutral-700">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-base sm:text-lg font-semibold text-neutral-800 mb-3 sm:mb-4">Instructions:</h4>
          <ol className="space-y-3">
            {recipe.instructions?.map((step, index) => (
              <li key={index} className="flex">
                <span className="bg-orange-400 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm mr-2 sm:mr-3 mt-0.5 flex-shrink-0">
                  {index + 1}
                </span>
                <span className="flex-1 text-sm sm:text-base text-neutral-700">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      
      {recipe.cooking_time && (
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-orange-50 rounded-lg border border-orange-200">
          <span className="font-medium text-neutral-800 text-sm sm:text-base">Cooking Time: </span>
          <span className="text-orange-600 text-sm sm:text-base">{recipe.cooking_time}</span>
        </div>
      )}
      
      {recipe.chef_notes && (
        <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-neutral-50 rounded-lg">
          <span className="font-medium text-neutral-800 text-sm sm:text-base">Chef's Note: </span>
          <span className="text-neutral-600 italic text-sm sm:text-base">"{recipe.chef_notes}"</span>
        </div>
      )}
    </div>
  );
};

export default RecipeDisplay;
