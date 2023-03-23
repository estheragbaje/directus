type IssuePreviewProps = {
  title: string;
  description: string;
  onClickEdit?: () => void;
  onClickDelete?: () => void;
};

export function IssuePreview(props: IssuePreviewProps) {
  const { title, description, onClickEdit, onClickDelete } = props;
  return (
    <div style={{ width: '100%' }}>
      <h2>{title}</h2>
      <p>{description}</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={onClickEdit}>Edit</button>
        <button onClick={onClickDelete}>Delete</button>
      </div>
    </div>
  );
}
