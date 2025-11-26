import {useState} from 'react';
export default function Admin(){
  const [u,setU]=useState('');
  const [p,setP]=useState('');
  const [token,setToken]=useState('');
  const [rows,setRows]=useState([]);

  async function login(){
    const res = await fetch('/api/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:u,password:p})});
    const j = await res.json();
    if(j.ok){ setToken(j.token); loadTrx(j.token); } else alert('Login gagal');
  }
  async function loadTrx(t){
    const r = await fetch('/api/admin/transactions',{headers:{Authorization:'Bearer '+(t||token)}});
    const j = await r.json();
    if(j.ok) setRows(j.rows);
  }
  return (<div>
    <main className="container">
      <section className="card">
        <h2>Admin Login</h2>
        <input placeholder="username" value={u} onChange={e=>setU(e.target.value)} />
        <input type="password" placeholder="password" value={p} onChange={e=>setP(e.target.value)} />
        <button className="button" onClick={login}>Login</button>
      </section>
      <section className="card">
        <h2>Transaksi</h2>
        <pre>{JSON.stringify(rows,null,2)}</pre>
      </section>
    </main>
  </div>)
}