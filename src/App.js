import React, {Component} from 'react';
import axios from 'axios';


import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
// Style Imports
import './App.css';

// Material UI imports
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
// import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from './config/theme';

// Component imports
import Buttons from './components/Buttons';
const appLink = (project, ind) => {
    return (
        <a key={ind} className="App-link" href={`${project.directory}`}>
            <Paper className="App-link-paper">
                <img className="App-logo" src={`${project.directory}/assets/images/logo.png`} alt=""/>
                <h2 className="App-title">{decodeURIComponent(project.title)}</h2>
            </Paper>
        </a>
    );
};
let projs = [];

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sortAlphabetical: false,
            sortCreated: true,
            sortModified: false,
            filtered: [],
            projects: [],
            open: false,
        }
    }

    componentDidMount() {
        const comp = this;
        axios.get('http://bmswine.dev.cybernautic.com/directory.php')
            .then(res => {
                console.dir(res);
                projs = res.data.map((proj) => {
                    proj.created = new Date(proj.created * 1000);
                    proj.modified = new Date(proj.modified * 1000);
                    return proj;
                });
                console.dir(projs);
                comp.setState({
                    projects: projs,
                    filtered: projs
                });
                comp.sortCreated();
            })
            .catch(res => {
                console.log(res)
            });
    }

    sortAlpha() {
        const projs = this.state.projects.sort((proj, prev) => {
            if (proj.title.toLowerCase() < prev.title.toLowerCase()) {
                return -1;
            }
            if (proj.title.toLowerCase() > prev.title.toLowerCase()) {
                return 1;
            }
            // a must be equal to b
            return 0;
        });
        this.setState({
            filtered: projs,
            sortAlphabetical: true,
            sortCreated: false,
            sortModified: false,
        })
    }

    sortCreated() {
        const projs = this.state.projects.sort((proj, prev) => {
            if (proj.created > prev.created) {
                return -1;
            }
            if (proj.created < prev.created) {
                return 1;
            }
            // a must be equal to b
            return 0;
        });
        this.setState({
            filtered: projs,
            sortAlphabetical: false,
            sortCreated: true,
            sortModified: false,
        })
    }

    sortModified() {
        const projs = this.state.projects.sort((proj, prev) => {
            if (proj.modified > prev.modified) {
                return -1;
            }
            if (proj.modified < prev.modified) {
                return 1;
            }
            // a must be equal to b
            return 0;
        });
        this.setState({
            filtered: projs,
            sortAlphabetical: false,
            sortCreated: false,
            sortModified: true,
        })
    }

    handleToggle = () => this.setState({open: !this.state.open});

    // handleClose = () => this.setState({open: false});

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
                <Paper>
                    <div className={`App ${this.state.open ? 'App-open' : ''}`}>
                        <AppBar showMenuIconButton={false} className="App-header" title="Benjamin's Development Server"
                                onLeftIconButtonTouchTap={this.handleToggle}/>

                        <main className="App-main">
                            <Buttons alpha={this.state.sortAlphabetical}
                                     alphaSort={this.sortAlpha.bind(this)}
                                     created={this.state.sortCreated}
                                     createdSort={this.sortCreated.bind(this)}
                                     modified={this.state.sortModified}
                                     modifiedSort={this.sortModified.bind(this)}/>
                            {this.state.filtered.map((project, ind) => {
                                return (
                                    appLink(project, ind)
                                )
                            })}

                        </main>
                    </div>
                </Paper>
            </MuiThemeProvider>
        );
    }
}

export default App;
