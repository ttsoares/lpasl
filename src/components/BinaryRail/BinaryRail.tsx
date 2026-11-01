import { Box } from '@mui/material'
import { fonts } from '../../styles/tokens'

type BinaryRailProps = {
  /** The bit pattern, in whole bytes. The rail is a graphic, not readable content. */
  pattern?: string
  /** Digit size; the default scales with the viewport for the home hero. */
  fontSize?: string
  /** White digits' opacity; small rails need more to read as a signal. */
  opacity?: number
}

/** Four copies keep the window filled whatever the rail's height (see index.css). */
const copies = [0, 1, 2, 3]

/**
 * Bits per copy. The pattern repeats up to this length so a copy stays tall
 * enough to fill the home hero, and the 14s loop keeps the same speed.
 */
const copyLength = 24

/**
 * The binary rail from the ASL butterfly, used as a structural mark.
 * The stream is 01110111, repeated: 119 in binary, read as 11/9, the day ASL
 * was founded (11 September 2003). The first bit of each byte is amber so the
 * rail keeps the rhythm of the mark without becoming decoration.
 * The bits repeat at a fixed pitch and the stack slides down by one copy per
 * loop, so the flow never shows a seam and never depends on the rail's height.
 */
export function BinaryRail({
  pattern = '01110111',
  fontSize = 'clamp(10px, 1.05vw, 14px)',
  opacity = 0.5,
}: BinaryRailProps) {
  const bits = Array.from({ length: copyLength }, (_, index) => pattern[index % pattern.length])

  return (
    <Box
      aria-hidden="true"
      className="hero-rail"
      sx={{
        alignSelf: 'stretch',
        width: 18,
        color: `rgba(255, 255, 255, ${opacity})`,
        fontFamily: fonts.mono,
        fontSize,
        lineHeight: 1.25,
        textAlign: 'center',
        userSelect: 'none',
      }}
    >
      <Box className="hero-rail-window">
        <Box className="hero-rail-track">
          {copies.map((copy) => (
            <Box key={copy} sx={{ display: 'flex', flexDirection: 'column' }}>
              {bits.map((bit, index) => (
                <Box
                  component="span"
                  key={index}
                  sx={{
                    color: index % 8 === 0 ? 'rgba(255, 192, 15, 0.95)' : 'inherit',
                  }}
                >
                  {bit}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
