import scoringQueue from './scoringQueue';
import { addDelivery } from '../controllers/scoringController';

// Process jobs in the queue
scoringQueue.process(async (job) => {
  const { taskType, data } = job.data;

  try {
    if (taskType === 'addDelivery') {
      console.log('Processing addDelivery task:', data);

      // Mock Express req and res
      const req = { body: data } as any;
      const res = {
        status: (code: number) => ({
          json: (response: any) => console.log(`Response: ${JSON.stringify(response)}`),
        }),
      } as any;

      await addDelivery(req, res);
    } else {
      console.error(`Unknown task type: ${taskType}`);
    }
  } catch (error) {
    console.error('Error processing task:', error);
    throw error; // Allow retries
  }
});

// Log queue events
scoringQueue.on('completed', (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

scoringQueue.on('failed', (job, error) => {
  console.error(`Job ${job.id} failed:`, error);
});
