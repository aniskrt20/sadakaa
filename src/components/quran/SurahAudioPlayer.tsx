
import React, { useState, useRef } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SurahAudioPlayerProps {
  surahNumber: number;
  surahName: string;
}

const SurahAudioPlayer = ({ surahNumber, surahName }: SurahAudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlaySurah = async () => {
    try {
      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
        return;
      }

      setIsLoading(true);
      
      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      // Using api.alquran.cloud for full surah audio
      const audioUrl = `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${surahNumber}.mp3`;
      
      console.log(`Playing full surah audio: ${audioUrl}`);
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.addEventListener('loadstart', () => {
        setIsLoading(true);
      });
      
      audio.addEventListener('canplay', () => {
        setIsLoading(false);
        setIsPlaying(true);
      });
      
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        setIsLoading(false);
      });
      
      audio.addEventListener('error', (e) => {
        console.error('Surah audio playback error:', e);
        setIsPlaying(false);
        setIsLoading(false);
        
        // Try alternative source
        const alternativeUrl = `https://server8.mp3quran.net/afs/${surahNumber.toString().padStart(3, '0')}.mp3`;
        console.log(`Trying alternative surah audio source: ${alternativeUrl}`);
        
        const alternativeAudio = new Audio(alternativeUrl);
        audioRef.current = alternativeAudio;
        
        alternativeAudio.addEventListener('canplay', () => {
          setIsLoading(false);
          setIsPlaying(true);
        });
        
        alternativeAudio.addEventListener('ended', () => {
          setIsPlaying(false);
          setIsLoading(false);
        });
        
        alternativeAudio.addEventListener('error', () => {
          console.error('Alternative surah audio source also failed');
          setIsPlaying(false);
          setIsLoading(false);
        });
        
        alternativeAudio.play().catch(err => {
          console.error('Failed to play alternative surah audio:', err);
          setIsPlaying(false);
          setIsLoading(false);
        });
      });
      
      await audio.play();
      
    } catch (error) {
      console.error('Error playing surah audio:', error);
      setIsPlaying(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3 mb-6">
      <Button
        variant="ghost"
        size="lg"
        className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300"
        onClick={handlePlaySurah}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : isPlaying ? (
          <Pause className="text-white" size={20} />
        ) : (
          <Play className="text-white" size={20} />
        )}
      </Button>
      <div className="text-white">
        <p className="font-medium">تشغيل السورة كاملة</p>
        <p className="text-sm text-white/80">{surahName}</p>
      </div>
    </div>
  );
};

export default SurahAudioPlayer;
