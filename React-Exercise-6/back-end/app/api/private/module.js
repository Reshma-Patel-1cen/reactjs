'use strict';
import { getRecord, getPatternMatchData } from '../../utils/apiUtils';

export default app => {
  app.route("/module/:id").get(async (req, res) => {
    const result = await getRecord("modules", "module_id", req.params.id);
    if (result.error) {
      return res.status(400).send(result);
    }
    return res.send({ success: true, data: result });
  })

  app.route("/privileges").post(async (req, res) => {
    const result = await getPatternMatchData(req.body.pattern);
    const finalArray = result.map(v => ({ ...v, showId: req.body.permissions }))
    if (result.error) {
      return res.status(400).send(result);
    }
    return res.send({ success: true, data: finalArray });
  })

}
