
import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLiveTV } from "@/services/api";
import { Loader, Tv, Volume2, VolumeX, Maximize, ExternalLink, RefreshCw } from "lucide-react";
import { LiveTV } from "@/services/api/types";
import { useToast } from "@/components/ui/use-toast";
import ReactPlayer from "react-player";

const VideosPage = () => {
  const { data: channels, isLoading } = useLiveTV();
  const [activeChannel, setActiveChannel] = useState<LiveTV | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playerError, setPlayerError] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);
  const { toast } = useToast();

  // Select the first channel automatically when channels are loaded
  useEffect(() => {
    if (channels && channels.length > 0 && !activeChannel) {
      setActiveChannel(channels[0]);
      setPlayerError(false);
    }
  }, [channels, activeChannel]);

  const handleChannelSelect = (channel: LiveTV) => {
    setActiveChannel(channel);
    setPlayerError(false);
    setIsPlaying(true);
    toast({
      title: "تم تغيير القناة",
      description: `تم اختيار ${channel.name}`,
      duration: 2000
    });
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    const playerElement = document.getElementById('player-wrapper');
    if (playerElement) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        playerElement.requestFullscreen();
      }
    }
  };

  const handleRetry = () => {
    if (activeChannel) {
      setPlayerError(false);
      setIsPlaying(false);
      setTimeout(() => {
        setIsPlaying(true);
      }, 500);
    }
  };

  const handlePlayerError = () => {
    console.error("Video playback error");
    setPlayerError(true);
    toast({
      title: "خطأ في تشغيل البث",
      description: "يرجى المحاولة مرة أخرى أو اختيار قناة أخرى",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen pb-16 bg-islamic-light dark:bg-islamic-dark">
      <Header title="قناة القرآن الكريم" />
      <div className="container mx-auto px-4 py-6">
        {/* Video Player Section */}
        <Card className="islamic-card mb-6 overflow-hidden border-islamic-secondary/20">
          <CardContent className="p-0">
            <div className="relative" id="player-wrapper">
              {activeChannel ? (
                <>
                  <div className="aspect-video bg-black">
                    <ReactPlayer
                      ref={playerRef}
                      url={activeChannel.url}
                      width="100%"
                      height="100%"
                      playing={isPlaying}
                      muted={isMuted}
                      controls={false}
                      onError={handlePlayerError}
                      config={{
                        file: {
                          forceHLS: true,
                          hlsOptions: {
                            autoStartLoad: true,
                            startPosition: -1,
                            debug: false,
                          }
                        }
                      }}
                      style={{ position: 'absolute', top: 0, left: 0 }}
                    />
                  </div>
                  {playerError && (
                    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10">
                      <p className="text-white mb-4 arabic-text text-lg">حدث خطأ أثناء تحميل البث</p>
                      <Button 
                        variant="outline" 
                        className="bg-islamic-secondary/20 text-white border-islamic-secondary"
                        onClick={handleRetry}
                      >
                        <RefreshCw className="mr-2" size={16} />
                        <span className="arabic-text">إعادة المحاولة</span>
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full aspect-video bg-black flex items-center justify-center flex-col text-white dome-pattern">
                  <Tv size={48} className="mb-3 text-islamic-secondary" />
                  <p className="arabic-text text-lg">اختر قناة للمشاهدة</p>
                </div>
              )}
              
              {activeChannel && !playerError && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-white hover:bg-black/30" 
                      onClick={toggleMute}
                    >
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-white hover:bg-black/30" 
                      onClick={toggleFullscreen}
                    >
                      <Maximize size={20} />
                    </Button>
                  </div>
                  <div className="text-white font-bold arabic-text bg-islamic-primary/80 px-3 py-1 rounded-md">
                    {activeChannel.name}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Channels List Section */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <div className="w-1/4 h-px bg-islamic-secondary/30"></div>
            <h2 className="text-xl font-bold text-islamic-accent dark:text-islamic-secondary px-2 arabic-text">قنوات البث المباشر</h2>
            <div className="w-1/4 h-px bg-islamic-secondary/30"></div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader className="animate-spin ml-2 text-islamic-primary" />
            <span className="arabic-text">جاري تحميل القنوات...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {channels?.map((channel) => (
              <Card 
                key={channel.id} 
                className={`islamic-card hover:shadow-md transition-all cursor-pointer ${
                  activeChannel?.id === channel.id 
                    ? 'bg-islamic-light dark:bg-islamic-dark/50 border-islamic-primary' 
                    : ''
                }`}
                onClick={() => handleChannelSelect(channel)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 border-islamic-secondary/40 hover:border-islamic-secondary"
                        asChild
                      >
                        <a href={channel.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={14} />
                          <span>فتح</span>
                        </a>
                      </Button>
                      {activeChannel?.id === channel.id && (
                        <div className="bg-islamic-primary text-white text-xs px-2 py-1 rounded-md arabic-text">
                          قيد التشغيل
                        </div>
                      )}
                    </div>
                    <div className="flex items-center">
                      <Tv className="mr-2 text-islamic-primary" size={20} />
                      <span className="text-lg font-bold arabic-text">{channel.name}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <BottomNavigation />
    </div>
  );
};

export default VideosPage;
