import React, { Component } from 'react';
import uuid from 'uuid';
import $ from 'jquery';
import Projects from './Components/Projects';
import AddProject from './Components/AddProject';
import './App.css';

class App extends Component {

  constructor () {

    super();

    this.state = {
      projects: [],
      todos: []
    }
  }

  getTodos(){
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({todos: data}, function(){
          console.log(this.state);
        })

      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err)
      }
    })
  }

  getProjects(){

  }

  componentWillMount() {
    this.setState( { projects: [
        {
          id:uuid.v4(),
          title: '1st title',
          category: '1st category'
        },
        {
          id:uuid.v4(),
          title: '2nd title',
          category: '2nd category'
        }
      ]});
      this.getTodos();

  }

  componentDidMount(){
    this.getProjects();
    this.getTodos();
  }

  handleAddProject(project){
    console.log(project)
    let projects = this.state.projects;
    projects.push(project);
    this.setState({projects:projects})
  }

  handleDeleteProject(id) {
    let projects = this.state.projects;
    let index = projects.findIndex(x => x.id === id);
    projects.splice(index, 1);
    this.setState({projects:projects});
  }

  render() {
    return (
      <div className="App">
          <AddProject addProject={this.handleAddProject.bind(this)} />
          <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)} />
      </div>
    );
  }
}

export default App;
