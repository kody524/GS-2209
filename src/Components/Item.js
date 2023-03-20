import { Paper, Button } from '@mui/material'

function Item ({item})
{
    return (
        <Paper style={{display:"flex", justifyContent:"center"}}>
            <img src={item.image} alt={item.title} style={{width:"auto", height: "45vh"}} />
          
           </Paper>
    )
}

export default Item;