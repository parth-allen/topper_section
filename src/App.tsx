import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TopGallary from "././pages/TopGallary"
// import Index from "./pages/TopGallary.js";
import NotFound from "./pages/NotFound";
import Phy from "./pages/Phy.tsx";
import Chem from "./pages/Chem.tsx";
import Overall from "./pages/Overall.tsx"
import Maths from "./pages/Maths.tsx"
import TESTVEN from "./pages/TESTVEN";
import NotificationComponent from "./components/NotificationComponent.tsx";
const queryClient = new QueryClient();
import { studentData } from "./data/studentData.tsx";
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <NotificationComponent student={studentData} />
      <BrowserRouter>
        <Routes>
        <Route path="/overall" element={<Overall />} />
          <Route path="/phy" element={<Phy />} />
          <Route path="/chem" element={<Chem />} />
          <Route path="/maths" element={<Maths />} />
          <Route path="/topgallary" element={<TopGallary />} />
          <Route path="/" element={<Index />} />
          <Route path="/doubts" element={<Index />} />
          <Route path="/testven" element={<TESTVEN />} />
          <Route path="/practice" element={<Index />} />
          <Route path="/tests" element={<Index />} />
          <Route path="/improvement-book" element={<Index />} />
          <Route path="/change-course" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
