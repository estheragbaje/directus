type IssuePreviewProps = {
  title: string;
  description: string;
  onClickEdit?: () => void;
  onClickDelete?: () => void;
};

export function IssuePreview(props: IssuePreviewProps) {
  const { title, description, onClickEdit, onClickDelete } = props;
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <div>
        <button onClick={onClickEdit}>Edit</button>
        <button onClick={onClickDelete}>Delete</button>
      </div>
    </div>
  );
}
