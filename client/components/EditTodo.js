import React, { Component } from 'react';
import { deleteTodo, updateTodo } from '../store/effects/effects';
import { connect } from 'react-redux';
import axios from 'axios';

class EditTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
      assignee: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const todo = (await axios.get(`/api/todos/${this.props.match.params.id}`)).data;
    this.setState({
      taskName: todo.taskName,
      assignee: todo.assignee
    });
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateTodo({ id: this.props.match.params.id, ...this.state });
  }

  render() {
    const { assignee, taskName } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <div>
        <form id='todo-form' onSubmit={handleSubmit}>
          <label htmlFor='taskName'>Task Name:</label>
          <input name='taskName' onChange={handleChange} value={taskName} />

          <label htmlFor='assignee'>Assign To:</label>
          <input name='assignee' onChange={handleChange} value={assignee} />

          <button type='submit'>Submit</button>
        </form>
        <form onSubmit={(ev) => ev.preventDefault()}>
          <button
            className='remove'
            onClick={() => this.props.deleteTodo({ id: this.props.match.params.id })}
          >
            Delete
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  updateTodo: (todo) => dispatch(updateTodo(todo, history)),
  deleteTodo: (todo) => dispatch(deleteTodo(todo, history))
});

export default connect(null, mapDispatchToProps)(EditTodo);
