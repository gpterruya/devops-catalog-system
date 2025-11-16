import { useState } from 'react'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import CartModal from './components/CartModal'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const PLACEHOLDER_IMAGE =
  'https://www.gsuplementos.com.br/upload/growth-layout-personalizado/produto/185/produto-selo-topo-new-v3.png'

const PRODUCTS = [
  {
    id: 1,
    name: 'Notebook DevOps Pro',
    description: 'Notebook de alta performance para desenvolvimento e pipelines CI/CD.',
    price: 5999.9,
    stock: 4,
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 2,
    name: 'Curso Kubernetes Essentials',
    description: 'Aprenda os fundamentos de orquestração de containers.',
    price: 399.9,
    stock: 12,
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 3,
    name: 'Livro - Observabilidade na Prática',
    description: 'Guia completo de logs, métricas, tracing e boas práticas.',
    price: 129.9,
    stock: 0, // indisponível
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 4,
    name: 'Ferramenta de CI/CD - Licença Anual',
    description: 'Pipeline automatizado para testes, builds e deploy.',
    price: 999.9,
    stock: 6,
    image: PLACEHOLDER_IMAGE,
  },
]

function App() {
  // carrinho = [{ product, quantity }]
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  )

  const handleSelect = (product) => {
    if (product.stock === 0) return

    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)

      if (!existing) {
        return [...prev, { product, quantity: 1 }]
      }

      const currentQuantity = existing.quantity
      const maxStock = product.stock ?? Infinity

      if (currentQuantity >= maxStock) {
        return prev
      }

      return prev.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
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

    // mock de chamada para /api/orders
    setTimeout(() => {
      setIsSubmitting(false)
      setCartItems([])
      setIsCartOpen(false)

      Swal.fire({
        title: 'Pedido realizado!',
        text: 'Sua compra foi finalizada com sucesso (mock).',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#22c55e',
        background: '#0f172a',
        color: '#e5e7eb',
      })
    }, 800)
  }

  return (
    <div className="app-container">
      <Navbar
        selectedCount={selectedCount}
        onCartClick={handleOpenCart}
      />

      <main className="content">
        <h1 className="page-title">Catálogo de Produtos</h1>
        <ProductList products={PRODUCTS} onSelect={handleSelect} />
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
