function CartModal({ isOpen, items, onClose, onConfirm, isSubmitting }) {
  if (!isOpen) return null

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  )

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <header className="modal-header">
          <h2>Seu carrinho</h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
          >
            ✕
          </button>
        </header>

        <div className="modal-body">
          {items.length === 0 ? (
            <p>Seu carrinho está vazio.</p>
          ) : (
            <ul className="cart-list">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="cart-item">
                  <div>
                    <strong>{product.name}</strong>
                    <div className="cart-item-sub">
                      <span>Qtd: {quantity}</span>
                      <span>Preço: R$ {product.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="cart-item-subtotal">
                    Subtotal: R$ {(product.price * quantity).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="modal-footer">
          <div className="cart-total">
            <span>Total:</span>
            <strong>R$ {total.toFixed(2)}</strong>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Fechar
            </button>
            <button
              type="button"
              className="primary-button"
              onClick={onConfirm}
              disabled={items.length === 0 || isSubmitting}
            >
              {isSubmitting ? 'Finalizando...' : 'Finalizar compra (mock)'}
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default CartModal
