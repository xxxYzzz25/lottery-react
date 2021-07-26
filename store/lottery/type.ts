export interface People {
  id: number;
  name: string;
  avatar: string;
  specialty: string;
}

export interface LotteryState {
  participaterList: People[];
  winnerList: People[];
  winner: People;
  isPopup: boolean;
}

export const SET_WINNER_SUCCESS = 'SET_WINNER_SUCCESS';
export const SET_POPUP_SUCCESS = 'SET_POPUP_SUCCESS';

interface SetWinnerAction {
  type: typeof SET_WINNER_SUCCESS;
}
interface SetPopupAction {
  type: typeof SET_POPUP_SUCCESS;
}

export type LotteryActionTypes = SetWinnerAction | SetPopupAction;
