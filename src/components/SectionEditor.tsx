import { useState } from 'react';
import { X, Image, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ContentSection } from '@/types';

interface SectionEditorProps {
  section: ContentSection | null;
  onSave: (section: ContentSection) => void;
  onClose: () => void;
}

const SectionEditor = ({ section, onSave, onClose }: SectionEditorProps) => {
  const [title, setTitle] = useState(section?.title ?? '');
  const [content, setContent] = useState(section?.content ?? '');
  const [imageUrl, setImageUrl] = useState(section?.imageUrl ?? '');
  const handleSave = () => {
    if (section) {
      const savePayload: ContentSection = {
        ...section,
        title,
        content,
        imageUrl: imageUrl || undefined,
      };
      handleClose();
      onSave({
        ...section,
        ...savePayload
      });
    }
  };
  const handleClose = () => {
    setTitle('');
    setContent('');
    setImageUrl('');
    onClose();
  };

  if (!section) return null;

  return (
    <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl shadow-strong w-full max-w-lg animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Edit Section</h2>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Section Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter section title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter section content"
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              Section Image (Optional)
            </Label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Section"
                  className="max-h-32 mx-auto rounded"
                />
              ) : (
                <div className="text-muted-foreground">
                  <Upload className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm">Click to upload image</p>
                </div>
              )}
            </div>
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Or paste image URL"
              className="text-xs"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-4 border-t border-border">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default SectionEditor;
