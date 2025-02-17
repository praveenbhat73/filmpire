import React, {useEffect} from 'react'
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress,Typography } from '@mui/material';
import {Link} from 'react-router-dom'
import {useTheme} from '@mui/styles';
import useStyles from './styles';
import Lottie from 'react-lottie';
import animationData from '../../lotties/logo.json';
import { useDispatch,useSelector } from 'react-redux';
import { useGetGenresQuery } from '../../services/TMDB';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import genreIcons from '../../assets/geners';
// const redLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
// const blueLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const categories=[
  {label:'Popular',value:'popular'},
  {label:'Top Rated',value:'top_rated'},
  {label:'Upcoming',value:'upcoming'},
];

const democategories=[
  {label:'Comedy',value:'comedy'},
  {label:'Actions',value:'action'},
  {label:'Horror',value:'horror'},
  {label:'Animation',value:'animation'},
];



const Sidebar = ({setMobileOpen}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,

    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };


  const theme=useTheme();
  const classes=useStyles();
  const { data, isFetching } = useGetGenresQuery();
  const {genreIdOrCategoryName}=useSelector((state)=>state.currentGenreOrCategory);
  const dispatch=useDispatch();

  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName]);

  return (
    <>
    <div className={classes.scroll}>
  
      <Link to="/" className={classes.imageLink}>
      {/* <img
       className={classes.image}
       src={theme.palette.mode ==='light' ? redLogo :blueLogo}
        alt="Filmpire Logo"
      /> */}
 <Typography fontSize="24px" fontFamily="sans-serif" className={classes.th} fontWeight="bold" style={{display:"flex",alignItems:"center",justifyContent:"center", padding:"5px 5px 5px 5px"}}>CINEFLICKS</Typography>
      <Lottie options={defaultOptions} height={110} width={110} />

      </Link>
      <Divider/>
      <List>
        <ListSubheader>
          Categories
        </ListSubheader>
        {
        categories.map(({ label , value})=>(
            <Link key={value} className={classes.links} to="/">
              <ListItem onClick={() => dispatch(selectGenreOrCategory(value))}button>
                <ListItemIcon>
                <img src={genreIcons[label.toLowerCase()]} className={classes.genreImages} height={30} fontFamily="Helvetica Neue"/>
                </ListItemIcon> 
                <ListItemText primary={label} />
              </ListItem>
            </Link>
           ))
        }
</List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress size="1rem" />
          </Box>
        )
          : data?.genres?.map(({ name, id}) => (
            <Link key={name} className={classes.links} to="/">
              <ListItem button onClick={() => dispatch(selectGenreOrCategory(id))}>
                <ListItemIcon>
                  <img src={genreIcons[name.toLowerCase()]} className={classes.genreImages} height={30} />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))}
      </List>
      <Typography variant='h6' sx={{marginTop:'2px',color:'gray'}}>
            <a href="https://praveennbhat.vercel.app/"  target="_blank" style={{textDecoration:'none', color:'gray', fontSize:'15px'}}>
              Copyright © PNB Made With🧑‍💻
            </a>
      </Typography>
    </div>
    </>
  )
}
  
export default Sidebar
