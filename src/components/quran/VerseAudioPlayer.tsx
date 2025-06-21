
import React, { useState, useRef } from "react";
import { Volume2, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VerseAudioPlayerProps {
  surahNumber: number;
  verseNumber: number;
  size?: "sm" | "md";
}

const VerseAudioPlayer = ({ surahNumber, verseNumber, size = "sm" }: VerseAudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayVerse = async () => {
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

      // Format the URL for individual verse audio using everyayah.com
      const surahPadded = surahNumber.toString().padStart(3, '0');
      const versePadded = verseNumber.toString().padStart(3, '0');
      
      // Using everyayah.com for individual verse audio
      const audioUrl = `https://everyayah.com/data/Abdul_Basit_Murattal_64kbps/${surahPadded}${versePadded}.mp3`;
      
      console.log(`Playing individual verse audio: ${audioUrl}`);
      
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
        console.error('Verse audio playback error:', e);
        setIsPlaying(false);
        setIsLoading(false);
        
        // Try alternative source for individual verse
        const alternativeUrl = `https://cdn.islamic.network/quran/audio/64/ar.abdulbasitmurattal/${surahNumber}/${verseNumber}.mp3`;
        console.log(`Trying alternative verse audio source: ${alternativeUrl}`);
        
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
          console.error('Alternative verse audio source also failed');
          setIsPlaying(false);
          setIsLoading(false);
        });
        
        alternativeAudio.play().catch(err => {
          console.error('Failed to play alternative verse audio:', err);
          setIsPlaying(false);
          setIsLoading(false);
        });
      });
      
      await audio.play();
      
    } catch (error) {
      console.error('Error playing verse audio:', error);
      setIsPlaying(false);
      setIsLoading(false);
    }
  };

  const iconSize = size === "sm" ? 14 : 18;
  const buttonSize = size === "sm" ? "w-8 h-8" : "w-10 h-10";

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`${buttonSize} rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 flex items-center justify-center shadow-md hover:scale-110 transition-all duration-200`}
      onClick={handlePlayVerse}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      ) : isPlaying ? (
        <Pause className="text-white" size={iconSize} />
      ) : (
        <Volume2 className="text-white" size={iconSize} />
      )}
    </Button>
  );
};

export default VerseAudioPlayer;
