import React from 'react'
import Speech from 'speak-tts'

type MessageProps = {
  from: string
  message: string
}

export const Message: React.FC<MessageProps> = ({from, message}) => {
 const speech = new Speech() // will throw an exception if not browser supported
if(speech.hasBrowserSupport()) { // returns a boolean
    console.log("speech synthesis supported")
}
  
speech.init({
    volume: 1,
    lang: "en-GB",
    rate: 1,
    pitch: 1,
    voice:'Google UK English Male',
    splitSentences: true,
    })

  const play = (message: string) => {
    speech.speak({
        text: message,
    }).then(() => {
        console.log("Success !")
    }).catch(e => {
        console.error("An error occurred :", e)
    })
}
  return (
    <div>
        <p>From: {from}</p>
        <p>Message: {message}</p>
      <button onClick={()=> play("You recieved a message from " + from +"." + message)}>play</button>
      </div>
  )
}
