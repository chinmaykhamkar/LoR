import React from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChalkboardTeacher, faUniversity, faUserCircle, faQuestionCircle, faSignOutAlt, faHandHoldingUsd, faInbox } from '@fortawesome/free-solid-svg-icons';
import HomeComp from '../teacher/screens/js/HomeComp';
import StudentComp from '../teacher/screens/js/StudentComp';
import RequestComp from '../teacher/screens/js/RequestComp';
import ProfileComp from '../teacher/screens/js/ProfileComp';
import InstructionComp from '../teacher/screens/js/InstructionComp';
import StudentUniComp from '../teacher/screens/js/StudentUniComp'
import StudentUniListRoutet from '../teacher/routing/StudentUniListRoute';

const drawerWidth = 240;
var color = localStorage.getItem('teacherColor');
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      display: "flex",
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      // backgroundColor: color
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,

  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),

  },
  active: {
    backgroundColor: "#8BE78B",

  }
}));

const ResponsiveDrawer = (props) => {
  const history = useHistory();
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logoutHandler = () => {
    const token = localStorage.getItem('authTokent');
    localStorage.removeItem('authTokent');
    localStorage.removeItem('email');
    localStorage.removeItem('tname');
    history.push('/teacher/login');

  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <Link href='/teacher/home' style={{ color: 'black' }}>
          <ListItem className={(props.name) == 'Home' ? classes.active : ""} button>
            <ListItemIcon>
              <FontAwesomeIcon icon={faHome} size={"2x"} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link href='/teacher/students' style={{ color: 'black' }}>
          <ListItem className={(props.name) == 'Students' ? classes.active : ""} button>
            <ListItemIcon>
              <FontAwesomeIcon icon={faChalkboardTeacher} size={"2x"} />
            </ListItemIcon>
            <ListItemText primary="Students" />
          </ListItem>
        </Link>
        <Link href='/teacher/request' style={{ color: 'black' }}>
          <ListItem className={(props.name) == 'Request' ? classes.active : ""} button>
            <ListItemIcon>
              <FontAwesomeIcon icon={faUniversity} size={"2x"} />
            </ListItemIcon>
            <ListItemText primary="Request" />
          </ListItem>
        </Link>
        <Link href='/teacher/profile' style={{ color: 'black' }}>
          <ListItem className={(props.name) == 'Profile' ? classes.active : ""} button>
            <ListItemIcon>
              <FontAwesomeIcon icon={faUserCircle} size={"2x"} />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link href='/teacher/instruction' style={{color:'black'}}>
          <ListItem className={(props.name) == 'Instruction' ? classes.active : ""} button>
            <ListItemIcon>
              <FontAwesomeIcon icon={faQuestionCircle} size={"2x"} />
            </ListItemIcon>
            <ListItemText primary="Instructions" />
          </ListItem>
        </Link>
        <Link href='https://linktr.ee/chinmaykhamkar' style={{color:'black'}} target="_blank">
        <ListItem className={(props.name) == 'Contact us' ? classes.active : ""} button>
          <ListItemIcon>
            <FontAwesomeIcon icon={faInbox} size={"2x"} />
          </ListItemIcon>
          <ListItemText primary="Contact us" />
        </ListItem>
        </Link>
        <Link href='https://www.buymeacoffee.com/chinmaykhamkar' style={{color:'black'}} target="_blank">
        <ListItem className={(props.name) == 'Support us' ? classes.active : ""} button>
          <ListItemIcon>
            <FontAwesomeIcon icon={faHandHoldingUsd} size={"2x"} />
          </ListItemIcon>
          <ListItemText primary="Support us" />
        </ListItem>
        </Link>
        <ListItem onClick={logoutHandler} className={(props.name) == 'Logout' ? classes.active : ""} button>
          <ListItemIcon>
            <FontAwesomeIcon icon={faSignOutAlt} size={"2x"} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar style={{ backgroundColor: color }} position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {props.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.name == 'Home' && <HomeComp />}
        {props.name == 'Students' && <StudentComp />}
        {props.name == 'Request' && <RequestComp />}
        {props.name == 'Profile' && <ProfileComp />}
        {props.name == 'Instruction' && <InstructionComp />}
        {props.name == 'UniList' && <StudentUniComp />}

      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
