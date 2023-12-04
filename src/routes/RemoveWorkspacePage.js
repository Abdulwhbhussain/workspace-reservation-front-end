import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWorkspace, getWorkspaces } from '../redux/workspaces/workspacesSlice';
import styles from '../styles/RemoveWorkspacePage.module.css';

const RemoveWorkspacePage = () => {
  const { token } = useSelector((state) => state.auth);
  const { workspaces, isLoading, error } = useSelector(
    (store) => store.workspaces,
  );
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(null);
  const [fail, setFail] = useState(null);

  useEffect(() => {
    dispatch(getWorkspaces(token));
  }, [dispatch, token]);

  const handleDelete = async (id) => {
    console.log(id);
    const sendData = {
      id,
      token,
    };
    const actionResult = await dispatch(deleteWorkspace(sendData));
    if (actionResult.payload) {
      setSuccess(actionResult.payload.success);
      console.log(actionResult.payload);
    }
    if (actionResult.payload.error) {
      setFail(actionResult.payload.error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess(null);
      setFail(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [success, fail]);

  if (isLoading) {
    return <div>Loading......</div>;
  }
  if (error) {
    return (
      <p>
        Something went wrong!
        <br />
        {error}
      </p>
    );
  }

  return (
    <div className={styles.page}>
      <p>List workspaces with a delete button</p>
      {success && <p>{success}</p>}
      {fail && <p>{fail}</p>}
      <ul>
        {workspaces.map((space) => (
          <li key={space.id}>
            <p>{space.name}</p>
            <img alt={`${space.name}`} src={space.image_url} />
            <button
              type="button"
              onClick={() => {
                handleDelete(space.id);
              }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RemoveWorkspacePage;
