import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CompareBar from "./components/CompareBar";
import Index from "./pages/Index";
import PhoneList from "./pages/PhoneList";
import PhoneDetail from "./pages/PhoneDetail";
import Compare from "./pages/Compare";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/phones" element={<PhoneList />} />
              <Route path="/phones/:id" element={<PhoneDetail />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <CompareBar />
        </div>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
