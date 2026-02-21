import { useState } from 'react'

export default function StarRating({ rating, onRate, starAriaLabel }) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex justify-center gap-2" onMouseLeave={() => setHovered(0)}>
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= (hovered || rating)
        return (
          <button
            key={star}
            type="button"
            onClick={() => onRate(star)}
            onMouseEnter={() => setHovered(star)}
            className="p-1 transition-transform duration-150 hover:scale-110 focus:outline-none cursor-pointer"
            aria-label={starAriaLabel ? starAriaLabel(star) : `Rate ${star} of 5`}
          >
            <svg
              className={`w-10 h-10 sm:w-12 sm:h-12 transition-colors duration-150 ${
                active ? 'text-accent' : 'text-border-hover'
              }`}
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        )
      })}
    </div>
  )
}
