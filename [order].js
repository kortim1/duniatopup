export default function handler(req,res){
  const { order } = req.query;
  // Simple mock page redirect or message
  res.status(200).send('Mock payment for '+order+' (In production redirect to payment provider)');
}
