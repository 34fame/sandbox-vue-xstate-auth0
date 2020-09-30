import { SessionStorage as ss } from 'quasar'
import decode from 'jwt-decode'
import auth0 from 'auth0-js'

const auth = new auth0.WebAuth({
   clientID: process.env.AUTH0_CLIENTID,
   domain: process.env.AUTH0_DOMAIN,
   redirectUri: process.env.AUTH0_REDIRECTURI,
   audience: process.env.AUTH0_AUDIENCE,
   responseType: 'token id_token',
})

const authSvc = auth
export { authSvc }

export function login() {
   auth.authorize()
}

export function logout() {
   auth.logout({
      returnTo: 'http://localhost:8080/logout',
   })
}

export function verifySession(fn) {
   auth.parseHash({ hash: window.location.hash }, function(err, authResult) {
      if ((!err && !authResult) || err) {
         fn(false)
      } else {
         fn(true)
      }
   })
}

export function loadTokens() {
      auth.parseHash({ hash: window.location.hash }, function(err, authResult) {
         if (!err) {
            ss.set('access_token', authResult.accessToken)
            ss.set('id_token', authResult.idToken)
         }
      })
}

export function loadProfile() {
   const accessToken = ss.getItem('access_token')
   auth.client.userInfo(accessToken, async (err, user) => {
      if (!err) {
         ss.set('user', user)
      }
   })
}

function getParameterByName(name) {
   const match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash)
   return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}

function getTokenExpirationDate(encodedToken) {
   const token = decode(encodedToken)
   if (!token.exp) {
      return null
   }

   const date = new Date(0)
   date.setUTCSeconds(token.exp)
   return date
}

function isTokenExpired(token) {
   const expirationDate = getTokenExpirationDate(token)
   return expirationDate < new Date()
}
