import os
import httpx
import json
from typing import Dict, Any

class OpenRouterService:
    def __init__(self):
        self.api_key = os.getenv("OPENROUTER_API_KEY")
        self.base_url = "https://openrouter.ai/api/v1"  # Hardcode this
        
    async def generate_recipe(self, ingredients: str, chef_style: str) -> Dict[str, Any]:
        # These headers are CRITICAL for OpenRouter
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:5173",  # Required!
            "X-Title": "Meal Architect",  # Required!
            "User-Agent": "Meal-Architect/1.0"  # Sometimes helps
        }
        
        # Simpler prompt that works better
        prompt = f"""Create a recipe using these ingredients: {ingredients}

Respond ONLY with valid JSON in this format:
{{"title": "Recipe Name", "ingredients": ["item1", "item2"], "instructions": ["step1", "step2"], "cooking_time": "X minutes", "chef_notes": "{chef_style} style cooking tip"}}"""
        
        payload = {
            "model": "meta-llama/llama-3.1-8b-instruct:free",  # Use FREE model first!
            "messages": [
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.7,
            "max_tokens": 800
        }
        
        print(f"🔑 API Key: {self.api_key[:20]}...")
        print(f"🔑 Key Length: {len(self.api_key) if self.api_key else 0}")
        print(f"🌐 URL: {self.base_url}/chat/completions")
        print(f"📦 Payload: {json.dumps(payload, indent=2)}")
        
        try:
            async with httpx.AsyncClient(timeout=60.0) as client:
                response = await client.post(
                    f"{self.base_url}/chat/completions",
                    headers=headers,
                    json=payload
                )
                
                print(f"📡 Status: {response.status_code}")
                print(f"📋 Response Headers: {dict(response.headers)}")
                print(f"📄 Response Body: {response.text}")
                
                if response.status_code == 401:
                    error_details = response.json() if response.text else {}
                    print(f"❌ 401 Error Details: {error_details}")
                    
                    # Check common 401 causes
                    if "No auth credentials found" in response.text:
                        raise Exception("OpenRouter says no auth credentials found. Check if your API key is valid and has credits.")
                    elif "invalid" in response.text.lower():
                        raise Exception("OpenRouter says API key is invalid. Generate a new key.")
                    else:
                        raise Exception(f"OpenRouter 401 error: {response.text}")
                
                if response.status_code != 200:
                    raise Exception(f"OpenRouter API error {response.status_code}: {response.text}")
                
                result = response.json()
                
                if not result or "choices" not in result or not result["choices"]:
                    raise Exception(f"Invalid OpenRouter response: {result}")
                
                content = result["choices"][0]["message"]["content"].strip()
                print(f"📝 AI Response: {content}")
                
                try:
                    recipe_data = json.loads(content)
                    return recipe_data
                except json.JSONDecodeError:
                    # Fallback for parsing issues
                    return {
                        "title": f"{chef_style}'s {ingredients} Special",
                        "ingredients": [ing.strip() for ing in ingredients.split(",")],
                        "instructions": [
                            "Prepare ingredients",
                            "Cook with care",
                            "Season to taste", 
                            "Serve hot"
                        ],
                        "cooking_time": "20 minutes",
                        "chef_notes": f"{chef_style} approved!"
                    }
                    
        except Exception as e:
            print(f"💥 Service Error: {str(e)}")
            raise e

openrouter_service = OpenRouterService()
