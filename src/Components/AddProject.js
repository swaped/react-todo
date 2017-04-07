import React, { Component } from 'react';
import uuid from 'uuid';

class AddProject extends Component {

	constructor(){
		super();
		this.state = {
			newProject:{}
		}
	}

	static defaultProps = {
		categories: ['Design', 'Development', 'Mobile']
	}

	handleSubmit(e){
		console.log('form submit: ' + this.refs.title.value);
		e.preventDefault();

		if(this.refs.title.value) {
			this.setState({newProject: {
				id: uuid.v4(),
				title: this.refs.title.value,
				category: this.refs.category.value

			}}, function(){
				console.log(this.state);
				this.props.addProject(this.state.newProject)
			});
		}
	}


	render() {
		let categoryOptions = this.props.categories.map(category => {
			return <option key={category} value={category}>{category}</option>
		});

		return (
		  <div>
		    	<h3>Add Project</h3>
		    	<form onSubmit={this.handleSubmit.bind(this)}>
		    		<div>
		    			<label>Title</label>
		    			<input type="text" ref="title" />
		    		</div>
		    		<div>
		    			<label>Categories</label>
		    			<select ref="category">
		    				{categoryOptions}
		    			</select>
		    		</div>

		    		<br />
		    		<input type="submit" value="submit" />
		    		<br /><br />


		    	</form>
		  </div>
		);
	}
}

AddProject.propTypes = {
	categories: React.PropTypes.array,
	addProject: React.PropTypes.func
}

export default AddProject;
