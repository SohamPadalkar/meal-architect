from fastapi import APIRouter, HTTPException
from app.models import RecipeRequest, Recipe
from app.services.openrouter_service import openrouter_service

router = APIRouter()

@router.post("/generate-recipe", response_model=Recipe)
async def generate_recipe(request: RecipeRequest):
    try:
        recipe_data = await openrouter_service.generate_recipe(
            request.ingredients, 
            request.chef_style
        )
        return Recipe(**recipe_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating recipe: {str(e)}")
