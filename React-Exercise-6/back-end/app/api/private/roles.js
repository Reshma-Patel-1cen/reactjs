'use strict';
import { createRecord, updateUser, getRecord, getAllDetails, deleteUSer } from '../../utils/apiUtils';

export default app => {

  app.get('/roles', async (req, res) => {
    const result = await getAllDetails("roles", "status", 1);
    if (result.error) {
      return res.status(400).send(result);
    }
    return res.send({ success: true, data: result });
  });

  app.get('/permissions', async (req, res) => {
    const result = await getAllDetails("permissions");
    if (result.error) {
      return res.status(400).send(result);
    }
    return res.send({ success: true, data: result });
  });

  app.post('/role', async (req, res) => {
    const userData = {
      role_name: req.body.roleName,
      description: req.body.description,
      module_data: JSON.stringify(req.body.module),
      status: req.body.status
    };
    const result = await createRecord(userData, 'roles');
    if (result.error) {
      return res.status(400).send(result);
    }
    return res.send({ success: true, data: result });
  });

  app.route("/role/:id").get(async (req, res) => {
    const result = await getRecord("roles", "role_id", req.params.id);
    if (result.error) {
      return res.status(400).send(result);
    }
    return res.send({ success: true, data: result });
  }).put(async (req, res) => {
    const userData = {
      role_name: req.body.roleName,
      description: req.body.description,
      module_data: JSON.stringify(req.body.module),
      status: req.body.status
    };
    const result = await updateUser(userData, "roles", "role_id", req.params.id);
    if (result.error) {
      return res.status(400).send(result);
    }
    return res.send({ success: true, data: result });
  }).delete(async (req, res) => {
    const result = await deleteUSer("roles", "role_id", req.params.id);
    if (result.error) {
      return res.status(400).send(result);
    }
    return res.send({ success: true, data: result });
  });
}
