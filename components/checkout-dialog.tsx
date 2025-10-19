"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"

interface CheckoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  productName: string
  price: number
  quantity: number
}

type CheckoutState = "idle" | "loading" | "success" | "error"

export function CheckoutDialog({ open, onOpenChange, productName, price, quantity }: CheckoutDialogProps) {
  const [state, setState] = useState<CheckoutState>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [orderData, setOrderData] = useState<any>(null)

  const total = (price * quantity).toFixed(2)

  const handleCheckout = async () => {
    setState("loading")
    setErrorMessage("")

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName, price, quantity }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Checkout failed")
      }

      setOrderData(data.orderData)
      setState("success")

      // Redirect to eBay after 2 seconds
      setTimeout(() => {
        window.open(data.redirectUrl, "_blank")
        onOpenChange(false)
        setState("idle")
      }, 2000)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "An error occurred")
      setState("error")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-full sm:max-w-md p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Order Summary</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
            Review your order before proceeding to payment
          </DialogDescription>
        </DialogHeader>

        {state === "idle" && (
          <div className="space-y-4">
            <div className="space-y-3 rounded-lg bg-secondary/50 p-4">
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-muted-foreground">Product:</span>
                <span className="font-medium text-foreground">{productName}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-muted-foreground">Unit Price:</span>
                <span className="font-medium text-foreground">${price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-muted-foreground">Quantity:</span>
                <span className="font-medium text-foreground">{quantity}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-semibold text-foreground">Total:</span>
                <span className="text-lg sm:text-xl font-bold text-primary">${total}</span>
              </div>
            </div>

            <div className="space-y-1 text-xs sm:text-sm text-muted-foreground">
              <p>✓ Secure payment via eBay</p>
              <p>✓ Buyer protection included</p>
              <p>✓ Free shipping on orders over $50</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1 w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCheckout}
                className="flex-1 w-full sm:w-auto bg-primary text-primary-foreground hover:opacity-90"
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        )}

        {state === "loading" && (
          <div className="flex flex-col items-center justify-center py-8 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm sm:text-base text-muted-foreground">Processing your order...</p>
          </div>
        )}

        {state === "success" && orderData && (
          <div className="flex flex-col items-center justify-center py-8 space-y-3">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            <div className="text-center space-y-1">
              <p className="font-semibold text-foreground text-sm sm:text-base">
                Order Created Successfully!
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">Order ID: {orderData.orderId}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Redirecting to eBay...</p>
            </div>
          </div>
        )}

        {state === "error" && (
          <div className="flex flex-col items-center justify-center py-8 space-y-3">
            <AlertCircle className="w-12 h-12 text-destructive" />
            <div className="text-center space-y-2">
              <p className="font-semibold text-foreground text-sm sm:text-base">Checkout Failed</p>
              <p className="text-xs sm:text-sm text-muted-foreground">{errorMessage}</p>
            </div>
            <Button
              onClick={() => setState("idle")}
              className="w-full sm:w-auto"
              variant="outline"
            >
              Try Again
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
