const validateInput = (type, userObject) => {
  let errors = {};

  if (type === 'login') {
    if (!userObject.username || !userObject.password) {
      return 'All fields are required';
    } else if (!/^[a-zA-Z0-9 ]+$/.test(userObject.username)) {
      return 'Username can only be letters and numbers';
    } else {
      return;
    }
  } else {
    if (!this.state.username || !this.state.password) {
      return this.setState({
        error: 'All fields are required',
      });
    } else if (!/^[a-zA-Z0-9 ]+$/.test(this.state.username)) {
      return this.setState({
        error: 'Username can only be letters and numbers',
      }); 
    } else {
      return true;
    }
  }
}

export default validateInput;