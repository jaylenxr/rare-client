// Context API Docs: https://beta.reactjs.org/learn/passing-data-deeply-with-context

'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { firebase } from '@/utils/client';
import { checkUser } from '@/utils/auth'; // Call out: In your AuthContext provider file, import checkUser

const AuthContext = createContext();

AuthContext.displayName = 'AuthContext'; // Context object accepts a displayName string property. React DevTools uses this string to determine what to display for the context. https://reactjs.org/docs/context.html#contextdisplayname

function AuthProvider(props) {
  const [user, setUser] = useState(null);

  // there are 3 states for the user:
  // null = application initial state, not yet loaded
  // false = user is not logged in, but the app has loaded
  // an object/value = user is logged in

  const [oAuthUser, setOAuthUser] = useState(null); // Track the raw Firebase user

  const updateUser = useMemo(
    () => (uid) =>
      checkUser(uid).then((gamerInfo) => {
        setUser({ fbUser: oAuthUser, ...gamerInfo });
      }),
    [oAuthUser],
  ); // Provide an updateUser callback below your state

  useEffect(() => {
    firebase.auth().onAuthStateChanged((fbUser) => {
      if (fbUser) {
        setOAuthUser(fbUser);
        checkUser(fbUser.uid).then((gamerInfo) => {
          setUser({ fbUser, uid: fbUser.uid, ...gamerInfo });
        });
      } else {
        setOAuthUser(false);
        setUser(false);
      }
    }); // creates a single global listener for auth state changed
  }, []);

  const value = useMemo(
    () => ({
      user,
      userLoading: user === null || oAuthUser === null,
      updateUser,
    }),
    [user, oAuthUser, updateUser],
  ); // Update your context value memo

  return <AuthContext.Provider value={value} {...props} />;
}
const AuthConsumer = AuthContext.Consumer;

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth, AuthConsumer };




// // Context API Docs: https://beta.reactjs.org/learn/passing-data-deeply-with-context

// 'use client';

// import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
// import { firebase } from '@/utils/client';


// const AuthContext = createContext();

// AuthContext.displayName = 'AuthContext'; // Context object accepts a displayName string property. React DevTools uses this string to determine what to display for the context. https://reactjs.org/docs/context.html#contextdisplayname

// function AuthProvider(props) {
//   const [user, setUser] = useState(null);

//   // there are 3 states for the user:
//   // null = application initial state, not yet loaded
//   // false = user is not logged in, but the app has loaded
//   // an object/value = user is logged in

//   useEffect(() => {
//     firebase.auth().onAuthStateChanged((fbUser) => {
//       if (fbUser) {
//         setUser(fbUser);
//       } else {
//         setUser(false);
//       }
//     }); // creates a single global listener for auth state changed
//   }, []);

//   const value = useMemo(
//     // https://reactjs.org/docs/hooks-reference.html#usememo
//     () => ({
//       user,
//       userLoading: user === null,
//       // as long as user === null, will be true
//       // As soon as the user value !== null, value will be false
//     }),
//     [user],
//   );

//   return <AuthContext.Provider value={value} {...props} />;
// }
// const AuthConsumer = AuthContext.Consumer;

// const useAuth = () => {
//   const context = useContext(AuthContext);

//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export { AuthProvider, useAuth, AuthConsumer };
