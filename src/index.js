import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { Container, Navbar, Nav } from 'react-bootstrap';
import './index.css';
import App from './App';
import About from './About';
import History from './History';
import Staff from './components/staff-list/Staff';
import * as serviceWorker from './serviceWorker';


const routes = [
  { path: '/', name: 'Tip Pool', Component: App },
  { path: '/about', name: 'About', Component: About },
  { path: '/history', name: 'History', Component: History }
]

function Main() {
  return (
    <Router>
      
        <Navbar bg="light">
          <Nav className="mx-auto">
            {routes.map(route => (
              <Nav.Link
                key={route.path}
                as={NavLink}
                to={route.path}
                activeClassName="active"
                exact
              >
                {route.name}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar>

        <Container className="container">
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
