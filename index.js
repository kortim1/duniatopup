import {useState,useEffect} from 'react';
export default function Home(){
  const [playerId,setPlayerId]=useState('');
  const [serverId,setServerId]=useState('');
  const [game,setGame]=useState('ml');
  const [product,setProduct]=useState(JSON.stringify({code:'ML_86',label:'86 DM',price:22000}));
  const [payment,setPayment]=useState('qris');
  const [msg,setMsg]=useState('');
  const [recent,setRecent]=useState([]);

  useEffect(()=>{ fetch('/api/recent').then(r=>r.json()).then(j=>setRecent(j.rows||[])) },[]);

  async function handleOrder(){
    if(!playerId||!serverId){ setMsg('ID & Server wajib diisi'); return; }
    setMsg('Memeriksa ID...');
    const check = await fetch('/api/check-id',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({playerId,serverId,game})}).then(r=>r.json());
    if(!check.ok){ setMsg('ID tidak ditemukan'); return; }
    const prod = JSON.parse(product);
    if(!confirm(`Konfirmasi:\nPlayer: ${playerId}\nProduk: ${prod.label}\nHarga: Rp${prod.price}`)) return;
    setMsg('Membuat pesanan...');
    const order = await fetch('/api/order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({playerId,serverId,game,productCode:prod.code,productLabel:prod.label,price:prod.price,payment:payment})}).then(r=>r.json());
    if(order.ok){ setMsg('Order dibuat: '+order.orderId); if(order.payUrl) window.open(order.payUrl,'_blank'); setTimeout(()=>location.reload(),800) } else setMsg('Gagal: '+(order.error||''));
  }

  return (<div>
    <header className="header"><h1>DuniaTopUp</h1><p>Top Up ML | FF | PUBG | Stumble — Cepat & Aman</p></header>
    <main className="container">
      <section className="card">
        <h2>Top Up Sekarang</h2>
        <label>ID Player</label>
        <input value={playerId} onChange={e=>setPlayerId(e.target.value)} placeholder="Masukkan ID Player" />
        <label>Server</label>
        <input value={serverId} onChange={e=>setServerId(e.target.value)} placeholder="Masukkan Server" />
        <label>Game</label>
        <select value={game} onChange={e=>setGame(e.target.value)}>
          <option value="ml">Mobile Legends</option>
          <option value="ff">Free Fire</option>
          <option value="pubg">PUBG Mobile</option>
          <option value="stumble">Stumble Guys</option>
        </select>
        <label>Nominal</label>
        <select value={product} onChange={e=>setProduct(e.target.value)}>
          <option value='{"code":"ML_86","label":"86 DM","price":22000}'>86 DM - Rp22.000</option>
          <option value='{"code":"ML_170","label":"170 DM","price":42000}'>170 DM - Rp42.000</option>
          <option value='{"code":"ML_257","label":"257 DM","price":63000}'>257 DM - Rp63.000</option>
          <option value='{"code":"ML_514","label":"514 DM","price":123000}'>514 DM - Rp123.000</option>
        </select>
        <label>Metode Pembayaran</label>
        <select value={payment} onChange={e=>setPayment(e.target.value)}>
          <option value="qris">QRIS</option>
          <option value="dana">DANA</option>
          <option value="ovo">OVO</option>
          <option value="gopay">GoPay</option>
        </select>
        <button className="button" onClick={handleOrder}>Cek ID & Lanjut</button>
        <div className="msg">{msg}</div>
      </section>

      <section className="card">
        <h3>Riwayat Terakhir</h3>
        <div>{recent.length?recent.map(r=>(<div key={r.order_id} className="rec"><b>{r.product}</b> - {r.player_id} - Rp{r.price} - {r.status}</div>)):'Belum ada transaksi'}</div>
      </section>
    </main>
  </div>)
}