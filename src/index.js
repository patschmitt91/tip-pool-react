import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { Navbar, Nav } from 'react-bootstrap';
import './index.css';
import App from './App';
import About from './About';
import History from './History';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const routes = [
  { path: '/', name: 'Tip Pool', Component: App },
  { path: '/about', name: 'About', Component: About },
  { path: '/history', name: 'History', Component: History }
]



function Main() {
  return (
    <Router>

        <Paper>
            <Tabs centered>
                {routes.map(route => (
                    <Nav.Link
                        key={route.path}
                        as={NavLink}
                        to={route.path}
                        exact
                    >
                        <Tab label={route.name} />
                    </Nav.Link>
                ))}
            </Tabs>
        </Paper>

        <Container>
          {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>
              {({ match }) => (
                <CSSTransition
                  in={match != null}
                  timeout={300}
                  classNames="page"
                  unmountOnExit
                >
                  <div className="page">
                    <Component />
                  </div>
                </CSSTransition>
              )}
            </Route>
          ))}
        </Container>
    
    </Router>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<Main />, rootElement)
