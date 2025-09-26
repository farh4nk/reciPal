"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Navbar } from "../components/Navbar"
import { Search, Plus, AlertTriangle, Sparkles, Package, Calendar } from "lucide-react"
import { Link } from "react-router"

const mockPantryItems = [
  {
    id: 1,
    name: "Whole Wheat Flour",
    category: "Baking",
    quantity: "2.5 lbs",
    expiryDate: "2025-03-15",
    daysUntilExpiry: 45,
    status: "good",
  },
  {
    id: 2,
    name: "Olive Oil",
    category: "Oils & Vinegars",
    quantity: "500ml",
    expiryDate: "2025-08-20",
    daysUntilExpiry: 180,
    status: "good",
  },
  {
    id: 3,
    name: "Canned Tomatoes",
    category: "Canned Goods",
    quantity: "3 cans",
    expiryDate: "2025-01-10",
    daysUntilExpiry: 7,
    status: "expiring",
  },
  {
    id: 4,
    name: "Greek Yogurt",
    category: "Dairy",
    quantity: "1 container",
    expiryDate: "2024-12-28",
    daysUntilExpiry: -5,
    status: "expired",
  },
  {
    id: 5,
    name: "Basmati Rice",
    category: "Grains",
    quantity: "5 lbs",
    expiryDate: "2026-01-01",
    daysUntilExpiry: 365,
    status: "good",
  },
  {
    id: 6,
    name: "Fresh Basil",
    category: "Herbs",
    quantity: "1 bunch",
    expiryDate: "2025-01-05",
    daysUntilExpiry: 2,
    status: "expiring",
  },
]

const mockRecipeSuggestions = [
  {
    id: 1,
    title: "Tomato Basil Pasta",
    matchingIngredients: ["Canned Tomatoes", "Fresh Basil", "Olive Oil"],
    missingIngredients: ["Pasta", "Garlic"],
    cookTime: "20 min",
  },
  {
    id: 2,
    title: "Herb Rice Pilaf",
    matchingIngredients: ["Basmati Rice", "Fresh Basil", "Olive Oil"],
    missingIngredients: ["Onion", "Vegetable Broth"],
    cookTime: "25 min",
  },
  {
    id: 3,
    title: "Mediterranean Bowl",
    matchingIngredients: ["Greek Yogurt", "Olive Oil"],
    missingIngredients: ["Cucumber", "Chickpeas", "Feta"],
    cookTime: "15 min",
  },
]

export default function PantryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Baking", "Oils & Vinegars", "Canned Goods", "Dairy", "Grains", "Herbs"]

  const getStatusColor = (status) => {
    switch (status) {
      case "expired":
        return "destructive"
      case "expiring":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status) => {
    if (status === "expired" || status === "expiring") {
      return <AlertTriangle className="h-4 w-4" />
    }
    return null
  }

  const filteredItems = mockPantryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const expiringItems = mockPantryItems.filter((item) => item.status === "expiring" || item.status === "expired")

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Smart Pantry</h1>
            <p className="text-muted-foreground">AI-powered ingredient tracking and recipe suggestions</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{mockPantryItems.length}</p>
                  <p className="text-sm text-muted-foreground">Total Items</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <div>
                  <p className="text-2xl font-bold">{expiringItems.length}</p>
                  <p className="text-sm text-muted-foreground">Need Attention</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-2xl font-bold">{mockRecipeSuggestions.length}</p>
                  <p className="text-sm text-muted-foreground">AI Suggestions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">85%</p>
                  <p className="text-sm text-muted-foreground">Fresh Items</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Pantry Items */}
          <div className="lg:col-span-2">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search your pantry..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Items Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {filteredItems.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{item.name}</h3>
                      <Badge variant={getStatusColor(item.status)} className="text-xs">
                        {getStatusIcon(item.status)}
                        {item.status === "expired" ? "Expired" : item.status === "expiring" ? "Expiring" : "Fresh"}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                    <p className="text-sm font-medium mb-3">{item.quantity}</p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Expires: {new Date(item.expiryDate).toLocaleDateString()}</span>
                        <span>
                          {Math.abs(item.daysUntilExpiry)} days {item.daysUntilExpiry < 0 ? "ago" : "left"}
                        </span>
                      </div>

                      <Progress value={Math.max(0, Math.min(100, (item.daysUntilExpiry / 30) * 100))} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">No items found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("All")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* AI Suggestions Sidebar */}
          <div className="space-y-6">
            {/* Expiring Items Alert */}
            {expiringItems.length > 0 && (
              <Card className="border-destructive/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-5 w-5" />
                    Items Need Attention
                  </CardTitle>
                  <CardDescription>Use these ingredients soon to avoid waste</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {expiringItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <span>{item.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {Math.abs(item.daysUntilExpiry)} days {item.daysUntilExpiry < 0 ? "ago" : "left"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* AI Recipe Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  AI Recipe Suggestions
                </CardTitle>
                <CardDescription>Based on your current ingredients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecipeSuggestions.map((recipe) => (
                    <div key={recipe.id} className="border rounded-lg p-3">
                      <h4 className="font-medium mb-2">{recipe.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{recipe.cookTime}</p>

                      <div className="space-y-2">
                        <div>
                          <p className="text-xs font-medium text-accent mb-1">You have:</p>
                          <div className="flex flex-wrap gap-1">
                            {recipe.matchingIngredients.map((ingredient) => (
                              <Badge key={ingredient} variant="secondary" className="text-xs">
                                {ingredient}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">You need:</p>
                          <div className="flex flex-wrap gap-1">
                            {recipe.missingIngredients.map((ingredient) => (
                              <Badge key={ingredient} variant="outline" className="text-xs">
                                {ingredient}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Button size="sm" className="w-full mt-3" asChild>
                        <Link to={`/recipes/${recipe.id}`}>View Recipe</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Item
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link to="/grocery">
                    <Package className="h-4 w-4 mr-2" />
                    Generate Shopping List
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Get More Suggestions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
