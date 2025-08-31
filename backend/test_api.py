import requests
import json

# Test if the endpoint is working
url = 'http://localhost:8000/generate-recipe'
data = {
    'ingredients': 'chicken, rice, garlic',
    'chef_style': 'Gordon Ramsay'
}

try:
    response = requests.post(url, json=data)
    print(f'Status code: {response.status_code}')
    print(f'Response: {response.text}')
except Exception as e:
    print(f'Error: {e}')
