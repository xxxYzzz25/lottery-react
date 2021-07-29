import Head from 'next/head';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import ParticipaterList from '../components/Participater';
import Timer from '../components/Timer';
import Winner from '../components/Winner';
import Popup from '../components/Popup';

import { connect } from 'react-redux';
import { RootState } from '../store';

interface OwnProps {
  className: any;
}
interface StateProps {
  isPopup: boolean;
}
type TProps = OwnProps & StateProps;

const Home: React.FC<TProps> = ({ className, isPopup }) => {
  useEffect(() => {
    if (isPopup) {
      const mo = function (e: any) {
        e.preventDefault();
      };
      document.body.style.overflow = 'hidden';
      document.addEventListener('touchmove', mo, false);
    } else {
      const mo = function (e: any) {
        e.preventDefault();
      };
      document.body.style.overflow = '';
      document.removeEventListener('touchmove', mo, false);
    }
  }, [isPopup]);
  
  return (
    <div className={className}>
      <Head>
        <title>Next Lottery</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {isPopup ? <Popup className /> : null}
      <div className='container'>
        <ParticipaterList className />
        <div className='right'>
          <Timer className />
          <Winner className />
        </div>
      </div>
    </div>
  );
};

const StyledHome = styled(Home)`
  height: 100vh;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    width: 90%;
    display: flex;
    justify-content: space-between;
    .right {
      width: 50%;
    }
  }
  @media (max-width: 414px) {
    height: auto;
    .container {
      flex-direction: column;
      padding: 5% 0;
      .right {
        width: 100%;
      }
    }
  }
`;

function mapStateToProps(state: RootState): StateProps {
  return {
    isPopup: state.lottery.isPopup,
  };
}

export default connect(mapStateToProps)(StyledHome);
