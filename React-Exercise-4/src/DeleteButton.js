import { EuiIcon } from '@elastic/eui';

const DeleteButton = ({ handleDelete, rowIndex }) => {
  return (
    <>
      <EuiIcon type="trash" size="s" onClick={() => handleDelete(rowIndex)} />
    </>
  )
}
export default DeleteButton