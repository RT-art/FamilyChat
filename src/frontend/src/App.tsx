import './App.css'
import { useState } from 'react'

function App() {
  // チャットメッセージを管理
  const [messages, setMessages] = useState([
    { text: "あなたのお名前を教えてください。", isBot: true }
  ])

  // 入力中のメッセージを管理
  const [currentMessage, setCurrentMessage] = useState('')
  
  // 質問ステップを管理
  const [step, setStep] = useState(0)

  // メッセージ送信の処理
  const sendMessage = () => {
    if (currentMessage.trim() === '') return

    // ユーザーの回答を追加
    const newMessages = [...messages, { text: currentMessage, isBot: false }]

    // 次の質問を決定
    let nextQuestion = ''
    
    switch(step) {
      case 0:
        nextQuestion = "生年月日を教えてください。（例：2000年1月1日）"
        break
      case 1:
        nextQuestion = "お父様のお名前を教えてください。"
        break
      case 2:
        nextQuestion = "お母様のお名前を教えてください。"
        break
      case 3:
        nextQuestion = "入力ありがとうございました。家系図を作成しますか？（はい/いいえ）"
        break
    }

    if (nextQuestion) {
      newMessages.push({ text: nextQuestion, isBot: true })
    }

    setMessages(newMessages)
    setCurrentMessage('')
    setStep(step + 1)
  }

  return (
    <div className="chat-container">
      <div className="message-area">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.isBot ? 'bot-message' : 'user-message'}`}
          >
            {message.text}
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendMessage()
            }
          }}
          placeholder="メッセージを入力..."
        />
        <button onClick={sendMessage}>送信</button>
      </div>
    </div>
  )
}

export default App