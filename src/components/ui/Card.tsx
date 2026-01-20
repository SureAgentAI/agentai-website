import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', hover = true, children, ...props }, ref) => {
    const hoverStyles = hover ? 'hover:shadow-lg hover:-translate-y-1' : ''

    return (
      <div
        ref={ref}
        className={`bg-white rounded-xl shadow-soft p-6 transition-all duration-200 ${hoverStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
export default Card
