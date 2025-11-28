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
  ChevronRight
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const quickActions = [
  { icon: FileText, label: 'File Taxes', path: '/services/tax' },
  { icon: CreditCard, label: 'Renew ID', path: '/services/id' },
  { icon: Building2, label: 'Register Business', path: '/services/business' },
];

const recentActivity = [
  {
    id: 1,
    title: 'National ID Renewal',
    status: 'in-progress',
    date: '2025-11-25',
    progress: 60,
  },
  {
    id: 2,
    title: 'Tax Filing 2024',
    status: 'completed',
    date: '2025-11-20',
    progress: 100,
  },
  {
    id: 3,
    title: 'Business License Application',
    status: 'pending',
    date: '2025-11-28',
    progress: 0,
  },
];

const notifications = [
  {
    id: 1,
    title: 'ID Ready for Pickup',
    message: 'Your national ID is ready at Addis Ababa Service Center',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    title: 'Tax Payment Confirmed',
    message: 'Your tax payment of ETB 5,000 has been processed',
    time: '1 day ago',
    read: true,
  },
  {
    id: 3,
    title: 'Document Verification Required',
    message: 'Please upload additional documents for your business license',
    time: '2 days ago',
    read: true,
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return <Badge className="bg-success text-success-foreground">Completed</Badge>;
    case 'in-progress':
      return <Badge className="bg-warning text-warning-foreground">In Progress</Badge>;
    case 'pending':
      return <Badge variant="secondary">Pending</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const Dashboard = () => {
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('dashboard.welcome')}, {user.fullName.split(' ')[0]}!
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
                  <p className="text-3xl font-bold text-warning-foreground">2</p>
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
                  <p className="text-3xl font-bold text-info-foreground">1</p>
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
                  <p className="text-3xl font-bold text-success-foreground">12</p>
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
                <Button variant="ghost" size="sm" className="gap-1">
                  {t('common.viewAll')}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div 
                      key={activity.id}
                      className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-foreground truncate">
                            {activity.title}
                          </h4>
                          {getStatusBadge(activity.status)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {activity.date}
                          </span>
                        </div>
                        {activity.status === 'in-progress' && (
                          <div className="mt-2">
                            <Progress value={activity.progress} className="h-1.5" />
                          </div>
                        )}
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    </div>
                  ))}
                </div>
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
                    <h3 className="font-semibold text-foreground">{user.fullName}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <Badge variant="outline" className="mt-1 capitalize">
                      {user.role}
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full" onClick={() => navigate('/profile')}>
                  View Profile
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  {t('dashboard.notifications')}
                </CardTitle>
                <Badge variant="secondary">3</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        notification.read ? 'bg-muted/30' : 'bg-primary/5 border border-primary/10'
                      }`}
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
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
