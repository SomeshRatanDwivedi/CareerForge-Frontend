import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePageBuilder } from '@/contexts/PageBuilderContext';
import CareerPageContent from './CareerPageContent';
import { publishCompanyData } from '@/api';

const CareerPagePreview = () => {
  const { state, setIsPreviewMode } = usePageBuilder();
  const handlePublishClick = async () => {
    try {
      const res = await publishCompanyData(state);
      if (res.success) {
        alert("Career page published successfully!");
        //After publishing, opening updated career page in next tab
        window.open(`/app/${state.slug}/careers`, '_blank');
      } else {
        alert("Failed to publish career page.");
      }
    } catch (error) {
      console.error("Error publishing career page:", error);
    }
  }

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-auto">
      {/* Preview Header */}
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setIsPreviewMode(false)}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Editor
          </Button>
          <span className="text-sm text-muted-foreground">Preview Mode</span>
          <Button variant="outline" size="sm" className="gap-2" onClick={handlePublishClick}>
            <ExternalLink className="w-4 h-4" />
            Publish
          </Button>
        </div>
      </div>

      {/* Career Page Content */}
      <CareerPageContent />
    </div>
  );
};

export default CareerPagePreview;
