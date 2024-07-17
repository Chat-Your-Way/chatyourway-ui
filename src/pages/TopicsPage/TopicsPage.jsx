/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import NewTopic from '../../components/NewTopic';
import Topics from '../../common/Topics/Topics';
import { StyledBox } from './TopicsPage.styled';
import Contacts from '../../components/Contacts';
import Modal from '../../ui-kit/components/Modal';
import { useTopicsPageContext } from './TopicsPageContext';
import { useTopicsContext } from '../../common/Topics/TopicsContext';

const useTabletAndBelowMediaQuery = () =>
  // useMediaQuery({ query: '(max-width: 770px)' });
  useMediaQuery({ query: '(max-width: 1199px)' });

const useMobileMediaQuery = () =>
  // useMediaQuery({ query: '(max-width: 769px)' });
  useMediaQuery({ query: '(max-width: 767px)' });

function TopicsPage() {
  const isTabletAndBelow = useTabletAndBelowMediaQuery();
  const isMobile = useMobileMediaQuery();

  const { pathname } = useLocation();
  let { title } = useParams();

  const [modalOpenNewTopic, setModalOpenNewTopic] = useState(false);

  const { contactsOpen, setContactsOpen } = useTopicsPageContext();
  const { setІsTopics, setShowTopics, showTopics } = useTopicsContext();

  useEffect(() => {
    setІsTopics(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isTabletAndBelow && pathname.includes('chat')) {
      setShowTopics(false);
    } else setShowTopics(true);
  }, [setShowTopics, isTabletAndBelow, pathname, isMobile]);

  const handleModal = () => {
    setModalOpenNewTopic(!modalOpenNewTopic);
  };

  return (
    <StyledBox>
      {showTopics && <Topics handleModal={handleModal} />}
      {modalOpenNewTopic && (
        <Modal closeModal={() => setModalOpenNewTopic(!contactsOpen)}>
          {<NewTopic closeModal={() => setModalOpenNewTopic(false)} />}
        </Modal>
      )}
      {<Outlet />}
      {contactsOpen && isTabletAndBelow ? (
        <Modal closeModal={() => setContactsOpen(false)} location="right">
          <Contacts title={title} />
        </Modal>
      ) : contactsOpen ? (
        <Contacts title={title} />
      ) : null}
    </StyledBox>
  );
}

export default TopicsPage;
