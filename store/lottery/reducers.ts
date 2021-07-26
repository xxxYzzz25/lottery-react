import { LotteryState, SET_WINNER_SUCCESS, SET_POPUP_SUCCESS, LotteryActionTypes } from './type';

export const lotteryState: LotteryState = {
  participaterList: [
    {
      id: 0,
      name: 'Kobe Bryant',
      avatar: 'kobe-bryant.jpg',
      specialty: 'Basketball',
    },
    {
      id: 1,
      name: 'LeBron James',
      avatar: 'lebron-james.jpg',
      specialty: 'Basketball',
    },
    {
      id: 2,
      name: 'Gerrit Cole',
      avatar: 'gerrit-cole.jpg',
      specialty: 'Baseball',
    },
    {
      id: 3,
      name: 'Shohei Ohtani',
      avatar: 'shohei-ohtani.jpg',
      specialty: 'Baseball',
    },
    {
      id: 4,
      name: 'Buster Posey',
      avatar: 'buster-posey.jpg',
      specialty: 'Baseball',
    },
    {
      id: 5,
      name: 'Novak Djokovic',
      avatar: 'novak-djokovic.jpg',
      specialty: 'Tennis',
    },
    {
      id: 6,
      name: 'Roger Federer',
      avatar: 'roger-federer.jpg',
      specialty: 'Tennis',
    },
    {
      id: 7,
      name: 'Cristiano Ronaldo',
      avatar: 'cristiano-ronaldo.jpg',
      specialty: 'Soccer',
    },
    {
      id: 8,
      name: 'Lionel Messi',
      avatar: 'lionel-messi.jpeg',
      specialty: 'Soccer',
    },
  ],
  winnerList: [],
  winner: {
    id: 0,
    name: '',
    avatar: '',
    specialty: '',
  },
  isPopup: false,
};

export function lotteryReducer(state = lotteryState, action: LotteryActionTypes): LotteryState {
  switch (action.type) {
    case SET_WINNER_SUCCESS:
      const max = state.participaterList.length;
      const random = Math.floor(Math.random() * max);
      const winner = state.participaterList.find((item, index, array) => array[random]);
      if (winner) {
        const final = state.participaterList.filter((item) => {
          return item.id !== winner.id;
        });
        const mo = function (e: any) {
          e.preventDefault();
        };
        document.body.style.overflow = 'hidden';
        document.addEventListener('touchmove', mo, false);
        return {
          ...state,
          winner: winner,
          winnerList: state.winnerList.concat(winner),
          participaterList: final,
          isPopup: true,
        };
      }
    case SET_POPUP_SUCCESS:
      const mo = function (e: any) {
        e.preventDefault();
      };
      document.body.style.overflow = ''; //出现滚动条
      document.removeEventListener('touchmove', mo, false);
      return {
        ...state,
        isPopup: false,
      };

    default:
      return state;
  }
}
