import { Directus } from '@directus/sdk';

export type IssueData = {
  title: string;
  description: string;
  id: number;
};

type Collections = {
  issues: IssueData;
};

export async function getDirectus() {
  const directus = new Directus<Collections>(process.env.DIRECTUS_URL!);
  await directus.auth.static(process.env.DIRECTUS_TOKEN!);
  return directus;
}

// CRUD operations for issue collection in Directus
export async function getIssues() {
  const directus = await getDirectus();
  const result = await directus.items('issues').readByQuery({
    limit: -1,
    fields: ['title', 'description', 'id'],
  });
  return result.data;
}

export async function updateIssue(issue: IssueData) {
  const { id, title, description } = issue;
  const directus = await getDirectus();
  return directus.items('issues').updateOne(id, { title, description });
}

export async function deleteIssue(id: number) {
  const directus = await getDirectus();
  return directus.items('issues').deleteOne(id);
}

export async function createIssue(issue: Omit<IssueData, 'id'>) {
  const { title, description } = issue;
  const directus = await getDirectus();
  return directus.items('issues').createOne({ title, description });
}
