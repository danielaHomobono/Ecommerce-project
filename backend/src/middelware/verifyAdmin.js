


const verifyAdmin = (req, res, next) =>{
if (req.role !== 'admin') {
   return res.status(403).send({ success: false, message: 'You are NOT authorized to perform this action'  }); 
}
next();
}




module.exports = verifyAdmin;