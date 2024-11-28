import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, User, ArrowLeft, CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAppSelector } from "@/app/hooks";
import { UpdatePasswordForm } from "@/components/UserProfile/UpdatePasswordForm";
import { UpdateUserDetailsForm } from "@/components/UserProfile/UpdateUserDetailsForm";

export default function UserProfile() {
  // const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAppSelector((state) => state.auth);

  // const handleInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      // reader.onload = (e) => {
      //   setFormData((prev: any) => ({
      //     ...prev,
      //     avatar: e.target?.result as string,
      //   }));
      // };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Layout>
      <div className="container max-w-2xl mx-auto p-4">
        <Card className="w-full overflow-hidden bg-background">
          <div className="h-32 bg-gradient-to-r from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10"></div>
          <CardHeader className="relative pb-0">
            <div className="absolute -top-16 left-4 border-4 border-background dark:border-background rounded-full">
              <Avatar className="w-32 h-32">
                <AvatarImage src={user?.profile_picture} alt="avatar" />
                <AvatarFallback>
                  <CircleUserRound size={35} className="text-accent" />
                </AvatarFallback>
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
            <div className="ml-36 pt-4">
              <CardTitle className="text-2xl">{user?.username}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="mt-4">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
              </TabsList>
              <div className="space-y-6">
                <TabsContent value="profile" className="space-y-6">
                  <UpdateUserDetailsForm />
                </TabsContent>
                <TabsContent value="account" className="space-y-6">
                  <UpdatePasswordForm />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>

          {/* back button */}
          <div className="px-6 py-4 bg-muted/10 flex justify-between items-center">
            <Link to="/chat">
              <Button className="group border-2 border-primary" variant="ghost">
                <ArrowLeft
                  className="-ms-1 me-2 opacity-60 transition-transform group-hover:-translate-x-0.5 "
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                Back to chat
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
