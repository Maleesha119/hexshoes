import './Ticker.css'

function Ticker() {
  const messages = [
    '◆ FREE SHIPPING OVER $150',
    '◆ NEW DROP — HEX RUNNER 02',
    '◆ VISUAL SEARCH IS LIVE',
  ]

  return (
    <div className="ticker">
      <div className="ticker-track">
        {messages.map((msg, i) => (
          <span key={`a-${i}`}>{msg}</span>
        ))}
        {messages.map((msg, i) => (
          <span key={`b-${i}`}>{msg}</span>
        ))}
      </div>
    </div>
  )
}

export default Ticker