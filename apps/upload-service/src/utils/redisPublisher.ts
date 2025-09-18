import { publisher } from '..';

export default async function RedisPublisher(id: string): Promise<void> {
  await publisher.lPush('build-queue', id);
  console.log('LPush Completed');

  await publisher.hSet('status', id, 'uploaded');
  console.log('HSet completed');
}
