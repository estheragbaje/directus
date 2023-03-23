import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { Issue } from '@/components/issue';
import { getIssues, IssueData } from '../../lib/directus';
import { useCreateIssue, useIssues } from '../../lib/hooks';
import { IssueCreateForm } from '@/components/issue-create-form';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ issues }: { issues: IssueData[] }) {
  const { data } = useIssues({ issues });

  return (
    <>
      <Head>
        <title>Directus App</title>
        <meta name='description' content='Issue Tracker' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        {data?.map((issue) => (
          <Issue
            id={issue.id}
            key={issue.id}
            title={issue.title}
            description={issue.description}
          />
        ))}
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
