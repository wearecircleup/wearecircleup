/**
 * Vercel Serverless Function: Analytics
 * 
 * Fetches analytics data from DynamoDB tables:
 * - circleup-dynamodb (user profiles)
 * - circleup-presentations (presentations)
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { awsCredentialsProvider } from '@vercel/functions/oidc';

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: awsCredentialsProvider({
    roleArn: process.env.AWS_ROLE_ARN,
    clientConfig: { region: process.env.AWS_REGION },
  }),
});

const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});

// Cache for analytics data
let analyticsCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check cache
    const currentTime = Date.now();
    if (analyticsCache && cacheTimestamp && (currentTime - cacheTimestamp) < CACHE_DURATION) {
      console.log('Returning cached analytics data');
      return res.status(200).json({
        ...analyticsCache,
        cached: true,
        cacheAge: Math.floor((currentTime - cacheTimestamp) / 1000)
      });
    }

    const PROFILES_TABLE = process.env.DYNAMODB_TABLE_NAME;
    const PRESENTATIONS_TABLE = process.env.DYNAMODB_PRESENTATIONS_TABLE_NAME;

    if (!PROFILES_TABLE || !PRESENTATIONS_TABLE) {
      return res.status(500).json({ 
        error: 'Database tables not configured' 
      });
    }

    // Fetch all profiles
    const profilesResult = await docClient.send(new ScanCommand({
      TableName: PROFILES_TABLE
    }));

    const profiles = profilesResult.Items || [];

    // Fetch all presentations
    const presentationsResult = await docClient.send(new ScanCommand({
      TableName: PRESENTATIONS_TABLE
    }));

    const presentationRecords = presentationsResult.Items || [];
    
    // Flatten presentations array (each record has a presentations array)
    const allPresentations = presentationRecords.flatMap(record => 
      record.presentations || []
    );

    // Calculate analytics
    const analytics = {
      // User metrics
      totalUsers: profiles.length,
      usersByRole: calculateUsersByRole(profiles),
      usersByAge: calculateUsersByAge(profiles),
      
      // Presentation metrics
      totalPresentations: allPresentations.length,
      presentationsByTheme: calculatePresentationsByTheme(allPresentations),
      presentationsByMonth: calculatePresentationsByMonth(allPresentations),
      averagePresentationsPerUser: profiles.length > 0 
        ? (allPresentations.length / profiles.length).toFixed(1) 
        : 0,
      
      // Activity metrics
      recentActivity: calculateRecentActivity(profiles, allPresentations),
      
      timestamp: new Date().toISOString()
    };

    // Cache the response
    analyticsCache = { success: true, analytics, cached: false };
    cacheTimestamp = Date.now();

    return res.status(200).json(analyticsCache);

  } catch (error) {
    console.error('Error fetching analytics:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}

// Helper functions
function calculateUsersByRole(profiles) {
  const roles = {};
  profiles.forEach(profile => {
    const role = profile.role || 'Sin rol';
    roles[role] = (roles[role] || 0) + 1;
  });
  return roles;
}

function calculateUsersByAge(profiles) {
  const ageGroups = {
    '18-24': 0,
    '25-34': 0,
    '35-44': 0,
    '45+': 0
  };
  
  profiles.forEach(profile => {
    const age = profile.age;
    if (!age) return;
    
    if (age >= 18 && age <= 24) ageGroups['18-24']++;
    else if (age >= 25 && age <= 34) ageGroups['25-34']++;
    else if (age >= 35 && age <= 44) ageGroups['35-44']++;
    else if (age >= 45) ageGroups['45+']++;
  });
  
  return ageGroups;
}

function calculatePresentationsByTheme(presentations) {
  const themes = {};
  presentations.forEach(presentation => {
    const theme = presentation.metadata?.theme || 'modern';
    const themeName = theme === 'modern' ? 'Moderno' : 
                      theme === 'academic' ? 'Académico' : 
                      'Minimalista';
    themes[themeName] = (themes[themeName] || 0) + 1;
  });
  return themes;
}

function calculatePresentationsByMonth(presentations) {
  const months = {};
  const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  
  presentations.forEach(presentation => {
    if (!presentation.createdAt) return;
    
    const date = new Date(presentation.createdAt);
    const monthYear = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    months[monthYear] = (months[monthYear] || 0) + 1;
  });
  
  // Get last 6 months
  const sortedMonths = Object.entries(months)
    .sort((a, b) => {
      const dateA = new Date(a[0]);
      const dateB = new Date(b[0]);
      return dateB - dateA;
    })
    .slice(0, 6)
    .reverse();
  
  return Object.fromEntries(sortedMonths);
}

function calculateRecentActivity(profiles, presentations) {
  const now = new Date();
  const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  const newUsersLast7Days = profiles.filter(p => 
    p.createdAt && new Date(p.createdAt) > last7Days
  ).length;
  
  const newUsersLast30Days = profiles.filter(p => 
    p.createdAt && new Date(p.createdAt) > last30Days
  ).length;
  
  const presentationsLast7Days = presentations.filter(p => 
    p.createdAt && new Date(p.createdAt) > last7Days
  ).length;
  
  const presentationsLast30Days = presentations.filter(p => 
    p.createdAt && new Date(p.createdAt) > last30Days
  ).length;
  
  return {
    newUsersLast7Days,
    newUsersLast30Days,
    presentationsLast7Days,
    presentationsLast30Days
  };
}
