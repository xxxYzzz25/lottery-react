import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import ParticipaterList from '../components/Participater';
import Timer from '../components/Timer';
import Winner from '../components/Winner';
import Popup from '../components/Popup';

import { connect } from 'react-redux';
import { RootState } from '../store';
import { People } from '../store/lottery/type';

interface OwnProps {
  className: any;
}
interface StateProps {
  isPopup: boolean;
}
type TProps = OwnProps & StateProps;

const Home: React.FC<TProps> = ({ className, isPopup }) => {
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
