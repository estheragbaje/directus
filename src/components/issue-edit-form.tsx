type IssueEditFormProps = {
  title: string;
  description: string;
  onClickCancel?: () => void;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
};

export function IssueEditForm(props: IssueEditFormProps) {
  const { title, description, onClickCancel, onSubmit } = props;
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          id='title'
          name='title'
          defaultValue={title}
          required
        />
      </div>
      <label htmlFor='description'>Description</label>
      <textarea
        id='description'
        name='description'
        defaultValue={description}
      />
      <div>
        <button type='button' onClick={onClickCancel}>
          cancel
        </button>
        <button type='submit'>save</button>
      </div>
    </form>
  );
}
