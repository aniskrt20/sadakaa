
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { scholarQuotes, hadithQuotes, Quote } from "@/data/quotes";
import RandomHadithWidget from "./RandomHadithWidget";

const DailyQuote = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [quoteType, setQuoteType] = useState<"scholar" | "hadith">("hadith");

  useEffect(() => {
    // Get a random quote based on the day
    const today = new Date();
    const dayOfMonth = today.getDate();
    
    if (quoteType === "scholar") {
      const index = dayOfMonth % scholarQuotes.length;
      setQuote(scholarQuotes[index]);
    } else {
      const index = dayOfMonth % hadithQuotes.length;
      setQuote(hadithQuotes[index]);
    }
  }, [quoteType]);

  return (
    <>
      {/* Random Hadith Widget */}
      <RandomHadithWidget />
      
      {/* Original Daily Quote */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex justify-between mb-4">
            <button
              className={`px-3 py-1 rounded-md ${
                quoteType === "hadith" ? "bg-islamic-primary text-white" : "bg-gray-100 dark:bg-gray-800"
              }`}
              onClick={() => setQuoteType("hadith")}
            >
              حديث
            </button>
            <button
              className={`px-3 py-1 rounded-md ${
                quoteType === "scholar" ? "bg-islamic-primary text-white" : "bg-gray-100 dark:bg-gray-800"
              }`}
              onClick={() => setQuoteType("scholar")}
            >
              أقوال العلماء
            </button>
          </div>
          
          {quote && (
            <div className="text-center">
              <p className="text-lg arabic-text mb-4 font-medium">{quote.text}</p>
              <div className="text-sm opacity-75 arabic-text">
                <p>{quote.author}</p>
                {quote.source && <p className="text-xs mt-1">{quote.source}</p>}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default DailyQuote;
