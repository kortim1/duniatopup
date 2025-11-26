const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const storage = require('../../../lib/storage');
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';
const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';
export default async function handler(req,res){
  const { username, password } = req.body;
  if(username === ADMIN_USER && password === ADMIN_PASS){
    const token = jwt.sign({user:username}, JWT_SECRET, { expiresIn: '8h' });
    return res.status(200).json({ok:true,token});
  }
  return res.status(401).json({ok:false});
}
