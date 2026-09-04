const API = "http://localhost:8080/api";
let stocks = JSON.parse(localStorage.getItem("marketpulseWatchlist") || '["RELIANCE","TCS","INFY","HDFCBANK"]');
let previous = JSON.parse(localStorage.getItem("marketpulseSnapshots") || "{}");

async function loadStocks(){
  try{
    const res = await fetch(`${API}/stocks?symbols=${encodeURIComponent(stocks.join(","))}`);
    if(!res.ok) throw new Error("Backend unavailable");
    const data = await res.json();
    render(data);
    localStorage.setItem("marketpulseSnapshots", JSON.stringify(Object.fromEntries(data.map(s=>[s.symbol,{price:s.previousPrice,volume:s.previousVolume}]))));
    localStorage.setItem("marketpulseLastChecked", new Date().toISOString());
  }catch(e){
    document.getElementById("message").textContent="⚠️ Market data service is unavailable. Showing the last reliable state.";
  }
}

function render(data){
  const container=document.getElementById("stocks");
  container.innerHTML="";
  let a=0,w=0,n=0;
  data.forEach(s=>{
    if(s.level==="ATTENTION")a++; else if(s.level==="WATCH")w++; else n++;
    const cls=s.change>=0?"up":"down";
    const card=document.createElement("article");
    card.className="stock";
    card.innerHTML=`
      <div class="stock-top">
        <div><div class="symbol">${s.symbol}</div><div class="price">₹${s.price.toLocaleString("en-IN",{maximumFractionDigits:2})}</div>
        <div class="change ${cls}">${s.change>=0?"↑":"↓"} ${Math.abs(s.change).toFixed(2)}%</div></div>
        <div><span class="badge ${s.level.toLowerCase()}">${s.level==="ATTENTION"?"🔴 Attention":s.level==="WATCH"?"🟡 Watch":"🟢 Normal"}</span>
        <button class="remove" onclick="removeStock('${s.symbol}')">Remove</button></div>
      </div>
      <div class="metrics">
        <div class="metric"><small>Volume</small><b>${s.volumeMultiple.toFixed(1)}× normal</b></div>
        <div class="metric"><small>Attention Score</small><b>${s.score}/100</b></div>
        <div class="metric"><small>Sector</small><b>${s.sectorChange>=0?"↑":"↓"} ${Math.abs(s.sectorChange).toFixed(1)}%</b></div>
      </div>
      <div class="reason"><b>Why this matters:</b> ${s.reason}</div>
      <div class="fresh">${s.freshness}</div>`;
    container.appendChild(card);
  });
  document.getElementById("attentionCount").textContent=a;
  document.getElementById("watchCount").textContent=w;
  document.getElementById("normalCount").textContent=n;
  const last=localStorage.getItem("marketpulseLastChecked");
  document.getElementById("lastChecked").textContent=last?new Date(last).toLocaleString():"First visit";
}

function removeStock(symbol){
  stocks=stocks.filter(x=>x!==symbol);
  localStorage.setItem("marketpulseWatchlist",JSON.stringify(stocks));
  loadStocks();
}

document.getElementById("addForm").addEventListener("submit",e=>{
  e.preventDefault();
  const symbol=document.getElementById("symbolInput").value.trim().toUpperCase();
  if(symbol && !stocks.includes(symbol)){stocks.push(symbol);localStorage.setItem("marketpulseWatchlist",JSON.stringify(stocks));}
  document.getElementById("symbolInput").value="";
  loadStocks();
});
document.getElementById("refreshBtn").addEventListener("click",loadStocks);
loadStocks();
