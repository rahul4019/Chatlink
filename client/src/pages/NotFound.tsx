import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold mb-4 animate-bounce text-red-500 ">
            404
          </h1>
          <h2 className="text-5xl font-semibold mb-4 text-primary">
            Page Not Found
          </h2>
          <p className="text-lg mb-8 text-popover-foreground">
            Oops! The page you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
}
