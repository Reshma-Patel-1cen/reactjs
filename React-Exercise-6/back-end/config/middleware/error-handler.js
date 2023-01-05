import { badRequest } from '../../app/utils/generalUtils';

export default (err, req, res, next) => {
  if (typeof err === 'string') {
    const result = badRequest(err);
    return res.status(result.status).send(result.error);
  }
  return res.status(500).send({ error: err.message });
}