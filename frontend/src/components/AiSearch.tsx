import { useState } from 'react'
import './AiSearch.css'

function AiSearch() {
  const [fileName, setFileName] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    setShowResults(false)
    setTimeout(() => setShowResults(true), 900)
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
              {fileName ? `Analyzing ${fileName}…` : 'Drop a photo, or click to upload'}
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

          {showResults && (
            <div className="results">
              <div className="result-tile">🩴<span className="score">96.2%</span></div>
              <div className="result-tile">🩴<span className="score">91.5%</span></div>
              <div className="result-tile">🩴<span className="score">88.7%</span></div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default AiSearch