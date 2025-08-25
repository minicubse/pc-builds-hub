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

const Boitiers = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [formatFilter, setFormatFilter] = useState("all");
  const [sortBy, setSortBy] = useState("votes");

  // Filter boitiers from mock data
  const boitiers = mockPropositions.filter(p => p.category === "boitiers");

  // Sort boitiers based on selected criteria
  const sortedBoitiers = [...boitiers].sort((a, b) => {
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

  // Filter by search and format
  const filteredBoitiers = sortedBoitiers.filter(boitier => {
    const matchesSearch = boitier.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         boitier.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         boitier.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (!matchesSearch) return false;

    if (formatFilter === "all") return true;
    
    // Check format based on tags or title
    const content = (boitier.title + " " + boitier.tags.join(" ")).toLowerCase();
    if (formatFilter === "mini-itx" && content.includes("mini-itx")) return true;
    if (formatFilter === "micro-atx" && content.includes("micro-atx")) return true;
    if (formatFilter === "mid-tower" && (content.includes("mid-tower") || content.includes("mid tower"))) return true;
    if (formatFilter === "full-tower" && (content.includes("full-tower") || content.includes("full tower"))) return true;
    
    return formatFilter === "all";
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
            <h1 className="text-3xl font-bold mb-2">Boîtiers PC</h1>
            <p className="text-muted-foreground">
              Tests, reviews et comparatifs des meilleurs boîtiers PC du marché
            </p>
          </div>
          
          <Button className="bg-gradient-primary shadow-glow">
            <Plus className="h-4 w-4 mr-2" />
            Tester un boîtier
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher des boîtiers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={formatFilter} onValueChange={setFormatFilter}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous formats</SelectItem>
              <SelectItem value="mini-itx">Mini-ITX</SelectItem>
              <SelectItem value="micro-atx">Micro-ATX</SelectItem>
              <SelectItem value="mid-tower">Mid Tower</SelectItem>
              <SelectItem value="full-tower">Full Tower</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SortAsc className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="votes">Plus votés</SelectItem>
              <SelectItem value="recent">Plus récents</SelectItem>
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
              {filteredBoitiers.map((boitier) => (
                <PropositionCard
                  key={boitier.id}
                  {...boitier}
                  onClick={() => handlePropositionClick(boitier.id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="nouveaux" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBoitiers
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((boitier) => (
                  <PropositionCard
                    key={boitier.id}
                    {...boitier}
                    onClick={() => handlePropositionClick(boitier.id)}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* No results */}
        {filteredBoitiers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              Aucun boîtier trouvé avec ces critères
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery("");
              setFormatFilter("all");
            }}>
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Boitiers;