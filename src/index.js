import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createBrowserHistory} from 'history'
import {Route, Switch} from 'react-router'
import {HashRouter} from 'react-router-dom'
import rootReducer from './reducers'
import HomePage from './containers/HomePage'
import ChainEditorPage from './containers/ChainEditorPage'
import FormPage from './containers/FormPage'
import LauncherPage from "./components/LauncherPage";
import FormBuilderPage from "./containers/FormBuilderPage";

import 'font-awesome/css/font-awesome.min.css'
import './styles/main.css'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const history = createBrowserHistory()

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunk)
  ));

ReactDOM.render((
    <Provider store={store}>
      <div>

        <HashRouter history={history}>
          <Switch>
            <Route path="/chaineditor" component={ChainEditorPage}/>}
            <Route path="/form/:formName" component={FormPage}/>
            <Route path="/launcher" component={LauncherPage}/>
            <Route path="/formbuilder" component={FormBuilderPage}/>
            <Route exact path="/" component={HomePage}/>
          </Switch>
        </HashRouter>

      </div>
    </Provider>
  ),
  document.getElementById('root'));
