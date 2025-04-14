#!/usr/bin/env node

import { execSync } from 'child_process';
import inquirer from 'inquirer';

async function main() {
  console.log('\n🟪 Welcome to Create Farcaster App!\n');

  const { appType } = await inquirer.prompt<{ appType: string }>([
    {
      type: 'list',
      name: 'appType',
      message: 'What type of app would you like to build?',
      choices: ['Web App', 'Mobile App', 'Mini App'],
    },
  ]);

  try {
    switch (appType) {
      case 'Web App':
        const { webAppName } = await inquirer.prompt<{ webAppName: string }>([
          {
            type: 'input',
            name: 'webAppName',
            message: 'Name your Farcaster web app:',
          },
        ]);
        
        const webDirName = webAppName.replace(/\s+/g, '-');
        execSync(`git clone --depth 1 https://github.com/stephancill/opencast.git "${webDirName}"`, { stdio: 'inherit' });
        console.log(`\n🎉 ${webAppName} created successfully!`);
        break;
        
      case 'Mobile App':
        const { mobileAppName } = await inquirer.prompt<{ mobileAppName: string }>([
          {
            type: 'input',
            name: 'mobileAppName',
            message: 'Name your Farcaster mobile app:',
          },
        ]);
        
        const mobileDirName = mobileAppName.replace(/\s+/g, '-');
        execSync(`git clone --depth 1 https://github.com/dylsteck/litecast.git "${mobileDirName}"`, { stdio: 'inherit' });
        console.log(`\n🎉 ${mobileAppName} created successfully!`);
        break;
        
      case 'Mini App':
        execSync('npm create @farcaster/mini-app', { stdio: 'inherit' });
        break;
    }
  } catch (error) {
    console.error(`\n❌ Error occurred:`, error);
  }
}

main().catch(console.error); 