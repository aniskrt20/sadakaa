
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FileText } from 'lucide-react';

interface ActionButtonsProps {
  readmeDialogOpen: boolean;
  onReadmeDialogChange: (open: boolean) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ readmeDialogOpen, onReadmeDialogChange }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <Button 
        className="w-full py-6 rounded-xl font-medium bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 transition-all shadow-md"
      >
        مشاركة التطبيق
      </Button>
      
      <Button 
        variant="outline"
        className="w-full py-6 rounded-xl font-medium border-2 border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/20"
      >
        تقييم التطبيق
      </Button>

      <Dialog open={readmeDialogOpen} onOpenChange={onReadmeDialogChange}>
        <DialogTrigger asChild>
          <Button 
            variant="outline"
            className="w-full py-6 rounded-xl font-medium border-2 border-orange-200 text-orange-600 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-900/20"
            dir="rtl"
          >
            <FileText size={20} className="ml-2" />
            رسالة من مطور التطبيق
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-right arabic-text">تطبيق صدقة جارية</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/3953068c-c96a-4c97-a577-89964458052f.png" 
              alt="تطبيق صدقة جارية"
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActionButtons;
