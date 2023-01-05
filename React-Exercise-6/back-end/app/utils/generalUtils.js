
const badRequest = err => {
  return { status: 400, error: { error: err } };
}

export { badRequest};
