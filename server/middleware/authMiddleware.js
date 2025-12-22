import  jwt  from "jsonwebtoken";

const protect = async (req,res,next) => {
  const token = req.headers.authorization;

  if(!token) return res.status(401).json({message:'Unauthorised'});

  try {
    const decoded = jwt.verify(token,process.env.JWT_SACRET);

    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({message:"Unauthorised"})
  }
}

export default protect;