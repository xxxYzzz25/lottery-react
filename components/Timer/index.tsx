import React, { useState, useEffect } from 'react';
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
  participaterList: People[];
}
interface DispatchProps {
  setWinner: () => void;
}
type TProps = OwnProps & StateProps & DispatchProps;

const Timer: React.FC<TProps> = ({ className, setWinner, participaterList }) => {
  const [totalCount, setTotalCount] = useState(1);
  const [isBtnClick, setIsBtnClick] = useState(true);
  const [min, setInputMin] = useState(0);
  const [sec, setInputSec] = useState(0);
  const [isNotice, setIsNotice] = useState(false);
  const [notice, setNotice] = useState('');

  const paddedFormat = function (num: number) {
    return num < 10 ? '0' + num : num;
  };

  const confirmTimer = function () {
    if (totalCount > 0 && totalCount <= 100) {
      setIsNotice(false);
      setIsBtnClick(false);
      let remaining = totalCount * 60 - 1;
      let countInterval = setInterval(function () {
        setInputMin(Math.floor(remaining / 60));
        setInputSec(Math.floor(remaining % 60));

        remaining -= 1;
        if (remaining < 0) {
          clearInterval(countInterval);
          setIsBtnClick(true);
          setWinner();
        }
      }, 1000);
    } else if (totalCount > 100) {
      setIsNotice(true);
      setNotice('不能輸入大於 100 的數字');
    } else {
      setIsNotice(true);
      setNotice('不能輸入小於 1 的數字');
    }
  };

  useEffect(() => {
    participaterList.length <= 0 ? setIsBtnClick(false) : setIsBtnClick(true);
  }, [participaterList]);

  return (
    <div className={className}>
      <div className='title' onClick={() => setWinner()}>
        抽獎時間
      </div>
      <div className='timeBox'>
        <div className='input'>
          <input
            type='number'
            value={totalCount}
            onChange={(e: any) => {
              setTotalCount(e.target.value);
            }}
          />
          <div className='minute'>分鐘</div>
        </div>
        <div className={isBtnClick ? 'btn' : 'btn disable'} onClick={confirmTimer}>
          設定
        </div>
      </div>
      {isNotice ? <div className='notice'>{notice}</div> : null}
      {participaterList.length <= 0 ? (
        <div className='showFeedback'>已沒有參與者了喔！</div>
      ) : (
        <div className='showCount'>{paddedFormat(min) + ' : ' + paddedFormat(sec)}</div>
      )}
    </div>
  );
};

const StyledTimer = styled(Timer)`
  width: 100%;
  font-weight: bold;
  position: relative;
  .title {
    text-align: center;
    font-size: 1.3rem;
    border-bottom: 5px solid #069;
    background: #069;
    color: #fff;
    padding: 2% 0%;
  }
  .timeBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding: 2% 3%;
    .input {
      width: 45%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      input {
        width: 75%;
        outline: none;
        border: 3px solid #069;
        padding: 2%;
        font-size: 1.3rem;
        color: #069;
        font-weight: bold;
      }
      .minute {
        color: #069;
      }
    }
    .btn {
      padding: 1% 5%;
      border-radius: 5px;
      text-align: center;
      background: #069;
      color: #fff;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    }
    .disable {
      display: none;
    }
  }
  .notice {
    color: #f00;
    position: absolute;
    top: 56%;
    left: 3%;
  }
  .showFeedback {
    font-size: 2rem;
    color: #f00;
    margin: 8% 0%;
    text-align: center;
  }
  .showCount {
    font-size: 3.5rem;
    color: #069;
    margin: 8% 0%;
    text-align: center;
  }
  @media (max-width: 414px) {
    margin-top: 10%;
  }
`;

function mapStateToProps(state: RootState): StateProps {
  return {
    participaterList: state.lottery.participaterList,
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

export default connect(mapStateToProps, mapDispatchToProps)(StyledTimer);
