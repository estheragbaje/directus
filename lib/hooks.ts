// React hooks for issue collection in Directus

import { useMutation, useQuery } from 'react-query';
import {
  createIssue,
  deleteIssue,
  getIssues,
  IssueData,
  updateIssue,
} from './directus';
import { QueryClient } from 'react-query';

export const queryClient = new QueryClient();

export function useIssues({ issues }: { issues: IssueData[] }) {
  return useQuery('issues', getIssues, {
    initialData: issues,
  });
}

export function useCreateIssue() {
  return useMutation(createIssue, {
    onSuccess() {
      queryClient.invalidateQueries('issues');
    },
  });
}

export function useUpdateIssue() {
  return useMutation({
    mutationFn: updateIssue,
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
  return useMutation(deleteIssue, {
    onSuccess() {
      queryClient.invalidateQueries('issues');
    },
  });
}
