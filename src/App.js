import React, { useEffect, useState } from 'react'
import Form from './Form'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  

  const fetchUsers = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((result) => {
        setUsers(result);
        setIsLoading(false);
      })
      .catch((error) => {
        setHasError(true);
        setIsLoading(false);
        setErrorMessage(error.message)
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='App'>
      <h1>Random Users</h1>
      <Form userId={id} editTitle={title} editBody={body} />
      <br />
      <br />
      {hasError ? <p>{errorMessage}</p> : null}
      {!isLoading ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Body</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {users.map(({ id, title, body }) => (
            <>
              <tr key={id}>
                <td>{title}</td>
                <td>{body}</td>
                <td>
                <button
                  onClick={(e) => { e.preventDefault()
                    setId(id);
                    setTitle(title);
                    setBody(body);
                  }}
                >
                  Edit
                </button>
                </td>                
              </tr>
            </>
          ))}
          </tbody>
        </table>
      ) : (
        <h3>loading...</h3>
      )}
    </div>
  )
}

export default App
