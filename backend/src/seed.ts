import { db } from './firebase.js'
import { products } from './products.js'

async function seed() {
  for (const product of products) {
    await db.collection('products').doc(product.id).set(product)
    console.log(`Added ${product.name}`)
  }
  console.log('Done seeding products.')
}

seed()