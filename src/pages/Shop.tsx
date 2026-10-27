import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import './Shop.css'

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  
  const categoryFilter = searchParams.get('category') || 'all'
  const brandFilter = searchParams.get('brand') || 'all'
  const sortBy = searchParams.get('sort') || 'newest'
  const minPrice = searchParams.get('minPrice') || ''
  const maxPrice = searchParams.get('maxPrice') || ''
  
  const [priceRange, setPriceRange] = useState({ min: minPrice, max: maxPrice })

  const categories = ['all', 'smartphones', 'laptops', 'cameras', 'accessories', 'audio', 'smart-devices']
  const brands = ['all', ...Array.from(new Set(products.map(p => p.brand)))]

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products]

    if (categoryFilter !== 'all') {
      result = result.filter(p => p.category === categoryFilter)
    }

    if (brandFilter !== 'all') {
      result = result.filter(p => p.brand === brandFilter)
    }

    if (priceRange.min) {
      result = result.filter(p => p.price >= Number(priceRange.min))
    }
    if (priceRange.max) {
      result = result.filter(p => p.price <= Number(priceRange.max))
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
    }

    return result
  }, [categoryFilter, brandFilter, sortBy, priceRange])

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (value === 'all' || value === '') {
      newParams.delete(key)
    } else {
      newParams.set(key, value)
    }
    setSearchParams(newParams)
  }

  const applyPriceFilter = () => {
    const newParams = new URLSearchParams(searchParams)
    if (priceRange.min) {
      newParams.set('minPrice', priceRange.min)
    } else {
      newParams.delete('minPrice')
    }
    if (priceRange.max) {
      newParams.set('maxPrice', priceRange.max)
    } else {
      newParams.delete('maxPrice')
    }
    setSearchParams(newParams)
  }

  const clearAllFilters = () => {
    setSearchParams({})
    setPriceRange({ min: '', max: '' })
  }

  const hasActiveFilters = categoryFilter !== 'all' || brandFilter !== 'all' || minPrice || maxPrice

  return (
    <div className="shop">
      <section className="shop-header">
        <div className="container">
          <div className="shop-header-content">
            <span className="section-label">Shop</span>
            <h1 className="shop-title">Our Collection</h1>
            <p className="shop-subtitle">Discover premium electronics crafted for excellence</p>
          </div>
        </div>
      </section>

      <section className="shop-content">
        <div className="container">
          <div className="shop-toolbar">
            <button className="filters-toggle" onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal size={18} />
              Filters
              {hasActiveFilters && <span className="filters-badge"></span>}
            </button>
            <div className="shop-info">
              <span className="product-count">{filteredAndSortedProducts.length} Products</span>
            </div>
            <select 
              className="sort-select"
              value={sortBy}
              onChange={(e) => updateFilter('sort', e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          <div className="shop-layout">
            <aside className={`shop-filters ${showFilters ? 'active' : ''}`}>
              <div className="filters-header">
                <h3>Filters</h3>
                <button onClick={() => setShowFilters(false)} className="filters-close">
                  <X size={20} />
                </button>
              </div>

              {hasActiveFilters && (
                <button onClick={clearAllFilters} className="clear-filters">
                  Clear All
                </button>
              )}

              <div className="filter-group">
                <h4 className="filter-group-title">Category</h4>
                <div className="filter-options">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      className={`filter-option ${categoryFilter === cat ? 'active' : ''}`}
                      onClick={() => updateFilter('category', cat)}
                    >
                      {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4 className="filter-group-title">Brand</h4>
                <div className="filter-options">
                  {brands.map(brand => (
                    <button
                      key={brand}
                      className={`filter-option ${brandFilter === brand ? 'active' : ''}`}
                      onClick={() => updateFilter('brand', brand)}
                    >
                      {brand === 'all' ? 'All Brands' : brand}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4 className="filter-group-title">Price Range</h4>
                <div className="price-inputs">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    className="price-input"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    className="price-input"
                  />
                </div>
                <button onClick={applyPriceFilter} className="price-apply-btn">
                  Apply
                </button>
              </div>
            </aside>

            <main className="shop-main">
              {filteredAndSortedProducts.length === 0 ? (
                <div className="empty-state">
                  <h3>No products found</h3>
                  <p>Try adjusting your filters</p>
                  <button onClick={clearAllFilters} className="btn btn-primary">
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="products-grid">
                  {filteredAndSortedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Shop
