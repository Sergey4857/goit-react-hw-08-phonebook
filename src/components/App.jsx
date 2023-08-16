import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoading, selectVisibleContacts } from '../Redux/Selectors';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from '../components/App.module.css';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { fetchContacts } from '../Redux/Operations';
import { useEffect } from 'react';

import Spinner from './Spinner/Spinner';

export function App() {
  const visibleContacts = useSelector(selectVisibleContacts);
  const loading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <div className={css.wrap}>
        {loading && <Spinner />}
        <div className={css.container}>
          <h1 className={css.PhoneTitle}>Phonebook</h1>
          <ContactForm />
          <h2 className={css.ContactTitle}>Contacts</h2>
          <Filter />

          {visibleContacts.length > 0 ? (
            <ContactList />
          ) : (
            <p>You don't have contacts, add them above👆 </p>
          )}
        </div>
      </div>
    </>
  );
}
