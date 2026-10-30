import { Box } from '@mui/material'
import { fonts } from '../../styles/tokens'

type BinaryRailProps = {
  /** ASCII text to encode. The rail is a graphic, not readable content. */
  text?: string
  /** Digit size; the default scales with the viewport for the home hero. */
  fontSize?: string
  /** White digits' opacity; small rails need more to read as a signal. */
  opacity?: number
}

/** Four copies keep the window filled whatever the rail's height (see index.css). */
const copies = [0, 1, 2, 3]

/**
 * The binary rail from the ASL butterfly, used as a structural mark.
 * Each character becomes one byte; the first bit of each byte is amber so the
 * rail keeps the rhythm of the mark without becoming decoration.
 * The bits repeat at a fixed pitch and the stack slides down by one copy per
 * loop, so the flow never shows a seam and never depends on the rail's height.
 */
export function BinaryRail({
  text = 'ASL',
  fontSize = 'clamp(10px, 1.05vw, 14px)',
  opacity = 0.5,
}: BinaryRailProps) {
  const bits = Array.from(text).flatMap((character) =>
    character.charCodeAt(0).toString(2).padStart(8, '0').split(''),
  )

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
