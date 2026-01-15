import { useState, useEffect } from 'react'
import Card from './Card'
import styles from '../styles/ProductGrid.module.css'

const PRODUCTS_PER_PAGE = 20

const getVisiblePages = (current, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages = [1]
  if (current > 4) pages.push('...')

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (current < total - 3) pages.push('...')
  if (total > 1) pages.push(total)

  return pages
}

const ProductGrid = ({ products, onSelect, resetKey }) => {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(products.length / PRODUCTS_PER_PAGE))

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [totalPages, page])

  // Reset page when parent signals (e.g., filters changed)
  useEffect(() => {
    if (typeof resetKey !== 'undefined') setPage(1)
  }, [resetKey])

  const start = (page - 1) * PRODUCTS_PER_PAGE
  const pageProducts = products.slice(start, start + PRODUCTS_PER_PAGE)

  return (
    <>
      <div className={styles.grid}>
        {pageProducts.map((product) => (
          <Card
            key={product.id}
            product={product}
            onClick={() => onSelect(product)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            type="button"
            className={styles.pageButton}
            onClick={(e) => { e.preventDefault(); setPage((p) => Math.max(1, p - 1)); window.scrollTo(0, 0); }}
            aria-label="Página anterior"
            disabled={page === 1}
          >
            «
          </button>

          {getVisiblePages(page, totalPages).map((p, idx) => (
            p === '...' ? (
              <span key={`ellipsis-${idx}`} className={styles.ellipsis}>...</span>
            ) : (
              <button
                key={p}
                type="button"
                aria-label={`Ir a página ${p}`}
                className={page === p ? `${styles.pageButton} ${styles.pageButtonActive}` : styles.pageButton}
                onClick={(e) => { e.preventDefault(); setPage(p); window.scrollTo(0, 0); }}
                aria-current={page === p ? 'page' : undefined}
              >
                {p}
              </button>
            )
          ))}

          <button
            type="button"
            className={styles.pageButton}
            onClick={(e) => { e.preventDefault(); setPage((p) => Math.min(totalPages, p + 1)); window.scrollTo(0, 0); }}
            aria-label="Página siguiente"
            disabled={page === totalPages}
          >
            »
          </button>
        </div>
      )}
    </>
  )
}
export default ProductGrid
