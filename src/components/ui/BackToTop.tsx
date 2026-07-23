'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowUp } from 'react-icons/fi'
import { smoothScrollTo } from '@/lib/scroll'

/**
 * Floating "scroll to top" control that fades in after the user scrolls
 * past one viewport height.
 */
const BackToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => smoothScrollTo(0)}
          aria-label="Back to top"
          data-cursor
          className="fixed bottom-6 right-6 z-[55] grid h-12 w-12 place-items-center rounded-full
                     text-[#1a0904] shadow-glow-accent"
          style={{ background: 'linear-gradient(135deg,#ff5a33,#ffb020)' }}
        >
          <FiArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default BackToTop
