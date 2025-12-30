import { getCompanySettings } from '@/api';
import CareerPageContent from '@/components/CareerPageContent';
import { usePageBuilder } from '@/contexts/PageBuilderContext';
import { useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet-async";

const CareerPageLayout = () => {
  const {state, setState, updateLoading,getAndSetJobsFilters } = usePageBuilder();
  const { slug } = useParams();
  useEffect(() => {
    if (!slug) return;
    const _getCompnaySettings = async () => {
      try {
        updateLoading(true);
        const data = await getCompanySettings(slug as string);
        if (data.success && data.data) {
          setState(data.data);
          getAndSetJobsFilters(data.data.slug);
        }
        updateLoading(false);

      } catch (error) {
        updateLoading(false);
        console.error("Error fetching company settings:", error);
      }
    };
    _getCompnaySettings();
  }, [slug, setState, updateLoading]);
  return (
    <>
      <Helmet>
        <title>{state?.companyName} Careers | Open Jobs</title>
        <meta
          name="description"
          content={`Explore open roles at ${state?.companyName}. Apply for engineering, design, product and more.`}
        />
      </Helmet>
      < CareerPageContent />
    </>

  ) ;
}

export default CareerPageLayout