import { Box } from '@mui/material'
import { fonts } from '../../styles/tokens'

type BinaryRailProps = {
  /** ASCII text to encode. The rail is a graphic, not readable content. */
  text?: string
  /** Digit size; the default scales with the viewport for the home hero. */
  fontSize?: string
}

/**
 * The binary rail from the ASL butterfly, used as a structural mark.
 * Each character becomes one byte; the first bit of each byte is amber so the
 * rail keeps the rhythm of the mark without becoming decoration.
 */
export function BinaryRail({
  text = 'ASL',
  fontSize = 'clamp(10px, 1.05vw, 14px)',
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: 18,
        color: 'rgba(255, 255, 255, 0.5)',
        fontFamily: fonts.mono,
        fontSize,
        lineHeight: 1,
        textAlign: 'center',
        userSelect: 'none',
      }}
    >
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
  )
}
