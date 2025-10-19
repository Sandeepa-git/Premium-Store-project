"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckoutDialog } from "@/components/checkout-dialog"

interface ProductDetailsProps {
  onCheckout?: () => void
}

export function ProductDetails({ onCheckout }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  const product = {
    name: "Premium Smartphone Pro Max",
    price: 899.99,
    originalPrice: 1099.99,
    rating: 4.9,
    reviews: 2847,
    inStock: true,
    description:
      "Experience cutting-edge technology with our Premium Smartphone Pro Max. Featuring a stunning 6.7-inch AMOLED display, advanced triple camera system, and lightning-fast 5G connectivity. Engineered for performance and designed for excellence.",
    features: [
      "6.7-inch AMOLED display with 120Hz refresh rate",
      "Advanced triple camera system (48MP + 12MP + 12MP)",
      "5G connectivity with WiFi 6E",
      "All-day battery life with fast charging",
      "IP68 water and dust resistance",
      "Premium aluminum and glass design",
      "Wireless charging and reverse wireless charging",
      "Advanced facial recognition and fingerprint sensor",
    ],
    specifications: {
      Display: "6.7-inch AMOLED, 120Hz",
      Processor: "Latest Gen Flagship Chip",
      RAM: "12GB LPDDR5",
      Storage: "256GB UFS 4.0",
      Battery: "4500mAh with 65W charging",
      Camera: "48MP + 12MP + 12MP",
      Weight: "215g",
      Colors: "Midnight Black, Silver, Gold",
    },
  }

  const handleCheckoutClick = () => setCheckoutOpen(true)

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">{product.name}</h1>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1">
            <div className="flex text-accent">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? "text-accent" : "text-muted"}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs sm:text-sm text-muted-foreground ml-2">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <Card className="p-4 sm:p-6 bg-card border border-border">
        <div className="flex flex-col sm:flex-row items-baseline gap-2 sm:gap-3 mb-4 flex-wrap">
          <span className="text-2xl sm:text-4xl font-bold text-primary">${product.price}</span>
          <span className="text-sm sm:text-xl text-muted-foreground line-through">${product.originalPrice}</span>
          <span className="text-xs sm:text-sm font-semibold text-accent bg-accent/10 px-2 sm:px-3 py-1 rounded-full">
            Save 18%
          </span>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground mb-0">
          {product.inStock ? (
            <span className="text-green-600 dark:text-green-400 font-semibold">
              ✓ In Stock - Ships within 1-2 business days
            </span>
          ) : (
            <span className="text-destructive font-semibold">Out of Stock</span>
          )}
        </p>
      </Card>

      {/* Description */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2">About This Product</h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{product.description}</p>
      </div>

      {/* Features */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-3">Key Features</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
          {product.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm sm:text-base text-muted-foreground">
              <span className="text-accent mt-1">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Specifications */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-3">Specifications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div key={key} className="border-b border-border pb-2">
              <p className="text-sm sm:text-base text-muted-foreground">{key}</p>
              <p className="font-semibold text-foreground">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quantity & CTA */}
      <Card className="p-4 sm:p-6 bg-card border border-border space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <label className="text-sm sm:text-base font-semibold text-foreground">Quantity:</label>
          <div className="flex items-center border border-border rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2 text-foreground hover:bg-secondary transition-colors"
            >
              −
            </button>
            <span className="px-4 py-2 font-semibold text-foreground">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-2 text-foreground hover:bg-secondary transition-colors"
            >
              +
            </button>
          </div>
        </div>

        <Button
          onClick={handleCheckoutClick}
          className="w-full bg-primary text-primary-foreground hover:opacity-90 py-4 sm:py-6 text-lg sm:text-xl font-semibold rounded-lg transition-all"
        >
          Proceed to eBay Checkout
        </Button>

        <p className="text-xs sm:text-sm text-center text-muted-foreground">
          You will be redirected to eBay to complete your purchase securely
        </p>
      </Card>

      <CheckoutDialog
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        productName={product.name}
        price={product.price}
        quantity={quantity}
      />
    </div>
  )
}
