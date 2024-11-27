import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Loader2, Mail, User, Lock, Pencil } from "lucide-react";
// import { useToast } from "@/components/ui/use-toast";

// Mock user data - replace with actual data fetching logic
const userData = {
  name: "John Doe",
  username: "johndoe",
  email: "john@example.com",
  bio: "Passionate about technology and communication. Always learning, always growing. Let's connect and create something amazing together!",
  avatar: "/placeholder.svg?height=128&width=128",
};

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(userData);
  // const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsEditing(false);
    // toast({
    //   title: "Profile Updated",
    //   description: "Your profile has been successfully updated.",
    // });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          avatar: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
      // toast({
      //   title: "Avatar Updated",
      //   description: "Your avatar has been successfully changed.",
      // });
    }
  };

  return (
    <div className="container max-w-4xl mx-auto p-4">
      <Card className="w-full overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary to-primary-foreground"></div>
        <CardHeader className="relative">
          <div className="absolute -top-16 left-4 border-4 border-background rounded-full">
            <Avatar className="w-32 h-32">
              <AvatarImage src={formData.avatar} alt={formData.name} />
              <AvatarFallback>{formData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button
              variant="secondary"
              size="icon"
              className="absolute bottom-0 right-0 rounded-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="h-4 w-4" />
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              className="hidden"
              accept="image/*"
            />
          </div>
          <div className="ml-36">
            <CardTitle className="text-2xl">{formData.name}</CardTitle>
            <CardDescription>@{formData.username}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>
            <div className="min-h-[300px]">
              {" "}
              {/* Add a minimum height to prevent layout shift */}
              <TabsContent value="profile" className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-lg font-semibold">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={4}
                    className="resize-none w-full"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-lg font-semibold">
                      Name
                    </Label>
                    <div className="flex items-center space-x-2 border rounded-md p-2">
                      <User className="text-muted-foreground flex-shrink-0" />
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="border-0 focus-visible:ring-0"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-lg font-semibold">
                      Username
                    </Label>
                    <div className="flex items-center space-x-2 border rounded-md p-2">
                      <User className="text-muted-foreground flex-shrink-0" />
                      <Input
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="border-0 focus-visible:ring-0"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="account" className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-lg font-semibold">
                    Email
                  </Label>
                  <div className="flex items-center space-x-2 border rounded-md p-2">
                    <Mail className="text-muted-foreground flex-shrink-0" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="border-0 focus-visible:ring-0"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-lg font-semibold">
                    Password
                  </Label>
                  <div className="flex items-center space-x-2 border rounded-md p-2">
                    <Lock className="text-muted-foreground flex-shrink-0" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      disabled={!isEditing}
                      className="border-0 focus-visible:ring-0"
                    />
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
