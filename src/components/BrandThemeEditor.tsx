import { Palette, Image, Video } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePageBuilder } from '@/contexts/PageBuilderContext';
import { memo } from 'react';
import Loader from './Loader';

const BrandThemeEditor = () => {
  const { state, updateBrandTheme, updateCompanyName } = usePageBuilder();
  const { brandTheme, companyName, loading } = state;

  if (loading) {
    return (
      <div className="h-[calc(100vh-180px)] w-full flex items-center justify-center">
        <Loader size={30} />
      </div>
    )
  }
  return (
    <div className="space-y-6">
      {/* Company Name */}
      <div className="space-y-2">
        <Label className="text-sm font-medium flex items-center gap-2">
          Company Name
        </Label>
        <Input
          value={companyName}
          onChange={(e) => updateCompanyName(e.target.value)}
          placeholder="Enter company name"
        />
      </div>

      {/* Logo Upload */}
      <div className="space-y-2">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Image className="w-4 h-4" />
          Logo
        </Label>
        <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer">
          {brandTheme?.logoUrl ? (
            <img
              src={brandTheme.logoUrl}
              alt="Logo"
              className="max-h-16 mx-auto"
            />
          ) : (
            <div className="text-muted-foreground">
              <p className="text-sm">Your logo will show here</p>
            </div>
          )}
        </div>
        <Input
          value={brandTheme?.logoUrl}
          onChange={(e) => updateBrandTheme({ logoUrl: e.target.value })}
          placeholder="Paste logo image URL"
          className="text-xs"
        />
      </div>

      {/* Banner Image */}
      <div className="space-y-2">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Image className="w-4 h-4" />
          Banner Image
        </Label>
        <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer aspect-video flex items-center justify-center">
          {brandTheme?.bannerUrl ? (
            <img
              src={brandTheme.bannerUrl}
              alt="Banner"
              className="max-h-full max-w-full object-cover rounded"
            />
          ) : (
            <div className="text-muted-foreground w-full h-full flex flex-col items-center justify-center">
              <p className="text-sm">Your banner will show here</p>
            </div>
          )}
        </div>
        <Input
          value={brandTheme?.bannerUrl}
          onChange={(e) => updateBrandTheme({ bannerUrl: e.target.value })}
          placeholder="Paste banner image URL"
          className="text-xs"
        />
      </div>

      {/* Culture Video */}
      <div className="space-y-2">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Video className="w-4 h-4" />
          Culture Video
        </Label>
        <Input
          value={brandTheme?.cultureVideoUrl}
          onChange={(e) => updateBrandTheme({ cultureVideoUrl: e.target.value })}
          placeholder="YouTube or Vimeo URL"
        />
      </div>

      {/* Color Pickers */}
      <div className="space-y-4">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Brand Colors
        </Label>

        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Primary</Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={brandTheme?.primaryColor}
                onChange={(e) => updateBrandTheme({ primaryColor: e.target.value })}
                className="w-8 h-8 rounded cursor-pointer border-0"
              />
              <Input
                value={brandTheme?.primaryColor}
                onChange={(e) => updateBrandTheme({ primaryColor: e.target.value })}
                className="text-xs font-mono h-8"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Secondary</Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={brandTheme?.secondaryColor}
                onChange={(e) => updateBrandTheme({ secondaryColor: e.target.value })}
                className="w-8 h-8 rounded cursor-pointer border-0"
              />
              <Input
                value={brandTheme?.secondaryColor}
                onChange={(e) => updateBrandTheme({ secondaryColor: e.target.value })}
                className="text-xs font-mono h-8"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Accent</Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={brandTheme?.accentColor}
                onChange={(e) => updateBrandTheme({ accentColor: e.target.value })}
                className="w-8 h-8 rounded cursor-pointer border-0"
              />
              <Input
                value={brandTheme?.accentColor}
                onChange={(e) => updateBrandTheme({ accentColor: e.target.value })}
                className="text-xs font-mono h-8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(BrandThemeEditor);
