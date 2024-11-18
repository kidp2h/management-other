import DashboardSection from '@/components/features/dashboard/dashboard-section';
import {
  getApplicationCompletedWithResearcher,
  getApplicationsRecent3Months,
  getApplicationsRecent6Months,
  getApplicationsRecent7Days,
  getCountAllApplications,
  getCountAllApplicationsByStatus,
} from '@/db/actions/applications';

export default async function DashboardPage() {
  const [
    countApplications,
    countApplicationsReported,
    countApplicationsResearching,
    countApplicationsCompleted,
    applicationsRecent3Months,
    applicationsRecent7Days,
    applicationsRecent6Months,
    applicationCompletedWithResearcher,
  ] = await Promise.all([
    getCountAllApplications(),
    getCountAllApplicationsByStatus('REPORTED'),
    getCountAllApplicationsByStatus('RESEARCHING'),
    getCountAllApplicationsByStatus('COMPLETED'),
    getApplicationsRecent3Months(),
    getApplicationsRecent7Days(),
    getApplicationsRecent6Months(),
    getApplicationCompletedWithResearcher(),
  ]);

  return (
    <DashboardSection
      data={{
        countApplications,
        countApplicationsReported,
        countApplicationsResearching,
        countApplicationsCompleted,
        applicationsRecent3Months,
        applicationsRecent7Days,
        applicationsRecent6Months,
        applicationCompletedWithResearcher,
      }}
    />
  );
}
