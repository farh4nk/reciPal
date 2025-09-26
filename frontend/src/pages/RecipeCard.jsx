import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Navbar } from "../components/Navbar"
import { Clock, Users, Heart, Share2, Bookmark, ChefHat } from "lucide-react"
import { Link, useParams } from "react-router-dom"


// Mock recipe data - in a real app, this would come from a database
const getRecipe = (id) => {
  const recipes = {
    1: {
      id: 1,
      title: "Creamy Mushroom Risotto",
      description:
        "Rich and creamy risotto with wild mushrooms and parmesan cheese. This classic Italian dish is perfect for a cozy dinner and showcases the earthy flavors of seasonal mushrooms.",
      image: "/creamy-mushroom-risotto.jpg",
      cookTime: "35 min",
      prepTime: "15 min",
      servings: 4,
      difficulty: "Medium",
      likes: 127,
      tags: ["Vegetarian", "Italian", "Comfort Food"],
      author: "Chef Maria",
      ingredients: [
        "1½ cups Arborio rice",
        "4 cups warm vegetable broth",
        "1 lb mixed wild mushrooms, sliced",
        "1 medium onion, finely chopped",
        "3 cloves garlic, minced",
        "½ cup dry white wine",
        "½ cup grated Parmesan cheese",
        "3 tbsp butter",
        "2 tbsp olive oil",
        "2 tbsp fresh parsley, chopped",
        "Salt and pepper to taste",
      ],
      instructions: [
        "Heat the vegetable broth in a saucepan and keep it warm over low heat.",
        "In a large pan, heat 1 tbsp olive oil and 1 tbsp butter over medium-high heat. Add mushrooms and cook until golden brown, about 5-7 minutes. Season with salt and pepper, then set aside.",
        "In the same pan, heat remaining olive oil over medium heat. Add onion and cook until translucent, about 3-4 minutes.",
        "Add garlic and cook for another minute until fragrant.",
        "Add the Arborio rice and stir to coat with the oil. Cook for 2-3 minutes until the edges of the rice become translucent.",
        "Pour in the white wine and stir until absorbed.",
        "Add warm broth one ladle at a time, stirring constantly. Wait until each addition is almost absorbed before adding more broth. This process takes about 18-20 minutes.",
        "When the rice is creamy and tender, stir in the cooked mushrooms, remaining butter, and Parmesan cheese.",
        "Season with salt and pepper to taste. Garnish with fresh parsley and serve immediately.",
      ],
      nutrition: {
        calories: 380,
        protein: "12g",
        carbs: "58g",
        fat: "11g",
        fiber: "3g",
      },
    },
  }

  return recipes[id] || null
}

export default function RecipeDetailPage() {
  const {id} = useParams()
  const recipe = getRecipe(id)

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Recipe Not Found</h1>
          <p className="text-muted-foreground mb-8">The recipe you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/recipes">Back to Recipes</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/recipes" className="hover:text-foreground">
              Recipes
            </Link>
            <span>/</span>
            <span>{recipe.title}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recipe Image */}
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img src={recipe.image || "/placeholder.svg"} alt={recipe.title} fill className="object-cover" />
            </div>

            {/* Recipe Info */}
            <div>
              <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
              <p className="text-muted-foreground text-lg mb-6">{recipe.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {recipe.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Recipe Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <div className="text-sm font-medium">{recipe.cookTime}</div>
                  <div className="text-xs text-muted-foreground">Cook Time</div>
                </div>
                <div className="text-center">
                  <Users className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <div className="text-sm font-medium">{recipe.servings}</div>
                  <div className="text-xs text-muted-foreground">Servings</div>
                </div>
                <div className="text-center">
                  <ChefHat className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <div className="text-sm font-medium">{recipe.difficulty}</div>
                  <div className="text-xs text-muted-foreground">Difficulty</div>
                </div>
                <div className="text-center">
                  <Heart className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <div className="text-sm font-medium">{recipe.likes}</div>
                  <div className="text-xs text-muted-foreground">Likes</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button className="flex-1">
                  <Heart className="h-4 w-4 mr-2" />
                  Save Recipe
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Ingredients</CardTitle>
                <CardDescription>Everything you need for this recipe</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{ingredient}</span>
                    </li>
                  ))}
                </ul>

                <Separator className="my-4" />

                <Button variant="outline" className="w-full bg-transparent">
                  Add to Grocery List
                </Button>
              </CardContent>
            </Card>

            {/* Nutrition Info */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Nutrition Facts</CardTitle>
                <CardDescription>Per serving</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Calories</span>
                    <span className="font-medium">{recipe.nutrition.calories}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Protein</span>
                    <span className="font-medium">{recipe.nutrition.protein}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Carbohydrates</span>
                    <span className="font-medium">{recipe.nutrition.carbs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fat</span>
                    <span className="font-medium">{recipe.nutrition.fat}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fiber</span>
                    <span className="font-medium">{recipe.nutrition.fiber}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Instructions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
                <CardDescription>Step-by-step cooking guide</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <p className="text-sm leading-relaxed pt-1">{instruction}</p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* Author Info */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <ChefHat className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Recipe by {recipe.author}</h3>
                    <p className="text-sm text-muted-foreground">Passionate home cook sharing delicious recipes</p>
                  </div>
                  <Button variant="outline" className="ml-auto bg-transparent">
                    Follow
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
