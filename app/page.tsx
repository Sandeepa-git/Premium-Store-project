"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductViewer3D } from "@/components/product-viewer-3d"
import { ProductDetails } from "@/components/product-details"

export default function Home() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* 3D Product Viewer */}
            <div className="flex flex-col gap-4">
              <div className="rounded-lg overflow-hidden shadow-lg border border-border">
                <ProductViewer3D />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Drag to rotate • Scroll to zoom • Interactive 3D view
              </p>
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              <ProductDetails />
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-lg bg-card border border-border">
              <div className="text-3xl mb-2">🛡️</div>
              <h3 className="font-semibold text-foreground mb-1">Secure Payment</h3>
              <p className="text-sm text-muted-foreground">Protected by eBay Buyer Protection</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card border border-border">
              <div className="text-3xl mb-2">🚚</div>
              <h3 className="font-semibold text-foreground mb-1">Fast Shipping</h3>
              <p className="text-sm text-muted-foreground">Ships within 2-3 business days</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card border border-border">
              <div className="text-3xl mb-2">⭐</div>
              <h3 className="font-semibold text-foreground mb-1">Trusted Seller</h3>
              <p className="text-sm text-muted-foreground">100% positive feedback rating</p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  )
}
