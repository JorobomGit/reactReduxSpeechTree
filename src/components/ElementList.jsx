import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

export class ElementList extends Component {
  constructor() {
    super();
    this.state = {
      inputText: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  cardClass(id) {
    const { unselectable, selectedItem } = this.props;
    if (unselectable) {
      return 'element-list-card element-list-card-unselectable';
    }
    return `element-list-card ${selectedItem === id ? 'element-list-card-selected' : 'element-list-card-unselected'}`;
  }

  elementListClass() {
    return this.props.elements.length > 0 ? 'element-list' : 'element-list-empty';
  }

  handleChange(event) {
    this.setState({ inputText: event.target.value });
  }

  render() {
    const elements = this.props.elements || [];
    const { showAddButton } = this.props;
    const { inputText } = this.state;
    return (
      <div>
        <div className={this.elementListClass()}>
          {elements.length > 0 ? elements.map((el) => (
            <div
              key={el.id}
              className={this.cardClass(el.id)}
              role="button"
              tabIndex="0"
              onClick={() => this.props.clickCallback(el.id)}
              onKeyUp={() => {}}
            >
              {el.title}
            </div>
          )) : <span>This element doesn&apos;t have any child yet</span> }
        </div>
        {showAddButton ? (
          <div className="element-list-buttons">
            <input type="text" value={inputText} onChange={this.handleChange} className="form-control element-list-input" />
            <button
              disabled={!inputText}
              type="button"
              className="btn btn-primary mt-3"
              onClick={() => { this.props.addCallback(inputText); this.setState({ inputText: '' }); }}
            >
                Add child to this element
            </button>
          </div>
        ) : ''}
      </div>
    );
  }
}


ElementList.defaultProps = {
  clickCallback: () => {},
  addCallback: () => {},
  showAddButton: false,
  unselectable: false,
  selectedItem: '',
};

ElementList.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.object).isRequired,
  clickCallback: PropTypes.func,
  addCallback: PropTypes.func,
  showAddButton: PropTypes.bool,
  unselectable: PropTypes.bool,
  selectedItem: PropTypes.string,
};

export default ElementList;
