// React hooks for issue collection in Directus

import { QueryClient, useMutation, useQuery } from 'react-query';
import { IssueData } from './directus';

export const queryClient = new QueryClient();

export function useIssues({ issues }: { issues: IssueData[] }) {
  return useQuery(
    'issues',
    async () => {
      const res = await fetch('http://localhost:3001/api/issue');
      return res.json() as Promise<IssueData[]>;
    },
    {
      initialData: issues,
    }
  );
}

export function useCreateIssue() {
  return useMutation(
    async (issue: Omit<IssueData, 'id'>) => {
      const res = await fetch('http://localhost:3001/api/issue', {
        method: 'POST',
        body: JSON.stringify(issue),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res.json();
    },
    {
      onSuccess() {
        queryClient.invalidateQueries('issues');
      },
    }
  );
}

export function useUpdateIssue() {
  return useMutation({
    mutationFn: async (issue: IssueData) => {
      const res = await fetch('http://localhost:3001/api/issue', {
        method: 'PUT',
        body: JSON.stringify(issue),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res.json() as Promise<IssueData>;
    },
    onSuccess: (data) => {
      const issues = queryClient.getQueryData<IssueData[]>('issues') ?? [];
      const newIssues = issues.map((issue) => {
        if (issue.id === data?.id) return data;
        return issue;
      });
      queryClient.setQueryData('issues', newIssues);
    },
  });
}

export function useDeleteIssue() {
  return useMutation(
    async (id: string) => {
      const res = await fetch('http://localhost:3001/api/issue', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res.json();
    },
    {
      onSuccess() {
        queryClient.invalidateQueries('issues');
      },
    }
  );
}
