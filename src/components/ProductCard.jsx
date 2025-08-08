import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCard = ({ 
  product, 
  onAddToCart, 
  className = "col-md-4 col-sm-6 col-xs-8 col-12 mb-4" 
}) => {
  console.log("Rendering ProductCard for:", product);
  const isOutOfStock = product.stock === 0 || product.available === false;
  
  const handleAddToCart = () => {
    if (!isOutOfStock) {
      toast.success("Added to cart");
      onAddToCart(product);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <div className={className}>
      <div className="card text-center h-100 border-0 product-card">
        {/* Product Image */}
        <div className="card-img-container position-relative">
          <img
            className="card-img-top p-3"
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            height={220}
            style={{ objectFit: 'contain' }}
            loading="lazy"
          />
          {isOutOfStock && (
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-light bg-opacity-75">
              <span className="badge bg-danger fs-6">Out of Stock</span>
            </div>
          )}
          {product.rating && (
            <div className="position-absolute top-0 end-0 m-2">
              <span className="badge bg-warning text-dark">
                ⭐ {product.rating.rate}
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title mb-2" title={product.title}>
            {truncateText(product.title, 50)}
          </h5>
          
          <p className="card-text text-muted small flex-grow-1">
            {truncateText(product.description, 90)}
          </p>

          {/* Category Badge */}
          <div className="mb-2">
            <span className="badge bg-secondary text-capitalize">
              {product.category}
            </span>
          </div>

          {/* Variants (if available) */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-3">
              <select 
                className="form-select form-select-sm"
                disabled={isOutOfStock}
                aria-label="Product variants"
              >
                <option value="">Select variant</option>
                {product.variants.map((variant, index) => (
                  <option key={index} value={variant.id || index}>
                    {variant.name} {variant.price && `(+$${variant.price})`}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="card-footer bg-transparent border-0 pt-0">
          <div className="price-section mb-3">
            <h4 className="text-primary mb-0 fw-bold">
              {formatPrice(product.price)}
            </h4>
            {product.originalPrice && product.originalPrice > product.price && (
              <small className="text-muted text-decoration-line-through">
                {formatPrice(product.originalPrice)}
              </small>
            )}
          </div>

          {/* Action Buttons */}
          <div className="d-grid gap-2">
            <div className="btn-group" role="group">
              <Link
                to={`/product/${product.id}`}
                className="btn btn-outline-dark btn-sm"
                style={{ flex: 1 }}
              >
                View Details
              </Link>
              <button
                className={`btn btn-sm ${isOutOfStock ? 'btn-secondary' : 'btn-dark'}`}
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                style={{ flex: 1 }}
              >
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .product-card {
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
          box-shadow: 0 5px 10px rgba(0,0,0,0.1);
        }
        
        .product-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15) !important;
        }
        
        .card-img-container {
          overflow: hidden;
        }
        
        .card-img-top {
          transition: transform 0.3s ease;
        }
        
        .product-card:hover .card-img-top {
          transform: scale(1.03);
        }
        
        @media (max-width: 576px) {
          .btn-group {
            flex-direction: column;
          }
          
          .btn-group .btn {
            border-radius: 0.375rem !important;
            margin-bottom: 0.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductCard;