import { useState } from 'react';
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
    <div {...rest}>
      {isEditing ? (
        <IssueEditForm
          title={title}
          description={description}
          onClickCancel={() => setIsEditing(false)}
          onSubmit={async (event) => {
            event.preventDefault();
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
