
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { HadithBook, searchHadiths, Hadith } from "@/services/api/hadithServices";

interface HadithSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentBook: HadithBook;
  onSearchResults: (hadiths: Hadith[]) => void;
}

const HadithSearchDialog = ({ 
  open, 
  onOpenChange, 
  currentBook,
  onSearchResults 
}: HadithSearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setSearchError("الرجاء إدخال نص البحث");
      return;
    }

    setIsSearching(true);
    setSearchError("");
    
    try {
      const results = await searchHadiths(currentBook, searchQuery);
      if (results.data.hadiths.length > 0) {
        onSearchResults(results.data.hadiths);
        onOpenChange(false); // Close dialog on successful search
      } else {
        setSearchError("لم يتم العثور على نتائج");
      }
    } catch (error) {
      setSearchError("حدث خطأ أثناء البحث");
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent dir="rtl" className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-right text-xl">
            بحث في {currentBook === "bukhari" ? "صحيح البخاري" : currentBook}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSearch} className="space-y-4 pt-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Search className="w-5 h-5 text-islamic-primary" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="أدخل نص البحث هنا..."
              className="text-right"
              autoFocus
            />
          </div>
          
          {searchError && (
            <div className="text-red-500 text-right text-sm">
              {searchError}
            </div>
          )}
          
          <DialogFooter>
            <Button 
              type="submit" 
              disabled={isSearching} 
              className="islamic-gradient w-full mt-4"
            >
              {isSearching ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  جاري البحث...
                </>
              ) : (
                "بحث"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HadithSearchDialog;
