import { Box, Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 8, md: 16 } }}>
      <Typography variant="h1" className="fade-in" sx={{ maxWidth: '14ch', textWrap: 'balance' }}>
        Página não encontrada.
      </Typography>
      <Typography sx={{ mt: 3, maxWidth: '52ch', color: 'text.secondary' }}>
        O endereço pode ter mudado ou o conteúdo não está mais disponível.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button component={Link} to="/" variant="contained" size="large">
          Voltar para o início
        </Button>
      </Box>
    </Container>
  )
}
