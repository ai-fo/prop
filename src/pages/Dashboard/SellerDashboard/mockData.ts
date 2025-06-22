export interface Metric {
  revenue: number;
  sales: number;
  views: number;
  conversionRate: number;
}

export interface Application {
  id: string;
  title: string;
  category: string;
  status: 'published' | 'draft' | 'sold';
  views: number;
  price: number;
  lastUpdated: string;
}

export interface Transaction {
  id: string;
  appName: string;
  buyer: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface Notification {
  id: string;
  type: 'sale' | 'review' | 'message' | 'system';
  message: string;
  time: string;
  read: boolean;
}

// Mock metrics data
export const mockMetrics: Metric = {
  revenue: 45678,
  sales: 234,
  views: 123456,
  conversionRate: 3.2
};

// Mock applications data
export const mockApplications: Application[] = [
  {
    id: '1',
    title: 'AI-Powered Task Manager',
    category: 'Productivity',
    status: 'published',
    views: 3456,
    price: 299,
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    title: 'Smart Inventory System',
    category: 'Business',
    status: 'published',
    views: 2890,
    price: 499,
    lastUpdated: '2024-01-14'
  },
  {
    id: '3',
    title: 'Real-time Analytics Dashboard',
    category: 'Analytics',
    status: 'sold',
    views: 5678,
    price: 899,
    lastUpdated: '2024-01-10'
  },
  {
    id: '4',
    title: 'E-commerce Mobile App',
    category: 'E-commerce',
    status: 'draft',
    views: 0,
    price: 1299,
    lastUpdated: '2024-01-18'
  },
  {
    id: '5',
    title: 'Customer Support Chatbot',
    category: 'AI/ML',
    status: 'published',
    views: 4321,
    price: 599,
    lastUpdated: '2024-01-12'
  },
  {
    id: '6',
    title: 'Social Media Scheduler',
    category: 'Marketing',
    status: 'sold',
    views: 3987,
    price: 399,
    lastUpdated: '2024-01-08'
  },
  {
    id: '7',
    title: 'Financial Planning Tool',
    category: 'Finance',
    status: 'published',
    views: 2345,
    price: 799,
    lastUpdated: '2024-01-16'
  },
  {
    id: '8',
    title: 'Learning Management System',
    category: 'Education',
    status: 'draft',
    views: 0,
    price: 1599,
    lastUpdated: '2024-01-17'
  }
];

// Mock transactions data
export const mockTransactions: Transaction[] = [
  {
    id: 't1',
    appName: 'Real-time Analytics Dashboard',
    buyer: 'John Doe',
    amount: 899,
    date: '2024-01-18 14:32',
    status: 'completed'
  },
  {
    id: 't2',
    appName: 'Customer Support Chatbot',
    buyer: 'Sarah Johnson',
    amount: 599,
    date: '2024-01-17 09:15',
    status: 'completed'
  },
  {
    id: 't3',
    appName: 'Smart Inventory System',
    buyer: 'Mike Chen',
    amount: 499,
    date: '2024-01-16 16:45',
    status: 'completed'
  },
  {
    id: 't4',
    appName: 'AI-Powered Task Manager',
    buyer: 'Emily Brown',
    amount: 299,
    date: '2024-01-15 11:23',
    status: 'completed'
  },
  {
    id: 't5',
    appName: 'Social Media Scheduler',
    buyer: 'David Wilson',
    amount: 399,
    date: '2024-01-14 13:56',
    status: 'completed'
  },
  {
    id: 't6',
    appName: 'Financial Planning Tool',
    buyer: 'Lisa Anderson',
    amount: 799,
    date: '2024-01-13 10:12',
    status: 'completed'
  },
  {
    id: 't7',
    appName: 'E-commerce Mobile App',
    buyer: 'Robert Taylor',
    amount: 1299,
    date: '2024-01-12 15:34',
    status: 'pending'
  }
];

// Mock chart data for revenue visualization
export const mockChartData: ChartDataPoint[] = [
  { label: 'Mon', value: 3200 },
  { label: 'Tue', value: 2800 },
  { label: 'Wed', value: 3500 },
  { label: 'Thu', value: 4100 },
  { label: 'Fri', value: 3900 },
  { label: 'Sat', value: 4500 },
  { label: 'Sun', value: 4200 }
];

// Mock notifications data
export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'sale',
    message: 'You made a new sale! Real-time Analytics Dashboard was purchased by John Doe',
    time: '2 hours ago',
    read: false
  },
  {
    id: 'n2',
    type: 'review',
    message: 'Sarah Johnson left a 5-star review on Customer Support Chatbot',
    time: '5 hours ago',
    read: false
  },
  {
    id: 'n3',
    type: 'message',
    message: 'New message from Mike Chen regarding Smart Inventory System',
    time: '1 day ago',
    read: false
  },
  {
    id: 'n4',
    type: 'sale',
    message: 'Congratulations! You reached 100 sales this month',
    time: '2 days ago',
    read: true
  },
  {
    id: 'n5',
    type: 'system',
    message: 'Your withdrawal request of $5,000 has been processed',
    time: '3 days ago',
    read: true
  },
  {
    id: 'n6',
    type: 'review',
    message: 'David Wilson left a 4-star review on Social Media Scheduler',
    time: '4 days ago',
    read: true
  }
];

// Additional mock data for extended functionality
export const mockAnalytics = {
  pageViews: {
    today: 456,
    yesterday: 398,
    lastWeek: 2567,
    lastMonth: 12345
  },
  topApplications: [
    { name: 'Real-time Analytics Dashboard', views: 5678, conversions: 145 },
    { name: 'Customer Support Chatbot', views: 4321, conversions: 123 },
    { name: 'AI-Powered Task Manager', views: 3456, conversions: 98 }
  ],
  trafficSources: [
    { source: 'Direct', percentage: 35 },
    { source: 'Search', percentage: 28 },
    { source: 'Social Media', percentage: 22 },
    { source: 'Referral', percentage: 15 }
  ]
};

export const mockWithdrawals = [
  {
    id: 'w1',
    amount: 5000,
    date: '2024-01-15',
    status: 'completed',
    method: 'Bank Transfer'
  },
  {
    id: 'w2',
    amount: 3500,
    date: '2024-01-01',
    status: 'completed',
    method: 'PayPal'
  },
  {
    id: 'w3',
    amount: 2000,
    date: '2023-12-15',
    status: 'completed',
    method: 'Bank Transfer'
  }
];