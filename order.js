import { v4 as uuidv4 } from 'uuid';
const storage = require('../../lib/storage');
export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).end();
  const { playerId, serverId, game, productCode, productLabel, price, payment } = req.body;
  if(!playerId || !productCode) return res.status(400).json({ok:false,error:'missing'});
  const orderId = 'FT-'+Date.now();
  const rows = storage.read();
  const trx = { order_id: orderId, player_id: playerId, server_id: serverId, game, product: productLabel, product_code: productCode, price, payment_method: payment, status:'pending', created_at: new Date().toISOString() };
  rows.unshift(trx);
  storage.write(rows);
  // simulate payment creation
  const payUrl = process.env.PAYMENT_PROVIDER==='xendit' ? ('https://xendit.example/pay/'+orderId) : ('/pay/mock/'+orderId);
  // push to supplier (simulate or call real API)
  setTimeout(async ()=>{
    try{
      if(process.env.SUPPLIER_API){
        // call supplier API - example payload for Digiflazz-like
        const axios = require('axios');
        const payload = { username: process.env.SUPPLIER_USER || 'demo', buyer_sku_code: productCode, customer_no: playerId, ref_id: orderId };
        const r = await axios.post(process.env.SUPPLIER_API + '/transaction', payload, { headers: { 'Authorization': process.env.SUPPLIER_KEY || '' } });
        trx.status = 'processing';
        trx.supplier_response = r.data;
      } else {
        trx.status = 'success';
        trx.supplier_response = { sim: 'ok' };
      }
    }catch(e){ trx.status = 'error'; trx.supplier_response = { err: e.message }; }
    const all = storage.read();
    const idx = all.findIndex(x=>x.order_id===orderId);
    if(idx>=0){ all[idx]=trx; storage.write(all); }
  }, 2000);
  return res.status(200).json({ok:true,orderId,payUrl});
}
