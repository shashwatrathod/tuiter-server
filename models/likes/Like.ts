import Tuit from "../tuits/Tuit";
import User from "../users/User";

/**
 * @typedef Like Represents likes relationship between a user and a tuit,
 * as in a user likes a tuit
 * @property {Tuit} tuit Tuit being liked
 * @property {User} likedBy User liking the tuit
 */
export default interface Like {
  tuit: Tuit;
  likedBy: User;
}
