// import { useEffect, useState } from 'react'
// import { apiCatalog } from '../api'

function ProductList({ products, onSelect }) {
  return (
    <section id="catalog" className="product-list">
      {products.map((product) => {
        const outOfStock = product.stock === 0

        return (
          <article key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />

            <div className="product-info">
              <h2 className="product-name">{product.name}</h2>

              {product.description && (
                <p className="product-description">{product.description}</p>
              )}

              <p className="product-stock">
                {outOfStock ? (
                  <span className="stock-out">Indisponível</span>
                ) : (
                  <>Em estoque: {product.stock}</>
                )}
              </p>

              <div className="product-footer">
                <span className="product-price">
                  R$ {product.price.toFixed(2)}
                </span>

                <button
                  type="button"
                  className={`add-button ${outOfStock ? 'disabled' : ''}`}
                  disabled={outOfStock}
                  onClick={() => !outOfStock && onSelect(product)}
                >
                  {outOfStock ? 'Indisponível' : 'Adicionar'}
                </button>
              </div>
            </div>
          </article>
        )
      })}
    </section>
  )
}

export default ProductList
