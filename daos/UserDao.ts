import User from "../models/users/User";
import IUserDao from "../interfaces/IUserDao";
import UserModel from "../mongoose/users/UserModel";

/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */
export default class UserDao implements IUserDao {
  private static userDao: UserDao | null = null;

  /**
   * Creates singleton DAO instance
   * @returns UserDao
   */
  public static getInstance = (): UserDao => {
    if (UserDao.userDao === null) {
      UserDao.userDao = new UserDao();
    }
    return UserDao.userDao;
  };

  private constructor() {}

  /**
   * Uses UserModel to delete the first user that matches the criteria supplied
   *
   * @param condition the criteria based on which the user will be deleted
   */
  deleteUserByCondition = async (condition: any): Promise<any> =>
    UserModel.deleteOne(condition);

  /**
   * Uses UserModel to retrieve all user documents from users collection
   * @returns Promise To be notified when the users are retrieved from
   * database
   */
  findAllUsers = async (): Promise<User[]> => UserModel.find().exec();

  /**
   * Uses UserModel to retrieve single user document from users collection
   * @param {string} uid User's primary key
   * @returns Promise To be notified when user is retrieved from the database
   */
  findUserById = async (uid: string): Promise<any> => UserModel.findById(uid);

  /**
   * Find one user based on the given condition
   * @param condition the predicate to find user
   * @returns a user if found else null
   */
  findUserByCondition = async (condition: any): Promise<User | null> => {
    console.log(condition);
    return UserModel.findOne(condition);
  };

  /**
   * Inserts user instance into the database
   * @param {User} user Instance to be inserted into the database
   * @returns Promise To be notified when user is inserted into the database
   */
  createUser = async (user: User): Promise<User> => UserModel.create(user);

  /**
   * Updates user with new values in database
   * @param {string} uid Primary key of user to be modified
   * @param {User} user User object containing properties and their new values
   * @returns Promise To be notified when user is updated in the database
   */
  updateUser = async (uid: string, user: User): Promise<any> =>
    UserModel.updateOne({ _id: uid }, { $set: user });

  /**
   * Removes user from the database.
   * @param {string} uid Primary key of user to be removed
   * @returns Promise To be notified when user is removed from the database
   */
  deleteUser = async (uid: string): Promise<any> =>
    UserModel.deleteOne({ _id: uid });

  /**
   * Removes all users from the database. Useful for testing
   * @returns Promise To be notified when all users are removed from the
   * database
   */
  deleteAllUsers = async (): Promise<any> => UserModel.deleteMany({});
}
