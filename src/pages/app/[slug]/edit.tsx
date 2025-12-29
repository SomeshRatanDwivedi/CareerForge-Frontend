import { Eye, LogOut } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BrandThemeEditor from '@/components/BrandThemeEditor';
import SectionsManager from '@/components/SectionsManager';
import CareerPagePreview from '@/components/CareerPagePreview';
import { useEffect } from 'react';
import { getCompanySettings } from '@/api';
import { usePageBuilder } from '@/contexts/PageBuilderContext';
import { defaultBrandTheme, defaultSections } from '@/types';

const DashboardContent = () => {
  const navigate = useNavigate();
  const { state, setState, isPreviewMode, setIsPreviewMode, updateLoading } = usePageBuilder();
  const { slug } = useParams();
  useEffect(() => {
    if (!slug) return;
    const _getCompnaySettings = async () => {
      try {
        updateLoading(true);
        const res = await getCompanySettings(slug as string);
        if (res?.success) {
          if (res.data) {
            setState(res.data);
          } else {
            setState((prev) => ({
              ...prev,
              companyName: '',
              slug: '',
              brandTheme: defaultBrandTheme,
              sections: defaultSections,
              loading: false,
            }));
          }
        }

      } catch (error) {
        updateLoading(false);
        console.error("Error fetching company settings:", error);
      }
    };
    _getCompnaySettings();
  }, [slug, setState, updateLoading]);
  useEffect(() => {
    
  }, [])
  const handleHomeClick = () => {
    return navigate(`/app/${slug}`);
  };

  if (isPreviewMode) {
    return <CareerPagePreview />;
  }

  return (
    <div className="h-full bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground cursor-pointer" onClick={handleHomeClick}>
              {state?.companyName}
            </h1>
            <p className="text-sm text-muted-foreground">Career Page Builder</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setIsPreviewMode(true)}
              className="gap-2"
            >
              <Eye className="w-4 h-4" />
              Preview
            </Button>
            <Button onClick={() => setIsPreviewMode(true)}>Publish</Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="text-muted-foreground"
            >
              <LogOut className="w-4 h-4" onClick={() => navigate('/auth/login')} />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        <div className="grid lg:grid-cols-[320px_1fr] gap-6">
          {/* Left Sidebar - Brand Theme */}
          <aside className="bg-card border border-border rounded-xl p-4 h-fit lg:sticky lg:top-20">
            <h2 className="font-medium text-foreground mb-4">Brand Theme</h2>
            <ScrollArea className="h-[calc(100vh-180px)]">
              <BrandThemeEditor />
            </ScrollArea>
          </aside>

          {/* Main Area - Sections */}
          <div className="bg-card border border-border rounded-xl p-6">
            <Tabs defaultValue="sections" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="sections">Content Sections</TabsTrigger>
                <TabsTrigger value="settings">Page Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="sections" className="mt-0">
                <SectionsManager />
              </TabsContent>

              <TabsContent value="settings" className="mt-0">
                <div className="text-center py-12 text-muted-foreground">
                  <p>Page settings coming soon...</p>
                  <p className="text-sm mt-2">
                    Configure SEO, custom domain, and more.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardContent;
