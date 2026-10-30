import { Box } from '@mui/material'
import { useColorMode } from '../../app/color-mode'
import { Rise } from '../Rise/Rise'
import { colors, fonts } from '../../styles/tokens'

type Tone = 'auto' | 'ink' | 'paper'

type BrandLockupProps = {
  height?: number
  tone?: Tone
}

/**
 * Compact brand lockup for the header and drawer: butterfly mark plus the
 * ASL wordmark. The full name stays available through the link label and
 * the footer lockup.
 */
export function BrandLockup({ height = 40, tone = 'auto' }: BrandLockupProps) {
  const { mode } = useColorMode()
  const resolved = tone === 'auto' ? (mode === 'dark' ? 'paper' : 'ink') : tone
  const src = resolved === 'paper' ? '/brand/logo-mark-paper.svg' : '/brand/logo-mark.svg'
  const wordmarkColor = resolved === 'paper' ? colors.paper : colors.ink

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box
        component="img"
        src={src}
        alt=""
        width={586}
        height={720}
        sx={{ height, width: 'auto', display: 'block' }}
      />
      <Box
        component="span"
        sx={{
          fontFamily: fonts.display,
          fontWeight: 800,
          fontStretch: '100%',
          fontSize: height * 0.55,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          color: wordmarkColor,
        }}
      >
        <Rise>ASL.org</Rise>
      </Box>
    </Box>
  )
}
