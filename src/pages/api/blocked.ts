import { NextApiRequest, NextApiResponse } from 'next';

import { wrapFailure } from '@/server/utils';

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(429);
  return res.json(wrapFailure());
};

export default handler;
