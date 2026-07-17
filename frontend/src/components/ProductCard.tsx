import type { Product } from '../data/products'

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="prod-card">
      <div className="prod-img">🩴</div>
      <div className="prod-info">
        <div className="tag">{product.tag}</div>
        <h3>{product.name}</h3>
        <div className="desc">{product.desc}</div>
        <div className="prod-foot">
          <span className="price">{product.price}</span>
          <span className="add-circle">+</span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard