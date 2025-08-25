import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Navigation from "@/components/Navigation";
import { mockPropositions, mockComments } from "@/data/mockData";
import { 
  ChevronUp, 
  ChevronDown, 
  MessageCircle, 
  Eye,
  Share2,
  Flag,
  Edit,
  ArrowLeft,
  Calendar,
  User,
  Euro,
  ZoomIn
} from "lucide-react";
import { cn } from "@/lib/utils";

const PropositionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Find the proposition
  const proposition = mockPropositions.find(p => p.id === id);
  const comments = mockComments.filter(c => c.propositionId === id);

  if (!proposition) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Proposition non trouvée</h1>
          <Button onClick={() => navigate(-1)}>Retour</Button>
        </div>
      </div>
    );
  }

  const [currentVote, setCurrentVote] = useState<"up" | "down" | null>(proposition.userVote || null);
  const [currentVotes, setCurrentVotes] = useState(proposition.votes);

  const handleVote = (type: "up" | "down") => {
    if (currentVote === type) {
      setCurrentVote(null);
      setCurrentVotes(proposition.votes);
    } else {
      const voteChange = currentVote === null ? (type === "up" ? 1 : -1) : (type === "up" ? 2 : -2);
      setCurrentVote(type);
      setCurrentVotes(proposition.votes + voteChange);
    }
  };

  const categoryColors = {
    configurations: "bg-primary text-primary-foreground",
    boitiers: "bg-secondary text-secondary-foreground", 
    offres: "bg-accent text-accent-foreground"
  };

  const categoryLabels = {
    configurations: "Configuration",
    boitiers: "Boîtier",
    offres: "Offre"
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card className="glass">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={categoryColors[proposition.category]}>
                        {categoryLabels[proposition.category]}
                      </Badge>
                      {proposition.price && (
                        <Badge variant="outline" className="text-accent">
                          <Euro className="h-3 w-3 mr-1" />
                          {proposition.price}€
                        </Badge>
                      )}
                    </div>
                    
                    <h1 className="text-2xl md:text-3xl font-bold mb-3">
                      {proposition.title}
                    </h1>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {proposition.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(proposition.createdAt).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {proposition.views} vues
                      </div>
                    </div>

                    <p className="text-muted-foreground">
                      {proposition.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Flag className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Images Gallery */}
            {proposition.images.length > 0 && (
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Images</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Main image */}
                  <div className="relative mb-4">
                    <img 
                      src={proposition.images[selectedImage]} 
                      alt={proposition.title}
                      className="w-full h-64 md:h-96 object-cover rounded-lg cursor-pointer"
                      onClick={() => setIsImageModalOpen(true)}
                    />
                    <Button 
                      variant="outline"
                      size="icon"
                      className="absolute top-2 right-2 bg-background/80"
                      onClick={() => setIsImageModalOpen(true)}
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Thumbnails */}
                  {proposition.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto">
                      {proposition.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${proposition.title} ${index + 1}`}
                          className={cn(
                            "w-16 h-16 object-cover rounded cursor-pointer transition-all",
                            selectedImage === index 
                              ? "ring-2 ring-primary" 
                              : "opacity-70 hover:opacity-100"
                          )}
                          onClick={() => setSelectedImage(index)}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Full Description */}
            <Card className="glass">
              <CardHeader>
                <CardTitle>Description complète</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {proposition.fullDescription || proposition.description}
                </p>
              </CardContent>
            </Card>

            {/* Specifications */}
            {proposition.specs && (
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Spécifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(proposition.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-border/50">
                        <span className="font-medium">{key}</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Comments Section */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Commentaires ({comments.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add comment form */}
                <div className="space-y-3">
                  <Textarea
                    placeholder="Partagez votre avis ou posez une question..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-20"
                  />
                  <Button className="bg-gradient-primary">
                    Publier le commentaire
                  </Button>
                </div>

                {/* Comments list */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="border-b border-border/50 pb-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{comment.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(comment.createdAt).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{comment.content}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <ChevronUp className="h-4 w-4" />
                          </Button>
                          <span className="text-xs">{comment.votes}</span>
                          <Button variant="ghost" size="sm">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Voting Panel */}
            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-3">
                  <Button
                    variant="vote"
                    size="lg"
                    onClick={() => handleVote("up")}
                    className={cn(
                      "w-12 h-12",
                      currentVote === "up" && "bg-success text-success-foreground"
                    )}
                  >
                    <ChevronUp className="h-6 w-6" />
                  </Button>
                  
                  <span className={cn(
                    "text-xl font-bold px-3 py-2 rounded",
                    currentVotes > 0 ? "text-success" : 
                    currentVotes < 0 ? "text-destructive" : "text-muted-foreground"
                  )}>
                    {currentVotes}
                  </span>
                  
                  <Button
                    variant="vote"
                    size="lg"
                    onClick={() => handleVote("down")}
                    className={cn(
                      "w-12 h-12",
                      currentVote === "down" && "bg-destructive text-destructive-foreground"
                    )}
                  >
                    <ChevronDown className="h-6 w-6" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-lg">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {proposition.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-lg">Statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Vues</span>
                  <span className="font-medium">{proposition.views}</span>
                </div>
                <div className="flex justify-between">
                  <span>Commentaires</span>
                  <span className="font-medium">{proposition.comments}</span>
                </div>
                <div className="flex justify-between">
                  <span>Score</span>
                  <span className="font-medium">{currentVotes}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div className="max-w-4xl max-h-full">
            <img 
              src={proposition.images[selectedImage]} 
              alt={proposition.title}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PropositionDetail;