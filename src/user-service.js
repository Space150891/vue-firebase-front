const Firebase = require('firebase');
const fb = Firebase.initializeApp({
  apiKey: 'AIzaSyDBmqZfJBjR_pp7eh9WGeX-4DSRDzq-ZKQ',
  authDomain: 'vue-firebase-tst.firebaseapp.com',
  databaseURL: 'https://vue-firebase-tst.firebaseio.com',
  projectId: 'vue-firebase-tst',
  messagingSenderId: '772405275433',
  appId: 'project-772405275433'
});

const db = fb.firestore();
const userCollection = db.collection('users')

export const getUserList = async () => {
  const users = [];

  const data = await userCollection.get().then((result) => {
    result.forEach(user => {/* 
      console.log('user', user.id, user); */
      users.push({id:user.id, ... user.data()}); 
    });
  })
  .catch(e => {console.log('e', e)});
  // return await data.map(user => user);
  return users;
}
export const getUser = async (id) => {
  return await userCollection.doc(id).get().data()
}
export const postUser = async (data) => {
  return await userCollection.add(data)
}
export const updateUser = async (id, data) => {
  return await userCollection.doc(id).update(data)
}
