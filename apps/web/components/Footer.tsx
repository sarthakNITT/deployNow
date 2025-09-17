"use client"

export function Footer() {
  return (
    <footer className="border-t border-border py-6 px-6 bg-surface/10">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-gray-400 text-xs">
          © 2024 Deploy Clone. Built with Next.js and Tailwind CSS.
        </p>
        <div className="flex justify-center gap-4 mt-3 text-xs">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            Terms
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            Privacy
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            Support
          </a>
        </div>
      </div>
    </footer>
  )
}