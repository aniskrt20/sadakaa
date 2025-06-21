
import React, { useState } from "react";
import { useRadios } from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader, Radio, Play, Pause, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";

const RadiosList = () => {
  const { data: radios, isLoading } = useRadios();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPlayingId, setCurrentPlayingId] = useState<number | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const filteredRadios = radios?.filter(radio => 
    radio.name.includes(searchQuery) || 
    searchQuery === ""
  ) || [];

  const handlePlay = (radioId: number, url: string) => {
    if (audioElement) {
      audioElement.pause();
    }

    if (currentPlayingId === radioId) {
      setCurrentPlayingId(null);
    } else {
      const audio = new Audio(url);
      audio.play();
      setAudioElement(audio);
      setCurrentPlayingId(radioId);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4 text-right">الإذاعات القرآنية</h2>
      
      <div className="relative mb-4">
        <Input
          type="text"
          placeholder="البحث عن إذاعة..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10 text-right"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader className="animate-spin" />
          <span className="mr-2">جاري تحميل الإذاعات...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filteredRadios.length > 0 ? (
            filteredRadios.map((radio) => (
              <Card key={radio.id} className="hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button
                        variant={currentPlayingId === radio.id ? "default" : "outline"}
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handlePlay(radio.id, radio.url)}
                      >
                        {currentPlayingId === radio.id ? (
                          <>
                            <Pause size={14} />
                            <span>إيقاف</span>
                          </>
                        ) : (
                          <>
                            <Play size={14} />
                            <span>استماع</span>
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        asChild
                      >
                        <a href={radio.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={14} />
                          <span>رابط</span>
                        </a>
                      </Button>
                    </div>
                    <div className="flex items-center">
                      <Radio className="mr-2 text-islamic-primary" size={20} />
                      <span className="text-lg font-bold arabic-text">{radio.name}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-lg">لا توجد إذاعات مطابقة للبحث</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RadiosList;
