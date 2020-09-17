import ApiController from './apiController';
// import { getToken } from '../middleware/middleware-passport';

class UserController extends ApiController {
  constructor() {
    super();
    // this._userReposotory = userRepository;
  }

  async helloWorld(req,res){

    console.log("Hello Test");
    const newUser = {"hello": "HELLO HELLO WORLD"};
    this.httpCreated(res,newUser, { password: null });
  }

}

export default UserController;