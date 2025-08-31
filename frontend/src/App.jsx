import React, { useState } from 'react';
import IngredientInput from './components/IngredientInput';
import ChefModes from './components/ChefModes';
import RecipeDisplay from './components/RecipeDisplay';
import { generateRecipe } from './services/api';

function App() {
  const [ingredients, setIngredients] = useState('');
  const [selectedChef, setSelectedChef] = useState('Gordon Ramsay');
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCookSomethingUp = async () => {
    if (!ingredients.trim()) {
      setError('Please add some ingredients first!');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const generatedRecipe = await generateRecipe(ingredients, selectedChef);
      setRecipe(generatedRecipe);
      setError(null);
    } catch (error) {
      setError(error.message || 'Failed to generate recipe. Please try again.');
      setRecipe(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-6 px-3 sm:py-12 sm:px-4 relative overflow-hidden">
      {/* Background Elements - Smaller on mobile */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-5 w-48 h-48 sm:top-20 sm:left-10 sm:w-72 sm:h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-10 right-5 w-48 h-48 sm:top-20 sm:right-10 sm:w-72 sm:h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 sm:bottom-20 sm:left-20 sm:w-72 sm:h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-12 relative z-10">
        {/* Hero Section with Logo */}
        <div className="text-center space-y-4 sm:space-y-6">
          <div className="floating">
            {/* Logo - Smaller on mobile */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-white rounded-2xl shadow-lg flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Meal Architect" 
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="text-xl sm:text-3xl font-bold text-orange-600 hidden">MA</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-transparent mb-2 sm:mb-4 px-4">
              Meal Architect
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-neutral-600 font-light max-w-2xl mx-auto leading-relaxed px-4">
            Transform everyday ingredients into extraordinary culinary experiences with AI-powered chef guidance
          </p>
        </div>
        
        {/* Error Display */}
        {error && (
          <div className="glass-morphism max-w-2xl mx-auto p-4 sm:p-6 border-l-4 border-red-400 mx-3 sm:mx-auto">
            <div className="flex items-center">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full mr-3"></div>
              <p className="text-red-700 font-medium text-sm sm:text-base">{error}</p>
            </div>
          </div>
        )}
        
        {/* Main Content - Stacks on mobile, side by side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          <div className="space-y-6 sm:space-y-8">
            <IngredientInput 
              ingredients={ingredients}
              setIngredients={setIngredients}
              onCook={handleCookSomethingUp}
              loading={loading}
            />
            
            <ChefModes 
              selectedChef={selectedChef}
              onChefSelect={setSelectedChef}
            />
          </div>
          
          <div className="lg:sticky lg:top-12">
            {recipe ? (
              <RecipeDisplay recipe={recipe} chef={selectedChef} />
            ) : (
              <div className="glass-morphism p-8 sm:p-12 text-center">
                <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-neutral-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl sm:text-4xl text-neutral-400">?</span>
                </div>
                <p className="text-neutral-500 text-base sm:text-lg font-light">
                  Your culinary masterpiece will appear here...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
