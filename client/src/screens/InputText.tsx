import { Button } from "@mui/material"
import { useState } from "react"

// Variable for set styles for Input field.
const styles: any = {
  form: {
    background: 'rgba(0,0,0,0.15)',
    padding: '0.25rem',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    height: '3rem',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#34b7f1',
    border: 'none',
    borderRadius: '40px',
    padding: '0 1rem',
    margin: '0.25rem',
    outline: 'none',
    color: '#fff',
  },
  input: {
    border: 'none',
    padding: '0 1rem',
    flexGrow: '1',
    borderRadius: '2rem',
    margin: '0.25rem',
  }
}

interface InputTextProps {
  addMessage: any;
}

function InputText({ addMessage
}: InputTextProps): JSX.Element {

  const [message, setMessage] = useState('')

  // Method for send message to parent
  function addAMessage(e: any) {
    e.preventDefault()
    addMessage({
      message
    })
    setMessage('')
  }

  return (
    <form action="" method="" style={styles.form} >
      <input
        style={styles.input}
        placeholder="Type a message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      >
      </input>
      <Button
        onClick={(e) => addAMessage(e)}
        disabled={message.length > 0 ? false : true}
        style={styles.button}
        type="submit"
      >
        ENTER
      </Button>
    </form>
  )
}

export default InputText