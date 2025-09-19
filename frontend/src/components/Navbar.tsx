import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // ✅ check login

  return (
    <nav className="w-full fixed top-2 rounded-md right-2 left-2 mr-2 bg-transparent backdrop-blur-md shadow-sm z-50">
      <div className="container px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-blue-950">NeuroVia</h1>

        {/* Nav Buttons */}
        <div className="flex items-center space-x-4">
          {token ? (
            <>
              <Button
                onClick={() => navigate("/dashboard")}
                variant="ghost"
                className="text-blue-950 text-xl font-medium hover:text-primary hover:text-white  transition-colors"
              >
                Dashboard
              </Button>
              <Button
                onClick={() => navigate("/profile")}
                variant="ghost"
                className="text-blue-950 text-xl font-medium hover:text-primary hover:text-white transition-colors"
              >
                Profile
              </Button>
            </>
          ) : (
            <Button
              onClick={() => navigate("/auth")}
              className="px-6 py-2 rounded-xl text-blue-950 font-semibold"
            >
              Get Started
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
