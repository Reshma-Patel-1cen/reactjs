import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  if (!user) return null;

  var data = {
    userId: user.name,
    time: Date(),
  };
  console.log("user",data)

  return jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  })
}

const verifyToken = (token, cb) => {
  jwt.verify(token, process.env.JWT_SECRET_KEY, cb);
}

export { generateToken, verifyToken };
