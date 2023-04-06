'use strict';
import sha1 from 'sha1';
import { createRecord, updateUser, getRecord, getAllDetails, deleteUSer } from '../../utils/apiUtils';

export default app => {

  app.get('/categories', async (req, res) => {

    const result = await getAllDetails("categories");
    if (result.error) {
      return res.status(400).send(result);
    }
    return res.send({ success: true, data: result });
  });

  app.post('/category', async (req, res) => {
    const catData = {
      category_name: req.body.category_name
    };
    const result = await createRecord(catData, 'categories');
    if (result.error) {
      return res.status(400).send(result);
    }
    return res.send({ success: true, data: result });
  });

  app.route("/category/:id").get(async (req, res) => {
    const result = await getRecord("categories", "category_id", req.params.id);
    if (result.error) {
      return res.status(400).send(result);
    }
    return res.send({ success: true, data: result });
  }).put(async (req, res) => {
    const catData = {
      category_name: req.body.category_name
    };
    const result = await updateUser(catData, "categories", "category_id", req.params.id);
    if (result.error) {
      return res.status(400).send(result);
    }
    return res.send({ success: true, data: result });
  }).delete(async (req, res) => {
    const result = await deleteUSer("categories", "category_id",req.params.id);
    if (result.error) {
      return res.status(400).send(result);
    }
    return res.send({ success: true, data: result });
  });
}
