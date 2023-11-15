import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Outlet, useLocation } from 'react-router-dom';
import NewTopic from '../../components/NewTopic';
import Topics from '../../common/Topics/Topics';
import { StyledBox } from './TopicsPage.styled';
import Contacts from '../../components/Contacts';
import Modal from '../../ui-kit/components/Modal';
import { useTopicsContext } from '../../common/Topics/TopicsContext';

const useTabletAndBelowMediaQuery = () =>
  useMediaQuery({ query: '(max-width: 1200px)' });

const useMobileMediaQuery = () =>
  useMediaQuery({ query: '(max-width: 834px)' });

function TopicsPage() {
  const isTabletAndBelow = useTabletAndBelowMediaQuery();
  const isMobile = useMobileMediaQuery();

  const { pathname } = useLocation();

  const [modalOpenNewTopic, setModalOpenNewTopic] = useState(false);
  const [contactsOpen, setContactsOpen] = useState(false);

  const { setІsTopics, setShowTopics, showTopics } = useTopicsContext();

  useEffect(() => {
    setІsTopics(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isTabletAndBelow && pathname.includes('chat')) setShowTopics(false);
    else setShowTopics(true);
  }, [setShowTopics, isTabletAndBelow, pathname, isMobile]);

  const handleModal = () => {
    setModalOpenNewTopic(!modalOpenNewTopic);
  };

  const handleContacts = () => {
    setContactsOpen(!contactsOpen);
  };

  return (
    <StyledBox>
      {showTopics && <Topics handleBTNFunc={handleModal} />}
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
