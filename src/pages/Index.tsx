import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import PropositionCard from "@/components/PropositionCard";
import { mockPropositions } from "@/data/mockData";
import { Link, useNavigate } from "react-router-dom";
import { 
  Monitor, 
  HardDrive, 
  ShoppingCart, 
  TrendingUp, 
  Users,
  MessageCircle,
  ArrowRight,
  Star
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const featuredPropositions = mockPropositions.slice(0, 3);
  const stats = {
    totalPropositions: 1247,
    totalUsers: 3891,
    totalComments: 12834
  };

  const categories = [
    {
      id: "configurations",
      title: "Configurations PC",
      description: "Builds complets et optimisés pour tous budgets",
      icon: Monitor,
      count: 523,
      gradient: "bg-gradient-primary"
    },
    {
      id: "boitiers", 
      title: "Boîtiers",
      description: "Tests et reviews de boîtiers PC",
      icon: HardDrive,
      count: 298,
      gradient: "bg-gradient-to-br from-secondary to-secondary/80"
    },
    {
      id: "offres",
      title: "Offres du moment", 
      description: "Les meilleures promos hardware",
      icon: ShoppingCart,
      count: 426,
      gradient: "bg-gradient-accent"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              PC Community
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            La communauté française dédiée aux configurations PC, boîtiers et bons plans hardware.
            Partagez, votez et découvrez les meilleures propositions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-primary shadow-glow" onClick={() => navigate('/configurations')}>
              Découvrir les configs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/configurations')}>
              Rejoindre la communauté
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 border-y border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{stats.totalPropositions}</div>
              <div className="text-muted-foreground">Propositions partagées</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{stats.totalUsers}</div>
              <div className="text-muted-foreground">Membres actifs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{stats.totalComments}</div>
              <div className="text-muted-foreground">Commentaires</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Explorez nos catégories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link key={category.id} to={`/${category.id}`}>
                <Card className="glass hover:shadow-glow transition-smooth group h-full">
                  <CardHeader>
                    <div className={`${category.gradient} p-4 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform`}>
                      <category.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-smooth">
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    <Badge variant="outline" className="mb-4">
                      {category.count} propositions
                    </Badge>
                    <div className="flex items-center text-sm text-primary font-medium">
                      Voir la catégorie
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Propositions */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Propositions populaires</h2>
            <Button variant="outline" asChild>
              <Link to="/configurations">
                Voir tout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPropositions.map((proposition) => (
              <PropositionCard
                key={proposition.id}
                {...proposition}
                onClick={() => navigate(`/proposition/${proposition.id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à rejoindre la communauté ?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Partagez vos configurations, découvrez de nouvelles idées et aidez d'autres passionnés 
            dans leurs choix hardware.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-primary shadow-glow" onClick={() => navigate('/configurations')}>
              Créer un compte
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/configurations')}>
              Proposer une config
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
