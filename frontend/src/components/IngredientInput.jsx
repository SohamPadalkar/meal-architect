import React from 'react';

const IngredientInput = ({ ingredients, setIngredients, onCook, loading }) => {
  return (
    <div className="glass-morphism p-4 sm:p-8">
      <div className="space-y-4 sm:space-y-6">
        <div className="text-center mb-4 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-neutral-800 mb-2 sm:mb-3">
            What's in your kitchen?
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-light px-2 sm:px-0">
            List your ingredients and let our AI chefs work their magic
          </p>
        </div>
        
        <div className="relative">
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="chicken, garlic, tomatoes, basil, olive oil..."
            className="w-full h-28 sm:h-36 p-4 sm:p-6 bg-white/50 border border-white/30 rounded-xl sm:rounded-2xl resize-none 
                     focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none 
                     text-neutral-700 placeholder-neutral-400 font-light text-sm sm:text-lg
                     backdrop-blur-sm transition-all duration-300"
            maxLength={500}
          />
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 text-xs sm:text-sm text-neutral-400">
            {ingredients.length}/500
          </div>
        </div>
        
        <button
          onClick={onCook}
          disabled={loading || !ingredients.trim()}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 
                   disabled:from-neutral-300 disabled:to-neutral-400 text-white font-semibold 
                   py-4 sm:py-5 px-6 sm:px-8 rounded-xl sm:rounded-2xl 
                   transition-all duration-300 disabled:cursor-not-allowed transform hover:scale-[1.02] 
                   active:scale-[0.98] shadow-lg hover:shadow-xl text-base sm:text-lg
                   touch-manipulation"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2 sm:space-x-3">
              <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
              <span className="text-sm sm:text-base">Creating your masterpiece...</span>
            </div>
          ) : (
            <span className="text-sm sm:text-base">Cook Something Amazing</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default IngredientInput;
