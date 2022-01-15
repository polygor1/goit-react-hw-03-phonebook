import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactList.module.css';

export class ContactListItem extends Component {
  render() {
    return (
      <li className={styles.li}>
        {this.props.name}: {this.props.number}
        <button
          className={styles.button}
          type="button"
          onClick={this.props.onDeleteContact}
        >
          Delete
        </button>
      </li>
    );
  }
}

ContactListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  onDeleteContact: PropTypes.func.isRequired,
};
