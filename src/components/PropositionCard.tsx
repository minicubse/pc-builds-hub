import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronUp, 
  ChevronDown, 
  MessageCircle, 
  Eye,
  Calendar,
  User,
  Euro
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PropositionCardProps {
  id: string;
  title: string;
  description: string;
  author: string;
  category: "configurations" | "boitiers" | "offres";
  votes: number;
  comments: number;
  views: number;
  price?: number;
  images: string[];
  createdAt: string;
  tags: string[];
  userVote?: "up" | "down" | null;
  onClick?: () => void;
}

const PropositionCard = ({ 
  title, 
  description, 
  author, 
  category,
  votes, 
  comments, 
  views,
  price,
  images,
  createdAt,
  tags,
  userVote,
  onClick 
}: PropositionCardProps) => {
  const [currentVote, setCurrentVote] = useState<"up" | "down" | null>(userVote || null);
  const [currentVotes, setCurrentVotes] = useState(votes);

  const handleVote = (type: "up" | "down") => {
    if (currentVote === type) {
      // Remove vote
      setCurrentVote(null);
      setCurrentVotes(votes);
    } else {
      // Add or change vote
      const voteChange = currentVote === null ? (type === "up" ? 1 : -1) : (type === "up" ? 2 : -2);
      setCurrentVote(type);
      setCurrentVotes(votes + voteChange);
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
    <Card className="glass hover:shadow-glow transition-smooth cursor-pointer group" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={categoryColors[category]}>
                {categoryLabels[category]}
              </Badge>
              {price && (
                <Badge variant="outline" className="text-accent">
                  <Euro className="h-3 w-3 mr-1" />
                  {price}€
                </Badge>
              )}
            </div>
            
            <h3 className="text-lg font-semibold group-hover:text-primary transition-smooth line-clamp-2">
              {title}
            </h3>
            
            <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
              {description}
            </p>

            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {author}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(createdAt).toLocaleDateString('fr-FR')}
              </div>
            </div>
          </div>

          {/* Voting Panel */}
          <div className="flex flex-col items-center gap-1 ml-4">
            <Button
              variant="vote"
              size="vote"
              onClick={(e) => {
                e.stopPropagation();
                handleVote("up");
              }}
              className={cn(
                currentVote === "up" && "bg-success text-success-foreground"
              )}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            
            <span className={cn(
              "text-sm font-medium px-2 py-1 rounded",
              currentVotes > 0 ? "text-success" : 
              currentVotes < 0 ? "text-destructive" : "text-muted-foreground"
            )}>
              {currentVotes}
            </span>
            
            <Button
              variant="vote"
              size="vote"
              onClick={(e) => {
                e.stopPropagation();
                handleVote("down");
              }}
              className={cn(
                currentVote === "down" && "bg-destructive text-destructive-foreground"
              )}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Image Preview */}
        {images.length > 0 && (
          <div className="relative h-32 bg-muted rounded-lg mb-3 overflow-hidden">
            <img 
              src={images[0]} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {images.length > 1 && (
              <div className="absolute top-2 right-2 bg-background/80 px-2 py-1 rounded text-xs">
                +{images.length - 1}
              </div>
            )}
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              {comments}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {views}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropositionCard;