"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "../components/Navbar"
import { Search, Plus, ShoppingCart, Check, Star, MapPin } from "lucide-react"

const mockGroceryLists = [
  {
    id: 1,
    name: "Weekly Essentials",
    items: 12,
    completed: 8,
    priority: "high",
    dueDate: "2025-01-05",
  },
  {
    id: 2,
    name: "Dinner Party Prep",
    items: 15,
    completed: 3,
    priority: "medium",
    dueDate: "2025-01-08",
  },
  {
    id: 3,
    name: "Pantry Restock",
    items: 8,
    completed: 8,
    priority: "low",
    dueDate: "2025-01-10",
  },
]

const mockGroceryItems = [
  {
    id: 1,
    name: "Organic Bananas",
    category: "Produce",
    quantity: "2 lbs",
    priority: "high",
    completed: false,
    estimatedPrice: "$3.99",
    fromRecipe: "Banana Bread",
  },
  {
    id: 2,
    name: "Whole Milk",
    category: "Dairy",
    quantity: "1 gallon",
    priority: "high",
    completed: true,
    estimatedPrice: "$4.29",
    fromRecipe: null,
  },
  {
    id: 3,
    name: "Ground Beef",
    category: "Meat",
    quantity: "1 lb",
    priority: "medium",
    completed: false,
    estimatedPrice: "$6.99",
    fromRecipe: "Beef Tacos",
  },
  {
    id: 4,
    name: "Sourdough Bread",
    category: "Bakery",
    quantity: "1 loaf",
    priority: "low",
    completed: false,
    estimatedPrice: "$4.99",
    fromRecipe: null,
  },
  {
    id: 5,
    name: "Roma Tomatoes",
    category: "Produce",
    quantity: "2 lbs",
    priority: "medium",
    completed: true,
    estimatedPrice: "$3.49",
    fromRecipe: "Pasta Sauce",
  },
  {
    id: 6,
    name: "Cheddar Cheese",
    category: "Dairy",
    quantity: "8 oz",
    priority: "medium",
    completed: false,
    estimatedPrice: "$5.99",
    fromRecipe: "Mac and Cheese",
  },
]

const categories = ["All", "Produce", "Dairy", "Meat", "Bakery", "Pantry", "Frozen"]

export default function GroceryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [viewMode, setViewMode] = useState("category")

  const filteredItems = mockGroceryItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const groupedItems = categories.reduce((acc, category) => {
    if (category === "All") return acc
    acc[category] = filteredItems.filter((item) => item.category === category)
    return acc
  }, {})

  const completedItems = mockGroceryItems.filter((item) => item.completed).length
  const totalItems = mockGroceryItems.length
  const progressPercentage = (completedItems / totalItems) * 100

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Smart Grocery Lists</h1>
            <p className="text-muted-foreground">Organized shopping with recipe integration</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New List
          </Button>
        </div>

        {/* Shopping Lists Overview */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {mockGroceryLists.map((list) => (
            <Card key={list.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium">{list.name}</h3>
                  <Badge variant={getPriorityColor(list.priority)} className="text-xs">
                    {list.priority}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>
                      {list.completed}/{list.items} items
                    </span>
                    <span className="text-muted-foreground">Due {new Date(list.dueDate).toLocaleDateString()}</span>
                  </div>

                  <Progress value={(list.completed / list.items) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Current List */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Weekly Essentials
                </CardTitle>
                <CardDescription>
                  {completedItems} of {totalItems} items completed • Est. total: $29.74
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  Store Layout
                </Button>
                <Button size="sm">
                  <Check className="h-4 w-4 mr-2" />
                  Complete List
                </Button>
              </div>
            </div>

            <Progress value={progressPercentage} className="mt-4" />
          </CardHeader>

          <CardContent>
            {/* Search and View Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Tabs value={viewMode} onValueChange={setViewMode} className="w-auto">
                <TabsList>
                  <TabsTrigger value="category">By Category</TabsTrigger>
                  <TabsTrigger value="priority">By Priority</TabsTrigger>
                  <TabsTrigger value="recipe">By Recipe</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 mb-6 overflow-x-auto">
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

            {/* Items List */}
            <Tabs value={viewMode} className="w-full">
              <TabsContent value="category" className="space-y-6">
                {Object.entries(groupedItems).map(
                  ([category, items]) =>
                    items.length > 0 && (
                      <div key={category}>
                        <h3 className="font-medium mb-3 flex items-center gap-2">
                          {category}
                          <Badge variant="outline" className="text-xs">
                            {items.length} items
                          </Badge>
                        </h3>

                        <div className="space-y-2">
                          {items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50"
                            >
                              <Checkbox checked={item.completed} className="flex-shrink-0" />

                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4
                                      className={`font-medium ${item.completed ? "line-through text-muted-foreground" : ""}`}
                                    >
                                      {item.name}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                      {item.quantity} • {item.estimatedPrice}
                                    </p>
                                    {item.fromRecipe && <p className="text-xs text-accent">For: {item.fromRecipe}</p>}
                                  </div>

                                  <Badge variant={getPriorityColor(item.priority)} className="text-xs">
                                    {item.priority === "high" && <Star className="h-3 w-3 mr-1" />}
                                    {item.priority}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ),
                )}
              </TabsContent>

              <TabsContent value="priority" className="space-y-4">
                {["high", "medium", "low"].map((priority) => {
                  const priorityItems = filteredItems.filter((item) => item.priority === priority)
                  return (
                    priorityItems.length > 0 && (
                      <div key={priority}>
                        <h3 className="font-medium mb-3 flex items-center gap-2 capitalize">
                          {priority} Priority
                          <Badge variant={getPriorityColor(priority)} className="text-xs">
                            {priorityItems.length} items
                          </Badge>
                        </h3>

                        <div className="space-y-2">
                          {priorityItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50"
                            >
                              <Checkbox checked={item.completed} className="flex-shrink-0" />

                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4
                                      className={`font-medium ${item.completed ? "line-through text-muted-foreground" : ""}`}
                                    >
                                      {item.name}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                      {item.category} • {item.quantity} • {item.estimatedPrice}
                                    </p>
                                    {item.fromRecipe && <p className="text-xs text-accent">For: {item.fromRecipe}</p>}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )
                })}
              </TabsContent>

              <TabsContent value="recipe" className="space-y-4">
                {/* Group by recipe */}
                {Array.from(new Set(filteredItems.map((item) => item.fromRecipe || "General Items"))).map((recipe) => {
                  const recipeItems = filteredItems.filter((item) => (item.fromRecipe || "General Items") === recipe)
                  return (
                    <div key={recipe}>
                      <h3 className="font-medium mb-3 flex items-center gap-2">
                        {recipe}
                        <Badge variant="outline" className="text-xs">
                          {recipeItems.length} items
                        </Badge>
                      </h3>

                      <div className="space-y-2">
                        {recipeItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50"
                          >
                            <Checkbox checked={item.completed} className="flex-shrink-0" />

                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4
                                    className={`font-medium ${item.completed ? "line-through text-muted-foreground" : ""}`}
                                  >
                                    {item.name}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {item.category} • {item.quantity} • {item.estimatedPrice}
                                  </p>
                                </div>

                                <Badge variant={getPriorityColor(item.priority)} className="text-xs">
                                  {item.priority}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
