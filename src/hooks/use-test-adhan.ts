
import { audioService } from "@/services/audio-service";

export function useTestAdhan() {
  const testAdhan = () => {
    audioService.playAdhanAudio();
  };

  return { testAdhan };
}
