const storage = require('../../lib/storage');
export default function handler(req,res){ const rows = storage.read(); res.status(200).json({rows: rows.slice(0,10)}); }
