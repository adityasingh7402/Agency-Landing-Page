import DashboardClient from './DashboardClient';

async function getDashboardStats() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/admin/dashboard-stats`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error('Failed to fetch stats');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return null;
  }
}

export default async function AdminDashboard() {
  const data = await getDashboardStats();

  const stats = data?.stats || {
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    totalCategories: 0,
    totalViews: 0,
    featuredBlogs: 0
  };

  const recentBlogs = data?.recentBlogs || [];

  return (
    <DashboardClient stats={stats} recentBlogs={recentBlogs} />
  );
}
