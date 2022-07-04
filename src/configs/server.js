export default {
  ROOT_ENDPOINT: 'http://18.191.86.243:80',
  // login
  LOGIN_ENDPOINT: '/login',
  // api/v1/wallet
  GET_WALLET: '/api/v1/wallet',
  // api/v1/wallet/<WALLET_ID>/token/delete
  DELETE_TOKEN: '/api/v1/wallet/{{walletId}}/token/delete',
  // api/v1/wallet/<WALLET_ID>/token
  ADD_TOKEN: '/api/v1/wallet/{{walletId}}/token',
  // api/v1/wallet/<WALLET_ID>/<TOKEN_SYMBOL>/position
  ADD_POSITION: 'api/v1/wallet/{{walletId}}/{{tokenSymbol}}/position',
  // api/v1/wallet/<WALLET_ID>/<TOKEN_SYMBOL>/delete
  DELETE_POSITION: '/api/v1/wallet/{{walletId}}/{{tokenSymbol}}/delete',
};
