import './ProductRail.css'
import { products } from '../data/products'
import ProductCard from './ProductCard'

function ProductRail() {
  return (
    <section className="rail-section" id="shop">
      <div className="rail-head">
        <h2>New Drops</h2>
        <p>Managed live from the admin dashboard — restock and pricing update instantly.</p>
      </div>
      <div className="rail">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default ProductRail