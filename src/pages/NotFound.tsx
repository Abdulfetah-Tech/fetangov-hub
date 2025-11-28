import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout hideFooter>
      <div className="flex min-h-[70vh] items-center justify-center bg-background">
        <div className="text-center px-4">
          <div className="mb-6">
            <span className="text-8xl font-bold text-primary">404</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Page Not Found</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => navigate(-1)} variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
            <Button onClick={() => navigate("/")} className="gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
            <Button onClick={() => navigate("/services")} variant="secondary" className="gap-2">
              <Search className="h-4 w-4" />
              Browse Services
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
