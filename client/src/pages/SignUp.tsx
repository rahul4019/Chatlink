import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Zap, Shield, Smartphone } from "lucide-react";
import Layout from "@/components/Layout";

export default function SignupPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-6xl w-full bg-gray-800 bg-opacity-50 rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left side content */}
            <div className="flex-1 p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-6">
                Welcome to ChatLink
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Experience seamless communication with our lightning-fast,
                secure, and feature-rich chat application.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Zap className="h-6 w-6 text-blue-400" />
                  <span>Lightning-fast messaging</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-blue-400" />
                  <span>Stay connected with confidence</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-6 w-6 text-blue-400" />
                  <span>Access ChatLink anytime, anywhere</span>
                </div>
              </div>
            </div>

            {/* Right side form */}
            <div className="flex-1 bg-gray-900 p-8 md:p-12">
              <Card className="w-full max-w-md mx-auto bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-400">
                    Sign Up
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Create your account to get started
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-gray-200">
                        Username
                      </Label>
                      <Input
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        required
                        className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-200">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-gray-200">
                        Password
                      </Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="confirmPassword"
                        className="text-gray-200"
                      >
                        Confirm Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        required
                        className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Sign Up
                    </Button>
                  </form>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-center text-gray-400 w-full">
                    Already have an account?{" "}
                    <Link
                      to="/signin"
                      className="font-medium text-blue-400 hover:underline"
                    >
                      Sign in{" "}
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
