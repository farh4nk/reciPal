"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "../components/Navbar"
import { User, Settings, Heart, BookOpen, Package, Bell, Shield, Camera } from "lucide-react"

const mockUserData = {
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  bio: "Passionate home cook who loves experimenting with international cuisines. Always looking for new recipes to try!",
  location: "San Francisco, CA",
  joinDate: "January 2024",
  avatar: "/user-avatar.jpg",
  stats: {
    recipesShared: 23,
    recipesLiked: 156,
    followers: 89,
    following: 134,
  },
}

const mockUserRecipes = [
  {
    id: 1,
    title: "Spicy Thai Basil Chicken",
    likes: 45,
    views: 234,
    date: "2024-12-15",
  },
  {
    id: 2,
    title: "Homemade Sourdough Bread",
    likes: 78,
    views: 456,
    date: "2024-12-10",
  },
  {
    id: 3,
    title: "Mediterranean Quinoa Bowl",
    likes: 32,
    views: 189,
    date: "2024-12-05",
  },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState(mockUserData)
  const [notifications, setNotifications] = useState({
    recipeComments: true,
    newFollowers: true,
    weeklyDigest: false,
    pantryAlerts: true,
  })

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Save profile logic here
    console.log("Profile saved:", profileData)
  }

  const handleNotificationChange = (key, value) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden">
                    <img
                      src={profileData.avatar || "/placeholder.svg"}
                      alt={profileData.name}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 rounded-full p-2 bg-transparent"
                  >
                    <Camera className="h-3 w-3" />
                  </Button>
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h1 className="text-2xl font-bold">{profileData.name}</h1>
                      <p className="text-muted-foreground">{profileData.email}</p>
                      <p className="text-sm text-muted-foreground mt-1">Member since {profileData.joinDate}</p>
                    </div>

                    <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "default" : "outline"}>
                      {isEditing ? "Save Changes" : "Edit Profile"}
                    </Button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{mockUserData.stats.recipesShared}</div>
                      <div className="text-xs text-muted-foreground">Recipes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{mockUserData.stats.recipesLiked}</div>
                      <div className="text-xs text-muted-foreground">Likes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{mockUserData.stats.followers}</div>
                      <div className="text-xs text-muted-foreground">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{mockUserData.stats.following}</div>
                      <div className="text-xs text-muted-foreground">Following</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Tabs */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="recipes" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              My Recipes
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information and bio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, location: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>

                {isEditing && (
                  <div className="flex gap-2">
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Recipes Tab */}
          <TabsContent value="recipes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Recipes</CardTitle>
                <CardDescription>Recipes you've shared with the community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUserRecipes.map((recipe) => (
                    <div key={recipe.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{recipe.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Published on {new Date(recipe.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {recipe.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="h-4 w-4" />
                          {recipe.views}
                        </div>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Favorite Recipes</CardTitle>
                <CardDescription>Recipes you've liked and saved</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No favorite recipes yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Start exploring recipes and save your favorites here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
                <CardDescription>Manage your notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Recipe Comments</Label>
                    <p className="text-sm text-muted-foreground">Get notified when someone comments on your recipes</p>
                  </div>
                  <Switch
                    checked={notifications.recipeComments}
                    onCheckedChange={(value) => handleNotificationChange("recipeComments", value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>New Followers</Label>
                    <p className="text-sm text-muted-foreground">Get notified when someone follows you</p>
                  </div>
                  <Switch
                    checked={notifications.newFollowers}
                    onCheckedChange={(value) => handleNotificationChange("newFollowers", value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Weekly Digest</Label>
                    <p className="text-sm text-muted-foreground">Receive a weekly summary of activity</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyDigest}
                    onCheckedChange={(value) => handleNotificationChange("weeklyDigest", value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Pantry Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified about expiring ingredients</p>
                  </div>
                  <Switch
                    checked={notifications.pantryAlerts}
                    onCheckedChange={(value) => handleNotificationChange("pantryAlerts", value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>Manage your account security and privacy settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Download My Data
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive bg-transparent">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
