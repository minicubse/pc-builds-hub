import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import PropositionCard from "@/components/PropositionCard";
import { mockPropositions } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Filter, SortAsc, Clock } from "lucide-react";

const Offres = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  // Filter offres from mock data
  const offres = mockPropositions.filter(p => p.category === "offres");

  // Sort offres based on selected criteria
  const sortedOffres = [...offres].sort((a, b) => {
    switch (sortBy) {
      case "votes":
        return b.votes - a.votes;
      case "recent":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "price-low":
        return (a.price || 0) - (b.price || 0);
      case "price-high":
        return (b.price || 0) - (a.price || 0);
      case "discount":
        return b.votes - a.votes; // Placeholder for discount sorting
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  // Filter by search and category
  const filteredOffres = sortedOffres.filter(offre => {
    const matchesSearch = offre.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         offre.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         offre.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (!matchesSearch) return false;

    if (categoryFilter === "all") return true;
    
    // Check category based on tags or title
    const content = (offre.title + " " + offre.tags.join(" ")).toLowerCase();
    if (categoryFilter === "gpu" && (content.includes("rtx") || content.includes("gpu") || content.includes("graphique"))) return true;
    if (categoryFilter === "cpu" && (content.includes("cpu") || content.includes("processeur") || content.includes("ryzen") || content.includes("intel"))) return true;
    if (categoryFilter === "ram" && content.includes("ram")) return true;
    if (categoryFilter === "storage" && (content.includes("ssd") || content.includes("hdd") || content.includes("stockage"))) return true;
    
    return categoryFilter === "all";
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
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Clock className="h-8 w-8 text-accent" />
              Offres du moment
            </h1>
            <p className="text-muted-foreground">
              Les meilleures promotions et bons plans hardware dénichés par la communauté
            </p>
          </div>
          
          <Button className="bg-gradient-accent shadow-glow">
            <Plus className="h-4 w-4 mr-2" />
            Partager une offre
          </Button>
        </div>

        {/* Alert banner */}
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-8">
          <div className="flex items-center gap-2 text-accent font-medium">
            <Clock className="h-4 w-4" />
            Les offres sont mises à jour en temps réel par la communauté
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Vérifiez toujours la disponibilité et les conditions chez le revendeur
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher des offres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes catégories</SelectItem>
              <SelectItem value="gpu">Cartes graphiques</SelectItem>
              <SelectItem value="cpu">Processeurs</SelectItem>
              <SelectItem value="ram">Mémoire RAM</SelectItem>
              <SelectItem value="storage">Stockage</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SortAsc className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Plus récentes</SelectItem>
              <SelectItem value="votes">Plus votées</SelectItem>
              <SelectItem value="price-low">Prix croissant</SelectItem>
              <SelectItem value="price-high">Prix décroissant</SelectItem>
              <SelectItem value="discount">Meilleure réduction</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="nouveaux" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="nouveaux">Nouveaux</TabsTrigger>
            <TabsTrigger value="best">Best</TabsTrigger>
          </TabsList>

          <TabsContent value="nouveaux" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOffres
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((offre) => (
                  <PropositionCard
                    key={offre.id}
                    {...offre}
                    onClick={() => handlePropositionClick(offre.id)}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="best" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOffres.map((offre) => (
                <PropositionCard
                  key={offre.id}
                  {...offre}
                  onClick={() => handlePropositionClick(offre.id)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* No results */}
        {filteredOffres.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              Aucune offre trouvée avec ces critères
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery("");
              setCategoryFilter("all");
            }}>
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Offres;