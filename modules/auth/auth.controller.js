const service = require("./auth-service.js")

exports.register = async (req,res)=>{

 try{
   const user = await service.register(req.body)
   res.status(201).json(user)

 }catch(err){
   res.status(500).json({message:err.message})
 }

}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const result = await service.login(email, password);

    res.status(200).json({
      success: true,
      data: result 
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error.message);
    res.status(401).json({ message: error.message || "Invalid credentials" });
  }
};