import React from 'react';

class OptionButtons extends React.Component {
  constructor(props) {
    super(props)
  }

  changeOption = (e) => {
    this.props.changeOption(this.props.type, e.target.name);
  }

  render() {
    let buttons = this.props.options.map((option, i) => <button key={i} onClick={this.changeOption} name={option}>{option}</button>)
    return(<div>
        {buttons}
    </div>)
  }
}

export default OptionButtons;
