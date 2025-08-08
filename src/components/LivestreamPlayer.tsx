import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Play, Volume2 } from "lucide-react";

export const LivestreamPlayer = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Video Stream */}
      <Card className="p-6 shadow-mosque">
        <div className="flex items-center gap-3 mb-4">
          <Play className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold">Live Video Stream</h3>
        </div>
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
          <div className="text-center">
            <Play className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
            <p className="text-muted-foreground">Video stream will appear here</p>
            <p className="text-sm text-muted-foreground mt-1">Click button below to open external stream</p>
          </div>
        </div>
        <Button 
          variant="default" 
          className="w-full bg-gradient-primary"
          onClick={() => window.open('https://streamlabs.com/madinahmasjid/v2', '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Open Live Video Stream
        </Button>
      </Card>

      {/* Audio Stream */}
      <Card className="p-6 shadow-mosque">
        <div className="flex items-center gap-3 mb-4">
          <Volume2 className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold">Live Audio Stream</h3>
        </div>
        <div className="bg-muted rounded-lg p-8 flex items-center justify-center mb-4">
          <div className="text-center">
            <Volume2 className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
            <p className="text-muted-foreground">Audio stream player</p>
            <p className="text-sm text-muted-foreground mt-1">Listen to live prayers and lectures</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => window.open('https://madinahmasjid.mixlr.com/', '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Open Live Audio Stream
        </Button>
      </Card>

      {/* Information */}
      <Card className="p-6 bg-gradient-mosque">
        <h4 className="font-semibold mb-2">About Live Streams</h4>
        <p className="text-sm text-muted-foreground">
          Join us for live prayers, Friday sermons, and special Islamic lectures. 
          Streams are available in both video and audio formats for your convenience.
        </p>
      </Card>
    </div>
  );
};