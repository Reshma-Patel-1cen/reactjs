'use strict';
import sha1 from 'sha1';
import { createRecord, updateUser, getRecord, getAllDetails, deleteUSer } from '../../utils/apiUtils';

export default app => {

  app.get('/users', async (req, res) => {

    const result = await getAllDetails("users");
    if (result.error) {
      return res.status(400).send(result);
    }
    return res.send({ success: true, data: result });
  });

  app.post('/user', async (req, res) => {
    const userData = {
      user_name: req.body.userName,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      password: sha1(req.body.password),
      user_email: req.body.email,
      status: parseInt(req.body.status),
      user_role: JSON.stringify(req.body.roles)
    };
    console.log("userData",userData)
    const result = await createRecord(userData, 'users');
    if (result.error) {
      return res.status(400).send(result);
    }
    return res.send({ success: true, data: result });
  });

  app.route("/user/:id").get(async (req, res) => {
    const result = await getRecord("users", "user_id", req.params.id);
    if (result.error) {
      return res.status(400).send(result);
    }
    return res.send({ success: true, data: result });
  }).put(async (req, res) => {
    console.log("req", req.body);
    const userData = {
      user_name: req.body.userName,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      user_email: req.body.email,
      status: parseInt(req.body.status),
      user_role: JSON.stringify(req.body.roles)
    };
    const result = await updateUser(userData, "users", "user_id", req.params.id);
    if (result.error) {
      return res.status(400).send(result);
    }
    return res.send({ success: true, data: result });
  }).delete(async (req, res) => {
    console.log("idd",req.params.id)
    const result = await deleteUSer("users","user_id",req.params.id);
    if (result.error) {
      return res.status(400).send(result);
    }
    return res.send({ success: true, data: result });
  });
}
