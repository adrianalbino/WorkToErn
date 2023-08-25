export type JobPosting = {
  title: string,
  jobType: 'Fixed Price' | 'Hourly Rate',
  dateCreated: string,
  budget: string;
  experienceLevel: 'Beginner' | 'Intermediate' | 'Expert';
  description: string;
  postedBy: string;
}