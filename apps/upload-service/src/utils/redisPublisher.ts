import { publisher } from '..';

export default function RedisPublisher(id: string) {
  publisher.lPush('build-queue', id).then(() => {
    console.log('LPush Completed');
  });

  publisher.hSet('status', id, 'uploaded').then(() => {
    console.log('HSet completed');
  });
}
