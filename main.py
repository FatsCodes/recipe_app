from flask import Flask, render_template, request, redirect, url_for
import requests

app = Flask(__name__)

API_KEY = "bbc10b2bc1774e98bea9a0e1854c7e75"
BASE_URL = "https://api.spoonacular.com/recipes/findByIngredients"

@app.route('/')
def index():
    return render_template('index.html')

# ... (previous code)

@app.route('/find-recipes', methods=['POST'])
def find_recipes():
    user_ingredients = request.form.get('ingredients').split(',')
    number_of_recipes = int(request.form.get('number'))

    url = f"{BASE_URL}?ingredients={','.join(user_ingredients)}&number={number_of_recipes}"
    params = {"apiKey": API_KEY}

    try:
        response = requests.get(url, params=params)

        if response.status_code == 200:
            recipes = response.json()
            return render_template('recipes.html', recipes=recipes)
        else:
            return f"Error: {response.status_code}"
    except requests.RequestException as e:
        return f"Request Error: {e}"




if __name__ == '__main__':
    app.run(debug=True)



