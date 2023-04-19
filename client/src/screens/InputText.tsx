import { Button } from "@mui/material"
import { useState } from "react"

const styles : any = {
  button: {
    width: '10%',
    height: 50,
    fontWeight: 'bold',
    borderRadius: '40px',
    fontSize: 18,
    backgroundColor: '#34b7f1',
    borderWidth: 0,
    color: '#fff',
    position:'absolute',
    right:'3.5rem',
    padding:'0 4rem'
  },
  textarea: {
    width: '100%',
    height: 50,
    borderRadius: '40px',
    borderWidth: 0,
    padding: '3px 17px',
    fontSize: 18
  },
  textContainer: {
    display: "flex",
    alignItems: 'center',
    paddingTop: '1rem',
    margin:'0 3.25rem'
  }
}

interface InputTextProps {
  addMessage: any;
}

function InputText({ addMessage
}: InputTextProps): JSX.Element {

  const [message, setMessage] = useState('')

  function addAMessage(e : any) {
    e.preventDefault()
    addMessage({
      message
    })
    setMessage('')
  }

  return (
    <form action="" method="" >
      <div style={styles.textContainer} >
        <input
          style={styles.textarea}
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
      </div>
    </form>
  )
}

export default InputText