import { Paper, Button } from '@mui/material'

function Item ({item})
{
    return (
        <Paper>
            <img src={item.image} alt={item.title} style={{width:"100%", height: "45vh"}} />
          
           </Paper>
    )
}

export default Item;