import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Outlet } from 'react-router-dom';
import NewTopic from '../../components/NewTopic';
import Topics from '../../common/Topics/Topics';
import { StyledBox } from './TopicsPage.styled';
import Contacts from '../../components/Contacts';
import Modal from '../../ui-kit/components/Modal';
import { useTopicsContext } from '../../common/Topics/TopicsContext';

const useTabletAndBelowMediaQuery = () =>
  useMediaQuery({ query: '(max-width: 1200px)' });

function TopicsPage() {
  const isTabletAndBelow = useTabletAndBelowMediaQuery();

  const [modalOpenNewTopic, setModalOpenNewTopic] = useState(false);
  const [contactsOpen, setContactsOpen] = useState(false);

  const { setІsTopics } = useTopicsContext();

  useEffect(() => {
    setІsTopics(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleModal = () => {
    setModalOpenNewTopic(!modalOpenNewTopic);
  };

  const handleContacts = () => {
    setContactsOpen(!contactsOpen);
  };

  return (
    <StyledBox>
      <Topics handleBTNFunc={handleModal} />
      {modalOpenNewTopic && (
        <Modal closeModal={() => setModalOpenNewTopic(false)}>
          {<NewTopic closeModal={() => setModalOpenNewTopic(false)} />}
        </Modal>
      )}
      {<Outlet />}
      {contactsOpen && isTabletAndBelow ? (
        <Modal closeModal={() => handleContacts(!contactsOpen)}>
          <Contacts title="Культурна мозаїка: автентичний досвід" />
        </Modal>
      ) : contactsOpen ? (
        <Contacts title="Культурна мозаїка: автентичний досвід" />
      ) : null}
    </StyledBox>
  );
}

export default TopicsPage;
