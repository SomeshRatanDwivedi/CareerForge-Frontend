import { usePageBuilder } from '@/contexts/PageBuilderContext';
import { Button } from './ui/button';
import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import type { FiltersDataType, JobType } from '@/types';
import { getJobsByFilterAndQuery } from '@/api';
import JobCard from './JobCard';
import { ScrollArea } from './ui/scroll-area';
import Loader from './Loader';
import { toLabel } from '@/utility';


const CareerPageContent = () => {
  const { state, jobsFilters } = usePageBuilder();
  const { companyName, brandTheme, sections, loading } = state;
  const visibleSections = sections.filter((s) => s.isVisible);
  const [filterValues, setFilterValues] = useState<FiltersDataType>({
    locations: [],
    departments: [],
    employmentTypes: [],
    workPlaceTypes: [],
  });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [showJobs, setShowJobs] = useState(false);
  const [jobsLoader, setJobsLoader] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout((showJobs: boolean) => {
      const fetchJobs = async () => {
        try {
          setJobsLoader(true);
          const res = await getJobsByFilterAndQuery(
            state.slug,
            filterValues,
            searchTerm
          );

          if (res.success && res.data) {
            setJobs(res.data);
          }
          setJobsLoader(false);
        } catch (error) {
          setJobsLoader(false);
          console.error("Error fetching jobs:", error);
        }
      };
      if (showJobs) {
        fetchJobs();
      }
    }, searchTerm ? 400 : 0, showJobs);

    return () => clearTimeout(debounceTimer);

  }, [filterValues, searchTerm, state.slug, showJobs]);

  if (loading) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <Loader size={50} />
      </div>
    )
  }
  return (
    <div className="animate-fade-in">
      {/* Hero Banner */}
      <div
        className="relative h-80 bg-muted flex items-center justify-center"
        style={{
          backgroundImage: brandTheme.bannerUrl
            ? `url(${brandTheme.bannerUrl})`
            : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: !brandTheme.bannerUrl ? brandTheme.primaryColor : undefined,
        }}
      >
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="relative text-center text-primary-foreground z-10">
          {brandTheme.logoUrl && (
            <img
              src={brandTheme.logoUrl}
              alt={companyName}
              className="h-16 mx-auto mb-4"
            />
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{companyName}</h1>
          <p className="text-lg opacity-90">Join our team and make an impact</p>
        </div>
      </div>

      {/* Culture Video */}
      {brandTheme.cultureVideoUrl && (
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Life at {companyName}
          </h2>
          <div className="aspect-video rounded-xl overflow-hidden shadow-medium">
            <iframe
              src={brandTheme.cultureVideoUrl.replace('watch?v=', 'embed/')}
              title="Culture Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Content Sections */}
      {visibleSections.map((section, index) => (
        <div
          key={section.id}
          className={`py-16 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/50'}`}
        >
          <div className="container max-w-4xl mx-auto px-4">
            <div className={`flex flex-col ${section.imageUrl ? 'md:flex-row md:gap-12 items-center' : ''}`}>
              <div className={section.imageUrl ? 'md:w-1/2' : ''}>
                <h2
                  className="text-3xl font-bold mb-4"
                  style={{ color: brandTheme.primaryColor }}
                >
                  {section.title}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </div>
              {section.imageUrl && (
                <div className="md:w-1/2 mt-6 md:mt-0">
                  <img
                    src={section.imageUrl}
                    alt={section.title}
                    className="rounded-xl shadow-medium w-full"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Footer CTA */}
      <div
        className="py-16 text-center"
        style={{ backgroundColor: brandTheme.secondaryColor }}
      >
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to join {companyName}?
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Explore our open positions and find your next opportunity.
          </p>
          <Button
            size="lg"
            className="text-lg px-8"
            style={{
              backgroundColor: brandTheme.accentColor,
              color: '#fff',
            }}
            onClick={() => setShowJobs((prev) => !prev)}
          >
            {showJobs ? 'Close Job Section' : 'View Open Positions'}
          </Button>
        </div>
      </div>
      {/* Rendering the jobs with filters (department, location, etc.) */}
      {showJobs && <div className="container max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Open Positions
        </h2>
        {/* Search box for job search by title */}
        <div className="mb-6">
          <TextField
            fullWidth
            label="Search by title"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6 justify-items-center">
          {jobsFilters && Object.entries(jobsFilters).map(([filterType, options]) => (
            <Autocomplete
              disablePortal
              options={options}
              value={filterValues[filterType]}
              onChange={(_, newValue) => {
                setFilterValues((prev) => ({
                  ...prev,
                  [filterType]: newValue,
                }));
              }}
              multiple
              getOptionLabel={(option) => option.label}
              sx={{ width: 250 }}
              renderInput={(params) => <TextField {...params} label={toLabel(filterType)} />}
            />
          ))}
        </div>
        <ScrollArea className='h-180 border rounded-lg'>
          {/* Showing all jobs */}
          {
            jobsLoader ? (
              <div className='w-full h-175 flex justify-center items-center'>
                <Loader size={50} />
              </div>
            ) : (
              <>
                <div id='all-jobs' className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
                {
                  jobs?.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No Jobs available</p>
                    </div>
                  )
                }
              </>
            )}
        </ScrollArea>
      </div>}
    </div>
  )
}


export default CareerPageContent;