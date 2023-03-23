import { useState } from 'react';
import styles from '@/styles/Home.module.css';
import { IssueData } from '../../lib/directus';
import { IssueEditForm } from './issue-edit-form';
import { IssuePreview } from './issue-preview';

type IssueProps = IssueData & {
  isEditing?: boolean;
};

export function Issue(props: IssueProps) {
  const { title, description, id, ...rest } = props;
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={styles.card} {...rest}>
      {isEditing ? (
        <IssueEditForm
          title={title}
          description={description}
          onClickCancel={() => setIsEditing(false)}
          onSubmit={async (event) => {
            event.preventDefault();

            const formData = new FormData(event.currentTarget);
            const title = formData.get('title')?.toString();
            const description = formData.get('description')?.toString();

            if (!title || !description) return;
          }}
        />
      ) : (
        <IssuePreview
          title={title}
          description={description}
          onClickEdit={() => setIsEditing(true)}
          onClickDelete={() => {}}
        />
      )}
    </div>
  );
}
