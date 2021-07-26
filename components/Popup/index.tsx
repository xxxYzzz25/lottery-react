import React, { useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { setPopup } from '../../store/lottery/actions';
import { People } from '../../store/lottery/type';

interface OwnProps {
  className: any;
}
interface StateProps {
  winner: People;
}
interface DispatchProps {
  setPopup: () => void;
}
type TProps = OwnProps & StateProps & DispatchProps;

const Popup: React.FC<TProps> = ({ className, winner, setPopup }) => {
  const handleClose = () => {
    console.log(1);
    setPopup();
  };
  return (
    <div className={className} onClick={handleClose}>
      <div className='popupBox'>
        <div className='title'>
          你中獎了
          <span onClick={handleClose}>X</span>
        </div>
        <div className='peopleItem'>
          <div
            style={{ background: `url(/${winner.avatar})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}
            className='avatar'
          ></div>
          <div className='peopleName'>{winner.name}</div>
        </div>
      </div>
    </div>
  );
};

const StyledPopup = styled(Popup)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  .popupBox {
    width: 50%;
    height: 50%;
    background: #fff;
    font-weight: bold;
    border-radius: 20px 20px 0 0;
    .title {
      text-align: center;
    font-size: 1.3rem;
      border-bottom: 5px solid #069;
      background: #069;
      color: #fff;
      padding: 2% 0%;
      border-radius: 20px 20px 0 0;
      position: relative;
      span {
        position: absolute;
        right: 5%;
        cursor: pointer;
      }
    }
    .peopleItem {
      height: 100%;
      border-radius: 0 0 20px 20px;
      background: #fff;
      color: #069;
      padding: 2% 0%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      border-bottom: 3px solid #069;
      text-align: center;
      &:last-child {
        border-bottom: none;
      }
      .avatar {
        width: 30%;
        padding-top: 30%;
        border-radius: 50%;
      }
      .peopleName {
        font-size: 2rem;
      }
    }
  }
  @media (max-width: 768px) {
    .popupBox {
      width: 80%;
      height: 50%;
      .peopleItem {
        .avatar {
          width: 50%;
          padding-top: 50%;
        }
      }
    }
  }
  @media (max-width: 414px) {
    .popupBox {
      width: 80%;
      height: 50%;
    }
  }
`;

function mapStateToProps(state: RootState): StateProps {
  return {
    winner: state.lottery.winner,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return bindActionCreators(
    {
      setPopup,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(StyledPopup);
