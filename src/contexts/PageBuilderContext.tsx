import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import {
  type BrandTheme,
  type ContentSection,
  type FiltersDataType,
  type PageBuilderState,
  defaultBrandTheme,
  defaultSections,
} from '@/types';
import { getJobFilters } from '@/api';
import { JOB_FILTER_TYPES } from '@/constants';

export interface PageBuilderContextType {
  state: PageBuilderState;
  updateLoading: (loading: boolean) => void;
  setState: React.Dispatch<React.SetStateAction<PageBuilderState>>;
  updateCompanyName: (name: string) => void;
  updateBrandTheme: (theme: Partial<BrandTheme>) => void;
  updateSection: (id: string, updates: Partial<ContentSection>) => void;
  addSection: (section: ContentSection) => void;
  removeSection: (id: string) => void;
  reorderSections: (sections: ContentSection[]) => void;
  isPreviewMode: boolean;
  setIsPreviewMode: (value: boolean) => void;
  getAndSetJobsFilters: (slug?: string | null) => Promise<void>;
  jobsFilters: FiltersDataType;
}

const PageBuilderContext = createContext<PageBuilderContextType | undefined>(undefined);

export function PageBuilderProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PageBuilderState>({
    companyName: '',
    slug: '',
    brandTheme: defaultBrandTheme,
    sections: defaultSections,
    loading: false,
  });
  const [jobsFilters, setJobsFilters] = useState<FiltersDataType>(() => {
    const stored = localStorage.getItem('jobFilters');
    return stored ? JSON.parse(stored) : {};
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const updateCompanyName = (name: string) => {
    setState((prev) => ({ ...prev, companyName: name }));
  };

  const updateBrandTheme = (theme: Partial<BrandTheme>) => {
    setState((prev) => ({
      ...prev,
      brandTheme: { ...prev.brandTheme, ...theme },
    }));
  };

  const updateSection = (id: string, updates: Partial<ContentSection>) => {
    setState((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === id ? { ...section, ...updates } : section
      ),
    }));
  };

  const addSection = (section: ContentSection) => {
    setState((prev) => ({
      ...prev,
      sections: [...prev.sections, section],
    }));
  };

  const removeSection = (id: string) => {
    setState((prev) => ({
      ...prev,
      sections: prev.sections.filter((section) => section.id !== id),
    }));
  };

  const reorderSections = (sections: ContentSection[]) => {
    setState((prev) => ({ ...prev, sections }));
  };
  const updateLoading = useCallback((loading: boolean) => {
    setState((prev) => ({ ...prev, loading }));
  }, []);
  const getAndSetJobsFilters = useCallback(async (slug = null) => {
    try {
      const stored = localStorage.getItem('jobFilters');
      const filterValues = stored ? JSON.parse(stored) : {};
      if (Object.keys(filterValues).length > 0) {
        setJobsFilters(filterValues);
        return;
      }
      const res = await getJobFilters(slug ?? state.slug);
      if (res.success && res.data) {
        const filteredData: FiltersDataType = {};
        for (const key of JOB_FILTER_TYPES) {
          if (res.data[key]) {
            filteredData[key] = res.data[key];
          }
        }
        localStorage.setItem('jobFilters', JSON.stringify(filteredData));
        setJobsFilters(filteredData);
      }
    } catch (error) {
      console.error("Error fetching job filters:", error);
    }
  }, [state.slug])

  return (
    <PageBuilderContext.Provider
      value={{
        state,
        setState,
        updateLoading,
        updateCompanyName,
        updateBrandTheme,
        updateSection,
        addSection,
        removeSection,
        reorderSections,
        isPreviewMode,
        setIsPreviewMode,
        getAndSetJobsFilters,
        jobsFilters,
      }}
    >
      {children}
    </PageBuilderContext.Provider>
  );
}

export function usePageBuilder() {
  const context = useContext(PageBuilderContext);
  if (!context) {
    throw new Error('usePageBuilder must be used within a PageBuilderProvider');
  }
  return context;
}
