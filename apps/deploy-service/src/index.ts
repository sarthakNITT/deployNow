import { createClient } from 'redis';

import DownloadFromS3 from './utils/downloadFromS3';
import BuildProject from './utils/buildProject';
import GetAllFiles from './utils/getAllFiles';
import CheckStack from './utils/checkStack';
import ViteStack from './utils/stacks/vite';
import CoreReactStack from './utils/stacks/coreReact';
import 'dotenv/config';

const subscriber = createClient();
const publisher = createClient();

// Track if service is shutting down
let isShuttingDown = false;

// Connect to Redis
async function connectRedis() {
  try {
    await subscriber.connect();
    await publisher.connect();
    console.log('Connected to Redis');
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
    process.exit(1);
  }
}

// Process a single deployment job
async function processDeployment(id: string): Promise<void> {
  try {
    console.log(`Processing deployment for ID: ${id}`);
    
    // Update status to processing
    await publisher.hSet('status', id, 'processing');
    
    // Download from S3
    await DownloadFromS3(`output/${id}`);
    console.log('Downloaded from S3');

    // Build project
    await BuildProject(`${id}`);
    console.log('Build completed');

    // Check tech stack
    const fullPath = __dirname.slice(0, __dirname.length - 3);
    const stack = CheckStack(`${fullPath}dist/${id}`);
    console.log(`Detected tech stack: ${stack}`);

    let getFilesFrom: string = '';
    if (stack === 'vite') {
      getFilesFrom = `${fullPath}dist/${id}/dist`;
    } else if (stack === 'coreReact') {
      getFilesFrom = `${fullPath}dist/${id}/build`;
    }

    if (!getFilesFrom) {
      console.log('Invalid path to get files');
      await publisher.hSet('status', id, 'failed');
      return;
    }

    // Get all files and deploy
    const files = GetAllFiles(getFilesFrom);

    if (stack === 'vite') {
      console.log('Deploying with Vite stack');
      await ViteStack(files, fullPath, id);
    } else if (stack === 'coreReact') {
      console.log('Deploying with Core React stack');
      await CoreReactStack(files, fullPath, id, getFilesFrom);
    }

    // Mark as deployed
    await publisher.hSet('status', id, 'deployed');
    console.log(`Deployment completed for ID: ${id}`);
    
  } catch (error) {
    console.error(`Deployment failed for ID ${id}:`, error);
    await publisher.hSet('status', id, 'failed');
  }
}

// Main queue processor
async function startQueueProcessor(): Promise<void> {
  console.log('Starting queue processor...');
  
  while (!isShuttingDown) {
    try {
      // Use brPop with a timeout to allow graceful shutdown
      const res = await subscriber.brPop('build-queue', 5);

      if (!res) {
        // No items in queue, continue to next iteration
        continue;
      }

      const id = res.element;
      console.log(`Received deployment job: ${id}`);

      // Process the deployment (don't await to allow concurrent processing)
      processDeployment(id).catch(error => {
        console.error(`Error processing deployment ${id}:`, error);
      });

    } catch (error) {
      console.error('Error in queue processor:', error);
      
      // If it's a connection error, try to reconnect
      if (error instanceof Error && error.message?.includes('connection')) {
        console.log('Attempting to reconnect to Redis...');
        try {
          await subscriber.connect();
          await publisher.connect();
          console.log('Reconnected to Redis');
        } catch (reconnectError) {
          console.error('Failed to reconnect:', reconnectError);
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, 5000));
        }
      } else {
        // For other errors, wait before retrying
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
  
  console.log('Queue processor stopped');
}

// Graceful shutdown handler
async function gracefulShutdown(signal: string): Promise<void> {
  console.log(`Received ${signal}, shutting down gracefully...`);
  isShuttingDown = true;
  
  try {
    await subscriber.disconnect();
    await publisher.disconnect();
    console.log('Disconnected from Redis');
  } catch (error) {
    console.error('Error during shutdown:', error);
  }
  
  process.exit(0);
}

// Main function
async function main(): Promise<void> {
  try {
    await connectRedis();
    await startQueueProcessor();
  } catch (error) {
    console.error('Fatal error in main:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  gracefulShutdown('uncaughtException');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown('unhandledRejection');
});

// Start the service
main();
