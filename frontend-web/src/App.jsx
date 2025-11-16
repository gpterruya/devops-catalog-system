import { useState } from 'react'
import ProductList from './components/ProductList'
import OrderForm from './components/OrderForm'

function App() {
  const [selected, setSelected] = useState([])

  const handleSelect = (product) => {
    setSelected([...selected, product])
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🛒 Loja Online</h1>
      <ProductList onSelect={handleSelect} />
      <OrderForm selected={selected} />
    </div>
  )
}

export default App
