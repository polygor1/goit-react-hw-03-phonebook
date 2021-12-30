import './App.css';

import { Component } from 'react';
import { ContactForm } from './components/ContactForm';
import { ContactList } from './components/ContactList';
import Filter from './components/Filter';

import { nanoid } from 'nanoid';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = data => {
    const nextName = data.name.toLowerCase();
    // проверка на совпадение с БД
    if (
      this.state.contacts.filter(item => item.name.toLowerCase() === nextName)
        .length === 0
    ) {
      // заносим в БД новенького
      data.id = nanoid();
      const contact = { ...data };
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    } else {
      // или ругаемся
      alert(data.name + ' is already in contacts');
    }
  };

  changeFilter = event => {
    // вносим строку поиска в this.state.filter
    this.setState({ filter: event.currentTarget.value });
  };

  deleteContact = targetId => {
    // создаем новый массив БД без элемента с выбранным ID (типа удаляем выбранный ID)
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== targetId),
    }));
  };

  getVisibleContact = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    // ищем контакты в БД по имени из this.state.filter
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  render() {
    const { filter } = this.state;
    const visbleContact = this.getVisibleContact();

    return (
      <div className="App">
        <h1>goit-react-hw-02-phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2 className="title"> Contacts </h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={visbleContact}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
