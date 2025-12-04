import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  CreditCard, 
  Building2, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  Bell,
  Calendar,
  User,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useServiceApplications, ApplicationStatus } from '@/hooks/useServiceApplications';
import { useNotifications } from '@/hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';

const quickActions = [
  { icon: FileText, label: 'File Taxes', path: '/services/tax' },
  { icon: CreditCard, label: 'Renew ID', path: '/services/id' },
  { icon: Building2, label: 'Register Business', path: '/services/business' },
];

const getStatusBadge = (status: ApplicationStatus) => {
  switch (status) {
    case 'completed':
    case 'approved':
      return <Badge className="bg-success text-success-foreground">Completed</Badge>;
    case 'in_review':
      return <Badge className="bg-warning text-warning-foreground">In Progress</Badge>;
    case 'pending':
      return <Badge variant="secondary">Pending</Badge>;
    case 'rejected':
      return <Badge className="bg-destructive text-destructive-foreground">Rejected</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getProgressValue = (status: ApplicationStatus) => {
  switch (status) {
    case 'pending': return 10;
    case 'in_review': return 60;
    case 'approved':
    case 'completed': return 100;
    case 'rejected': return 100;
    default: return 0;
  }
};

const Dashboard = () => {
  const { t } = useLanguage();
  const { user, profile, role, isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { applications, isLoading: appsLoading, getApplicationStats } = useServiceApplications();
  const { notifications, unreadCount, markAsRead, isLoading: notifLoading } = useNotifications();

  const stats = getApplicationStats();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, authLoading, navigate]);

  if (authLoading || !isAuthenticated || !user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  const recentApplications = applications.slice(0, 3);
  const recentNotifications = notifications.slice(0, 3);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('dashboard.welcome')}, {profile?.full_name?.split(' ')[0] || 'User'}!
          </h1>
          <p className="text-muted-foreground">{t('dashboard.overview')}</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-warning/10 border-warning/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('dashboard.pending')}</p>
                  <p className="text-3xl font-bold text-warning-foreground">{stats.pending}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-info/10 border-info/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('dashboard.inProgress')}</p>
                  <p className="text-3xl font-bold text-info-foreground">{stats.inProgress}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-info/20 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-info" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-success/10 border-success/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('dashboard.completed')}</p>
                  <p className="text-3xl font-bold text-success-foreground">{stats.completed}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('dashboard.quickActions')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-auto py-6 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary/30"
                        onClick={() => navigate(action.path)}
                      >
                        <Icon className="h-6 w-6 text-primary" />
                        <span className="text-sm font-medium">{action.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">{t('dashboard.recentActivity')}</CardTitle>
                <Button variant="ghost" size="sm" className="gap-1" onClick={() => navigate('/applications')}>
                  {t('common.viewAll')}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                {appsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : recentApplications.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">No applications yet</p>
                    <Button onClick={() => navigate('/services')}>Browse Services</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentApplications.map((application) => (
                      <div 
                        key={application.id}
                        className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-foreground truncate">
                              {application.service_name}
                            </h4>
                            {getStatusBadge(application.status)}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(application.submitted_at).toLocaleDateString()}
                            </span>
                          </div>
                          {application.status === 'in_review' && (
                            <div className="mt-2">
                              <Progress value={getProgressValue(application.status)} className="h-1.5" />
                            </div>
                          )}
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Profile Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{profile?.full_name || 'User'}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <Badge variant="outline" className="mt-1 capitalize">
                      {role || 'citizen'}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full" onClick={() => navigate('/profile')}>
                    View Profile
                  </Button>
                  {(role === 'officer' || role === 'admin') && (
                    <Button className="w-full" onClick={() => navigate('/admin')}>
                      Admin Dashboard
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  {t('dashboard.notifications')}
                </CardTitle>
                {unreadCount > 0 && <Badge variant="secondary">{unreadCount}</Badge>}
              </CardHeader>
              <CardContent>
                {notifLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                ) : recentNotifications.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No notifications yet
                  </p>
                ) : (
                  <div className="space-y-3">
                    {recentNotifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          notification.read ? 'bg-muted/30' : 'bg-primary/5 border border-primary/10'
                        }`}
                        onClick={() => !notification.read && markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-2">
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-foreground truncate">
                              {notification.title}
                            </h4>
                            <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <Button variant="ghost" className="w-full mt-4" size="sm">
                  {t('common.viewAll')} Notifications
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
