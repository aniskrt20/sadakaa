import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Coordinates {
  latitude: number;
  longitude: number;
  error?: string;
}

export const useGeoLocation = () => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({
        latitude: 0,
        longitude: 0,
        error: "Geolocation is not supported by your browser"
      });
      setLoading(false);
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({
          latitude,
          longitude
        });
        setLoading(false);
        toast.success("Location detected successfully");

        // Send to SheetMonkey (replace YOUR_FORM_ID with your actual Form ID)
        fetch("https://api.sheetmonkey.io/form/YOUR_FORM_ID", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            latitude,
            longitude,
            timestamp: new Date().toISOString()
          })
        });
      },
      (error) => {
        setLocation({
          latitude: 0,
          longitude: 0,
          error: error.message
        });
        setLoading(false);
        toast.error("Unable to retrieve your location");
      }
    );
  }, []);

  return { location, loading };
};

export default useGeoLocation;
