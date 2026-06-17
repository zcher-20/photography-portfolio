"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"

interface Props {
  images: string[]
}

export default function CoverflowCarousel({ images }: Props) {
  const [active, setActive] = useState(0)
  const total = images.length

  const prev = () => setActive((a) => (a - 1 + total) % total)
  const next = () => setActive((a) => (a + 1) % total)

  const getOffset = (index: number) => {
    let diff = index - active
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return diff
  }

  return (
    <div
      style={{ perspective: "1200px", position: "relative", width: "100%", height: "420px", overflow: "hidden" }}
    >
      <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {images.map((src, i) => {
          const offset = getOffset(i)
          const absOffset = Math.abs(offset)
          if (absOffset > 2) return null

          const rotateY = offset * 45
          const translateX = offset * 220
          const translateZ = -absOffset * 150
          const scale = 1 - absOffset * 0.15
          const opacity = 1 - absOffset * 0.3
          const zIndex = total - absOffset

          return (
            <motion.div
              key={i}
              animate={{
                rotateY,
                x: translateX,
                z: translateZ,
                scale,
                opacity,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
              style={{
                position: "absolute",
                width: "320px",
                height: "380px",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: offset === 0
                  ? "0 20px 60px rgba(0,0,0,0.15)"
                  : "0 10px 30px rgba(0,0,0,0.1)",
                zIndex,
                transformStyle: "preserve-3d",
                cursor: offset === 0 ? "default" : "pointer",
              }}
              onClick={() => { if (offset !== 0) setActive(i) }}
            >
              <img
                src={src}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  borderRadius: "12px",
                }}
              />
            </motion.div>
          )
        })}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        style={{
          position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)",
          width: "40px", height: "40px", borderRadius: "50%", border: "none",
          background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "18px", color: "#333", zIndex: 20,
        }}
        aria-label="Previous"
      >‹</button>
      <button
        onClick={next}
        style={{
          position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)",
          width: "40px", height: "40px", borderRadius: "50%", border: "none",
          background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "18px", color: "#333", zIndex: 20,
        }}
        aria-label="Next"
      >›</button>

      {/* Dots */}
      <div style={{ position: "absolute", bottom: "12px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "8px", zIndex: 20 }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: "8px", height: "8px", borderRadius: "50%", border: "none",
              background: i === active ? "#333" : "#ccc",
              cursor: "pointer", padding: 0,
              transition: "background 0.2s",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
