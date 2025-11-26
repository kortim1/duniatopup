export default async function handler(req,res){
  const { playerId, serverId, game } = req.body || {};
  if(!playerId) return res.status(200).json({ok:false});
  // In production, call supplier API here to verify. Demo returns ok.
  return res.status(200).json({ok:true, player:{id:playerId, name:'Player'+playerId}});
}
