import React, { useState } from 'react';
import styles from './SellerDashboard.module.css';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { Badge } from '../../../shared/ui/Badge';
import { 
  mockMetrics, 
  mockApplications, 
  mockTransactions, 
  mockChartData,
  mockNotifications 
} from './mockData';

const SellerDashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [activeTab, setActiveTab] = useState<'published' | 'draft' | 'sold'>('published');

  // Filter applications by status
  const filteredApplications = mockApplications.filter(app => {
    if (activeTab === 'published') return app.status === 'published';
    if (activeTab === 'draft') return app.status === 'draft';
    if (activeTab === 'sold') return app.status === 'sold';
    return true;
  });

  return (
    <div className={styles.dashboard}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Seller Dashboard</h1>
          <p className={styles.subtitle}>Welcome back! Here's your business overview</p>
        </div>
        <div className={styles.headerActions}>
          <Button variant="secondary" size="small">
            View Analytics
          </Button>
          <Button variant="primary" size="small">
            Add New App
          </Button>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className={styles.metricsGrid}>
        <Card className={styles.metricCard}>
          <div className={styles.metricContent}>
            <div className={styles.metricLabel}>Total Revenue</div>
            <div className={styles.metricValue}>${mockMetrics.revenue.toLocaleString()}</div>
            <div className={styles.metricChange}>
              <span className={styles.changePositive}>+12.5%</span> from last month
            </div>
          </div>
          <div className={styles.metricIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </Card>

        <Card className={styles.metricCard}>
          <div className={styles.metricContent}>
            <div className={styles.metricLabel}>Total Sales</div>
            <div className={styles.metricValue}>{mockMetrics.sales}</div>
            <div className={styles.metricChange}>
              <span className={styles.changePositive}>+8</span> this month
            </div>
          </div>
          <div className={styles.metricIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </Card>

        <Card className={styles.metricCard}>
          <div className={styles.metricContent}>
            <div className={styles.metricLabel}>Total Views</div>
            <div className={styles.metricValue}>{mockMetrics.views.toLocaleString()}</div>
            <div className={styles.metricChange}>
              <span className={styles.changePositive}>+22.3%</span> from last month
            </div>
          </div>
          <div className={styles.metricIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </Card>

        <Card className={styles.metricCard}>
          <div className={styles.metricContent}>
            <div className={styles.metricLabel}>Conversion Rate</div>
            <div className={styles.metricValue}>{mockMetrics.conversionRate}%</div>
            <div className={styles.metricChange}>
              <span className={styles.changeNegative}>-0.5%</span> from last month
            </div>
          </div>
          <div className={styles.metricIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </Card>
      </div>

      <div className={styles.mainContent}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          {/* Revenue Chart */}
          <Card className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <h2 className={styles.sectionTitle}>Revenue Overview</h2>
              <div className={styles.timeRangeSelector}>
                <button 
                  className={`${styles.timeRangeBtn} ${selectedTimeRange === '7d' ? styles.active : ''}`}
                  onClick={() => setSelectedTimeRange('7d')}
                >
                  7 days
                </button>
                <button 
                  className={`${styles.timeRangeBtn} ${selectedTimeRange === '30d' ? styles.active : ''}`}
                  onClick={() => setSelectedTimeRange('30d')}
                >
                  30 days
                </button>
                <button 
                  className={`${styles.timeRangeBtn} ${selectedTimeRange === '90d' ? styles.active : ''}`}
                  onClick={() => setSelectedTimeRange('90d')}
                >
                  90 days
                </button>
              </div>
            </div>
            <div className={styles.chartContainer}>
              <svg viewBox="0 0 400 200" className={styles.chart}>
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map(i => (
                  <line
                    key={i}
                    x1="0"
                    y1={40 * i}
                    x2="400"
                    y2={40 * i}
                    stroke="var(--color-border)"
                    strokeWidth="1"
                    opacity="0.2"
                  />
                ))}
                
                {/* Area chart */}
                <path
                  d={`M 0,160 ${mockChartData.map((point, i) => 
                    `L ${(i * 400) / (mockChartData.length - 1)},${200 - (point.value / 5000) * 160}`
                  ).join(' ')} L 400,200 L 0,200 Z`}
                  fill="url(#chartGradient)"
                />
                
                {/* Line chart */}
                <path
                  d={`M 0,160 ${mockChartData.map((point, i) => 
                    `L ${(i * 400) / (mockChartData.length - 1)},${200 - (point.value / 5000) * 160}`
                  ).join(' ')}`}
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="2"
                />
                
                {/* Data points */}
                {mockChartData.map((point, i) => (
                  <circle
                    key={i}
                    cx={(i * 400) / (mockChartData.length - 1)}
                    cy={200 - (point.value / 5000) * 160}
                    r="4"
                    fill="var(--color-primary)"
                    className={styles.dataPoint}
                  />
                ))}
              </svg>
              <div className={styles.chartLabels}>
                {mockChartData.map((point, i) => (
                  <span key={i} className={styles.chartLabel}>{point.label}</span>
                ))}
              </div>
            </div>
          </Card>

          {/* Applications List */}
          <Card className={styles.applicationsCard}>
            <div className={styles.applicationsHeader}>
              <h2 className={styles.sectionTitle}>My Applications</h2>
              <div className={styles.tabNav}>
                <button
                  className={`${styles.tab} ${activeTab === 'published' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('published')}
                >
                  Published ({mockApplications.filter(a => a.status === 'published').length})
                </button>
                <button
                  className={`${styles.tab} ${activeTab === 'draft' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('draft')}
                >
                  Draft ({mockApplications.filter(a => a.status === 'draft').length})
                </button>
                <button
                  className={`${styles.tab} ${activeTab === 'sold' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('sold')}
                >
                  Sold ({mockApplications.filter(a => a.status === 'sold').length})
                </button>
              </div>
            </div>
            
            <div className={styles.applicationsList}>
              {filteredApplications.map(app => (
                <div key={app.id} className={styles.applicationItem}>
                  <div className={styles.appInfo}>
                    <h3 className={styles.appTitle}>{app.title}</h3>
                    <p className={styles.appCategory}>{app.category}</p>
                  </div>
                  <div className={styles.appStats}>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>Views</span>
                      <span className={styles.statValue}>{app.views}</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>Price</span>
                      <span className={styles.statValue}>${app.price}</span>
                    </div>
                  </div>
                  <div className={styles.appActions}>
                    <Badge 
                      variant={
                        app.status === 'published' ? 'success' : 
                        app.status === 'draft' ? 'warning' : 
                        'info'
                      }
                    >
                      {app.status}
                    </Badge>
                    <Button variant="secondary" size="small">
                      {app.status === 'draft' ? 'Edit' : 'View'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          {/* Quick Actions */}
          <Card className={styles.quickActionsCard}>
            <h2 className={styles.sectionTitle}>Quick Actions</h2>
            <div className={styles.quickActions}>
              <button className={styles.actionButton}>
                <div className={styles.actionIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span>Add New App</span>
              </button>
              <button className={styles.actionButton}>
                <div className={styles.actionIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 13h2l2-9 2 18 2-18 2 9h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 13h3v8h-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>View Analytics</span>
              </button>
              <button className={styles.actionButton}>
                <div className={styles.actionIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Withdraw Funds</span>
              </button>
              <button className={styles.actionButton}>
                <div className={styles.actionIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Manage Listings</span>
              </button>
            </div>
          </Card>

          {/* Recent Sales */}
          <Card className={styles.recentSalesCard}>
            <h2 className={styles.sectionTitle}>Recent Sales</h2>
            <div className={styles.transactionsList}>
              {mockTransactions.slice(0, 5).map(transaction => (
                <div key={transaction.id} className={styles.transactionItem}>
                  <div className={styles.transactionInfo}>
                    <h4 className={styles.transactionTitle}>{transaction.appName}</h4>
                    <p className={styles.transactionBuyer}>{transaction.buyer}</p>
                    <p className={styles.transactionDate}>{transaction.date}</p>
                  </div>
                  <div className={styles.transactionAmount}>
                    <span className={styles.amount}>+${transaction.amount}</span>
                    <Badge variant="success" size="small">Completed</Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="secondary" className={styles.viewAllBtn}>
              View All Transactions
            </Button>
          </Card>

          {/* Notifications */}
          <Card className={styles.notificationsCard}>
            <div className={styles.notificationsHeader}>
              <h2 className={styles.sectionTitle}>Notifications</h2>
              <Badge variant="primary" size="small">
                {mockNotifications.filter(n => !n.read).length} new
              </Badge>
            </div>
            <div className={styles.notificationsList}>
              {mockNotifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`${styles.notificationItem} ${!notification.read ? styles.unread : ''}`}
                >
                  <div className={styles.notificationIcon}>
                    {notification.type === 'sale' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {notification.type === 'review' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {notification.type === 'message' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <div className={styles.notificationContent}>
                    <p className={styles.notificationText}>{notification.message}</p>
                    <span className={styles.notificationTime}>{notification.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;