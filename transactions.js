const storage = require('../../../lib/storage');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';
export default function handler(req,res){
  const auth = req.headers.authorization || '';
  const token = auth.split(' ')[1];
  try{
    jwt.verify(token, JWT_SECRET);
  }catch(e){ return res.status(401).json({ok:false}); }
  const rows = storage.read();
  res.status(200).json({ok:true,rows});
}
