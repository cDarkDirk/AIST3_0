import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createBrowserHistory} from 'history'
import {connectRouter, routerMiddleware, ConnectedRouter} from 'connected-react-router'
import {Route, Switch} from 'react-router'
import rootReducer from './reducers'
import HomePage from './containers/HomePage'
import ChainEditorPage from './components/ChainEditorPage'
import Form from './components/Form'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const history = createBrowserHistory()

const store = createStore(
  connectRouter(history)(rootReducer),
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      thunk)
))

ReactDOM.render((
  <Provider store={store}>
    <div>

        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/chaineditor" component={ChainEditorPage}/>}
            <Route  exact path="/form" component={Form}/>
            <Route exact path="/" component={HomePage}/>
          </Switch>
        </ConnectedRouter>

    </div>

  </Provider>
),
document.getElementById('root'))
