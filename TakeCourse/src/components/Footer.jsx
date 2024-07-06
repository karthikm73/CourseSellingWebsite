import { Box, Grid, Typography, Link } from "@mui/material";

function Footer() {
    return (
        <Box
            sx={{
                width: '100%',
                height: 'auto',
                backgroundColor: 'primary.main',
                color: 'white',
                padding: '20px 0',
                // marginTop: 'auto',
            }}
        >
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h6" gutterBottom>Contact Us</Typography>
                    <Typography variant="body1">Email: contact@example.com</Typography>
                    <Typography variant="body1">Phone: +1 (123) 456-7890</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h6" gutterBottom>Address</Typography>
                    <Typography variant="body1">1234 Main St</Typography>
                    <Typography variant="body1">Anytown, USA 12345</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h6" gutterBottom>Follow Us</Typography>
                    <Link href="#" color="inherit">Facebook</Link>
                    <br />
                    <Link href="#" color="inherit">Twitter</Link>
                    <br />
                    <Link href="#" color="inherit">Instagram</Link>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Footer;
