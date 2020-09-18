import express from 'express';

class BaseRouter {
  constructor(controller) {
    this.router = express.Router();
    this.controller = controller;
  }

  get Router() {
    return this.router;
  }

  get Controller() {
    return this.controller;
  }
}

export default BaseRouter;
