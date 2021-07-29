import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { setWinner } from '../../store/lottery/actions';
import { People } from '../../store/lottery/type';

interface OwnProps {
  className: any;
}
interface StateProps {
  winnerList: People[];
}
interface DispatchProps {
  setWinner: () => void;
}
type TProps = OwnProps & StateProps & DispatchProps;

const Winner: React.FC<TProps> = ({ className, winnerList }) => {
  return (
    <div className={className}>
      <div className='title'>中獎名單</div>
      <div className='listHead'>
        <div className='avatar'>Avatar</div>
        <div className='peopleName'>Name</div>
        <div className='peopleSpecialty'>Specialty</div>
      </div>
      <div className='peopleBox'>
        {winnerList.map((person) => {
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

const StyledWinner = styled(Winner)`
  width: 100%;
  border: 5px solid #069;
  font-weight: bold;
  height: 50vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
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
    .peopleItem {
      background: #fff;
      color: #069;
      padding: 2% 0%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-bottom: 3px solid #069;
      text-align: center;
      &:last-child {
        border-bottom: none;
      }
      .avatar {
        padding-top: 20%;
        border-radius: 50%;
      }
    }
  }
  .avatar {
    width: 20%;
  }
  .peopleName {
    width: 35%;
  }
  .peopleSpecialty {
    width: 35%;
  }
  @media (max-width: 1366px) {
    height: 50vh;
  }
`;

function mapStateToProps(state: RootState): StateProps {
  return {
    winnerList: state.lottery.winnerList,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return bindActionCreators(
    {
      setWinner,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(StyledWinner);
