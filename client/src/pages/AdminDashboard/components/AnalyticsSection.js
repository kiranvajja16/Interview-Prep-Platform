import DashboardCard from '../../../components/DashboardCard'


const AnalyticsSection = ({analytics}) => {
  return (
    <div className="analytics-section">

      <DashboardCard
        title="Total Users"
        value={analytics.totalUsers}
      />

      <DashboardCard
        title="Candidates"
        value={analytics.totalCandidates}
      />

      <DashboardCard
        title="Instructors"
        value={analytics.totalInstructors}
      />

      <DashboardCard
        title="Quizzes"
        value={analytics.totalQuizzes}
      />

      <DashboardCard
        title="Attempts"
        value={analytics.totalAttempts}
      />

    </div>
  )
}

export default AnalyticsSection