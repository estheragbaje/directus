import { Issue } from '@/components/issue';
import { IssueCreateForm } from '@/components/issue-create-form';
import styles from '@/styles/Home.module.css';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { getIssues, IssueData } from '../../lib/directus';
import { useCreateIssue, useIssues } from '../../lib/hooks';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ issues }: { issues: IssueData[] }) {
  const { data } = useIssues({ issues });
  const createMutation = useCreateIssue();

  return (
    <>
      <Head>
        <title>Directus App</title>
        <meta name='description' content='Issue Tracker' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={`${inter.className} ${styles.main}`}>
        <div style={{ width: '100%' }}>
          <h1 className={styles.h1}>Github Issue Tracker</h1>
          <div className={styles.content}>
            <div className={styles.grid}>
              {data?.map((issue) => (
                <Issue
                  id={issue.id}
                  key={issue.id}
                  title={issue.title}
                  description={issue.description}
                />
              ))}
            </div>

            <div>
              <IssueCreateForm
                onSubmit={(event) => {
                  event.preventDefault();

                  const formData = new FormData(event.currentTarget);
                  const title = formData.get('title')?.toString();
                  const description = formData.get('description')?.toString();

                  if (!title || !description) return;
                  createMutation.mutate({ title, description });
                  event.currentTarget.reset();
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      issues: await getIssues(),
    },
  };
};
