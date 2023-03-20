import React from 'react';
import { Container, Box, Typography, Link } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: 'primary.main',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '60px', 
          padding: '0 24px',
        }}
      >
        {/* Navigation Links */}
        <Box>
          <Link href="/" color="inherit" underline="none" mr={2}>
            Home
          </Link>
          <Link href="/cars" color="inherit" underline="none" mr={2}>
            Cars
          </Link>
          <Link href="/login" color="inherit" underline="none">
            Login
          </Link>
        </Box>

        {/* Social Media Links */}
        <Box>
          <Link href="#" color="inherit" underline="none" mr={1}>
            <Facebook />
          </Link>
          <Link href="#" color="inherit" underline="none" mr={1}>
            <Twitter />
          </Link>
          <Link href="#" color="inherit" underline="none">
            <Instagram />
          </Link>
        </Box>

        {/* Copyright */}
        <Typography variant="body2" color="inherit" align="center">
          &copy; {new Date().getFullYear()} Team 2 
        </Typography>
      </Container>
    </Box>
  );
}
