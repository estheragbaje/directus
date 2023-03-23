import type { NextApiRequest, NextApiResponse } from 'next';
import {
  createIssue,
  deleteIssue,
  getIssues,
  updateIssue,
} from '../../../lib/directus';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      const issues = await getIssues();
      res.status(200).json(issues);
      return;
    case 'POST':
      const newIssue = await createIssue(req.body);
      res.status(200).json(newIssue);
      return;
    case 'PUT':
      const updatedIssue = await updateIssue(req.body);
      res.status(200).json(updatedIssue);
      return;
    case 'DELETE':
      await deleteIssue(req.body.id);
      res.status(200).json({ success: true });
      return;
    default:
      break;
  }
}
