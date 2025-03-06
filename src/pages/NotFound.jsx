
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-8xl font-bold text-brand-blue mb-6">404</h1>
        <p className="text-2xl text-gray-700 mb-8">
          The page you're looking for doesn't exist
        </p>
        <p className="text-gray-500 mb-8">
          You might have mistyped the address or the page may have moved to a new location.
        </p>
        <Link to="/">
          <Button className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-lightBlue">
            <ArrowLeft size={18} />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
