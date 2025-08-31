from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import httpx
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="Meal Architect API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models defined directly here
class RecipeRequest(BaseModel):
    ingredients: str
    chef_style: str = "Gordon Ramsay"

class Recipe(BaseModel):
    title: str
    ingredients: List[str]
    instructions: List[str]
    cooking_time: Optional[str] = None
    chef_notes: Optional[str] = None

# OpenRouter service defined directly here
class OpenRouterService:
    def __init__(self):
        self.api_key = os.getenv("OPENROUTER_API_KEY")
        self.base_url = "https://openrouter.ai/api/v1"
        
    async def generate_recipe(self, ingredients: str, chef_style: str) -> dict:
        print(f"🔑 API Key loaded: {'YES' if self.api_key else 'NO'}")
        print(f"🔑 Key starts with: {self.api_key[:15] if self.api_key else 'None'}...")
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:5173",
            "X-Title": "Meal Architect"
        }
        
        chef_prompts = {
            "Gordon Ramsay": """You are Gordon Ramsay, the world-renowned chef known for your fiery passion, uncompromising standards, and culinary excellence. 

            PERSONALITY TRAITS:
            - Demanding perfection in every detail
            - Passionate and intense about cooking
            - Direct, no-nonsense communication
            - Expert technique and timing
            - Occasional use of strong language (keep it professional but firm)

            COOKING PHILOSOPHY:
            - Fresh, quality ingredients are non-negotiable
            - Proper technique and timing are everything
            - Simplicity executed perfectly beats complexity done poorly
            - Respect the ingredient and let its natural flavors shine

            COMMUNICATION STYLE:
            - Use phrases like "Right, listen up!", "Beautiful!", "That's what I'm talking about!"
            - Give precise cooking instructions with exact timings
            - Explain WHY each step matters
            - Show passion and energy in your descriptions
            - Mention professional kitchen techniques when relevant

            Create a recipe that embodies your standards of excellence and precision.""",

            "Nonna Nina": """You are Nonna Nina, a beloved Italian grandmother who has been cooking traditional Italian food for over 60 years. You learned from your own nonna and have passed down recipes through generations.

            PERSONALITY TRAITS:
            - Warm, nurturing, and loving
            - Proud of Italian culinary heritage
            - Patient and encouraging
            - Believes food is made with amore (love)
            - Shares family stories and traditions

            COOKING PHILOSOPHY:
            - Family recipes passed down through generations
            - Simple, honest ingredients prepared with love
            - Food brings families together
            - Never rush good food - it takes time
            - Everything is better with a little extra olive oil

            COMMUNICATION STYLE:
            - Use Italian terms like "caro mio" (my dear), "bello", "amore"
            - Share brief family memories or traditions
            - Gentle, encouraging instruction
            - Mention how this dish was made in "the old country"
            - Emphasize the love and care that goes into cooking
            - Use phrases like "Mamma mia!", "Bellissimo!"

            Create a recipe that feels like a warm hug from nonna's kitchen.""",

            "Sanjyot Keer": """You are Sanjyot Keer, the innovative Indian chef known for Your Food Lab, who masterfully blends traditional Indian flavors with modern cooking techniques and global influences.

            PERSONALITY TRAITS:
            - Creative and experimental
            - Passionate about Indian cuisine innovation
            - Detail-oriented with scientific approach
            - Approachable and educational
            - Enthusiastic about sharing knowledge

            COOKING PHILOSOPHY:
            - Respect traditional Indian flavors while embracing innovation
            - Understanding the science behind cooking techniques
            - Fresh spices and proper tempering are crucial
            - Balance of flavors: sweet, salty, spicy, tangy, bitter
            - Every dish tells a story of cultural fusion

            COMMUNICATION STYLE:
            - Explain the science behind techniques
            - Use terms like "beautiful", "absolutely delicious", "fantastic"
            - Mention specific Indian cooking methods (tadka, dum, etc.)
            - Explain spice combinations and their purposes
            - Share interesting facts about ingredients
            - Enthusiastic and encouraging tone

            Create a recipe that showcases the beautiful marriage of traditional Indian flavors with modern techniques."""
        }


        
        system_prompt = chef_prompts.get(chef_style, chef_prompts["Gordon Ramsay"])
        
        user_prompt = f"""Using these ingredients: {ingredients}

Create a recipe and respond ONLY with valid JSON:
{{"title": "Recipe Name", "ingredients": ["ingredient1", "ingredient2"], "instructions": ["step1", "step2"], "cooking_time": "X minutes", "chef_notes": "Chef tip"}}"""
        
        payload = {
            "model": "mistralai/mistral-7b-instruct:free",  # This one works!
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            "temperature": 0.7,
            "max_tokens": 800
        }
        
        print(f"🌐 Making request to OpenRouter...")
        
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    f"{self.base_url}/chat/completions",
                    headers=headers,
                    json=payload
                )
                
                print(f"📡 Response status: {response.status_code}")
                print(f"📄 Response preview: {response.text[:200]}...")
                
                if response.status_code == 401:
                    raise Exception("Invalid API key or insufficient credits. Check your OpenRouter account.")
                
                if response.status_code != 200:
                    raise Exception(f"OpenRouter error {response.status_code}: {response.text}")
                
                result = response.json()
                
                if not result or "choices" not in result or not result["choices"]:
                    raise Exception("Invalid response from OpenRouter")
                
                content = result["choices"][0]["message"]["content"].strip()
                print(f"📝 AI generated: {content[:100]}...")
                
                try:
                    recipe_data = json.loads(content)
                    return recipe_data
                except json.JSONDecodeError:
                    # Fallback recipe
                    ingredient_list = [ing.strip().title() for ing in ingredients.split(",")]
                    return {
                        "title": f"{chef_style}'s {ingredient_list[0]} Special",
                        "ingredients": ingredient_list,
                        "instructions": [
                            "Prepare all ingredients by washing and chopping as needed",
                            "Heat oil in a pan over medium heat",
                            "Add ingredients in order of cooking time required",
                            "Season with salt and spices throughout cooking",
                            "Cook until everything is tender and flavors are combined",
                            "Taste and adjust seasoning as needed",
                            "Serve hot and enjoy!"
                        ],
                        "cooking_time": "20-25 minutes",
                        "chef_notes": f"{chef_style} says: The secret is in the timing and seasoning!"
                    }
                    
        except httpx.TimeoutException:
            raise Exception("Request timed out. Try again.")
        except httpx.RequestError as e:
            raise Exception(f"Network error: {str(e)}")
        except Exception as e:
            print(f"💥 Service error: {str(e)}")
            raise e

# Create service instance
openrouter_service = OpenRouterService()

@app.get("/")
async def root():
    return {"message": "Welcome to Meal Architect API!"}

@app.post("/generate-recipe", response_model=Recipe)
async def generate_recipe(request: RecipeRequest):
    print(f"🚀 === RECIPE ENDPOINT HIT ===")
    print(f"🥄 Ingredients: {request.ingredients}")
    print(f"👨‍🍳 Chef: {request.chef_style}")
    
    try:
        print(f"🔧 Calling OpenRouter service...")
        recipe_data = await openrouter_service.generate_recipe(
            request.ingredients, 
            request.chef_style
        )
        print(f"✅ Recipe generated successfully!")
        return Recipe(**recipe_data)
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating recipe: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
