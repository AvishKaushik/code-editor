import React,{useState} from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';

// Importing MaterialUI contents for adding the Drawer
import Drawer from '@material-ui/core/Drawer';                                                   
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

// Calling the Editor to enable the editor partition
import Editor from './Editor.js';

// Icons to open and close drawer
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';

// Tags which will help to make file explorer elements
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// Icon Theme for different types of files
import JSIcon from '../icons/js.png';
import CSSIcon from '../icons/css.png';
import HTMLIcon from '../icons/html.png';

// Importing a CSS File
import '../styles/App.css';

// Setting width of the drawer i.e., File Explorer
const drawerWidth = 320;


// Initializing useStyles function to set the theme and transitions of the File Explorer as per needs.
// It will also contain pre defined styling for our main title bar (or, App Bar) and side drawer.
// This function will help to provide a better styling for our project.
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    color: '#FFFFFF',
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#222222',
    color: '#FFFFFF',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),                                                     
    // Necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));


// Creating main function App() which will contain the content
function App() {

  // Presetting the state of the editors by using empty string in the useState which will empty our editor on Reload
  const [html,setHTML]=useState('');
  const [css,setCSS]=useState('');
  const [js,setJS]=useState('');

  // Importing styles to a constant class and theme to manage code editor styling
  const classes = useStyles();
  const theme = useTheme();

  // A variable which will return the state of the drawer i.e., Open or Closed
  const [open, setOpen] = React.useState(false);

  // Set of variables which will contain true or false
  // These variable will change state of the editor
  // It will help to enable one editor at a time and will change for each file
  const [isOe1, setIsOe1] = useState(true);
  const [isOe2, setIsOe2] = useState(false);
  const [isOe3, setIsOe3] = useState(false);


  // Drawer functions which will help to open and close the drawer 
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };


  // Change editor to HTML so that can write the HTML code
  const handleHtmlChange = () => {
    setIsOe1(true);
    setIsOe2(false);
    setIsOe3(false);
  }

  
  // Change editor to JavaScript so that can write the JS code
  const handleJsChange = () => {
    setIsOe1(false);
    setIsOe2(false);
    setIsOe3(true);
  }

  
  // Change editor to CSS so that can write the CSS code
  const handleCssChange = () => {
    setIsOe1(false);
    setIsOe2(true);
    setIsOe3(false);
  }

  
  // A constant variable which will help to Live preview the code we have written
  const srcDoc = `
    <html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${js}</script>
    </html> 
  `


  // Return to render the website
  return (
    // Implementing *classes* variable which we declared above as className to give styling
    <div className={classes.root}>
    <CssBaseline /> 
      <AppBar
        id="app-bar"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <img id="logo" src="https://www.dyte.io/images/Dyte-Logo.svg"/>
          <Typography id="heading" variant="h5" noWrap>
            Code Editor
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        id="file-exp"
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        backgroundColor="black"
      >
        <div className={classes.drawerHeader}>
          <p id="file-exp-title">File Explorer</p>
        <IconButton id="drawer-side" onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon id="licon"/> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={handleHtmlChange}>
            <img src={HTMLIcon} id="HTMLIcon" />
            <ListItemText primary="index.html" />
          </ListItem>
          <ListItem button onClick={handleCssChange}>
            <img src={CSSIcon} id="CSSIcon" />
            <ListItemText primary="index.css" />
          </ListItem>
          <ListItem button onClick={handleJsChange}>
            <img src={JSIcon} id="JSIcon" />
            <ListItemText primary="index.js" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        
        <div className={classes.drawerHeader} />
      <div className="partiton editor-region">
        {isOe1 && (
        <div id="ed1">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHTML}  
        />
        </div>
        )}
        {isOe2 && (
        <div id="ed2">
        <Editor 
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCSS}  
        />
        </div>
        )}
        {isOe3 && (
        <div id="ed3">
        <Editor 
          language="javascript"
          displayName="JavaScript"
          value={js}
          onChange={setJS}  
        />
        </div>
        )}
      </div>
      <div className="partition live-preview">
        <div className="editor-title">
                Live  Preview
            </div>
        <iframe 
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="94.78%"
        />
      </div>
      </main>
    </div>
  );
}

export default App;
