import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "../components/Navbar"
import { ChefHat, Sparkles, ShoppingCart, Package, Users, TrendingUp, BookOpen } from "lucide-react"
import { Link } from "react-router-dom"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <ChefHat className="h-12 w-12 text-primary" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            AI-Powered Recipe Sharing for Modern Cooks
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Share your favorite recipes, let AI monitor your pantry ingredients, and get personalized cooking
            recommendations and grocery lists.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/recipes">
                <BookOpen className="h-5 w-5 mr-2" />
                Explore Recipes
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/pantry">
                <Sparkles className="h-5 w-5 mr-2" />
                Try AI Features
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-balance">Everything you need for smarter cooking</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            From recipe discovery to grocery planning, reciPal uses AI to make your cooking journey effortless and
            enjoyable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardHeader>
              <div className="p-2 bg-primary/10 rounded-lg w-fit">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Recipe Sharing</CardTitle>
              <CardDescription>Discover and share amazing recipes with a community of passionate cooks</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full" asChild>
                <Link to="/recipes">Browse Recipes</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-accent/20 transition-colors">
            <CardHeader>
              <div className="p-2 bg-accent/10 rounded-lg w-fit">
                <Package className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Smart Pantry</CardTitle>
              <CardDescription>
                AI monitors your ingredients and suggests recipes based on what you have
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full" asChild>
                <Link to="/pantry">Manage Pantry</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardHeader>
              <div className="p-2 bg-primary/10 rounded-lg w-fit">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Grocery Lists</CardTitle>
              <CardDescription>Automatically generate shopping lists from your favorite recipes</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full" asChild>
                <Link to="/grocery">View Lists</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-accent/20 transition-colors">
            <CardHeader>
              <div className="p-2 bg-accent/10 rounded-lg w-fit">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>AI Recommendations</CardTitle>
              <CardDescription>
                Get personalized recipe suggestions based on your preferences and dietary needs
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardHeader>
              <div className="p-2 bg-primary/10 rounded-lg w-fit">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Community</CardTitle>
              <CardDescription>Connect with fellow food enthusiasts and share your culinary creations</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-accent/20 transition-colors">
            <CardHeader>
              <div className="p-2 bg-accent/10 rounded-lg w-fit">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Meal Planning</CardTitle>
              <CardDescription>Plan your weekly meals and automatically organize your shopping needs</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-balance">Ready to transform your cooking?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto text-pretty">
              Join thousands of home cooks who are already using AI to discover new recipes, manage their pantry, and
              streamline their grocery shopping.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/login">Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/recipes">Explore Recipes</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-primary" />
              <span className="font-semibold">reciPal</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 reciPal. Making cooking smarter with AI.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
