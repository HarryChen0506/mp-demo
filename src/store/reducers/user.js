import { LOAD_USER_DATA, CLEAR_USER_DATA } from '../constants/user'

export const INITIAL_USER_STATE = {
  login: false,
  bindMobile: false,
  userId: null,
  username: null,
  avatar: null,
  enterpriseId: null,
  openId: null,
  token: null,
  wxUserInfo: {
    avatarUrl: '',
    city: '',
    country: '',
    gender: 1,
    language: '',
    nickName: '',
    province: ''
  }
}

// export const INITIAL_USER_STATE = {
//   id: 8,
//   token: 'bfeca98fb31247118ddc19287141a28c',
//   refreshToken: "ca8f6f3e63d340afa8456135d94a2fda",
//   login: true,
//   wxUserInfo: {
//     avatarUrl: '',
//     city: '',
//     country: '',
//     gender: 1,
//     language: '',
//     nickName: '',
//     province:''
//   }
// }

export default function user(state = INITIAL_USER_STATE, action) {
  switch (action.type) {
    case LOAD_USER_DATA:
      return {
        ...state,
        ...action.payload
      }
    case CLEAR_USER_DATA:
      return {
        ...INITIAL_USER_STATE
      }
    default:
      return state
  }
}
