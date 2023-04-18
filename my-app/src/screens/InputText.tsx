import { Button } from "@mui/material"
import { useState } from "react"

const styles = {
  button: {
    width: '10%',
    height: 50,
    fontWeight: 'bold',
    borderRadius: 10,
    fontSize: 18,
    backgroundColor: '#34b7f1',
    borderWidth: 0,
    color: '#fff'
  },
  textarea: {
    width: '60%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0,
    padding: '3px 7px',
    fontSize: 18
  },
  textContainer: {
    display: "flex",
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: '1rem',
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
          placeholder="Message"
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