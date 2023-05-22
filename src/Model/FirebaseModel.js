import database from '@react-native-firebase/database';
import {categories} from '../Function';
export class FireBaseModel {
  constructor(path) {
    this.basePath = path;
  }

  addTransaction = (userId, obj) => {
    database()
      .ref(userId + '/' + this.basePath)
      .set(obj);
  };

  addTotalData = (userId, date, category, time, arr) => {
    database()
      .ref(
        userId + '/' + this.basePath + '/' + date + '/' + category + '/' + time,
      )
      .set(arr);
    //   .push(obj);
  };

  addAmountData = (userId, obj) => {
    database()
      .ref(userId + '/' + 'total')
      .set(obj);
  };

  addCategory = async (userId, category) => {
    console.log('inside dats');
    const data = await database()
      .ref(userId + '/' + 'categories' + '/')
      .push(category);
    // .set(category);

    console.log(data);
  };

  getTotalData = async userId => {
    const data = await database()
      .ref(userId + '/' + this.basePath)
      .once('value');

    return data.val();
  };

  getRecentData = async userId => {
    let data = '';
    // const data = await database()
    //   .ref(userId + '/' + this.basePath)
    //   .once('value');

    return data;
  };

  getTotalAmount = async userId => {
    const data = await database()
      .ref(userId + '/' + 'total')
      .once('value');

    return data.val();
  };

  getCategories = async userId => {
    const data = await database()
      .ref(userId + '/' + 'categories')
      .once('value');

    return data.val();
  };

  deleteData = async (userId, key, category, timeStamp) => {
    const response = await database()
      .ref(
        userId + '/' + this.basePath + key + '/' + category + '/' + timeStamp,
      )
      .remove();

    //
  };

  deleteRecent = async (userId, index) => {
    const response = await database()
      .ref(userId + '/' + this.basePath + '/' + index)
      .remove();
  };
}

export const Models = {
  recentData: new FireBaseModel('recent/'),
  totalData: new FireBaseModel('data/'),
};
