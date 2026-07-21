import { useState } from 'react'
import './AiSearch.css'

interface Match {
  filename: string
  score: number
}

function AiSearch() {
  const [fileName, setFileName] = useState<string | null>(null)
  const [results, setResults] = useState<Match[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setResults(null)
    setError(null)
    setLoading(true)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('http://127.0.0.1:8000/search', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Server responded with an error')
      }

      const data = await response.json()
      setResults(data.matches)
    } catch (err) {
      setError('Could not reach the AI search service. Is the server running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="ai-section" id="ai-search">
      <div className="ai-grid">
        <div className="ai-copy">
          <span className="ai-badge">Applied ML feature</span>
          <h2>Find your<br />shoe by photo.</h2>
          <p>
            Upload any shoe photo — the model finds the closest visual
            matches in the hexshoes catalog, ranked by similarity.
          </p>
          <div className="ai-steps">
            <div className="ai-step"><span className="n">01</span> Image converted to a feature embedding (CLIP/ResNet)</div>
            <div className="ai-step"><span className="n">02</span> Compared against the full catalog by cosine similarity</div>
            <div className="ai-step"><span className="n">03</span> Closest matches returned, ranked by score</div>
          </div>
        </div>

        <div className="demo-box">
          <label className="drop-zone" htmlFor="file-input">
            <span className="lbl">
              {loading
                ? `Analyzing ${fileName}…`
                : fileName
                ? `Last upload: ${fileName}`
                : 'Drop a photo, or click to upload'}
            </span>
            <span className="sub">JPG or PNG</span>
            <input
              type="file"
              id="file-input"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </label>

          {error && <p className="error-msg">{error}</p>}

          {results && (
            <div className="results">
              {results.map((match) => (
                <div className="result-tile" key={match.filename}>
                  🩴
                  <span className="score">{(match.score * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default AiSearch