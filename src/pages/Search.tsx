import { useState, useMemo } from 'react'
import { Search as SearchIcon } from 'lucide-react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import './Search.css'

const Search = () => {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return products.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div className="search-page">
      <div className="container">
        <div className="search-header">
          <h1 className="search-title">Search Products</h1>
          <div className="search-input-wrapper">
            <SearchIcon size={20} />
            <input
              type="text"
              placeholder="Search for products, brands, categories..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
              autoFocus
            />
          </div>
        </div>

        <div className="search-results">
          {query.trim() === '' ? (
            <div className="search-empty">
              <SearchIcon size={48} />
              <p>Start typing to search our catalog</p>
            </div>
          ) : results.length === 0 ? (
            <div className="search-empty">
              <p>No products found for "{query}"</p>
            </div>
          ) : (
            <>
              <p className="search-results-count">{results.length} {results.length === 1 ? 'result' : 'results'} found</p>
              <div className="search-grid">
                {results.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Search
