import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import PropositionCard from "@/components/PropositionCard";
import { mockPropositions } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Filter, SortAsc } from "lucide-react";

const Configurations = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("votes");

  // Filter configurations from mock data
  const configurations = mockPropositions.filter(p => p.category === "configurations");

  // Sort configurations based on selected criteria
  const sortedConfigurations = [...configurations].sort((a, b) => {
    switch (sortBy) {
      case "votes":
        return b.votes - a.votes;
      case "recent":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "price-low":
        return (a.price || 0) - (b.price || 0);
      case "price-high":
        return (b.price || 0) - (a.price || 0);
      default:
        return b.votes - a.votes;
    }
  });

  // Filter by search and price
  const filteredConfigurations = sortedConfigurations.filter(config => {
    const matchesSearch = config.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         config.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         config.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (!matchesSearch) return false;

    if (priceFilter === "all") return true;
    if (priceFilter === "budget" && config.price && config.price < 1000) return true;
    if (priceFilter === "mid" && config.price && config.price >= 1000 && config.price < 2000) return true;
    if (priceFilter === "high" && config.price && config.price >= 2000) return true;
    
    return false;
  });

  const handlePropositionClick = (id: string) => {
    navigate(`/proposition/${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Configurations PC</h1>
            <p className="text-muted-foreground">
              Découvrez et partagez des configurations PC optimisées pour tous les budgets
            </p>
          </div>
          
          <Button className="bg-gradient-primary shadow-glow">
            <Plus className="h-4 w-4 mr-2" />
            Proposer une config
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher des configurations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={priceFilter} onValueChange={setPriceFilter}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous budgets</SelectItem>
              <SelectItem value="budget">&lt; 1000€</SelectItem>
              <SelectItem value="mid">1000€ - 2000€</SelectItem>
              <SelectItem value="high">&gt; 2000€</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SortAsc className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="votes">Plus votées</SelectItem>
              <SelectItem value="recent">Plus récentes</SelectItem>
              <SelectItem value="price-low">Prix croissant</SelectItem>
              <SelectItem value="price-high">Prix décroissant</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="best" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="best">Best</TabsTrigger>
            <TabsTrigger value="nouveaux">Nouveaux</TabsTrigger>
          </TabsList>

          <TabsContent value="best" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConfigurations.map((config) => (
                <PropositionCard
                  key={config.id}
                  {...config}
                  onClick={() => handlePropositionClick(config.id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="nouveaux" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConfigurations
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((config) => (
                  <PropositionCard
                    key={config.id}
                    {...config}
                    onClick={() => handlePropositionClick(config.id)}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* No results */}
        {filteredConfigurations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              Aucune configuration trouvée avec ces critères
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery("");
              setPriceFilter("all");
            }}>
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Configurations;