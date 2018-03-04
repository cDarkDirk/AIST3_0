import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
//import {createBrowserHistory} from 'history';
import {Route, Switch} from 'react-router';
import {HashRouter} from 'react-router-dom';
import rootReducer from './reducers';
import HomePage from './containers/HomePage';
import ChainEditorPage from './containers/ChainEditorPage';
import LauncherPage from "./containers/LauncherPage";
import FormBuilderPage from "./containers/FormBuilderPage";
import TestBuilder from "./containers/TestBuilder";
import DataDirectoryPage from "./containers/TestBuilder";

import DataTemplatesBuilderPage from "./containers/DataTemplates";
import AuthorizationPage from "./containers/AuthorizationPage"
import RegistrationPage from "./containers/RegistrationPage"

import 'bootstrap/dist/css/bootstrap.min.css';

import 'font-awesome/css/font-awesome.min.css';
import './styles/main.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//const history = createBrowserHistory();

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunk)
  ));

ReactDOM.render((
    <Provider store={store}>
      <div>
        <HashRouter /*history={history}*/>
          <Switch>
            <Route exact path="/testbuilder" component={TestBuilder}/>
            <Route path="/testbuilder/:testName" component={TestBuilder}/>
            <Route exact path="/chaineditor" component={ChainEditorPage}/>}
            <Route path="/chaineditor/:chainName" component={ChainEditorPage}/>}
            <Route exact path="/launcher" component={LauncherPage}/>
            <Route path="/launcher/:launcherName" component={LauncherPage}/>
            <Route exact path="/formbuilder" component={FormBuilderPage}/>
            <Route path="/formbuilder/:chainIndex" component={FormBuilderPage}/>
            <Route path="/datadirectory" component={DataDirectoryPage}/>
            <Route path="/datatemplates/:datatemplatesName" component={DataTemplatesBuilderPage}/>
            <Route exact path="/datatemplates" component={DataTemplatesBuilderPage}/>
            <Route path="/" component={HomePage}/>
            <Route path="/registration" component={RegistrationPage}/>
            <Route exact path="/" component={AuthorizationPage}/>
          </Switch>
        </HashRouter>
      </div>
    </Provider>
  ),
  document.getElementById('root'));
