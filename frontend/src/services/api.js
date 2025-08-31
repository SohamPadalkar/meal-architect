import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://meal-architect.onrender.com'  
  : 'http://localhost:8000';

export const generateRecipe = async (ingredients, chefStyle) => {
  try {
    console.log('🚀 Frontend: Making API call');
    console.log('📤 Sending:', { ingredients, chef_style: chefStyle });
    
    const response = await axios.post(`${API_BASE_URL}/generate-recipe`, {
      ingredients,
      chef_style: chefStyle
    }, {
      timeout: 60000, // 60 second timeout
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Frontend: Got response:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('❌ Frontend: API Error');
    console.error('Status:', error.response?.status);
    console.error('Message:', error.message);
    console.error('Response:', error.response?.data);
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. The AI is thinking hard - please try again!');
    }
    
    throw new Error(error.response?.data?.detail || error.message || 'Failed to generate recipe');
  }
};
