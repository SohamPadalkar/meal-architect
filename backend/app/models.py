from pydantic import BaseModel
from typing import List, Optional

class RecipeRequest(BaseModel):
    ingredients: str
    chef_style: str = "Gordon Ramsay"

class Recipe(BaseModel):
    title: str
    ingredients: List[str]
    instructions: List[str]
    cooking_time: Optional[str] = None
    chef_notes: Optional[str] = None
