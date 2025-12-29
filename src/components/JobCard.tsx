import type { JobType } from "@/types";
import { memo } from 'react';

const JobCard = ({ job }: { job: JobType }) => {
  return (
    <div className="group border border-border rounded-xl p-6 bg-card hover:shadow-md transition-all">
      
      {/* Header */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition">
            {job.title}
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {job.location} • {job.work_policy} • {job.employment_type}
          </p>
        </div>

        <span className="mt-2 text-xs text-muted-foreground whitespace-nowrap">
          {job.posted_days_ago}
        </span>
      </div>

      {/* Meta info */}
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground">
          {job.department}
        </span>

        <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground">
          {job.experience_level}
        </span>

        {job.salary_range && (
          <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground">
            {job.salary_range}
          </span>
        )}
      </div>

      {/* CTA */}
      <div className="mt-5">
        <a
          className="inline-flex items-center text-primary font-medium hover:underline"
        >
          View role →
        </a>
      </div>
    </div>
  );
};

export default memo(JobCard);