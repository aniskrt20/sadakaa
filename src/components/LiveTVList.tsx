
import React from "react";
import { useLiveTV } from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader, Tv, ExternalLink } from "lucide-react";

const LiveTVList = () => {
  const { data: liveTV, isLoading } = useLiveTV();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4 text-right">البث المباشر من الحرمين</h2>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader className="animate-spin" />
          <span className="mr-2">جاري تحميل قنوات البث المباشر...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {liveTV?.map((channel) => (
            <Card key={channel.id} className="hover:shadow-md transition-all">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    asChild
                  >
                    <a href={channel.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={14} />
                      <span>مشاهدة</span>
                    </a>
                  </Button>
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
  );
};

export default LiveTVList;
