import { Session } from '@/vc-util';

const session = new Session()
  .config({
    token: 'token',
    authHeader: 'my-token'
  });

export default session;