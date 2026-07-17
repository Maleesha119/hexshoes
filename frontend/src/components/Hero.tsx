import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-badge">FW26 Collection — Live now</span>
        <h1 className="hero-title">
          Built<br />for the<br /><span className="outline">grid.</span>
        </h1>
        <p className="hero-text">
          Six-sided design thinking applied to footwear. Precision-cut uppers,
          honest materials, an AI stylist that finds your next pair before you scroll.
        </p>
        <div className="hero-ctas">
          <a href="#shop" className="btn btn-solid">Shop New Drops</a>
          <a href="#ai-search" className="btn btn-ghost">Find my shoe →</a>
        </div>
      </div>
    </section>
  )
}

export default Hero