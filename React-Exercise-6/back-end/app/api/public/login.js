import { verifyUser } from '../../utils/apiUtils';
import { generateToken } from '../../utils/authUtils';

export default app => {
  app.post("/login", async (req, res) => {
    const user = req.body.userName;
    const pwd = req.body.password;
    if (!user || !pwd) {
      return res.status(400).json({
        error: true,
        message: "Username or Password is required"
      })
    }

    const result = await verifyUser(user, pwd)
    if (result.error) {
      return res.status(400).send(result);
    }
    if (result.length === 0) {
      return res.status(400).send({ error: true, message: "Username or Password is wrong" });
    }
    // return res.send({ success: true, data: result });
    console.log("uname", result[0].user_name)
    let data = {
      name: result[0].user_name,
      user_role: JSON.parse(result[0].user_role),
      role : result[0].role
    }
    const token = generateToken(data);
    console.log(".........data", data)
    res.send({ success: true, user: data, token });
  });

}
