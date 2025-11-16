function Navbar({ selectedCount, onCartClick }) {
  const isEmpty = selectedCount === 0

  return (
    <header className="navbar">
      <div className="navbar-left">
        <span className="logo">DevOps Catalog</span>
      </div>

      <nav className="navbar-links">
        <a href="#catalog">Catálogo</a>
        <a href="#about">Sobre</a>
      </nav>

      <div className="navbar-right">
        <button
          className={`cart-button ${isEmpty ? 'empty' : ''}`}
          type="button"
          onClick={onCartClick}
          disabled={isEmpty}
        >
          🛒 Itens selecionados: <strong>{selectedCount}</strong>
        </button>
      </div>
    </header>
  )
}

export default Navbar
