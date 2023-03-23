type IssueCreateFormProps = {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
};

export function IssueCreateForm(props: IssueCreateFormProps) {
  const { onSubmit } = props;
  return (
    <form onSubmit={onSubmit}>
      <h2>Create new issue</h2>
      <div>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' name='title' required />
      </div>
      <label htmlFor='description'>Description</label>
      <textarea id='description' name='description' />
      <div>
        <button type='submit'>Create new issue</button>
      </div>
    </form>
  );
}
