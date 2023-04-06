import { generateInsertQuery, generateUpdateQuery, generateDeleteQuery, generateSelectQuery, checkUserpwd, getPatternData, generateCountQuery } from "../../config/db/httpInterceptor";

const createRecord = async (data, tableName) => {
  const result = await generateInsertQuery(data, tableName);
  return result;
}

const updateUser = async (data, tableName, clauseKey, clauseValue) => {
  const result = await generateUpdateQuery(data, tableName, clauseKey, clauseValue);
  return result;
}

const getRecord = async (tableName, clauseKey, clauseValue) => {
  const result = await generateSelectQuery(tableName, clauseKey, clauseValue);
  return result;
}

const getAllDetails = async (tableName, clauseKey, clauseValue, clauseKey1, clauseValue1) => {
  const result = await generateSelectQuery(tableName, clauseKey, clauseValue, clauseKey1, clauseValue1);
  return result;
}
const getCount = async (tableName, clauseKey, clauseValue) => {
  const result = await generateCountQuery(tableName, clauseKey, clauseValue);
  return result;
}

const deleteUSer = async (tableName, clauseKey, clauseValue) => {
  const result = await generateDeleteQuery(tableName, clauseKey, clauseValue);
  return result;
}

const getPatternMatchData = async (pattern) => {
  const result = await getPatternData(pattern);
  return result;
}
const verifyUser = async (user, pwd) => {
  const result = await checkUserpwd(user, pwd, 'users');
  return result;
}

const resetPwd = (data, id) => {
  const result = generateUpdateQuery(data, "users", "token", id)
  return result;
}

const updateToken = async (email, token) => {
  const result = await generateUpdateQuery({ token }, 'users', 'email', email);
  return result;
}

export {
  createRecord,
  updateUser,
  getRecord,
  getAllDetails,
  deleteUSer,
  verifyUser,
  resetPwd,
  updateToken,
  getPatternMatchData,
  getCount
}
