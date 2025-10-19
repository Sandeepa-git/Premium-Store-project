"use client"

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
          {/* Logo & Store Name */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg sm:text-xl">✦</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              Premium Store
            </h1>
          </div>

          {/* eBay info */}
          <div className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-0">
            Powered by eBay
          </div>
        </div>
      </div>
    </header>
  )
}
