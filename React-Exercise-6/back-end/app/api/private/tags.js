'use strict';
import sha1 from 'sha1';
import { createRecord, updateUser, getRecord, getAllDetails, deleteUSer, getCount } from '../../utils/apiUtils';

export default app => {

  app.post('/tags', async (req, res) => {
    const result = await getAllDetails("tags", "parent_id", req.body.tag_id, "category_id", req.body.category_id);
    if (result.error) {
      return res.status(400).send(result);
    }
    return res.send({ success: true, data: result });
  });
  app.post('/tagCount', async (req, res) => {
    const result = await getCount("tags", "category_id", req.body.id);

    if (result.error) {
      return res.status(400).send(result);
    }
    return res.send({ success: true, data: result });
  });

  app.post('/tag', async (req, res) => {
    if (req.body.action === "delete") {
      const result = await deleteUSer('tags', 'tag_id', req.body.tagId);
      const result1 = await deleteUSer('tags', 'parent_id', req.body.tagId);
      if (result.error) {
        return res.status(400).send(result);
      }
      return res.send({ success: true, data: result });
    }
    else if (req.body.action === "move") {
      const data = {
        category_id: req.body.move_category_id,
        parent_id: req.body.move_tag_id
      };
      const result = await updateUser(data, 'tags', 'tag_id', req.body.tagId)
      await updateUser({ category_id: req.body.move_category_id }, 'tags', 'parent_id', req.body.tagId)
      if (result.error) {
        return res.status(400).send(result);
      }
      return res.send({ success: true, data: result });
    }
    else if (req.body.action === "merge") {
      const data = {
        category_id: req.body.move_category_id,
        parent_id: req.body.move_tag_id
      };

      const res = await getAllDetails('tags', 'parent_id', req.body.tagId)
      const data1 = {
        category_id: req.body.move_category_id,
      };
      const dt = res.map(async (x) => {
        const result = await updateUser(data1, 'tags', 'parent_id', x.tag_id)
        if (result.error) {
          return res.status(400).send(result);
        }
      })
      const result = await updateUser(data, 'tags', 'parent_id', req.body.tagId)
      await deleteUSer('tags', 'tag_id', req.body.tagId)

      return res.send({ success: true, data: result });
    } else {
      const tagData = {
        category_id: req.body.category_id,
        tag_name: req.body.tag_name,
        description: req.body.description,
        parent_id: (req.body.tagId !== 0) ? req.body.tagId : 0
      };
      const result = await createRecord(tagData, 'tags');
      if (result.error) {
        return res.status(400).send(result);
      }
      return res.send({ success: true, data: result });
    }
  });

  app.route("/tag/:id").get(async (req, res) => {
    const result = await getRecord("tags", "tag_id", req.params.id);
    if (result.error) {
      return res.status(400).send(result);
    }
    return res.send({ success: true, data: result });
  }).put(async (req, res) => {
    const catData = {
      category_name: req.body.category_name
    };
    const result = await updateUser(catData, "tags", "tag_id", req.params.id);
    if (result.error) {
      return res.status(400).send(result);
    }
    return res.send({ success: true, data: result });
  }).delete(async (req, res) => {
    const result = await deleteUSer("tags", "tag_id", req.params.id);
    if (result.error) {
      return res.status(400).send(result);
    }
    return res.send({ success: true, data: result });
  });
}
