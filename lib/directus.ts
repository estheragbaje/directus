import { Directus } from '@directus/sdk';

export type IssueData = {
  title: string;
  description: string;
  id: number;
};

type Collections = {
  issues: IssueData;
};

const directus = new Directus<Collections>(process.env.DIRECUTS_URL);

export async function getDirectus() {
  await directus.auth.static(process.env.DIRECUTS_TOKEN);
  return directus;
}
