#!/usr/bin/env node

/**
 * Verify Deployment Configuration
 * Checks if all required environment variables are set in Vercel
 */

const requiredVars = [
  'AWS_REGION',
  'AWS_ROLE_ARN',
  'DYNAMODB_TABLE_NAME',
  'GITHUB_APP_CLIENT_ID',
  'GITHUB_APP_CLIENT_SECRET'
];

console.log('🔍 Verificando configuración de deployment...\n');

console.log('Variables requeridas para DynamoDB:');
requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`  ✅ ${varName}: ${varName.includes('SECRET') || varName.includes('ARN') ? '***' : value.substring(0, 20)}...`);
  } else {
    console.log(`  ❌ ${varName}: NO CONFIGURADA`);
  }
});

console.log('\n📋 Próximos pasos:');
console.log('1. Si faltan variables, agrégalas en Vercel Dashboard');
console.log('2. Ejecuta: vercel --prod');
console.log('3. Limpia localStorage en el navegador: localStorage.clear()');
console.log('4. Recarga la página y prueba crear perfil\n');
