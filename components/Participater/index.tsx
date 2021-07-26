import React, { useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { People } from '../../store/lottery/type';

interface OwnProps {
  className: any;
}
interface StateProps {
  participaterList: People[];
}
interface DispatchProps {}
type TProps = OwnProps & StateProps & DispatchProps;

const Participater: React.FC<TProps> = ({ className, participaterList }) => {
  return (
    <div className={className}>
      <div className='title'>抽獎名單</div>
      <div className='listHead'>
        <div className='avatar'>Avatar</div>
        <div className='peopleName'>Name</div>
        <div className='peopleSpecialty'>Specialty</div>
      </div>
      <div className='peopleBox'>
        {participaterList.map((person) => {
          return (
            <div key={person.id} className='peopleItem'>
              <div
                style={{ background: `url(/${person.avatar})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}
                className='avatar'
              ></div>
              <div className='peopleName'>{person.name}</div>
              <div className='peopleSpecialty'>{person.specialty}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const StyledParticipater = styled(Participater)`
  width: 45%;
  border: 5px solid #069;
  font-weight: bold;
  .title {
    text-align: center;
    font-size: 1.3rem;
    border-bottom: 5px solid #069;
    background: #069;
    color: #fff;
    padding: 2% 0%;
  }
  .listHead {
    display: flex;
    justify-content: space-around;
    text-align: center;
    font-size: 1.3rem;
    border-bottom: 5px solid #069;
    background: #fff;
    color: #069;
    padding: 2% 0%;
  }
  .peopleBox {
    height: 70vh;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .peopleItem {
      background: #fff;
      color: #069;
      padding: 3% 0%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-bottom: 3px solid #069;
      text-align: center;
      &:last-child {
        border-bottom: none;
      }
      .avatar {
        padding-top: 25%;
        border-radius: 50%;
      }
    }
  }
  .avatar {
    width: 25%;
  }
  .peopleName {
    width: 35%;
  }
  .peopleSpecialty {
    width: 35%;
  }
  @media (max-width: 1024px) {
    .peopleBox {
      height: 73vh;
    }
  }
  @media (max-width: 768px) {
    .peopleBox {
      height: 52vh;
    }
  }
  @media (max-width: 414px) {
    width: 100%;
  }
`;

function mapStateToProps(state: RootState): StateProps {
  return {
    participaterList: state.lottery.participaterList,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StyledParticipater);
