import { useEffect, useState } from 'react'
import { apiCatalog } from '../api'

export default function ProductList({ onSelect }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    apiCatalog.get('/products').then(res => setProducts(res.data))
  }, [])

  return (
    <div>
      <h2>Catálogo de Produtos</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            <strong>{p.name}</strong> — R$ {p.price.toFixed(2)}
            <button onClick={() => onSelect(p)}>Adicionar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
