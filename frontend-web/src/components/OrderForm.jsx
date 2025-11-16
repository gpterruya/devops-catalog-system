import { useState } from 'react'
import { apiOrders } from '../api'

export default function OrderForm({ selected }) {
  const [status, setStatus] = useState('')

  const handleOrder = async () => {
    const total = selected.reduce((acc, p) => acc + p.price, 0)
    const order = { items: selected, total, status: 'pending' }
    await apiOrders.post('/orders', order)
    setStatus('Pedido enviado com sucesso!')
  }

  return (
    <div>
      <h2>Resumo do Pedido</h2>
      {selected.length === 0 ? (
        <p>Nenhum produto selecionado</p>
      ) : (
        <>
          <ul>
            {selected.map(p => (
              <li key={p.id}>{p.name}</li>
            ))}
          </ul>
          <button onClick={handleOrder}>Enviar Pedido</button>
        </>
      )}
      {status && <p>{status}</p>}
    </div>
  )
}
