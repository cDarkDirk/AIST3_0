import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createBrowserHistory} from 'history'
import {Router, Route, Switch} from 'react-router'
import rootReducer from './reducers'
import HomePage from './containers/HomePage'
import ChainEditorPage from './components/ChainEditorPage'
import FormPage from './containers/FormPage'
import LauncherPage from "./components/LauncherPage";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const history = createBrowserHistory()

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(
            thunk)
    ))

ReactDOM.render((
        <Provider store={store}>
            <div>

                <Router history={history}>
                    <Switch>
                        <Route path="/chaineditor" component={ChainEditorPage}/>}
                        <Route path="/form/:formName" component={FormPage}/>
                        <Route path="/launcher" component={LauncherPage}/>
                        <Route exact path="/" component={HomePage}/>
                    </Switch>
                </Router>

            </div>

        </Provider>
    ),
    document.getElementById('root'))
