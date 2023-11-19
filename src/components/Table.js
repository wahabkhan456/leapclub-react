import  React,{useState,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import InfiniteScroll from 'react-infinite-scroll-component';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';



const BasicTable = () => {

    const [items, setItems] = useState([])
    const[hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)
    const [ischecked, setIsChecked]= useState(false)

    
  useEffect(()=>{
     

      getItems()
  },[])

  const getItems = async () =>{
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_page=${page}`
    );
    const data = await res.json();
    setItems(data)
    console.log(data)
}

  const fetchComments = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_page=${page}`
      )
      const data = await res.json()
      return data;
  }

  const fetchMoreData = async () => {
      const fetchedComments = await fetchComments()

      setItems([...items, ...fetchedComments])

      if(fetchedComments.lenght ===0 || fetchedComments.lenght <20){
        setHasMore(false)
      }
     
      setPage(page +1)
  }

  const handleChange = (e) => {
      const check = e.target.checked

     if(check){
         setIsChecked(true)
     }
     else{
         setIsChecked(false)
     }
  }
  
  return (
     
      <div style={{ padding:"2%",margin:"2%", border:"solid lavender"}}>
         <InfiniteScroll
         next={fetchMoreData}
          dataLength={items.length}
          hasMore={true}
          loader={<Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>}
        >
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
              <Checkbox onChange={handleChange} checked={ischecked} name="allselector"  />
            <TableCell style={{fontSize:"20px"}} >Products</TableCell>
            <TableCell align="left" style={{fontSize:"20px"}}>Title</TableCell>
            <TableCell align="right"style={{fontSize:"20px"}}>AlbumID</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        
        {items.map((item)=>(
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <Checkbox checked={ischecked} />
              <TableCell component="th" scope="row">
              <img src={item.thumbnailUrl} />
              </TableCell>
              
              <TableCell align="left">{item.title}</TableCell>
              <TableCell align="right">{item.albumId}</TableCell>
              
            </TableRow>
          ))}
         
        </TableBody>

      </Table>
    </TableContainer>
    </InfiniteScroll>
    </div>
  );
          
}

export default BasicTable;