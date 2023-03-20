import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import NavBar from './NavBar';
import { getCart } from '../allApiCalls';




export default function Review({firstName,lastName,address,state,zip,city,nameOnCard,cardNumber,expDate,cvv}) {
  const id = localStorage.getItem('id')
  const [cart,setCart]=React.useState([])
  React.useEffect(()=>{
getCart(id,setCart)
  },[])
  function sum(){
    let result = 0
    cart.map((ele,ind)=>{
      result+=ele.price
    })
    return result
  }
  
  const addresses = [address, city, state, zip];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: nameOnCard },
  { name: 'Card number', detail: cardNumber },
  { name: 'Expiry date', detail: expDate },
];
  return (<>
    <NavBar/>
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.map((ele) => (
          <ListItem key={ele.id} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={ele.make} />
            <ListItemText primary={ele.model} />
            <Typography variant="body2">{ele.price}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {sum(cart)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{firstName}</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  </>);
}