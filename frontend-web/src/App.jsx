import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import CartModal from './components/CartModal'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { apiCatalog, apiOrders } from './api'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // carrinho = [{ product, quantity }]
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  // ============================
  // LOAD PRODUCTS FROM API
  // ============================
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await apiCatalog.get('/products')
        setProducts(res.data)
      } catch (err) {
        console.error('Erro ao carregar produtos:', err)
        Swal.fire('Erro', 'Falha ao carregar produtos', 'error')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const handleSelect = (product) => {
    if (product.stock === 0) return

    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)

      if (!existing) {
        return [...prev, { product, quantity: 1 }]
      }

      const maxStock = product.stock ?? Infinity
      if (existing.quantity >= maxStock) return prev

      return prev.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    })
  }

  const handleOpenCart = () => {
    if (selectedCount === 0) return
    setIsCartOpen(true)
  }

  const handleCloseCart = () => {
    setIsCartOpen(false)
  }

  const handleConfirmOrder = async () => {
    if (cartItems.length === 0) return

    setIsSubmitting(true)

    try {
      await apiOrders.post('/orders', {
        items: cartItems.map((c) => ({
          product_id: c.product.id,
          quantity: c.quantity,
        })),
      })

      setCartItems([])
      setIsCartOpen(false)

      Swal.fire({
        title: 'Pedido realizado!',
        text: 'Sua compra foi processada com sucesso.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#22c55e',
        background: '#0f172a',
        color: '#e5e7eb',
      })
    } catch (error) {
      Swal.fire('Erro', 'Falha ao enviar pedido', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading)
    return <h1 style={{ color: 'white', textAlign: 'center' }}>Carregando...</h1>

  return (
    <div className="app-container">
      <Navbar selectedCount={selectedCount} onCartClick={handleOpenCart} />

      <main className="content">
        <h1 className="page-title">Catálogo de Produtos</h1>
        <ProductList products={products} onSelect={handleSelect} />
      </main>

      <CartModal
        isOpen={isCartOpen}
        items={cartItems}
        onClose={handleCloseCart}
        onConfirm={handleConfirmOrder}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}

export default App
