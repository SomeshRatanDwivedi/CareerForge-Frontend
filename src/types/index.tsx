export interface BrandTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logoUrl: string;
  bannerUrl: string;
  cultureVideoUrl: string;
}

export interface ContentSection {
  id: string;
  type: 'about-us' | 'values-culture' | 'benefits' | 'life-at-company' | 'custom';
  title: string;
  content: string;
  imageUrl?: string;
  order: number;
  isVisible: boolean;
}

export interface PageBuilderState {
  companyName: string;
  slug: string;
  brandTheme: BrandTheme;
  sections: ContentSection[];
  loading: boolean;
}

export const defaultBrandTheme: BrandTheme = {
  primaryColor: '#3B82F6',
  secondaryColor: '#1E293B',
  accentColor: '#8B5CF6',
  logoUrl: '',
  bannerUrl: '',
  cultureVideoUrl: '',
};

export const defaultSections: ContentSection[] = [
  {
    id: 'about-us',
    type: 'about-us',
    title: 'About Us',
    content: 'We are a forward-thinking company dedicated to innovation and excellence. Our mission is to create meaningful impact through technology and collaboration.',
    isVisible: true,
    order: 1,
  },
  {
    id: 'values-culture',
    type: 'values-culture',
    title: 'Values & Culture',
    content: 'Our culture is built on trust, transparency, and continuous growth. We believe in empowering our team members and fostering an environment where creativity thrives.',
    isVisible: true,
    order: 2,
  },
];

export type FiltersDataType = Record<string, { id: string, label: string }[]>;

export interface JobType {
  id: string,
  title: string,
  work_policy: string,
  location: string,
  department:string,
  employment_type:string,
  experience_level: string,
  job_type: string,
  salary_range: string,
  job_slug: string,
  posted_days_ago: string
}
