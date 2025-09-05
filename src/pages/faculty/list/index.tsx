import { DataTable } from '../components/data-table'
import { columns } from '../components/columns'
import { products as initialProducts } from '../data/products'
import { useCallback, useState, useEffect } from 'react'
import { Product } from '../data/schema'
import { fetchProducts } from '@/lib/products'

export default function SettingsProfile() {
  const [productsData, setProductsData] = useState<Product[]>(initialProducts)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch products from API on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const apiProducts = await fetchProducts()
        
        if (apiProducts.length > 0) {
          setProductsData(apiProducts)
        } else {
          // If API returns empty array, keep using dummy data as fallback
          console.warn('API returned no faculties, using dummy data as fallback')
        }
      } catch (err) {
        console.error('Failed to fetch faculties from API:', err)
        setError('Failed to load faculties from API')
        // Keep using dummy data as fallback
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const editProduct = (id: number, updatedProduct: Partial<Product>) => {
    setProductsData(productsData.map(product =>
      product.id === id ? { ...product, ...updatedProduct } : product
    ))
  }

  const deleteProduct = (id: number) => {
    setProductsData(productsData.filter(product => product.id !== id))
  }

  const copyProduct = (id: number) => {
    const productToCopy = productsData.find(product => product.id === id)
    if (productToCopy) {
      const newProduct = {
        ...productToCopy,
        id: Math.max(...productsData.map(p => p.id)) + 1,
        general: { ...productToCopy.general, name: `Copy of ${productToCopy.general.name}` }
      }
      setProductsData([...productsData, newProduct])
    }
  }

  const favoriteProduct = (id: number) => {
    // Implement favorite logic here
    console.log(`Product ${id} favorited`)
  }

  const labelProduct = (id: number, label: string) => {
    setProductsData(productsData.map(product =>
      product.id === id ? { ...product, general: { ...product.general, category: label } } : product
    ))
  }
  const [compareProducts, setCompareProducts] = useState<Product[]>([])

  const compareProduct = useCallback((product: Product) => {
    setCompareProducts((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product].slice(-2)
    )
  }, [])
  const resetCompareProducts = () => {
    setCompareProducts([])
  }
  console.log("compareProducts",compareProducts)
  const productColumns = columns({
    editProduct,
    deleteProduct,
    copyProduct,
    favoriteProduct,
    labelProduct,
    compareProduct,
  })

  return (
    <>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Faculty Members</h2>
          <p className='text-muted-foreground'>
            {loading ? 'Loading faculties...' : `Here's a list of your faculties (${productsData.length} items)`}
          </p>
          {error && (
            <p className='text-red-500 text-sm mt-1'>
              {error} - Showing dummy data as fallback
            </p>
          )}
        </div>
      </div>
      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2 text-sm text-muted-foreground">Loading faculties...</p>
            </div>
          </div>
        ) : (
          <DataTable
            data={productsData}
            columns={productColumns}
            compareProducts={compareProducts}
            onCompare={compareProduct}
            onResetCompare={resetCompareProducts}
          />
        )}
      </div>
    </>
  )
}


