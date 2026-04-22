import React,{useState,useEffect,useRef,useCallback}from"react";

// - HISTORIAL BASE -
const RAW=[
  [1,"NVDA","L",210,57.95,"21/05/2025"],[2,"OXY","L",600,8.18,"25/07/2025"],[3,"GLD","L",1280,13.2,"25/07/2025"],
  [4,"KMI","L",1000,-29.61,"05/08/2025"],[5,"CRCL","L",1000,0.14,"19/08/2025"],[6,"WLN","L",350,-85.03,"04/09/2025"],
  [7,"TLT","L",2560,79.02,"25/09/2025"],[8,"RGTI","L",210,6.8,"03/10/2025"],[9,"AMD","L",880,3.76,"06/10/2025"],
  [10,"TLT","L",2500,1.39,"10/10/2025"],[11,"MSTR","L",1230,-204.25,"10/10/2025"],[12,"MARA","L",440,0.74,"18/11/2025"],
  [13,"RGTI","L",1000,-0.15,"05/12/2025"],[14,"RGTI","L",500,2.76,"09/12/2025"],[15,"RGTI","L",1460,24.99,"08/01/2026"],
  [16,"RGTI","S",1230,-18.2,"12/01/2026"],[17,"RGTI","L",1690,-4.65,"14/01/2026"],[18,"RGTI","S",900,0.71,"15/01/2026"],
  [19,"URA","L",200,0.01,"30/01/2026"],[20,"NVDA","S",210,0.01,"11/02/2026"],[21,"SPY","S",2000,-0.41,"20/02/2026"],
  [22,"SPY","S",2000,0.17,"20/02/2026"],[23,"SPY","S",2560,20.35,"23/02/2026"],[24,"AAPL","S",840,-11.68,"25/02/2026"],
  [25,"AAPL","S",640,21.3,"02/03/2026"],[26,"MDB","L",250,-4.09,"09/03/2026"],[27,"RGTI","S",640,-0.38,"13/03/2026"],
  [28,"MSTR","S",500,40.66,"23/03/2026"],[29,"GOOGL","S",640,13.33,"23/03/2026"],[30,"RENDER/USDT","L",300,3.52,"23/12/2024"],
  [31,"BTC/USD","L",1900,7.13,"15/01/2025"],[32,"BTC/USD","S",95,-0.11,"15/01/2025"],[33,"SOL/USDT","L",320,27.56,"19/01/2025"],
  [34,"MANA/USDT","S",100,2.96,"09/02/2025"],[35,"LINK/USDT","L",900,77.88,"05/03/2025"],[36,"LINK/USDT","L",100,4.61,"11/03/2025"],
  [37,"LINK/USD","L",600,27.33,"11/03/2025"],[38,"LINK/USDT","L",640,21.51,"24/03/2025"],[39,"RENDER/USDT","L",500,-31.06,"22/04/2025"],
  [40,"BTC/USD","S",500,4.95,"24/04/2025"],[41,"RENDER/USDT","L",360,33.27,"20/05/2025"],[42,"LINK/USDT","L",500,251.45,"20/05/2025"],
  [43,"ETH/USDT","L",6530,-328.46,"27/05/2025"],[44,"BTC/USDT","S",1000,36.5,"06/06/2025"],[45,"BTC/USDT","S",1000,11.2,"17/06/2025"],
  [46,"BTC/USDT","S",1500,0.38,"17/06/2025"],[47,"BTC/USDT","L",2700,0.55,"17/06/2025"],[48,"ETH/USDT","S",1000,12.12,"17/06/2025"],
  [49,"BTC/USDT","L",1500,-1.44,"18/06/2025"],[50,"BTC/USDT","L",1500,3.02,"18/06/2025"],[51,"BTC/USDT","S",1500,6.69,"20/06/2025"],
  [52,"BTC/USDT","S",2000,2.39,"20/06/2025"],[53,"BTC/USDT","L",1280,3.57,"23/06/2025"],[54,"BTC/USDT","L",1500,4.6,"24/06/2025"],
  [55,"BTC/USDT","S",2000,2.96,"25/06/2025"],[56,"ETH/USDT","L",2000,0.17,"25/06/2025"],[57,"BTC/USDT","L",2000,3.17,"25/06/2025"],
  [58,"ETH/USDT","S",15472,0.51,"25/06/2025"],[59,"ETH/USDT","S",2000,7.17,"25/06/2025"],[60,"EUR/USD","S",1000,0.02,"26/06/2025"],
  [61,"BTC/USDT","S",1000,2.15,"27/06/2025"],[62,"BTC/USDT","S",2800,8.76,"01/07/2025"],[63,"BTC/USDT","L",2000,-0.04,"01/07/2025"],
  [64,"BTC/USDT","L",1280,1.79,"03/07/2025"],[65,"BTC/USDT","L",2000,10.47,"09/07/2025"],[66,"ETH/USDT","S",2300,-1112.46,"21/07/2025"],
  [67,"BTC/USDT","S",3000,26.41,"21/07/2025"],[68,"LINK/USDT","S",2000,3.07,"21/07/2025"],[69,"LINK/USDT","L",4000,12.52,"21/07/2025"],
  [70,"BTC/USDT","L",8000,17.78,"22/07/2025"],[71,"BTC/USDT","S",12000,0.38,"22/07/2025"],[72,"BTC/USDT","L",6000,21.84,"22/07/2025"],
  [73,"BTC/USDT","S",6000,35.61,"23/07/2025"],[74,"BTC/USDT","L",6000,17.29,"23/07/2025"],[75,"BTC/USDT","L",7000,39.95,"23/07/2025"],
  [76,"BTC/USDT","S",6000,25.98,"24/07/2025"],[77,"BTC/USDT","L",12000,8.48,"24/07/2025"],[78,"BTC/USDT","L",6000,8.85,"24/07/2025"],
  [79,"ETH/USDT","L",3623,154.09,"28/07/2025"],[80,"BTC/USDT","L",12100,66.09,"28/07/2025"],[81,"BTC/USDT","S",7000,15.86,"29/07/2025"],
  [82,"BTC/USDT","L",8000,17.07,"29/07/2025"],[83,"ETH/USDT","L",7900,16.16,"29/07/2025"],[84,"BTC/USDT","S",10000,12.78,"30/07/2025"],
  [85,"BTC/USDT","S",10000,-0.02,"30/07/2025"],[86,"BTC/USD","L",10,0.0,"31/07/2025"],[87,"BTC/USD","L",8000,23.09,"31/07/2025"],
  [88,"BTC/USD","L",6000,46.67,"31/07/2025"],[89,"BTC/USDT","L",6000,67.36,"31/07/2025"],[90,"BTC/USD","L",12000,-0.31,"31/07/2025"],
  [91,"BTC/USDT","L",7000,20.74,"04/08/2025"],[92,"ETH/USDT","L",13840,194.3,"04/08/2025"],[93,"BTC/USDT","L",9000,21.89,"05/08/2025"],
  [94,"BTC/USD","L",10500,-251.2,"05/08/2025"],[95,"BTC/USD","S",8000,37.65,"06/08/2025"],[96,"ETH/USDT","S",24000,-995.59,"07/08/2025"],
  [97,"ETH/USDT","S",5000,-19.11,"07/08/2025"],[98,"BTC/USD","S",27000,-282.07,"09/08/2025"],[99,"BTC/USD","L",12000,2.51,"09/08/2025"],
  [100,"BTC/USDT","L",10000,0.21,"11/08/2025"],[101,"BTC/USD","S",10000,2.28,"12/08/2025"],[102,"BTC/USD","L",10000,4.46,"12/08/2025"],
  [103,"ETH/USDT","L",4480,397.88,"17/08/2025"],[104,"LINK/USDT","S",6000,2.4,"18/08/2025"],[105,"LINK/USDT","S",3000,11.81,"18/08/2025"],
  [106,"LINK/USDT","S",1000,50.22,"19/08/2025"],[107,"RUNE/USDT","S",1000,0.0,"20/08/2025"],[108,"BTC/USDT","L",9000,4.3,"20/08/2025"],
  [109,"BTC/USD","L",7000,-145.1,"20/08/2025"],[110,"ETH/USDT","L",2000,-72.87,"20/08/2025"],[111,"ETH/USDT","S",2000,-12.44,"20/08/2025"],
  [112,"ETH/USDT","L",2000,3.86,"20/08/2025"],[113,"ETH/USDT","L",2440,1.63,"20/08/2025"],[114,"XRP/USD","S",500,1.6,"21/08/2025"],
  [115,"ARB/USDT","S",1000,1.18,"21/08/2025"],[116,"LINK/USDT","S",3000,-231.48,"22/08/2025"],[117,"ETH/USDT","S",6560,-343.95,"22/08/2025"],
  [118,"SOL/USD","S",1000,16.84,"24/08/2025"],[119,"LINK/USDT","S",1000,5.0,"24/08/2025"],[120,"ETH/USD","L",4000,-0.15,"24/08/2025"],
  [121,"BTC/USD","S",21240,11.72,"25/08/2025"],[122,"BTC/USDT","L",6000,14.32,"25/08/2025"],[123,"BTC/USDT","L",6000,5.19,"27/08/2025"],
  [124,"BTC/USDT","S",6000,1.68,"27/08/2025"],[125,"BTC/USD","S",6000,0.11,"27/08/2025"],[126,"BTC/USD","L",5120,2.02,"27/08/2025"],
  [127,"BTC/USD","L",5120,1.47,"27/08/2025"],[128,"LINK/USDT","S",2000,14.17,"28/08/2025"],[129,"SOL/USD","S",1200,10.85,"28/08/2025"],
  [130,"LINK/USDT","S",2000,46.72,"28/08/2025"],[131,"LINK/USDT","L",2000,-39.31,"28/08/2025"],[132,"LINK/USDT","L",2560,12.51,"28/08/2025"],
  [133,"LINK/USDT","L",1690,25.16,"28/08/2025"],[134,"SOL/USD","S",2000,60.66,"29/08/2025"],[135,"SOL/USD","L",2000,4.74,"29/08/2025"],
  [136,"SOL/USD","S",2000,0.36,"29/08/2025"],[137,"SOL/USD","S",2000,0.54,"29/08/2025"],[138,"LINK/USDT","S",2000,0.85,"29/08/2025"],
  [139,"LINK/USDT","S",3000,58.97,"01/09/2025"],[140,"LINK/USD","S",2000,31.12,"01/09/2025"],[141,"BTC/USD","S",3000,19.09,"02/09/2025"],
  [142,"BTC/USD","L",2560,8.0,"02/09/2025"],[143,"BTC/USD","L",2280,5.35,"03/09/2025"],[144,"BTC/USD","L",2560,9.01,"03/09/2025"],
  [145,"BTC/USD","L",6000,-1.82,"04/09/2025"],[146,"LINK/USDT","L",1000,-15.75,"04/09/2025"],[147,"BTC/USD","L",3000,2.39,"04/09/2025"],
  [148,"BTC/USD","L",4000,-41.62,"05/09/2025"],[149,"SOL/USD","S",1060,-24.52,"14/09/2025"],[150,"BTC/USD","S",2500,6.3,"14/09/2025"],
  [151,"BTC/USD","L",3000,3.16,"16/09/2025"],[152,"BTC/USD","L",3000,1.01,"16/09/2025"],[153,"BTC/USD","S",2560,2.53,"16/09/2025"],
  [154,"ETH/USD","S",5120,-32.18,"16/09/2025"],[155,"BTC/USD","L",3000,-0.01,"17/09/2025"],[156,"BTC/USD","L",3000,21.02,"17/09/2025"],
  [157,"ETH/USD","L",4600,6.01,"18/09/2025"],[158,"SUI/USDT","L",2560,30.27,"18/09/2025"],[159,"ADA/USD","L",2560,0.04,"18/09/2025"],
  [160,"ADA/USD","L",1550,0.47,"21/09/2025"],[161,"BTC/USD","L",2560,5.96,"22/09/2025"],[162,"LINK/USD","S",500,-0.09,"23/09/2025"],
  [163,"BTC/USD","S",3000,0.74,"23/09/2025"],[164,"BTC/USD","L",3000,4.64,"24/09/2025"],[165,"BTC/USD","S",2560,0.44,"24/09/2025"],
  [166,"BTC/USD","L",3000,-6.44,"25/09/2025"],[167,"BTC/USD","L",3000,1.74,"25/09/2025"],[168,"ETH/USDT","L",3000,17.96,"26/09/2025"],
  [169,"BTC/USDT","S",3000,1.06,"30/09/2025"],[170,"LINK/USD","S",2000,-187.1,"02/10/2025"],[171,"BTC/USD","S",2610,-176.75,"02/10/2025"],
  [172,"ETH/USDT","L",2200,2.54,"02/10/2025"],[173,"ETH/USD","L",7760,-0.35,"02/10/2025"],[174,"BTC/USD","S",3000,-4.0,"02/10/2025"],
  [175,"LINK/USD","L",1000,50.46,"07/10/2025"],[176,"POL/USDT","L",2850,-1468.02,"10/10/2025"],[177,"LINK/USDT","L",3000,-1431.42,"10/10/2025"],
  [178,"ETH/USDT","L",13530,-1946.84,"10/10/2025"],[179,"SUI/USDT","L",2000,-1445.22,"10/10/2025"],[180,"XRP/USD","L",890,3.78,"13/10/2025"],
  [181,"LINK/USD","L",500,1.36,"13/10/2025"],[182,"POL/USDT","L",470,12.63,"14/10/2025"],[183,"ETH/USDT","L",3520,202.08,"14/10/2025"],
  [184,"BTC/USD","S",1920,5.28,"14/10/2025"],[185,"ETH/USDT","L",4120,0.32,"14/10/2025"],[186,"POL/USDT","L",600,0.21,"14/10/2025"],
  [187,"XRP/USD","L",700,3.84,"14/10/2025"],[188,"BTC/USD","S",3200,9.01,"15/10/2025"],[189,"ETH/USDT","L",8000,2.2,"15/10/2025"],
  [190,"POL/USDT","L",600,0.61,"16/10/2025"],[191,"ETH/USDT","L",8000,52.15,"16/10/2025"],[192,"EUR/USD","S",3200,-3.07,"15/10/2025"],
  [193,"POL/USDT","L",300,0.96,"17/10/2025"],[194,"POL/USDT","L",300,0.64,"18/10/2025"],[195,"ETH/USDT","L",7640,11.82,"21/10/2025"],
  [196,"ETH/USDT","L",7680,111.21,"24/10/2025"],[197,"POL/USDT","L",350,10.41,"05/11/2025"],[198,"LINK/USD","L",300,1.33,"14/11/2025"],
  [199,"LINK/USD","L",400,0.07,"15/11/2025"],[200,"LINK/USD","L",400,1.22,"15/11/2025"],[201,"LINK/USD","L",450,0.26,"16/11/2025"],
  [202,"LINK/USDT","L",500,0.71,"17/11/2025"],[203,"LINK/USD","S",300,1.61,"17/11/2025"],[204,"BTC/USD","S",350,3.26,"17/11/2025"],
  [205,"LINK/USDT","L",300,1.8,"18/11/2025"],[206,"SUI/USDT","L",330,1.77,"18/11/2025"],[207,"POL/USDT","L",500,-16.34,"18/11/2025"],
  [208,"BTC/USD","S",1040,10.02,"19/11/2025"],[209,"BTC/USDT","S",720,11.25,"19/11/2025"],[210,"POL/USDT","L",200,0.6,"21/11/2025"],
  [211,"XRP/USD","L",160,-12.69,"01/12/2025"],[212,"BTC/USDT","S",678,1.14,"18/12/2025"],[213,"BTC/USD","S",560,1.55,"21/12/2025"],
  [214,"POL/USDT","L",300,2.27,"07/01/2026"],[215,"POL/USDT","S",170,0.7,"10/01/2026"],[216,"BTC/USD","L",640,-6.79,"30/01/2026"],
  [217,"BTC/USDT","S",1840,107.35,"31/01/2026"],[218,"LINK/USDT","L",100,0.1,"03/02/2026"],[219,"BTC/USD","L",500,-34.03,"03/02/2026"],
  [220,"BTC/USD","S",700,1.15,"04/02/2026"],[221,"ETH/USD","L",300,21.31,"08/02/2026"],[222,"AVAX/USD","L",200,0.23,"15/02/2026"],
  [223,"ETH/USD","L",500,0.0,"17/02/2026"],[224,"ETH/USD","L",500,-0.02,"18/02/2026"],[225,"ETH/USD","L",700,-0.11,"18/02/2026"],
  [226,"ETH/USD","L",500,-5.86,"22/02/2026"],[227,"BTC/USD","S",1920,6.26,"23/02/2026"],[228,"BTC/USD","S",1920,8.01,"23/02/2026"],
  [229,"BTC/USDT","S",2000,50.21,"24/02/2026"],[230,"BTC/USDT","L",2000,123.67,"25/02/2026"],[231,"LINK/USD","L",500,-0.38,"25/02/2026"],
  [232,"BTC/USDT","L",2000,93.78,"01/03/2026"],[233,"BTC/USDT","L",2560,0.71,"05/03/2026"],[234,"ETH/USD","L",680,0.17,"05/03/2026"],
  [235,"BCH/USD","S",800,6.0,"07/03/2026"],[236,"BTC/USDT","L",1015,-51.3,"08/03/2026"],[237,"ETH/USD","L",800,-48.9,"08/03/2026"],
  [238,"BTC/USDT","L",1920,2.86,"10/03/2026"],[239,"BTC/USDT","L",2000,-35.12,"11/03/2026"],[240,"BTC/USD","S",2500,-2.09,"15/03/2026"],
  [241,"BTC/USD","S",2500,-0.09,"16/03/2026"],[242,"BTC/USDT","S",4200,-0.06,"19/03/2026"],[243,"LINK/USD","S",850,-0.26,"19/03/2026"],
  [244,"BTC/USDT","S",3000,0.03,"20/03/2026"],[245,"BCH/USD","S",1800,-0.6,"23/03/2026"],[246,"BTC/USD","S",2500,83.86,"23/03/2026"],
];
const H0=RAW.map(r=>({id:r[0],asset:r[1],dir:r[2]==="L"?"Long":"Short",cap:r[3],result:r[4],date:r[5],note:r[6]||""}));


// - DEFAULTS -
// Posiciones abiertas según PDF Quantfury 26/03/2026
// SOL/USD Short cerrada el 26/03/2026 a BE ($0.00) — eliminada de P0
const P0=[
  {id:5,asset:"TLT",dir:"Long",capital:3200,entry:85.71,sl:83.50,tp:91.00,be:false,date:"24/03/2026",note:"37.3352 acciones | SL/TP estimados — actualizar"},
  {id:6,asset:"BTC/USDT",dir:"Long",capital:2000,entry:68527.60,sl:65000,tp:75000,be:false,date:"26/03/2026",note:"0.02918532 BTC | SL/TP estimados — actualizar"},
];
const PAT0=[
  {id:1,name:"Cuna descendente + Canal alcista rebote",tf:"4h",asset:"BTC/USDT",obs:1,conf:1,fail:0,log:[],desc:"Despues de una cuna descendente se forma canal alcista de rebote antes de continuar la caida."},
  {id:2,name:"Ineficiencia FVG + Fibonacci 0.5",tf:"4h",asset:"BTC/USDT",obs:1,conf:1,fail:0,log:[],desc:"El precio vuelve a la ineficiencia coincidiendo con Fibonacci 0.5 como resistencia."},
  {id:3,name:"Banderín bajista + Cruce EMAs",tf:"1D",asset:"BTC/USDT",obs:1,conf:0,fail:1,log:[],desc:"Banderín bajista con cruce de EMAs en diario. Objetivo igual longitud del asta."},
  {id:4,name:"Canal ascendente + Banderín alcista re-entrada",tf:"4h",asset:"Cualquier activo",obs:1,conf:0,fail:1,log:[],desc:"Estamos en un canal ascendente buscando cubrir una ineficiencia en la parte alta. Cuando sale forma un banderin alcista con alta probabilidad de volver a entrar."},
];
const J0=[
  {id:1,date:"10/10/2025",text:"Liquidacion masiva. Sin SL en posiciones enormes. Error que no debe repetirse.",emoji:"😰",type:"mistake"},
  {id:2,date:"25/02/2026",text:"Long BTC +123. Cerre antes del objetivo por miedo. Leccion: respetar el plan.",emoji:"😅",type:"lesson"},
  {id:3,date:"19/03/2026",text:"Ineficiencia Fibonacci 0.5 en BTC confirmado. Patron validado.",emoji:"💪",type:"win"},
  {id:4,date:"20/03/2026",text:"BTC/USDT 70800 salio en BE. El SL hizo su trabajo.",emoji:"🧘",type:"lesson",linkedClose:"sl"},
];
const PS0={slOk:14,slBroken:2,slBreakeven:0,earlyClose:8,tpAuto:0,tpManual:2,revenge:1,manualClose:4,tpStreak:0,bestTpStreak:0};
// Umbral BE: si el resultado es menor al 0.2% del capital, se considera breakeven
function isNearBE(result,capital){return Math.abs(result)<Math.max(1,Math.abs(capital||0)*0.002);}
// Precios eliminados - se actualizan manualmente en la app

// - HELPERS -
function fmtNum(v){
  const a=Math.abs(v);
  const s=a>=1000?a.toLocaleString("es-ES",{minimumFractionDigits:2,maximumFractionDigits:2}):a.toFixed(2);
  return (v>=0?"+":"-")+"$"+s;
}
function fmtP(v){return v>=1000?"$"+v.toLocaleString():"$"+v;}
function today(){return new Date().toLocaleDateString("es-ES");}
function calcScore(ps,pats,jnl,xhist,predictions){
  xhist=xhist||[];
  predictions=predictions||[];
  // S1 — Disciplina SL (0–35 pts): respetar el stop loss es la base de todo
  // slOk=1.0 pts, slBreakeven=0.5 pts (gestión activa pero no pérdida controlada), slBroken=0 pts
  const slT=(ps.slOk||0)+(ps.slBroken||0)+(ps.slBreakeven||0);
  const s1=slT>0?(((ps.slOk||0)+(ps.slBreakeven||0)*0.5)/slT)*35:0;
  // S2 — Gestión de salidas (0–20 pts): dejar correr ganadores hasta el TP
  const exitTot=(ps.tpAuto||0)+(ps.tpManual||0)+(ps.earlyClose||0)+(ps.manualClose||0);
  const s2=exitTot>0?((ps.tpAuto||0)+(ps.tpManual||0))/exitTot*20:0;
  // S3 — Control emocional (PUEDE SER NEGATIVO):
  //   Base: +15 pts neutro
  //   Revenge trading: -10 pts por cada uno SIN SUELO (arrastra el score a negativo)
  //   Cierres prematuros: los 3 primeros son tolerados (gestión activa),
  //                       a partir del 4º se penaliza -3 pts cada uno
  const s3=15-((ps.revenge||0)*10)-(Math.max(0,(ps.earlyClose||0)-3)*3);
  // S4 — Metodología (0–20 pts): usar un sistema con patrones testados
  const s4=Math.min(20,pats.filter(function(p){return p.conf>0;}).length*7);
  // S5 — Diario psicológico (0–10 pts)
  const w=jnl.filter(function(j){return j.type==="win";}).length;
  const l=jnl.filter(function(j){return j.type==="lesson";}).length;
  const mis=jnl.filter(function(j){return j.type==="mistake";}).length;
  const a=jnl.filter(function(j){return j.type==="analysis";}).length;
  const s5=Math.min(10,(w*2)+(l*1.5)+a+Math.min(mis,l)*0.5);
  // Bonus — entradas de diario ligadas a cierres MANUALES (reflexión real post-operación)
  // Los auto-cierres no cuentan: el usuario no tuvo oportunidad de reflexionar
  const manualXhistB=xhist.filter(function(h){return !h.autoClose;});
  const manualTotal=manualXhistB.length||1;
  const linkedDocs=jnl.filter(function(j){return j.linkedClose;}).length;
  const bon=Math.min(5,linkedDocs*1.5);
  // Bonus reflexión IA (0–5 pts): cada sesión de coaching con el chatbot suma 1 pt
  // Premia el trabajo de introspección guiada, distinto del diario manual
  const reflexCount=jnl.filter(function(j){return j.fromReflexion;}).length;
  const bonR=Math.min(5,reflexCount);
  // Score puede ir negativo en casos extremos (señal de alarma), máx 100
  // Bonus predicciones (0–5 pts): tasa de acierto en predicciones guardadas
  var predHit=predictions.filter(function(p){return p.status==="hit";}).length;
  var predMissed=predictions.filter(function(p){return p.status==="missed";}).length;
  var predResolved=predHit+predMissed;
  var bonPred=0;
  if(predResolved>=3){
    var predRate=predHit/predResolved;
    bonPred=predRate>=0.70?5:predRate>=0.55?3:predRate>=0.40?1:0;
  }
  return Math.max(-30,Math.min(100,Math.round(s1+s2+s3+s4+s5+bon+bonR+bonPred)));
}

// - ANALISIS PERFIL -
function generateProfileSummary(ps,pats,jnl,hist,xhist,sc,predictions){
  predictions=predictions||[];
  // Returns array of {text, cat} where cat = "positive"|"neutral"|"negative"
  var items=[];
  function add(text,cat){items.push({text:text,cat:cat||"neutral"});}

  var allHist=[...xhist,...hist];
  var totalOps=allHist.length;
  var wins=allHist.filter(function(h){return h.result>0;}).length;
  var winRate=totalOps>0?Math.round(wins/totalOps*100):0;
  var slTotal=(ps.slOk||0)+(ps.slBroken||0)+(ps.slBreakeven||0);
  var slRate=slTotal>0?Math.round(((ps.slOk||0)+(ps.slBreakeven||0)*0.5)/slTotal*100):null;
  var totClose=(ps.tpAuto||0)+(ps.tpManual||0)+(ps.earlyClose||0)+(ps.manualClose||0);
  var earlyPct=totClose>0?Math.round((ps.earlyClose||0)/totClose*100):null;
  var tpPct=totClose>0?Math.round(((ps.tpAuto||0)+(ps.tpManual||0))/totClose*100):null;
  var rCount=ps.ratioCount||0;
  var avgR=rCount>0?(ps.ratioSum||0)/rCount:null;

  // ── 1. SL + cierre prematuro: contextualizados juntos ──
  if(slRate!==null&&earlyPct!==null){
    if(slRate>=90&&earlyPct<=20){
      add("Disciplina solida: respetas el SL en el "+slRate+"% de los casos y cierras prematuramente solo el "+earlyPct+"% de las veces.","positive");
    }else if(slRate>=80&&earlyPct>40){
      add("Contradicion clave: respetas el SL en el "+slRate+"% de las operaciones (bien) pero cierras antes del objetivo el "+earlyPct+"% de las veces (impaciente). Tu disciplina para las perdidas supera tu confianza en las ganancias.","neutral");
    }else if(slRate>=80){
      add("Respetas el SL en el "+slRate+"% de los casos. Disciplina correcta en la gestion de perdidas.","positive");
    }else if(slRate<70){
      add("Solo respetas el SL en el "+slRate+"% de casos — estas saltandote el stop loss con demasiada frecuencia. Es el habito que mas dinero cuesta a largo plazo.","negative");
    }else{
      add("Respetas el SL en el "+slRate+"% de casos. Queda margen de mejora.","neutral");
    }
  }else if(slRate!==null){
    if(slRate>=90)add("Respetas el SL en el "+slRate+"% de los casos. Excelente gestion del riesgo.","positive");
    else if(slRate<70)add("Solo respetas el SL en el "+slRate+"% de casos. Revisa tu disciplina de entrada.","negative");
    else add("Respetas el SL en el "+slRate+"% de casos.","neutral");
  }
  // Si solo hay datos de cierre pero no de SL
  if(slRate===null&&earlyPct!==null){
    if(earlyPct>40)add("Cierras antes del objetivo el "+earlyPct+"% de las veces. Trabaja la confianza en tu propio plan.","negative");
    else if(tpPct!==null&&tpPct>=60)add("Alcanzas el objetivo en el "+tpPct+"% de los cierres. Buena ejecucion del plan.","positive");
  }

  // ── 2. Ratio R:R (formato correcto: 1:X) ──
  if(avgR!==null){
    var rStr="1:"+avgR.toFixed(2);
    if(avgR>=3)add("Ratio R:R medio "+rStr+" en "+rCount+" operaciones. Excelente seleccion de niveles — los TPs son ambiciosos respecto al riesgo asumido.","positive");
    else if(avgR>=2)add("Ratio R:R medio "+rStr+" en "+rCount+" operaciones. Solido. Por cada euro arriesgado ganas "+avgR.toFixed(2)+" de media.","positive");
    else if(avgR>=1)add("Ratio R:R medio "+rStr+" en "+rCount+" operaciones. Por debajo de 1:2 — o los TPs estan demasiado cerca o los SLs demasiado lejos de la entrada.","neutral");
    else add("Ratio R:R medio "+rStr+" — las perdidas superan las ganancias en proporcion. Revisa la ubicacion de TPs y SLs.","negative");
  }

  // ── 3. Tasa de acierto (solo xhist, no incluye Quantfury que distorsiona) ──
  var appOps=xhist.length;
  var appWins=xhist.filter(function(h){return h.result>0;}).length;
  var appWinRate=appOps>=5?Math.round(appWins/appOps*100):null;
  if(appWinRate!==null){
    if(appWinRate>=60)add("Tasa de acierto del "+appWinRate+"% en las "+appOps+" operaciones registradas en la app. Por encima de la media del mercado.","positive");
    else if(appWinRate>=45)add("Tasa de acierto del "+appWinRate+"% en "+appOps+" operaciones. Aceptable si el ratio R:R compensa las perdidas.","neutral");
    else add("Tasa de acierto del "+appWinRate+"% en "+appOps+" operaciones. Revisa los criterios de entrada — demasiadas posiciones llegan al SL.","negative");
  }

  // ── 4. Documentacion y reflexion ──
  var closeDocs=jnl.filter(function(j){return j.linkedClose;});
  // Solo cierres manuales como denominador (auto-cierres no muestran el modal)
  var manualXhistPS=xhist.filter(function(h){return !h.autoClose;});
  var docRate=manualXhistPS.length>0?Math.round(closeDocs.length/manualXhistPS.length*100):null;
  var lessons=jnl.filter(function(j){return j.type==="lesson";}).length;
  var mistakes=jnl.filter(function(j){return j.type==="mistake";}).length;
  if(docRate!==null){
    if(docRate>=70)add("Documentas el "+docRate+"% de tus cierres. La reflexion constante es la base del progreso.","positive");
    else if(docRate>=30)add("Documentas el "+docRate+"% de tus cierres. Escribir despues de cada operacion acelera la mejora.","neutral");
    else if(docRate>0)add("Solo documentas el "+docRate+"% de tus cierres. Sin reflexion post-operacion el aprendizaje es muy lento.","negative");
    else add("No documentas ningun cierre. Escribir aunque sea una frase despues de cada trade marca la diferencia.","negative");
  }
  if(lessons>0||mistakes>0){
    if(lessons>mistakes)add("Conviertes "+lessons+" errores en lecciones vs "+mistakes+" que quedaron sin analizar. Mentalidad de mejora continua.","positive");
    else if(mistakes>lessons&&mistakes>2)add("Tienes "+mistakes+" errores documentados y solo "+lessons+" convertidos en leccion. Dedica tiempo a analizar que fallo en cada operacion perdedora.","neutral");
  }

  // ── 5. Patron mas fiable (solo si tiene estadistica real: >=20 obs) ──
  var confPats=pats.filter(function(p){return p.conf>0&&p.obs>=20;});
  if(confPats.length>0){
    confPats.sort(function(a,b){return(b.conf/b.obs)-(a.conf/a.obs);});
    var best=confPats[0];
    var bestRate=Math.round(best.conf/best.obs*100);
    if(bestRate>=65)add("Patron mas fiable: '"+best.name+"' con "+bestRate+"% de confirmacion en "+best.obs+" observaciones.","positive");
  }

  // ── 6. Reflexiones IA ──
  var reflexEntries=jnl.filter(function(j){return j.fromReflexion;});
  var reflexCount=reflexEntries.length;
  var bonR=Math.min(5,reflexCount);
  if(reflexCount>=5){
    add("Has completado "+reflexCount+" sesiones de reflexion con el coach IA (+"+bonR+" pts en score). El trabajo de introspección guiada refleja madurez psicologica y compromiso con la mejora continua.","positive");
  }else if(reflexCount>0){
    add("Llevas "+reflexCount+" reflexion"+(reflexCount>1?"es":"")+" con el coach IA (+"+bonR+" pts). Cada sesión adicional suma hasta completar el bonus máximo de +5 pts (te faltan "+(5-reflexCount)+").","neutral");
  }else{
    add("Sin reflexiones con el coach IA todavia. Usar el modo Reflexion en el chat puede sumar hasta +5 pts al score y mejora la conciencia de tus patrones emocionales.","neutral");
  }

  // ── 7. Predicciones ──
  var predHit2=predictions.filter(function(p){return p.status==="hit";}).length;
  var predMissed2=predictions.filter(function(p){return p.status==="missed";}).length;
  var predPending2=predictions.filter(function(p){return p.status==="pending";}).length;
  var predResolved2=predHit2+predMissed2;
  if(predResolved2>=3){
    var predRate2=Math.round(predHit2/predResolved2*100);
    var bonPred2=predRate2>=70?5:predRate2>=55?3:predRate2>=40?1:0;
    if(predRate2>=70)add("Tasa de acierto en predicciones del "+predRate2+"% ("+predHit2+"/"+predResolved2+" resueltas, "+predPending2+" pendientes). Excelente calibracion del analisis tecnico. +"+bonPred2+" pts al score.","positive");
    else if(predRate2>=55)add("Tasa de acierto en predicciones del "+predRate2+"% ("+predHit2+"/"+predResolved2+" resueltas). Por encima de la media — sigue registrando y verificando. +"+bonPred2+" pts al score.","positive");
    else if(predRate2>=40)add("Tasa de acierto en predicciones del "+predRate2+"% ("+predHit2+"/"+predResolved2+" resueltas). Margen de mejora en la seleccion de escenarios. +"+bonPred2+" pts al score.","neutral");
    else add("Tasa de acierto en predicciones del "+predRate2+"% ("+predHit2+"/"+predResolved2+" resueltas). Las predicciones fallan mas de lo que aciertan — revisa los timeframes y condiciones de entrada.","negative");
  }else if(predictions.length>0){
    add("Tienes "+predictions.length+" prediccion"+(predictions.length>1?"es":"")+" guardada"+(predictions.length>1?"s":"")+", "+predPending2+" pendiente"+(predPending2!==1?"s":"")+" de resolver. Se necesitan al menos 3 resueltas para incluir el acierto en el score.","neutral");
  }else{
    add("Sin predicciones guardadas todavia. Guarda los analisis del chat como predicciones y verifica si se cumplen para obtener hasta +5 pts adicionales en el score.","neutral");
  }

  return items;
}

// ==================== QUANTFURY PDF PARSER + DIAGNOSIS ====================

function qfLoadPdfJs(cb){
  if(window.pdfjsLib){cb(null);return;}
  var s=document.createElement("script");
  s.src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
  s.onload=function(){
    if(window.pdfjsLib){
      window.pdfjsLib.GlobalWorkerOptions.workerSrc=
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    }
    cb(null);
  };
  s.onerror=function(){cb(new Error("No se pudo cargar pdf.js"));};
  document.head.appendChild(s);
}

function qfParseAmount(str){
  if(!str&&str!==0)return null;
  var s=String(str).trim();
  // Use indexOf so "- ₮ 1,946.84" (spaced format) is caught by the minus anywhere in the token
  var neg=s.indexOf("-")>=0;
  // Strip everything except digits and decimal point — immune to any currency symbol or spacing
  var cleaned=s.replace(/[^0-9.]/g,"");
  var n=parseFloat(cleaned);
  return isNaN(n)?null:(neg?-n:n);
}

function qfParseDate(str){
  if(!str)return null;
  var m=str.match(/(\d{2})\/(\d{2})\/(\d{4})\s+(\d{1,2}):(\d{2}):(\d{2})\s+([AP]M)\s+UTC/);
  if(!m)return null;
  var d=parseInt(m[1]),mo=parseInt(m[2])-1,y=parseInt(m[3]);
  var h=parseInt(m[4]),mi=parseInt(m[5]),sec=parseInt(m[6]),ampm=m[7];
  if(ampm==="PM"&&h!==12)h+=12;
  if(ampm==="AM"&&h===12)h=0;
  return new Date(Date.UTC(y,mo,d,h,mi,sec));
}

var QF_ACTIONS=["COMPRAR (abrir)","VENDER (abrir)","COMPRAR (añadir)","VENDER (añadir)","COMPRAR (reducir)","VENDER (reducir)","COMPRAR (cerrar)","VENDER (cerrar)"];

function qfDetectAction(text){
  for(var i=0;i<QF_ACTIONS.length;i++){if(text.indexOf(QF_ACTIONS[i])>=0)return QF_ACTIONS[i];}
  return null;
}

function qfParseDataRow(text){
  var action=qfDetectAction(text);
  if(!action)return null;
  var ai=text.indexOf(action);
  var before=text.substring(0,ai).trim();
  var after=text.substring(ai+action.length).trim();
  var dm=before.match(/(\d{2}\/\d{2}\/\d{4}\s+\d{1,2}:\d{2}:\d{2}\s+[AP]M\s+UTC)/);
  var symbol="",datetime="";
  if(dm){var di=before.indexOf(dm[1]);symbol=before.substring(0,di).trim();datetime=dm[1];}
  else{symbol=before;}
  // G&P at end — has explicit +/- sign. Handles spaced format: "+ ₮ 1.71" or "-$1.39"
  var pnl=null;
  var pnlM=after.match(/([+\-]\s*\S?\s*[\d,]+\.?\d*)$/);
  if(!pnlM)pnlM=after.match(/([+\-][\d,]+\.?\d*)$/);
  if(pnlM){pnl=qfParseAmount(pnlM[1]);after=after.substring(0,after.length-pnlM[1].length).trim();}
  // Value at end: currency symbol + optional space + number (e.g. "₮ 2,850.00" or "$210.01")
  var value=null;
  var valM=after.match(/([^\d\s+\-]\s*[\d,]+\.?\d*)$/);
  if(valM){value=qfParseAmount(valM[1]);after=after.substring(0,after.length-valM[1].length).trim();}
  // Remaining: PRICE [QUANTITY UNIT]
  var price=null,quantity=null,unit=null;
  var restM=after.match(/^(\$?[\d,]+\.?\d*)\s*(.*)$/);
  if(restM){
    price=qfParseAmount(restM[1]);
    var qtyPart=restM[2].trim();
    if(qtyPart){
      var qtyM=qtyPart.match(/^([\d,]+\.?\d*)\s+(.+)$/);
      if(qtyM){quantity=parseFloat(qtyM[1].replace(/,/g,""));unit=qtyM[2].trim();}
      else{unit=qtyPart;}
    }
  }
  return{symbol:symbol,datetime:datetime,action:action,price:price,quantity:quantity,unit:unit,value:value,pnl:pnl};
}

async function qfExtractTextRows(file,onProgress){
  return new Promise(function(resolve,reject){
    qfLoadPdfJs(async function(err){
      if(err){reject(err);return;}
      try{
        var buf=await file.arrayBuffer();
        var pdf=await window.pdfjsLib.getDocument({data:buf}).promise;
        var textRows=[];
        for(var p=1;p<=pdf.numPages;p++){
          if(onProgress)onProgress(Math.round(p/pdf.numPages*50));
          var page=await pdf.getPage(p);
          var vp=page.getViewport({scale:1});
          var content=await page.getTextContent();
          var items=[];
          content.items.forEach(function(item){
            if(!item.str||!item.str.trim())return;
            items.push({text:item.str,x:Math.round(item.transform[4]),y:Math.round(vp.height-item.transform[5])});
          });
          items.sort(function(a,b){var yd=a.y-b.y;if(Math.abs(yd)>4)return yd;return a.x-b.x;});
          var rows=[],cur=null;
          items.forEach(function(item){
            if(!cur||Math.abs(item.y-cur.y)>4){cur={y:item.y,texts:[item.text]};rows.push(cur);}
            else{cur.texts.push(item.text);}
          });
          rows.forEach(function(r){textRows.push(r.texts.join(" ").trim());});
        }
        resolve(textRows);
      }catch(e){reject(e);}
    });
  });
}

function qfParseAllRows(textRows,onProgress){
  var section=null,subsection=null;
  var openGroups=[],closedGroups=[];
  var currentGroup=null;
  function pushCurrent(){
    if(currentGroup&&currentGroup.rows.length>0){
      if(section==="open")openGroups.push(currentGroup);
      else if(section==="closed")closedGroups.push(currentGroup);
    }
    currentGroup=null;
  }
  textRows.forEach(function(text,idx){
    if(onProgress&&idx%50===0)onProgress(50+Math.round(idx/textRows.length*30));
    var t=text.trim();
    if(!t)return;
    if(t==="Posiciones Abiertas"){section="open";subsection=null;return;}
    if(t==="Posiciones Cerradas"){pushCurrent();section="closed";subsection=null;return;}
    if(t==="Información importante"){pushCurrent();section=null;return;}
    if(t==="Acciones y ETFs"){if(section==="open")pushCurrent();subsection="stocks";return;}
    if(t==="Pares de criptomonedas"){if(section==="open")pushCurrent();subsection="crypto";return;}
    if(t==="Pares de divisas"){if(section==="open")pushCurrent();subsection="forex";return;}
    if(t.indexOf("Símbolo")>=0||t.indexOf("Fecha/Hora")>=0)return;
    if(t.indexOf("Informe del historial")>=0||t.indexOf("Página:")>=0)return;
    if(t.indexOf("Información de la cuenta")>=0||t.indexOf("Nombre del cliente")>=0)return;
    if(t.indexOf("MIGUEL")>=0||t.indexOf("Generado:")>=0||t.indexOf("QUANTFURY")>=0)return;
    if(t.indexOf("Quantfury Trading")>=0||t.indexOf("support@")>=0||t.indexOf("Por favor")>=0)return;
    if(!section)return;
    if(t.startsWith("Total")){
      var tm=t.match(/Total\s+([+\-]?\s*\S?\s*[\d,]+\.?\d*)/);
      var tpnl=tm?qfParseAmount(tm[1]):null;
      if(currentGroup){currentGroup.pnlTotal=tpnl;closedGroups.push(currentGroup);currentGroup=null;}
      return;
    }
    var row=qfParseDataRow(t);
    if(row&&row.symbol&&row.action){
      row.subsection=subsection;
      if(section==="closed"){
        if(!currentGroup){currentGroup={symbol:row.symbol,subsection:subsection,rows:[],pnlTotal:null};}
        currentGroup.rows.push(row);
      }else{
        if(!currentGroup||currentGroup.symbol!==row.symbol){pushCurrent();currentGroup={symbol:row.symbol,subsection:subsection,rows:[],pnlTotal:null};}
        currentGroup.rows.push(row);
      }
    }
  });
  pushCurrent();
  return{openGroups:openGroups,closedGroups:closedGroups};
}

function qfCalcMetrics(group){
  var rows=group.rows;
  if(!rows||rows.length===0)return null;
  var firstRow=rows[0];
  var dir="unknown";
  if(firstRow.action==="COMPRAR (abrir)")dir="long";
  else if(firstRow.action==="VENDER (abrir)")dir="short";
  var openRows=rows.filter(function(r){return r.action.indexOf("abrir")>=0;});
  var addRows=rows.filter(function(r){return r.action.indexOf("añadir")>=0;});
  var reduceRows=rows.filter(function(r){return r.action.indexOf("reducir")>=0;});
  var closeRows=rows.filter(function(r){return r.action.indexOf("cerrar")>=0;});
  var entryRows=openRows.concat(addRows);
  var exitRows=reduceRows.concat(closeRows);
  var entryAvg=null,totalEntryQty=0,weightedEntry=0;
  entryRows.forEach(function(r){if(r.price&&r.quantity){totalEntryQty+=r.quantity;weightedEntry+=r.price*r.quantity;}});
  if(totalEntryQty>0)entryAvg=weightedEntry/totalEntryQty;
  else if(firstRow.price)entryAvg=firstRow.price;
  var exitAvg=null,totalExitQty=0,weightedExit=0;
  exitRows.forEach(function(r){if(r.price&&r.quantity){totalExitQty+=r.quantity;weightedExit+=r.price*r.quantity;}});
  if(totalExitQty>0)exitAvg=weightedExit/totalExitQty;
  var peakSize=0;
  entryRows.forEach(function(r){if(r.value)peakSize+=Math.abs(r.value);});
  var pnl=group.pnlTotal;
  if(pnl===null||pnl===undefined){var ps2=0;rows.forEach(function(r){if(r.pnl!==null&&r.pnl!==undefined)ps2+=r.pnl;});pnl=ps2;}
  var openedAt=qfParseDate(firstRow.datetime);
  var lastRow=rows[rows.length-1];
  var closedAt=qfParseDate(lastRow.datetime);
  var durationHours=null;
  if(openedAt&&closedAt&&closedAt>openedAt)durationHours=(closedAt-openedAt)/3600000;
  var avgDown=false,scaledWinner=false;
  if(addRows.length>0&&firstRow.price){
    addRows.forEach(function(r){
      if(!r.price)return;
      if(dir==="long"&&r.price<firstRow.price)avgDown=true;
      if(dir==="short"&&r.price>firstRow.price)avgDown=true;
      if(dir==="long"&&r.price>firstRow.price)scaledWinner=true;
      if(dir==="short"&&r.price<firstRow.price)scaledWinner=true;
    });
  }
  return{
    symbol:group.symbol,subsection:group.subsection||"unknown",direction:dir,
    entry_avg_price:entryAvg,exit_avg_price:exitAvg,total_size_usd:peakSize,
    pnl_usd:pnl,pnl_pct:peakSize>0&&pnl!==null?pnl/peakSize*100:null,
    opened_at:openedAt?openedAt.toISOString():null,
    closed_at:closedAt?closedAt.toISOString():null,
    duration_hours:durationHours,
    num_additions:addRows.length,num_partials:reduceRows.length,
    auto_flags:{
      averaged_down:avgDown,scaled_winner:scaledWinner,
      held_over_30d:durationHours!==null&&durationHours>720,
      micro_gain:pnl!==null&&pnl>0&&pnl<5&&peakSize>500,
      large_loss:pnl!==null&&pnl<-100,
      catastrophic_loss:pnl!==null&&pnl<-500
    },
    raw_rows:rows
  };
}

function qfGenerateDiagnosis(trades){
  var valid=(trades||[]).filter(function(t){return t.pnl_usd!==null;});
  var n=valid.length;
  if(n===0)return null;
  var winners=valid.filter(function(t){return t.pnl_usd>0;});
  var losers=valid.filter(function(t){return t.pnl_usd<0;});
  var breakeven=valid.filter(function(t){return t.pnl_usd===0;});
  var totalPnl=valid.reduce(function(s,t){return s+t.pnl_usd;},0);
  var avgWin=winners.length>0?winners.reduce(function(s,t){return s+t.pnl_usd;},0)/winners.length:0;
  var avgLossAbs=losers.length>0?Math.abs(losers.reduce(function(s,t){return s+t.pnl_usd;},0)/losers.length):0;
  var grossWin=winners.reduce(function(s,t){return s+t.pnl_usd;},0);
  var grossLoss=Math.abs(losers.reduce(function(s,t){return s+t.pnl_usd;},0));
  var pf=grossLoss>0?grossWin/grossLoss:(grossWin>0?999:0);
  var maxWin=winners.length>0?winners.reduce(function(mx,t){return t.pnl_usd>mx.pnl_usd?t:mx;},winners[0]):null;
  var maxLoss=losers.length>0?losers.reduce(function(mn,t){return t.pnl_usd<mn.pnl_usd?t:mn;},losers[0]):null;
  var dates=valid.filter(function(t){return t.opened_at;}).map(function(t){return new Date(t.opened_at).getTime();});
  var firstDate=dates.length>0?new Date(Math.min.apply(null,dates)):null;
  var lastDate=dates.length>0?new Date(Math.max.apply(null,dates)):null;
  var assetMap={};
  valid.forEach(function(t){
    var sym=t.symbol;
    if(!assetMap[sym])assetMap[sym]={trades:0,pnl:0,wins:0};
    assetMap[sym].trades++;assetMap[sym].pnl+=t.pnl_usd;
    if(t.pnl_usd>0)assetMap[sym].wins++;
  });
  var assetList=Object.keys(assetMap).map(function(sym){
    var a=assetMap[sym];
    return{symbol:sym,trades:a.trades,pnl:a.pnl,winRate:a.wins/a.trades,pct:totalPnl!==0?a.pnl/totalPnl:0};
  }).sort(function(a,b){return Math.abs(b.pnl)-Math.abs(a.pnl);});
  var monthMap={};
  valid.forEach(function(t){
    if(!t.opened_at)return;
    var d=new Date(t.opened_at);
    var k=d.getFullYear()+"-"+(d.getMonth()+1<10?"0":"")+(d.getMonth()+1);
    if(!monthMap[k])monthMap[k]=0;
    monthMap[k]+=t.pnl_usd;
  });
  var months=Object.keys(monthMap).sort().map(function(k){return{month:k,pnl:monthMap[k]};});
  var bestMonth=months.length>0?months.reduce(function(mx,m){return m.pnl>mx.pnl?m:mx;},months[0]):{month:"N/D",pnl:0};
  var worstMonth=months.length>0?months.reduce(function(mn,m){return m.pnl<mn.pnl?m:mn;},months[0]):{month:"N/D",pnl:0};
  var avgDownTrades=valid.filter(function(t){return t.auto_flags&&t.auto_flags.averaged_down;});
  var microGainTrades=valid.filter(function(t){return t.auto_flags&&t.auto_flags.micro_gain;});
  var catLossTrades=valid.filter(function(t){return t.auto_flags&&t.auto_flags.catastrophic_loss;});
  var largeLossTrades=valid.filter(function(t){return t.auto_flags&&t.auto_flags.large_loss&&!t.auto_flags.catastrophic_loss;});
  var heldLongTrades=valid.filter(function(t){return t.auto_flags&&t.auto_flags.held_over_30d;});
  return{
    n:n,winRate:winners.length/n,winners:winners.length,losers:losers.length,breakeven:breakeven.length,
    totalPnl:totalPnl,avgWin:avgWin,avgLossAbs:avgLossAbs,profitFactor:pf,expectancy:totalPnl/n,
    maxWin:maxWin,maxLoss:maxLoss,firstDate:firstDate,lastDate:lastDate,
    assets:assetList,months:months,bestMonth:bestMonth,worstMonth:worstMonth,
    avgDownTrades:avgDownTrades,microGainTrades:microGainTrades,
    catLossTrades:catLossTrades,largeLossTrades:largeLossTrades,heldLongTrades:heldLongTrades,
    buckets:{
      loss_cat:catLossTrades.length,
      loss_large:largeLossTrades.length,
      loss_med:valid.filter(function(t){return t.pnl_usd<-10&&t.pnl_usd>=-100;}).length,
      loss_small:valid.filter(function(t){return t.pnl_usd<0&&t.pnl_usd>=-10;}).length,
      gain_small:valid.filter(function(t){return t.pnl_usd>0&&t.pnl_usd<10;}).length,
      gain_med:valid.filter(function(t){return t.pnl_usd>=10&&t.pnl_usd<100;}).length,
      gain_large:valid.filter(function(t){return t.pnl_usd>=100&&t.pnl_usd<500;}).length,
      gain_cat:valid.filter(function(t){return t.pnl_usd>=500;}).length
    }
  };
}

function mapQfTradeToHist(t){
  // Strip quote currency for display: ETH/USDT → ETH, BTC/USD → BTC
  var asset=t.symbol.replace(/\/(USDT|USD|EUR|GBP|BUSD|BTC|ETH)$/i,"");
  if(!asset)asset=t.symbol;
  var dir=t.direction==="long"?"Long":"Short";
  // Date from closed_at (prefer) else opened_at
  var dateStr="";
  var dtSrc=t.closed_at||t.opened_at;
  if(dtSrc){
    var d=new Date(dtSrc);
    if(!isNaN(d.getTime())){
      var dd=String(d.getDate()).padStart(2,"0");
      var mm=String(d.getMonth()+1).padStart(2,"0");
      dateStr=dd+"/"+mm+"/"+d.getFullYear();
    }
  }
  var flags=t.auto_flags||{};
  var noteParts=[];
  if(flags.averaged_down)noteParts.push("prom.baja");
  if(flags.catastrophic_loss)noteParts.push("pérdida cat.");
  else if(flags.large_loss)noteParts.push("pérdida grande");
  if(flags.micro_gain)noteParts.push("micro ganancia");
  if(flags.held_over_30d)noteParts.push("held >30d");
  var note="QF"+(noteParts.length>0?" · "+noteParts.join(", "):"");
  return{
    id:"qf_"+t.symbol+"_"+(t.opened_at||Math.random()),
    asset:asset,
    dir:dir,
    cap:Math.round(t.total_size_usd||0),
    result:t.pnl_usd!==null&&t.pnl_usd!==undefined?t.pnl_usd:0,
    date:dateStr,
    note:note,
    source:"imported_quantfury",
    qf_symbol:t.symbol,
    qf_auto_flags:flags,
    qf_duration_hours:t.duration_hours
  };
}

const TABS=["Resumen","Posiciones","Historial","Patrones","Perfil","Recuperacion","Calendario","Alertas","Chat","Auditoría","Importar","Diagnóstico"];
const TC={win:"#00ff88",mistake:"#ff4444",lesson:"#f0b429",analysis:"#888"};
const TL={win:"VICTORIA",mistake:"ERROR",lesson:"LECCION",analysis:"ANALISIS"};

// ── WEB PUSH (PWA notifications) ──────────────────────────────────────
// Replace with your own key — generate via `node scripts/generate-vapid.js`.
// Public key only; private key lives in the Supabase Edge Function secret.
const VAPID_PUBLIC_KEY="BO2tqw71Ldp5YRpYds7NqsiBkVE3BAGZl2XcVAQYdJq8a03DY8efCjabKSq9fQQ8igRvU53BkOyxC9xcoPUpOVE";
const PUSH_USER_ID="miguel"; // matches Supabase trading_data.user_id

function urlBase64ToUint8Array(base64String){
  var padding="=".repeat((4-base64String.length%4)%4);
  var base64=(base64String+padding).replace(/-/g,"+").replace(/_/g,"/");
  var rawData=window.atob(base64);
  var outputArray=new Uint8Array(rawData.length);
  for(var i=0;i<rawData.length;i++)outputArray[i]=rawData.charCodeAt(i);
  return outputArray;
}

// Fan-out a notification payload to all registered push subscriptions via the
// Edge Function. Silently no-ops if Supabase is not configured. Telegram keeps
// running in parallel (see `sendAlert` / `notifyAutoClose`) as a fallback.
function sendPushFanout(payload){
  try{
    var cfg=window.SUPABASE_CFG;
    if(!cfg||!cfg.url||!cfg.key)return;
    fetch(cfg.url+"/functions/v1/send-push",{
      method:"POST",
      headers:{"Content-Type":"application/json","Authorization":"Bearer "+cfg.key,"apikey":cfg.key},
      body:JSON.stringify({user_id:PUSH_USER_ID,payload:payload})
    }).catch(function(){});
  }catch(e){}
}

// - STYLES -
const S={
  app:{fontFamily:"monospace",background:"#0a0a0f",minHeight:"100vh",color:"#e0e0e0"},
  hdr:{background:"#0d0d16",borderBottom:"1px solid #1e1e2e",padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"},
  tabs:{background:"#0d0d16",borderBottom:"1px solid #1e1e2e",padding:"6px 12px",display:"flex",gap:3,overflowX:"auto"},
  tab:a=>({padding:"5px 9px",borderRadius:4,fontSize:10,fontWeight:700,border:"none",cursor:"pointer",background:a?"#f0b429":"transparent",color:a?"#0a0a0f":"#555",whiteSpace:"nowrap"}),
  topbar:{background:"#080810",borderBottom:"1px solid #1a1a2a",padding:"6px 14px",display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"},
  body:{padding:14,maxWidth:1100,margin:"0 auto"},
  card:{background:"#111118",border:"1px solid #1e1e2e",borderRadius:8,padding:14,marginBottom:10},
  grid:c=>({display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax("+c+"px,1fr))",gap:10,marginBottom:12}),
  lbl:{fontSize:9,color:"#555",marginBottom:3},
  val:c=>({fontSize:18,fontWeight:700,color:c||"#e0e0e0"}),
  row:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:"1px solid #1a1a2a",fontSize:11},
  bdg:c=>({fontSize:8,color:c,border:"1px solid "+c,padding:"1px 4px",borderRadius:3,display:"inline-block"}),
  bar:{height:6,borderRadius:3,background:"#1e1e2e",overflow:"hidden"},
  fill:(p,c)=>({height:"100%",borderRadius:3,width:Math.min(p,100)+"%",background:c,transition:"width .5s"}),
  modal:{position:"fixed",inset:0,background:"rgba(0,0,0,.88)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:12},
  mc:{background:"#111118",border:"1px solid #2a2a3a",borderRadius:12,padding:20,width:"100%",maxWidth:460,maxHeight:"90vh",overflowY:"auto"},
  inp:{background:"#0d0d16",border:"1px solid #2a2a3a",color:"#e0e0e0",padding:"7px 10px",borderRadius:4,fontSize:11,width:"100%",boxSizing:"border-box",outline:"none"},
  btn:p=>({background:p?"#f0b429":"transparent",color:p?"#0a0a0f":"#666",border:p?"none":"1px solid #2a2a3a",padding:"8px 14px",borderRadius:4,fontSize:10,fontWeight:700,cursor:"pointer"}),
};

// - AUDIT AGENT -
// Campos requeridos mínimos para cualquier auditoría (siempre presentes en xhist).
var AUDIT_CORE_FIELDS=["asset","dir","result","date","note"];
// Campos enriquecidos que pueden faltar en operaciones cerradas antes de la feature de auditoría.
var AUDIT_ENRICHED_FIELDS=["sl_initial","sl_modifications","thesis_text","ratio","patternId","broker","reopen_after_sl"];

// Devuelve {core:[], enriched:[], hasMinimum:bool} listando campos ausentes.
function detectMissingFields(op){
  if(!op||typeof op!=="object"){
    return{core:AUDIT_CORE_FIELDS.slice(),enriched:AUDIT_ENRICHED_FIELDS.slice(),hasMinimum:false};
  }
  var missingCore=[];
  for(var i=0;i<AUDIT_CORE_FIELDS.length;i++){
    var f=AUDIT_CORE_FIELDS[i];
    var v=op[f];
    if(v==null||v==="")missingCore.push(f);
  }
  var missingEnr=[];
  for(var j=0;j<AUDIT_ENRICHED_FIELDS.length;j++){
    var g=AUDIT_ENRICHED_FIELDS[j];
    if(op[g]==null)missingEnr.push(g);
  }
  return{core:missingCore,enriched:missingEnr,hasMinimum:missingCore.length===0};
}

function hasMinimumAuditData(op){ return detectMissingFields(op).hasMinimum; }

// Construye un reporte para operaciones que no tienen datos mínimos (no llamamos a la API).
function buildNonAuditableReport(op,missing){
  var avail=[];
  if(op&&typeof op==="object"){
    var keys=Object.keys(op);
    for(var i=0;i<keys.length;i++){
      var k=keys[i];
      if(k==="audit_report"||k==="audit_score"||k==="audited_at")continue;
      if(op[k]!=null&&op[k]!=="")avail.push(k);
    }
  }
  return{
    nonAuditable:true,
    reason:"Faltan campos mínimos: "+missing.core.join(", "),
    availableFields:avail,
    missingCore:missing.core,
    missingEnriched:missing.enriched,
    summary:"Esta operación no puede auditarse — faltan datos mínimos.",
    rules:[]
  };
}

var AUDIT_SYSTEM_PROMPT=[
  "Eres un auditor de disciplina de trading. Evalúas operaciones cerradas según 5 reglas estrictas de gestión de riesgo.",
  "",
  "REGLAS A EVALUAR:",
  "R1 – Stop Loss es Ley: el SL debe estar definido en la apertura (sl_initial presente) y no puede ampliarse.",
  "  Un SL reducido (acercado a la entrada) es aceptable. Si sl_modifications contiene entradas donde el SL se alejó de la entrada, es fail.",
  "R2 – El apalancamiento no es inversión: la operación debe cerrarse antes de las 72h (para futuros).",
  "  Objetivo concreto, no hold indefinido. Si la duración supera 72h, es fail.",
  "R3 – Sin ego: si la operación se cerró por SL (result < 0 y note contiene 'SL'),",
  "  no debe haberse reabierto el mismo activo en los siguientes 15 min (reopen_after_sl === false o ausente).",
  "R4 – Trailing estructural: si hay sl_modifications con más de 0 entradas,",
  "  los ajustes deben ir en la dirección correcta (acercando el SL a la entrada).",
  "  Long: SL debe subir con cada modificación. Short: SL debe bajar con cada modificación.",
  "  No penalices si no hay modificaciones.",
  "R5 – Tesis técnica: debe existir thesis_text con al menos 20 caracteres descriptivos.",
  "",
  "SALIDA — responde SOLO con JSON válido, sin markdown, sin explicaciones:",
  "{",
  "  \"score\": <0..5 entero>,",
  "  \"rules\": [",
  "    {\"id\":\"R1\",\"name\":\"SL es Ley\",\"status\":\"pass\"|\"fail\"|\"na\",\"evidence\":\"<frase corta>\"},",
  "    {\"id\":\"R2\",\"name\":\"Sin hold indefinido\",\"status\":\"pass\"|\"fail\"|\"na\",\"evidence\":\"<frase corta>\"},",
  "    {\"id\":\"R3\",\"name\":\"Sin ego\",\"status\":\"pass\"|\"fail\"|\"na\",\"evidence\":\"<frase corta>\"},",
  "    {\"id\":\"R4\",\"name\":\"Trailing estructural\",\"status\":\"pass\"|\"fail\"|\"na\",\"evidence\":\"<frase corta>\"},",
  "    {\"id\":\"R5\",\"name\":\"Tesis técnica\",\"status\":\"pass\"|\"fail\"|\"na\",\"evidence\":\"<frase corta>\"}",
  "  ],",
  "  \"summary\": \"<2-3 frases en español resumiendo el audit>\"",
  "}",
  "",
  "score = número de reglas con status \"pass\".",
  "Usa \"na\" cuando no hay datos suficientes para evaluar (no penaliza)."
].join("\n");

async function auditTrade(trade, marketContextAtOpen, missingFields){
  var apiKey="";
  try{ apiKey=localStorage.getItem("td-anthropic-key")||""; }catch(e){}
  if(!apiKey) return {error:"No hay API key configurada (ajustes → Anthropic key)"};

  var tradeJson="";
  try{ tradeJson=JSON.stringify(trade,null,2); }catch(e){ tradeJson=String(trade); }

  var contextSection="";
  if(marketContextAtOpen){
    try{ contextSection="\n\nCONTEXTO DE MERCADO EN APERTURA:\n"+JSON.stringify(marketContextAtOpen,null,2); }catch(e){}
  }

  var missingNote="";
  if(missingFields&&missingFields.enriched&&missingFields.enriched.length>0){
    missingNote="\n\nCAMPOS NO REGISTRADOS (operación anterior a la feature de auditoría): "+missingFields.enriched.join(", ")+
      ".\nPara cualquier regla cuya evaluación dependa de uno de estos campos, devuelve status \"na\" con evidence = \"Dato no registrado en el momento de la operación\". No la marques \"fail\" por falta de dato.";
  }

  var userMsg="Audita esta operación cerrada:\n\n"+tradeJson+contextSection+missingNote;

  var response;
  try{
    response=await fetch("https://api.anthropic.com/v1/messages",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "x-api-key":apiKey,
        "anthropic-version":"2023-06-01",
        "anthropic-dangerous-direct-browser-access":"true"
      },
      body:JSON.stringify({
        model:"claude-sonnet-4-6",
        max_tokens:1000,
        system:AUDIT_SYSTEM_PROMPT,
        messages:[{role:"user",content:userMsg}]
      })
    });
  }catch(e){
    return {error:"Network error: "+((e&&e.message)||String(e))};
  }

  if(!response.ok){
    var errData={};
    try{ errData=await response.json(); }catch(e){}
    return {error:"API "+response.status+((errData.error&&errData.error.message)?" — "+errData.error.message:"")};
  }

  var data={};
  try{ data=await response.json(); }catch(e){
    return {error:"Failed to parse API response"};
  }

  var raw=((data.content&&data.content[0]&&data.content[0].text)?data.content[0].text:"").trim();
  raw=raw.replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,"").trim();

  try{ return JSON.parse(raw); }catch(e){
    return {error:"JSON parse failed: "+raw.slice(0,120)};
  }
}

// - MAIN APP -
export default function App(){
  const[ready,setReady]=useState(false);
  const[sv,setSv]=useState("saved");
  const[pr,setPr]=useState({SOL:91.33,BTC:84000,ETH:2000,MSTR:300,GOOGL:170,LINK:9.20});
  const[fetchingPrices,setFetchingPrices]=useState(false);
  const[lastPriceTime,setLastPriceTime]=useState(null);

  // Obtener precios en tiempo real: Binance para crypto, Yahoo Finance para acciones/ETFs
  async function fetchPrices(){
    setFetchingPrices(true);
    const newPr={...D.current.pr};
    const openAssets=D.current.pos.map(function(p){return p.asset;});

    // Separar crypto (Binance) de acciones/ETFs (Yahoo Finance)
    const CRYPTO_BASE={"BTC":"BTCUSDT","ETH":"ETHUSDT","SOL":"SOLUSDT","LINK":"LINKUSDT","MARA":"MARAUSDT","RGTI":"RGTIUSDT","BNB":"BNBUSDT","ADA":"ADAUSDT","DOGE":"DOGEUSDT","AVAX":"AVAXUSDT","DOT":"DOTUSDT","MATIC":"MATICUSDT","POL":"POLUSDT","XRP":"XRPUSDT","LTC":"LTCUSDT","AAVE":"AAVEUSDT","UNI":"UNIUSDT","CRV":"CRVUSDT","SUSHI":"SUSHIUSDT","COMP":"COMPUSDT","SNX":"SNXUSDT","MKR":"MKRUSDT","ALGO":"ALGOUSDT","ATOM":"ATOMUSDT","FIL":"FILUSDT","ICP":"ICPUSDT","NEAR":"NEARUSDT","APT":"APTUSDT","ARB":"ARBUSDT","OP":"OPUSDT","SUI":"SUIUSDT","TIA":"TIAUSDT","INJ":"INJUSDT","JUP":"JUPUSDT","WIF":"WIFUSDT","PEPE":"PEPEUSDT","BONK":"BONKUSDT","FLOKI":"FLOKIUSDT","SEI":"SEIUSDT","RENDER":"RENDERUSDT","WLD":"WLDUSDT","FET":"FETUSDT","AGIX":"AGIXUSDT","BCH":"BCHUSDT","ETC":"ETCUSDT","DASH":"DASHUSDT","ZEC":"ZECUSDT","MANA":"MANAUSDT","SAND":"SANDUSDT","AXS":"AXSUSDT","ENJ":"ENJUSDT","CHZ":"CHZUSDT","URA":"URAUSDT","PENDLE":"PENDLEUSDT","EIGEN":"EIGENUSDT","ENA":"ENAUSDT","STRK":"STRKUSDT","ZK":"ZKUSDT","W":"WUSDT","BRETT":"BRETTUSDT","TAO":"TAOUSDT","PYTH":"PYTHUSDT","JTO":"JTOUSDT","ONDO":"ONDOUSDT","VIRTUALS":"VIRTUALSUSDT","AI16Z":"AI16ZUSDT"};
    const cryptoPairs=[];
    const stockSymbols=new Set();

    // ETH siempre (posicion legado)
    cryptoPairs.push({symbol:"ETHUSDT",key:"ETH"});

    openAssets.forEach(function(a){
      const base=a.replace(/\/.*$/,"").toUpperCase();
      // Es crypto si: está en CRYPTO_BASE, o si el activo tiene '/' (formato BASE/QUOTE), o termina en USDT/BTC/ETH
      var isCrypto=CRYPTO_BASE[base]||(a.indexOf("/")!==-1)||(/USDT$|BTC$|ETH$/i.test(a));
      if(isCrypto){
        if(!cryptoPairs.some(function(p){return p.key===base;})){
          var sym=CRYPTO_BASE[base]||(base+"USDT");
          cryptoPairs.push({symbol:sym,key:base});
        }
      }else{
        // Para tickers ambiguos (ej: ticker no en lista), intentar Binance primero
        stockSymbols.add(base);
        if(!cryptoPairs.some(function(p){return p.key===base;})){
          cryptoPairs.push({symbol:base+"USDT",key:base,tryOnly:true});
        }
      }
    });

    // FASE 1: Binance (crypto + tryOnly ambiguos) — esperar a que terminen antes de buscar acciones
    await Promise.all(
      cryptoPairs.map(async function(pair){
        try{
          const r=await fetch("https://api.binance.com/api/v3/ticker/price?symbol="+pair.symbol);
          if(r.ok){const d=await r.json();if(d.price){newPr[pair.key]=parseFloat(parseFloat(d.price).toFixed(2));if(pair.tryOnly)stockSymbols.delete(pair.key);}}
        }catch(e){}
      })
    );
    // FASE 2: Acciones y ETFs — solo los symbols que NO fueron resueltos por Binance en fase 1
    await Promise.all([...[...stockSymbols].map(async function(sym){
        var found=false;
        // Finnhub — fuente primaria para acciones/ETFs
        var fhKeyFP=localStorage.getItem("td-finnhub-key");
        if(fhKeyFP&&!found){
          try{
            var rfh=await fetch("https://finnhub.io/api/v1/quote?symbol="+sym+"&token="+fhKeyFP);
            if(rfh.ok){var dfh=await rfh.json();if(dfh.c&&dfh.c>0){newPr[sym]=parseFloat(dfh.c.toFixed(2));found=true;}}
          }catch(e){}
        }
        // Stooq CSV — sufijo .us para bolsa americana
        var stooqSuffixes=[".us",""];
        for(var s=0;s<stooqSuffixes.length&&!found;s++){
          try{
            var su="https://stooq.com/q/l/?s="+sym.toLowerCase()+stooqSuffixes[s]+"&f=sd2t2ohlcvn&e=csv";
            var rs=await fetch(su);
            if(!rs.ok)continue;
            var txt=await rs.text();
            var lines=txt.trim().split("\n");
            if(lines.length<2)continue;
            var fields=lines[1].split(",");
            var close=parseFloat(fields[6]);
            if(!isNaN(close)&&close>0){newPr[sym]=close;found=true;}
          }catch(e){}
        }
        // Fallback 1: Yahoo directo
        if(!found){
          var yahooUrls=[
            "https://query1.finance.yahoo.com/v8/finance/chart/"+sym+"?interval=1d&range=1d",
            "https://query2.finance.yahoo.com/v8/finance/chart/"+sym+"?interval=1d&range=1d",
          ];
          for(var y=0;y<yahooUrls.length&&!found;y++){
            try{
              var ry=await fetch(yahooUrls[y],{credentials:"omit"});
              if(!ry.ok)continue;
              var dy=await ry.json();
              var meta=dy.chart&&dy.chart.result&&dy.chart.result[0]&&dy.chart.result[0].meta;
              if(meta&&meta.regularMarketPrice){newPr[sym]=parseFloat(meta.regularMarketPrice.toFixed(2));found=true;}
            }catch(e){}
          }
        }
        // Fallback 2: allorigins proxy (evita CORS cuando Yahoo bloquea)
        if(!found){
          try{
            var proxyUrl="https://api.allorigins.win/get?url="+encodeURIComponent("https://query1.finance.yahoo.com/v8/finance/chart/"+sym+"?interval=1d&range=1d");
            var rp=await fetch(proxyUrl);
            if(rp.ok){
              var dp=await rp.json();
              var inner=typeof dp.contents==="string"?JSON.parse(dp.contents):dp.contents;
              var pmeta=inner&&inner.chart&&inner.chart.result&&inner.chart.result[0]&&inner.chart.result[0].meta;
              if(pmeta&&pmeta.regularMarketPrice){newPr[sym]=parseFloat(pmeta.regularMarketPrice.toFixed(2));found=true;}
            }
          }catch(e){}
        }
      })]
    ]);

    D.current.pr=newPr;
    setPr(newPr);
    SPr(newPr);
    autoCheckPositions(newPr);
    checkProximityAlerts(newPr);
    setLastPriceTime(new Date().toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"}));
    setFetchingPrices(false);
  }
  const[pos,setPos]=useState(P0);
  const[pats,setPats]=useState(PAT0);
  const[jnl,setJnl]=useState(J0);
  const[ps,setPs]=useState(PS0);

  // Closes via la app - se anaden cuando cierras una posicion con el boton CERRAR
  // QUANTFURY_BASE = P&L total de las 246 ops del PDF (23/03/2026). Ops recientes cerradas via app van a xhist.
  const XHIST_DEFAULT=[];
  const[xhist,setXhist]=useState(XHIST_DEFAULT);
  const[ethClosed,setEthClosed]=useState(false);
    const[aiProfile,setAiProfile]=useState(function(){
    try{const s=localStorage.getItem("td-ai-profile");return s?JSON.parse(s):null;}catch(e){return null;}
  });
  const[aiProfileLoading,setAiProfileLoading]=useState(false);
  const[aiProfileExpanded,setAiProfileExpanded]=useState(false);
  // fotos eliminadas - se usan URLs externas
  const[tab,setTab]=useState("Resumen");
  const[modal,setModal]=useState({});
  const[pwaInstallable,setPwaInstallable]=useState(typeof window!=="undefined"&&!!window._pwaPrompt);
  const[pwaInstalled,setPwaInstalled]=useState(false);
  useEffect(function(){
    function onInstallable(){setPwaInstallable(true);}
    function onInstalled(){setPwaInstallable(false);setPwaInstalled(true);}
    window.addEventListener("pwa-installable",onInstallable);
    window.addEventListener("pwa-installed",onInstalled);
    return function(){window.removeEventListener("pwa-installable",onInstallable);window.removeEventListener("pwa-installed",onInstalled);};
  },[]);
  const[hSearch,setHSearch]=useState("");
  const[hFilter,setHFilter]=useState("all");
  const[hSort,setHSort]=useState("desc");
  const[hSource,setHSource]=useState("all"); // all | quantfury | sistema
  const[showManualTrade,setShowManualTrade]=useState(false);
  const[manualForm,setManualForm]=useState({asset:"",dir:"Long",capital:"",entry:"",close:"",note:"",date:""});
  const[predictions,setPredictions]=useState(function(){
    try{var s=localStorage.getItem("td-predictions");if(s)return JSON.parse(s);}catch(e){}
    return[];
  });
  const[qfTrades,setQfTrades]=useState(function(){
    try{var s=localStorage.getItem("td-qf-trades");if(s)return JSON.parse(s);}catch(e){}
    return[];
  });
  const[qfOpen,setQfOpen]=useState(function(){
    try{var s=localStorage.getItem("td-qf-open");if(s)return JSON.parse(s);}catch(e){}
    return[];
  });
  const[qfMeta,setQfMeta]=useState(function(){
    try{var s=localStorage.getItem("td-qf-meta");if(s)return JSON.parse(s);}catch(e){}
    return null;
  });

  // ── Deep link handler: read ?tab=N on load + listen to SW postMessage ──
  useEffect(function(){
    function applyDeepLinkFromUrl(href){
      try{
        var u=new URL(href||window.location.href,window.location.origin);
        var tabIdx=u.searchParams.get("tab");
        if(tabIdx!==null&&!isNaN(parseInt(tabIdx,10))){
          var idx=parseInt(tabIdx,10);
          if(idx>=0&&idx<TABS.length)setTab(TABS[idx]);
        }
        var action=u.searchParams.get("action");
        if(action==="open_trade"){
          try{localStorage.setItem("td-pending-trade-action",JSON.stringify({action:"open_trade",ts:Date.now()}));}catch(e){}
        }
      }catch(e){}
    }
    applyDeepLinkFromUrl(window.location.href);
    function onSwMsg(ev){
      if(!ev||!ev.data)return;
      if(ev.data.type==="deep-link"&&ev.data.url)applyDeepLinkFromUrl(ev.data.url);
      if(ev.data.type==="pushsubscriptionchange"){
        try{console.warn("Push subscription expired — re-subscribe required");}catch(e){}
      }
    }
    if("serviceWorker" in navigator){
      navigator.serviceWorker.addEventListener("message",onSwMsg);
    }
    return function(){
      if("serviceWorker" in navigator)navigator.serviceWorker.removeEventListener("message",onSwMsg);
    };
  },[]);

  // D ref always has latest state for storage writes
  const D=useRef({pr:{SOL:91.33,BTC:84000,ETH:2000,MSTR:300,GOOGL:170,LINK:9.20},pos:P0,pats:PAT0,jnl:J0,ps:PS0,
    xhist:[],ethClosed:false,predictions:[],chatMsgs:[]});
  const tmr=useRef(null);
  const proximityRef=useRef({});

  // - LOAD -
  useEffect(()=>{
    (async()=>{
      let rawData=null;
      // 1. Cargar desde Supabase y localStorage, usar el más reciente (_savedAt)
      const cfg=window.SUPABASE_CFG;
      let supabaseRaw=null;
      if(cfg&&cfg.url&&cfg.key){
        try{
          const res=await fetch(cfg.url+"/rest/v1/trading_data?user_id=eq.miguel&select=data",{
            headers:{"apikey":cfg.key,"Authorization":"Bearer "+cfg.key}
          });
          if(res.ok){
            const rows=await res.json();
            if(rows&&rows.length>0)supabaseRaw=JSON.stringify(rows[0].data);
          }
        }catch(e){console.warn("Supabase load failed, using localStorage");}
      }
      var localRaw=localStorage.getItem("td-user");
      // Comparar timestamps y usar la fuente más reciente
      if(supabaseRaw&&localRaw){
        try{
          var sTs=(JSON.parse(supabaseRaw)._savedAt)||0;
          var lTs=(JSON.parse(localRaw)._savedAt)||0;
          rawData=lTs>sTs?localRaw:supabaseRaw;
        }catch(e){rawData=supabaseRaw||localRaw;}
      }else{
        rawData=supabaseRaw||localRaw;
      }
      try{
        if(rawData){
          const d=JSON.parse(rawData);
          if(d.pr){D.current.pr=d.pr;setPr(d.pr);}
          if(d.pos&&d.pos.length){D.current.pos=d.pos;setPos(d.pos);}
          if(d.pats&&d.pats.length){D.current.pats=d.pats;setPats(d.pats);}
          if(d.jnl&&d.jnl.length){D.current.jnl=d.jnl;setJnl(d.jnl);}
          if(d.ps){
            var psLoaded=d.ps;
            // Recalcular ratioSum/ratioCount/tpStreak/tpAuto desde xhist para garantizar consistencia
            if(d.xhist&&d.xhist.length){
              var xh=d.xhist;
              var rSum=0,rCnt=0,tpA=0,streak=0,bestStreak=psLoaded.bestTpStreak||0;
              for(var xi=0;xi<xh.length;xi++){
                var xe=xh[xi];
                if(xe.autoClose&&xe.result>0&&(xe.note||"").indexOf("🎯")===0){
                  tpA++;
                  if(xe.ratio!=null){rSum+=xe.ratio;rCnt++;}
                  if(xi===streak)streak++;
                }
              }
              // Recalcular racha (consecutivos desde el más reciente)
              var computedStreak=0;
              for(var si2=0;si2<xh.length;si2++){
                var se2=xh[si2];
                if(se2.autoClose&&se2.result>0&&(se2.note||"").indexOf("🎯")===0){computedStreak++;}else{break;}
              }
              if(computedStreak>bestStreak)bestStreak=computedStreak;
              psLoaded=Object.assign({},psLoaded,{ratioSum:parseFloat(rSum.toFixed(4)),ratioCount:rCnt,tpAuto:tpA,tpStreak:computedStreak,bestTpStreak:bestStreak});
            }
            D.current.ps=psLoaded;setPs(psLoaded);
          }

          if(d.xhist){D.current.xhist=d.xhist;setXhist(d.xhist);}
          if(d.predictions){
            // Deduplicar al cargar: quedarse con la primera aparición por contenido+status
            var seenPred={};
            var dedupPred=d.predictions.filter(function(p){
              var k=(typeof p.content==="string"?p.content.trim().slice(0,120):String(p.id))+"__"+p.status;
              if(seenPred[k])return false;
              seenPred[k]=true;return true;
            });
            D.current.predictions=dedupPred;setPredictions(dedupPred);
          }
          if(d.chatMsgs&&d.chatMsgs.length){D.current.chatMsgs=d.chatMsgs;}
          if(d.ethClosed)setEthClosed(true);
          // carga de fotos eliminada
        }
      }catch(e){console.warn("Load error:",e);}
      setReady(true);
      // Auto-fetch precios al cargar
      setTimeout(fetchPrices, 800);
    })();
  },[]);

  // Auto-refresh de precios cada 60 segundos
  useEffect(function(){
    var iv=setInterval(fetchPrices,60000);
    return function(){clearInterval(iv);};
  },[]);

  // ── Polling de feedback Telegram (nivel App — siempre activo, cualquier pestaña) ──
  useEffect(function(){
    function appPollTgFeedback(){
      var tk=localStorage.getItem("td-tg-token");
      var cid=localStorage.getItem("td-tg-chatid");
      if(!tk||!cid)return;
      var offset=0;
      try{offset=parseInt(localStorage.getItem("td-tg-offset")||"0",10);}catch(e){}
      fetch("https://api.telegram.org/bot"+tk+"/getUpdates?offset="+offset+"&timeout=0&limit=20")
        .then(function(r){return r.json();})
        .then(function(data){
          if(!data.ok||!data.result||!data.result.length)return;
          var fb={};try{fb=JSON.parse(localStorage.getItem("td-pattern-fb")||"{}");}catch(e){}
          var answered={};try{answered=JSON.parse(localStorage.getItem("td-tg-answered")||"{}");}catch(e){}
          var maxId=offset-1;
          var changed=false;
          data.result.forEach(function(upd){
            if(upd.update_id>maxId)maxId=upd.update_id;
            if(!upd.callback_query)return;
            var cbq=upd.callback_query;
            var msgId=cbq.message&&cbq.message.message_id;
            if(msgId&&answered[msgId])return;
            var d=cbq.data||"";
            if(d.indexOf("fb_")!==0)return;
            var rest=d.slice(3);
            var sepIdx=rest.indexOf("_");
            if(sepIdx<0)return;
            var verdict=rest.slice(0,sepIdx);
            var patType=rest.slice(sepIdx+1);
            if(!fb[patType])fb[patType]={total:0,correct:0,wrong:0};
            fb[patType].total=(fb[patType].total||0)+1;
            if(verdict==="correct")fb[patType].correct=(fb[patType].correct||0)+1;
            else fb[patType].wrong=(fb[patType].wrong||0)+1;
            if(msgId)answered[msgId]=true;
            changed=true;
            // Confirmar al usuario + quitar botones editando el mensaje
            fetch("https://api.telegram.org/bot"+tk+"/answerCallbackQuery",{
              method:"POST",headers:{"Content-Type":"application/json"},
              body:JSON.stringify({callback_query_id:cbq.id,
                text:verdict==="correct"?"✅ Registrado: señal correcta":"❌ Registrado: falsa señal",show_alert:true})
            }).catch(function(){});
            if(msgId&&cbq.message&&cbq.message.chat){
              var resultLine=verdict==="correct"?"\n\n✅ CONFIRMADO: señal correcta":"\n\n❌ CONFIRMADO: falsa señal";
              fetch("https://api.telegram.org/bot"+tk+"/editMessageText",{
                method:"POST",headers:{"Content-Type":"application/json"},
                body:JSON.stringify({chat_id:cbq.message.chat.id,message_id:msgId,text:(cbq.message.text||"")+resultLine})
              }).catch(function(){});
            }
          });
          if(changed){
            localStorage.setItem("td-pattern-fb",JSON.stringify(fb));
            localStorage.setItem("td-tg-answered",JSON.stringify(answered));
          }
          localStorage.setItem("td-tg-offset",String(maxId+1));
          localStorage.setItem("td-tg-last-poll",String(Date.now()));
        }).catch(function(){});
    }
    appPollTgFeedback();
    var iv2=setInterval(appPollTgFeedback,15000);
    return function(){clearInterval(iv2);};
  },[]);

  // ── Monitor de predicciones: evalúa con Claude y envía Telegram si hay cambios ──
  const monitorCheckRef=useRef({}); // {predId: lastCheckTimestamp}
  // Cargar checks previos desde localStorage para sobrevivir recargas
  useEffect(function(){
    try{var saved=JSON.parse(localStorage.getItem("td-monitor-checks")||"{}");monitorCheckRef.current=saved;}catch(e){}
  },[]);
  useEffect(function(){
    var iv=setInterval(async function(){
      var apiKey=localStorage.getItem("td-anthropic-key");
      var tgToken=localStorage.getItem("td-tg-token");
      var tgChatId=localStorage.getItem("td-tg-chatid");
      if(!apiKey||!tgToken||!tgChatId)return;
      var pending=(D.current.predictions||[]).filter(function(p){return p.status==="pending"&&p.asset;});
      if(!pending.length)return;
      // Intervalo mínimo entre checks por timeframe
      var tfMs={"1h":3600000,"4h":14400000,"1d":28800000,"1w":86400000};
      for(var i=0;i<pending.length;i++){
        var pred=pending[i];
        var minMs=tfMs[pred.tf]||14400000;
        var lastCheck=monitorCheckRef.current[pred.id]||0;
        if(Date.now()-lastCheck<minMs)continue;
        monitorCheckRef.current[pred.id]=Date.now();
        try{localStorage.setItem("td-monitor-checks",JSON.stringify(monitorCheckRef.current));}catch(e){}
        try{
          // Detectar si es crypto (Binance) o acción (skip sin Finnhub)
          var sym=pred.asset.replace("/","").toUpperCase();
          if(!/USDT$/i.test(sym))sym=sym+"USDT";
          var isBinance=/USDT$/i.test(sym);
          if(!isBinance)continue; // acciones: requiere Finnhub, omitir por ahora
          var tf=pred.tf||"1d";
          var klResp=await fetch("https://api.binance.com/api/v3/klines?symbol="+sym+"&interval="+tf+"&limit=60");
          if(!klResp.ok)continue;
          var klines=await klResp.json();
          if(!klines||!klines.length)continue;
          var closes=klines.map(function(k){return parseFloat(k[4]);});
          var rsi=calcRSI(closes,14);
          var ema7=calcEMA(closes,7);
          var ema25=calcEMA(closes,25);
          var ema50=calcEMA(closes,50);
          var price=closes[closes.length-1];
          var ohlcSnap=klines.map(function(k){return{o:parseFloat(k[1]),h:parseFloat(k[2]),l:parseFloat(k[3]),c:parseFloat(k[4])};});
          var rsiSeries=calcRSISeries(closes,14);
          var divResult=detectRSIDivergence(ohlcSnap,rsiSeries.slice(-30));
          var divText=divResult?"Divergencia RSI "+divResult.type+" detectada":"Sin divergencia RSI";
          var emaRel=ema7&&ema25?(ema7>ema25?"EMA7 > EMA25 (alcista)":"EMA7 < EMA25 (bajista)"):"";
          var marketCtx=pred.asset.toUpperCase()+" "+tf.toUpperCase()+"\n"+
            "Precio actual: $"+price.toLocaleString("es-ES",{maximumFractionDigits:2})+"\n"+
            "RSI(14): "+(rsi?rsi.toFixed(1):"N/A")+"\n"+
            (ema7?"EMA7: "+ema7.toFixed(2)+"\n":"")+
            (ema25?"EMA25: "+ema25.toFixed(2)+"\n":"")+
            (ema50?"EMA50: "+ema50.toFixed(2)+"\n":"")+
            emaRel+"\n"+divText;
          var monPrompt="Eres un asistente de seguimiento de predicciones de trading.\n\n"+
            "PREDICCIÓN GUARDADA"+(pred.note?" ("+pred.note+")":"")+
            ":\n"+pred.content.slice(0,800)+"\n\n"+
            "DATOS REALES AHORA:\n"+marketCtx+"\n\n"+
            "Evalúa si ha ocurrido algo significativo respecto a la predicción original: "+
            "confirmación de patrones, niveles clave alcanzados, invalidación de la tesis, cambios en RSI o EMAs relevantes.\n"+
            "IMPORTANTE: Solo responde ALERTA si hay algo concreto y nuevo que el trader debe saber. "+
            "Si el mercado está quieto o sin cambios relevantes responde solo: NADA\n"+
            "Formato si hay alerta: ALERTA: [2-3 frases directas en español, sin markdown]";
          var aiResp=await fetch("https://api.anthropic.com/v1/messages",{
            method:"POST",
            headers:{"Content-Type":"application/json","x-api-key":apiKey,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},
            body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:220,messages:[{role:"user",content:monPrompt}]})
          });
          if(!aiResp.ok)continue;
          var aiData=await aiResp.json();
          var aiText=(aiData.content&&aiData.content[0])?aiData.content[0].text.trim():"";
          if(aiText.startsWith("ALERTA:")){
            var alertBody=aiText.slice(7).trim();
            var tgText="📊 Seguimiento "+pred.asset.toUpperCase()+" "+tf.toUpperCase()+"\n\n";
            if(pred.userQuery){tgText+="💬 Tu análisis:\n\""+pred.userQuery.slice(0,200)+(pred.userQuery.length>200?"…":"")+"\"\n\n";}
            tgText+="🤖 Update:\n"+alertBody;
            if(pred.note){tgText+="\n\n📌 "+pred.note;}
            var tgBase="https://api.telegram.org/bot"+tgToken+"/";
            if(pred.userImage&&pred.userImage.base64){
              // Enviar como foto con el texto como caption
              try{
                var binary=atob(pred.userImage.base64);
                var bytes=new Uint8Array(binary.length);
                for(var bi=0;bi<binary.length;bi++){bytes[bi]=binary.charCodeAt(bi);}
                var blob=new Blob([bytes],{type:pred.userImage.mediaType||"image/jpeg"});
                var fd=new FormData();
                fd.append("chat_id",tgChatId);
                fd.append("caption",tgText.slice(0,1024)); // Telegram caption limit
                fd.append("photo",blob,"chart.jpg");
                fetch(tgBase+"sendPhoto",{method:"POST",body:fd}).catch(function(){});
              }catch(imgErr){
                // Fallback a texto si falla la imagen
                fetch(tgBase+"sendMessage",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:tgChatId,text:tgText})}).catch(function(){});
              }
            }else{
              fetch(tgBase+"sendMessage",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:tgChatId,text:tgText})}).catch(function(){});
            }
          }
        }catch(e){console.warn("Monitor predicción error:",pred.asset,e);}
      }
    },120000); // revisa cada 2 minutos; el cooldown por tf evita spam
    return function(){clearInterval(iv);};
  },[]);

  // ─── INFORME QUINCENAL DE PRECISIÓN DE SEÑALES ───
  useEffect(function(){
    var TWO_WEEKS=14*24*60*60*1000;
    var iv2=setInterval(function(){
      var tk=localStorage.getItem("td-tg-token");
      var cid=localStorage.getItem("td-tg-chatid");
      if(!tk||!cid)return;
      var lastReport=parseInt(localStorage.getItem("td-pattern-fb-last-report")||"0");
      if(Date.now()-lastReport<TWO_WEEKS)return;
      var fbAll={};
      try{fbAll=JSON.parse(localStorage.getItem("td-pattern-fb")||"{}");}catch(e){}
      var types=Object.keys(fbAll).filter(function(t){return fbAll[t].total>0;});
      if(!types.length)return;
      var LABELS={
        rsi_oversold:"📉 RSI Sobreventa",rsi_overbought:"📈 RSI Sobrecompra",
        rsi_custom:"🎯 RSI Personalizado",
        golden:"🌟 Cruce Dorado EMA 7/25",death:"💀 Cruce Muerte EMA 7/25",
        ema200_golden:"🌟 Cruce Dorado EMA 50/200",ema200_death:"💀 Cruce Muerte EMA 50/200",
        rsi_div_bull:"🟢 Divergencia Alcista RSI",rsi_div_bear:"🔴 Divergencia Bajista RSI",
        rsi_conv_bull:"📈 Convergencia Alcista RSI",rsi_conv_bear:"📉 Convergencia Bajista RSI",
        rsi_hdiv_bull:"🟩 Div. Oculta Alcista RSI",rsi_hdiv_bear:"🟥 Div. Oculta Bajista RSI",
        canal_bajista_ruptura_alcista:"📐 Canal Bajista — Ruptura Alcista",
        canal_bajista_ruptura_bajista:"📐 Canal Bajista — Ruptura Bajista",
        canal_alcista_ruptura_alcista:"📐 Canal Alcista — Ruptura Alcista",
        canal_alcista_ruptura_bajista:"📐 Canal Alcista — Ruptura Bajista",
        canal_bajista_retest_bull:"🎯 Canal Bajista — Retesteo Alcista",
        canal_bajista_retest_bear:"🎯 Canal Bajista — Retesteo Bajista",
        canal_alcista_retest_bull:"🎯 Canal Alcista — Retesteo Alcista",
        canal_alcista_retest_bear:"🎯 Canal Alcista — Retesteo Bajista",
        patron_fvg:"⚡ Precio en FVG",patron_combo:"🔥 Patrón Combinado"
      };
      var totalCorr=0,totalAll=0;
      var lines=types.sort(function(a,b){return fbAll[b].total-fbAll[a].total;}).map(function(t){
        var s=fbAll[t];
        var pct=Math.round(s.correct/(s.total||1)*100);
        var icon=pct>=70?"✅":pct>=50?"⚠️":"❌";
        totalCorr+=s.correct;totalAll+=s.total;
        return (LABELS[t]||t)+": "+pct+"% "+icon+" ("+s.correct+"/"+s.total+")";
      });
      var globalPct=totalAll>0?Math.round(totalCorr/totalAll*100):0;
      var now2=new Date();
      var from2=new Date(lastReport||Date.now()-TWO_WEEKS);
      var dateRange=from2.toLocaleDateString("es-ES")+" — "+now2.toLocaleDateString("es-ES");
      var msg="📊 INFORME QUINCENAL — Precisión de Señales\n"+
        "📅 "+dateRange+"\n\n"+
        lines.join("\n")+"\n\n"+
        "━━━━━━━━━━━━━━━━\n"+
        "🎯 Global: "+globalPct+"% ("+totalCorr+"/"+totalAll+" señales)\n"+
        (globalPct>=70?"✅ Buen rendimiento — señales fiables":"⚠️ Revisar configuración — demasiadas falsas señales");
      fetch("https://api.telegram.org/bot"+tk+"/sendMessage",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({chat_id:cid,text:msg})
      }).then(function(r){
        if(r.ok)localStorage.setItem("td-pattern-fb-last-report",String(Date.now()));
      }).catch(function(){});
    },3600000); // Revisa cada hora si toca enviar
    return function(){clearInterval(iv2);};
  },[]);

  // - SAVE -
  // saveRef always holds latest doSave - avoids stale closure
  const saveRef=useRef(null);
  saveRef.current=async function doSave(){
    const payload={
      pr:D.current.pr,pos:D.current.pos,pats:D.current.pats,
      jnl:D.current.jnl,ps:D.current.ps,
      xhist:D.current.xhist||[],
      ethClosed:D.current.ethClosed||false,
      predictions:D.current.predictions||[],
      chatMsgs:D.current.chatMsgs||[],
      _savedAt:Date.now()
    };
    const json=JSON.stringify(payload);
    // 1. Guardar siempre en localStorage (offline backup)
    try{localStorage.setItem("td-user",json);}catch(e){}
    // 2. Si hay Supabase configurado, sincronizar en la nube
    const cfg=window.SUPABASE_CFG;
    if(cfg&&cfg.url&&cfg.key){
      try{
        await fetch(cfg.url+"/rest/v1/trading_data",{
          method:"POST",
          headers:{
            "apikey":cfg.key,
            "Authorization":"Bearer "+cfg.key,
            "Content-Type":"application/json",
            "Prefer":"resolution=merge-duplicates"
          },
          body:JSON.stringify({user_id:"miguel",data:payload})
        });
      }catch(e){console.warn("Supabase sync failed:",e.message);}
    }
    setSv("saved");
  };

  const save=useCallback(()=>{
    if(tmr.current)clearTimeout(tmr.current);
    tmr.current=setTimeout(()=>{
      setSv("saving");
      saveRef.current();
    },600);
  },[]);

  // - SETTERS (sync D ref then React state) -
  const SP=v=>{D.current.pats=v;setPats(v);save();};
  const SPos=v=>{D.current.pos=v;setPos(v);try{localStorage.setItem("td-user",JSON.stringify({pr:D.current.pr,pos:v,pats:D.current.pats,jnl:D.current.jnl,ps:D.current.ps,xhist:D.current.xhist||[],ethClosed:D.current.ethClosed||false,_savedAt:Date.now()}));}catch(e){}save();};
  const SJ=v=>{D.current.jnl=v;setJnl(v);save();};
  const SPs=v=>{D.current.ps=v;setPs(v);save();};
  const SPr=v=>{D.current.pr=v;setPr(v);save();};

  const SX=v=>{D.current.xhist=v;setXhist(v);save();};
  const SPred=function(v){D.current.predictions=v;setPredictions(v);try{localStorage.setItem("td-predictions",JSON.stringify(v));}catch(e){}save();};
  async function generateAIProfile(){
    const key=localStorage.getItem("td-anthropic-key")||"";
    if(!key){alert("Configura tu clave API de Anthropic en el Chat (boton 🔑) primero.");return;}
    setAiProfileLoading(true);
    // Clear old report before generating new one — never accumulate old analyses
    setAiProfile(null);
    localStorage.removeItem("td-ai-profile");
    const allH=[...xhist,...hist];
    const wins=allH.filter(function(h){return h.result>0;}).length;
    const losses=allH.filter(function(h){return h.result<0;}).length;
    const totalPnl=allH.reduce(function(s,h){return s+h.result;},0).toFixed(2);
    const winRate=allH.length>0?Math.round(wins/allH.length*100):0;
    const slTotal=(ps.slOk||0)+(ps.slBroken||0)+(ps.slBreakeven||0);
    const slRate=slTotal>0?Math.round(((ps.slOk||0)+(ps.slBreakeven||0)*0.5)/slTotal*100):100;
    const recentTrades=allH.slice(-10).map(function(h){
      return h.asset+" "+(h.result>0?"+":"")+h.result.toFixed(0)+"$";
    }).join(", ");
    const assetStats={};
    allH.forEach(function(h){
      if(!assetStats[h.asset])assetStats[h.asset]={w:0,l:0,pnl:0,n:0};
      if(h.result>0)assetStats[h.asset].w++;else assetStats[h.asset].l++;
      assetStats[h.asset].pnl+=h.result;assetStats[h.asset].n++;
    });
    const assetSummary=Object.keys(assetStats).map(function(a){
      return a+": "+assetStats[a].n+" ops, P&L $"+assetStats[a].pnl.toFixed(0);
    }).join(" | ");
    const jnlTypes=["win","lesson","analysis","mistake"].map(function(t){
      return t+": "+jnl.filter(function(j){return j.type===t;}).length;
    }).join(", ");
    const bestPat=pats.filter(function(p){return p.obs>=100;}).sort(function(a,b){return(b.conf/b.obs)-(a.conf/a.obs);})[0];

    // Analisis de cierres y sus descripciones
    const totClose=(ps.tpAuto||0)+(ps.tpManual||0)+(ps.earlyClose||0)+(ps.manualClose||0);
    const tpPct=totClose>0?Math.round(((ps.tpAuto||0)+(ps.tpManual||0))/totClose*100):0;
    const earlyPct=totClose>0?Math.round((ps.earlyClose||0)/totClose*100):0;
    // Entradas del diario vinculadas a cierres reales
    const closeDocs=jnl.filter(function(j){return j.linkedClose;});
    // Solo las operaciones cerradas MANUALMENTE tienen la oportunidad de documentarse
    // (las auto-cierres no muestran el modal de reflexión post-cierre)
    const manualXhist=xhist.filter(function(h){return !h.autoClose;});
    const manualClosesTotal=manualXhist.length; // solo app-closes manuales
    const closeDocRate=manualClosesTotal>0?Math.round(closeDocs.length/manualClosesTotal*100):0;
    const tpDocs=jnl.filter(function(j){return j.linkedClose==="tp";});
    const slDocs=jnl.filter(function(j){return j.linkedClose==="sl";});
    const manualDocs=jnl.filter(function(j){return j.linkedClose==="manual";});
    // Resumen emocional por tipo de cierre
    function closeEmoSummary(docs){
      if(!docs.length)return "sin documentar";
      const byType={win:0,lesson:0,analysis:0,mistake:0};
      docs.forEach(function(d){if(byType[d.type]!==undefined)byType[d.type]++;});
      return Object.keys(byType).filter(function(k){return byType[k]>0;}).map(function(k){return k+":"+byType[k];}).join(", ");
    }
    // Ultimas 5 descripciones de cierre (texto real escrito por el trader)
    const recentCloseDocs=closeDocs.slice(0,5).map(function(j){
      const ct=j.linkedClose==="tp"?"TP":j.linkedClose==="sl"?"SL":"Manual";
      return "["+ct+"] "+j.type.toUpperCase()+": "+j.text.slice(0,100);
    }).join("\n");
    // Ultimos 8 xhist con nota
    const recentXhist=xhist.slice(0,8).map(function(h){
      return h.asset+" "+(h.result>0?"+":"")+h.result.toFixed(0)+"$ ("+h.note+") "+h.date;
    }).join(" | ");

    // Rasgos psicológicos acumulados desde conversaciones de chat
    var learnedTraits=[];
    try{learnedTraits=JSON.parse(localStorage.getItem("td-ai-profile-traits")||"[]");}catch(e){}
    var traitsSection=learnedTraits.length>0
      ?"=== RASGOS PSICOLOGICOS DETECTADOS EN CONVERSACIONES ===\n"+
        learnedTraits.slice(-20).map(function(t){return "• "+t;}).join("\n")+"\n\n"
      :"";
    // Opiniones y creencias aprendidas del trader
    var learnedOpinions=[];
    try{learnedOpinions=JSON.parse(localStorage.getItem("td-chat-memory")||"[]");}catch(e){}
    var opinionsSection=learnedOpinions.length>0
      ?"=== OPINIONES Y FILOSOFIA DEL TRADER (sesiones anteriores) ===\n"+
        learnedOpinions.slice(-15).map(function(o){return "["+o.date+"] "+o.opinion;}).join("\n")+"\n\n"
      :"";
    const prompt="Eres coach de trading. Analiza el perfil completo de este trader y genera un informe detallado en espanol.\n\n"+
      traitsSection+opinionsSection+
      "DATOS DEL TRADER (Miguel Garcia Parrado, Quantfury desde nov 2024):\n"+
      "Nivel score: "+sc+"/100\n"+
      "Total operaciones: "+allH.length+" | Ganadoras: "+wins+" | Perdedoras: "+losses+" | Tasa exito: "+winRate+"%\n"+
      "P&L total acumulado: $"+totalPnl+"\n"+
      "Disciplina SL: "+ps.slOk+" respetados / "+slTotal+" totales ("+slRate+"% disciplina)\n"+
      "Trading revancha: "+(ps.revenge||0)+" veces\n\n"+
      "=== PATRON DE CIERRES ===\n"+
      "Total cierres registrados: "+totClose+"\n"+
      "TP alcanzados: "+((ps.tpAuto||0)+(ps.tpManual||0))+" ("+tpPct+"%) | Cierres prematuros: "+(ps.earlyClose||0)+" ("+earlyPct+"%)\n"+
      "Cierres documentados en diario: "+closeDocs.length+"/"+manualClosesTotal+" cierres manuales ("+closeDocRate+"%) — los auto-cierres no se contabilizan\n"+
      "Emociones al cerrar en TP: "+closeEmoSummary(tpDocs)+"\n"+
      "Emociones al activarse SL: "+closeEmoSummary(slDocs)+"\n"+
      "Emociones en cierres manuales: "+closeEmoSummary(manualDocs)+"\n"+
      (recentCloseDocs?"Ultimas descripciones de cierre:\n"+recentCloseDocs+"\n":"")+
      (recentXhist?"\nHistorial reciente de cierres via app: "+recentXhist+"\n":"")+"\n"+
      "=== RESTO DEL PERFIL ===\n"+
      "Ultimas 10 operaciones: "+recentTrades+"\n"+
      "Por activo: "+assetSummary+"\n"+
      "Diario psicologico: "+jnlTypes+" ("+jnl.length+" entradas totales)\n"+
      "Mejor patron: "+(bestPat?bestPat.name+" "+Math.round(bestPat.conf/bestPat.obs*100)+"% exito":"sin datos")+"\n"+
      "Posiciones abiertas: "+pos.map(function(p){return p.asset+" "+p.dir+" entrada $"+p.entry;}).join(", ")+"\n\n"+
      "GENERA UN INFORME con estas secciones exactas (usa los rasgos y opiniones aprendidos para personalizar el analisis — no repitas lo que ya sabe, conecta patrones entre conversaciones y datos):\n"+
      "## RESUMEN EJECUTIVO\n(2-3 frases sobre el estado actual del trader)\n\n"+
      "## PUNTOS FUERTES\n(lista de 3-4 puntos, con datos concretos de cierres y trading)\n\n"+
      "## PUNTOS DEBILES\n(lista de 3-4 puntos, analiza el patron de cierres prematuros, emociones, descripciones)\n\n"+
      "## PATRON PSICOLOGICO EN CIERRES\n(analisis de como cierra las operaciones, que revelan sus descripciones sobre su mentalidad)\n\n"+
      "## RECOMENDACIONES PRIORITARIAS\n(lista de 3 acciones concretas para los proximos 30 dias)\n\n"+
      "Se directo, usa datos reales del perfil, max 450 palabras total.";
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "x-api-key":key,
          "anthropic-version":"2023-06-01",
          "anthropic-dangerous-direct-browser-access":"true"
        },
        body:JSON.stringify({
          model:"claude-haiku-4-5-20251001",
          max_tokens:1200,
          messages:[{role:"user",content:prompt}]
        })
      });
      if(!r.ok){const e=await r.json().catch(function(){return{};});throw new Error("API "+r.status+(e.error?" — "+e.error.message:""));}
      const d=await r.json();
      const analysis={text:d.content[0].text,date:new Date().toLocaleDateString("es-ES"),score:sc};
      setAiProfile(analysis);setAiProfileExpanded(true);
      localStorage.setItem("td-ai-profile",JSON.stringify(analysis));
    }catch(e){
      alert("Error generando analisis: "+e.message);
    }
    setAiProfileLoading(false);
  }

  // - COMPUTED -
  const PM=(function(){
    var m={"BTC/USD":pr.BTC,"BTC/USDT":pr.BTC,"ETH/USDT":pr.ETH,"ETH/USD":pr.ETH,"SOL/USD":pr.SOL,"SOL/USDT":pr.SOL,"LINK/USD":pr.LINK||9.20,"LINK/USDT":pr.LINK||9.20,"MSTR":pr.MSTR,"GOOGL":pr.GOOGL,"GOOGL/USD":pr.GOOGL};
    // Incluir dinamicamente cualquier activo en pr (acciones, ETFs como TLT, etc.)
    Object.keys(pr).forEach(function(k){
      if(!m[k])m[k]=pr[k];
      // Tambien mapear variantes con /USD y /USDT
      if(!m[k+"/USD"])m[k+"/USD"]=pr[k];
      if(!m[k+"/USDT"])m[k+"/USDT"]=pr[k];
    });
    return m;
  })();
  const getPnL=p=>{const c=PM[p.asset]||p.entry;const r=p.dir==="Short"?(p.entry-c)/p.entry:(c-p.entry)/p.entry;return p.capital*r;};
  // Imported Quantfury trades take priority over the hardcoded H0 array
  var qfHistEntries=qfTrades&&qfTrades.length>0?qfTrades.map(mapQfTradeToHist):H0;
  const hist=[...xhist,...qfHistEntries];
  // QUANTFURY_BASE: use live imported total when available, else hardcoded March 2026 total
  const QUANTFURY_BASE=qfTrades&&qfTrades.length>0
    ?qfTrades.reduce(function(s,t){return s+(t.pnl_usd||0);},0)
    :-7471.73;
  const xhistTotal=xhist.reduce((a,h)=>a+(h.result||0),0);
  const h0Total=QUANTFURY_BASE+xhistTotal;
  const ethU=(pr.ETH-3621.58)*1.95209253;
  const ethT=ethU-796.09;
  const actPnl=pos.reduce((a,p)=>a+getPnL(p),0)+(!ethClosed?ethU:0);
  const wins=hist.filter(function(h){return h.result>0&&!isNearBE(h.result,h.cap);}).length;
  const sc=calcScore(ps,pats,jnl,xhist,predictions);
  const lvColor=sc<0?"#ff2222":sc<30?"#ff5533":sc<50?"#ff8844":sc<65?"#f0b429":sc<80?"#88cc44":"#00ff88";
  const lvLabel=sc<0?"⚠️ AUTODESTRUCTIVO":sc<30?"APOSTADOR":sc<50?"PRINCIPIANTE":sc<65?"EN TRANSICION":sc<80?"AVANZADO":"PROFESIONAL";

  // - HISTORY -
  function dateKey(d){
    var p=(d||"").split("/");
    if(p.length!==3)return d||"";
    return p[2]+p[1].padStart(2,"0")+p[0].padStart(2,"0");
  }
  const fH=hist
    .filter(function(h){
      var srcOk=hSource==="all"||(hSource==="quantfury"&&h.source==="imported_quantfury")||(hSource==="sistema"&&h.source!=="imported_quantfury");
      var dirOk=hFilter==="all"||hFilter===h.dir.toLowerCase();
      var schOk=!hSearch||h.asset.toLowerCase().indexOf(hSearch.toLowerCase())>=0;
      return srcOk&&dirOk&&schOk;
    })
    .sort((a,b)=>{
      const da=dateKey(a.date);
      const db=dateKey(b.date);
      return hSort==="desc"?db.localeCompare(da):da.localeCompare(db);
    });
  const lWin=hist.filter(function(h){return h.dir==="Long"&&h.result>0&&!isNearBE(h.result,h.cap);}).length;
  const lLoss=hist.filter(function(h){return h.dir==="Long"&&h.result<0;}).length;
  const lBE=hist.filter(function(h){return h.dir==="Long"&&(h.result===0||isNearBE(h.result,h.cap));}).length;
  const sWin=hist.filter(function(h){return h.dir==="Short"&&h.result>0&&!isNearBE(h.result,h.cap);}).length;
  const sLoss=hist.filter(function(h){return h.dir==="Short"&&h.result<0;}).length;
  const sBE=hist.filter(h=>h.dir==="Short"&&h.result===0).length;
  const lTot=hist.filter(h=>h.dir==="Long").length;
  const sTot=hist.filter(h=>h.dir==="Short").length;

  // ─── Actualizar estadísticas de estrategia al cerrar posición ───
  function applyPatternResult(patId,isWin){
    if(!patId)return;
    var d=today();
    var newPats=D.current.pats.map(function(x){
      if(String(x.id)!==String(patId))return x;
      var currentFail=x.fail!==undefined?x.fail:Math.max(0,(x.obs||0)-(x.conf||0));
      if(isWin){
        return{...x,obs:(x.obs||0)+1,conf:(x.conf||0)+1,fail:currentFail,log:[{date:d,result:"conf"},...(x.log||[])]};
      }else{
        return{...x,obs:(x.obs||0)+1,conf:(x.conf||0),fail:currentFail+1,log:[{date:d,result:"fail"},...(x.log||[])]};
      }
    });
    D.current.pats=newPats;
    setPats(newPats);
  }

  // - CLOSE POSITION -
  function closePos(p,type,manualPrice){
    // Guard: position might have been auto-closed while ModalCerrar was open
    if(!D.current.pos.some(function(x){return x.id===p.id;})){
      setModal(function(m){return{...m,close:null};});
      return;
    }
    const isBE=p.be||p.sl===p.entry;
    // Use capitalRemaining if partial TPs have already been closed
    const hasPartials=p.tpLevels&&p.tpLevels.length>0&&p.tpLevels.some(function(l){return l.hit;});
    const closeCap=hasPartials&&p.capitalRemaining!=null?p.capitalRemaining:p.capital;
    const accPartial=p.accPartialResult||0;
    let result=0;
    let note="";
    const newPs={...D.current.ps};
    if(type==="be"){
      // Breakeven explícito — SL movido a entrada
      result=0;
      note="⚖️ SL Breakeven";
      newPs.slBreakeven=(newPs.slBreakeven||0)+1;
    }else if(type==="sl"){
      result=isBE?0:-(closeCap*Math.abs(p.entry-p.sl)/p.entry);
      if(isBE){
        note="⚖️ SL Breakeven (SL en entrada)";
        newPs.slBreakeven=(newPs.slBreakeven||0)+1;
      }else{
        note="SL ejecutado"+(hasPartials?" (+ parciales cerradas)":"");
        newPs.slOk=(newPs.slOk||0)+1;
      }
    }else if(type==="tp"){
      // For tpLevels positions: calculate remaining portion from unhit levels or use closeCap at last level price
      if(p.tpLevels&&p.tpLevels.length>0){
        // Calculate result for any unhit levels using their configured prices
        var unhitLvls=p.tpLevels.filter(function(l){return!l.hit;});
        if(unhitLvls.length>0){
          // Use weighted average of remaining TP prices × remaining capital
          result=unhitLvls.reduce(function(sum,lvl){
            var lvlCap=p.capital*lvl.pct/100;
            var lvlRes=p.dir==="Short"?(lvlCap*(p.entry-lvl.price)/p.entry):(lvlCap*(lvl.price-p.entry)/p.entry);
            return sum+lvlRes;
          },0);
        }else{
          // All levels already hit but position still in pos — treat remaining as 0
          result=0;
        }
        note="🎯 TPs alcanzados"+(hasPartials?" (+ parciales cerradas)":"");
      }else{
        result=p.tp?closeCap*Math.abs(p.tp-p.entry)/p.entry:0;
        note="TP alcanzado";
      }
      newPs.tpAuto=(newPs.tpAuto||0)+1;
      newPs.tpStreak=(newPs.tpStreak||0)+1;
      if(newPs.tpStreak>(newPs.bestTpStreak||0))newPs.bestTpStreak=newPs.tpStreak;
    }else{
      newPs.tpStreak=0; // Cierre manual interrumpe la racha
      // Si hay precio manual, usar ese; si no, usar precio de mercado
      if(manualPrice&&manualPrice>0){
        const r=p.dir==="Short"?(p.entry-manualPrice)/p.entry:(manualPrice-p.entry)/p.entry;
        result=parseFloat((closeCap*r).toFixed(2));
        note="Cierre manual @ $"+manualPrice.toLocaleString()+(hasPartials?" (+ parciales cerradas)":"");
      }else{
        // recalculate getPnL with closeCap
        const c=PM[p.asset]||p.entry;
        const r2=p.dir==="Short"?(p.entry-c)/p.entry:(c-p.entry)/p.entry;
        result=parseFloat((closeCap*r2).toFixed(2));
        note="Cierre manual"+(hasPartials?" (+ parciales cerradas)":"");
      }
      var finalResult=result+accPartial;
      if(isNearBE(finalResult,closeCap)){newPs.slBreakeven=(newPs.slBreakeven||0)+1;if(!note.includes("manual"))note=note+" (≈BE)";}
      else if(finalResult>0)newPs.tpManual=(newPs.tpManual||0)+1;
      else if(finalResult<0)newPs.earlyClose=(newPs.earlyClose||0)+1;
      else newPs.manualClose=(newPs.manualClose||0)+1;
    }
    // Combine remaining close result with any accumulated partial results
    result=parseFloat((result+accPartial).toFixed(2));
    // Calcular y guardar ratio R:R de esta operacion al cerrarla
    let closedRatio=null;
    if(p.sl&&p.entry){
      let effTp=p.tp||0;
      if(!effTp&&p.tpLevels&&p.tpLevels.length>0){
        const acts=p.tpLevels.filter(function(l){return!l.hit;});
        const all=p.tpLevels;
        const src=acts.length>0?acts:all;
        const tot=src.reduce(function(a,l){return a+l.pct;},0);
        if(tot>0)effTp=src.reduce(function(a,l){return a+l.price*(l.pct/tot);},0);
      }
      if(effTp){
        const rsk=Math.abs(p.entry-p.sl);
        const rwd=Math.abs(effTp-p.entry);
        if(rsk>0)closedRatio=parseFloat((rwd/rsk).toFixed(2));
      }
    }
    if(closedRatio!==null){
      newPs.ratioSum=(newPs.ratioSum||0)+closedRatio;
      newPs.ratioCount=(newPs.ratioCount||0)+1;
    }
    const entry={id:Date.now(),asset:p.asset,dir:p.dir,cap:p.capital,result:result,date:today(),note:note,...(closedRatio!==null?{ratio:closedRatio}:{}),...(p.patternId?{patternId:p.patternId}:{}),...(p.sl_initial!=null?{sl_initial:p.sl_initial}:{}),...(p.sl_modifications?{sl_modifications:p.sl_modifications}:{}),...(p.thesis_text?{thesis_text:p.thesis_text}:{}),...(p.thesis_screenshot_url?{thesis_screenshot_url:p.thesis_screenshot_url}:{}),...(p.broker?{broker:p.broker}:{broker:"quantfury"})};
    const newX=[entry,...(D.current.xhist||[])];
    const newPos2=D.current.pos.filter(x=>x.id!==p.id);
    D.current.xhist=newX;D.current.pos=newPos2;D.current.ps=newPs;
    setXhist(newX);setPos(newPos2);setPs(newPs);
    // Escribir a localStorage INMEDIATAMENTE (antes del debounce de save) para no perder el trade si la página recarga en <600ms
    try{localStorage.setItem("td-user",JSON.stringify({pr:D.current.pr,pos:newPos2,pats:D.current.pats,jnl:D.current.jnl,ps:newPs,xhist:newX,ethClosed:D.current.ethClosed||false,_savedAt:Date.now()}));}catch(e){}
    // Actualizar stats de estrategia: win si ganó, fail si SL o perdida manual
    if(p.patternId){
      var isPatWin=(type==="tp")||(type!=="sl"&&type!=="be"&&result>0);
      var isPatLoss=(type==="sl"&&!isBE)||(type!=="sl"&&type!=="be"&&result<0);
      if(isPatWin)applyPatternResult(p.patternId,true);
      else if(isPatLoss)applyPatternResult(p.patternId,false);
    }
    save();
    setModal(m=>({...m,close:null}));
    runAuditForEntry(entry.id);
  }

  function runAuditForEntry(entryId){
    var trade=(D.current.xhist||[]).filter(function(x){return x.id===entryId;})[0];
    if(!trade){
      console.warn("[Auditor] Operación no encontrada para id",entryId);
      return;
    }
    var missing=detectMissingFields(trade);
    if(missing.enriched.length>0||missing.core.length>0){
      console.warn("[Auditor] Campos faltantes en op",trade.id,"→ core:",missing.core,"enriched:",missing.enriched);
    }
    // Función auxiliar: persistir reporte y reflejar en estado sin fallos silenciosos.
    function commitReport(report,scoreOpt){
      var updated=(D.current.xhist||[]).map(function(x){
        if(x.id!==entryId)return x;
        var patch={audit_report:report,audited_at:new Date().toISOString()};
        if(scoreOpt!=null)patch.audit_score=scoreOpt;
        return Object.assign({},x,patch);
      });
      D.current.xhist=updated;
      setXhist(updated);
      try{localStorage.setItem("td-user",JSON.stringify({pr:D.current.pr,pos:D.current.pos,pats:D.current.pats,jnl:D.current.jnl,ps:D.current.ps,xhist:updated,ethClosed:D.current.ethClosed||false,_savedAt:Date.now()}));}catch(e){}
      save();
    }
    // Operación corrupta: sin campos mínimos → no llamamos a la API, guardamos reporte explicativo.
    if(!missing.hasMinimum){
      commitReport(buildNonAuditableReport(trade,missing),null);
      return;
    }
    // Auditoría normal con AI, informando de campos faltantes para que el modelo use "na".
    auditTrade(trade,null,missing).then(function(auditResult){
      var result=auditResult||{error:"Respuesta vacía del auditor"};
      // Propagar metadata de campos faltantes al reporte — la UI los muestra como 🔘.
      var enriched=Object.assign({},result,{missingEnriched:missing.enriched});
      var score=(!enriched.error&&enriched.score!=null)?enriched.score:null;
      commitReport(enriched,score);
    }).catch(function(e){
      console.warn("[Auditor] Excepción en op",trade.id,":",e);
      commitReport({error:"Excepción: "+((e&&e.message)||String(e)),missingEnriched:missing.enriched},null);
    });
  }

  function notifyProximity(asset,dir,level,targetPrice,currentPrice){
    var pct=Math.abs(currentPrice-targetPrice)/targetPrice*100;
    var isTP=level.indexOf("TP")===0;
    var title=(isTP?"🎯 ":"⚠️ ")+asset+" — "+level+" próximo";
    var body=dir+" | "+level+": $"+parseFloat(targetPrice).toLocaleString()+" | Actual: $"+parseFloat(currentPrice).toLocaleString()+" ("+pct.toFixed(2)+"% distancia)";
    if(typeof Notification!=="undefined"&&Notification.permission==="granted"){
      try{new Notification(title,{body:body});}catch(e){}
    }
    var tk=localStorage.getItem("td-tg-token");
    var cid=localStorage.getItem("td-tg-chatid");
    if(tk&&cid){
      fetch("https://api.telegram.org/bot"+tk+"/sendMessage",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:cid,text:title+"\n"+body+"\n⏰ "+new Date().toLocaleTimeString("es-ES")})}).catch(function(){});
    }
  }

  function notifyAutoClose(asset,dir,type,price,result){
    const isGain=result>=0;
    const title=(isGain?"🎯 ":"🛑 ")+type+" — "+asset;
    const body=dir+" "+(isGain?"+":"")+fmtNum(result)+" @ $"+parseFloat(price).toLocaleString();
    if(typeof Notification!=="undefined"&&Notification.permission==="granted"){
      try{new Notification(title,{body,requireInteraction:true});}catch(e){}
    }
    var tk=localStorage.getItem("td-tg-token");
    var cid=localStorage.getItem("td-tg-chatid");
    if(tk&&cid){
      fetch("https://api.telegram.org/bot"+tk+"/sendMessage",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:cid,text:title+"\n"+body+"\n⏰ "+new Date().toLocaleTimeString("es-ES")})}).catch(function(){});
    }
    // Web Push fan-out: land in the Android tray even if tab is closed
    sendPushFanout({
      title:title,
      body:body,
      tag:"td-autoclose-"+asset+"-"+Date.now(),
      icon:"/icon.svg",
      badge:"/icon.svg",
      vibrate:[200,100,200],
      data:{deepLink:"/?tab=2",autoClose:true,asset:asset},
      actions:[{action:"dismiss",title:"Ignorar"}]
    });
  }

  function clearPosProximityKeys(posId){
    var prefix="prox_"+posId+"_";
    Object.keys(proximityRef.current).forEach(function(k){
      if(k.indexOf(prefix)===0)delete proximityRef.current[k];
    });
  }

  function autoCheckPositions(newPr){
    if(!D.current.pos||!D.current.pos.length)return;
    var changed=false;
    var entries=[];
    var psU={...D.current.ps};
    var newPos=[];
    for(var pi=0;pi<D.current.pos.length;pi++){
      var p=D.current.pos[pi];
      var base=p.asset.replace(/\/.*$/,"").toUpperCase();
      var price=newPr[base];
      if(!price||price<=0){newPos.push(p);continue;}
      if(p.status==="pending"){newPos.push(p);continue;}
      var isShort=p.dir==="Short";
      var kept=true;
      // Helper: calcular ratio R:R de la posicion
      function calcPosRatio(pos){
        if(!pos.sl||!pos.entry)return null;
        var effTp=pos.tp||0;
        if(!effTp&&pos.tpLevels&&pos.tpLevels.length>0){
          var acts=pos.tpLevels.filter(function(l){return!l.hit;});
          var src=acts.length>0?acts:pos.tpLevels;
          var tot=src.reduce(function(a,l){return a+l.pct;},0);
          if(tot>0)effTp=src.reduce(function(a,l){return a+l.price*(l.pct/tot);},0);
        }
        if(!effTp)return null;
        var rsk=Math.abs(pos.entry-pos.sl);
        var rwd=Math.abs(effTp-pos.entry);
        return rsk>0?parseFloat((rwd/rsk).toFixed(2)):null;
      }
      // SL check — tolerancia 0.01% para evitar cierre prematuro cuando SL≈entrada
      if(p.sl&&p.sl>0){
        var slHit=isShort?(price>=p.sl*1.0001):(price<=p.sl*0.9999);
        if(slHit){
          var isBE=p.be||p.sl===p.entry;
          var slResult=isBE?0:-(p.capital*Math.abs(p.entry-p.sl)/p.entry);
          var slRatio=calcPosRatio(p);
          // No actualizar ratio R:R medio cuando salta el SL — solo cuenta en TPs
          var slAutoNote=isBE?"⚖️ BE auto @ $"+price.toLocaleString():"🛑 SL auto @ $"+price.toLocaleString();
          entries.push({id:Date.now()+entries.length,asset:p.asset,dir:p.dir,cap:p.capital,result:parseFloat(slResult.toFixed(2)),date:today(),note:slAutoNote,autoClose:true,...(slRatio!==null?{ratio:slRatio}:{})});
          if(isBE){psU.slBreakeven=(psU.slBreakeven||0)+1;}else{psU.slOk=(psU.slOk||0)+1;}
          psU.tpStreak=0; // SL rompe la racha
          changed=true;
          if(p.patternId&&!isBE)applyPatternResult(p.patternId,false);
          notifyAutoClose(p.asset,p.dir,"SL ejecutado",price,slResult);
          clearPosProximityKeys(p.id);
          kept=false;
        }
      }
      if(!kept)continue;
      // Partial TP levels — stored as ONE xhist entry when all levels complete
      if(p.tpLevels&&p.tpLevels.length){
        var newSessionResult=0;
        var newlyHitLevels=[];
        var updLevels=p.tpLevels.map(function(lvl){
          if(lvl.hit)return lvl;
          var hit=isShort?(price<=lvl.price):(price>=lvl.price);
          if(!hit)return lvl;
          var partCap=p.capital*lvl.pct/100;
          var partResult=isShort?(partCap*(p.entry-lvl.price)/p.entry):(partCap*(lvl.price-p.entry)/p.entry);
          newSessionResult+=partResult;
          changed=true;
          newlyHitLevels.push({lvl:lvl,result:partResult});
          return{...lvl,hit:true};
        });
        var allHit=updLevels.every(function(l){return l.hit;});
        if(allHit){
          // ALL levels done — una sola notificación consolidada
          var totalResult=(p.accPartialResult||0)+newSessionResult;
          var fullRatio=calcPosRatio(p);
          if(fullRatio!==null){psU.ratioSum=(psU.ratioSum||0)+fullRatio;psU.ratioCount=(psU.ratioCount||0)+1;}
          psU.tpAuto=(psU.tpAuto||0)+1;
          psU.tpStreak=(psU.tpStreak||0)+1;
          if(psU.tpStreak>(psU.bestTpStreak||0))psU.bestTpStreak=psU.tpStreak;
          var tpPrices=updLevels.map(function(l){return "$"+parseFloat(l.price).toLocaleString();}).join("/");
          entries.push({id:Date.now()+entries.length,asset:p.asset,dir:p.dir,cap:p.capital,result:parseFloat(totalResult.toFixed(2)),date:today(),note:"🎯 TPs completados "+tpPrices,autoClose:true,...(fullRatio!==null?{ratio:fullRatio}:{}),...(p.patternId?{patternId:p.patternId}:{})});
          if(p.patternId)applyPatternResult(p.patternId,true);
          clearPosProximityKeys(p.id);
          changed=true;
          // Notificación única consolidada — no disparar una por nivel
          notifyAutoClose(p.asset,p.dir,"TPs completados ("+newlyHitLevels.length+" niveles)",price,totalResult);
          continue;
        }
        var someNew=updLevels.some(function(l,i){return l.hit&&!p.tpLevels[i].hit;});
        if(someNew){
          var remPct=updLevels.filter(function(l){return!l.hit;}).reduce(function(a,l){return a+l.pct;},0);
          var accResult=(p.accPartialResult||0)+newSessionResult;
          newPos.push({...p,tpLevels:updLevels,capitalRemaining:p.capital*remPct/100,accPartialResult:accResult});
          // Notificar solo los niveles recién golpeados (normalmente 1)
          newlyHitLevels.forEach(function(nh){
            notifyAutoClose(p.asset,p.dir,"TP parcial "+nh.lvl.pct+"%",price,nh.result);
          });
          continue;
        }
      } else if(p.tp){
        // Single TP
        var tpHit=isShort?(price<=p.tp):(price>=p.tp);
        if(tpHit){
          var tpResult=p.capital*Math.abs(p.tp-p.entry)/p.entry;
          var tpRatio=calcPosRatio(p);
          var tpNote=isNearBE(tpResult,p.capital)?"⚖️ TP≈BE auto @ $"+price.toLocaleString():"🎯 TP auto @ $"+price.toLocaleString();
          if(!isNearBE(tpResult,p.capital)&&tpRatio!==null){psU.ratioSum=(psU.ratioSum||0)+tpRatio;psU.ratioCount=(psU.ratioCount||0)+1;}
          entries.push({id:Date.now()+entries.length,asset:p.asset,dir:p.dir,cap:p.capital,result:parseFloat(tpResult.toFixed(2)),date:today(),note:tpNote,autoClose:true,...(tpRatio!==null?{ratio:tpRatio}:{})});
          if(isNearBE(tpResult,p.capital)){psU.slBreakeven=(psU.slBreakeven||0)+1;}else{psU.tpAuto=(psU.tpAuto||0)+1;}
          psU.tpStreak=(psU.tpStreak||0)+1;
          if(psU.tpStreak>(psU.bestTpStreak||0))psU.bestTpStreak=psU.tpStreak;
          if(p.patternId)applyPatternResult(p.patternId,true);
          clearPosProximityKeys(p.id);
          changed=true;
          notifyAutoClose(p.asset,p.dir,"TP alcanzado",price,tpResult);
          continue;
        }
      }
      newPos.push(p);
    }
    if(!changed)return;
    var newX=[...entries,...(D.current.xhist||[])];
    D.current.xhist=newX;D.current.pos=newPos;D.current.ps=psU;
    setXhist(newX);setPos(newPos);setPs(psU);
    // Guardar inmediatamente (sin debounce) — operación crítica: SL/TP auto-cerrados
    if(saveRef&&saveRef.current)saveRef.current();else save();
    entries.forEach(function(e){ runAuditForEntry(e.id); });
  }

  function checkProximityAlerts(newPr){
    if(!D.current.pos||!D.current.pos.length)return;
    var PROX=0.001; // notificar si el precio está a ≤0.1% del nivel
    var RESET=0.005; // resetear alerta cuando se aleja ≥0.5%
    var COOLDOWN_MS=15*60*1000; // 15 minutos entre alertas del mismo nivel
    var now=Date.now();
    D.current.pos.forEach(function(p){
      var base=p.asset.replace(/\/.*$/,"").toUpperCase();
      var price=newPr[base];
      if(!price||price<=0)return;
      function shouldFire(key){
        var last=proximityRef.current[key];
        if(!last)return true;
        if(typeof last==="number")return (now-last)>=COOLDOWN_MS;
        return false; // legacy boolean true = fired, treat as fired forever until reset
      }
      function markFired(key){proximityRef.current[key]=now;}
      function clearKey(key){delete proximityRef.current[key];}
      if(p.status==="pending"){
        // ── Posición en espera: avisar cuando el precio se acerca a la entrada ──
        var distEntry=Math.abs(price-p.entry)/p.entry;
        var eKey="prox_"+p.id+"_entry";
        if(distEntry<=PROX&&shouldFire(eKey)){
          markFired(eKey);
          notifyProximity(p.asset,p.dir,"ENTRADA",p.entry,price);
        }else if(distEntry>RESET){
          clearKey(eKey);
        }
      }else{
        // ── Posición abierta: avisar cuando el precio se acerca al SL o TP ──
        if(p.sl){
          var distSL=Math.abs(price-p.sl)/p.entry;
          var slKey="prox_"+p.id+"_sl";
          if(distSL<=PROX&&shouldFire(slKey)){
            markFired(slKey);
            notifyProximity(p.asset,p.dir,"SL",p.sl,price);
          }else if(distSL>RESET){
            clearKey(slKey);
          }
        }
        if(p.tpLevels&&p.tpLevels.length){
          p.tpLevels.forEach(function(lvl,idx){
            if(lvl.hit)return;
            var distTPL=Math.abs(price-lvl.price)/p.entry;
            var tplKey="prox_"+p.id+"_tpl"+idx;
            if(distTPL<=PROX&&shouldFire(tplKey)){
              markFired(tplKey);
              notifyProximity(p.asset,p.dir,"TP "+lvl.pct+"%",lvl.price,price);
            }else if(distTPL>RESET){
              clearKey(tplKey);
            }
          });
        }else if(p.tp){
          var distTP=Math.abs(price-p.tp)/p.entry;
          var tpKey="prox_"+p.id+"_tp";
          if(distTP<=PROX&&shouldFire(tpKey)){
            markFired(tpKey);
            notifyProximity(p.asset,p.dir,"TP",p.tp,price);
          }else if(distTP>RESET){
            clearKey(tpKey);
          }
        }
      }
    });
  }

  function closeEthLegacy(closePrice){
    const cp=parseFloat(closePrice);
    if(isNaN(cp)||cp<=0)return;
    // Calculate final P&L
    const ethQty=1.95209253;
    const entryAvg=3621.58;
    const realizedLoss=-796.09;
    const unrealizedPnL=(cp-entryAvg)*ethQty;
    const totalPnL=parseFloat((unrealizedPnL+realizedLoss).toFixed(2));
    // Add to xhist
    const entry={id:Date.now(),asset:"ETH/USDT",dir:"Long",cap:Math.round(entryAvg*ethQty),result:totalPnL,date:new Date().toLocaleDateString("es-ES"),note:"Cierre posicion legado @ $"+cp};
    const newX=[entry,...(D.current.xhist||[])];
    D.current.xhist=newX;
    D.current.ethClosed=true;
    setXhist(newX);
    setEthClosed(true);
    try{localStorage.setItem("td-user",JSON.stringify({pr:D.current.pr,pos:D.current.pos,pats:D.current.pats,jnl:D.current.jnl,ps:D.current.ps,xhist:newX,ethClosed:true,_savedAt:Date.now()}));}catch(e){}
    save();
    setModal(m=>({...m,closeEth:false}));
  }

  // - PATTERN ACTIONS -
  function patConfirm(patId){
    const d=today();
    const updated=D.current.pats.map(x=>{
      if(x.id!==patId)return x;
      // Normalizar fail si no existe (datos guardados en version antigua)
      const currentFail=x.fail!==undefined?x.fail:Math.max(0,(x.obs||0)-(x.conf||0));
      return{...x,obs:(x.obs||0)+1,conf:(x.conf||0)+1,fail:currentFail,log:[{date:d,result:"conf"},...(x.log||[])]};
    });
    SP(updated);
  }
  function patFail(patId){
    const d=today();
    const updated=D.current.pats.map(x=>{
      if(x.id!==patId)return x;
      // Normalizar fail si no existe (datos guardados en version antigua)
      const currentFail=x.fail!==undefined?x.fail:Math.max(0,(x.obs||0)-(x.conf||0));
      return{...x,obs:(x.obs||0)+1,conf:(x.conf||0),fail:currentFail+1,log:[{date:d,result:"fail"},...(x.log||[])]};
    });
    SP(updated);
  }
  function patDelete(patId){SP(D.current.pats.filter(x=>x.id!==patId));}
  function patSave(form,editId){
    if(!form.name||!form.desc)return;
    if(editId){
      SP(D.current.pats.map(x=>x.id===editId?{...x,name:form.name,tf:form.tf,asset:form.asset,desc:form.desc,imgUrl:form.imgUrl||""}:x));
    }else{
      SP([...D.current.pats,{id:Date.now(),name:form.name,tf:form.tf,asset:form.asset,desc:form.desc,imgUrl:form.imgUrl||"",obs:0,conf:0,fail:0,log:[]}]);
    }
    setModal(m=>({...m,pat:false,patForm:null,editPatId:null}));
  }

  // - PHOTO -
  // addPhoto/delPhoto eliminados

  if(!ready)return(
    <div style={{...S.app,display:"flex",alignItems:"center",justifyContent:"center",height:"100vh"}}>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:20,color:"#f0b429",fontWeight:700,marginBottom:8}}>TRADING DIARY</div>
        <div style={{fontSize:11,color:"#555"}}>Cargando datos...</div>
      </div>
    </div>
  );

  const svColor=sv==="saving"?"#f0b429":sv==="error"?"#ff4444":"#00ff88";
  const svText=sv==="saving"?"guardando...":sv==="error"?"error al guardar":"guardado";

  return(
    <div style={S.app}>
      {/* HEADER */}
      <div style={S.hdr}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <svg width="28" height="28" viewBox="0 0 32 32" style={{flexShrink:0}} xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="5" fill="#0a0a0f"/>
            <rect x="6" y="8" width="2" height="3" fill="#ff4444"/>
            <rect x="4" y="11" width="6" height="8" fill="#ff4444" rx="1"/>
            <rect x="6" y="19" width="2" height="5" fill="#ff4444"/>
            <rect x="15" y="3" width="2" height="5" fill="#00cc66"/>
            <rect x="13" y="8" width="6" height="16" fill="#00cc66" rx="1"/>
            <rect x="15" y="24" width="2" height="5" fill="#00cc66"/>
            <rect x="24" y="8" width="2" height="4" fill="#00cc66"/>
            <rect x="22" y="12" width="6" height="9" fill="#00cc66" rx="1"/>
            <rect x="24" y="21" width="2" height="4" fill="#00cc66"/>
          </svg>
          <div>
            <div style={{fontSize:22,fontWeight:700,color:"#f0b429",letterSpacing:3}}>TRADING DIARY</div>
            <div style={{fontSize:9,color:"#444"}}>MIGUEL GARCIA PARRADO</div>
          </div>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <div style={{fontSize:8,padding:"2px 7px",borderRadius:10,border:"1px solid "+svColor,color:svColor}}>{svText}</div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:9,color:"#444"}}>NIVEL</div>
            <div style={{fontSize:11,color:lvColor,fontWeight:700}}>{lvLabel} {sc}%</div>
          </div>
        </div>
      </div>

      {/* Banner PWA — instalar como app */}
      {pwaInstallable&&!pwaInstalled&&(
        <div style={{background:"rgba(240,180,41,.1)",borderBottom:"1px solid rgba(240,180,41,.3)",padding:"6px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
          <div style={{fontSize:9,color:"#f0b429"}}>📲 <b>Instalar como app</b> — recibe notificaciones aunque cierres el navegador</div>
          <div style={{display:"flex",gap:6}}>
            <button onClick={function(){
              if(window._pwaPrompt){window._pwaPrompt.prompt();window._pwaPrompt.userChoice.then(function(r){if(r.outcome==="accepted"){setPwaInstallable(false);setPwaInstalled(true);}window._pwaPrompt=null;});}
            }} style={{background:"#f0b429",border:"none",color:"#000",padding:"4px 12px",borderRadius:4,fontSize:9,cursor:"pointer",fontWeight:700}}>INSTALAR</button>
            <button onClick={function(){setPwaInstallable(false);}} style={{background:"transparent",border:"none",color:"#555",cursor:"pointer",fontSize:12}}>✕</button>
          </div>
        </div>
      )}
      {pwaInstalled&&(
        <div style={{background:"rgba(0,255,136,.08)",borderBottom:"1px solid rgba(0,255,136,.2)",padding:"5px 14px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontSize:9,color:"#00ff88"}}>✅ App instalada correctamente</div>
          <button onClick={function(){setPwaInstalled(false);}} style={{background:"transparent",border:"none",color:"#555",cursor:"pointer",fontSize:12}}>✕</button>
        </div>
      )}

      {/* TABS */}
      <div style={S.tabs}>{TABS.map(t=><button key={t} onClick={()=>setTab(t)} style={S.tab(tab===t)}>{t.toUpperCase()}</button>)}</div>

      {/* Boton actualizar precios - solo en pestanas relevantes */}
      {(tab==="Resumen"||tab==="Posiciones")&&(
        <div style={{background:"#080810",borderBottom:"1px solid #1a1a2a",padding:"5px 14px",display:"flex",justifyContent:"flex-end"}}>
          <div style={{display:"flex",gap:6,alignItems:"center"}}>
          <button onClick={fetchPrices} disabled={fetchingPrices} style={{background:"rgba(0,255,136,.1)",border:"1px solid #00ff88",color:"#00ff88",padding:"3px 10px",borderRadius:4,fontSize:9,cursor:"pointer",fontWeight:700}}>
            {fetchingPrices?"⏳ actualizando...":"⚡ Refrescar"}
          </button>
          {lastPriceTime&&!fetchingPrices&&<span style={{fontSize:8,color:"#444"}}>actualizado {lastPriceTime} · auto cada 60s</span>}
          <button onClick={()=>setModal(m=>({...m,prices:true,tmpPr:{...pr}}))} style={{background:"transparent",border:"1px solid #2a2a3a",color:"#f0b429",padding:"3px 10px",borderRadius:4,fontSize:9,cursor:"pointer"}}>✏ Manual</button>
        </div>
        </div>
      )}

      <div style={S.body}>

        {/* ═══ RESUMEN ═══ */}
        {tab==="Resumen"&&(
          <div>
            <div style={S.grid(150)}>
              {[
                {l:"PERDIDA HISTORICA",v:fmtNum(h0Total),c:"#ff4444"},
                {l:"PERDIDA ETH LEGADO",v:fmtNum(ethT),c:"#ff4444"},
                {l:"PERDIDA TOTAL",v:fmtNum(h0Total+ethT),c:h0Total+ethT>=0?"#00ff88":"#ff4444"},
                {l:"OPS TOTALES",v:hist.length,c:"#e0e0e0"},
                {l:"TASA GANADORA",v:Math.round(wins/hist.length*100)+"%",c:"#f0b429"},
                {l:"RATIO R:R MEDIO",v:(()=>{var xR=xhist.filter(function(h){return h.ratio!=null;});var cnt=xR.length;var sum=xR.reduce(function(a,h){return a+(h.ratio||0);},0);return cnt>0?"1 : "+(sum/cnt).toFixed(2)+" ("+cnt+"ops)":"--";})(),c:"#88aaff"},
                {l:"🔥 RACHA TP AUTO",v:(()=>{var streak=0;for(var i=0;i<xhist.length;i++){var e=xhist[i];if(e.autoClose&&e.result>0&&(e.note||"").indexOf("🎯")===0){streak++;}else{break;}}var best=ps.bestTpStreak||0;if(streak>best)best=streak;return streak>0?streak+" consecutivos (récord: "+best+")":best>0?"0 (récord: "+best+")":"--";})(),c:(function(){var s=0;for(var i=0;i<xhist.length;i++){var e=xhist[i];if(e.autoClose&&e.result>0&&(e.note||"").indexOf("🎯")===0){s++;}else{break;}}return s;})()>=3?"#00ff88":(function(){var s=0;for(var i=0;i<xhist.length;i++){var e=xhist[i];if(e.autoClose&&e.result>0&&(e.note||"").indexOf("🎯")===0){s++;}else{break;}}return s;})()>0?"#f0b429":"#555"},
                {l:"ROI HISTORICO",v:(()=>{const inv=hist.reduce((a,h)=>a+(h.cap||0),0);return inv>0?(h0Total/inv*100).toFixed(1)+"%":"--";})(),c:h0Total>=0?"#00ff88":"#ff4444"},
                {l:"ROI ETH LEGADO",v:((pr.ETH-3621.58)/3621.58*100).toFixed(1)+"%",c:pr.ETH>=3621.58?"#00ff88":"#ff4444"},
              ].map(k=><div key={k.l} style={S.card}><div style={S.lbl}>{k.l}</div><div style={S.val(k.c)}>{k.v}</div></div>)}
            </div>
            {/* ETH Legado */}
            {!ethClosed&&<div style={{...S.card,border:"1px solid rgba(255,68,68,.3)"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                <div style={{fontSize:10,color:"#f0b429",fontWeight:700}}>ETH LEGADO - LONG</div>
                <div style={{fontSize:9,color:"#ff4444"}}>-40.65% ROI</div>
              </div>
              <div style={S.grid(110)}>
                {[
                  {l:"ETH",v:"1.9521"},{l:"ENTRADA",v:"$3,621.58"},{l:"ACTUAL",v:"$"+pr.ETH.toLocaleString()},
                  {l:"PERD.REAL.",v:"-$796.09",c:"#ff4444"},{l:"NO REAL.",v:fmtNum(ethU),c:"#ff4444"},
                  {l:"BREAKEVEN",v:"$4,029",c:"#f0b429"},{l:"TP",v:"$9,000",c:"#00ff88"},{l:"LIQUIDACION",v:"~$1,080",c:"#ff6600"},
                ].map(i=><div key={i.l}><div style={S.lbl}>{i.l}</div><div style={{fontSize:11,fontWeight:600,color:i.c||"#e0e0e0"}}>{i.v}</div></div>)}
              </div>
              <div style={S.bar}><div style={S.fill(Math.min(pr.ETH/9000*100,100),"linear-gradient(90deg,#ff4444,#f0b429,#00ff88)")}/></div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:8,color:"#444",marginTop:3}}>
                <span>HOY ${pr.ETH}</span><span>BE $4,029</span><span>TP $9,000</span>
              </div>
              <button
                onClick={()=>setModal(m=>({...m,closeEth:true}))}
                style={{marginTop:10,width:"100%",padding:"8px",background:"rgba(255,68,68,.1)",border:"1px solid rgba(255,68,68,.4)",color:"#ff6666",borderRadius:6,fontSize:9,fontWeight:700,cursor:"pointer"}}
              >
                CERRAR POSICION ETH LEGADO
              </button>
            </div>}

            {/* Stats del diario */}
            {(function(){
              // Merge TP parcials en xhist para que cuenten como 1 trade
              var xGroups={},xAbsorbed={};
              xhist.forEach(function(h){
                var note=h.note||"";
                if(note.indexOf("parcial")<0)return;
                var k=h.asset+"_"+h.dir+"_"+h.cap+"_"+(h.date||"");
                if(!xGroups[k])xGroups[k]=[];
                xGroups[k].push(h);
              });
              Object.keys(xGroups).forEach(function(k){if(xGroups[k].length<2)delete xGroups[k];});
              var xMergedFirst={};
              Object.keys(xGroups).forEach(function(k){
                var grp=xGroups[k];
                var tot=grp.reduce(function(a,x){return a+(x.result||0);},0);
                xMergedFirst[grp[0].id]={result:parseFloat(tot.toFixed(2))};
                grp.slice(1).forEach(function(x){xAbsorbed[x.id]=true;});
              });
              var mergedXhist=xhist.filter(function(h){return !xAbsorbed[h.id];}).map(function(h){
                return xMergedFirst[h.id]?{asset:h.asset,dir:h.dir,cap:h.cap,date:h.date,note:"TPs completados",result:xMergedFirst[h.id].result}:h;
              });
              var allH=[].concat(mergedXhist,H0);

              // Racha: breakeven interrumpe la racha (no es ni win ni loss)
              // BE detection: por resultado (isNearBE) O por nota que contenga BE/⚖️
              var streak=0,streakType="";
              for(var si=0;si<allH.length;si++){
                var hNote=allH[si].note||"";
                var isBEEntry=allH[si].result===0
                  ||isNearBE(allH[si].result,allH[si].cap)
                  ||(hNote.indexOf("BE")!==-1||hNote.indexOf("⚖️")!==-1||hNote.indexOf("breakeven")!==-1);
                if(isBEEntry)break;
                var sw=allH[si].result>0;
                if(streak===0){streak=1;streakType=sw?"win":"loss";}
                else if((sw&&streakType==="win")||(!sw&&streakType==="loss"))streak++;
                else break;
              }

              // P&L de hoy (solo xhist, no histórico Quantfury)
              var todayStr=new Date().toLocaleDateString("es-ES");
              var todayPnl=mergedXhist.filter(function(h){return h.date===todayStr;}).reduce(function(a,h){return a+(h.result||0);},0);
              var todayTrades=mergedXhist.filter(function(h){return h.date===todayStr;}).length;

              var worstTrade=allH.length?allH.reduce(function(b,h){return h.result<b.result?h:b;},allH[0]):null;
              var assetCount={};
              allH.forEach(function(h){assetCount[h.asset]=(assetCount[h.asset]||0)+1;});
              var topAssetArr=Object.keys(assetCount).sort(function(a,b){return assetCount[b]-assetCount[a];});
              var topAsset=topAssetArr.length?[topAssetArr[0],assetCount[topAssetArr[0]]]:null;
              var slPct=(ps.slOk||0)+(ps.slBroken||0)+(ps.slBreakeven||0)>0?Math.round(((ps.slOk||0)+(ps.slBreakeven||0)*0.5)/((ps.slOk||0)+(ps.slBroken||0)+(ps.slBreakeven||0))*100):null;
              var todayColor=todayPnl>0?"#00ff88":todayPnl<0?"#ff4444":"#666";
              return(
                <div style={{...S.card,marginBottom:10}}>
                  <div style={{fontSize:10,color:"#f0b429",fontWeight:700,marginBottom:10}}>ESTADISTICAS DEL DIARIO</div>
                  <div style={S.grid(130)}>
                    <div style={S.card}>
                      <div style={S.lbl}>RACHA ACTUAL</div>
                      <div style={S.val(streak===0?"#555":streakType==="win"?"#00ff88":"#ff4444")}>
                        {streak>0?streak+" "+(streakType==="win"?"✓":"✗"):"--"}
                      </div>
                      <div style={{fontSize:8,color:"#555"}}>{streak===0?"sin datos":streakType==="win"?"consecutivas ganadas":"consecutivas perdidas"}</div>
                    </div>
                    <div style={S.card}>
                      <div style={S.lbl}>P&L HOY</div>
                      <div style={S.val(todayColor)}>{todayTrades>0?fmtNum(parseFloat(todayPnl.toFixed(2))):"$0"}</div>
                      <div style={{fontSize:8,color:"#555"}}>{todayTrades>0?todayTrades+" trade"+(todayTrades>1?"s":"")+" cerrado"+(todayTrades>1?"s":""):"sin operaciones hoy"}</div>
                    </div>
                    <div style={S.card}>
                      <div style={S.lbl}>PEOR TRADE</div>
                      <div style={S.val("#ff4444")}>{worstTrade?fmtNum(worstTrade.result):"--"}</div>
                      <div style={{fontSize:8,color:"#555"}}>{worstTrade?worstTrade.asset:""}</div>
                    </div>
                    <div style={S.card}>
                      <div style={S.lbl}>ACTIVO TOP</div>
                      <div style={S.val("#e0e0e0")}>{topAsset?topAsset[0]:"--"}</div>
                      <div style={{fontSize:8,color:"#555"}}>{topAsset?topAsset[1]+" ops":""}</div>
                    </div>
                    <div style={S.card}>
                      <div style={S.lbl}>DISCIPLINA SL</div>
                      <div style={S.val(slPct>=80?"#00ff88":slPct>=60?"#f0b429":"#ff4444")}>{slPct!=null?slPct+"%":"--"}</div>
                      <div style={{fontSize:8,color:"#555"}}>{ps.slBroken} SL rotos</div>
                    </div>
                    <div style={S.card}>
                      <div style={S.lbl}>SCORE TRADER</div>
                      <div style={S.val(lvColor)}>{sc}</div>
                      <div style={{fontSize:8,color:lvColor}}>{lvLabel}</div>
                    </div>
                  </div>
                </div>
              );
            })()}

          </div>
        )}

        {/* ═══ POSICIONES ═══ */}
        {tab==="Posiciones"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{fontSize:10,color:"#f0b429",fontWeight:700}}>POSICIONES</div>
              <div style={{display:"flex",gap:6}}>
                <button onClick={()=>setModal(m=>({...m,pos:true,posForm:{asset:"",dir:"Short",capital:"",entry:"",sl:"",tp:"",tpLevels:[],patternId:"",status:"open"},editPosId:null}))} style={{...S.btn(true),fontSize:8,padding:"4px 10px"}}>+ ABRIR TRADE</button>
                <button onClick={()=>setModal(m=>({...m,pos:true,posForm:{asset:"",dir:"Short",capital:"",entry:"",sl:"",tp:"",tpLevels:[],patternId:"",status:"pending"},editPosId:null}))} style={{background:"rgba(240,180,41,.15)",border:"1px solid #f0b429",color:"#f0b429",padding:"4px 10px",borderRadius:4,fontSize:8,fontWeight:700,cursor:"pointer"}}>+ EN ESPERA</button>
              </div>
            </div>
            {/* ETH legado - restaurar si fue cerrado */}
            {ethClosed&&(
              <div style={{textAlign:"center",padding:"10px",marginBottom:10,background:"rgba(136,170,255,.05)",border:"1px solid rgba(136,170,255,.15)",borderRadius:8,fontSize:9,color:"#555"}}>
                ETH legado marcada como cerrada.{" "}
                <button onClick={function(){setEthClosed(false);D.current.ethClosed=false;save();}}
                  style={{background:"transparent",border:"none",color:"#88aaff",cursor:"pointer",fontSize:9,textDecoration:"underline"}}>Restaurar posición</button>
              </div>
            )}
            {/* ETH legado */}
            {!ethClosed&&(
              <div style={{...S.card,border:"1px solid rgba(255,68,68,.3)",marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <span style={{fontSize:15,fontWeight:700}}>ETH/USD</span>
                    <span style={S.bdg("#00ff88")}>Long</span>
                    <span style={{fontSize:8,color:"#888",background:"rgba(255,68,68,.1)",padding:"2px 6px",borderRadius:3,border:"1px solid rgba(255,68,68,.2)"}}>LEGADO</span>
                  </div>
                  <span style={{fontSize:19,fontWeight:700,color:ethU>=0?"#00ff88":"#ff4444"}}>{fmtNum(ethU)}</span>
                </div>
                <div style={S.grid(105)}>
                  {[
                    {l:"CANTIDAD",v:"1.9521 ETH"},
                    {l:"ENTRADA",v:"$3,621.58"},
                    {l:"ACTUAL",v:"$"+pr.ETH.toLocaleString(),c:pr.ETH>=3621.58?"#00ff88":"#ff4444"},
                  ].map(i=><div key={i.l}><div style={S.lbl}>{i.l}</div><div style={{fontSize:11,fontWeight:600,color:i.c||"#e0e0e0"}}>{i.v}</div></div>)}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8}}>
                  <div style={{background:"rgba(255,68,68,.06)",border:"1px solid rgba(255,68,68,.2)",borderRadius:6,padding:"9px 11px"}}>
                    <div style={{fontSize:8,color:"#555",marginBottom:3}}>STOP LOSS / LIQUIDACION</div>
                    <div style={{fontSize:14,fontWeight:700,color:"#ff6600"}}>~$1,080</div>
                    <div style={{fontSize:9,color:"#ff4444"}}>Perdida real: -$796.09</div>
                  </div>
                  <div style={{background:"rgba(0,255,136,.06)",border:"1px solid rgba(0,255,136,.2)",borderRadius:6,padding:"9px 11px"}}>
                    <div style={{fontSize:8,color:"#555",marginBottom:3}}>TAKE PROFIT / BREAKEVEN</div>
                    <div style={{fontSize:14,fontWeight:700,color:"#00cc66"}}>$9,000</div>
                    <div style={{fontSize:9,color:"#f0b429"}}>BE: $4,029</div>
                  </div>
                </div>
                <div style={S.bar}><div style={S.fill(Math.min(pr.ETH/9000*100,100),"linear-gradient(90deg,#ff4444,#f0b429,#00ff88)")}/></div>
                <button onClick={()=>setModal(m=>({...m,closeEth:true}))}
                  style={{marginTop:8,width:"100%",padding:"7px",background:"rgba(255,68,68,.1)",border:"1px solid rgba(255,68,68,.4)",color:"#ff6666",borderRadius:6,fontSize:9,fontWeight:700,cursor:"pointer"}}>
                  CERRAR POSICION ETH LEGADO
                </button>
              </div>
            )}
            {/* ── ABIERTAS ── */}
            {pos.filter(function(p){return !p.status||p.status==="open";}).length>0&&(
              <div style={{fontSize:9,color:"#00ff88",fontWeight:700,marginBottom:6,letterSpacing:1}}>ABIERTAS ({pos.filter(function(p){return !p.status||p.status==="open";}).length})</div>
            )}
            {pos.filter(function(p){return !p.status||p.status==="open";}).map(p=>{
              const g=getPnL(p);
              const isBE=p.be||p.sl===p.entry;
              const mL=p.sl?p.capital*Math.abs(p.entry-p.sl)/p.entry:0;
              const mG=p.tp?p.capital*Math.abs(p.tp-p.entry)/p.entry:null;
              const noLivePrice=PM[p.asset]===undefined||PM[p.asset]===p.entry;
              return(
                <div key={p.id} style={{...S.card,border:"1px solid "+(noLivePrice?"rgba(255,136,68,.3)":g>=0?"rgba(0,255,136,.25)":"rgba(255,68,68,.15)")}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                    <div style={{display:"flex",gap:7,alignItems:"center",flexWrap:"wrap"}}>
                      <span style={{fontSize:15,fontWeight:700}}>{p.asset}</span>
                      <span style={S.bdg(p.dir==="Short"?"#ff4444":"#00ff88")}>{p.dir}</span>
                      {isBE&&<span style={S.bdg("#00ff88")}>BE</span>}
                      {noLivePrice&&<span style={{fontSize:7,color:"#ff8844",background:"rgba(255,136,68,.1)",padding:"2px 6px",borderRadius:3,border:"1px solid rgba(255,136,68,.3)"}}>⚠ Editar ticker</span>}
                    </div>
                    <div style={{display:"flex",gap:7,alignItems:"center"}}>
                      <span style={{fontSize:19,fontWeight:700,color:noLivePrice?"#ff8844":g>=0?"#00ff88":"#ff4444"}}>{noLivePrice?"sin precio":fmtNum(g)}</span>
                      <button onClick={()=>setModal(m=>({...m,pos:true,posForm:{asset:p.asset,dir:p.dir,capital:p.capital,entry:p.entry,sl:p.sl||"",tp:p.tp||"",tpLevels:p.tpLevels||[],patternId:p.patternId||"",sl_initial:p.sl_initial,sl_modifications:p.sl_modifications||[],thesis_text:p.thesis_text||"",thesis_screenshot_url:p.thesis_screenshot_url||"",broker:p.broker||"quantfury"},editPosId:p.id}))} style={{background:noLivePrice?"rgba(255,136,68,.15)":"transparent",border:"1px solid "+(noLivePrice?"#ff8844":"#2a2a3a"),color:noLivePrice?"#ff8844":"#f0b429",padding:"3px 7px",borderRadius:4,fontSize:9,cursor:"pointer"}}>editar</button>
                      <button onClick={()=>setModal(m=>({...m,close:p}))} style={{background:"rgba(240,180,41,.15)",border:"1px solid #f0b429",color:"#f0b429",padding:"3px 8px",borderRadius:4,fontSize:9,cursor:"pointer",fontWeight:700}}>CERRAR</button>
                    </div>
                  </div>
                  <div style={S.grid(105)}>
                    {[
                      {l:"CAPITAL",v:"$"+p.capital.toLocaleString()},
                      {l:"ENTRADA",v:fmtP(p.entry)},
                      {l:"ACTUAL",v:noLivePrice?"ticker incorrecto":fmtP(PM[p.asset]),c:noLivePrice?"#ff8844":g>=0?"#00ff88":"#ff4444"},
                    ].map(i=><div key={i.l}><div style={S.lbl}>{i.l}</div><div style={{fontSize:11,fontWeight:600,color:i.c||"#e0e0e0"}}>{i.v}</div></div>)}
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:4}}>
                    <div style={{background:"rgba(255,68,68,.06)",border:"1px solid rgba(255,68,68,.2)",borderRadius:6,padding:"9px 11px"}}>
                      <div style={{fontSize:8,color:"#555",marginBottom:3}}>STOP LOSS</div>
                      <div style={{fontSize:14,fontWeight:700,color:"#ff6600"}}>{p.sl?fmtP(p.sl):"--"}</div>
                      <div style={{fontSize:12,fontWeight:700,color:"#ff4444"}}>{isBE?"$0.00":fmtNum(-mL)}</div>
                      {isBE&&<div style={{fontSize:8,color:"#00ff88",marginTop:2}}>RIESGO CERO</div>}
                    </div>
                    {p.tpLevels&&p.tpLevels.length>0?(
                      <div style={{background:"rgba(0,255,136,.04)",border:"1px solid rgba(0,255,136,.2)",borderRadius:6,padding:"9px 11px"}}>
                        <div style={{fontSize:8,color:"#555",marginBottom:5}}>VENTAS PARCIALES</div>
                        {p.tpLevels.map(function(lvl){
                          var lvlG=p.capital*lvl.pct/100*Math.abs(lvl.price-p.entry)/p.entry;
                          return(
                            <div key={lvl.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3,opacity:lvl.hit?0.45:1}}>
                              <div>
                                <span style={{fontSize:10,fontWeight:700,color:lvl.hit?"#444":"#00cc66"}}>{fmtP(lvl.price)}</span>
                                <span style={{fontSize:8,color:"#555",marginLeft:4}}>{lvl.pct}%</span>
                                {lvl.hit&&<span style={{fontSize:8,color:"#00ff88",marginLeft:4}}>✓ cerrado</span>}
                              </div>
                              <span style={{fontSize:10,fontWeight:700,color:lvl.hit?"#444":"#00ff88"}}>{fmtNum(lvlG)}</span>
                            </div>
                          );
                        })}
                        {p.capitalRemaining!==undefined&&p.capitalRemaining<p.capital&&(
                          <div style={{fontSize:8,color:"#f0b429",borderTop:"1px solid #1a1a2a",paddingTop:4,marginTop:4}}>Capital restante: ${Math.round(p.capitalRemaining).toLocaleString()}</div>
                        )}
                      </div>
                    ):(
                      <div style={{background:"rgba(0,255,136,.06)",border:"1px solid rgba(0,255,136,.2)",borderRadius:6,padding:"9px 11px"}}>
                        <div style={{fontSize:8,color:"#555",marginBottom:3}}>TAKE PROFIT</div>
                        <div style={{fontSize:14,fontWeight:700,color:"#00cc66"}}>{p.tp?fmtP(p.tp):"--"}</div>
                        <div style={{fontSize:12,fontWeight:700,color:"#00ff88"}}>{mG?fmtNum(mG):"--"}</div>
                        {mG&&mL&&!isBE&&<div style={{fontSize:8,color:"#555",marginTop:2}}>Ratio 1:{Math.round(mG/mL)}</div>}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          {pos.filter(function(p){return !p.status||p.status==="open";}).length>0&&<PositionAdvisor pos={pos.filter(function(p){return !p.status||p.status==="open";})} PM={PM} getPnL={getPnL} fmtNum={fmtNum} S={S}/>}
            {/* ── EN ESPERA ── */}
            {pos.filter(function(p){return p.status==="pending";}).length>0&&(
              <div style={{marginTop:16}}>
                <div style={{fontSize:9,color:"#f0b429",fontWeight:700,marginBottom:8,letterSpacing:1}}>EN ESPERA ({pos.filter(function(p){return p.status==="pending";}).length})</div>
                {pos.filter(function(p){return p.status==="pending";}).map(function(p){
                  var mL=p.sl?p.capital*Math.abs(p.entry-p.sl)/p.entry:0;
                  var mG=p.tp?p.capital*Math.abs(p.tp-p.entry)/p.entry:null;
                  var liveBase=p.asset.replace(/\/.*$/,"").toUpperCase();
                  var livePrice=pr[liveBase]||0;
                  var distPct=livePrice&&p.entry?((livePrice-p.entry)/p.entry*100):null;
                  var isLongP=p.dir!=="Short";
                  var approaching=distPct!==null&&(isLongP?(distPct>-3&&distPct<0):(distPct<3&&distPct>0));
                  var distColor=distPct===null?"#555":approaching?"#f0b429":Math.abs(distPct)<1?"#00ff88":"#888";
                  return(
                    <div key={p.id} style={{...S.card,border:"1px solid rgba(240,180,41,.25)",marginBottom:8,opacity:0.85}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                        <div style={{display:"flex",gap:7,alignItems:"center"}}>
                          <span style={{fontSize:14,fontWeight:700}}>{p.asset}</span>
                          <span style={S.bdg(p.dir==="Short"?"#ff4444":"#00ff88")}>{p.dir}</span>
                          {p.patternId&&(function(){
                            var pat=pats.find(function(x){return String(x.id)===String(p.patternId);});
                            return pat?<span style={{fontSize:7,color:"#88aaff",background:"rgba(136,170,255,.08)",padding:"2px 6px",borderRadius:3,border:"1px solid rgba(136,170,255,.25)"}}>📊 {pat.name}</span>:null;
                          })()}
                        </div>
                        <div style={{display:"flex",gap:6,alignItems:"center"}}>
                          <button onClick={function(){
                            var updated=pos.map(function(x){return x.id===p.id?{...x,status:"open"}:x;});
                            SPos(updated);
                          }} style={{background:"rgba(0,255,136,.15)",border:"1px solid #00ff88",color:"#00ff88",padding:"3px 9px",borderRadius:4,fontSize:9,cursor:"pointer",fontWeight:700}}>Activar</button>
                          <button onClick={()=>setModal(m=>({...m,pos:true,posForm:{asset:p.asset,dir:p.dir,capital:p.capital,entry:p.entry,sl:p.sl||"",tp:p.tp||"",tpLevels:p.tpLevels||[],patternId:p.patternId||"",status:"pending"},editPosId:p.id}))} style={{background:"transparent",border:"1px solid #2a2a3a",color:"#f0b429",padding:"3px 7px",borderRadius:4,fontSize:9,cursor:"pointer"}}>editar</button>
                          <button onClick={function(){SPos(pos.filter(function(x){return x.id!==p.id;}));}} style={{background:"transparent",border:"1px solid #333",color:"#555",padding:"3px 6px",borderRadius:4,fontSize:9,cursor:"pointer"}}>×</button>
                        </div>
                      </div>
                      <div style={S.grid(105)}>
                        <div><div style={S.lbl}>CAPITAL</div><div style={{fontSize:11,fontWeight:600,color:"#e0e0e0"}}>{"$"+p.capital.toLocaleString()}</div></div>
                        <div>
                          <div style={S.lbl}>ENTRADA ESPERADA</div>
                          <div style={{fontSize:11,fontWeight:600,color:"#e0e0e0"}}>{p.entry?("$"+parseFloat(p.entry).toLocaleString()):"--"}</div>
                          {livePrice>0&&<div style={{fontSize:10,color:distColor,marginTop:2}}>${livePrice.toLocaleString(undefined,{minimumFractionDigits:livePrice>100?2:4,maximumFractionDigits:livePrice>100?2:4})}{distPct!==null&&<span style={{marginLeft:3,opacity:.8}}>({distPct>0?"+":""}{distPct.toFixed(2)}%)</span>}</div>}
                        </div>
                        <div><div style={S.lbl}>RATIO</div><div style={{fontSize:11,fontWeight:600,color:"#e0e0e0"}}>{mG&&mL&&mL>0?"1:"+Math.round(mG/mL):"--"}</div></div>
                      </div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:4}}>
                        <div style={{background:"rgba(255,68,68,.06)",border:"1px solid rgba(255,68,68,.2)",borderRadius:6,padding:"8px 10px"}}>
                          <div style={{fontSize:8,color:"#555",marginBottom:2}}>STOP LOSS</div>
                          <div style={{fontSize:13,fontWeight:700,color:"#ff6600"}}>{p.sl?("$"+parseFloat(p.sl).toLocaleString()):"--"}</div>
                          <div style={{fontSize:11,color:"#ff4444"}}>{mL?("-$"+mL.toFixed(0)):"--"}</div>
                        </div>
                        <div style={{background:"rgba(0,255,136,.06)",border:"1px solid rgba(0,255,136,.2)",borderRadius:6,padding:"8px 10px"}}>
                          <div style={{fontSize:8,color:"#555",marginBottom:2}}>TAKE PROFIT</div>
                          <div style={{fontSize:13,fontWeight:700,color:"#00cc66"}}>{p.tp?("$"+parseFloat(p.tp).toLocaleString()):"--"}</div>
                          <div style={{fontSize:11,color:"#00ff88"}}>{mG?("+$"+mG.toFixed(0)):"--"}</div>
                        </div>
                      </div>
                      {p.note&&<div style={{fontSize:8,color:"#555",marginTop:6,fontStyle:"italic"}}>{p.note}</div>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ═══ HISTORIAL ═══ */}
        {tab==="Historial"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
              <div style={{fontSize:10,color:"#f0b429",fontWeight:700}}>HISTORIAL COMPLETO</div>
              <div style={{fontSize:9,color:"#444"}}>
                {(qfTrades&&qfTrades.length>0)?(
                  <span style={{color:"#00ff88"}}>{qfTrades.length} QF importadas</span>
                ):(
                  <span style={{color:"#555"}}>H0 ({H0.length} hardcodeadas)</span>
                )}
                {xhist.length>0&&<span style={{color:"#666"}}>{" + "+xhist.length+" app"}</span>}
              </div>
            </div>
            <div style={{display:"flex",gap:5,marginBottom:10,flexWrap:"wrap"}}>
              {[["all","Todo"],["quantfury","Quantfury"],["sistema","Con sistema"]].map(function(f){
                return <button key={f[0]} onClick={function(){setHSource(f[0]);}} style={{padding:"3px 8px",borderRadius:3,fontSize:9,fontWeight:700,border:"none",cursor:"pointer",background:hSource===f[0]?"#f0b429":"#1e1e2e",color:hSource===f[0]?"#0a0a0f":"#555"}}>{f[1].toUpperCase()}</button>;
              })}
            </div>
            <div style={S.grid(110)}>
              {[
                {l:"REGISTRADAS",v:hist.length,c:"#e0e0e0"},
                {l:"GANADORAS",v:wins,c:"#00ff88"},
                {l:"PERDEDORAS",v:hist.filter(h=>h.result<0).length,c:"#ff4444"},
                {l:"TASA",v:Math.round(wins/hist.length*100)+"%",c:"#f0b429"},
                {l:"MEJOR",v:fmtNum(Math.max(...hist.map(h=>h.result))),c:"#00ff88"},
                {l:"PEOR",v:fmtNum(Math.min(...hist.map(h=>h.result))),c:"#ff4444"},
              ].map(k=><div key={k.l} style={S.card}><div style={S.lbl}>{k.l}</div><div style={S.val(k.c)}>{k.v}</div></div>)}
            </div>
            {/* Long/Short stats */}
            <div style={{...S.card,marginBottom:10}}>
              <div style={{fontSize:10,color:"#f0b429",fontWeight:700,marginBottom:10}}>LONG vs SHORT</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <div>
                  <div style={{fontSize:9,color:"#00ff88",fontWeight:700,marginBottom:6}}>LONG - {lTot} ops</div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:10,marginBottom:4}}><span style={{color:"#555"}}>Ganadoras</span><span style={{color:"#00ff88",fontWeight:700}}>{lWin}</span></div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:10,marginBottom:4}}><span style={{color:"#555"}}>Perdedoras</span><span style={{color:"#ff4444",fontWeight:700}}>{lLoss}</span></div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:10,marginBottom:6}}><span style={{color:"#555"}}>Breakeven</span><span style={{color:"#888",fontWeight:700}}>{lBE}</span></div>
                  <div style={S.bar}><div style={S.fill(lTot>0?lWin/lTot*100:0,"#00ff88")}/></div>
                  <div style={{fontSize:8,color:"#555",marginTop:2}}>Tasa: {lTot>0?Math.round(lWin/lTot*100):0}%</div>
                </div>
                <div>
                  <div style={{fontSize:9,color:"#ff4444",fontWeight:700,marginBottom:6}}>SHORT - {sTot} ops</div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:10,marginBottom:4}}><span style={{color:"#555"}}>Ganadoras</span><span style={{color:"#00ff88",fontWeight:700}}>{sWin}</span></div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:10,marginBottom:4}}><span style={{color:"#555"}}>Perdedoras</span><span style={{color:"#ff4444",fontWeight:700}}>{sLoss}</span></div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:10,marginBottom:6}}><span style={{color:"#555"}}>Breakeven</span><span style={{color:"#888",fontWeight:700}}>{sBE}</span></div>
                  <div style={S.bar}><div style={S.fill(sTot>0?sWin/sTot*100:0,"#ff4444")}/></div>
                  <div style={{fontSize:8,color:"#555",marginTop:2}}>Tasa: {sTot>0?Math.round(sWin/sTot*100):0}%</div>
                </div>
              </div>
            </div>
            <div style={{display:"flex",gap:7,marginBottom:10,flexWrap:"wrap",alignItems:"center"}}>
              <input style={{...S.inp,width:130}} placeholder="Buscar activo..." value={hSearch} onChange={e=>setHSearch(e.target.value)}/>
              {["all","long","short"].map(f=><button key={f} onClick={()=>setHFilter(f)} style={{padding:"5px 10px",borderRadius:4,fontSize:9,fontWeight:700,border:"none",cursor:"pointer",background:hFilter===f?"#f0b429":"#1e1e2e",color:hFilter===f?"#0a0a0f":"#666"}}>{f.toUpperCase()}</button>)}
              <button onClick={()=>setHSort(s=>s==="desc"?"asc":"desc")} style={{padding:"5px 10px",borderRadius:4,fontSize:9,border:"1px solid #2a2a3a",background:"transparent",color:"#888",cursor:"pointer"}}>{hSort==="desc"?"reciente primero":"antigua primero"}</button>
              <span style={{fontSize:9,color:"#444"}}>{fH.length} resultados</span>
              <button onClick={()=>setShowManualTrade(function(v){return !v;})} style={{marginLeft:"auto",padding:"5px 10px",borderRadius:4,fontSize:9,fontWeight:700,border:"1px solid rgba(240,180,41,.4)",background:"rgba(240,180,41,.1)",color:"#f0b429",cursor:"pointer"}}>+ Añadir trade</button>
            </div>
            {showManualTrade&&(
              <div style={{...S.card,marginBottom:10,border:"1px solid rgba(240,180,41,.3)"}}>
                <div style={{fontSize:9,color:"#f0b429",fontWeight:700,marginBottom:10}}>AÑADIR TRADE CERRADO MANUALMENTE</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                  <div>
                    <div style={S.lbl}>ACTIVO</div>
                    <input style={S.inp} placeholder="BTC, SOL, PEPE..." value={manualForm.asset} onChange={function(e){setManualForm(function(f){return Object.assign({},f,{asset:e.target.value.toUpperCase()});});}}/>
                  </div>
                  <div>
                    <div style={S.lbl}>DIRECCIÓN</div>
                    <div style={{display:"flex",gap:5}}>
                      {["Long","Short"].map(function(d){return(
                        <button key={d} onClick={function(){setManualForm(function(f){return Object.assign({},f,{dir:d});});}}
                          style={{flex:1,padding:"6px",borderRadius:4,fontSize:9,fontWeight:700,border:"none",cursor:"pointer",background:manualForm.dir===d?(d==="Long"?"#00ff88":"#ff4444"):"#1e1e2e",color:manualForm.dir===d?"#0a0a0f":"#666"}}>
                          {d}
                        </button>
                      );})
                      }
                    </div>
                  </div>
                  <div>
                    <div style={S.lbl}>CAPITAL ($)</div>
                    <input type="number" style={S.inp} placeholder="1000" value={manualForm.capital} onChange={function(e){setManualForm(function(f){return Object.assign({},f,{capital:e.target.value});});}}/>
                  </div>
                  <div>
                    <div style={S.lbl}>PRECIO ENTRADA</div>
                    <input type="number" style={S.inp} placeholder="84000" value={manualForm.entry} onChange={function(e){setManualForm(function(f){return Object.assign({},f,{entry:e.target.value});});}}/>
                  </div>
                  <div>
                    <div style={S.lbl}>PRECIO CIERRE</div>
                    <input type="number" style={S.inp} placeholder="= entrada para BE" value={manualForm.close} onChange={function(e){setManualForm(function(f){return Object.assign({},f,{close:e.target.value});});}}/>
                    {manualForm.entry&&manualForm.close&&manualForm.capital&&(function(){
                      var cap=parseFloat(manualForm.capital);
                      var en=parseFloat(manualForm.entry);
                      var cl=parseFloat(manualForm.close);
                      if(!cap||!en||!cl)return null;
                      var res=manualForm.dir==="Long"?cap*(cl-en)/en:cap*(en-cl)/en;
                      return <div style={{fontSize:9,marginTop:3,color:res>0?"#00ff88":res<0?"#ff4444":"#888",fontWeight:700}}>Resultado: {res>=0?"+":""}{res.toFixed(2)}$</div>;
                    })()}
                  </div>
                  <div>
                    <div style={S.lbl}>FECHA (opcional)</div>
                    <input style={S.inp} placeholder="dd/mm/aaaa" value={manualForm.date} onChange={function(e){setManualForm(function(f){return Object.assign({},f,{date:e.target.value});});}}/>
                  </div>
                </div>
                <div style={{marginBottom:8}}>
                  <div style={S.lbl}>NOTA (opcional)</div>
                  <input style={S.inp} placeholder="ej: BE por breakeven prematuro, error técnico..." value={manualForm.note} onChange={function(e){setManualForm(function(f){return Object.assign({},f,{note:e.target.value});});}}/>
                </div>
                <div style={{display:"flex",gap:6}}>
                  <button onClick={function(){
                    var cap=parseFloat(manualForm.capital);
                    var en=parseFloat(manualForm.entry);
                    // Precio cierre: si vacío y es BE, usar entrada directamente
                    var clRaw=manualForm.close===""?manualForm.entry:manualForm.close;
                    var cl=parseFloat(clRaw);
                    if(!manualForm.asset){alert("Indica el activo (ej: BTC, SOL...)");return;}
                    if(!cap||isNaN(cap)){alert("Indica el capital ($)");return;}
                    if(!en||isNaN(en)){alert("Indica el precio de entrada");return;}
                    if(isNaN(cl)){alert("Indica el precio de cierre (usa el mismo que entrada para breakeven)");return;}
                    var res=manualForm.dir==="Long"?cap*(cl-en)/en:cap*(en-cl)/en;
                    var isBE=isNearBE(res,cap)||Math.abs(cl-en)<0.0001;
                    var dateStr=manualForm.date||new Date().toLocaleDateString("es-ES");
                    var note=manualForm.note||(isBE?"⚖️ BE manual":"Trade manual");
                    var entry={id:Date.now(),asset:manualForm.asset,dir:manualForm.dir,cap:cap,result:parseFloat(res.toFixed(2)),date:dateStr,note:note,manualEntry:true};
                    var newX=[entry,...(D.current.xhist||[])];
                    D.current.xhist=newX;setXhist(newX);
                    var psU=Object.assign({},D.current.ps);
                    if(isBE){psU.slBreakeven=(psU.slBreakeven||0)+1;}
                    else if(res<0){psU.slOk=(psU.slOk||0)+1;}
                    else{psU.tpManual=(psU.tpManual||0)+1;}
                    D.current.ps=psU;setPs(psU);
                    // Escribir a localStorage inmediatamente
                    try{localStorage.setItem("td-user",JSON.stringify({pr:D.current.pr,pos:D.current.pos,pats:D.current.pats,jnl:D.current.jnl,ps:psU,xhist:newX,ethClosed:D.current.ethClosed||false,_savedAt:Date.now()}));}catch(e){}
                    save();
                    runAuditForEntry(entry.id);
                    setManualForm({asset:"",dir:"Long",capital:"",entry:"",close:"",note:"",date:""});
                    setShowManualTrade(false);
                  }} style={{...S.btn(true),flex:2,padding:8}}>AÑADIR AL HISTORIAL</button>
                  <button onClick={function(){setShowManualTrade(false);setManualForm({asset:"",dir:"Long",capital:"",entry:"",close:"",note:"",date:""});}} style={{...S.btn(false),flex:1,padding:8}}>CANCELAR</button>
                </div>
              </div>
            )}
            <div style={S.card}>
              <div style={{maxHeight:500,overflowY:"auto"}}>
                {(function(){
                  // Auto-merge TP parcial groups into one entry (same asset+dir+cap+date)
                  var mergeGroups={};
                  fH.forEach(function(h){
                    var isApp=xhist.some(function(x){return x.id===h.id;});
                    if(!isApp)return;
                    var note=h.note||"";
                    if(note.indexOf("parcial")<0)return;
                    var key=h.asset+"_"+h.dir+"_"+h.cap+"_"+(h.date||"");
                    if(!mergeGroups[key])mergeGroups[key]=[];
                    mergeGroups[key].push(h);
                  });
                  Object.keys(mergeGroups).forEach(function(k){if(mergeGroups[k].length<2)delete mergeGroups[k];});
                  // Build absorbed set (all but first of each group are hidden)
                  var absorbedIds={};
                  var mergedData={};
                  Object.keys(mergeGroups).forEach(function(k){
                    var grp=mergeGroups[k];
                    var total=parseFloat(grp.reduce(function(a,x){return a+(x.result||0);},0).toFixed(2));
                    mergedData[grp[0].id]={result:total,note:"TPs completados ("+grp.length+" niveles)"};
                    grp.slice(1).forEach(function(x){absorbedIds[x.id]=true;});
                  });

                  return fH.filter(function(h){return !absorbedIds[h.id];}).map(function(h){
                    var over=mergedData[h.id]||{};
                    var result=over.result!==undefined?over.result:h.result;
                    var note=over.note||h.note||"";
                    var isAppEntry=xhist.some(function(x){return x.id===h.id;});
                    var isQfEntry=h.source==="imported_quantfury";
                    return(
                      <div key={h.id} style={S.row}>
                        <div style={{display:"flex",gap:7,alignItems:"center",flex:1,minWidth:0}}>
                          <span style={{fontSize:9,color:"#444",width:70,flexShrink:0}}>{h.date}</span>
                          <span style={{fontWeight:600}}>{h.asset}</span>
                          <span style={S.bdg(h.dir==="Short"?"#ff4444":"#00ff88")}>{h.dir}</span>
                          {isQfEntry&&<span style={{...S.bdg("#0d2a1a"),color:"#00aa55",fontSize:8,letterSpacing:1}}>QF</span>}
                          {note&&<span style={{...S.bdg(note.includes("LIQUIDACION")?"#ff6600":"#555"),maxWidth:150,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{note}</span>}
                        </div>
                        <div style={{display:"flex",gap:6,alignItems:"center",flexShrink:0}}>
                          <span style={{fontSize:9,color:"#444"}}>${h.cap>=1000?h.cap.toLocaleString():h.cap}</span>
                          <span style={{fontWeight:700,color:result>0?"#00ff88":result<0?"#ff4444":"#666",minWidth:68,textAlign:"right"}}>{result===0?"$0.00":fmtNum(result)}</span>
                          {isAppEntry&&<button title="Eliminar entrada" onClick={function(){
                            var nX=xhist.filter(function(x){return x.id!==h.id;});
                            D.current.xhist=nX;setXhist(nX);
                            // Revertir stats de ps si era un cierre TP auto con resultado positivo
                            if(h.autoClose&&h.result>0&&(h.note||"").indexOf("🎯")===0){
                              var psRev={...D.current.ps};
                              if((psRev.tpAuto||0)>0)psRev.tpAuto=(psRev.tpAuto||0)-1;
                              if(h.ratio!=null&&(psRev.ratioCount||0)>0){
                                psRev.ratioSum=(psRev.ratioSum||0)-h.ratio;
                                psRev.ratioCount=(psRev.ratioCount||0)-1;
                                if(psRev.ratioCount<=0){psRev.ratioSum=0;psRev.ratioCount=0;}
                              }
                              // Recalcular racha desde las entradas restantes (más reciente = índice 0)
                              var newStreak=0;
                              for(var si=0;si<nX.length;si++){
                                var se=nX[si];
                                if(se.autoClose&&se.result>0&&(se.note||"").indexOf("🎯")===0){
                                  newStreak++;
                                }else{
                                  break;
                                }
                              }
                              psRev.tpStreak=newStreak;
                              // bestTpStreak se mantiene como récord histórico, solo actualizar si la racha actual lo supera
                              if(newStreak>(psRev.bestTpStreak||0))psRev.bestTpStreak=newStreak;
                              D.current.ps=psRev;setPs(psRev);
                            }
                            save();
                          }} style={{background:"transparent",border:"none",color:"#3a1a1a",cursor:"pointer",fontSize:11,padding:"0 2px",lineHeight:1}}>✕</button>}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
        )}

        {/* ═══ PATRONES ═══ */}
        {tab==="Patrones"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <div>
                <div style={{fontSize:10,color:"#f0b429",fontWeight:700}}>LIBRO DE PATRONES</div>
                <div style={{fontSize:9,color:"#555",marginTop:2}}>Se guarda automaticamente</div>
              </div>
              <button onClick={()=>setModal(m=>({...m,pat:true,patForm:{name:"",tf:"4h",asset:"BTC/USDT",desc:""},editPatId:null}))} style={S.btn(true)}>+ ANADIR</button>
            </div>
            {pats.map((pt,i)=>{
              const nConf=pt.conf||0;
              const nFail=pt.fail!==undefined?pt.fail:Math.max(0,(pt.obs||0)-(pt.conf||0));
              const nTot=nConf+nFail;
              // rateConf = % de veces que confirmó, rateFail = % de veces que falló
              const rateConf=nTot>0?Math.round(nConf/nTot*100):0;
              const rateFail=nTot>0?Math.round(nFail/nTot*100):0;
              // Color y etiqueta según qué domina
              const mainRate=nFail>nConf?rateFail:rateConf;
              const mainLabel=nFail>nConf?"FALLO":"EXITO";
              const mainColor=nFail>nConf?"#ff4444":rateConf>=70?"#00ff88":rateConf>=50?"#f0b429":"#ff4444";
              const log=pt.log||[];
              return(
                <div key={pt.id} style={{...S.card,border:"1px solid rgba(240,180,41,.3)"}}>
                  {/* Cabecera */}
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                    <div style={{flex:1,paddingRight:10}}>
                      <div style={{fontSize:10,color:"#f0b429",fontWeight:700,marginBottom:3}}>{"#"+String(i+1).padStart(3,"0")}</div>
                      <div style={{fontSize:13,fontWeight:700,color:"#e0e0e0",marginBottom:5}}>{pt.name}</div>
                      <div style={{display:"flex",gap:5}}>
                        <span style={S.bdg("#555")}>{pt.tf}</span>
                        <span style={S.bdg("#555")}>{pt.asset}</span>
                      </div>
                    </div>
                    <div style={{textAlign:"center",background:"#0d0d16",borderRadius:8,padding:"8px 10px",minWidth:75}}>
                      {nTot===0?(
                        <div style={{fontSize:14,fontWeight:700,color:"#555",lineHeight:1}}>--</div>
                      ):(
                        <div>
                          <div style={{fontSize:24,fontWeight:700,color:mainColor,lineHeight:1}}>{mainRate}%</div>
                          <div style={{fontSize:8,color:mainColor,marginTop:2}}>{mainLabel}</div>
                          <div style={{fontSize:7,color:"#444",marginTop:3}}>{rateConf}% OK / {rateFail}% KO</div>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Contadores */}
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:10}}>
                    <div style={{background:"rgba(0,255,136,.08)",border:"1px solid rgba(0,255,136,.3)",borderRadius:6,padding:"8px 6px",textAlign:"center"}}>
                      <div style={{fontSize:24,fontWeight:700,color:"#00ff88"}}>{nConf}</div>
                      <div style={{fontSize:8,color:"#00ff88",marginTop:2}}>CONFIRMO</div>
                    </div>
                    <div style={{background:"rgba(255,68,68,.08)",border:"1px solid rgba(255,68,68,.3)",borderRadius:6,padding:"8px 6px",textAlign:"center"}}>
                      <div style={{fontSize:24,fontWeight:700,color:"#ff4444"}}>{nFail}</div>
                      <div style={{fontSize:8,color:"#ff4444",marginTop:2}}>FALLO</div>
                    </div>
                    <div style={{background:"rgba(240,180,41,.08)",border:"1px solid rgba(240,180,41,.3)",borderRadius:6,padding:"8px 6px",textAlign:"center"}}>
                      <div style={{fontSize:24,fontWeight:700,color:"#f0b429"}}>{nTot}</div>
                      <div style={{fontSize:8,color:"#f0b429",marginTop:2}}>TOTAL</div>
                    </div>
                  </div>
                  {/* Barra */}
                  {nTot>0&&(
                    <div style={{marginBottom:10}}>
                      <div style={{height:8,borderRadius:4,overflow:"hidden",display:"flex"}}>
                        <div style={{width:rateConf+"%",background:"#00ff88",transition:"width .5s",minWidth:rateConf>0?4:0}}/>
                        <div style={{width:rateFail+"%",background:"#ff4444",transition:"width .5s",minWidth:rateFail>0?4:0}}/>
                      </div>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:8,marginTop:3}}>
                        <span style={{color:"#00ff88"}}>{nConf} confirmo ({rateConf}%)</span>
                        <span style={{color:"#ff4444"}}>{nFail} fallo ({rateFail}%)</span>
                      </div>
                    </div>
                  )}
                  {/* Descripcion */}
                  <div style={{fontSize:10,color:"#666",marginBottom:12,lineHeight:1.7,padding:"8px 10px",background:"#0d0d16",borderRadius:6}}>{pt.desc}</div>
                  {/* Imagen externa por URL */}
                  {pt.imgUrl&&(
                    <div style={{marginBottom:12}}>
                      <img
                        src={pt.imgUrl}
                        style={{width:"100%",maxHeight:240,objectFit:"contain",borderRadius:6,background:"#0d0d16",border:"1px solid #1e1e2e"}}
                        alt="patron"
                        onError={e=>{e.target.style.display="none";}}
                      />
                    </div>
                  )}
                  {/* Botones CONFIRMO / FALLO */}
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                    <button onClick={()=>patConfirm(pt.id)} style={{background:"rgba(0,255,136,.12)",border:"2px solid #00ff88",color:"#00ff88",padding:"12px 8px",borderRadius:8,fontSize:12,cursor:"pointer",fontWeight:700}}>CONFIRMO</button>
                    <button onClick={()=>patFail(pt.id)} style={{background:"rgba(255,68,68,.12)",border:"2px solid #ff4444",color:"#ff4444",padding:"12px 8px",borderRadius:8,fontSize:12,cursor:"pointer",fontWeight:700}}>FALLO</button>
                  </div>
                  {/* Acciones */}
                  <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
                    <button onClick={()=>setModal(m=>({...m,pat:true,patForm:{name:pt.name,tf:pt.tf,asset:pt.asset,desc:pt.desc,imgUrl:pt.imgUrl||""},editPatId:pt.id}))} style={{background:"rgba(240,180,41,.08)",border:"1px solid #f0b429",color:"#f0b429",padding:"5px 10px",borderRadius:5,fontSize:9,cursor:"pointer"}}>Editar</button>
                    <button
                      onClick={()=>{
                        const url=prompt("Pega la URL de la imagen (TradingView, Google Fotos, Imgur...):",pt.imgUrl||"");
                        if(url!==null){
                          const updated=D.current.pats.map(x=>x.id===pt.id?{...x,imgUrl:url.trim()}:x);
                          SP(updated);
                        }
                      }}
                      style={{background:"rgba(136,136,136,.08)",border:"1px solid #555",color:"#aaa",padding:"5px 10px",borderRadius:5,fontSize:9,cursor:"pointer"}}
                    >
                      {pt.imgUrl?"🔗 Cambiar URL":"🔗 Pegar URL imagen"}
                    </button>
                    {pt.imgUrl&&(
                      <button
                        onClick={()=>{const updated=D.current.pats.map(x=>x.id===pt.id?{...x,imgUrl:""}:x);SP(updated);}}
                        style={{background:"transparent",border:"1px solid #333",color:"#444",padding:"5px 8px",borderRadius:5,fontSize:9,cursor:"pointer"}}
                      >✕ Quitar</button>
                    )}
                    <button onClick={()=>patDelete(pt.id)} style={{background:"transparent",border:"1px solid #333",color:"#444",padding:"5px 8px",borderRadius:5,fontSize:9,cursor:"pointer"}}>Eliminar</button>
                  </div>
                  {/* Historial ocurrencias */}
                  <div style={{borderTop:"1px solid #1a1a2a",paddingTop:10}}>
                    <div style={{fontSize:9,color:"#f0b429",fontWeight:700,marginBottom:6}}>
                      HISTORIAL {log.length>0?"("+log.length+" registros)":""}
                    </div>
                    {log.length===0?(
                      <div style={{fontSize:9,color:"#333",fontStyle:"italic"}}>Sin registros. Pulsa CONFIRMO o FALLO cada vez que veas este patron.</div>
                    ):(
                      <div style={{maxHeight:150,overflowY:"auto",display:"flex",flexDirection:"column",gap:4}}>
                        {log.map((entry,idx)=>(
                          <div key={idx} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 10px",borderRadius:6,background:entry.result==="conf"?"rgba(0,255,136,.06)":"rgba(255,68,68,.06)",border:"1px solid "+(entry.result==="conf"?"rgba(0,255,136,.2)":"rgba(255,68,68,.2)")}}>
                            <div style={{display:"flex",gap:8,alignItems:"center"}}>
                              <span style={{fontSize:14}}>{entry.result==="conf"?"✅":"❌"}</span>
                              <span style={{fontSize:10,fontWeight:700,color:entry.result==="conf"?"#00ff88":"#ff4444"}}>{entry.result==="conf"?"CONFIRMO":"FALLO"}</span>
                            </div>
                            <span style={{fontSize:9,color:"#555"}}>{entry.date}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ═══ PERFIL ═══ */}
        {tab==="Perfil"&&(
          <div>
            <div style={{fontSize:10,color:"#f0b429",fontWeight:700,marginBottom:12}}>PERFIL PSICOLOGICO</div>
            <div style={{...S.card,border:"1px solid rgba(240,180,41,.3)",marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <div>
                  <div style={S.lbl}>NIVEL ACTUAL</div>
                  <div style={{fontSize:24,fontWeight:700,color:lvColor}}>{lvLabel}</div>
                  <div style={{fontSize:9,color:"#555",marginTop:2}}>Se actualiza en tiempo real</div>
                </div>
                <div style={{fontSize:50,fontWeight:700,color:lvColor}}>{sc}</div>
              </div>
              <div style={S.bar}><div style={S.fill(sc,"linear-gradient(90deg,#ff4444,#f0b429,#00ff88)")}/></div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:8,color:"#444",marginTop:3}}>
                <span>APOSTADOR</span><span>NOVATO</span><span>TRANSICION</span><span>AVANZADO</span><span>PRO</span>
              </div>
            </div>
            <div style={{...S.card,marginBottom:10}}>
              <div style={{fontSize:10,color:"#f0b429",fontWeight:700,marginBottom:10}}>GESTION RIESGO</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <div>
                  {(function(){var slT=(ps.slOk||0)+(ps.slBroken||0)+(ps.slBreakeven||0);return(
                  <div>
                  <div style={{fontSize:9,color:"#555",fontWeight:700,marginBottom:8}}>STOP LOSS</div>
                  <div style={{marginBottom:7}}>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:9,marginBottom:2}}><span style={{color:"#555"}}>SL Respetados</span><span style={{color:"#00ff88",fontWeight:700}}>{ps.slOk||0}/{slT}</span></div>
                    <div style={S.bar}><div style={S.fill(slT>0?(ps.slOk||0)/slT*100:0,"#00ff88")}/></div>
                  </div>
                  <div style={{marginBottom:7}}>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:9,marginBottom:2}}><span style={{color:"#555"}}>⚖️ Breakeven</span><span style={{color:"#88aaff",fontWeight:700}}>{ps.slBreakeven||0}/{slT}</span></div>
                    <div style={S.bar}><div style={S.fill(slT>0?(ps.slBreakeven||0)/slT*100:0,"#88aaff")}/></div>
                  </div>
                  <div>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:9,marginBottom:2}}><span style={{color:"#555"}}>SL Eliminados</span><span style={{color:"#ff4444",fontWeight:700}}>{ps.slBroken||0}/{slT}</span></div>
                    <div style={S.bar}><div style={S.fill(slT>0?(ps.slBroken||0)/slT*100:0,"#ff4444")}/></div>
                  </div>
                  </div>);})()}
                </div>
                <div>
                  <div style={{fontSize:9,color:"#555",fontWeight:700,marginBottom:8}}>TAKE PROFIT Y CIERRES</div>
                  <TpRows ps={ps}/>
                </div>
              </div>
              <button onClick={()=>setModal(m=>({...m,psych:true}))} style={{...S.btn(false),width:"100%",marginTop:8,fontSize:9}}>Actualizar metricas</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
              <div style={S.card}>
                <div style={{fontSize:10,color:"#f0b429",fontWeight:700,marginBottom:8}}>REFLEXIONES IA</div>
                {(function(){var rc=jnl.filter(function(j){return j.fromReflexion;}).length;var bonR=Math.min(5,rc);return(
                  <div>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:9,marginBottom:6}}>
                      <span style={{color:"#88aaff"}}>🧠 Sesiones completadas</span>
                      <span style={{color:"#88aaff",fontWeight:700}}>{rc}</span>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:9,marginBottom:6}}>
                      <span style={{color:"#555"}}>Puntos ganados</span>
                      <span style={{color:"#00ff88",fontWeight:700}}>+{bonR} pts</span>
                    </div>
                    <div style={{fontSize:7,color:"#444",marginTop:4}}>{rc>=5?"✅ Máximo alcanzado":("Faltan "+(5-rc)+" sesiones para el máximo (+5 pts)")}</div>
                    <div style={{fontSize:7,color:"#333",marginTop:4}}>Cada reflexión guiada en el Chat suma 1 punto (máx 5)</div>
                  </div>
                );})()}
              </div>
              <div style={S.card}>
                <div style={{fontSize:10,color:"#f0b429",fontWeight:700,marginBottom:8}}>SCORE: SUBE / BAJA</div>
                {[
                  {l:"SL respetados",c:"#00ff88",pts:"+35 max"},
                  {l:"TP automático / manual",c:"#00ff88",pts:"+20 max"},
                  {l:"Control emocional",c:"#88aaff",pts:"+15 base"},
                  {l:"Patrón confirmado",c:"#88aaff",pts:"+7 c/u"},
                  {l:"🧠 Reflexión IA (máx 5)",c:"#88aaff",pts:"+1 c/u"},
                ].map(function(x){return(
                  <div key={x.l} style={{background:"#0d0d16",borderRadius:4,padding:"5px 8px",border:"1px solid "+x.c+"22",marginBottom:3,display:"flex",justifyContent:"space-between"}}>
                    <span style={{fontSize:8,color:x.c,fontWeight:700}}>{x.l}</span>
                    <span style={{fontSize:8,color:x.c}}>{x.pts}</span>
                  </div>
                );})}
                <div style={{fontSize:8,color:"#ff4444",fontWeight:700,marginTop:7,marginBottom:4}}>PENALIZACIONES ACTUALES</div>
                {(function(){
                  const slT=(ps.slOk||0)+(ps.slBroken||0)+(ps.slBreakeven||0);
                  const slLost=slT>0?parseFloat(((ps.slBroken||0)/slT*35).toFixed(1)):0;
                  const exitTot=(ps.tpAuto||0)+(ps.tpManual||0)+(ps.earlyClose||0)+(ps.manualClose||0);
                  const earlyRatioLost=exitTot>0?parseFloat(((ps.earlyClose||0)/exitTot*20).toFixed(1)):0;
                  const earlyExtraLost=Math.max(0,(ps.earlyClose||0)-3)*3;
                  const revLost=(ps.revenge||0)*10;
                  return[
                    {l:"SL roto ×"+(ps.slBroken||0),pts:"−"+slLost+" pts",c:"#ff4444",v:slLost},
                    {l:"Cierres prematuros ×"+(ps.earlyClose||0)+(earlyExtraLost>0?" ("+Math.max(0,(ps.earlyClose||0)-3)+" extra penalizados)":""),pts:"−"+(earlyRatioLost+earlyExtraLost).toFixed(1)+" pts",c:"#ff6600",v:earlyRatioLost+earlyExtraLost},
                    {l:"Revenge ×"+(ps.revenge||0)+" — PUEDE IR NEGATIVO",pts:revLost>0?"−"+revLost+" pts ⚠️":"✅ Sin impacto",c:"#ff2222",v:revLost},
                  ].map(function(x){return(
                    <div key={x.l} style={{background:x.v>0?"rgba(255,68,68,.08)":"rgba(0,255,136,.04)",borderRadius:4,padding:"5px 8px",border:"1px solid "+(x.v>0?"rgba(255,68,68,.25)":"rgba(0,255,136,.15)"),marginBottom:3,display:"flex",justifyContent:"space-between",gap:6,flexWrap:"wrap"}}>
                      <span style={{fontSize:8,color:x.v>0?x.c:"#00ff88",fontWeight:700}}>{x.l}</span>
                      <span style={{fontSize:8,color:x.v>0?"#ff4444":"#00ff88",fontWeight:700}}>{x.pts}</span>
                    </div>
                  ));
                })()}
              </div>
            </div>
            <ProfileAnalysis ps={ps} pats={pats} jnl={jnl} hist={hist} xhist={xhist} sc={sc} S={S} predictions={predictions}/>
            {/* ── ANALISIS IA ── */}
            <div style={{...S.card,marginBottom:10,border:"1px solid rgba(136,170,255,.25)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:aiProfile&&!aiProfileExpanded?0:10}}>
                <div style={{flex:1,cursor:aiProfile?"pointer":"default"}} onClick={function(){if(aiProfile)setAiProfileExpanded(function(v){return !v;});}}>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <div style={{fontSize:10,color:"#88aaff",fontWeight:700}}>ANALISIS IA DEL TRADER</div>
                    {aiProfile&&<span style={{fontSize:9,color:"#444"}}>{aiProfileExpanded?"▲":"▼"}</span>}
                  </div>
                  <div style={{fontSize:8,color:"#555",marginTop:2}}>
                    {aiProfile?"Generado el "+aiProfile.date+" (Nivel "+aiProfile.score+")"+(aiProfileExpanded?"":" — pulsa para ver"):"Genera un informe completo con IA sobre tu perfil"}
                  </div>
                </div>
                <button
                  onClick={generateAIProfile}
                  disabled={aiProfileLoading}
                  style={{background:aiProfileLoading?"#1e1e2e":"rgba(136,170,255,.15)",border:"1px solid #88aaff",color:aiProfileLoading?"#444":"#88aaff",padding:"7px 12px",borderRadius:6,fontSize:9,fontWeight:700,cursor:aiProfileLoading?"wait":"pointer",flexShrink:0}}
                >
                  {aiProfileLoading?"Analizando...":aiProfile?"Regenerar":"Generar Analisis"}
                </button>
              </div>
              {aiProfile&&aiProfileExpanded&&(
                <div>
                  <div style={{fontSize:10,color:"#aaa",lineHeight:1.8,whiteSpace:"pre-wrap"}}>
                    {aiProfile.text}
                  </div>
                  <button onClick={function(){setAiProfileExpanded(false);}} style={{marginTop:8,background:"transparent",border:"1px solid #333",color:"#555",padding:"5px 12px",borderRadius:4,fontSize:8,cursor:"pointer",width:"100%"}}>
                    ▲ Ver menos
                  </button>
                </div>
              )}
              {!aiProfile&&!aiProfileLoading&&(
                <div style={{fontSize:9,color:"#444",textAlign:"center",padding:"10px 0"}}>
                  Pulsa "Generar Analisis" para que la IA evalue todos tus datos de trading y te de un informe con puntos fuertes, debiles y recomendaciones.
                  <div style={{marginTop:4,color:"#f0b429"}}>Requiere clave API (configurar en Chat)</div>
                </div>
              )}
            </div>
            {sc<65&&(
              <div style={{...S.card,marginBottom:10}}>
                <div style={{fontSize:10,color:"#f0b429",fontWeight:700,marginBottom:6}}>QUE TE FALTA PARA SUBIR</div>
                <div style={{fontSize:10,color:"#666",lineHeight:1.8}}>
                  <div>Respetar el SL en TODAS las operaciones</div>
                  <div>Usar CERRAR para que todo quede registrado</div>
                  <div>Escribir VICTORIA o LECCION despues de cada cierre</div>
                </div>
              </div>
            )}
            {/* ═══ OBJETIVO DE RECUPERACION ═══ */}
            <GoalTracker h0Total={h0Total} ethT={ethT} actPnl={actPnl} xhist={xhist} S={S}/>

          </div>
        )}

        {/* ═══ RECUPERACION ═══ */}
        {tab==="Recuperacion"&&(
          <div>
            <div style={{fontSize:10,color:"#f0b429",fontWeight:700,marginBottom:6}}>HOJA DE RUTA - RECUPERACION</div>
            <div style={{fontSize:9,color:"#555",marginBottom:12}}>Actualiza el precio ETH arriba y los escenarios cambian al instante.</div>
            <div style={S.grid(140)}>
              {[
                {l:"ETH HOY",v:"$"+pr.ETH.toLocaleString(),c:"#f0b429"},
                {l:"PERD. NO REAL. ETH",v:fmtNum(ethU),c:"#ff4444"},
                {l:"PERD. TOTAL ETH",v:fmtNum(ethT),c:"#ff4444"},
                {l:"PERD. HISTORICA",v:fmtNum(h0Total),c:"#ff4444"},
                {l:"PERDIDA GLOBAL",v:fmtNum(h0Total+ethT),c:"#ff4444"},
                {l:"BREAKEVEN ETH",v:"$4,029",c:"#f0b429"},
              ].map(k=><div key={k.l} style={S.card}><div style={S.lbl}>{k.l}</div><div style={S.val(k.c)}>{k.v}</div></div>)}
            </div>
            <div style={S.card}>
              <div style={{fontSize:10,color:"#f0b429",fontWeight:700,marginBottom:10}}>ESCENARIOS POR PRECIO ETH</div>
              {[2000,2500,3000,3621,4029,5000,6000,7000,7390,9000].map(price=>{
                const ethG=(price-3621.58)*1.95209253-796.09;
                const tot=ethG+h0Total;
                const isCur=Math.abs(price-pr.ETH)<300;
                const isBE=Math.abs(price-4029)<100;
                const isRec=Math.abs(price-7390)<100;
                return(
                  <div key={price} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 10px",background:isRec?"rgba(0,255,136,.06)":isBE?"rgba(240,180,41,.06)":isCur?"rgba(240,180,41,.03)":"#0d0d16",borderRadius:5,border:"1px solid "+(isRec?"rgba(0,255,136,.3)":isBE?"rgba(240,180,41,.3)":isCur?"rgba(240,180,41,.2)":"#1a1a2a"),marginBottom:5}}>
                    <div style={{display:"flex",gap:7,alignItems:"center"}}>
                      <span style={{fontSize:14,fontWeight:700,color:isCur?"#f0b429":"#e0e0e0"}}>${price.toLocaleString()}</span>
                      {isCur&&<span style={{...S.bdg("#f0b429"),fontSize:7}}>HOY</span>}
                      {isBE&&<span style={S.bdg("#f0b429")}>BE</span>}
                      {isRec&&<span style={S.bdg("#00ff88")}>RECUPERACION</span>}
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:14,fontWeight:700,color:tot>=0?"#00ff88":"#ff4444"}}>{fmtNum(tot)}</div>
                      <div style={{fontSize:8,color:"#555"}}>ETH: {fmtNum(ethG)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ CALENDARIO ═══ */}
        {tab==="Calendario"&&(
          <CalendarioTab hist={hist} fmtNum={fmtNum}/>
        )}

        <div style={{display:tab==="Alertas"?"block":"none"}}>
          <AlertasTab S={S} predictions={predictions}/>
        </div>

        <div style={{display:tab==="Chat"?"block":"none"}}>
          <ChatTab S={S} pos={pos} PM={PM} pats={pats} ps={ps} sc={sc} jnl={jnl} hist={hist} xhist={xhist} SPs={SPs} SJ={SJ} D={D} save={save} predictions={predictions} SPred={SPred} initialChatMsgs={D.current.chatMsgs||[]}/>
        </div>

        {/* ═══ AUDITORÍA ═══ */}
        {tab==="Auditoría"&&(
          <AuditoriaTab xhist={xhist} S={S} fmtNum={fmtNum} reaudit={runAuditForEntry}/>
        )}

        {/* ═══ IMPORTAR ═══ */}
        {tab==="Importar"&&(
          <ImportarTab S={S} qfTrades={qfTrades} qfOpen={qfOpen} qfMeta={qfMeta} setQfTrades={setQfTrades} setQfOpen={setQfOpen} setQfMeta={setQfMeta}/>
        )}

        {/* ═══ DIAGNÓSTICO ═══ */}
        {tab==="Diagnóstico"&&(
          <DiagnosticoTab S={S} qfTrades={qfTrades} qfOpen={qfOpen} qfMeta={qfMeta}/>
        )}
      </div>

      {/* ═══ MODAL CERRAR POSICION ═══ */}
      {modal.close&&(
        <ModalCerrar
          p={modal.close}
          PM={PM}
          getPnL={getPnL}
          fmtNum={fmtNum}
          fmtP={fmtP}
          closePos={closePos}
          setModal={setModal}
          S={S}
        />
      )}

      {/* ═══ MODAL PRECIOS ═══ */}
      {modal.prices&&(
        <div style={S.modal}><div style={S.mc}>
          <div style={{fontSize:12,color:"#f0b429",fontWeight:700,marginBottom:6}}>ACTUALIZAR PRECIOS</div>
          <div style={{fontSize:9,color:"#555",marginBottom:14}}>Activos abiertos + ETH legado</div>
          {(function(){
            // Detectar automaticamente todos los activos de posiciones abiertas
            var seenKeys=new Set();
            var priceKeys=[];
            pos.forEach(function(p){
              var k=p.asset.replace(/\/.*$/,"").toUpperCase();
              if(!seenKeys.has(k)){seenKeys.add(k);priceKeys.push(k);}
            });
            // ETH siempre (posicion legado)
            if(!seenKeys.has("ETH")){seenKeys.add("ETH");priceKeys.push("ETH");}
            return priceKeys.map(function(k){
              return React.createElement(PriceField,{key:k,label:k,value:(modal.tmpPr&&modal.tmpPr[k]!==undefined?modal.tmpPr[k]:pr[k])||0,onChange:function(v){setModal(function(m){var t=Object.assign({},m.tmpPr||pr);t[k]=v;return Object.assign({},m,{tmpPr:t});});}});
            });
          })()}
          <div style={{display:"flex",gap:7,marginTop:12}}>
            <button onClick={()=>{SPr({...pr,...modal.tmpPr});setModal(m=>({...m,prices:false,tmpPr:null}));}} style={{...S.btn(true),flex:1,padding:8}}>GUARDAR</button>
            <button onClick={()=>setModal(m=>({...m,prices:false,tmpPr:null}))} style={{...S.btn(false),flex:1}}>CANCELAR</button>
          </div>
        </div></div>
      )}

      {/* ═══ MODAL NUEVA/EDITAR OPERACION ═══ */}
      {modal.pos&&(
        <ModalPos
          form={modal.posForm||{asset:"",dir:"Short",capital:"",entry:"",sl:"",tp:"",tpLevels:[],patternId:""}}
          editId={modal.editPosId}
          currentPos={D.current.pos}
          PM={PM}
          pr={pr}
          SPr={SPr}
          SPos={SPos}
          setModal={setModal}
          fmtNum={fmtNum}
          S={S}
          pats={pats}
          jnl={jnl}
          SJ={SJ}
        />
      )}

      {/* ═══ MODAL PATRON ═══ */}
      {modal.pat&&(
        <div style={S.modal}><div style={S.mc}>
          <div style={{fontSize:12,color:"#f0b429",fontWeight:700,marginBottom:14}}>{modal.editPatId?"EDITAR PATRON":"NUEVO PATRON"}</div>
          <div style={{marginBottom:9}}>
            <div style={S.lbl}>NOMBRE</div>
            <input style={S.inp} value={(modal.patForm&&modal.patForm.name)||""||""} onChange={e=>setModal(m=>({...m,patForm:{...m.patForm,name:e.target.value}}))}/>
          </div>
          <div style={{marginBottom:9}}>
            <div style={S.lbl}>DESCRIPCION</div>
            <textarea style={{...S.inp,height:100,resize:"vertical"}} value={(modal.patForm&&modal.patForm.desc)||""||""} onChange={e=>setModal(m=>({...m,patForm:{...m.patForm,desc:e.target.value}}))}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:9}}>
            <div>
              <div style={S.lbl}>TEMPORALIDAD</div>
              <select style={S.inp} value={(modal.patForm&&modal.patForm.tf)||"4h"||"4h"} onChange={e=>setModal(m=>({...m,patForm:{...m.patForm,tf:e.target.value}}))}>
                {["1m","5m","15m","1h","4h","1D","1S","1M"].map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <div style={S.lbl}>ACTIVO</div>
              <input style={S.inp} value={(modal.patForm&&modal.patForm.asset)||""||""} onChange={e=>setModal(m=>({...m,patForm:{...m.patForm,asset:e.target.value}}))}/>
            </div>
          </div>
          <div style={{marginBottom:9}}>
            <div style={S.lbl}>URL IMAGEN (opcional — TradingView, Imgur...)</div>
            <input style={S.inp} placeholder="https://..." value={(modal.patForm&&modal.patForm.imgUrl)||""||""} onChange={e=>setModal(m=>({...m,patForm:{...m.patForm,imgUrl:e.target.value}}))}/>
          </div>
          <div style={{display:"flex",gap:7}}>
            <button onClick={()=>patSave(modal.patForm||{},modal.editPatId)} style={{...S.btn(true),flex:1,padding:8}}>
              {modal.editPatId?"GUARDAR CAMBIOS":"ANADIR PATRON"}
            </button>
            <button onClick={()=>setModal(m=>({...m,pat:false,patForm:null,editPatId:null}))} style={{...S.btn(false),flex:1}}>CANCELAR</button>
          </div>
        </div></div>
      )}

      {/* ═══ MODAL CERRAR ETH LEGADO ═══ */}
      {modal.closeEth&&(
        <ModalCloseEth pr={pr} closeEthLegacy={closeEthLegacy} setModal={setModal} S={S}/>
      )}

      {/* ═══ MODAL METRICAS ═══ */}
      {modal.psych&&(
        <div style={S.modal}><div style={S.mc}>
          <div style={{fontSize:12,color:"#f0b429",fontWeight:700,marginBottom:14}}>METRICAS PSICOLOGICAS</div>
          {[
            ["SL Respetados","slOk"],["SL Breakeven","slBreakeven"],["SL Eliminados","slBroken"],
            ["TP Automatico","tpAuto"],["TP Manual ganador","tpManual"],
            ["Cierres prematuros","earlyClose"],["Cierres manuales BE","manualClose"],
            ["Trading revancha","revenge"],
          ].map(([l,k])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <span style={{fontSize:9,color:"#555"}}>{l}</span>
              <input type="number" style={{...S.inp,width:52,textAlign:"center",padding:"4px 6px"}} value={ps[k]||0} onChange={e=>setPs(s=>({...s,[k]:parseInt(e.target.value)||0}))}/>
            </div>
          ))}
          <div style={{display:"flex",gap:7,marginTop:12}}>
            <button onClick={()=>{SPs({...ps});setModal(m=>({...m,psych:false}));}} style={{...S.btn(true),flex:1,padding:8}}>GUARDAR</button>
            <button onClick={()=>setModal(m=>({...m,psych:false}))} style={{...S.btn(false),flex:1}}>CANCELAR</button>
          </div>
        </div></div>
      )}


    </div>
  );
}

// - SUBCOMPONENTS -
// - INDICADORES -
// - CHAT TAB -
function detectAssetFromText(text){
  var lower=text.toLowerCase();
  var tf="4h";
  if(/\b(semanal|semana|1w|weekly)\b/.test(lower))tf="1w";
  else if(/\b(diario|diaria|1d|daily)\b/.test(lower))tf="1d";
  else if(/\b4h\b|\b4 ?horas?\b/.test(lower))tf="4h";
  else if(/\b1h\b|\b1 ?hora\b|\bhorario\b/.test(lower))tf="1h";
  else if(/\b15m\b|\b15 ?min/.test(lower))tf="15m";
  var cryptos=[
    {p:/\b(btc|bitcoin)\b/,s:"BTCUSDT",d:"BTC/USD"},
    {p:/\b(eth|ethereum|ether)\b/,s:"ETHUSDT",d:"ETH/USD"},
    {p:/\b(sol|solana)\b/,s:"SOLUSDT",d:"SOL/USD"},
    {p:/\b(link|chainlink)\b/,s:"LINKUSDT",d:"LINK/USD"},
    {p:/\b(bnb|binance.?coin)\b/,s:"BNBUSDT",d:"BNB/USD"},
    {p:/\b(xrp|ripple)\b/,s:"XRPUSDT",d:"XRP/USD"},
    {p:/\b(ada|cardano)\b/,s:"ADAUSDT",d:"ADA/USD"},
    {p:/\b(doge|dogecoin)\b/,s:"DOGEUSDT",d:"DOGE/USD"},
    {p:/\b(avax|avalanche)\b/,s:"AVAXUSDT",d:"AVAX/USD"},
    {p:/\b(dot|polkadot)\b/,s:"DOTUSDT",d:"DOT/USD"},
    {p:/\b(uni|uniswap)\b/,s:"UNIUSDT",d:"UNI/USD"},
  ];
  var stocks=[
    {p:/\b(nvda|nvidia)\b/,s:"NVDA",d:"NVDA"},
    {p:/\b(mstr|microstrategy)\b/,s:"MSTR",d:"MSTR"},
    {p:/\b(googl|google|alphabet)\b/,s:"GOOGL",d:"GOOGL"},
    {p:/\b(aapl|apple)\b/,s:"AAPL",d:"AAPL"},
    {p:/\bamd\b/,s:"AMD",d:"AMD"},
    {p:/\b(spy|sp500)\b/,s:"SPY",d:"SPY"},
    {p:/\boxy\b/,s:"OXY",d:"OXY"},
    {p:/\b(rgti|rigetti)\b/,s:"RGTI",d:"RGTI"},
    {p:/\btlt\b/,s:"TLT",d:"TLT"},
    {p:/\b(gld|gold|oro)\b/,s:"GLD",d:"GLD"},
    {p:/\b(mara|marathon digital)\b/,s:"MARA",d:"MARA"},
    {p:/\b(tsla|tesla)\b/,s:"TSLA",d:"TSLA"},
    {p:/\b(meta|facebook)\b/,s:"META",d:"META"},
    {p:/\b(amzn|amazon)\b/,s:"AMZN",d:"AMZN"},
    {p:/\b(msft|microsoft)\b/,s:"MSFT",d:"MSFT"},
  ];
  for(var i=0;i<cryptos.length;i++){if(cryptos[i].p.test(lower))return{symbol:cryptos[i].s,isCrypto:true,tf:tf,display:cryptos[i].d};}
  for(var j=0;j<stocks.length;j++){if(stocks[j].p.test(lower))return{symbol:stocks[j].s,isCrypto:false,tf:tf,display:stocks[j].d};}
  return null;
}

async function getStockData(symbol,tf){
  var intervalMap={"15m":{interval:"15m",range:"5d"},"1h":{interval:"1h",range:"15d"},"4h":{interval:"1h",range:"30d"},"1d":{interval:"1d",range:"1y"},"1w":{interval:"1wk",range:"5y"}};
  var p=intervalMap[tf]||(intervalMap["1d"]);
  var tfLabel=tf==="1w"?"Semanal":tf==="1d"?"Diario":tf==="4h"?"4H":tf==="1h"?"1H":"15M";
  try{
    var r=await fetch("https://query2.finance.yahoo.com/v8/finance/chart/"+symbol+"?interval="+p.interval+"&range="+p.range);
    if(!r.ok)return null;
    var data=await r.json();
    var res=(data.chart&&data.chart.result&&data.chart.result[0])||null;
    if(!res)return null;
    var q=res.indicators&&res.indicators.quote&&res.indicators.quote[0];
    if(!q)return null;
    var closes=(q.close||[]).filter(function(v){return v!=null;});
    var highs=(q.high||[]).filter(function(v){return v!=null;});
    var lows=(q.low||[]).filter(function(v){return v!=null;});
    if(closes.length<2)return null;
    var price=closes[closes.length-1];
    var prev=closes[closes.length-2];
    var change24h=((price-prev)/prev*100).toFixed(2);
    var rsi=calcRSI(closes,14);
    var ema7=calcEMA(closes,7);
    var ema25=calcEMA(closes,25);
    var ema50=calcEMA(closes,50);
    var emaRel=ema7&&ema25?(ema7>ema25?"EMA7 sobre EMA25 (alcista)":"EMA7 bajo EMA25 (bajista)"):"--";
    var sr=calcSRLevels(highs,lows,price);
    return{asset:symbol,tf:tfLabel,price:price.toFixed(2),change24h:change24h,
      rsi:rsi,ema7:ema7?ema7.toFixed(2):null,ema25:ema25?ema25.toFixed(2):null,
      ema50:ema50?ema50.toFixed(2):null,emaRelation:emaRel,
      supports:sr.supports,resistances:sr.resistances,fvgs:[],
      trend:"--",volRatio:"--",high24h:"--",low24h:"--",isCrypto:false};
  }catch(e){return null;}
}

function ChatTab({S,pos,PM,pats,ps,sc,jnl,hist,xhist,SPs,SJ,D,save,predictions,SPred,initialChatMsgs}){
  var INIT_MSG={
    role:"assistant",
    content:"Hola Miguel. Soy tu analista personal.\n\nPuedo analizar cualquier activo de crypto (BTC, ETH, SOL, LINK...) o acciones (NVDA, GOOGL, TSLA, MSTR...) con datos en tiempo real.\n\nSimplemente describeme lo que ves, por ejemplo:\n- \"En 4H en LINK veo una ineficiencia FVG, puedo entrar?\"\n- \"En diario en BTC el RSI esta en 65, hay sobrecompra?\"\n- \"NVDA en semanal, como ve la estructura?\"\n\nNo necesitas seleccionar activo ni temporalidad, yo los detecto de tu mensaje.",
    time:new Date().toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"})
  };
  const[messages,setMessages]=useState(function(){
    // Prioridad: Supabase (initialChatMsgs) > localStorage > mensaje inicial
    if(initialChatMsgs&&initialChatMsgs.length>0)return initialChatMsgs;
    try{var s=localStorage.getItem("td-chat-msgs");if(s){var parsed=JSON.parse(s);if(parsed&&parsed.length>0)return parsed;}}catch(e){}
    return[INIT_MSG];
  });
  const[input,setInput]=useState("");
  const[loading,setLoading]=useState(false);
  const[marketData,setMarketData]=useState(null);
  const[detectedInfo,setDetectedInfo]=useState(null);
  const[apiKey,setApiKey]=useState(function(){return localStorage.getItem("td-anthropic-key")||"";});
  const[showKeyInput,setShowKeyInput]=useState(false);
  const[tmpKey,setTmpKey]=useState("");
  const[pendingImage,setPendingImage]=useState(null);
  const[chatMode,setChatMode]=useState("analisis"); // "analisis" | "reflexion"
  const[expandedPreds,setExpandedPreds]=useState({});
  const[pendingReply,setPendingReply]=useState(null); // {content,asset,tf,savedDate,days,note}
  const listRef=useRef(null);
  const fileInputRef=useRef(null);
  // ── Memoria de opiniones / debate ──
  var chatMemoryRef=useRef(function(){
    try{var s=localStorage.getItem("td-chat-memory");if(s)return JSON.parse(s);}catch(e){}
    return[];
  }());
  function saveChatMemory(mem){
    chatMemoryRef.current=mem;
    try{localStorage.setItem("td-chat-memory",JSON.stringify(mem));}catch(e){}
  }

  // ── Predicciones ──
  const[showPredictions,setShowPredictions]=useState(false);
  const[savingMsgIdx,setSavingMsgIdx]=useState(null); // index del mensaje que se quiere guardar
  const[predNote,setPredNote]=useState("");
  // monitoredMsgs: doble estrategia — contenido exacto + clave corta persistida en localStorage
  // td-monitored-keys: {key120: predId} — persiste entre recargas
  var monitoredMsgs={};
  (function(){
    var savedKeys={};
    try{var sk=localStorage.getItem("td-monitored-keys");if(sk)savedKeys=JSON.parse(sk);}catch(e){}
    var activePredIds={};
    if(predictions){predictions.forEach(function(p){if(p.status==="pending")activePredIds[p.id]=true;});}
    messages.forEach(function(m,i){
      if(m.role!=="assistant")return;
      var mc=typeof m.content==="string"?m.content.trim():"";
      if(!mc)return;
      // Estrategia 1: comparación exacta con predictions
      var exactMatch=predictions&&predictions.some(function(p){
        var pc=typeof p.content==="string"?p.content.trim():"";
        return pc&&pc===mc&&p.status==="pending";
      });
      if(exactMatch){monitoredMsgs[String(i)]=true;return;}
      // Estrategia 2: clave corta persistida (resiste recarga aunque el contenido no esté en memory)
      var key120=mc.slice(0,120);
      var predId=savedKeys[key120];
      if(predId&&activePredIds[predId]){monitoredMsgs[String(i)]=true;}
    });
  })();

  // ── Chat export/import ──
  const[showChatImport,setShowChatImport]=useState(false);
  const[chatImportText,setChatImportText]=useState("");

  // ── Pinned messages ──
  const[pinned,setPinned]=useState(function(){
    try{var s=localStorage.getItem("td-pinned-msgs");if(s)return JSON.parse(s);}catch(e){}
    return[];
  });

  // ── Voz ──
  const[isRecording,setIsRecording]=useState(false);
  const[speechSupported,setSpeechSupported]=useState(false);
  const[pendingVoice,setPendingVoice]=useState(false); // marca el próximo send como voz
  const[voiceSaved,setVoiceSaved]=useState({}); // {msgIdx: true}
  const[voiceSaveIdx,setVoiceSaveIdx]=useState(null); // índice del msg mostrando selector de tipo
  const speechRef=useRef(null);

  useEffect(function(){
    setSpeechSupported(!!(window.SpeechRecognition||window.webkitSpeechRecognition));
  },[]);

  function startVoiceRecording(){
    var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR)return;
    // Toggle off if already recording
    if(speechRef.current){speechRef.current.stop();speechRef.current=null;setIsRecording(false);return;}
    var r=new SR();
    r.lang="es-ES";
    r.continuous=true; // keep recording until stopped
    r.interimResults=true;
    r.onresult=function(e){
      var txt="";
      for(var i=0;i<e.results.length;i++){txt+=e.results[i][0].transcript;}
      setInput(txt);
      setPendingVoice(true);
    };
    r.onend=function(){setIsRecording(false);speechRef.current=null;};
    r.onerror=function(){setIsRecording(false);speechRef.current=null;};
    r.start();
    speechRef.current=r;
    setIsRecording(true);
  }

  function stopAndSendVoice(){
    if(speechRef.current){speechRef.current.stop();speechRef.current=null;}
    setIsRecording(false);
    // sendMessage will be called by user clicking send or Enter after
  }

  function saveChatToDiary(msgContent,isVoice,type,msgIdx){
    var typeLabels={win:"VICTORIA",lesson:"LECCIÓN",mistake:"ERROR",analysis:"ANÁLISIS"};
    var prefix=isVoice?"🎙️ [Audio] ":"💬 [Chat] ";
    var entry={
      id:Date.now(),
      type:type,
      text:prefix+msgContent.slice(0,600),
      date:new Date().toLocaleDateString("es-ES"),
      fromChat:true,
      fromReflexion:chatMode==="reflexion"
    };
    var newJnl=[entry,...(jnl||[])];
    SJ(newJnl);
    setVoiceSaved(function(prev){var n={};Object.keys(prev).forEach(function(k){n[k]=prev[k];});n[String(msgIdx)]=typeLabels[type]||type;return n;});
    setVoiceSaveIdx(null);
  }

  function savePredictions(arr){SPred(arr);}

  function savePinned(arr){
    setPinned(arr);
    try{localStorage.setItem("td-pinned-msgs",JSON.stringify(arr));}catch(e){}
  }

  function togglePin(msg){
    const key=(msg.role||"")+(msg.content||"").slice(0,60)+(msg.time||"");
    const alreadyPinned=pinned.some(function(p){return p._key===key;});
    if(alreadyPinned){
      savePinned(pinned.filter(function(p){return p._key!==key;}));
    }else{
      savePinned([...pinned,{...msg,_key:key}].slice(-10));
    }
  }

  function exportChatMessages(){
    var toExport=messages.slice(-60).map(function(m){return m.image?{...m,image:null}:m;});
    var data=JSON.stringify(toExport);
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(data).then(function(){alert("Chat copiado al portapapeles. Ve al otro dispositivo y usa Importar Chat.");}).catch(function(){setChatImportText(data);setShowChatImport(true);});
    }else{setChatImportText(data);setShowChatImport(true);}
  }

  function importMergeChat(){
    try{
      var incoming=JSON.parse(chatImportText);
      if(!Array.isArray(incoming))throw new Error("formato invalido");
      var combined=[...messages,...incoming];
      var seen=new Set();
      var merged=combined.filter(function(m){
        var key=(m.role||"")+(m.content||"").slice(0,50)+(m.time||"");
        if(seen.has(key))return false;
        seen.add(key);
        return true;
      });
      setMessages(merged);
      setShowChatImport(false);
      setChatImportText("");
      alert(merged.length+" mensajes tras fusionar ("+messages.length+" locales + "+incoming.length+" importados).");
    }catch(e){alert("Error al importar: JSON invalido");}
  }

  function saveMessageAsPrediction(msg,note,userMsg){
    // Guard: evitar duplicados si se pulsa rápido dos veces
    var msgContent=typeof msg.content==="string"?msg.content.trim():"";
    // Usar D.current.predictions (síncrono) en lugar del estado React (puede ser stale en doble-click)
    var alreadySaved=(D.current.predictions||[]).some(function(p){
      return typeof p.content==="string"&&p.content.trim()===msgContent&&p.status==="pending";
    });
    if(alreadySaved){setSavingMsgIdx(null);setPredNote("");return;}
    var asset=detectedInfo?detectedInfo.display:marketData?marketData.asset:"";
    var tf=detectedInfo?detectedInfo.tf:marketData?marketData.tf:"";
    // Fallback: detectar asset desde el contenido del mensaje si no hay contexto activo
    if(!asset){
      var searchText=(msg.content||"").slice(0,400);
      if(userMsg&&userMsg.content)searchText=userMsg.content.slice(0,400)+" "+searchText;
      var fallback=detectAssetFromText(searchText);
      if(fallback){asset=fallback.display||fallback.symbol||"";tf=tf||fallback.tf||"";}
    }
    const now=new Date();
    // Capturar imagen del usuario si existe (limitar a 150KB base64 para no saturar Supabase)
    var userImage=null;
    if(userMsg&&userMsg.image&&userMsg.image.base64){
      var b64=userMsg.image.base64;
      userImage={mediaType:userMsg.image.mediaType||"image/jpeg",base64:b64.length>200000?b64.slice(0,200000):b64};
    }
    const pred={
      id:Date.now(),
      savedDate:now.toLocaleDateString("es-ES"),
      savedTime:now.toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"}),
      timestamp:now.getTime(),
      asset,tf,
      content:msg.content,
      userQuery:(userMsg&&userMsg.role==="user")?userMsg.content.slice(0,400):"",
      userImage:userImage,
      note:note||"",
      status:"pending"
    };
    savePredictions([pred,...predictions]);
    // Persistir clave corta en localStorage para que el badge sobreviva recargas de página
    try{
      var mk={};
      try{var mks=localStorage.getItem("td-monitored-keys");if(mks)mk=JSON.parse(mks);}catch(e){}
      var key120=(typeof pred.content==="string"?pred.content.trim():"").slice(0,120);
      if(key120){mk[key120]=pred.id;localStorage.setItem("td-monitored-keys",JSON.stringify(mk));}
    }catch(e){}
    setSavingMsgIdx(null);
    setPredNote("");
  }

  function resolvePrediction(id,status){
    var resolved=predictions.find(function(p){return p.id===id;});
    savePredictions(predictions.map(function(p){
      return p.id===id?{...p,status,resolvedDate:new Date().toLocaleDateString("es-ES")}:p;
    }));
    // Eliminar la clave del localStorage cuando se resuelve
    if(resolved&&resolved.content){
      try{
        var mk={};
        try{var mks=localStorage.getItem("td-monitored-keys");if(mks)mk=JSON.parse(mks);}catch(e){}
        var key120=(typeof resolved.content==="string"?resolved.content.trim():"").slice(0,120);
        if(key120&&mk[key120]){delete mk[key120];localStorage.setItem("td-monitored-keys",JSON.stringify(mk));}
      }catch(e){}
    }
  }

  function deletePrediction(id){
    savePredictions(predictions.filter(function(p){return p.id!==id;}));
  }

  function resetOldPredictions(){
    var todayStart=new Date();todayStart.setHours(0,0,0,0);
    var kept=predictions.filter(function(p){return p.timestamp&&p.timestamp>=todayStart.getTime();});
    if(!window.confirm("¿Borrar "+( predictions.length-kept.length)+" señales anteriores a hoy? Se conservan las de hoy ("+kept.length+")."))return;
    savePredictions(kept);
    // Limpiar checks de monitorización solo de las predicciones borradas
    try{
      var mc=JSON.parse(localStorage.getItem("td-monitor-checks")||"{}");
      var keptIds={};kept.forEach(function(p){keptIds[p.id]=true;});
      Object.keys(mc).forEach(function(k){if(!keptIds[k])delete mc[k];});
      localStorage.setItem("td-monitor-checks",JSON.stringify(mc));
    }catch(e){}
  }

  function resetAllPredictions(){
    if(!window.confirm("¿Borrar TODAS las predicciones del BOT? Esta acción no se puede deshacer."))return;
    savePredictions([]);
    try{localStorage.removeItem("td-monitor-checks");}catch(e){}
    try{localStorage.removeItem("td-pattern-fb");}catch(e){}
    try{localStorage.removeItem("td-tg-answered");}catch(e){}
  }

  function daysSince(timestamp){
    return Math.floor((Date.now()-timestamp)/(1000*60*60*24));
  }

  function handleImageFile(e){
    var file=e.target.files[0];
    if(!file)return;
    var reader=new FileReader();
    reader.onload=function(ev){
      var originalDataUrl=ev.target.result;
      var originalB64=originalDataUrl.split(",")[1];
      var img=new Image();
      img.onload=function(){
        try{
          // Redimensionar a máx 1280px — suficiente para leer gráficos con claridad
          var MAX=1280;
          var w=img.width,h=img.height;
          if(w>MAX){h=Math.round(h*(MAX/w));w=MAX;}
          if(h>MAX){w=Math.round(w*(MAX/h));h=MAX;}
          var canvas=document.createElement("canvas");
          canvas.width=w;canvas.height=h;
          var ctx=canvas.getContext("2d");
          // Fondo negro (igual que gráficos dark) para evitar bordes blancos en transparencias
          ctx.fillStyle="#000000";
          ctx.fillRect(0,0,w,h);
          ctx.drawImage(img,0,0,w,h);
          // JPEG 0.95: calidad alta — evita artefactos que oscurecen los gráficos dark
          var b64=canvas.toDataURL("image/jpeg",0.95).split(",")[1];
          // Validar que canvas funcionó (si devuelve <1KB es que falló, usar original)
          if(!b64||b64.length<1000){
            var lim=originalB64.length>700000?originalB64.slice(0,700000):originalB64;
            setPendingImage({base64:lim,mediaType:file.type||"image/jpeg",name:file.name});
          }else{
            setPendingImage({base64:b64,mediaType:"image/jpeg",name:file.name});
          }
        }catch(canvasErr){
          var lim2=originalB64.length>700000?originalB64.slice(0,700000):originalB64;
          setPendingImage({base64:lim2,mediaType:file.type||"image/jpeg",name:file.name});
        }
      };
      img.onerror=function(){
        // Formato no soportado (HEIC, etc.) → usar original con límite
        var lim3=originalB64.length>700000?originalB64.slice(0,700000):originalB64;
        setPendingImage({base64:lim3,mediaType:file.type||"image/jpeg",name:file.name});
      };
      img.src=originalDataUrl;
    };
    reader.readAsDataURL(file);
    e.target.value="";
  }

  useEffect(function(){
    var el=listRef.current;
    if(!el)return;
    var distFromBottom=el.scrollHeight-el.scrollTop-el.clientHeight;
    if(distFromBottom<=120)el.scrollTop=el.scrollHeight;
  },[messages]);

  useEffect(function(){
    try{
      // Solo guardar mensajes de análisis — los de reflexión no se persisten
      var analysisOnly=messages.filter(function(m){return !m.isReflexion;});
      var toSave=analysisOnly.slice(-60).map(function(m){
        if(m.image&&m.image.base64&&m.image.base64.length>200000){
          return{...m,image:{...m.image,base64:m.image.base64.slice(0,200000)}};
        }
        return m;
      });
      localStorage.setItem("td-chat-msgs",JSON.stringify(toSave));
      // Sincronizar con Supabase: solo texto, sin imágenes, últimos 40 mensajes de análisis
      var forSupabase=analysisOnly.slice(-40).map(function(m){return m.image?{...m,image:null}:m;});
      D.current.chatMsgs=forSupabase;
      save();
    }catch(e){
      try{
        var slim=messages.filter(function(m){return !m.isReflexion;}).slice(-60).map(function(m){return m.image?{...m,image:null}:m;});
        localStorage.setItem("td-chat-msgs",JSON.stringify(slim));
        D.current.chatMsgs=slim.slice(-40);
        save();
      }catch(e2){}
    }
  },[messages]);

  function buildSystemPrompt(md,withImage){
    const allHist=[...xhist,...hist];
    const wins=allHist.filter(function(h){return h.result>0;}).length;
    const losses=allHist.filter(function(h){return h.result<0;}).length;
    const winRate=allHist.length>0?Math.round(wins/allHist.length*100):0;
    const totalPnl=allHist.reduce(function(s,h){return s+h.result;},0).toFixed(2);
    const recentTrades=allHist.slice(-5).map(function(h){
      return h.asset+" "+(h.dir||"")+" "+(h.result>0?"+" :"")+h.result.toFixed(0)+"$";
    }).join(", ")||"Sin historial";
    const assetStats={};
    allHist.forEach(function(h){
      if(!assetStats[h.asset])assetStats[h.asset]={w:0,l:0,pnl:0};
      if(h.result>0)assetStats[h.asset].w++;
      else assetStats[h.asset].l++;
      assetStats[h.asset].pnl+=h.result;
    });
    const bestAsset=Object.keys(assetStats).sort(function(a,b){return assetStats[b].pnl-assetStats[a].pnl;})[0];
    const worstAsset=Object.keys(assetStats).sort(function(a,b){return assetStats[a].pnl-assetStats[b].pnl;})[0];

    const openPositions=pos.map(function(p){
      return p.asset+" "+p.dir+" entrada $"+p.entry+" SL $"+(p.sl||"--")+" TP $"+(p.tp||"--")+(p.be?" [BE]":"");
    }).join(", ")||"Sin posiciones abiertas";
    const confirmedPats=pats.filter(function(p){return p.conf>0;}).map(function(p){
      return p.name+" ("+Math.round(p.conf/(p.obs||1)*100)+"% exito, "+p.conf+"/"+p.obs+" obs)";
    }).join(", ")||"Sin patrones confirmados";
    const recentJournal=jnl.slice(0,8).map(function(j){
      var tag=j.fromChat?"[CHAT] ":""; return tag+j.type.toUpperCase()+": "+j.text.slice(0,100);
    }).join(" | ")||"Sin entradas";
    const slTotal=(ps.slOk||0)+(ps.slBroken||0)+(ps.slBreakeven||0);
    const slRate=slTotal>0?Math.round(((ps.slOk||0)+(ps.slBreakeven||0)*0.5)/slTotal*100):100;

    var mdContext="";
    if(md){
      const rsiStatus=md.rsi<30?"SOBREVENTA ⚠️":md.rsi>70?"SOBRECOMPRA ⚠️":"NEUTRO";
      const supStr=md.supports&&md.supports.length>0?md.supports.map(function(s){return"$"+s;}).join(" | "):"ninguno detectado";
      const resStr=md.resistances&&md.resistances.length>0?md.resistances.map(function(r){return"$"+r;}).join(" | "):"ninguna detectada";
      const fvgStr=md.fvgs&&md.fvgs.length>0?md.fvgs.map(function(f){return f.type.toUpperCase()+" $"+f.bot+"-$"+f.top+" (hace "+f.age+" velas)";}).join(" | "):"ninguna cercana";
      var divText="Sin divergencia/convergencia detectada";
      if(md.divResult){
        var dr=md.divResult;
        if(dr.kind==="divergence"&&dr.type==="bullish")divText="🟢 DIVERGENCIA ALCISTA — precio LL + RSI HL (posible giro al alza)";
        else if(dr.kind==="divergence"&&dr.type==="bearish")divText="🔴 DIVERGENCIA BAJISTA — precio HH + RSI LH (posible giro a la baja)";
        else if(dr.kind==="convergence"&&dr.type==="bullish")divText="📈 CONVERGENCIA ALCISTA — precio HL + RSI HL (confirma tendencia alcista)";
        else if(dr.kind==="convergence"&&dr.type==="bearish")divText="📉 CONVERGENCIA BAJISTA — precio LH + RSI LH (confirma tendencia bajista)";
      }
      mdContext="\n\n=== DATOS DE MERCADO EN TIEMPO REAL ("+md.asset+" "+md.tf+") ===\n"+
        "Precio actual: $"+md.price+" | Cambio 24h: "+md.change24h+"%\n"+
        "RSI 14: "+md.rsi+" → "+rsiStatus+"\n"+
        "Divergencia/Convergencia RSI: "+divText+"\n"+
        "EMA7: $"+md.ema7+" | EMA25: $"+md.ema25+" | EMA50: $"+md.ema50+"\n"+
        "Relacion EMAs: "+md.emaRelation+"\n"+
        "Estructura: "+md.trend+" | Volumen: "+md.volRatio+"x media\n"+
        "SOPORTES cercanos (debajo del precio): "+supStr+"\n"+
        "RESISTENCIAS cercanas (encima del precio): "+resStr+"\n"+
        "INEFICIENCIAS FVG cercanas (±5%): "+fvgStr;
    }

    // Analisis de cierres para el chat
    const totCloseC=(ps.tpAuto||0)+(ps.tpManual||0)+(ps.earlyClose||0)+(ps.manualClose||0);
    const tpPctC=totCloseC>0?Math.round(((ps.tpAuto||0)+(ps.tpManual||0))/totCloseC*100):0;
    const earlyPctC=totCloseC>0?Math.round((ps.earlyClose||0)/totCloseC*100):0;
    const closeDocsC=jnl.filter(function(j){return j.linkedClose;});
    const recentCloseDocsC=closeDocsC.slice(0,3).map(function(j){
      const ct=j.linkedClose==="tp"?"TP":j.linkedClose==="sl"?"SL":"Manual";
      return "["+ct+"/"+j.type+"] "+j.text.slice(0,80);
    }).join(" | ");

    // Predicciones pendientes con días transcurridos
    var predContext="";
    var pendingPreds=predictions.filter(function(p){return p.status==="pending";});
    if(pendingPreds.length>0){
      predContext="\n\n=== PREDICCIONES PENDIENTES (lo que dijiste en conversaciones anteriores) ===\n"+
        "IMPORTANTE: El trader puede estar preguntando sobre una de estas predicciones.\n"+
        "Si hace referencia a algo que dijiste antes, compara con los datos actuales y recalcula.\n";
      pendingPreds.slice(0,5).forEach(function(p){
        var days=Math.floor((Date.now()-p.timestamp)/(1000*60*60*24));
        var hours=Math.floor((Date.now()-p.timestamp)/(1000*60*60));
        var timeStr=days>=1?days+" dias":hours+" horas";
        predContext+="["+p.savedDate+" — hace "+timeStr+"] "+
          (p.asset?"("+p.asset+(p.tf?" "+p.tf:"")+"): ":"")+
          p.content.slice(0,300).replace(/\n/g," ")+
          (p.note?" | NOTA TRADER: "+p.note:"")+"\n";
      });
    }

    var pinnedContext="";
    if(pinned.length>0){
      pinnedContext="\n\n=== MENSAJES ANCLADOS (contexto permanente elegido por el trader) ===\n";
      pinned.forEach(function(p){
        pinnedContext+="["+p.time+"] "+(p.role==="user"?"TRADER":"BOT")+": "+
          (p.content||"").slice(0,400).replace(/\n/g," ")+"\n";
      });
    }

    var memOpinions=chatMemoryRef.current||[];
    var memContext="";
    if(memOpinions.length>0){
      memContext="\n\n=== MEMORIA DE OPINIONES Y FILOSOFIA DEL TRADER (acumulada de conversaciones anteriores) ===\n";
      memOpinions.slice(-20).forEach(function(op){
        memContext+="["+op.date+"] "+op.opinion+"\n";
      });
      memContext+="Usa esta memoria para: (1) no repetirte explicando cosas que ya sabe, (2) referenciar sus propias palabras cuando sea util, (3) desafiar si contradice algo que antes afirmo, (4) reconocer cuando ha evolucionado su pensamiento.\n";
    }
    var imageSection=withImage?
      "=== ANALISIS DE GRAFICO (IMAGEN ADJUNTA) ===\n"+
      "El usuario ha enviado una imagen de grafico. Tu primera tarea es identificar TODOS los patrones chartistas visibles.\n\n"+
      "PASO 1 — CONTEXTO DEL GRAFICO:\n"+
      "- Identifica el activo y temporalidad si son visibles\n"+
      "- Describe la estructura general: tendencia (alcista/bajista/lateral), fase (impulso, consolidacion, distribucion)\n\n"+
      "PASO 2 — PATRONES CHARTISTAS (busca activamente cada uno):\n"+
      "• Banderín alcista/bajista (Pennant): asta fuerte + consolidacion triangular + ruptura\n"+
      "• Bandera (Flag): impulso fuerte + canal contra-tendencia de 5-15 velas\n"+
      "• Cuña alcista/bajista (Rising/Falling Wedge): dos lineas convergentes con misma direccion\n"+
      "• Triangulo simetrico/ascendente/descendente: convergencia horizontal o inclinada\n"+
      "• Doble techo (M) / Doble suelo (W): dos maximos o minimos al mismo nivel con vallee entre ellos\n"+
      "• Hombro-Cabeza-Hombro (HCH) / HCH invertido: tres picos, el central mas alto/bajo\n"+
      "• Canal alcista/bajista: precio rebotando entre dos lineas paralelas\n"+
      "• Copa con asa (Cup & Handle): fondo redondeado + pequena consolidacion lateral\n"+
      "• Rectangulo/Rango: soporte y resistencia horizontales bien definidos\n\n"+
      "PASO 3 — NIVELES CLAVE VISIBLES:\n"+
      "- Soportes: niveles donde el precio ha rebotado al alza\n"+
      "- Resistencias: niveles donde el precio ha rebotado a la baja\n"+
      "- Linea de cuello (si HCH)\n"+
      "- Punto de ruptura del patron (si aplica)\n\n"+
      "PASO 4 — PROYECCION:\n"+
      "- Si hay patron con ruptura: calcula objetivo = altura del patron proyectada desde ruptura\n"+
      "- Indica si la ruptura ya ocurrio o esta pendiente\n"+
      "- Señal de entrada, stop loss sugerido, y objetivo\n\n"+
      "PASO 5 — CONFIRMACION CON DATOS EN TIEMPO REAL:\n"+
      "- Combina lo que ves en la imagen con los datos de RSI/EMA/FVG disponibles arriba\n\n"+
      "FORMATO DE RESPUESTA cuando hay imagen:\n"+
      "📊 PATRON(ES) DETECTADO(S): [lista de patrones]\n"+
      "📍 NIVELES CLAVE: S: [soporte] / R: [resistencia]\n"+
      "🎯 PROYECCION: [objetivo si hay ruptura]\n"+
      "📈 SEÑAL: [LONG/SHORT/ESPERAR] con SL en [precio] y TP en [precio]\n"+
      "⚡ CONTEXTO INDICADORES: [RSI + EMAs del tiempo real]\n\n"
      :"";
    return "Eres analista tecnico de trading Y compañero intelectual de Miguel. Tu mision es doble: dar analisis puros de mercado Y debatir activamente sus ideas de trading.\n\n"+
      mdContext+predContext+pinnedContext+memContext+"\n\n"+
      imageSection+
      "=== REGLAS DE RESPUESTA ===\n"+
      "1. Tu analisis se basa EXCLUSIVAMENTE en los datos de mercado arriba (RSI, EMAs, soportes, resistencias, FVGs)\n"+
      "2. Si el usuario adjunta un grafico/imagen, sigue el formato de ANALISIS DE GRAFICO definido arriba\n"+
      "3. Combina el grafico (si hay) con los datos en tiempo real\n"+
      "4. Si hay PREDICCIONES PENDIENTES y el usuario hace referencia a una conversacion anterior, compara lo que dijiste con los datos ACTUALES y recalcula tiempos y precios\n"+
      "5. NO menciones el historial de operaciones del trader ni sus patrones en el analisis tecnico\n"+
      "6. Responde en espanol, directo y tecnico, max 350 palabras si hay imagen (mas espacio para el analisis)\n"+
      "7. Sin imagen: Estructura: [Estado EMAs] → [RSI] → [S/R relevante] → [FVGs cercanas] → [Conclusion]\n"+
      "8. Con imagen: usa el formato de 5 pasos definido arriba\n\n"+
      "=== MODO DEBATE Y APRENDIZAJE (CRITICO) ===\n"+
      "- Si Miguel expresa una opinion, creencia o filosofia de trading: no la aceptes ciegamente. Evalua si es correcta. Si tiene fallos, dilos directamente pero con respeto.\n"+
      "- Usa frases como: 'Eso no siempre funciona asi porque...', 'Ojo — hay un matiz importante:', 'Discrepo en esto:', 'Eso tiene logica pero el riesgo es...'\n"+
      "- Si Miguel dice algo que contradice su propia memoria de opiniones guardada arriba: señalalo. Ejemplo: 'Antes dijiste X, ahora dices Y — ¿has cambiado de vision?'\n"+
      "- Cuando el debate aporte valor (nueva tesis, nueva creencia, nueva filosofia detectada), añade al final en linea aparte:\n"+
      "OPINION_APRENDIDA:[resumen de la opinion o creencia del trader en max 20 palabras]\n"+
      "(Esta etiqueta es invisible para Miguel. Solo cuando la conversacion tenga una opinion clara y concreta del trader.)\n\n"+
      "DIVERGENCIA vs CONVERGENCIA RSI:\n"+
      "- Divergencia alcista: precio hace LL, RSI hace HL → señal de giro al alza (momentum se recupera antes que el precio)\n"+
      "- Divergencia bajista: precio hace HH, RSI hace LH → señal de giro a la baja (momentum se agota)\n"+
      "- Convergencia alcista: precio HL + RSI HL → confirma tendencia alcista (seguir la tendencia)\n"+
      "- Convergencia bajista: precio LH + RSI LH → confirma tendencia bajista\n"+
      "Siempre menciona si hay divergencia o convergencia cuando analices el RSI.\n\n"+
      "BANDERÍN ALCISTA (Bullish Pennant) — patrón de continuación:\n"+
      "Estructura: 3 partes — (1) Asta: fuerte impulso alcista con velas grandes y volumen creciente. (2) Consolidación triangular: máximos decrecientes + mínimos crecientes + volumen decreciente, duración corta (5-20 velas). (3) Ruptura alcista: precio rompe la línea superior con volumen creciente.\n"+
      "Objetivo: se proyecta la altura del asta desde el punto de ruptura (+ buscar FVG superior cercana como target alternativo).\n"+
      "FALSA RUPTURA — señales de alerta: (1) Mecha superior > cuerpo en vela de ruptura (cierre débil). (2) Volumen de ruptura < media de la consolidación. (3) Precio cierra de vuelta dentro del triángulo. (4) Divergencia bajista RSI en la ruptura.\n"+
      "Si el usuario pregunta sobre un banderín alcista que ve en el gráfico: analiza si el asta es suficientemente fuerte (>3%), si la consolidación es triangular (máximos bajan, mínimos suben), y si la ruptura tiene volumen. Calcula objetivo = punto de ruptura + altura del asta, y verifica FVG alcista superior.\n\n"+
      "=== PERFIL (SOLO para EVALUACION_TRADER al final) ===\n"+
      "Nivel trader: "+sc+"/100 | Tasa ganadora: "+winRate+"% | P&L: $"+totalPnl+"\n"+
      "SL respetados: "+slRate+"% | Cierre anticipado: "+earlyPctC+"% | Revancha: "+(ps.revenge||0)+"x\n"+
      "Posiciones abiertas: "+openPositions+"\n\n"+
      "Termina SIEMPRE con (en linea aparte, sin mostrarla al usuario):\n"+
      "EVALUACION_TRADER:[positivo|negativo|neutro]:[max 15 palabras sobre estado psicologico]";
  }

  function clearChat(){
    setMessages([INIT_MSG]);
    setMarketData(null);
    setDetectedInfo(null);
    try{localStorage.removeItem("td-chat-msgs");}catch(e){}
  }

  function buildReflexionPrompt(){
    // Prompt enfocado en coaching psicológico, NO en análisis técnico
    const allHist=[...xhist,...hist];
    const recentTrades=allHist.slice(-5).map(function(h){
      return h.asset+" "+(h.dir||"")+" "+(h.result>0?"+":"")+h.result.toFixed(0)+"$ ("+h.note+")";
    }).join("\n")||"Sin historial reciente";
    const recentJournal=jnl.slice(0,6).map(function(j){
      return j.type.toUpperCase()+": "+j.text.slice(0,120);
    }).join("\n")||"Sin entradas de diario";
    const slTotal=(ps.slOk||0)+(ps.slBroken||0)+(ps.slBreakeven||0);
    const slRate=slTotal>0?Math.round(((ps.slOk||0)+(ps.slBreakeven||0)*0.5)/slTotal*100):100;
    var memOpR=chatMemoryRef.current||[];
    var memCtxR="";
    if(memOpR.length>0){
      memCtxR="\n=== MEMORIA DE OPINIONES Y FILOSOFIA DEL TRADER (sesiones anteriores) ===\n";
      memOpR.slice(-20).forEach(function(op){memCtxR+="["+op.date+"] "+op.opinion+"\n";});
      memCtxR+="Utiliza esta memoria para no repetir lecciones ya aprendidas y para detectar si Miguel contradice o evoluciona sus propias creencias.\n";
    }
    return "Eres el coach psicológico personal de Miguel, un trader que busca convertirse en profesional.\n"+
      "Tu rol en este modo es coaching mental — pero también debates activamente sus ideas cuando detectas patrones mentales limitantes o creencias erróneas.\n"+
      "NO hagas análisis técnico del mercado a menos que Miguel lo pida explícitamente.\n"+
      "Responde siempre en español, de forma empática pero directa — no solo valides, también reta.\n\n"+
      "PERFIL DEL TRADER:\n"+
      "Score psicológico: "+sc+"/100\n"+
      "SL respetados: "+ps.slOk+" / "+slTotal+" ("+slRate+"%)\n"+
      "Cierres prematuros: "+(ps.earlyClose||0)+" — principal área de mejora\n"+
      "Revenge trading: "+(ps.revenge||0)+" episodios\n\n"+
      "ÚLTIMAS OPERACIONES:\n"+recentTrades+"\n\n"+
      "DIARIO PSICOLÓGICO RECIENTE:\n"+recentJournal+"\n"+
      memCtxR+"\n"+
      "INSTRUCCIONES:\n"+
      "- Reconoce los sentimientos que expresa Miguel. Valídalos.\n"+
      "- Si cometió un error, ayúdale a extraer el aprendizaje sin juzgar.\n"+
      "- Si hizo algo bien (confió en su estrategia, respetó el plan), refuérzalo positivamente.\n"+
      "- Conecta su relato con patrones de su historial cuando sea relevante.\n"+
      "- DEBATE: si Miguel expresa una creencia psicológica o filosófica sobre trading que es limitante o incorrecta, cuestiónala directamente. Ejemplo: 'Eso que describes es sesgo de confirmación — ten cuidado porque...'\n"+
      "- Si contradice algo de su memoria de opiniones: señálalo. 'Antes decías X, ahora sientes Y — ¿has cambiado de perspectiva?'\n"+
      "- Máximo 3-4 frases. Conciso, personal, sin listas largas.\n"+
      "- El objetivo final es construir su perfil psicológico como trader profesional.\n\n"+
      "=== ETIQUETAS OCULTAS (añadelas al final, el usuario NO las ve) ===\n"+
      "Siempre que puedas evaluar su estado, añade en línea aparte:\n"+
      "EVALUACION_TRADER:[positivo|negativo|neutro]:[max 15 palabras sobre su estado psicológico]\n"+
      "Si detectas rasgos psicológicos relevantes en su relato, añade también:\n"+
      "PERFIL_TRADER:[rasgo1,rasgo2,...]\n"+
      "Ejemplos de rasgos: impaciente,disciplinado_sl,miedo_perdidas,sobreconfiado,autocritico_excesivo,busca_validacion,resiliente,analítico,emocional_en_perdidas,respeta_plan\n"+
      "Solo incluye rasgos que hayas observado claramente en esta conversación.\n"+
      "Si detectas una opinion o creencia clara del trader sobre trading o psicologia, añade:\n"+
      "OPINION_APRENDIDA:[resumen de la opinion en max 20 palabras]";
  }

  async function sendMessage(){
    if(!input.trim()||loading)return;
    if(!apiKey){
      setMessages(function(prev){return [...prev,{role:"assistant",content:"Configura tu clave API de Anthropic con el boton (🔑) arriba.",time:new Date().toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"})}];});
      return;
    }
    const img=pendingImage;
    var isVoiceMsg=pendingVoice;
    var isReflexion=chatMode==="reflexion";
    var replySnap=pendingReply;
    // Contenido que ve el usuario en el chat = su texto limpio
    // Contenido que recibe Claude = cita del análisis anterior + pregunta nueva
    var apiContent=input;
    if(replySnap){
      apiContent="[ANÁLISIS ANTERIOR QUE REFERENCIO ("+replySnap.savedDate+", hace "+(replySnap.days===0?"hoy":replySnap.days+" días")+
        (replySnap.asset?" — "+replySnap.asset+(replySnap.tf?" "+replySnap.tf:""):"")+"):\n"+
        replySnap.content+(replySnap.note?"\n\nNota: "+replySnap.note:"")+
        "]\n\nMI PREGUNTA AHORA: "+input;
    }
    const userMsg={role:"user",content:input,apiContent:apiContent,time:new Date().toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"}),image:img||null,isVoice:isVoiceMsg,isReflexion:isReflexion,replyTo:replySnap||null};
    const newMessages=[...messages,userMsg];
    setMessages(newMessages);
    var currentInput=input;
    setInput("");
    setPendingImage(null);
    setPendingVoice(false);
    setPendingReply(null);
    // Stop any active recording when sending
    if(speechRef.current){speechRef.current.stop();speechRef.current=null;setIsRecording(false);}
    setLoading(true);

    try{
      var md=null;
      var systemPrompt="";
      if(isReflexion){
        // Modo reflexión: coaching psicológico, sin mercado, sin guardar en historial
        systemPrompt=buildReflexionPrompt();
      }else{
        // Modo análisis: comportamiento normal con datos de mercado
        var detected=detectAssetFromText(currentInput);
        if(detected){
          setDetectedInfo(detected);
          if(detected.isCrypto){
            md=await getBinanceData(detected.symbol,detected.tf,[],[]);
          }else{
            md=await getStockData(detected.symbol,detected.tf);
          }
          if(md)setMarketData(md);
        }else if(marketData){
          md=marketData;
        }
        systemPrompt=buildSystemPrompt(md,!!img);
      }
      // Only include messages from the current chat mode in API context
      var contextMessages=newMessages.filter(function(m){return isReflexion?m.isReflexion:!m.isReflexion;});
      // Solo enviar imagen del último mensaje que tenga una — las anteriores se mandan solo como texto
      var lastImageIdx=-1;
      contextMessages.forEach(function(m,idx){if(m.role==="user"&&m.image)lastImageIdx=idx;});
      const hasImage=lastImageIdx>=0;
      const apiMessages=contextMessages.map(function(m,idx){
        // Usar apiContent (con cita incluida) si existe, si no el content normal
        var textContent=(m.role==="user"&&m.apiContent)?m.apiContent:m.content;
        if(m.role==="user"&&m.image&&idx===lastImageIdx){
          return{role:"user",content:[
            {type:"image",source:{type:"base64",media_type:m.image.mediaType,data:m.image.base64}},
            {type:"text",text:textContent||"Analiza este grafico"}
          ]};
        }
        return{role:m.role==="assistant"?"assistant":"user",content:textContent};
      });

      const response=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "x-api-key":apiKey,
          "anthropic-version":"2023-06-01",
          "anthropic-dangerous-direct-browser-access":"true"
        },
        body:JSON.stringify({
          model:hasImage?"claude-sonnet-4-6":"claude-haiku-4-5-20251001",
          max_tokens:hasImage?1800:1024,
          system:systemPrompt,
          messages:apiMessages,
        })
      });

      if(!response.ok){
        const errData=await response.json().catch(function(){return{};});
        throw new Error("API "+response.status+(errData.error?" — "+errData.error.message:""));
      }
      const data=await response.json();
      const raw=data.content[0].text;

      // Extract evaluation for profile update and save to journal
      const evalMatch=raw.match(/EVALUACION_TRADER:(positivo|negativo|neutro):(.+)/);
      if(isReflexion){
        // Guardar siempre una entrada de reflexión, con o sin etiqueta de evaluación
        var evalType=evalMatch?evalMatch[1]:"neutro";
        var evalDesc=evalMatch?evalMatch[2].trim():"Sesión de coaching — reflexión completada";
        const jEntry={
          id:Date.now(),
          date:new Date().toLocaleDateString("es-ES"),
          text:"[IA] "+evalDesc,
          emoji:evalType==="positivo"?"💪":evalType==="negativo"?"😤":"🧘",
          type:evalType==="positivo"?"win":evalType==="negativo"?"lesson":"analysis",
          linkedClose:null,
          fromReflexion:true
        };
        const newJnl=[jEntry,...D.current.jnl];
        D.current.jnl=newJnl;
        SJ(newJnl);
      }else if(evalMatch){
        // Modo análisis: también actualiza el perfil psicológico cuando la IA detecta algo relevante
        var aEvalType=evalMatch[1];
        var aEvalDesc=evalMatch[2].trim();
        var aEntry={
          id:Date.now(),
          date:new Date().toLocaleDateString("es-ES"),
          text:"[Chat análisis] "+aEvalDesc,
          emoji:aEvalType==="positivo"?"📈":aEvalType==="negativo"?"⚠️":"🔍",
          type:aEvalType==="positivo"?"win":aEvalType==="negativo"?"lesson":"analysis",
          linkedClose:null,
          fromAnalysis:true
        };
        var newJnlA=[aEntry,...D.current.jnl];
        D.current.jnl=newJnlA;
        SJ(newJnlA);
      }

      // Extract profile traits and save
      const perfilMatch=raw.match(/PERFIL_TRADER:([^\n]+)/);
      if(perfilMatch){
        var traitStr=perfilMatch[1].trim();
        var traits=traitStr.split(",").map(function(t){return t.trim();}).filter(function(t){return t&&t.length>0;});
        if(traits.length>0){
          var existingTraits=JSON.parse(localStorage.getItem("td-ai-profile-traits")||"[]");
          traits.forEach(function(t){if(existingTraits.indexOf(t)===-1)existingTraits.push(t);});
          localStorage.setItem("td-ai-profile-traits",JSON.stringify(existingTraits.slice(-30)));
          var pEntry={id:Date.now()+1,date:new Date().toLocaleDateString("es-ES"),
            text:"[Perfil psicológico] "+traits.join(", "),
            emoji:"🧠",type:"analysis",linkedClose:null};
          var newJnlP=[pEntry].concat(D.current.jnl);
          D.current.jnl=newJnlP;
          SJ(newJnlP);
        }
      }

      // Extract OPINION_APRENDIDA and save to memory
      var opinionMatches=raw.match(/OPINION_APRENDIDA:([^\n]+)/g);
      if(opinionMatches&&opinionMatches.length>0){
        var todayStr=new Date().toLocaleDateString("es-ES");
        var currentMem=chatMemoryRef.current||[];
        opinionMatches.forEach(function(tag){
          var opText=tag.replace("OPINION_APRENDIDA:","").trim();
          if(opText&&opText.length>3){
            currentMem=currentMem.concat([{date:todayStr,opinion:opText}]);
          }
        });
        saveChatMemory(currentMem.slice(-50));
      }
      // Clean response (remove hidden tags from display)
      const clean=raw.replace(/EVALUACION_TRADER:[^\n]+/g,"").replace(/PERFIL_TRADER:[^\n]+/g,"").replace(/OPINION_APRENDIDA:[^\n]+/g,"").trim();
      const assistantMsg={role:"assistant",content:clean,time:new Date().toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"}),isReflexion:isReflexion};
      if(isReflexion){
        // Modo reflexión: solo mostramos el intercambio en UI, NO se guarda en localStorage
        setMessages(prev=>[...prev,assistantMsg]);
      }else{
        setMessages(prev=>[...prev,assistantMsg]);
      }

    }catch(e){
      const errMsg={role:"assistant",content:"Error: "+e.message,time:new Date().toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"})};
      setMessages(prev=>[...prev,errMsg]);
    }
    setLoading(false);
  }

  return(
    <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 160px)",overflow:"hidden"}}>
      {/* API Key input panel */}
      {showKeyInput&&(
        <div style={{background:"#111118",border:"1px solid rgba(240,180,41,.3)",borderRadius:8,padding:10,marginBottom:8}}>
          <div style={{fontSize:9,color:"#f0b429",fontWeight:700,marginBottom:6}}>CLAVE API ANTHROPIC</div>
          <div style={{display:"flex",gap:6}}>
            <input
              type="password"
              placeholder="sk-ant-..."
              value={tmpKey}
              onChange={function(e){setTmpKey(e.target.value);}}
              style={{...S.inp,flex:1,fontSize:10,padding:"6px 8px"}}
            />
            <button onClick={function(){
              if(tmpKey.trim()){
                localStorage.setItem("td-anthropic-key",tmpKey.trim());
                setApiKey(tmpKey.trim());
                setTmpKey("");
                setShowKeyInput(false);
              }
            }} style={{background:"#f0b429",color:"#0a0a0f",border:"none",padding:"6px 12px",borderRadius:5,fontSize:9,fontWeight:700,cursor:"pointer"}}>Guardar</button>
            <button onClick={function(){setShowKeyInput(false);setTmpKey("");}} style={{background:"transparent",border:"1px solid #333",color:"#555",padding:"6px 10px",borderRadius:5,fontSize:9,cursor:"pointer"}}>✕</button>
          </div>
          <div style={{fontSize:8,color:"#444",marginTop:5}}>Se guarda solo en tu dispositivo (localStorage). Necesitas una cuenta en console.anthropic.com</div>
        </div>
      )}

      {/* Header bar: detected info + key + clear */}
      <div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{flex:1,display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
          {detectedInfo&&(
            <div style={{background:"rgba(0,255,136,.08)",border:"1px solid rgba(0,255,136,.3)",borderRadius:4,padding:"4px 8px",fontSize:9,color:"#00ff88",fontWeight:700}}>
              {detectedInfo.display} · {detectedInfo.tf.toUpperCase()} {detectedInfo.isCrypto?"(Binance)":"(Yahoo Finance)"}
            </div>
          )}
          {marketData&&(
            <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
              <span style={{fontSize:9,fontWeight:700,color:"#f0b429"}}>${marketData.price}</span>
              <span style={{fontSize:9,color:parseFloat(marketData.change24h)>=0?"#00ff88":"#ff4444"}}>{parseFloat(marketData.change24h)>=0?"+":""}{marketData.change24h}%</span>
              <span style={{fontSize:9,color:marketData.rsi<=30?"#00ff88":marketData.rsi>=70?"#ff4444":"#888"}}>RSI {marketData.rsi}</span>
            </div>
          )}
          {!detectedInfo&&(
            <span style={{fontSize:9,color:"#333"}}>Nombra un activo y temporalidad en tu mensaje</span>
          )}
        </div>
        <button onClick={function(){setShowPredictions(!showPredictions);}}
          title="Predicciones guardadas"
          style={{background:predictions.filter(function(p){return p.status==="pending";}).length>0?"rgba(136,170,255,.12)":"transparent",border:"1px solid "+(predictions.filter(function(p){return p.status==="pending";}).length>0?"rgba(136,170,255,.4)":"#1e1e2e"),color:predictions.filter(function(p){return p.status==="pending";}).length>0?"#88aaff":"#444",padding:"5px 8px",borderRadius:4,fontSize:9,cursor:"pointer"}}>
          🧠 {predictions.filter(function(p){return p.status==="pending";}).length||""}
        </button>
        <button onClick={exportChatMessages} title="Exportar mensajes al portapapeles"
          style={{background:"transparent",border:"1px solid #1e1e2e",color:"#444",padding:"5px 8px",borderRadius:4,fontSize:11,cursor:"pointer"}}>📤</button>
        <button onClick={function(){setShowChatImport(!showChatImport);setChatImportText("");}} title="Importar y fusionar mensajes de otro dispositivo"
          style={{background:showChatImport?"rgba(136,170,255,.12)":"transparent",border:"1px solid "+(showChatImport?"rgba(136,170,255,.4)":"#1e1e2e"),color:showChatImport?"#88aaff":"#444",padding:"5px 8px",borderRadius:4,fontSize:11,cursor:"pointer"}}>📥</button>
        <button onClick={clearChat} title="Borrar historial del chat"
          style={{background:"transparent",border:"1px solid #1e1e2e",color:"#444",padding:"5px 8px",borderRadius:4,fontSize:9,cursor:"pointer"}}>Limpiar</button>
        <button onClick={function(){setShowKeyInput(!showKeyInput);setTmpKey(apiKey);}} title="Configurar API Key"
          style={{background:apiKey?"rgba(0,255,136,.1)":"rgba(255,68,68,.1)",border:"1px solid "+(apiKey?"#00ff88":"#ff4444"),color:apiKey?"#00ff88":"#ff4444",padding:"5px 8px",borderRadius:4,fontSize:11,cursor:"pointer"}}>🔑</button>
      </div>

      {/* Chat import/merge panel */}
      {showChatImport&&(
        <div style={{background:"#111118",border:"1px solid rgba(136,170,255,.3)",borderRadius:8,padding:12,marginBottom:8}}>
          <div style={{fontSize:9,color:"#88aaff",fontWeight:700,marginBottom:4}}>FUSIONAR MENSAJES DE OTRO DISPOSITIVO</div>
          <div style={{fontSize:8,color:"#555",marginBottom:6}}>En el otro dispositivo pulsa 📤 para copiar, luego pega aqui y pulsa Fusionar:</div>
          <textarea value={chatImportText} onChange={function(e){setChatImportText(e.target.value);}}
            placeholder='[{"role":"user","content":"..."}]'
            style={{width:"100%",height:80,background:"#0d0d16",border:"1px solid #2a2a3a",color:"#e0e0e0",borderRadius:5,padding:"6px 8px",fontSize:9,boxSizing:"border-box",resize:"none"}}/>
          <div style={{display:"flex",gap:6,marginTop:6}}>
            <button onClick={importMergeChat} style={{flex:2,padding:"7px",background:"#88aaff",color:"#0a0a0f",border:"none",borderRadius:4,fontSize:9,fontWeight:700,cursor:"pointer"}}>Fusionar</button>
            <button onClick={function(){setShowChatImport(false);setChatImportText("");}} style={{flex:1,padding:"7px",background:"transparent",border:"1px solid #333",color:"#555",borderRadius:4,fontSize:9,cursor:"pointer"}}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Panel de predicciones guardadas */}
      {showPredictions&&(
        <div style={{background:"#111118",border:"1px solid rgba(136,170,255,.3)",borderRadius:8,padding:10,marginBottom:8,maxHeight:240,overflowY:"auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div style={{fontSize:9,color:"#88aaff",fontWeight:700}}>PREDICCIONES GUARDADAS</div>
            {predictions.length>0&&(
              <div style={{display:"flex",gap:4}}>
                <button onClick={resetOldPredictions} style={{background:"transparent",border:"1px solid #f0b429",color:"#f0b429",padding:"2px 7px",borderRadius:3,fontSize:8,cursor:"pointer"}}>🗑 Borrar anteriores</button>
                <button onClick={resetAllPredictions} style={{background:"transparent",border:"1px solid #ff4444",color:"#ff4444",padding:"2px 7px",borderRadius:3,fontSize:8,cursor:"pointer"}}>✕ Todo</button>
              </div>
            )}
          </div>
          {predictions.length>0&&(function(){
            var hit=predictions.filter(function(p){return p.status==="hit";}).length;
            var missed=predictions.filter(function(p){return p.status==="missed";}).length;
            var pending=predictions.filter(function(p){return p.status==="pending";}).length;
            var resolved=hit+missed;
            var rate=resolved>0?Math.round(hit/resolved*100):null;
            return(
              <div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}>
                <div style={{flex:1,background:"rgba(0,255,136,.06)",border:"1px solid rgba(0,255,136,.2)",borderRadius:5,padding:"5px 8px",textAlign:"center"}}>
                  <div style={{fontSize:13,fontWeight:700,color:"#00ff88"}}>{hit}</div>
                  <div style={{fontSize:7,color:"#555"}}>Acertadas</div>
                </div>
                <div style={{flex:1,background:"rgba(255,68,68,.06)",border:"1px solid rgba(255,68,68,.2)",borderRadius:5,padding:"5px 8px",textAlign:"center"}}>
                  <div style={{fontSize:13,fontWeight:700,color:"#ff4444"}}>{missed}</div>
                  <div style={{fontSize:7,color:"#555"}}>Fallidas</div>
                </div>
                <div style={{flex:1,background:"rgba(136,170,255,.06)",border:"1px solid rgba(136,170,255,.2)",borderRadius:5,padding:"5px 8px",textAlign:"center"}}>
                  <div style={{fontSize:13,fontWeight:700,color:"#88aaff"}}>{pending}</div>
                  <div style={{fontSize:7,color:"#555"}}>Pendientes</div>
                </div>
                <div style={{flex:1,background:"rgba(240,180,41,.06)",border:"1px solid rgba(240,180,41,.2)",borderRadius:5,padding:"5px 8px",textAlign:"center"}}>
                  <div style={{fontSize:13,fontWeight:700,color:rate===null?"#555":rate>=60?"#00ff88":rate>=40?"#f0b429":"#ff4444"}}>{rate===null?"--":rate+"%"}</div>
                  <div style={{fontSize:7,color:"#555"}}>Acierto</div>
                </div>
              </div>
            );
          })()}
          {predictions.length===0&&(
            <div style={{fontSize:9,color:"#333",textAlign:"center",padding:"10px 0"}}>
              Sin predicciones. Pulsa 💾 en cualquier respuesta del bot para guardarla.
            </div>
          )}
          {predictions.map(function(p){
            var days=daysSince(p.timestamp);
            var statusColor=p.status==="pending"?"#88aaff":p.status==="hit"?"#00ff88":"#ff4444";
            var statusLabel=p.status==="pending"?"pendiente":p.status==="hit"?"acertada":"fallida";
            // Estado de monitorización
            var tfMs={"1h":3600000,"4h":14400000,"1d":28800000,"1w":86400000};
            var monMs=tfMs[p.tf]||14400000;
            var lastChk=0;try{var mc=JSON.parse(localStorage.getItem("td-monitor-checks")||"{}");lastChk=mc[p.id]||0;}catch(e){}
            var isCrypto=p.asset&&(/USDT$/i.test(p.asset.replace("/",""))||/BTC|ETH|SOL|LINK|BNB|XRP/i.test(p.asset));
            var nextChk=lastChk?lastChk+monMs:0;
            var minsToNext=nextChk?Math.max(0,Math.round((nextChk-Date.now())/60000)):null;
            var monitorLine=null;
            if(p.status==="pending"){
              if(!isCrypto){
                monitorLine=<span style={{fontSize:7,color:"#555",marginLeft:2}}>⚫ solo crypto</span>;
              }else if(!lastChk){
                monitorLine=<span style={{fontSize:7,color:"#f0b429",marginLeft:2}}>🟡 pendiente 1er check</span>;
              }else if(minsToNext===0){
                monitorLine=<span style={{fontSize:7,color:"#00ff88",marginLeft:2}}>🟢 check inminente</span>;
              }else{
                monitorLine=<span style={{fontSize:7,color:"#555",marginLeft:2}}>🔵 próximo en {minsToNext}m</span>;
              }
            }
            return(
              <div key={p.id} style={{background:"#0d0d16",borderRadius:6,padding:"8px 10px",marginBottom:6,border:"1px solid rgba(136,170,255,.12)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                  <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
                    <span style={{fontSize:8,color:statusColor,border:"1px solid "+statusColor,padding:"1px 5px",borderRadius:3}}>{statusLabel}</span>
                    {p.asset&&<span style={{fontSize:8,color:"#f0b429"}}>{p.asset}{p.tf?" "+p.tf:""}</span>}
                    <span style={{fontSize:8,color:"#444"}}>{p.savedDate}</span>
                    <span style={{fontSize:8,color:days>7?"#ff4444":days>3?"#f0b429":"#555"}}>hace {days===0?"hoy":days+" dias"}</span>
                    {monitorLine}
                  </div>
                  <button onClick={function(){deletePrediction(p.id);}} style={{background:"transparent",border:"none",color:"#333",cursor:"pointer",fontSize:12,lineHeight:1}}>✕</button>
                </div>
                <div style={{fontSize:9,color:"#888",lineHeight:1.5,marginBottom:p.note?4:0,whiteSpace:"pre-wrap"}}>
                  {expandedPreds[p.id]?p.content:p.content.slice(0,200)}
                  {p.content.length>200&&(
                    <span onClick={function(){setExpandedPreds(function(prev){var n={};for(var k in prev)n[k]=prev[k];n[p.id]=!prev[p.id];return n;});}}
                      style={{color:"#88aaff",cursor:"pointer",marginLeft:4,fontSize:8}}>
                      {expandedPreds[p.id]?" ver menos":" … ver más"}
                    </span>
                  )}
                </div>
                {p.note&&<div style={{fontSize:8,color:"#f0b429",marginBottom:4}}>Nota: {p.note}</div>}
                {p.status==="pending"&&(
                  <div style={{display:"flex",gap:4,marginTop:6}}>
                    <button onClick={function(){resolvePrediction(p.id,"hit");}}
                      style={{flex:1,padding:"4px",background:"rgba(0,255,136,.08)",border:"1px solid rgba(0,255,136,.3)",color:"#00ff88",borderRadius:4,fontSize:8,cursor:"pointer",fontWeight:700}}>✓ Acertada</button>
                    <button onClick={function(){resolvePrediction(p.id,"missed");}}
                      style={{flex:1,padding:"4px",background:"rgba(255,68,68,.08)",border:"1px solid rgba(255,68,68,.3)",color:"#ff4444",borderRadius:4,fontSize:8,cursor:"pointer",fontWeight:700}}>✗ Fallida</button>
                    <button onClick={function(){
                      setPendingReply({content:p.content,asset:p.asset,tf:p.tf,savedDate:p.savedDate,days:days,note:p.note||""});
                      setInput("");
                      setShowPredictions(false);
                    }}
                      style={{flex:2,padding:"4px",background:"rgba(136,170,255,.08)",border:"1px solid rgba(136,170,255,.3)",color:"#88aaff",borderRadius:4,fontSize:8,cursor:"pointer"}}>↩ Preguntar update</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}


      {/* Messages */}
      <div ref={listRef} style={{flex:1,overflowY:"auto",minHeight:0,display:"flex",flexDirection:"column",gap:8,paddingBottom:8}}>
        <div style={{flex:1,minHeight:8}}/>
        {chatMode==="reflexion"&&messages.filter(function(m){return m.isReflexion;}).length===0&&(
          <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,opacity:.4}}>
            <div style={{fontSize:28}}>💭</div>
            <div style={{fontSize:10,color:"#888",textAlign:"center",lineHeight:1.6}}>Nuevo chat de reflexión<br/><span style={{fontSize:8}}>No se guarda en el historial del chat</span></div>
          </div>
        )}
        {messages.map(function(m,i){
          if(chatMode==="reflexion"&&!m.isReflexion)return null;
          if(chatMode==="analisis"&&m.isReflexion)return null;
          return(
          <div key={i} style={{display:"flex",flexDirection:"column",alignItems:m.role==="user"?"flex-end":"flex-start"}}>
            <div style={{
              maxWidth:"88%",
              padding:"10px 12px",
              borderRadius:m.role==="user"?"12px 12px 2px 12px":"12px 12px 12px 2px",
              background:m.role==="user"?"rgba(240,180,41,.15)":"#111118",
              border:"1px solid "+(m.role==="user"?"rgba(240,180,41,.3)":"#1e1e2e"),
              fontSize:11,color:"#e0e0e0",lineHeight:1.7,whiteSpace:"pre-wrap",
            }}>
              {m.replyTo&&(
                <div style={{borderLeft:"2px solid #88aaff",paddingLeft:7,marginBottom:8,opacity:.75}}>
                  <div style={{fontSize:7,color:"#88aaff",marginBottom:2}}>↩ {m.replyTo.asset&&m.replyTo.asset+(m.replyTo.tf?" "+m.replyTo.tf:"")} · {m.replyTo.savedDate}</div>
                  <div style={{fontSize:9,color:"#666",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{m.replyTo.content.slice(0,100)}{m.replyTo.content.length>100?"…":""}</div>
                </div>
              )}
              {m.image&&<img src={"data:"+m.image.mediaType+";base64,"+m.image.base64} style={{display:"block",maxWidth:"100%",maxHeight:220,borderRadius:6,marginBottom:8,objectFit:"contain"}}/>}
              {m.isVoice&&<span style={{fontSize:8,color:"#00cc66",display:"block",marginBottom:4}}>🎙️ Mensaje de voz</span>}
              {m.isReflexion&&m.role==="user"&&<span style={{fontSize:8,color:"#f0b429",display:"block",marginBottom:4}}>💭 Reflexión · no guardado en historial</span>}
              {m.content}
            </div>
            <div style={{display:"flex",gap:6,alignItems:"center",marginTop:2,marginLeft:m.role==="user"?0:4,marginRight:m.role==="user"?4:0}}>
              <span style={{fontSize:8,color:"#333"}}>{m.role==="user"?"Tu":"Claude"} · {m.time}{m.isVoice?" · 🎙️":""}</span>
              {i>0&&(function(){
                var key=(m.role||"")+(m.content||"").slice(0,60)+(m.time||"");
                var isPinned=pinned.some(function(p){return p._key===key;});
                return(
                  <button onClick={function(){togglePin(m);}}
                    title={isPinned?"Desanclar mensaje":"Anclar: siempre en contexto del bot"}
                    style={{background:"transparent",border:"none",color:isPinned?"#f0b429":"#333",cursor:"pointer",fontSize:10,padding:"0 2px",lineHeight:1}}>📌</button>
                );
              })()}
              <button onClick={function(){setMessages(function(prev){return prev.filter(function(_,idx){return idx!==i;});});}}
                title="Borrar mensaje"
                style={{background:"transparent",border:"none",color:"#2a2a3a",cursor:"pointer",fontSize:11,padding:"0 2px",lineHeight:1}}>✕</button>
            </div>
          </div>
        );})}
        {loading&&(
          <div style={{alignSelf:"flex-start"}}>
            <div style={{padding:"10px 14px",background:"#111118",border:"1px solid #1e1e2e",borderRadius:"12px 12px 12px 2px",fontSize:11,color:"#555"}}>
              Analizando...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <input ref={fileInputRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleImageFile}/>
      {pendingReply&&(
        <div style={{display:"flex",alignItems:"flex-start",gap:6,padding:"7px 10px",background:"rgba(136,170,255,.05)",borderLeft:"3px solid #88aaff",borderRadius:"0 6px 6px 0",marginBottom:4}}>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:8,color:"#88aaff",fontWeight:700,marginBottom:3}}>
              ↩ Referenciando{pendingReply.asset?" · "+pendingReply.asset+(pendingReply.tf?" "+pendingReply.tf:""):""} · {pendingReply.savedDate} · hace {pendingReply.days===0?"hoy":pendingReply.days+" días"}
            </div>
            <div style={{fontSize:9,color:"#555",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>
              {pendingReply.content.slice(0,120)}{pendingReply.content.length>120?"…":""}
            </div>
          </div>
          <button onClick={function(){setPendingReply(null);}} style={{background:"transparent",border:"none",color:"#444",cursor:"pointer",fontSize:13,lineHeight:1,flexShrink:0}}>✕</button>
        </div>
      )}
      {pendingImage&&(
        <div style={{display:"flex",alignItems:"center",gap:6,padding:"6px 8px",background:"rgba(240,180,41,.08)",border:"1px solid rgba(240,180,41,.2)",borderRadius:6,marginBottom:4}}>
          <img src={"data:"+pendingImage.mediaType+";base64,"+pendingImage.base64} style={{width:40,height:40,objectFit:"cover",borderRadius:4}}/>
          <span style={{fontSize:9,color:"#f0b429",flex:1}}>{pendingImage.name}</span>
          <button onClick={function(){setPendingImage(null);}} style={{background:"transparent",border:"none",color:"#555",cursor:"pointer",fontSize:14}}>✕</button>
        </div>
      )}
      {/* Recording indicator */}
      {isRecording&&(
        <div style={{display:"flex",alignItems:"center",gap:8,padding:"6px 10px",background:"rgba(255,68,68,.08)",border:"1px solid rgba(255,68,68,.3)",borderRadius:6,marginBottom:4}}>
          <span style={{display:"inline-block",width:8,height:8,borderRadius:"50%",background:"#ff4444",animation:"pulse 1s infinite"}}/>
          <span style={{fontSize:10,color:"#ff6666",flex:1}}>Grabando... habla ahora · Tu voz aparece en el campo de texto</span>
          <button onClick={stopAndSendVoice} style={{background:"rgba(255,68,68,.15)",border:"1px solid #ff4444",color:"#ff4444",padding:"3px 8px",borderRadius:4,fontSize:9,cursor:"pointer",fontWeight:700}}>■ Parar</button>
        </div>
      )}
      {pendingVoice&&!isRecording&&input.trim()&&(
        <div style={{display:"flex",alignItems:"center",gap:6,padding:"4px 8px",background:"rgba(0,255,136,.05)",border:"1px solid rgba(0,255,136,.2)",borderRadius:6,marginBottom:4}}>
          <span style={{fontSize:9,color:"#00ff88"}}>🎙️ Mensaje de voz listo — revisa el texto y pulsa →</span>
          <button onClick={function(){setPendingVoice(false);}} style={{background:"transparent",border:"none",color:"#444",cursor:"pointer",fontSize:10}}>✕</button>
        </div>
      )}
      {/* Mode toggle */}
      <div style={{display:"flex",gap:4,marginBottom:6}}>
        <button onClick={function(){setChatMode("analisis");}}
          style={{flex:1,padding:"6px 4px",borderRadius:5,border:"1px solid "+(chatMode==="analisis"?"#88aaff":"#222"),background:chatMode==="analisis"?"rgba(136,170,255,.12)":"transparent",color:chatMode==="analisis"?"#88aaff":"#444",fontSize:9,fontWeight:chatMode==="analisis"?700:400,cursor:"pointer"}}>
          📊 Análisis <span style={{fontSize:7,opacity:.7}}>(se guarda)</span>
        </button>
        <button onClick={function(){setChatMode("reflexion");}}
          style={{flex:1,padding:"6px 4px",borderRadius:5,border:"1px solid "+(chatMode==="reflexion"?"#f0b429":"#222"),background:chatMode==="reflexion"?"rgba(240,180,41,.12)":"transparent",color:chatMode==="reflexion"?"#f0b429":"#444",fontSize:9,fontWeight:chatMode==="reflexion"?700:400,cursor:"pointer"}}>
          💭 Reflexión <span style={{fontSize:7,opacity:.7}}>(no se guarda)</span>
        </button>
      </div>
      <div style={{display:"flex",gap:6,paddingTop:8,borderTop:"1px solid #1a1a2a"}}>
        <button
          onClick={function(){fileInputRef.current&&fileInputRef.current.click();}}
          title="Adjuntar grafico"
          style={{background:"rgba(136,170,255,.1)",border:"1px solid rgba(136,170,255,.3)",color:"#88aaff",padding:"10px 12px",borderRadius:6,fontSize:16,cursor:"pointer"}}
        >📷</button>
        {speechSupported&&(
          <button
            onClick={startVoiceRecording}
            title={isRecording?"Detener grabación":"Grabar audio (transcripción automática)"}
            style={{background:isRecording?"rgba(255,68,68,.15)":"rgba(0,255,136,.08)",border:"1px solid "+(isRecording?"#ff4444":"rgba(0,255,136,.3)"),color:isRecording?"#ff4444":"#00ff88",padding:"10px 12px",borderRadius:6,fontSize:16,cursor:"pointer"}}
          >{isRecording?"⏹":"🎙️"}</button>
        )}
        <textarea
          style={{...S.inp,flex:1,fontSize:12,padding:"10px 12px",borderColor:pendingVoice?"rgba(0,255,136,.4)":"",resize:"none",overflowY:"hidden",lineHeight:1.5,minHeight:42,maxHeight:160}}
          placeholder={chatMode==="reflexion"?"Cuéntame cómo te has sentido en este trade...":speechSupported?"Escribe o usa 🎙️ para hablar · Nombra activo y temporalidad":"Ej: en 4H en LINK veo una ineficiencia FVG, puedo entrar?"}
          value={input}
          rows={1}
          onChange={function(e){
            setInput(e.target.value);
            if(isRecording)setPendingVoice(false);
            e.target.style.height="auto";
            e.target.style.height=Math.min(e.target.scrollHeight,160)+"px";
          }}
          onKeyDown={function(e){if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMessage();}}}
        />
        <button
          onClick={sendMessage}
          disabled={loading||!input.trim()}
          style={{background:loading||!input.trim()?"#1e1e2e":"#f0b429",color:loading||!input.trim()?"#444":"#0a0a0f",border:"none",padding:"10px 16px",borderRadius:6,fontSize:12,fontWeight:700,cursor:loading?"wait":!input.trim()?"default":"pointer"}}
        >
          {loading?"...":"→"}
        </button>
      </div>
      <div style={{fontSize:8,color:"#333",marginTop:4,textAlign:"center"}}>
        {speechSupported?"🎙️ Voz disponible · Nombra activo y temporalidad · Enter para enviar":"Nombra el activo y temporalidad en tu mensaje · Los datos se cargan automaticamente · Enter para enviar"}
      </div>
    </div>
  );
}



function EmaDisplay({data}){
  if(!data)return null;
  const isGolden7_25=data.relation==="above";
  const crossLabel7_25=data.cross==="golden"?"CRUCE DORADO 7/25":data.cross==="death"?"CRUCE MUERTE 7/25":null;
  const isGolden50_200=data.relation50_200==="above";
  const has50_200=data.ema50!=null&&data.ema200!=null;
  const crossLabel50_200=data.cross50_200==="golden"?"CRUCE DORADO 50/200":data.cross50_200==="death"?"CRUCE MUERTE 50/200":null;
  return(
    <div style={{marginTop:6}}>
      <div style={{fontSize:8,color:"#555",marginBottom:3}}>EMA 7 / 25</div>
      <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",marginBottom:6}}>
        <div style={{background:"rgba(136,170,255,.1)",border:"1px solid rgba(136,170,255,.3)",borderRadius:4,padding:"4px 8px",fontSize:9}}>
          <span style={{color:"#88aaff"}}>EMA7 </span>
          <span style={{color:"#e0e0e0",fontWeight:700}}>{data.ema7.toFixed(0)}</span>
        </div>
        <div style={{background:"rgba(255,136,170,.1)",border:"1px solid rgba(255,136,170,.3)",borderRadius:4,padding:"4px 8px",fontSize:9}}>
          <span style={{color:"#ff88aa"}}>EMA25 </span>
          <span style={{color:"#e0e0e0",fontWeight:700}}>{data.ema25.toFixed(0)}</span>
        </div>
        <div style={{background:isGolden7_25?"rgba(0,255,136,.1)":"rgba(255,68,68,.1)",border:"1px solid "+(isGolden7_25?"rgba(0,255,136,.3)":"rgba(255,68,68,.3)"),borderRadius:4,padding:"4px 8px",fontSize:9,fontWeight:700,color:isGolden7_25?"#00ff88":"#ff4444"}}>
          {isGolden7_25?"EMA7 > EMA25":"EMA7 < EMA25"}
        </div>
        {crossLabel7_25&&(
          <div style={{background:data.cross==="golden"?"rgba(255,215,0,.15)":"rgba(100,0,100,.15)",border:"1px solid "+(data.cross==="golden"?"#ffd700":"#cc00cc"),borderRadius:4,padding:"4px 8px",fontSize:9,fontWeight:700,color:data.cross==="golden"?"#ffd700":"#cc44cc"}}>
            {crossLabel7_25}
          </div>
        )}
      </div>
      {has50_200&&(
        <div>
          <div style={{fontSize:8,color:"#555",marginBottom:3}}>EMA 50 / 200</div>
          <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
            <div style={{background:"rgba(255,200,100,.1)",border:"1px solid rgba(255,200,100,.3)",borderRadius:4,padding:"4px 8px",fontSize:9}}>
              <span style={{color:"#ffc864"}}>EMA50 </span>
              <span style={{color:"#e0e0e0",fontWeight:700}}>{data.ema50.toFixed(0)}</span>
            </div>
            <div style={{background:"rgba(200,150,255,.1)",border:"1px solid rgba(200,150,255,.3)",borderRadius:4,padding:"4px 8px",fontSize:9}}>
              <span style={{color:"#c896ff"}}>EMA200 </span>
              <span style={{color:"#e0e0e0",fontWeight:700}}>{data.ema200.toFixed(0)}</span>
            </div>
            <div style={{background:isGolden50_200?"rgba(0,255,136,.1)":"rgba(255,68,68,.1)",border:"1px solid "+(isGolden50_200?"rgba(0,255,136,.3)":"rgba(255,68,68,.3)"),borderRadius:4,padding:"4px 8px",fontSize:9,fontWeight:700,color:isGolden50_200?"#00ff88":"#ff4444"}}>
              {isGolden50_200?"EMA50 > EMA200":"EMA50 < EMA200"}
            </div>
            {crossLabel50_200&&(
              <div style={{background:data.cross50_200==="golden"?"rgba(255,215,0,.15)":"rgba(100,0,100,.15)",border:"1px solid "+(data.cross50_200==="golden"?"#ffd700":"#cc00cc"),borderRadius:4,padding:"4px 8px",fontSize:9,fontWeight:700,color:data.cross50_200==="golden"?"#ffd700":"#cc44cc"}}>
                {crossLabel50_200}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


function calcRSI(closes, period){
  if(closes.length<period+1)return null;
  const changes=closes.slice(1).map((v,i)=>v-closes[i]);
  let gains=0,losses=0;
  for(let i=0;i<period;i++){
    if(changes[i]>0)gains+=changes[i];
    else losses+=Math.abs(changes[i]);
  }
  let avgGain=gains/period;
  let avgLoss=losses/period;
  for(let i=period;i<changes.length;i++){
    const g=changes[i]>0?changes[i]:0;
    const l=changes[i]<0?Math.abs(changes[i]):0;
    avgGain=(avgGain*(period-1)+g)/period;
    avgLoss=(avgLoss*(period-1)+l)/period;
  }
  if(avgLoss===0)return 100;
  const rs=avgGain/avgLoss;
  return parseFloat((100-100/(1+rs)).toFixed(1));
}

function calcEMA(closes, period){
  if(closes.length<period)return null;
  const k=2/(period+1);
  let ema=closes.slice(0,period).reduce((a,v)=>a+v,0)/period;
  for(let i=period;i<closes.length;i++){
    ema=closes[i]*k+ema*(1-k);
  }
  return parseFloat(ema.toFixed(4));
}

function calcRSISeries(closes,period){
  period=period||14;
  if(closes.length<period+2)return[];
  var changes=[];
  for(var ci=1;ci<closes.length;ci++)changes.push(closes[ci]-closes[ci-1]);
  var avgGain=0,avgLoss=0;
  for(var si=0;si<period;si++){
    if(changes[si]>0)avgGain+=changes[si];
    else avgLoss+=Math.abs(changes[si]);
  }
  avgGain/=period;avgLoss/=period;
  var rsiArr=[];
  var rs=avgLoss===0?100:avgGain/avgLoss;
  rsiArr.push(parseFloat((100-100/(1+rs)).toFixed(1)));
  for(var ri=period;ri<changes.length;ri++){
    var g=changes[ri]>0?changes[ri]:0;
    var l=changes[ri]<0?Math.abs(changes[ri]):0;
    avgGain=(avgGain*(period-1)+g)/period;
    avgLoss=(avgLoss*(period-1)+l)/period;
    rs=avgLoss===0?100:avgGain/avgLoss;
    rsiArr.push(parseFloat((100-100/(1+rs)).toFixed(1)));
  }
  return rsiArr;
}

function calcATR(ohlcArr,period){
  period=period||14;
  if(!ohlcArr||ohlcArr.length<period+1)return null;
  var trs=[];
  for(var i=1;i<ohlcArr.length;i++){
    var h=ohlcArr[i].h,l=ohlcArr[i].l,pc=ohlcArr[i-1].c;
    trs.push(Math.max(h-l,Math.abs(h-pc),Math.abs(l-pc)));
  }
  var atr=0;
  for(var si=0;si<period&&si<trs.length;si++)atr+=trs[si];
  atr/=Math.min(period,trs.length);
  for(var ki=period;ki<trs.length;ki++)atr=(atr*(period-1)+trs[ki])/period;
  return atr;
}

function calcEMASeries(closes, period){
  // Returns array of EMA values (one per candle after warmup)
  if(closes.length<period)return[];
  const k=2/(period+1);
  const result=[];
  let ema=closes.slice(0,period).reduce((a,v)=>a+v,0)/period;
  result.push(ema);
  for(let i=period;i<closes.length;i++){
    ema=closes[i]*k+ema*(1-k);
    result.push(ema);
  }
  return result;
}

function detectCross(closes){
  // Returns null | "golden" | "death" for EMA7/EMA25
  if(closes.length<30)return null;
  const ema7=calcEMASeries(closes,7);
  const ema25=calcEMASeries(closes,25);
  if(ema7.length<2||ema25.length<2)return null;
  const prevE7=ema7[ema7.length-2];
  const currE7=ema7[ema7.length-1];
  const prevE25=ema25[ema25.length-2];
  const currE25=ema25[ema25.length-1];
  if(prevE7<=prevE25&&currE7>currE25)return"golden";
  if(prevE7>=prevE25&&currE7<currE25)return"death";
  return null;
}

function detectCross50_200(closes){
  // Returns null | "golden" | "death" for EMA50/EMA200
  if(closes.length<205)return null;
  const s50=calcEMASeries(closes,50);
  const s200=calcEMASeries(closes,200);
  if(s50.length<2||s200.length<2)return null;
  const p50=s50[s50.length-2], c50=s50[s50.length-1];
  const p200=s200[s200.length-2], c200=s200[s200.length-1];
  if(p50<=p200&&c50>c200)return"golden";
  if(p50>=p200&&c50<c200)return"death";
  return null;
}

function AlertasTab({S,predictions}){
  const SYMBOLS=[
    {symbol:"BTCUSDT",label:"BTC/USD"},
    {symbol:"ETHUSDT",label:"ETH/USD"},
    {symbol:"SOLUSDT",label:"SOL/USD"},
    {symbol:"LINKUSDT",label:"LINK/USD"},
    {symbol:"BNBUSDT",label:"BNB/USD"},
    {symbol:"XRPUSDT",label:"XRP/USD"},
    {symbol:"APEUSDT",label:"APE/USD"},
    {symbol:"AVAXUSDT",label:"AVAX/USD"},
    {symbol:"DOTUSDT",label:"DOT/USD"},
    {symbol:"ADAUSDT",label:"ADA/USD"},
  ];
  const INTERVALS=[
    {value:"1h",label:"1H"},
    {value:"4h",label:"4H"},
    {value:"1d",label:"Diario"},
    {value:"1w",label:"Semanal"},
  ];

  // --- State ---
  const[alerts,setAlerts]=useState([]);
  const alertsRef=useRef([]);
  const[showForm,setShowForm]=useState(false);
  const[draft,setDraft]=useState({selectedSymbols:["BTCUSDT"],interval:"4h",rsiCustomEnabled:false,rsiCustomTarget:50,rsiCustomCondition:"below"});
  const[customInput,setCustomInput]=useState("");
  const[customCheckStatus,setCustomCheckStatus]=useState(null);
  const[logs,setLogs]=useState(function(){
    try{var s=localStorage.getItem("td-alert-logs");return s?JSON.parse(s):[];}catch(e){return[];}
  });
  const[notifPerm,setNotifPerm]=useState("default");
  const[pushSubStatus,setPushSubStatus]=useState("idle"); // idle | subscribing | subscribed | error
  const[lastAlert,setLastAlert]=useState(null);
  const[globalPaused,setGlobalPaused]=useState(false);
  const globalPausedRef=useRef(false);
  const[addInput,setAddInput]=useState("");
  const[addInterval,setAddInterval]=useState("1h");
  const[addStatus,setAddStatus]=useState(null);
  const[addFound,setAddFound]=useState(null); // {sym, label} when verified
  const[patternStats,setPatternStats]=useState(function(){try{return JSON.parse(localStorage.getItem("td-pattern-fb")||"{}");}catch(e){return {};}});
  const[ratedLogs,setRatedLogs]=useState({});
  const[addConfig,setAddConfig]=useState({
    rsiOversoldEnabled:true,rsiOversoldTarget:30,
    rsiOverboughtEnabled:true,rsiOverboughtTarget:70,
    emaCross725Enabled:true,
    emaCross50200Enabled:true,
    rsiDivEnabled:true,
    rsiCustomEnabled:false,rsiCustomTarget:50,rsiCustomCondition:"below"
  });
  const reconnectCountRef=useRef({});
  const wsRefs=useRef({});
  const closesRef=useRef({});
  const ohlcRef=useRef({});
  const lastTrigRef=useRef({});
  const rsiHistRef=useRef({}); // rolling RSI history per key for divergence detection
  const confluenceRef=useRef({}); // {symbol+"|"+interval: {signalType: timestamp}} para confluencia
  const opAlertRef=useRef({}); // {label+"|"+interval+"|"+dir: lastEmitMs} para cooldown de OPERACIÓN multi-TF
  const[emaData,setEmaData]=useState({});
  const[showImport,setShowImport]=useState(false);
  const[importText,setImportText]=useState("");
  const[patternFb,setPatternFb]=useState(function(){
    try{return JSON.parse(localStorage.getItem("td-pattern-fb")||"{}");}catch(e){return{};}
  });

  // Telegram config
  const[tgToken,setTgToken]=useState(function(){return localStorage.getItem("td-tg-token")||"";});
  const[tgChatId,setTgChatId]=useState(function(){return localStorage.getItem("td-tg-chatid")||"";});
  const[showTgConfig,setShowTgConfig]=useState(false);
  const[finnhubKey,setFinnhubKey]=useState(function(){return localStorage.getItem("td-finnhub-key")||"";});
  const[showFinnhubConfig,setShowFinnhubConfig]=useState(false);
  const[finnhubStatus,setFinnhubStatus]=useState(null);
  const finnhubLastCandleRef=useRef({});
  const[tgStatus,setTgStatus]=useState(null);

  // Wake Lock — mantiene pantalla encendida cuando hay alertas activas
  const wakeLockRef=useRef(null);
  async function requestWakeLock(){
    if(!("wakeLock" in navigator))return;
    try{
      if(wakeLockRef.current)return;
      wakeLockRef.current=await navigator.wakeLock.request("screen");
      wakeLockRef.current.addEventListener("release",function(){wakeLockRef.current=null;});
    }catch(e){}
  }
  function releaseWakeLock(){
    if(wakeLockRef.current){wakeLockRef.current.release().catch(function(){});wakeLockRef.current=null;}
  }

  // Poll Telegram for pattern feedback responses (callback_query from inline keyboards)
  function pollTelegramFeedback(){
    var tk=localStorage.getItem("td-tg-token");
    var cid=localStorage.getItem("td-tg-chatid");
    if(!tk||!cid)return;
    var offset=0;
    try{offset=parseInt(localStorage.getItem("td-tg-offset")||"0",10);}catch(e){}
    var url="https://api.telegram.org/bot"+tk+"/getUpdates?offset="+offset+"&timeout=0&limit=10";
    fetch(url).then(function(r){return r.json();}).then(function(data){
      if(!data.ok||!data.result||!data.result.length)return;
      var fb={};
      try{fb=JSON.parse(localStorage.getItem("td-pattern-fb")||"{}");}catch(e){}
      var answered={};
      try{answered=JSON.parse(localStorage.getItem("td-tg-answered")||"{}");}catch(e){}
      var maxId=offset-1;
      data.result.forEach(function(upd){
        if(upd.update_id>maxId)maxId=upd.update_id;
        if(!upd.callback_query)return;
        var cbq=upd.callback_query;
        var msgId=cbq.message&&cbq.message.message_id;
        // Solo procesar una vez por mensaje
        if(msgId&&answered[msgId])return;
        var d=cbq.data||"";
        if(d.indexOf("fb_")!==0)return;
        var rest=d.slice(3);
        var sepIdx=rest.indexOf("_");
        if(sepIdx<0)return;
        var verdict=rest.slice(0,sepIdx);
        var patType=rest.slice(sepIdx+1);
        if(!fb[patType])fb[patType]={total:0,correct:0,wrong:0};
        fb[patType].total=(fb[patType].total||0)+1;
        if(verdict==="correct")fb[patType].correct=(fb[patType].correct||0)+1;
        else fb[patType].wrong=(fb[patType].wrong||0)+1;
        // Marcar mensaje como respondido
        if(msgId)answered[msgId]=true;
        // Confirmar al usuario con toast
        fetch("https://api.telegram.org/bot"+tk+"/answerCallbackQuery",{
          method:"POST",headers:{"Content-Type":"application/json"},
          body:JSON.stringify({callback_query_id:cbq.id,
            text:verdict==="correct"?"✅ Registrado como señal correcta":"❌ Registrado como falsa señal",show_alert:true})
        }).catch(function(){});
        // Editar el mensaje para quitar los botones y mostrar el resultado (un solo clic)
        if(msgId&&cbq.message&&cbq.message.chat){
          var msgChatId=cbq.message.chat.id;
          var originalText=cbq.message.text||"";
          var resultLine=verdict==="correct"?"\n\n✅ MARCADO: Señal correcta — gracias por el feedback":"\n\n❌ MARCADO: Falsa señal — aprendiendo...";
          fetch("https://api.telegram.org/bot"+tk+"/editMessageText",{
            method:"POST",headers:{"Content-Type":"application/json"},
            body:JSON.stringify({chat_id:msgChatId,message_id:msgId,text:originalText+resultLine})
          }).catch(function(){});
        }
      });
      localStorage.setItem("td-pattern-fb",JSON.stringify(fb));
      localStorage.setItem("td-tg-answered",JSON.stringify(answered));
      localStorage.setItem("td-tg-offset",String(maxId+1));
      setPatternFb(fb);
    }).catch(function(){});
  }
  useEffect(function(){
    pollTelegramFeedback();
    var iv=setInterval(pollTelegramFeedback,10000);
    return function(){clearInterval(iv);};
  },[]);

  // Re-acquire wake lock when tab becomes visible again
  useEffect(function(){
    function onVis(){
      if(document.visibilityState==="visible"){
        const hasActive=alertsRef.current.some(function(a){return a.active;});
        if(hasActive)requestWakeLock();
      }
    }
    document.addEventListener("visibilitychange",onVis);
    return function(){document.removeEventListener("visibilitychange",onVis);};
  },[]);

  function saveAlerts(arr){
    alertsRef.current=arr;
    setAlerts(arr);
    localStorage.setItem("td-alerts-v2",JSON.stringify(arr));
  }

  useEffect(()=>{
    if("Notification" in window)setNotifPerm(Notification.permission);
    // Load new-format alerts
    try{
      const saved=localStorage.getItem("td-alerts-v2");
      if(saved){
        const parsed=JSON.parse(saved);
        if(parsed.length>0){
          var loaded=parsed.map(function(a){
          var fixed={...a,currentRsi:null,currentPrice:null,error:false};
          // Migración: fvgEnabled fue hardcodeado como false — los usuarios no pueden desactivarlo desde la UI
          if(fixed.fvgEnabled===false)fixed.fvgEnabled=true;
          return fixed;
        });
          // Ensure BTC is always present
          var hasBtc=loaded.some(function(a){return a.symbol==="BTCUSDT";});
          if(!hasBtc){
            var btcA={id:Date.now(),symbol:"BTCUSDT",label:"BTC/USD",interval:"1h",
              rsiCustomEnabled:false,rsiCustomTarget:50,rsiCustomCondition:"below",
              active:true,currentRsi:null,currentPrice:null,error:false};
            loaded=[btcA,...loaded];
            localStorage.setItem("td-alerts-v2",JSON.stringify(loaded));
          }
          alertsRef.current=loaded;
          setAlerts(loaded);
          // Auto-restart monitors que estaban activos antes de cerrar
          setTimeout(function(){loaded.forEach(function(a){if(a.active)startAlert(a);});},700);
          return;
        }
      }
    }catch(e){}
    // Migrate from old format (td-rsi-alerts)
    try{
      const oldSaved=localStorage.getItem("td-rsi-alerts");
      if(oldSaved){
        const old=JSON.parse(oldSaved);
        if(old.length>0){
          const migrated=old.map(function(a){return{
            id:a.id,symbol:a.symbol,label:a.label,interval:a.interval,
            rsiEnabled:a.notifyRsi!==false,rsiThreshold:a.oversold||30,rsiCondition:"below",
            emaGoldenEnabled:false,emaDeathEnabled:false,ema200GoldenEnabled:false,ema200DeathEnabled:false,
            active:false,currentRsi:null,currentPrice:null,error:false
          };});
          alertsRef.current=migrated;
          setAlerts(migrated);
          localStorage.setItem("td-alerts-v2",JSON.stringify(migrated));
          return;
        }
      }
    }catch(e){}
    // Primera vez: crear BTC en todas las temporalidades automáticamente
    var TF_ALL=["1h","4h","1d","1w"];
    var btcAll=TF_ALL.map(function(tf,i){
      return{id:Date.now()+i+1,symbol:"BTCUSDT",label:"BTC/USD",interval:tf,
        rsiCustomEnabled:false,rsiCustomTarget:50,rsiCustomCondition:"below",
        active:true,currentRsi:null,currentPrice:null,error:false};
    });
    alertsRef.current=btcAll;
    setAlerts(btcAll);
    saveAlerts(btcAll);
    setTimeout(function(){btcAll.forEach(function(a){startAlert(a);});},700);
  },[]);

  function requestNotif(){
    const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream;
    if(!("Notification" in window)){
      if(isIOS){
        alert("iOS Safari no soporta notificaciones web.\n\nPara recibirlas en iPhone:\n1. Pulsa el boton Compartir (cuadrado con flecha)\n2. Selecciona \"Añadir a pantalla de inicio\"\n3. Abre la app desde el icono que se crea\n4. Vuelve a pulsar ACTIVAR");
      }else{
        alert("Tu navegador no soporta notificaciones. Usa Chrome en Android.");
      }
      return;
    }
    const req=Notification.requestPermission(function(p){
      setNotifPerm(p);
      if(p==="granted")sendTestNotif();
    });
    if(req&&typeof req.then==="function"){
      req.then(function(p){
        setNotifPerm(p);
        if(p==="granted")sendTestNotif();
      });
    }
  }

  function sendTestNotif(){
    const title="Trading Diary";
    const opts={body:"Notificaciones funcionando en tu dispositivo",icon:"/icon.svg",badge:"/icon.svg",silent:false};
    function doNotif(){try{new Notification(title,opts);}catch(e){console.warn("Notif fallback",e);}}
    if("serviceWorker" in navigator){
      navigator.serviceWorker.getRegistration().then(function(reg){
        if(reg){try{reg.showNotification(title,opts);}catch(e){doNotif();}}
        else{doNotif();}
      }).catch(doNotif);
    }else{doNotif();}
  }

  // ── Web Push: subscribe the browser and save the subscription to Supabase ──
  async function subscribePush(){
    if(!("serviceWorker" in navigator)||!("PushManager" in window)){
      alert("Tu navegador no soporta Web Push. Usa Chrome en Android.");
      return;
    }
    if(Notification.permission!=="granted"){
      var perm=await Notification.requestPermission();
      setNotifPerm(perm);
      if(perm!=="granted"){setPushSubStatus("error");return;}
    }
    setPushSubStatus("subscribing");
    try{
      var reg=await navigator.serviceWorker.ready;
      var sub=await reg.pushManager.getSubscription();
      if(!sub){
        sub=await reg.pushManager.subscribe({
          userVisibleOnly:true,
          applicationServerKey:urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
        });
      }
      var subJson=sub.toJSON();
      var cfg=window.SUPABASE_CFG;
      if(cfg&&cfg.url&&cfg.key){
        var res=await fetch(cfg.url+"/rest/v1/push_subscriptions",{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            "apikey":cfg.key,
            "Authorization":"Bearer "+cfg.key,
            "Prefer":"resolution=merge-duplicates,return=minimal"
          },
          body:JSON.stringify({
            user_id:PUSH_USER_ID,
            endpoint:subJson.endpoint,
            p256dh:subJson.keys&&subJson.keys.p256dh,
            auth:subJson.keys&&subJson.keys.auth,
            user_agent:navigator.userAgent.slice(0,250),
            is_active:true,
            failure_count:0
          })
        });
        if(!res.ok&&res.status!==409){
          var txt="";try{txt=await res.text();}catch(e){}
          setPushSubStatus("error");
          alert("Error al guardar suscripción: HTTP "+res.status+"\n"+txt.slice(0,200));
          return;
        }
      }
      try{localStorage.setItem("td-push-endpoint",subJson.endpoint);}catch(e){}
      setPushSubStatus("subscribed");
      try{reg.showNotification("Trading Diary",{body:"Web Push activado en este dispositivo.",icon:"/icon.svg"});}catch(e){}
    }catch(err){
      setPushSubStatus("error");
      alert("Suscripción push falló: "+((err&&err.message)||String(err)));
    }
  }

  async function unsubscribePush(){
    try{
      var reg=await navigator.serviceWorker.ready;
      var sub=await reg.pushManager.getSubscription();
      if(sub){
        var endpoint=sub.endpoint;
        await sub.unsubscribe();
        var cfg=window.SUPABASE_CFG;
        if(cfg&&cfg.url&&cfg.key){
          await fetch(cfg.url+"/rest/v1/push_subscriptions?endpoint=eq."+encodeURIComponent(endpoint),{
            method:"PATCH",
            headers:{"Content-Type":"application/json","apikey":cfg.key,"Authorization":"Bearer "+cfg.key,"Prefer":"return=minimal"},
            body:JSON.stringify({is_active:false})
          }).catch(function(){});
        }
        try{localStorage.removeItem("td-push-endpoint");}catch(e){}
      }
      setPushSubStatus("idle");
    }catch(err){
      setPushSubStatus("error");
    }
  }

  // Detect existing subscription on mount so the UI reflects current state
  useEffect(function(){
    if(!("serviceWorker" in navigator)||!("PushManager" in window))return;
    navigator.serviceWorker.ready.then(function(reg){
      return reg.pushManager.getSubscription();
    }).then(function(sub){
      if(sub)setPushSubStatus("subscribed");
    }).catch(function(){});
  },[]);

  function rateFeedback(logId,patternType,isCorrect){
    var fbAll={};
    try{fbAll=JSON.parse(localStorage.getItem("td-pattern-fb")||"{}");}catch(e){}
    var fb=fbAll[patternType]||{total:0,correct:0,wrong:0};
    fb.total=(fb.total||0)+1;
    if(isCorrect)fb.correct=(fb.correct||0)+1;
    else fb.wrong=(fb.wrong||0)+1;
    fbAll[patternType]=fb;
    localStorage.setItem("td-pattern-fb",JSON.stringify(fbAll));
    setPatternStats(Object.assign({},fbAll));
    setRatedLogs(function(prev){var n=Object.assign({},prev);n[logId]=isCorrect?"correct":"wrong";return n;});
  }

  function addQuickAsset(){
    var raw=addInput.trim().toUpperCase();
    if(!raw)return;
    // Auto-append USDT for bare crypto tickers (no pair suffix, no dot, no slash)
    var sym=raw;
    if(!/USDT$|BTC$|ETH$|BNB$|BUSD$/i.test(raw)&&raw.indexOf(".")===-1&&raw.indexOf("/")===-1){
      sym=raw+"USDT";
    }
    if(alertsRef.current.some(function(a){return a.symbol===sym&&a.interval===addInterval;})){setAddStatus("dup");setTimeout(function(){setAddStatus(null);},2000);return;}
    setAddStatus("checking");
    setAddFound(null);
    function onFound(resolvedSym,lbl){
      // Update input to show resolved symbol
      setAddInput(resolvedSym);
      setAddFound({sym:resolvedSym,label:lbl});
      setAddStatus("found");
    }
    // Try Binance (primary + fallback endpoint)
    function tryBinance(endpoint,s,nextFn){
      fetch(endpoint+s)
        .then(function(r){return r.json();})
        .then(function(d){
          if(d.price){onFound(s,s.replace(/USDT$/,"/USD"));}
          else{nextFn();}
        }).catch(function(){nextFn();});
    }
    function tryFinnhub(s){
      var fhKeyQ=localStorage.getItem("td-finnhub-key");
      if(!fhKeyQ){setAddStatus("nofinnhub");return;}
      fetch("https://finnhub.io/api/v1/quote?symbol="+s+"&token="+fhKeyQ)
        .then(function(r2){return r2.json();})
        .then(function(d2){if(d2.c&&d2.c>0){onFound(s,s);}else{setAddStatus("error");}})
        .catch(function(){setAddStatus("error");});
    }
    // Cadena: api.binance.com → api1.binance.com → mismo raw → Finnhub
    var BN1="https://api.binance.com/api/v3/ticker/price?symbol=";
    var BN2="https://api1.binance.com/api/v3/ticker/price?symbol=";
    tryBinance(BN1,sym,function(){
      tryBinance(BN2,sym,function(){
        if(sym!==raw){
          tryBinance(BN1,raw,function(){
            tryBinance(BN2,raw,function(){tryFinnhub(raw);});
          });
        }else{tryFinnhub(raw);}
      });
    });
  }

  function confirmAddAsset(){
    if(!addFound)return;
    var ovT=parseInt(addConfig.rsiOversoldTarget);
    var obT=parseInt(addConfig.rsiOverboughtTarget);
    var cuT=parseInt(addConfig.rsiCustomTarget);
    if(addConfig.rsiOversoldEnabled&&(isNaN(ovT)||ovT<1||ovT>99)){setAddStatus("error");return;}
    if(addConfig.rsiOverboughtEnabled&&(isNaN(obT)||obT<1||obT>99)){setAddStatus("error");return;}
    if(addConfig.rsiCustomEnabled&&(isNaN(cuT)||cuT<1||cuT>99)){setAddStatus("error");return;}
    var sym=addFound.sym;
    var lbl=addFound.label;
    var na={id:Date.now(),symbol:sym,label:lbl,interval:addInterval,
      rsiOversoldEnabled:addConfig.rsiOversoldEnabled,rsiOversoldTarget:isNaN(ovT)?30:ovT,
      rsiOverboughtEnabled:addConfig.rsiOverboughtEnabled,rsiOverboughtTarget:isNaN(obT)?70:obT,
      emaCross725Enabled:addConfig.emaCross725Enabled,
      emaCross50200Enabled:addConfig.emaCross50200Enabled,
      rsiDivEnabled:addConfig.rsiDivEnabled,
      rsiCustomEnabled:addConfig.rsiCustomEnabled,
      rsiCustomTarget:isNaN(cuT)?50:cuT,
      rsiCustomCondition:addConfig.rsiCustomCondition||"below",
      channelEnabled:true,fvgEnabled:true,
      active:true,currentRsi:null,currentPrice:null,error:false};
    var upd=[...alertsRef.current,na];
    saveAlerts(upd);
    startAlert(na);
    setAddInput("");
    setAddFound(null);
    setAddStatus("ok");
    setTimeout(function(){setAddStatus(null);},2000);
  }

  function sendAlert(label,interval,rsi,type,e1,e2,customDesc,price,extra){
    if(globalPausedRef.current)return;
    var extra=extra||{};
    const isPriceAlert=type==="price_target";
    const tf=isPriceAlert?"Precio":interval==="1h"?"1H":interval==="4h"?"4H":interval==="1d"?"Diario":"Semanal";
    const priceStr=price!=null?" | $"+parseFloat(price).toLocaleString("es-ES",{maximumFractionDigits:2}):"";
    var title="Alerta Trading";
    var body="";
    var isEMACross=false;var emaCrossLabel="";
    if(type==="rsi_custom"){title="🎯 RSI Personalizado";body=(customDesc||"RSI "+rsi)+priceStr;}
    else if(type==="golden"){title="🌟 Cruce Dorado EMA 7/25";isEMACross=true;emaCrossLabel="Dorado — EMA7 cruza EMA25 al alza";}
    else if(type==="death"){title="💀 Cruce de la Muerte EMA 7/25";isEMACross=true;emaCrossLabel="Muerte — EMA7 cruza EMA25 a la baja";}
    else if(type==="ema200_golden"){title="🌟 Cruce Dorado EMA 50/200";isEMACross=true;emaCrossLabel="Dorado — EMA50 cruza EMA200 al alza";}
    else if(type==="ema200_death"){title="💀 Cruce de la Muerte EMA 50/200";isEMACross=true;emaCrossLabel="Muerte — EMA50 cruza EMA200 a la baja";}
    else if(type==="price_target"){title="💰 Precio Objetivo";body=customDesc||label+" — PRECIO ALCANZADO $"+parseFloat(price).toFixed(2);}
    else if(type==="rsi_oversold"){title="📉 RSI Sobreventa";}
    else if(type==="rsi_overbought"){title="📈 RSI Sobrecompra";}
    else if(type==="rsi_div_bull"){title="🟢 Divergencia Alcista RSI";}
    else if(type==="rsi_div_bear"){title="🔴 Divergencia Bajista RSI";}
    else if(type==="rsi_conv_bull"){title="📈 Convergencia Alcista RSI";}
    else if(type==="rsi_conv_bear"){title="📉 Convergencia Bajista RSI";}
    else if(type==="rsi_hdiv_bull"){title="🟩 Div. Oculta Alcista RSI";}
    else if(type==="rsi_hdiv_bear"){title="🟥 Div. Oculta Bajista RSI";}
    else if(type==="patron_combo"){title="🔥 Patrón Combinado";body=(customDesc||"")+priceStr;}
    else if(type==="patron_canal"){title="📐 Canal Detectado";body=(customDesc||"")+priceStr;}
    else if(type==="patron_fvg"){title="⚡ Precio en FVG";body=(customDesc||"")+priceStr;}
    else if(type==="canal_bajista_soporte"){title="📐 Canal Bajista — Precio en Soporte";body=(customDesc||"")+priceStr;}
    else if(type==="canal_bajista_resistencia"){title="📐 Canal Bajista — Precio en Resistencia";body=(customDesc||"")+priceStr;}
    else if(type==="canal_bajista_ruptura_alcista"){title="🚨 Canal Bajista — Ruptura Alcista Confirmada";body=label+" "+tf+priceStr;}
    else if(type==="canal_bajista_ruptura_bajista"){title="🚨 Canal Bajista — Ruptura Bajista Confirmada";body=label+" "+tf+priceStr;}
    else if(type==="canal_alcista_ruptura_alcista"){title="🚨 Canal Alcista — Ruptura Alcista Confirmada";body=label+" "+tf+priceStr;}
    else if(type==="canal_alcista_ruptura_bajista"){title="🚨 Canal Alcista — Ruptura Bajista Confirmada";body=label+" "+tf+priceStr;}
    else if(type==="canal_bajista_retest_bull"){title="🎯 Canal Bajista — Entrada Retesteo Alcista";body=label+" "+tf+priceStr;}
    else if(type==="canal_bajista_retest_bear"){title="🎯 Canal Bajista — Entrada Retesteo Bajista";body=label+" "+tf+priceStr;}
    else if(type==="canal_alcista_retest_bull"){title="🎯 Canal Alcista — Entrada Retesteo Alcista";body=label+" "+tf+priceStr;}
    else if(type==="canal_alcista_retest_bear"){title="🎯 Canal Alcista — Entrada Retesteo Bajista";body=label+" "+tf+priceStr;}
    else if(customDesc){title="Alerta";body=customDesc+priceStr;}
    else{title="Alerta";body=type+priceStr;}
    // Body corto para la UI (sin toda la info del Telegram)
    if(!body)body=label+" "+tf+priceStr;
    // ─── IN-APP: log + banner + vibración ───
    var ts=new Date().toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"});
    var logEntry={id:Date.now()+Math.random(),type:type,label:label,interval:interval,title:title,body:body,time:ts,date:new Date().toLocaleDateString("es-ES")};
    setLogs(function(prev){
      var next=[logEntry].concat(prev).slice(0,50);
      try{localStorage.setItem("td-alert-logs",JSON.stringify(next));}catch(e){}
      return next;
    });
    setLastAlert(logEntry);
    if(navigator.vibrate)navigator.vibrate([200,100,200]);
    setTimeout(function(){setLastAlert(function(cur){return cur&&cur===logEntry?null:cur;});},8000);
    // ─── TELEGRAM: formato estructurado ───
    var tk=localStorage.getItem("td-tg-token");
    var cid=localStorage.getItem("td-tg-chatid");
    if(tk&&cid){
      // Contexto div/conv
      var dr=extra.divResult;
      var divConvLine="Sin div/conv";
      if(dr){
        if(dr.kind==="divergence"&&dr.type==="bullish")divConvLine="🟢 Divergencia alcista";
        else if(dr.kind==="divergence"&&dr.type==="bearish")divConvLine="🔴 Divergencia bajista";
        else if(dr.kind==="convergence"&&dr.type==="bullish")divConvLine="📈 Convergencia alcista";
        else if(dr.kind==="convergence"&&dr.type==="bearish")divConvLine="📉 Convergencia bajista";
        else if(dr.kind==="hidden_divergence"&&dr.type==="bullish")divConvLine="🟩 Div. oculta alcista";
        else if(dr.kind==="hidden_divergence"&&dr.type==="bearish")divConvLine="🟥 Div. oculta bajista";
      }
      // ─── CONFLUENCIA: registrar señal y calcular señales alineadas ───
      var BULLISH_TYPES=["rsi_oversold","golden","ema200_golden","rsi_div_bull","rsi_conv_bull","rsi_hdiv_bull","patron_fvg","canal_bajista_ruptura_alcista","canal_alcista_ruptura_alcista","canal_bajista_retest_bull","canal_alcista_retest_bull"];
      var BEARISH_TYPES=["rsi_overbought","death","ema200_death","rsi_div_bear","rsi_conv_bear","rsi_hdiv_bear","canal_alcista_ruptura_bajista","canal_bajista_ruptura_bajista","canal_alcista_retest_bear","canal_bajista_retest_bear"];
      var confKey=label+"|"+interval;
      if(!confluenceRef.current[confKey])confluenceRef.current[confKey]={};
      confluenceRef.current[confKey][type]=Date.now();
      var confWindowMs={"1h":7200000,"4h":28800000,"1d":172800000,"1w":1209600000};
      var confWindow=confWindowMs[interval]||28800000;
      var confNow=Date.now();
      var confMap=confluenceRef.current[confKey];
      var SIGNAL_LABELS={"rsi_oversold":"RSI sobreventa","rsi_overbought":"RSI sobrecompra","golden":"Cruce dorado EMA 7/25","death":"Cruce muerte EMA 7/25","ema200_golden":"Cruce dorado EMA 50/200","ema200_death":"Cruce muerte EMA 50/200","rsi_div_bull":"Divergencia alcista RSI","rsi_div_bear":"Divergencia bajista RSI","rsi_conv_bull":"Convergencia alcista RSI","rsi_conv_bear":"Convergencia bajista RSI","rsi_hdiv_bull":"Div. oculta alcista RSI","rsi_hdiv_bear":"Div. oculta bajista RSI","patron_fvg":"Precio en FVG (soporte)","canal_bajista_ruptura_alcista":"Canal bajista — ruptura alcista confirmada","canal_alcista_ruptura_alcista":"Canal alcista — ruptura alcista confirmada","canal_alcista_ruptura_bajista":"Canal alcista — ruptura bajista confirmada","canal_bajista_ruptura_bajista":"Canal bajista — ruptura bajista confirmada","canal_bajista_retest_bull":"Canal bajista — entrada retesteo alcista","canal_bajista_retest_bear":"Canal bajista — entrada retesteo bajista","canal_alcista_retest_bull":"Canal alcista — entrada retesteo alcista","canal_alcista_retest_bear":"Canal alcista — entrada retesteo bajista"};
      var ohlcData=extra.ohlc||[];
      var isLong=BULLISH_TYPES.indexOf(type)>=0;
      var alignedTypes=isLong?BULLISH_TYPES:BEARISH_TYPES;
      var activeSignals=alignedTypes.filter(function(t){return confMap[t]&&(confNow-confMap[t])<confWindow;});
      var confluenceCount=activeSignals.length;
      var sugDir=isLong?"Long":"Short";
      // ─── CONFLUENCIA MULTI-TEMPORALIDAD ───
      var MTF_ALL=["1h","4h","1d","1w"];
      var tfConfs=[];
      MTF_ALL.forEach(function(tfMtf){
        var tfW=confWindowMs[tfMtf]||28800000;
        var tfM=confluenceRef.current[label+"|"+tfMtf]||{};
        var tfS=alignedTypes.filter(function(t2){return tfM[t2]&&(confNow-tfM[t2])<tfW;});
        if(tfS.length>0)tfConfs.push({tf:tfMtf,signals:tfS});
      });
      var crossTfCount=tfConfs.length;
      var hasMultiTfConf=crossTfCount>=2;
      // TF menor de la confluencia dicta el rango de TP (TF menor manda)
      var TF_LIST_ORD=["1h","4h","1d","1w"];
      var lowestTf=interval;
      for(var tfor=0;tfor<TF_LIST_ORD.length;tfor++){var tforK=TF_LIST_ORD[tfor];if(tfConfs.some(function(c){return c.tf===tforK;})){lowestTf=tforK;break;}}
      // ─── COOLDOWN + CONFIRMACIÓN de alertas OPERACIÓN por (label, interval, dir) ───
      var opCooldownCandles=3;
      var opIntervalMs={"1h":3600000,"4h":14400000,"1d":86400000,"1w":604800000}[interval]||14400000;
      var opKeySame=label+"|"+interval+"|"+sugDir;
      var opKeyOpp=label+"|"+interval+"|"+(sugDir==="Long"?"Short":"Long");
      var lastSameOp=opAlertRef.current[opKeySame]||0;
      var lastOppOp=opAlertRef.current[opKeyOpp]||0;
      var opSameBlocked=(Date.now()-lastSameOp)<opIntervalMs*opCooldownCandles;
      var opOppRecent=(Date.now()-lastOppOp)<opIntervalMs*opCooldownCandles;
      // Si hubo dirección opuesta reciente, exigir 2 cierres consecutivos en la nueva dirección con volumen creciente
      var opOppConfirmed=true;
      if(opOppRecent&&ohlcData.length>=3){
        var last2=ohlcData.slice(-3,-1); // 2 velas cerradas previas a la actual
        if(last2.length===2){
          var dirOk=isLong?(last2[0].c>last2[0].o&&last2[1].c>last2[1].o):(last2[0].c<last2[0].o&&last2[1].c<last2[1].o);
          var volOk=(last2[0].v||0)>0&&(last2[1].v||0)>=(last2[0].v||0);
          opOppConfirmed=dirOk&&volOk;
        }else{opOppConfirmed=false;}
      }
      var opAllowed=hasMultiTfConf&&!opSameBlocked&&opOppConfirmed;
      // ─── Jerarquía HTF: flag si hay señal opuesta activa en 1D/1W ───
      var htfCounterTrend=false;
      if(hasMultiTfConf&&(interval==="1h"||interval==="4h")){
        var htfOpposite=(isLong?BEARISH_TYPES:BULLISH_TYPES);
        ["1d","1w"].forEach(function(htfTf){
          var htfMap=confluenceRef.current[label+"|"+htfTf]||{};
          var htfW=confWindowMs[htfTf]||172800000;
          var hasOpp=htfOpposite.some(function(t2){return htfMap[t2]&&(confNow-htfMap[t2])<htfW;});
          if(hasOpp)htfCounterTrend=true;
        });
      }
      var isDivConv=(type==="rsi_div_bull"||type==="rsi_div_bear"||type==="rsi_conv_bull"||type==="rsi_conv_bear");
      // ─── DETECCIÓN DE CONFLICTO: señales contrarias activas en algún TF ───
      var oppositeTypes2=isLong?BEARISH_TYPES:BULLISH_TYPES;
      var conflictTfs=[];
      MTF_ALL.forEach(function(tfMtf2){
        var tfW2=confWindowMs[tfMtf2]||28800000;
        var tfM2=confluenceRef.current[label+"|"+tfMtf2]||{};
        var tfConflict=oppositeTypes2.filter(function(t2){return tfM2[t2]&&(confNow-tfM2[t2])<tfW2;});
        if(tfConflict.length>0)conflictTfs.push({tf:tfMtf2,signals:tfConflict});
      });
      var hasConflict=conflictTfs.length>0;
      // ─── HELPER: buscar FVG más cercano dentro de maxPct del precio ───
      var findNearFVG=function(ohlcArr,refPrice,bullish,maxPct){
        var best=null,scanStart=Math.max(2,ohlcArr.length-80);
        for(var ii=scanStart;ii<ohlcArr.length;ii++){
          var f0=ohlcArr[ii-2],f2=ohlcArr[ii];
          if(bullish&&f2.l>f0.h){
            var gap=f2.l-f0.h;if(gap/refPrice<0.0005)continue;
            var mid=(f2.l+f0.h)/2,dist=Math.abs(mid-refPrice)/refPrice;
            if(dist<=maxPct&&(!best||dist<Math.abs(best.mid-refPrice)/refPrice))
              best={mid:mid,top:f2.l,bot:f0.h,note:"FVG alcista $"+f0.h.toFixed(2)+"–$"+f2.l.toFixed(2)};
          }
          if(!bullish&&f2.h<f0.l){
            var gap2=f0.l-f2.h;if(gap2/refPrice<0.0005)continue;
            var mid2=(f2.h+f0.l)/2,dist2=Math.abs(mid2-refPrice)/refPrice;
            if(dist2<=maxPct&&(!best||dist2<Math.abs(best.mid-refPrice)/refPrice))
              best={mid:mid2,top:f0.l,bot:f2.h,note:"FVG bajista $"+f2.h.toFixed(2)+"–$"+f0.l.toFixed(2)};
          }
        }
        return best;
      };
      var findFVGforTP=function(ohlcArr,refPrice,bullish,minRatio,riskA){
        var cands=[];var scanStart2=Math.max(2,ohlcArr.length-80);
        for(var fi=scanStart2;fi<ohlcArr.length;fi++){
          var fc0=ohlcArr[fi-2],fc2=ohlcArr[fi];
          if(bullish&&fc2.l>fc0.h){
            var gS=fc2.l-fc0.h;if(gS/refPrice<0.0005)continue;
            var fM=(fc2.l+fc0.h)/2;
            if(fM>refPrice)cands.push({price:fM,note:"FVG alcista $"+fc0.h.toFixed(2)+"–$"+fc2.l.toFixed(2)});
          }
          if(!bullish&&fc2.h<fc0.l){
            var gS2=fc0.l-fc2.h;if(gS2/refPrice<0.0005)continue;
            var fM2=(fc2.h+fc0.l)/2;
            if(fM2<refPrice)cands.push({price:fM2,note:"FVG bajista $"+fc2.h.toFixed(2)+"–$"+fc0.l.toFixed(2)});
          }
        }
        cands.sort(function(a,b){return Math.abs(a.price-refPrice)-Math.abs(b.price-refPrice);});
        for(var ci2=0;ci2<cands.length;ci2++){
          if(riskA>0&&Math.abs(cands[ci2].price-refPrice)/riskA>=minRatio)return cands[ci2];
        }
        return null;
      };
      // FVG más LEJANO en dirección del trade — target máximo
      var findFarFVG=function(ohlcArr,refPrice,bullish){
        var best=null,bestDist=0;
        var sc=Math.max(2,ohlcArr.length-150);
        for(var ffi=sc;ffi<ohlcArr.length;ffi++){
          var ff0=ohlcArr[ffi-2],ff2=ohlcArr[ffi];
          if(bullish&&ff2.l>ff0.h){
            var ffM=(ff2.l+ff0.h)/2;
            if(ffM>refPrice&&(ff2.l-ff0.h)/refPrice>0.0005){var ffD=ffM-refPrice;if(!best||ffD>bestDist){best={mid:ffM,top:ff2.l,bot:ff0.h};bestDist=ffD;}}
          }
          if(!bullish&&ff2.h<ff0.l){
            var ffM2=(ff2.h+ff0.l)/2;
            if(ffM2<refPrice&&(ff0.l-ff2.h)/refPrice>0.0005){var ffD2=refPrice-ffM2;if(!best||ffD2>bestDist){best={mid:ffM2,top:ff0.l,bot:ff2.h};bestDist=ffD2;}}
          }
        }
        return best;
      };
      // Recopilar OHLC de todas las temporalidades para este activo
      var trigAlertFvg=alertsRef.current.find(function(a){return a.label===label&&a.interval===interval;});
      var baseSymFvg=trigAlertFvg?trigAlertFvg.symbol:"";
      var ohlcByTf={};
      ["1h","4h","1d","1w"].forEach(function(tfk){ohlcByTf[tfk]=ohlcRef.current[baseSymFvg+tfk]||[];});
      // FVG más cercano — buscar primero en TF actual, luego en otros si no hay
      var fvgNearEntry=null;
      var ohlcSrcEntry=ohlcData.length>4?ohlcData:(ohlcByTf["1h"].length>4?ohlcByTf["1h"]:[]);
      if(ohlcSrcEntry.length>4)fvgNearEntry=findNearFVG(ohlcSrcEntry,price||0,isLong,0.05);
      if(!fvgNearEntry){
        var tfOrder=["4h","1d","1h","1w"];
        for(var ti=0;ti<tfOrder.length;ti++){
          if(ohlcByTf[tfOrder[ti]].length>4){fvgNearEntry=findNearFVG(ohlcByTf[tfOrder[ti]],price||0,isLong,0.08);if(fvgNearEntry)break;}
        }
      }
      // FVG más lejano — solo TF de la señal + siguiente TF (regla alineación de TP)
      var fvgFarExit=null,fvgFarDist=0;
      var fvgTfLabel="";
      var tpTfChain={"1h":["1h","4h"],"4h":["4h","1d"],"1d":["1d","1w"],"1w":["1w"]};
      var allowedTpTfs=tpTfChain[interval]||[interval];
      var allFvgSrc=ohlcData.length>4?[{tf:interval,ohlc:ohlcData}]:[];
      allowedTpTfs.forEach(function(tfk2){
        if(tfk2!==interval&&ohlcByTf[tfk2]&&ohlcByTf[tfk2].length>4)allFvgSrc.push({tf:tfk2,ohlc:ohlcByTf[tfk2]});
      });
      allFvgSrc.forEach(function(src){
        var cand=findFarFVG(src.ohlc,price||0,isLong);
        if(cand){var d=Math.abs(cand.mid-(price||0));if(!fvgFarExit||d>fvgFarDist){fvgFarExit=cand;fvgFarDist=d;fvgTfLabel={"1h":"1H","4h":"4H","1d":"1D","1w":"1W"}[src.tf]||src.tf;}}
      });

      // ─── PRECIO DE ENTRADA: FVG más cercano (ICT) → fallback señal específica ───
      var entryPrice=price||0;
      var entryNote="";
      if(fvgNearEntry){
        entryPrice=parseFloat((isLong?fvgNearEntry.top:fvgNearEntry.bot).toFixed(2));
        entryNote=isLong?"Zona FVG alcista (orden en $"+entryPrice.toLocaleString("es-ES",{maximumFractionDigits:2})+")":"Zona FVG bajista (orden en $"+entryPrice.toLocaleString("es-ES",{maximumFractionDigits:2})+")";
      }else if((type==="canal_alcista_soporte")&&extra.channelResult&&extra.channelResult.botLine){
        entryPrice=parseFloat(parseFloat(extra.channelResult.botLine).toFixed(2));
        entryNote="Soporte canal";
      }else if((type==="canal_bajista_resistencia")&&extra.channelResult&&extra.channelResult.topLine){
        entryPrice=parseFloat(parseFloat(extra.channelResult.topLine).toFixed(2));
        entryNote="Resistencia canal";
      }else if((type==="canal_bajista_ruptura_alcista"||type==="canal_alcista_ruptura_alcista")&&extra.channelResult&&extra.channelResult.topLine){
        entryPrice=parseFloat(parseFloat(extra.channelResult.topLine).toFixed(2));
        entryNote="Resistencia rota (retest)";
      }else if((type==="canal_alcista_ruptura_bajista"||type==="canal_bajista_ruptura_bajista")&&extra.channelResult&&extra.channelResult.botLine){
        entryPrice=parseFloat(parseFloat(extra.channelResult.botLine).toFixed(2));
        entryNote="Soporte roto (retest)";
      }else if((type==="golden"||type==="death")&&e1&&e1>0){
        entryPrice=parseFloat(parseFloat(e1).toFixed(2));
        entryNote=isLong?"EMA7 (sin FVG cercano)":"EMA7 (sin FVG cercano)";
      }else if((type==="ema200_golden"||type==="ema200_death")&&e1&&e1>0){
        entryPrice=parseFloat(parseFloat(e1).toFixed(2));
        entryNote="EMA50 (sin FVG cercano)";
      }

      // ─── SL según estrategia ───
      var slPrice=0;
      if(type==="golden"&&e2&&e2>0){
        // Golden cross 7/25: SL 0.5% debajo de EMA25 (soporte dinámico del pullback)
        slPrice=parseFloat((parseFloat(e2)*0.995).toFixed(2));
      }else if(type==="ema200_golden"&&e2&&e2>0){
        // Golden cross 50/200: SL 0.5% debajo de EMA200
        slPrice=parseFloat((parseFloat(e2)*0.995).toFixed(2));
      }else if(type==="death"){
        // Death cross 7/25: short desde EMA7 (ahora resistencia), SL 1.2% encima
        slPrice=parseFloat((entryPrice*1.012).toFixed(2));
      }else if(type==="ema200_death"){
        // Death cross 50/200: short desde EMA50, SL 1.5% encima del rebote
        slPrice=parseFloat((entryPrice*1.015).toFixed(2));
      }else if(type==="canal_alcista_soporte"&&extra.channelResult&&extra.channelResult.botLine){
        slPrice=parseFloat((parseFloat(extra.channelResult.botLine)*0.995).toFixed(2));
      }else if(type==="canal_bajista_resistencia"&&extra.channelResult&&extra.channelResult.topLine){
        slPrice=parseFloat((parseFloat(extra.channelResult.topLine)*1.005).toFixed(2));
      }else if((type==="rsi_div_bull"||type==="rsi_oversold")&&ohlcData.length>=5){
        var rLows=ohlcData.slice(-5).map(function(c){return c.l;});
        slPrice=parseFloat((Math.min.apply(null,rLows)*0.99).toFixed(2));
      }else if((type==="rsi_div_bear"||type==="rsi_overbought")&&ohlcData.length>=5){
        var rHighs=ohlcData.slice(-5).map(function(c){return c.h;});
        slPrice=parseFloat((Math.max.apply(null,rHighs)*1.01).toFixed(2));
      }else{
        slPrice=isLong?parseFloat((entryPrice*0.98).toFixed(2)):parseFloat((entryPrice*1.02).toFixed(2));
      }
      // Validar lado correcto
      if(isLong&&slPrice>=entryPrice)slPrice=parseFloat((entryPrice*0.98).toFixed(2));
      if(!isLong&&slPrice<=entryPrice)slPrice=parseFloat((entryPrice*1.02).toFixed(2));

      // ─── TP: FVG más cercano válido en propia TF → FVG lejano con cap → fallback 1:2 ───
      var tpPrice=null;var tpNote="1:2 mínimo";
      var riskAmt=Math.abs(entryPrice-slPrice);
      // Rango de TP por TF — la TF menor de la confluencia dicta el rango (TF menor manda)
      var TP_RANGES={"1h":{min:0.008,max:0.025},"4h":{min:0.020,max:0.05},"1d":{min:0.040,max:0.10},"1w":{min:0.080,max:0.25}};
      var tpRangeDictTf=hasMultiTfConf?lowestTf:interval;
      var tpRangeObj=TP_RANGES[tpRangeDictTf]||{min:0.008,max:0.05};
      var tpMinPct=tpRangeObj.min;
      var tpMaxPct=tpRangeObj.max;
      // Primero: FVG más cercano válido en la propia temporalidad (ratio ≥ 1.5, dentro del rango de TF menor)
      if(ohlcData.length>4&&riskAmt>0){
        var fvgTP=findFVGforTP(ohlcData,entryPrice,isLong,1.5,riskAmt);
        if(fvgTP){
          var fvgTPpct=Math.abs(fvgTP.price-entryPrice)/(entryPrice||1);
          if(fvgTPpct>=tpMinPct&&fvgTPpct<=tpMaxPct){tpPrice=fvgTP.price;tpNote="FVG "+interval.toUpperCase()+" $"+fvgTP.note.replace(/^FVG [a-z]+ /,"");}
        }
      }
      // Segundo: FVG lejano multi-TF limitado por rango de TF menor
      if(!tpPrice&&fvgFarExit){
        var farRatio=riskAmt>0?Math.abs(fvgFarExit.mid-entryPrice)/riskAmt:0;
        var farPct=Math.abs(fvgFarExit.mid-entryPrice)/(entryPrice||1);
        if(farRatio>=1.5&&farPct>=tpMinPct&&farPct<=tpMaxPct){tpPrice=parseFloat(fvgFarExit.mid.toFixed(2));tpNote="FVG ["+fvgTfLabel+"] $"+fvgFarExit.bot.toFixed(2)+"–$"+fvgFarExit.top.toFixed(2);}
      }
      // Death cross 7/25: TP primario = EMA50
      if(type==="death"&&extra.ema50&&extra.ema50>0&&extra.ema50<entryPrice){
        var e50r=entryPrice-extra.ema50;
        if(riskAmt>0&&e50r/riskAmt>=1.5){tpPrice=parseFloat(extra.ema50.toFixed(2));tpNote="EMA50 (soporte primario)";}
      }
      // Death cross 50/200: TP en soporte reciente (swing low últimas 20 velas)
      if(!tpPrice&&type==="ema200_death"&&ohlcData.length>=20){
        var recLows=ohlcData.slice(-20).map(function(c){return c.l;}).filter(function(l){return l<entryPrice;}).sort(function(a,b){return b-a;});
        for(var rli=0;rli<recLows.length;rli++){
          if(riskAmt>0&&(entryPrice-recLows[rli])/riskAmt>=1.5){tpPrice=parseFloat(recLows[rli].toFixed(2));tpNote="Soporte estructura reciente";break;}
        }
      }
      // Canal soporte/resistencia: TP en la línea opuesta del canal
      if(!tpPrice&&type==="canal_alcista_soporte"&&extra.channelResult&&extra.channelResult.topLine){
        var chT=parseFloat(extra.channelResult.topLine);
        if(riskAmt>0&&Math.abs(chT-entryPrice)/riskAmt>=1.5){tpPrice=chT;tpNote="Resistencia canal";}
      }
      if(!tpPrice&&type==="canal_bajista_resistencia"&&extra.channelResult&&extra.channelResult.botLine){
        var chB=parseFloat(extra.channelResult.botLine);
        if(riskAmt>0&&Math.abs(chB-entryPrice)/riskAmt>=1.5){tpPrice=chB;tpNote="Soporte canal";}
      }
      // Señales bajistas RSI/divergencias: TP primario = EMA50
      if(!tpPrice&&(type==="rsi_overbought"||type==="rsi_div_bear"||type==="rsi_conv_bear")&&extra.ema50&&extra.ema50>0&&extra.ema50<entryPrice){
        var e50r2=entryPrice-extra.ema50;
        if(riskAmt>0&&e50r2/riskAmt>=1.5){tpPrice=parseFloat(extra.ema50.toFixed(2));tpNote="EMA50";}
      }
      // Swing estructural de la TF menor como fallback cuando no hay FVG en rango
      var tpManualTarget=false;
      if(!tpPrice&&hasMultiTfConf){
        var lowestTfOhlcFb=ohlcByTf[lowestTf]||ohlcData;
        if(lowestTfOhlcFb.length>=10){
          var swCands=[];var swStart=Math.max(0,lowestTfOhlcFb.length-30);
          for(var swi=swStart;swi<lowestTfOhlcFb.length-1;swi++){
            var swLvl=isLong?lowestTfOhlcFb[swi].h:lowestTfOhlcFb[swi].l;
            var swPct=Math.abs(swLvl-entryPrice)/(entryPrice||1);
            if(isLong&&swLvl>entryPrice&&swPct>=tpMinPct&&swPct<=tpMaxPct)swCands.push({price:swLvl,pct:swPct});
            else if(!isLong&&swLvl<entryPrice&&swPct>=tpMinPct&&swPct<=tpMaxPct)swCands.push({price:swLvl,pct:swPct});
          }
          swCands.sort(function(a,b){return a.pct-b.pct;});
          for(var swci=0;swci<swCands.length;swci++){
            if(riskAmt>0&&Math.abs(swCands[swci].price-entryPrice)/riskAmt>=1.5){
              tpPrice=parseFloat(swCands[swci].price.toFixed(2));
              tpNote="Swing "+lowestTf.toUpperCase()+" [rango "+lowestTf.toUpperCase()+": "+(tpMinPct*100).toFixed(1)+"–"+(tpMaxPct*100).toFixed(1)+"%]";
              break;
            }
          }
        }
        if(!tpPrice)tpManualTarget=true;
      }
      // Último fallback: 1:2
      if(!tpPrice){tpPrice=isLong?entryPrice+riskAmt*2:entryPrice-riskAmt*2;}
      if(tpManualTarget){tpNote="⚠️ Sin objetivo en rango "+lowestTf.toUpperCase()+" ("+(tpMinPct*100).toFixed(1)+"–"+(tpMaxPct*100).toFixed(1)+"%) — gestión manual del objetivo";}
      // Cap FINAL — todas las rutas de TP deben respetar tpMaxPct para su TF
      var tpDistPct=Math.abs(tpPrice-entryPrice)/(entryPrice||1);
      if(tpDistPct>tpMaxPct){
        var cappedDist=entryPrice*tpMaxPct;
        tpPrice=isLong?parseFloat((entryPrice+cappedDist).toFixed(2)):parseFloat((entryPrice-cappedDist).toFixed(2));
        tpNote=tpNote+" (recortado a TF "+lowestTf.toUpperCase()+")";
      }
      var rewardAmt=Math.abs(tpPrice-entryPrice);
      var ratioNum=riskAmt>0?rewardAmt/riskAmt:0;
      var ratioBot=riskAmt>0?ratioNum.toFixed(2):"--";
      var rrInsufficient=riskAmt>0&&ratioNum<1.0;
      var slPctShow=((Math.abs(entryPrice-slPrice)/entryPrice)*100).toFixed(1);
      var tpPctShow=((Math.abs(tpPrice-entryPrice)/entryPrice)*100).toFixed(1);
      var hasConfluence=confluenceCount>=2;
      // Leer historial de feedback para este tipo de señal
      var fbAllProb={};
      try{fbAllProb=JSON.parse(localStorage.getItem("td-pattern-fb")||"{}");}catch(e){}
      var fbStatsProb=fbAllProb[type]||{total:0,correct:0};
      var fbRate=fbStatsProb.total>=3?(fbStatsProb.correct/fbStatsProb.total):null;
      // Aprendizaje: ajustar umbral de confluencia y bloquear señales con mal historial
      // Con buen historial (>=5 señales, tasa >65%) → bajar umbral a 1 señal
      var learnedThreshold=(fbStatsProb.total>=5&&fbRate!==null&&fbRate>0.65)?1:2;
      var hasConfluenceLearned=confluenceCount>=learnedThreshold;
      // Bloquear si mal historial confirmado (>=8 señales, tasa <35%)
      var fbBlocked=fbStatsProb.total>=8&&fbRate!==null&&fbRate<0.35;
      // Advertir si rendimiento bajo pero no bloqueado (>=5 señales, tasa 35-50%)
      var fbLowPerf=!fbBlocked&&fbStatsProb.total>=5&&fbRate!==null&&fbRate<0.50;
      // Usar confluencia aprendida (salvo bloqueo)
      var hasConfluence=hasConfluenceLearned&&!fbBlocked;
      // Calcular probabilidad estimada (mejora con feedback histórico)
      var probPct=null;
      if(hasConfluenceLearned){
        // Base: 55% para 2 señales, +8% por cada señal extra (máx 82%); para 1 señal con historial: base 60%
        var basePct=learnedThreshold===1?60:Math.min(82,55+(confluenceCount-2)*8);
        if(fbStatsProb.total>=10){
          probPct=Math.round(fbStatsProb.correct/fbStatsProb.total*100);
        }else if(fbStatsProb.total>=3){
          var histPct2=fbStatsProb.correct/fbStatsProb.total*100;
          var w=fbStatsProb.total/10;
          probPct=Math.round(histPct2*w+basePct*(1-w));
        }else{
          probPct=basePct;
        }
      }
      // Guardar operación bot solo si confluencia aprendida y ratio ok, y no bloqueado
      if(hasConfluence){
        var botOp={id:Date.now(),date:new Date().toLocaleDateString("es-ES"),time:new Date().toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"}),asset:label,interval:tf,signal:type,dir:sugDir,entry:parseFloat(entryPrice.toFixed(4)),sl:parseFloat(slPrice.toFixed(4)),tp:parseFloat(tpPrice.toFixed(4)),ratio:parseFloat(ratioBot),tpNote:tpNote,result:null,hit:null};
        try{var prevBotOps=JSON.parse(localStorage.getItem("td-bot-ops")||"[]");prevBotOps.unshift(botOp);localStorage.setItem("td-bot-ops",JSON.stringify(prevBotOps.slice(0,100)));}catch(e){}
      }
      // Construir mensaje Telegram
      var tgLines=[];
      tgLines.push("📊 "+title);
      tgLines.push("");
      tgLines.push("📅 Temporalidad: "+tf+"  |  "+label);
      if(isEMACross)tgLines.push("🔀 Cruce EMAs: "+emaCrossLabel);
      var isDivType=(type==="rsi_div_bull"||type==="rsi_div_bear"||type==="rsi_conv_bull"||type==="rsi_conv_bear"||type==="rsi_hdiv_bull"||type==="rsi_hdiv_bear");
      tgLines.push("📊 RSI: "+(rsi!=null?rsi.toFixed(1):"--")+(type!=="rsi_oversold"&&type!=="rsi_overbought"&&type!=="rsi_custom"&&!isDivType?" | "+divConvLine:""));
      if(isDivType&&extra.divVolMult!==null&&extra.divVolMult!==undefined){
        tgLines.push("📊 Vol. vela: "+extra.divVolMult+"× MA20 ✅");
      }
      tgLines.push("💰 Precio mercado: $"+parseFloat(price||0).toLocaleString("es-ES",{maximumFractionDigits:4}));
      tgLines.push("📈 Volumen: "+(extra.volDir||"Desconocido"));
      // ─── Confluencia multi-TF en el mensaje ───
      tgLines.push("");
      var TF_LABELS_MSG={"1h":"1H","4h":"4H","1d":"Diario","1w":"Semanal"};
      if(tfConfs.length>0){
        tgLines.push("🔀 Confluencia MULTI-TF ("+crossTfCount+" temporalidades "+sugDir+"):");
        tfConfs.forEach(function(tfc){
          var tfLbl=TF_LABELS_MSG[tfc.tf]||tfc.tf;
          var sigLbls=tfc.signals.map(function(t){return SIGNAL_LABELS[t]||t;}).join(", ");
          tgLines.push("   ✅ "+tfLbl+": "+sigLbls);
        });
      }else if(activeSignals.length>0){
        var signalNames=activeSignals.map(function(t){return SIGNAL_LABELS[t]||t;});
        tgLines.push("🔀 Señal en "+tf+" ("+confluenceCount+"):");
        signalNames.forEach(function(s){tgLines.push("   • "+s);});
      }
      tgLines.push("");
      if(fbBlocked){
        tgLines.push("🚫 Operación BLOQUEADA por mal historial:");
        tgLines.push("   "+fbStatsProb.correct+"/"+fbStatsProb.total+" aciertos ("+(fbRate!==null?Math.round(fbRate*100):0)+"%) — mínimo 35%");
      }else if(hasMultiTfConf&&opSameBlocked){
        tgLines.push("⏸️ OPERACIÓN ("+sugDir+") — en cooldown ("+opCooldownCandles+" velas "+interval.toUpperCase()+")");
      }else if(hasMultiTfConf&&!opOppConfirmed){
        tgLines.push("⏸️ OPERACIÓN ("+sugDir+") — requiere 2 velas "+interval.toUpperCase()+" confirmando tras señal opuesta reciente");
      }else if(opAllowed&&rrInsufficient){
        tgLines.push("⚠️ OPERACIÓN ("+sugDir+") — R/R insuficiente (1:"+ratioBot+") tras cap TF "+interval.toUpperCase()+" — señal omitida.");
        tgLines.push("   📍 Entrada ref: $"+parseFloat(entryPrice).toLocaleString("es-ES",{maximumFractionDigits:4})+" | 🛑 SL: $"+parseFloat(slPrice).toLocaleString("es-ES",{maximumFractionDigits:4})+" | TP recortado: $"+parseFloat(tpPrice).toLocaleString("es-ES",{maximumFractionDigits:4}));
      }else if(opAllowed){
        tgLines.push("💡 OPERACIÓN ("+sugDir+") — "+crossTfCount+" TFs alineadas"+(htfCounterTrend?" ⚠️ CONTRA TENDENCIA HTF (solo scalp)":"")+":");
        if(fbLowPerf){
          tgLines.push("   ⚠️ Historial bajo ("+Math.round(fbRate*100)+"% / "+fbStatsProb.total+" señales) — precaución");
        }
        tgLines.push("   📍 ENTRADA: $"+parseFloat(entryPrice).toLocaleString("es-ES",{maximumFractionDigits:4})+(entryNote?" — "+entryNote:""));
        if(tpManualTarget){
          tgLines.push("   ⚠️ Sin TP en rango "+lowestTf.toUpperCase()+" ("+(tpMinPct*100).toFixed(1)+"–"+(tpMaxPct*100).toFixed(1)+"%) — gestión manual del objetivo");
        }else{
          var tpRangeAnnot=hasMultiTfConf&&lowestTf!==interval?" [rango dictado por "+lowestTf.toUpperCase()+": "+(tpMinPct*100).toFixed(1)+"–"+(tpMaxPct*100).toFixed(1)+"%]":"";
          tgLines.push("   🎯 TP: $"+parseFloat(tpPrice).toLocaleString("es-ES",{maximumFractionDigits:4})+" (+"+tpPctShow+"%) — "+tpNote+tpRangeAnnot);
        }
        tgLines.push("   🛑 SL: $"+parseFloat(slPrice).toLocaleString("es-ES",{maximumFractionDigits:4})+" (-"+slPctShow+"%)");
        tgLines.push("   ⚖️ Ratio: 1:"+ratioBot);
        tgLines.push("   ⏱ TF: "+interval.toUpperCase()+" | Horizonte: "+(interval==="1h"?"8–20h":interval==="4h"?"2–5 días":interval==="1d"?"1–10 días":"6+ semanas"));
        if(probPct!==null){var probSrc2=fbStatsProb.total>=3?"("+fbStatsProb.total+" señales previas)":"(base estadística)";tgLines.push("   🧠 Prob. "+probPct+"% "+probSrc2);}
        if(!fvgNearEntry)tgLines.push("   ⚠️ Sin FVG cercano — precio actual como referencia de entrada");
        if(!fvgFarExit&&!tpManualTarget)tgLines.push("   ⚠️ Sin FVG lejano — TP calculado por ratio");
        // Registrar emisión para cooldown
        opAlertRef.current[opKeySame]=Date.now();
      }
      tgLines.push("");
      tgLines.push("⏰ "+new Date().toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"}));
      // Advertencia de conflicto entre temporalidades
      if(hasConflict){
        tgLines.push("");
        tgLines.push("⚠️ CONFLICTO DE TEMPORALIDADES — señal contraria activa:");
        var TF_LABELS_CONF={"1h":"1H","4h":"4H","1d":"Diario","1w":"Semanal"};
        conflictTfs.forEach(function(c){
          var cLbl=TF_LABELS_CONF[c.tf]||c.tf;
          var cSigs=c.signals.map(function(t){return SIGNAL_LABELS[t]||t;}).join(", ");
          tgLines.push("   🔴 "+cLbl+": "+cSigs);
        });
        tgLines.push("   ⚠️ Precaución — no operar contra señal de TF superior");
      }
      // Canal: bloque detallado en Telegram
      if(extra.channelResult){
        var cr=extra.channelResult;
        var rd=extra.retestData||null;
        tgLines.push("");
        if(rd&&rd.retestEntry){
          // ── ENTRADA EN RETESTEO ──
          var rtLineLabel=rd.retestBull?"ex-resistencia → ahora soporte":"ex-soporte → ahora resistencia";
          var rtDirLabel=rd.retestBull?"Canal "+cr.canalType+" roto al alza":"Canal "+cr.canalType+" roto a la baja";
          tgLines.push("🎯 Entrada en Retesteo — "+rtDirLabel);
          tgLines.push("");
          tgLines.push("   📍 ENTRADA: $"+rd.entry.toLocaleString("es-ES",{maximumFractionDigits:2}));
          tgLines.push("   🛑 Stop Loss: $"+rd.sl.toLocaleString("es-ES",{maximumFractionDigits:2})+" ("+(rd.retestBull?"bajo swing low":"sobre swing high")+" + 0.3 ATR)");
          tgLines.push("   🎯 TP1 (altura canal): $"+rd.tp1.toLocaleString("es-ES",{maximumFractionDigits:2})+" — R/R 1:"+rd.rr1+(rd.rrOk?" ✅":" ⚠️ R/R < 2:1"));
          // TP2: FVG más cercano en dirección del trade
          if(ohlcData.length>4){
            var retFvg2=findNearFVG(ohlcData,rd.entry,rd.retestBull,tpMaxPct);
            if(retFvg2){
              var retRisk2=Math.abs(rd.entry-rd.sl);
              var retRR2=retRisk2>0?(Math.abs(retFvg2.mid-rd.entry)/retRisk2).toFixed(1):"--";
              tgLines.push("   🎯 TP2 (FVG "+tf+"): $"+retFvg2.mid.toFixed(2)+" — R/R 1:"+retRR2);
            }
          }
          tgLines.push("   📐 Línea retesteada: $"+rd.retestLine.toFixed(2)+" ("+rtLineLabel+")");
          tgLines.push("   ✅ Confirmación: "+rd.candleDesc+(rd.volOk?" + volumen "+rd.volMult+"x MA20":""));
          tgLines.push("   🚫 Invalidación: cierre "+tf+" "+(rd.retestBull?"<":">")+": $"+rd.invalidation.toLocaleString("es-ES",{maximumFractionDigits:2}));
          tgLines.push("");
          tgLines.push("   📊 Canal "+cr.canalType+": "+cr.supportTouches+" toques soporte / "+cr.resistTouches+" toques resistencia | Calidad "+cr.quality+"/100");
        }else if(cr.breakConfirmed){
          // ── RUPTURA CONFIRMADA ──
          var brkDirLabel=(cr.breakDir==="alcista")?"⬆️ Alcista":"⬇️ Bajista";
          var brkContext=cr.canalType==="alcista"?(cr.breakDir==="bajista"?"quiebre de soporte (más probable en canales alcistas)":"extensión alcista — impulso"):(cr.breakDir==="alcista"?"reversión alcista — cambio de tendencia":"quiebre de resistencia");
          tgLines.push("🚨 Ruptura Confirmada — Canal "+cr.canalType.charAt(0).toUpperCase()+cr.canalType.slice(1));
          tgLines.push("   Dirección: "+brkDirLabel+" — "+brkContext);
          tgLines.push("   1ª vela: $"+parseFloat(cr.firstBreakClose).toLocaleString("es-ES",{maximumFractionDigits:2}));
          tgLines.push("   2ª vela (confirma): $"+parseFloat(cr.secondBreakClose).toLocaleString("es-ES",{maximumFractionDigits:2})+" ✅");
          tgLines.push("   Línea rota: $"+parseFloat(cr.breakLine).toFixed(2));
          tgLines.push("   Desplazamiento: "+cr.dispAtr+"x ATR "+(parseFloat(cr.dispAtr)>=0.5?"✅":"⚠️"));
          tgLines.push("   Volumen: "+cr.volMult+"x MA20 "+(cr.volOk?"✅":"⚠️ bajo volumen"));
          tgLines.push("   ⏳ Próximo: esperar retesteo de $"+parseFloat(cr.breakLine).toFixed(2)+" (±0.2 ATR)");
          var invalBreak=cr.breakDir==="alcista"?parseFloat((cr.botLine*0.998).toFixed(2)):parseFloat((cr.topLine*1.002).toFixed(2));
          tgLines.push("   🚫 Invalidación: precio vuelve al interior del canal — $"+invalBreak.toLocaleString("es-ES",{maximumFractionDigits:2}));
          tgLines.push("");
          tgLines.push("   📊 Canal "+cr.canalType+": "+cr.supportTouches+" toques soporte / "+cr.resistTouches+" toques resistencia | Calidad "+cr.quality+"/100");
        }
      }
      // FVG: bloque detallado cuando el tipo es patron_fvg
      if(type==="patron_fvg"&&extra.fvgResult){
        var fvgR=extra.fvgResult;
        var fvgIsLong=fvgR.subtype==="alcista";
        var fvgEdge=fvgIsLong?fvgR.top:fvgR.bot;
        var fvgFarEdge=fvgIsLong?fvgR.bot:fvgR.top;
        var atr14pf=0;
        if(ohlcData.length>=15){var trSumPf=0;for(var aip=ohlcData.length-14;aip<ohlcData.length;aip++){var trHp=ohlcData[aip].h,trLp=ohlcData[aip].l,trPcp=(aip>0?ohlcData[aip-1].c:trHp);trSumPf+=Math.max(trHp-trLp,Math.abs(trHp-trPcp),Math.abs(trLp-trPcp));}atr14pf=trSumPf/14;}
        var fvgSlRaw=fvgIsLong?parseFloat((fvgFarEdge-atr14pf*0.3).toFixed(2)):parseFloat((fvgFarEdge+atr14pf*0.3).toFixed(2));
        tgLines.push("");
        tgLines.push("⚡ FVG "+fvgR.subtype.toUpperCase()+" — "+(fvgIsLong?"Ineficiencia alcista sin cubrir":"Ineficiencia bajista sin cubrir"));
        tgLines.push("   Rango FVG: $"+parseFloat(fvgR.bot).toLocaleString("es-ES",{maximumFractionDigits:2})+" – $"+parseFloat(fvgR.top).toLocaleString("es-ES",{maximumFractionDigits:2})+(extra.imbSizePct?" ("+(extra.imbSizePct*100).toFixed(2)+"% ancho)":""));
        tgLines.push("   📍 Entrada: $"+parseFloat(fvgEdge).toLocaleString("es-ES",{maximumFractionDigits:2})+" (borde "+(fvgIsLong?"superior":"inferior")+")");
        tgLines.push("   🛑 SL técnico: $"+parseFloat(fvgSlRaw).toLocaleString("es-ES",{maximumFractionDigits:2})+" ("+(fvgIsLong?"debajo del FVG":"encima del FVG")+")");
        if(extra.imbScore!=null){
          var scoreEmoji=extra.imbScore>=80?"⭐":extra.imbScore>=65?"✅":"☑️";
          tgLines.push("   "+scoreEmoji+" Score calidad: "+extra.imbScore+"/100");
        }
        if(extra.imbMitigation){
          var mitLbl=extra.imbMitigation==="unmitigated"?"🟢 sin tocar":extra.imbMitigation==="partial"?"🟡 parcialmente tocado":"🔴 mitigado";
          tgLines.push("   Estado: "+mitLbl);
        }
        if(extra.imbKind&&extra.imbKind!=="fvg"){
          var kindLbl=extra.imbKind==="vi"?"Volume Imbalance":extra.imbKind==="gap"?"Opening Gap":extra.imbKind==="void"?"Liquidity Void":extra.imbKind;
          tgLines.push("   Subtipo: "+kindLbl);
        }
        if(extra.imbConfluence&&extra.imbConfluence.length>0){
          var confLbls=extra.imbConfluence.map(function(cf){
            var kLbl=cf.kind==="vi"?"VI":cf.kind==="gap"?"Gap":cf.kind==="void"?"Void":"FVG";
            return cf.tf+" "+kLbl+" $"+parseFloat(cf.bot).toLocaleString("es-ES",{maximumFractionDigits:2})+"–$"+parseFloat(cf.top).toLocaleString("es-ES",{maximumFractionDigits:2})+" ("+cf.mitigation+")";
          });
          tgLines.push("   ⭐ Confluencia HTF: "+confLbls.join(" | "));
        }
        if(extra.liquiditySwept)tgLines.push("   💧 Formado tras sweep de liquidez");
        if(extra.fvgHigherTF&&extra.fvgHtfLabel){
          var htfStatus=extra.fvgHtfAligned===true?"✅ alineada":extra.fvgHtfAligned===false?"⚠️ EN CONTRA — precaución":"(sin datos)";
          tgLines.push("   📊 Tendencia "+extra.fvgHtfLabel+" (EMA50): "+htfStatus);
        }
        if(extra.formVolMult!=null){
          tgLines.push("   📊 Vol. formación: "+extra.formVolMult+"× MA20");
        }
        if(extra.fvgVolMult!==null&&extra.fvgVolMult!==undefined){
          tgLines.push("   📊 Vol. actual: "+extra.fvgVolMult+"× MA20 "+(extra.fvgVolOk?"✅":"⚠️ volumen alto — posible capitulación"));
        }
        // TP para patron_fvg (H3 fix)
        var fvgRiskPf=Math.abs(fvgEdge-fvgSlRaw);
        var fvgTpPf=fvgRiskPf>0?findFVGforTP(ohlcData,fvgEdge,fvgIsLong,1.5,fvgRiskPf):null;
        if(fvgTpPf&&fvgTpPf.price){
          var fvgTpPctPf=Math.abs(fvgTpPf.price-fvgEdge)/(fvgEdge||1);
          var fvgTpFinalPf=fvgTpPctPf>tpMaxPct?parseFloat((fvgIsLong?fvgEdge+fvgEdge*tpMaxPct:fvgEdge-fvgEdge*tpMaxPct).toFixed(2)):fvgTpPf.price;
          var fvgRrPf=fvgRiskPf>0?Math.abs(fvgTpFinalPf-fvgEdge)/fvgRiskPf:0;
          if(fvgRrPf>=1.0){
            tgLines.push("   🎯 TP: $"+parseFloat(fvgTpFinalPf).toLocaleString("es-ES",{maximumFractionDigits:2})+" (R:R 1:"+fvgRrPf.toFixed(1)+")");
          }else{
            tgLines.push("   ⚠️ R/R insuficiente (1:"+fvgRrPf.toFixed(2)+") tras cap TF — TP orientativo $"+parseFloat(fvgTpFinalPf).toLocaleString("es-ES",{maximumFractionDigits:2}));
          }
        }else{
          var fvgFallbackTpPf=fvgIsLong?parseFloat((fvgEdge+fvgRiskPf*2).toFixed(2)):parseFloat((fvgEdge-fvgRiskPf*2).toFixed(2));
          tgLines.push("   🎯 TP (1:2): $"+parseFloat(fvgFallbackTpPf).toLocaleString("es-ES",{maximumFractionDigits:2})+" — sin FVG objetivo");
        }
      }
      var tgFullText=tgLines.join("\n");
      // Siempre POST — GET falla silenciosamente cuando el mensaje es largo (límite de URL)
      var tgBody={chat_id:cid,text:tgFullText};
      if(hasConfluence){
        tgBody.reply_markup={inline_keyboard:[[
          {text:"✅ Se cumplió",callback_data:"fb_correct_"+type},
          {text:"❌ No se cumplió",callback_data:"fb_wrong_"+type}
        ]]};
      }
      fetch("https://api.telegram.org/bot"+tk+"/sendMessage",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(tgBody)
      }).then(function(r){return r.json();}).then(function(data){
        if(!data.ok){
          var errMsg="Telegram error: "+(data.description||data.error_code||"desconocido");
          setLogs(function(prev){return [{id:Date.now(),type:"tg_error",title:"⚠️ Telegram no enviado",body:errMsg,time:new Date().toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"})}].concat(prev).slice(0,50);});
        }
      }).catch(function(){});
    }
    // ── Web Push fan-out (runs in parallel with Telegram, no-op if not configured) ──
    var pushTag="td-"+(label||"sym")+"-"+(interval||"x")+"-"+(type||"gen");
    var pushActions=hasConfluence
      ? [{action:"open_trade",title:"Abrí la orden"},{action:"dismiss",title:"Ignorar"}]
      : [{action:"dismiss",title:"Ignorar"}];
    var pushBody=body||(title+priceStr);
    sendPushFanout({
      title:title,
      body:(pushBody||"").slice(0,240),
      tag:pushTag,
      icon:"/icon.svg",
      badge:"/icon.svg",
      vibrate:[200,100,200],
      data:{
        deepLink:"/?tab=7&sym="+encodeURIComponent(label||"")+"&tf="+(interval||""),
        signalType:type,
        symbol:label,
        interval:interval
      },
      actions:pushActions
    });
    if(Notification.permission==="granted"){
      const notifOpts={body:body,icon:"/icon.svg",requireInteraction:true,silent:false};
      function doNotif(){try{new Notification(title,notifOpts);}catch(ex){try{new Notification(title,{body:body});}catch(e){}}}
      if("serviceWorker" in navigator){
        navigator.serviceWorker.getRegistration().then(function(reg){
          if(reg){try{reg.showNotification(title,notifOpts);}catch(e){doNotif();}}
          else{doNotif();}
        }).catch(doNotif);
      }else{doNotif();}
    }
  }

  function startStockAlertFinnhub(alert){
    requestWakeLock();
    var sid=alert.id.toString();
    // Primer tick tras inicio/reconexión → sincronizar zona silenciosamente sin disparar alerta
    var ak0FH=sid+"_";
    lastTrigRef.current[ak0FH+"firstTick"]=true;
    delete lastTrigRef.current[ak0FH+"rsicustom"];
    var fhKey2=localStorage.getItem("td-finnhub-key");
    if(!fhKey2){
      setAlerts(function(prev){return prev.map(function(a){return a.id===alert.id?{...a,active:false,error:true}:a;});});
      return;
    }
    var key=alert.symbol+alert.interval;
    if(!closesRef.current[key])closesRef.current[key]=[];
    saveAlerts(alertsRef.current.map(function(a){return a.id===alert.id?{...a,active:true,error:false}:a;}));
    var resMap={"1h":"60","4h":"60","1d":"D","1w":"W"};
    var res=resMap[alert.interval]||"D";
    var periodSecs={"1h":3600,"4h":14400,"1d":86400,"1w":604800};
    var lookback=300;
    var fromTs=Math.floor(Date.now()/1000)-(periodSecs[alert.interval]||86400)*lookback;
    function processStockCandles(d,isLive){
      if(!d||d.s==="no_data"||!d.c||d.c.length===0)return;
      var closes=d.c.map(function(v){return parseFloat(v);});
      var ohlc=d.c.map(function(v,i){return{o:parseFloat(d.o[i]),h:parseFloat(d.h[i]),l:parseFloat(d.l[i]),c:parseFloat(d.c[i]),v:parseFloat((d.v&&d.v[i])||0)};});
      closesRef.current[key]=closes;
      ohlcRef.current[key]=ohlc;
      var closePrice=closes[closes.length-1];
      var rsi=calcRSI(closes,14);
      var ema7=calcEMA(closes,7);
      var ema25=calcEMA(closes,25);
      var ema50=calcEMA(closes,50);
      var ema200=calcEMA(closes,200);
      var cross7_25=detectCross(closes);
      var cross50_200=detectCross50_200(closes);
      var relation=ema7&&ema25?(ema7>ema25?"above":"below"):null;
      var relation50_200=ema50&&ema200?(ema50>ema200?"above":"below"):null;
      setAlerts(function(prev){return prev.map(function(a){return a.id===alert.id?{...a,currentRsi:rsi,currentPrice:closePrice,active:true}:a;});});
      if(ema7&&ema25){
        setEmaData(function(prev){return{...prev,[alert.id]:{ema7:ema7,ema25:ema25,relation:relation,cross:cross7_25,ema50:ema50,ema200:ema200,relation50_200:relation50_200,cross50_200:cross50_200}};});
      }
      if(!isLive)return;
      var ak=sid+"_";
      if(rsi!==null){
        var ovThr2=alert.rsiOversoldTarget!=null?alert.rsiOversoldTarget:30;
        var obThr2=alert.rsiOverboughtTarget!=null?alert.rsiOverboughtTarget:70;
        var rsiCdMs2={"1h":3600000,"4h":14400000,"1d":86400000,"1w":604800000}[alert.interval]||3600000;
        var prevZoneH2=lastTrigRef.current[ak+"rsizone"]||"neutral";
        var rsiZone2;
        if(rsi<=ovThr2)rsiZone2="oversold";
        else if(rsi>=obThr2)rsiZone2="overbought";
        else if(prevZoneH2==="overbought"&&rsi<obThr2-2)rsiZone2="neutral";
        else if(prevZoneH2==="oversold"&&rsi>ovThr2+2)rsiZone2="neutral";
        else rsiZone2=prevZoneH2;
        if(lastTrigRef.current[ak+"firstTick"]){
          lastTrigRef.current[ak+"firstTick"]=false;
          lastTrigRef.current[ak+"rsizone"]=rsiZone2;
          try{
            var szFhI=JSON.parse(localStorage.getItem("td-alert-zones")||"{}");
            szFhI[ak+"rsizone"]=rsiZone2;
            if(szFhI[ak+"rsi_ob_ts"])lastTrigRef.current[ak+"rsi_ob_ts"]=szFhI[ak+"rsi_ob_ts"];
            if(szFhI[ak+"rsi_os_ts"])lastTrigRef.current[ak+"rsi_os_ts"]=szFhI[ak+"rsi_os_ts"];
            localStorage.setItem("td-alert-zones",JSON.stringify(szFhI));
          }catch(e){}
          if(rsiZone2==="overbought"||rsiZone2==="oversold"){
            var cdKeyI2=rsiZone2==="overbought"?(ak+"rsi_ob_ts"):(ak+"rsi_os_ts");
            var lastCdI2=lastTrigRef.current[cdKeyI2]||0;
            if(Date.now()-lastCdI2>rsiCdMs2){
              lastTrigRef.current[cdKeyI2]=Date.now();
              try{var szFire2=JSON.parse(localStorage.getItem("td-alert-zones")||"{}");szFire2[cdKeyI2]=Date.now();localStorage.setItem("td-alert-zones",JSON.stringify(szFire2));}catch(e){}
              if(rsiZone2==="oversold"&&alert.rsiOversoldEnabled!==false)sendAlert(alert.label,alert.interval,rsi,"rsi_oversold",ema7,ema25,null,closePrice,{ohlc:ohlc});
              else if(rsiZone2==="overbought"&&alert.rsiOverboughtEnabled!==false)sendAlert(alert.label,alert.interval,rsi,"rsi_overbought",ema7,ema25,null,closePrice,{ohlc:ohlc});
            }
          }
        }else{
          var prevZone2=lastTrigRef.current[ak+"rsizone"]||"neutral";
          lastTrigRef.current[ak+"rsizone"]=rsiZone2;
          if(rsiZone2==="overbought"||rsiZone2==="oversold"){
            // Zona extrema — notificar si cooldown expirado (cada período aunque RSI no salga de zona)
            var cdKey2=rsiZone2==="overbought"?(ak+"rsi_ob_ts"):(ak+"rsi_os_ts");
            var lastCd2=lastTrigRef.current[cdKey2]||0;
            if(Date.now()-lastCd2>rsiCdMs2){
              lastTrigRef.current[cdKey2]=Date.now();
              try{var szFh={};var szFhStr=localStorage.getItem("td-alert-zones");if(szFhStr)szFh=JSON.parse(szFhStr);szFh[ak+"rsizone"]=rsiZone2;szFh[cdKey2]=Date.now();localStorage.setItem("td-alert-zones",JSON.stringify(szFh));}catch(e){}
              if(rsiZone2==="oversold"&&alert.rsiOversoldEnabled!==false)sendAlert(alert.label,alert.interval,rsi,"rsi_oversold",ema7,ema25,null,closePrice,{ohlc:ohlc});
              else if(rsiZone2==="overbought"&&alert.rsiOverboughtEnabled!==false)sendAlert(alert.label,alert.interval,rsi,"rsi_overbought",ema7,ema25,null,closePrice,{ohlc:ohlc});
            }
          }else if(rsiZone2!==prevZone2){
            try{var szFhN={};var szFhNStr=localStorage.getItem("td-alert-zones");if(szFhNStr)szFhN=JSON.parse(szFhNStr);szFhN[ak+"rsizone"]=rsiZone2;localStorage.setItem("td-alert-zones",JSON.stringify(szFhN));}catch(e){}
          }
        }
        if(alert.rsiCustomEnabled&&alert.rsiCustomTarget){
          var rsiKey2=ak+"rsicustom";
          var triggered2=(alert.rsiCustomCondition==="below"&&rsi<=alert.rsiCustomTarget)||(alert.rsiCustomCondition==="above"&&rsi>=alert.rsiCustomTarget);
          if(triggered2&&!lastTrigRef.current[rsiKey2]){
            lastTrigRef.current[rsiKey2]=true;
            try{var szFh2={};var szFhStr2=localStorage.getItem("td-alert-zones");if(szFhStr2)szFh2=JSON.parse(szFhStr2);szFh2[rsiKey2]=true;localStorage.setItem("td-alert-zones",JSON.stringify(szFh2));}catch(e){}
            var condLabel2=alert.rsiCustomCondition==="below"?"por debajo de":"por encima de";
            sendAlert(alert.label,alert.interval,rsi,"rsi_custom",ema7,ema25,"RSI "+condLabel2+" "+alert.rsiCustomTarget+" (actual: "+rsi.toFixed(1)+")",closePrice);
          }
          if(!triggered2&&lastTrigRef.current[rsiKey2]){
            lastTrigRef.current[rsiKey2]=false;
            try{var szFh3={};var szFhStr3=localStorage.getItem("td-alert-zones");if(szFhStr3)szFh3=JSON.parse(szFhStr3);szFh3[rsiKey2]=false;localStorage.setItem("td-alert-zones",JSON.stringify(szFh3));}catch(e){}
          }
        }
      }
      if(alert.interval!=="1w"){
        if(alert.emaCross725Enabled!==false){
          if(cross7_25==="golden"){if(!lastTrigRef.current[ak+"g725"]){lastTrigRef.current[ak+"g725"]=true;try{var fg725={};var fg725s=localStorage.getItem("td-alert-zones");if(fg725s)fg725=JSON.parse(fg725s);fg725[ak+"g725_ts"]=Date.now();localStorage.setItem("td-alert-zones",JSON.stringify(fg725));}catch(e){}sendAlert(alert.label,alert.interval,rsi,"golden",ema7,ema25,null,closePrice,{ohlc:ohlc});}}
          else{lastTrigRef.current[ak+"g725"]=false;}
          if(cross7_25==="death"){if(!lastTrigRef.current[ak+"d725"]){lastTrigRef.current[ak+"d725"]=true;try{var fd725={};var fd725s=localStorage.getItem("td-alert-zones");if(fd725s)fd725=JSON.parse(fd725s);fd725[ak+"d725_ts"]=Date.now();localStorage.setItem("td-alert-zones",JSON.stringify(fd725));}catch(e){}sendAlert(alert.label,alert.interval,rsi,"death",ema7,ema25,null,closePrice,{ohlc:ohlc});}}
          else{lastTrigRef.current[ak+"d725"]=false;}
        }
        if(alert.emaCross50200Enabled!==false&&alert.interval!=="1h"){
          if(cross50_200==="golden"){if(!lastTrigRef.current[ak+"g200"]){lastTrigRef.current[ak+"g200"]=true;try{var fg200={};var fg200s=localStorage.getItem("td-alert-zones");if(fg200s)fg200=JSON.parse(fg200s);fg200[ak+"g200_ts"]=Date.now();localStorage.setItem("td-alert-zones",JSON.stringify(fg200));}catch(e){}sendAlert(alert.label,alert.interval,rsi,"ema200_golden",ema50,ema200,null,closePrice,{ohlc:ohlc});}}
          else{lastTrigRef.current[ak+"g200"]=false;}
          if(cross50_200==="death"){if(!lastTrigRef.current[ak+"d200"]){lastTrigRef.current[ak+"d200"]=true;try{var fd200={};var fd200s=localStorage.getItem("td-alert-zones");if(fd200s)fd200=JSON.parse(fd200s);fd200[ak+"d200_ts"]=Date.now();localStorage.setItem("td-alert-zones",JSON.stringify(fd200));}catch(e){}sendAlert(alert.label,alert.interval,rsi,"ema200_death",ema50,ema200,null,closePrice,{ohlc:ohlc});}}
          else{lastTrigRef.current[ak+"d200"]=false;}
        }
      }
      // Divergencias/Convergencias RSI — se detectan en cada poll (excepción: locks se liberan solo cuando cierra vela nueva)
      if(alert.rsiDivEnabled===false){return;}
      var rsiSeriesFH=calcRSISeries(closes,14);
      var divResultFH=rsiSeriesFH.length>=12&&ohlc.length>=12?detectRSIDivergence(ohlc,rsiSeriesFH):null;
      var fhCandleCountKey=ak+"fhCandleCount";
      var prevFHCount=lastTrigRef.current[fhCandleCountKey]||0;
      var isFreshFHCandle=ohlc.length>prevFHCount;
      if(isFreshFHCandle)lastTrigRef.current[fhCandleCountKey]=ohlc.length;
      if(divResultFH){
        var divKindFH=divResultFH.kind||"divergence";
        var divAlertFH=divKindFH==="convergence"
          ?(divResultFH.type==="bullish"?"rsi_conv_bull":"rsi_conv_bear")
          :divKindFH==="hidden_divergence"
          ?(divResultFH.type==="bullish"?"rsi_hdiv_bull":"rsi_hdiv_bear")
          :(divResultFH.type==="bullish"?"rsi_div_bull":"rsi_div_bear");
        var divLockKeyFH=ak+divKindFH+"_"+divResultFH.type+"_lock";
        var baseCdFH={"1h":3600000,"4h":14400000,"1d":86400000,"1w":604800000}[alert.interval]||14400000;
        var divCooldownFH=divKindFH==="convergence"?baseCdFH*2:divKindFH==="hidden_divergence"?baseCdFH*1.5:baseCdFH;
        var prevDivFiredFH=lastTrigRef.current[divLockKeyFH]||0;
        var rsiZoneFH=lastTrigRef.current[ak+"rsizone"]||"neutral";
        var zoneSuppFH=(divAlertFH==="rsi_div_bull"&&rsiZoneFH==="overbought")||(divAlertFH==="rsi_div_bear"&&rsiZoneFH==="oversold")||(divAlertFH==="rsi_hdiv_bull"&&rsiZoneFH==="overbought")||(divAlertFH==="rsi_hdiv_bear"&&rsiZoneFH==="oversold");
        if(!zoneSuppFH&&Date.now()-prevDivFiredFH>divCooldownFH){
          // Gate por volumen ANTES de fijar el lock
          var fhVolMA20=ohlc.length>=20?ohlc.slice(-20).reduce(function(a,c){return a+(c.v||0);},0)/20:0;
          var fhLastVol=ohlc.length>0?(ohlc[ohlc.length-1].v||0):0;
          var fhVolMult=fhVolMA20>0?parseFloat((fhLastVol/fhVolMA20).toFixed(1)):null;
          var fhVolOk=fhVolMult===null||fhVolMult>=1.2;
          if(!fhVolOk){
            try{console.log("[div-skip-fh]",ak,divAlertFH,"vol",fhVolMult,"<1.2");}catch(e){}
          }else{
            lastTrigRef.current[divLockKeyFH]=Date.now();
            try{var fhDz={};var fhDzS=localStorage.getItem("td-alert-zones");if(fhDzS)fhDz=JSON.parse(fhDzS);fhDz[divLockKeyFH]=Date.now();localStorage.setItem("td-alert-zones",JSON.stringify(fhDz));}catch(e){}
            sendAlert(alert.label,alert.interval,rsi,divAlertFH,ema7,ema25,null,closePrice,{ohlc:ohlc,divResult:divResultFH,divVolMult:fhVolMult,divVolOk:true});
          }
        }
      }else if(isFreshFHCandle){
        // Liberar locks de divergencia cuando nueva vela cierra sin divergencia
        var pzFH=Math.round(closePrice/50);
        ["divergence_bullish","divergence_bearish","convergence_bullish","convergence_bearish"].forEach(function(dt){
          delete lastTrigRef.current[ak+dt+"_"+pzFH];
        });
      }
    }
    var toTs0=Math.floor(Date.now()/1000);
    fetch("https://finnhub.io/api/v1/stock/candle?symbol="+alert.symbol+"&resolution="+res+"&from="+fromTs+"&to="+toTs0+"&token="+fhKey2)
      .then(function(r){return r.json();})
      .then(function(d){
        if(!d||d.s==="no_data"||!d.c||d.c.length===0){
          setAlerts(function(prev){return prev.map(function(a){return a.id===alert.id?{...a,active:false,error:true}:a;});});
          return;
        }
        processStockCandles(d,false);
        var iv=setInterval(function(){
          var toTs3=Math.floor(Date.now()/1000);
          fetch("https://finnhub.io/api/v1/stock/candle?symbol="+alert.symbol+"&resolution="+res+"&from="+fromTs+"&to="+toTs3+"&token="+fhKey2)
            .then(function(r2){return r2.json();})
            .then(function(d2){processStockCandles(d2,true);})
            .catch(function(){});
        },60000);
        wsRefs.current[sid]={close:function(){clearInterval(iv);}};
        reconnectCountRef.current[sid]=0;
      })
      .catch(function(){
        setAlerts(function(prev){return prev.map(function(a){return a.id===alert.id?{...a,active:false,error:true}:a;});});
      });
  }

  function startAlert(alert){
    // Primer tick tras inicio/reconexión → sincronizar zona silenciosamente sin disparar alerta
    var ak0Init=alert.id.toString()+"_";
    lastTrigRef.current[ak0Init+"firstTick"]=true;
    delete lastTrigRef.current[ak0Init+"rsicustom"];
    // Reset channel state
    lastTrigRef.current[ak0Init+"chan_type"]=null;
    lastTrigRef.current[ak0Init+"chan_state"]=null;
    lastTrigRef.current[ak0Init+"chan_break_dir"]=null;
    lastTrigRef.current[ak0Init+"chan_break_line"]=0;
    lastTrigRef.current[ak0Init+"chan_break_price"]=0;
    lastTrigRef.current[ak0Init+"chan_confirm_ts"]=0;
    lastTrigRef.current[ak0Init+"chan_atr_at_break"]=0;
    lastTrigRef.current[ak0Init+"chan_height_at_break"]=0;
    lastTrigRef.current[ak0Init+"chan_retest_done"]=false;
    lastTrigRef.current[ak0Init+"chan_break_vol_ok"]=false;
    // Restaurar estados desde localStorage para no re-disparar tras recarga/reconexión
    try{
      var alZsInit=JSON.parse(localStorage.getItem("td-alert-zones")||"{}");
      var intrMsInit={"1h":3600000,"4h":14400000,"1d":86400000,"1w":604800000}[alert.interval]||3600000;
      var nowInit=Date.now();
      // FVG: si notificó en los últimos 3 períodos, suprimir re-disparo
      lastTrigRef.current[ak0Init+"fvg"]=(alZsInit[ak0Init+"fvg_ts"]&&(nowInit-alZsInit[ak0Init+"fvg_ts"])<intrMsInit*3)?true:false;
      // EMA cruces: si notificó en los últimos 5 períodos, suprimir re-disparo
      lastTrigRef.current[ak0Init+"g725"]=(alZsInit[ak0Init+"g725_ts"]&&(nowInit-alZsInit[ak0Init+"g725_ts"])<intrMsInit*5)?true:false;
      lastTrigRef.current[ak0Init+"d725"]=(alZsInit[ak0Init+"d725_ts"]&&(nowInit-alZsInit[ak0Init+"d725_ts"])<intrMsInit*5)?true:false;
      lastTrigRef.current[ak0Init+"g200"]=(alZsInit[ak0Init+"g200_ts"]&&(nowInit-alZsInit[ak0Init+"g200_ts"])<intrMsInit*5)?true:false;
      lastTrigRef.current[ak0Init+"d200"]=(alZsInit[ak0Init+"d200_ts"]&&(nowInit-alZsInit[ak0Init+"d200_ts"])<intrMsInit*5)?true:false;
      // Divergencia: restaurar timestamps de cooldown
      ["divergence_bullish","divergence_bearish","convergence_bullish","convergence_bearish"].forEach(function(dt){
        var dKey=ak0Init+dt+"_lock";
        if(alZsInit[dKey])lastTrigRef.current[dKey]=alZsInit[dKey];
      });
    }catch(e){lastTrigRef.current[ak0Init+"fvg"]=false;}
    // Acciones/ETFs (no Binance) → usar Finnhub polling
    var isBinancePair=/USDT$|BTC$|ETH$|BNB$|BUSD$/i.test(alert.symbol);
    if(!isBinancePair){startStockAlertFinnhub(alert);return;}
    requestWakeLock(); // mantener pantalla encendida
    const sid=alert.id.toString();
    // Close existing WS for this alert if any
    if(wsRefs.current[sid])wsRefs.current[sid].close();
    const key=alert.symbol+alert.interval;
    if(!closesRef.current[key])closesRef.current[key]=[];
    // Mark as active and persist so auto-restart works on next load
    saveAlerts(alertsRef.current.map(function(a){return a.id===alert.id?{...a,active:true,error:false}:a;}));

    function doFetchKlines(attempt){
      fetch("https://api.binance.com/api/v3/klines?symbol="+alert.symbol+"&interval="+alert.interval+"&limit=250")
      .then(function(r){if(!r.ok)throw new Error(r.status);return r.json();})
      .then(function(data){
        if(!data||!data.length)throw new Error("empty");
        closesRef.current[key]=data.map(function(k){return parseFloat(k[4]);});
        ohlcRef.current[key]=data.map(function(k){return{o:parseFloat(k[1]),h:parseFloat(k[2]),l:parseFloat(k[3]),c:parseFloat(k[4]),v:parseFloat(k[5]||0)};});
        // Pre-compute RSI history from historical closes (enables divergence on startup)
        var histRsiSeries=calcRSISeries(closesRef.current[key],14);
        rsiHistRef.current[key]=histRsiSeries.slice(-80);
        // Do NOT pre-initialize RSI zone — leave as undefined so zone defaults to "neutral"
        // This ensures the first WebSocket tick fires the alert if RSI is already in zone
        const ws=new WebSocket("wss://stream.binance.com:9443/ws/"+alert.symbol.toLowerCase()+"@kline_"+alert.interval);
        ws.onmessage=function(e){
          const d=JSON.parse(e.data);
          const k=d.k;
          const closePrice=parseFloat(k.c);
          const closes=[...closesRef.current[key]];
          if(k.x){closes.push(closePrice);if(closes.length>300)closes.shift();}
          else{if(closes.length>0)closes[closes.length-1]=closePrice;}
          closesRef.current[key]=closes;
          const ohlc=[...(ohlcRef.current[key]||[])];
          const newCandle={o:parseFloat(k.o),h:parseFloat(k.h),l:parseFloat(k.l),c:closePrice,v:parseFloat(k.v||0)};
          if(k.x){ohlc.push(newCandle);if(ohlc.length>300)ohlc.shift();}
          else{if(ohlc.length>0)ohlc[ohlc.length-1]=newCandle;}
          ohlcRef.current[key]=ohlc;

          const rsi=calcRSI(closes,14);
          const ema7=calcEMA(closes,7);
          const ema25=calcEMA(closes,25);
          const ema50=calcEMA(closes,50);
          const ema200=calcEMA(closes,200);
          const cross7_25=detectCross(closes);
          const cross50_200=detectCross50_200(closes);
          const relation=ema7&&ema25?(ema7>ema25?"above":"below"):null;
          const relation50_200=ema50&&ema200?(ema50>ema200?"above":"below"):null;

          // Update UI
          setAlerts(function(prev){return prev.map(function(a){return a.id===alert.id?{...a,currentRsi:rsi,currentPrice:closePrice,active:true}:a;});});
          if(ema7&&ema25){
            setEmaData(function(prev){return{...prev,[alert.id]:{ema7,ema25,relation,cross:cross7_25,ema50,ema200,relation50_200,cross50_200}};});
          }

          const ak=sid+"_";
          // Calcular dirección de volumen (última vela vs media de las 5 anteriores)
          var volDir=null;
          if(ohlc.length>=6){
            var vols=ohlc.slice(-6).map(function(c){return c.v||0;});
            var lastVol=vols[vols.length-1];
            var avgVol5=vols.slice(0,-1).reduce(function(a,v){return a+v;},0)/5;
            if(avgVol5>0)volDir=lastVol>avgVol5*1.15?"↗ Ascendente":lastVol<avgVol5*0.85?"↘ Descendente":"→ Estable";
          }
          // Calcular div/conv actual para contexto en notificaciones
          var divResult=null;
          var rsiHistSnap=rsiHistRef.current[key]||[];
          if(rsiHistSnap.length>=10&&ohlc.length>=10){
            divResult=detectRSIDivergence(ohlc,rsiHistSnap);
          }
          // ─── RSI AUTOMÁTICO: sobreventa y sobrecompra (umbrales configurables) ───
          if(rsi!==null){
            // Almacenar historial RSI por vela cerrada
            if(k.x){
              if(!rsiHistRef.current[key])rsiHistRef.current[key]=[];
              rsiHistRef.current[key].push(rsi);
              if(rsiHistRef.current[key].length>100)rsiHistRef.current[key].shift();
            }
            var ovThr=alert.rsiOversoldTarget!=null?alert.rsiOversoldTarget:30;
            var obThr=alert.rsiOverboughtTarget!=null?alert.rsiOverboughtTarget:70;
            // Cooldown: one notification per candle period per zone (prevents spam when RSI oscillates)
            var rsiCdMs={"1h":3600000,"4h":14400000,"1d":86400000,"1w":604800000}[alert.interval]||3600000;
            // Hysteresis: zone resets to neutral only after RSI crosses 2pts past threshold
            var prevZoneH=lastTrigRef.current[ak+"rsizone"]||"neutral";
            var rsiZone;
            if(rsi<=ovThr)rsiZone="oversold";
            else if(rsi>=obThr)rsiZone="overbought";
            else if(prevZoneH==="overbought"&&rsi<obThr-2)rsiZone="neutral";
            else if(prevZoneH==="oversold"&&rsi>ovThr+2)rsiZone="neutral";
            else rsiZone=prevZoneH;
            if(lastTrigRef.current[ak+"firstTick"]){
              // Primer tick: sincronizar zona y restaurar timestamps de cooldown desde localStorage
              lastTrigRef.current[ak+"firstTick"]=false;
              lastTrigRef.current[ak+"rsizone"]=rsiZone;
              try{
                var szWsI=JSON.parse(localStorage.getItem("td-alert-zones")||"{}");
                szWsI[ak+"rsizone"]=rsiZone;
                if(szWsI[ak+"rsi_ob_ts"])lastTrigRef.current[ak+"rsi_ob_ts"]=szWsI[ak+"rsi_ob_ts"];
                if(szWsI[ak+"rsi_os_ts"])lastTrigRef.current[ak+"rsi_os_ts"]=szWsI[ak+"rsi_os_ts"];
                localStorage.setItem("td-alert-zones",JSON.stringify(szWsI));
              }catch(e){}
              // Si ya estamos en zona extrema y no hay cooldown activo, notificar inmediatamente
              if(rsiZone==="overbought"||rsiZone==="oversold"){
                var cdKeyI=rsiZone==="overbought"?(ak+"rsi_ob_ts"):(ak+"rsi_os_ts");
                var lastCdI=lastTrigRef.current[cdKeyI]||0;
                if(Date.now()-lastCdI>rsiCdMs){
                  lastTrigRef.current[cdKeyI]=Date.now();
                  try{var szFire=JSON.parse(localStorage.getItem("td-alert-zones")||"{}");szFire[cdKeyI]=Date.now();localStorage.setItem("td-alert-zones",JSON.stringify(szFire));}catch(e){}
                  if(rsiZone==="oversold"&&alert.rsiOversoldEnabled!==false)sendAlert(alert.label,alert.interval,rsi,"rsi_oversold",ema7,ema25,null,closePrice,{ohlc:ohlc,volDir:volDir,ema50:ema50,ema200:ema200});
                  else if(rsiZone==="overbought"&&alert.rsiOverboughtEnabled!==false)sendAlert(alert.label,alert.interval,rsi,"rsi_overbought",ema7,ema25,null,closePrice,{ohlc:ohlc,volDir:volDir,ema50:ema50,ema200:ema200});
                }
              }
            }else{
              var prevZone=lastTrigRef.current[ak+"rsizone"]||"neutral";
              lastTrigRef.current[ak+"rsizone"]=rsiZone;
              if(rsiZone==="overbought"||rsiZone==="oversold"){
                // Zona extrema — notificar si cooldown expirado (cada período aunque RSI no salga de zona)
                var cdKey=rsiZone==="overbought"?(ak+"rsi_ob_ts"):(ak+"rsi_os_ts");
                var lastCd=lastTrigRef.current[cdKey]||0;
                if(Date.now()-lastCd>rsiCdMs){
                  lastTrigRef.current[cdKey]=Date.now();
                  try{var szWs={};var szWsStr=localStorage.getItem("td-alert-zones");if(szWsStr)szWs=JSON.parse(szWsStr);szWs[ak+"rsizone"]=rsiZone;szWs[cdKey]=Date.now();localStorage.setItem("td-alert-zones",JSON.stringify(szWs));}catch(e){}
                  if(rsiZone==="oversold"&&alert.rsiOversoldEnabled!==false)sendAlert(alert.label,alert.interval,rsi,"rsi_oversold",ema7,ema25,null,closePrice,{ohlc:ohlc,volDir:volDir,ema50:ema50,ema200:ema200});
                  else if(rsiZone==="overbought"&&alert.rsiOverboughtEnabled!==false)sendAlert(alert.label,alert.interval,rsi,"rsi_overbought",ema7,ema25,null,closePrice,{ohlc:ohlc,volDir:volDir,ema50:ema50,ema200:ema200});
                }
              }else if(rsiZone!==prevZone){
                // Zona cambió a neutral — actualizar estado, sin alerta
                try{var szWsN={};var szWsNStr=localStorage.getItem("td-alert-zones");if(szWsNStr)szWsN=JSON.parse(szWsNStr);szWsN[ak+"rsizone"]=rsiZone;localStorage.setItem("td-alert-zones",JSON.stringify(szWsN));}catch(e){}
              }
            }
            // RSI personalizado (nivel configurado por el usuario)
            if(alert.rsiCustomEnabled&&alert.rsiCustomTarget){
              var rsiKey=ak+"rsicustom";
              var triggered=(alert.rsiCustomCondition==="below"&&rsi<=alert.rsiCustomTarget)||(alert.rsiCustomCondition==="above"&&rsi>=alert.rsiCustomTarget);
              if(triggered&&!lastTrigRef.current[rsiKey]){
                lastTrigRef.current[rsiKey]=true;
                try{var szWs2={};var szWsStr2=localStorage.getItem("td-alert-zones");if(szWsStr2)szWs2=JSON.parse(szWsStr2);szWs2[rsiKey]=true;localStorage.setItem("td-alert-zones",JSON.stringify(szWs2));}catch(e){}
                var condLabel=alert.rsiCustomCondition==="below"?"por debajo de":"por encima de";
                sendAlert(alert.label,alert.interval,rsi,"rsi_custom",ema7,ema25,"RSI "+condLabel+" "+alert.rsiCustomTarget+" (actual: "+rsi.toFixed(1)+")",closePrice);
              }
              if(!triggered&&lastTrigRef.current[rsiKey]){
                lastTrigRef.current[rsiKey]=false;
                try{var szWs3={};var szWsStr3=localStorage.getItem("td-alert-zones");if(szWsStr3)szWs3=JSON.parse(szWsStr3);szWs3[rsiKey]=false;localStorage.setItem("td-alert-zones",JSON.stringify(szWs3));}catch(e){}
              }
            }
            // Divergencias/Convergencias RSI — se detectan en cada tick (excepción: forman antes de que cierre la vela)
            if(alert.rsiDivEnabled!==false){
              if(divResult){
                var divKind=divResult.kind||"divergence";
                var divAlertType=divKind==="convergence"
                  ?(divResult.type==="bullish"?"rsi_conv_bull":"rsi_conv_bear")
                  :divKind==="hidden_divergence"
                  ?(divResult.type==="bullish"?"rsi_hdiv_bull":"rsi_hdiv_bear")
                  :(divResult.type==="bullish"?"rsi_div_bull":"rsi_div_bear");
                // Time-based lock: divergencias 1×, convergencias 2×, ocultas 1.5×
                var divLockKey=ak+divKind+"_"+divResult.type+"_lock";
                var baseCdMs={"1h":3600000,"4h":14400000,"1d":86400000,"1w":604800000}[alert.interval]||14400000;
                var divCooldownMs=divKind==="convergence"?baseCdMs*2:divKind==="hidden_divergence"?baseCdMs*1.5:baseCdMs;
                var prevDivFired=lastTrigRef.current[divLockKey]||0;
                var rsiZoneNow=lastTrigRef.current[ak+"rsizone"]||"neutral";
                var zoneSuppressed=(divAlertType==="rsi_div_bull"&&rsiZoneNow==="overbought")||(divAlertType==="rsi_div_bear"&&rsiZoneNow==="oversold")||(divAlertType==="rsi_hdiv_bull"&&rsiZoneNow==="overbought")||(divAlertType==="rsi_hdiv_bear"&&rsiZoneNow==="oversold");
                if(!zoneSuppressed&&Date.now()-prevDivFired>divCooldownMs){
                  // Gate por volumen ANTES de fijar el lock: si el volumen no confirma, no hay alerta
                  var wsVolMA20=ohlc.length>=20?ohlc.slice(-20).reduce(function(a,c){return a+(c.v||0);},0)/20:0;
                  var wsLastVol=ohlc.length>0?(ohlc[ohlc.length-1].v||0):0;
                  var wsVolMult=wsVolMA20>0?parseFloat((wsLastVol/wsVolMA20).toFixed(1)):null;
                  var wsVolOk=wsVolMult===null||wsVolMult>=1.2;
                  if(!wsVolOk){
                    // Log interno sin notificación — volumen insuficiente
                    try{console.log("[div-skip]",ak,divAlertType,"vol",wsVolMult,"<1.2");}catch(e){}
                  }else{
                    lastTrigRef.current[divLockKey]=Date.now();
                    try{var dzWs={};var dzWsStr=localStorage.getItem("td-alert-zones");if(dzWsStr)dzWs=JSON.parse(dzWsStr);dzWs[divLockKey]=Date.now();localStorage.setItem("td-alert-zones",JSON.stringify(dzWs));}catch(e){}
                    sendAlert(alert.label,alert.interval,rsi,divAlertType,ema7,ema25,null,closePrice,{ohlc:ohlc,volDir:volDir,divResult:divResult,ema50:ema50,ema200:ema200,divVolMult:wsVolMult,divVolOk:true});
                  }
                }
            }
          }
          // ─── CANAL: máquina de estados ruptura + retesteo ───
          if(k.x){
            var confKeyPat=alert.label+"|"+alert.interval;
            if(!confluenceRef.current[confKeyPat])confluenceRef.current[confKeyPat]={};
            var chanResult=detectChannelAlert(ohlc);
            var prevCT=lastTrigRef.current[ak+"chan_type"]||null;
            var chanState=lastTrigRef.current[ak+"chan_state"]||null;
            var ALL_CHAN_KEYS=["canal_bajista_ruptura_alcista","canal_bajista_ruptura_bajista","canal_alcista_ruptura_alcista","canal_alcista_ruptura_bajista","canal_bajista_retest_bull","canal_bajista_retest_bear","canal_alcista_retest_bull","canal_alcista_retest_bear"];
            var chanIntervalMs={"1h":3600000,"4h":14400000,"1d":86400000,"1w":604800000}[alert.interval]||14400000;
            var chanVolMA20=ohlc.length>=20?ohlc.slice(-20).reduce(function(a,c){return a+(c.v||0);},0)/20:0;
            var lastCdl=ohlc.length>0?ohlc[ohlc.length-1]:{c:closePrice,o:closePrice,h:closePrice,l:closePrice,v:0};
            if(!chanResult){
              if(prevCT){
                lastTrigRef.current[ak+"chan_type"]=null;
                lastTrigRef.current[ak+"chan_state"]=null;
                lastTrigRef.current[ak+"chan_break_dir"]=null;
                ALL_CHAN_KEYS.forEach(function(ct){delete confluenceRef.current[confKeyPat][ct];});
              }
            }else{
              var curCT=chanResult.canalType;
              var curAtr=chanResult.atr;
              var curTop=chanResult.topLine;
              var curBot=chanResult.botLine;
              var curCh=chanResult.channelHeight;
              // New channel type → reset
              if(curCT!==prevCT){
                lastTrigRef.current[ak+"chan_type"]=curCT;
                lastTrigRef.current[ak+"chan_state"]="active";
                lastTrigRef.current[ak+"chan_break_dir"]=null;
                lastTrigRef.current[ak+"chan_break_line"]=0;
                lastTrigRef.current[ak+"chan_break_price"]=0;
                lastTrigRef.current[ak+"chan_confirm_ts"]=0;
                lastTrigRef.current[ak+"chan_atr_at_break"]=0;
                lastTrigRef.current[ak+"chan_height_at_break"]=0;
                lastTrigRef.current[ak+"chan_retest_done"]=false;
                lastTrigRef.current[ak+"chan_break_vol_ok"]=false;
                ALL_CHAN_KEYS.forEach(function(ct){delete confluenceRef.current[confKeyPat][ct];});
                chanState="active";
              }
              if(chanState==="active"){
                // Breakout: close outside + displacement >= 0.5 ATR
                var brkUp=lastCdl.c>curTop&&(lastCdl.c-curTop)>=curAtr*0.5;
                var brkDn=lastCdl.c<curBot&&(curBot-lastCdl.c)>=curAtr*0.5;
                if(brkUp||brkDn){
                  lastTrigRef.current[ak+"chan_state"]="break_pending";
                  lastTrigRef.current[ak+"chan_break_dir"]=brkUp?"alcista":"bajista";
                  lastTrigRef.current[ak+"chan_break_line"]=brkUp?curTop:curBot;
                  lastTrigRef.current[ak+"chan_break_price"]=lastCdl.c;
                  lastTrigRef.current[ak+"chan_atr_at_break"]=curAtr;
                  lastTrigRef.current[ak+"chan_height_at_break"]=curCh;
                  lastTrigRef.current[ak+"chan_break_vol_ok"]=chanVolMA20>0&&(lastCdl.v||0)>=chanVolMA20*1.5;
                }
              }else if(chanState==="break_pending"){
                var pendBrkDir=lastTrigRef.current[ak+"chan_break_dir"]||"alcista";
                var pendAtr=lastTrigRef.current[ak+"chan_atr_at_break"]||curAtr;
                var pendBreakLine=lastTrigRef.current[ak+"chan_break_line"]||0;
                var stillOut=pendBrkDir==="alcista"?(lastCdl.c>curTop):(lastCdl.c<curBot);
                if(stillOut){
                  // Ruptura confirmada (2ª vela también cierra fuera)
                  lastTrigRef.current[ak+"chan_state"]="confirmed";
                  lastTrigRef.current[ak+"chan_confirm_ts"]=Date.now();
                  lastTrigRef.current[ak+"chan_retest_done"]=false;
                  var brkType="canal_"+curCT+"_ruptura_"+pendBrkDir;
                  var brkVolMult=chanVolMA20>0?((lastCdl.v||0)/chanVolMA20).toFixed(1):"?";
                  var brkDispAtr=pendAtr>0?(Math.abs(lastCdl.c-pendBreakLine)/pendAtr).toFixed(1):"?";
                  var brkFirstClose=lastTrigRef.current[ak+"chan_break_price"]||lastCdl.c;
                  sendAlert(alert.label,alert.interval,rsi,brkType,ema7,ema25,null,closePrice,{ohlc:ohlc,channelResult:{canalType:curCT,topLine:curTop,botLine:curBot,channelHeight:curCh,quality:chanResult.quality,supportTouches:chanResult.supportTouches,resistTouches:chanResult.resistTouches,atr:pendAtr,breakConfirmed:true,breakDir:pendBrkDir,breakLine:pendBreakLine,dispAtr:brkDispAtr,volMult:brkVolMult,volOk:lastTrigRef.current[ak+"chan_break_vol_ok"]||false,firstBreakClose:brkFirstClose,secondBreakClose:lastCdl.c}});
                  confluenceRef.current[confKeyPat][brkType]=Date.now();
                  chanState="confirmed";
                }else{
                  // Falsa ruptura — volver a activo
                  lastTrigRef.current[ak+"chan_state"]="active";
                  lastTrigRef.current[ak+"chan_break_dir"]=null;
                  chanState="active";
                }
              }else if(chanState==="confirmed"){
                var confTs=lastTrigRef.current[ak+"chan_confirm_ts"]||0;
                var retDone=lastTrigRef.current[ak+"chan_retest_done"]||false;
                var retWindow=chanIntervalMs*10;
                if(retDone||Date.now()-confTs>retWindow){
                  lastTrigRef.current[ak+"chan_state"]="done";
                }else{
                  var confBrkDir=lastTrigRef.current[ak+"chan_break_dir"]||"alcista";
                  var confBrkLine=lastTrigRef.current[ak+"chan_break_line"]||0;
                  var confAtrBrk=lastTrigRef.current[ak+"chan_atr_at_break"]||curAtr;
                  var confChBrk=lastTrigRef.current[ak+"chan_height_at_break"]||curCh;
                  // Check if price has deeply re-entered the channel (invalidation)
                  var deepInvalid=confBrkDir==="alcista"?(lastCdl.c<curBot*0.998):(lastCdl.c>curTop*1.002);
                  if(deepInvalid){
                    lastTrigRef.current[ak+"chan_state"]="active";
                    lastTrigRef.current[ak+"chan_break_dir"]=null;
                    chanState="active";
                  }else{
                    // Check if price is near broken line (retest zone ±0.2 ATR)
                    var nearBrkLine=Math.abs(closePrice-confBrkLine)<=confAtrBrk*0.2;
                    if(nearBrkLine){
                      var retIsBull=confBrkDir==="alcista";
                      var retVolOk=chanVolMA20>0&&(lastCdl.v||0)>=chanVolMA20*1.2;
                      // Candlestick pattern detection for retest confirmation
                      var retBody=Math.abs(lastCdl.c-lastCdl.o)||0.001;
                      var retLowWick=Math.min(lastCdl.c,lastCdl.o)-lastCdl.l;
                      var retHighWick=lastCdl.h-Math.max(lastCdl.c,lastCdl.o);
                      var pinBarBull=retLowWick>retBody*2; // hammer / bullish pin bar
                      var pinBarBear=retHighWick>retBody*2; // shooting star / bearish pin bar
                      var prevRetCdl=ohlc.length>1?ohlc[ohlc.length-2]:lastCdl;
                      var prevRetBody=Math.abs(prevRetCdl.c-prevRetCdl.o)||0.001;
                      var engulfBull=lastCdl.c>lastCdl.o&&prevRetCdl.c<prevRetCdl.o&&retBody>prevRetBody;
                      var engulfBear=lastCdl.c<lastCdl.o&&prevRetCdl.c>prevRetCdl.o&&retBody>prevRetBody;
                      var retRsiExtreme=retIsBull?(rsi!==null&&rsi<35):(rsi!==null&&rsi>65);
                      // Reject requires: price closes on right side + at least 1 confirmation
                      var rejBull=retIsBull&&lastCdl.c>confBrkLine&&(lastCdl.c>lastCdl.o||pinBarBull||engulfBull||retRsiExtreme);
                      var rejBear=(!retIsBull)&&lastCdl.c<confBrkLine&&(lastCdl.c<lastCdl.o||pinBarBear||engulfBear||retRsiExtreme);
                      var retConfirmDesc=retIsBull
                        ?(engulfBull?"Envolvente alcista":pinBarBull?"Martillo / pin bar":retRsiExtreme?"Vela alcista + RSI "+(rsi!==null?rsi.toFixed(1):"--"):"Vela alcista en soporte dinámico")
                        :(engulfBear?"Envolvente bajista":pinBarBear?"Estrella fugaz / pin bar":retRsiExtreme?"Vela bajista + RSI "+(rsi!==null?rsi.toFixed(1):"--"):"Vela bajista en resistencia dinámica");
                      if(rejBull||rejBear){
                        lastTrigRef.current[ak+"chan_retest_done"]=true;
                        lastTrigRef.current[ak+"chan_state"]="retested";
                        var retType="canal_"+curCT+"_retest_"+(retIsBull?"bull":"bear");
                        var retEntry=parseFloat(lastCdl.c.toFixed(2));
                        var swingBuf=ohlc.slice(-10);
                        var retSl,retTp1;
                        if(retIsBull){
                          var swLow=Math.min.apply(null,swingBuf.map(function(c){return c.l;}));
                          retSl=parseFloat((swLow-confAtrBrk*0.3).toFixed(2));
                        }else{
                          var swHigh=Math.max.apply(null,swingBuf.map(function(c){return c.h;}));
                          retSl=parseFloat((swHigh+confAtrBrk*0.3).toFixed(2));
                        }
                        retTp1=retIsBull?parseFloat((retEntry+confChBrk).toFixed(2)):parseFloat((retEntry-confChBrk).toFixed(2));
                        var retRiskAmt=Math.abs(retEntry-retSl);
                        var retReward1=Math.abs(retTp1-retEntry);
                        var retRR1=retRiskAmt>0?(retReward1/retRiskAmt).toFixed(1):"--";
                        var retRRok=retRiskAmt>0&&retReward1/retRiskAmt>=2.0;
                        var retInval=retIsBull?parseFloat((confBrkLine-confAtrBrk*0.3).toFixed(2)):parseFloat((confBrkLine+confAtrBrk*0.3).toFixed(2));
                        var retVolMult=chanVolMA20>0?((lastCdl.v||0)/chanVolMA20).toFixed(1):"?";
                        var retestPayload={retestEntry:true,retestBull:retIsBull,retestDir:confBrkDir,retestLine:confBrkLine,entry:retEntry,sl:retSl,tp1:retTp1,rr1:retRR1,rrOk:retRRok,invalidation:retInval,volOk:retVolOk,volMult:retVolMult,candleDesc:retConfirmDesc};
                        sendAlert(alert.label,alert.interval,rsi,retType,ema7,ema25,null,closePrice,{ohlc:ohlc,channelResult:{canalType:curCT,topLine:curTop,botLine:curBot,channelHeight:curCh,quality:chanResult.quality,supportTouches:chanResult.supportTouches,resistTouches:chanResult.resistTouches,atr:confAtrBrk},retestData:retestPayload});
                        confluenceRef.current[confKeyPat][retType]=Date.now();
                      }
                    }
                  }
                }
              }
            }
            // FVG / VI / Gap / Void — con score de calidad, tamaño mínimo, mitigación, HTF y confluencia multi-TF
            var fvgResult=checkFVGCovered(ohlc,closePrice);
            if(!fvgResult) fvgResult=detectVolumeImbalance(ohlc,closePrice);
            if(!fvgResult) fvgResult=detectOpeningGap(ohlc,closePrice);
            if(!fvgResult) fvgResult=detectLiquidityVoid(ohlc,closePrice);
            if(fvgResult){
              // Tamaño del imbalance y filtro ATR + % TF
              var imbSize=Math.abs(fvgResult.top-fvgResult.bot);
              var imbSizePct=closePrice>0?imbSize/closePrice:0;
              var imbAtr=calcATR(ohlc,14)||0;
              var minSizePctTf=IMB_MIN_SIZE_PCT[alert.interval]||0.003;
              var minAtrMultTf=IMB_ATR_MULT[alert.interval]||0.5;
              var sizeOkPct=imbSizePct>=minSizePctTf;
              var sizeOkAtr=imbAtr>0&&imbSize>=imbAtr*minAtrMultTf;
              var sizeOk=sizeOkPct||sizeOkAtr;
              // Estado de mitigación desde formación
              var mitigation=checkImbalanceMitigation(ohlc,fvgResult.formedIdx,fvgResult.bot,fvgResult.top,fvgResult.subtype==="alcista");
              // Alineación con tendencia en TF superior (EMA50)
              var fvgHigherTF={"1h":"4h","4h":"1d","1d":"1w"}[alert.interval]||null;
              var fvgHtfAligned=null;
              var fvgHtfLabel="";
              if(fvgHigherTF){
                var fvgHtfOhlc=ohlcRef.current[(alert.symbol||"BTCUSDT")+fvgHigherTF]||[];
                if(fvgHtfOhlc.length>=50){
                  var fvgHtfCloses=fvgHtfOhlc.map(function(c){return c.c;});
                  var fvgHtfEma50=calcEMA(fvgHtfCloses,50);
                  var fvgHtfPrice=fvgHtfCloses[fvgHtfCloses.length-1];
                  if(fvgHtfEma50&&fvgHtfPrice){
                    var fvgHtfBull=fvgHtfPrice>fvgHtfEma50;
                    fvgHtfAligned=fvgResult.subtype==="alcista"?fvgHtfBull:!fvgHtfBull;
                    fvgHtfLabel={"4h":"4H","1d":"Diario","1w":"Semanal"}[fvgHigherTF]||fvgHigherTF;
                  }
                }
              }
              // Volumen de formación (vela que creó el imbalance)
              var formIdx=fvgResult.formedIdx!=null?fvgResult.formedIdx:ohlc.length-3;
              var formVolMA20=ohlc.length>=20?ohlc.slice(Math.max(0,formIdx-20),formIdx).reduce(function(a,c){return a+(c.v||0);},0)/Math.max(1,Math.min(20,formIdx)):0;
              var formVol=ohlc[formIdx]?ohlc[formIdx].v||0:0;
              var formVolMult=formVolMA20>0?parseFloat((formVol/formVolMA20).toFixed(2)):null;
              // Filtro de volumen actual: evitar entrar en capitulación
              var fvgVolMA20=ohlc.length>=20?ohlc.slice(-20).reduce(function(a,c){return a+(c.v||0);},0)/20:0;
              var fvgLastVol=ohlc.length>0?(ohlc[ohlc.length-1].v||0):0;
              var fvgVolMult=fvgVolMA20>0?parseFloat((fvgLastVol/fvgVolMA20).toFixed(1)):null;
              var fvgVolOk=fvgVolMult===null||fvgVolMult<=2.5;
              // Liquidity sweep: la vela de formación rompió swing high/low previo y cerró dentro
              var liquiditySwept=false;
              if(ohlc.length>formIdx+5){
                var prevSwing=ohlc.slice(Math.max(0,formIdx-10),formIdx);
                if(prevSwing.length>=5){
                  var formCdl=ohlc[formIdx];
                  if(fvgResult.subtype==="alcista"){
                    var prevLow=Math.min.apply(null,prevSwing.map(function(c){return c.l;}));
                    if(formCdl.l<prevLow&&formCdl.c>prevLow)liquiditySwept=true;
                  }else{
                    var prevHigh=Math.max.apply(null,prevSwing.map(function(c){return c.h;}));
                    if(formCdl.h>prevHigh&&formCdl.c<prevHigh)liquiditySwept=true;
                  }
                }
              }
              var imbScore=calcImbalanceScore({kind:fvgResult.kind||"fvg",sizePct:imbSizePct,minSizePct:minSizePctTf,formVolMult:formVolMult,htfAligned:fvgHtfAligned===true,liquiditySwept:liquiditySwept});
              // Hierarchy resolver: buscar imbalances alineados en TFs superiores
              var imbHtfOhlcMap={};
              ["4h","1d","1w"].forEach(function(tfk){imbHtfOhlcMap[tfk]=ohlcRef.current[(alert.symbol||"BTCUSDT")+tfk]||[];});
              imbHtfOhlcMap[alert.interval]=ohlc;
              var imbConfluence=resolveImbalanceHierarchy(imbHtfOhlcMap,closePrice,fvgResult.subtype,alert.interval);
              if(imbConfluence.length>0)imbScore=Math.min(100,imbScore+15);
              var scoreGate=imbScore>=50;
              // Gatear: emitir solo si size OK, no mitigado, y score ≥ 50
              var emitOk=sizeOk&&mitigation!=="mitigated"&&scoreGate;
              if(alert.fvgEnabled!==false&&!lastTrigRef.current[ak+"fvg"]&&emitOk){
                lastTrigRef.current[ak+"fvg"]=true;
                try{var fvgZs={};var fvgZsStr=localStorage.getItem("td-alert-zones");if(fvgZsStr)fvgZs=JSON.parse(fvgZsStr);fvgZs[ak+"fvg_ts"]=Date.now();localStorage.setItem("td-alert-zones",JSON.stringify(fvgZs));}catch(e){}
                sendAlert(alert.label,alert.interval,rsi,"patron_fvg",ema7,ema25,null,closePrice,{ohlc:ohlc,divResult:divResult,fvgResult:fvgResult,fvgHtfAligned:fvgHtfAligned,fvgHtfLabel:fvgHtfLabel,fvgHigherTF:fvgHigherTF,fvgVolMult:fvgVolMult,fvgVolOk:fvgVolOk,imbScore:imbScore,imbSizePct:imbSizePct,imbMitigation:mitigation,imbKind:fvgResult.kind||"fvg",formVolMult:formVolMult,liquiditySwept:liquiditySwept,imbConfluence:imbConfluence});
              }else if(!emitOk){
                try{console.log("[imb-skip]",ak,fvgResult.subtype,"score",imbScore,"size%",imbSizePct.toFixed(4),"mit",mitigation);}catch(e){}
              }
              if(emitOk)confluenceRef.current[confKeyPat]["patron_fvg"]=Date.now();
            }else{
              lastTrigRef.current[ak+"fvg"]=false;
              delete confluenceRef.current[confKeyPat]["patron_fvg"];
            }
          }
          // ─── EMA CRUCES: solo en vela CONFIRMADA (k.x) para evitar falsas señales ───
          // Semanal no tiene cruces (muy raros, generarían ruido)
          if(k.x&&alert.interval!=="1w"){
            if(alert.emaCross725Enabled!==false){
              if(cross7_25==="golden"){
                if(!lastTrigRef.current[ak+"g725"]){lastTrigRef.current[ak+"g725"]=true;try{var g725Zs={};var g725ZsStr=localStorage.getItem("td-alert-zones");if(g725ZsStr)g725Zs=JSON.parse(g725ZsStr);g725Zs[ak+"g725_ts"]=Date.now();localStorage.setItem("td-alert-zones",JSON.stringify(g725Zs));}catch(e){}sendAlert(alert.label,alert.interval,rsi,"golden",ema7,ema25,null,closePrice,{ohlc:ohlc,divResult:divResult,ema50:ema50,ema200:ema200});}
              }else{lastTrigRef.current[ak+"g725"]=false;}
              if(cross7_25==="death"){
                if(!lastTrigRef.current[ak+"d725"]){lastTrigRef.current[ak+"d725"]=true;try{var d725Zs={};var d725ZsStr=localStorage.getItem("td-alert-zones");if(d725ZsStr)d725Zs=JSON.parse(d725ZsStr);d725Zs[ak+"d725_ts"]=Date.now();localStorage.setItem("td-alert-zones",JSON.stringify(d725Zs));}catch(e){}sendAlert(alert.label,alert.interval,rsi,"death",ema7,ema25,null,closePrice,{ohlc:ohlc,divResult:divResult,ema50:ema50,ema200:ema200});}
              }else{lastTrigRef.current[ak+"d725"]=false;}
            }
            // EMA 50/200 solo en 4H y superiores (no 1H — cruces muy frecuentes)
            if(alert.emaCross50200Enabled!==false&&alert.interval!=="1h"){
              if(cross50_200==="golden"){
                if(!lastTrigRef.current[ak+"g200"]){lastTrigRef.current[ak+"g200"]=true;try{var g200Zs={};var g200ZsStr=localStorage.getItem("td-alert-zones");if(g200ZsStr)g200Zs=JSON.parse(g200ZsStr);g200Zs[ak+"g200_ts"]=Date.now();localStorage.setItem("td-alert-zones",JSON.stringify(g200Zs));}catch(e){}sendAlert(alert.label,alert.interval,rsi,"ema200_golden",ema50,ema200,null,closePrice,{ohlc:ohlc,divResult:divResult});}
              }else{lastTrigRef.current[ak+"g200"]=false;}
              if(cross50_200==="death"){
                if(!lastTrigRef.current[ak+"d200"]){lastTrigRef.current[ak+"d200"]=true;try{var d200Zs={};var d200ZsStr=localStorage.getItem("td-alert-zones");if(d200ZsStr)d200Zs=JSON.parse(d200ZsStr);d200Zs[ak+"d200_ts"]=Date.now();localStorage.setItem("td-alert-zones",JSON.stringify(d200Zs));}catch(e){}sendAlert(alert.label,alert.interval,rsi,"ema200_death",ema50,ema200,null,closePrice,{ohlc:ohlc,divResult:divResult});}
              }else{lastTrigRef.current[ak+"d200"]=false;}
            }
          }
          // Nota: el reseteo del cruce EMA se hace solo en vela CERRADA (dentro del if k.x de arriba)
          // No se resetea en ticks intermedios para evitar re-disparar cuando el precio fluctúa
        };
        ws.onerror=function(){
          // will be followed by onclose, handle reconnect there
        };
        ws.onclose=function(){
          // If the alert is still supposed to be active, auto-reconnect
          const stillActive=alertsRef.current.find(function(a){return a.id===alert.id&&a.active;});
          if(!stillActive)return; // user stopped it
          const cnt=(reconnectCountRef.current[sid]||0)+1;
          reconnectCountRef.current[sid]=cnt;
          if(cnt>10){
            // too many retries, mark error
            setAlerts(function(prev){return prev.map(function(a){return a.id===alert.id?{...a,active:false,error:true}:a;});});
            reconnectCountRef.current[sid]=0;
            return;
          }
          const delay=Math.min(30000,3000*cnt);
          setTimeout(function(){
            const check=alertsRef.current.find(function(a){return a.id===alert.id&&a.active;});
            if(check)startAlert(check);
          },delay);
        };
        wsRefs.current[sid]=ws;
        reconnectCountRef.current[sid]=0;
      })
      .catch(function(){
        if((attempt||0)<2){
          setTimeout(function(){doFetchKlines((attempt||0)+1);},4000*((attempt||0)+1));
        }else{
          setAlerts(function(prev){return prev.map(function(a){return a.id===alert.id?{...a,active:false,error:true}:a;});});
        }
      });
    }
    doFetchKlines(0);
  }

  function stopAlert(alert){
    const sid=alert.id.toString();
    if(wsRefs.current[sid]){wsRefs.current[sid].close();delete wsRefs.current[sid];}
    const updated=alertsRef.current.map(function(a){return a.id===alert.id?{...a,active:false,currentRsi:null,currentPrice:null,error:false}:a;});
    saveAlerts(updated);
    // liberar wake lock si no quedan alertas activas
    if(!updated.some(function(a){return a.active;}))releaseWakeLock();
  }

  function addAlert(){
    if(draft.selectedSymbols.length===0)return;
    const newAlerts=draft.selectedSymbols.map(function(sym,i){
      const symInfo=SYMBOLS.find(function(s){return s.symbol===sym;})||{symbol:sym,label:sym};
      return{
        id:Date.now()+i,symbol:symInfo.symbol,label:symInfo.label,interval:draft.interval,
        rsiOversoldEnabled:true,rsiOversoldTarget:30,rsiOverboughtEnabled:true,rsiOverboughtTarget:70,
        emaCross725Enabled:true,emaCross50200Enabled:true,rsiDivEnabled:true,fvgEnabled:true,channelEnabled:true,
        rsiCustomEnabled:draft.rsiCustomEnabled,rsiCustomTarget:draft.rsiCustomTarget,rsiCustomCondition:draft.rsiCustomCondition,
        active:false,currentRsi:null,currentPrice:null,error:false
      };
    });
    const updated=[...alertsRef.current,...newAlerts];
    saveAlerts(updated);
    setShowForm(false);
    newAlerts.forEach(function(a){startAlert(a);});
  }

  function removeAlert(alert){
    stopAlert(alert);
    saveAlerts(alertsRef.current.filter(function(a){return a.id!==alert.id;}));
  }

  function addAllTimeframes(alert){
    var ALL_TF=["1h","4h","1d","1w"];
    var existing=alertsRef.current;
    var toAdd=[];
    ALL_TF.forEach(function(tf,i){
      var dup=existing.some(function(a){return a.symbol===alert.symbol&&a.interval===tf;});
      if(!dup){
        toAdd.push({
          id:Date.now()+i+1,
          symbol:alert.symbol,label:alert.label,interval:tf,
          rsiOversoldEnabled:true,rsiOversoldTarget:30,rsiOverboughtEnabled:true,rsiOverboughtTarget:70,
          emaCross725Enabled:true,emaCross50200Enabled:true,rsiDivEnabled:true,fvgEnabled:true,channelEnabled:true,
          rsiCustomEnabled:alert.rsiCustomEnabled||false,
          rsiCustomTarget:alert.rsiCustomTarget||50,
          rsiCustomCondition:alert.rsiCustomCondition||"below",
          active:false,currentRsi:null,currentPrice:null,error:false
        });
      }
    });
    if(toAdd.length===0)return;
    var updated=[...existing,...toAdd];
    saveAlerts(updated);
    toAdd.forEach(function(a){startAlert(a);});
  }

  function exportAlerts(){
    const data=JSON.stringify(alertsRef.current.map(function(a){return{...a,active:false,currentRsi:null,currentPrice:null,error:false};}));
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(data).then(function(){alert("Alertas copiadas al portapapeles. Pegalas en el movil con el boton Importar.");}).catch(function(){setImportText(data);setShowImport(true);});
    }else{setImportText(data);setShowImport(true);}
  }

  function importAlerts(){
    try{
      const parsed=JSON.parse(importText);
      if(!Array.isArray(parsed))throw new Error("formato invalido");
      const imported=parsed.map(function(a){return{...a,active:false,currentRsi:null,currentPrice:null,error:false};});
      saveAlerts(imported);
      setShowImport(false);
      setImportText("");
      alert(imported.length+" alertas importadas. Pulsa Iniciar en cada una.");
    }catch(e){alert("Error al importar: JSON invalido");}
  }

  return(
    <div>
      {/* In-app alert banner */}
      {lastAlert&&(
        <div style={{background:"rgba(240,180,41,.15)",border:"1px solid rgba(240,180,41,.6)",borderRadius:8,padding:"10px 14px",marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center",animation:"fadein .3s"}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,color:"#f0b429"}}>{lastAlert.title}</div>
            <div style={{fontSize:10,color:"#e0e0e0",marginTop:2}}>{lastAlert.body}</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
            <span style={{fontSize:8,color:"#888"}}>{lastAlert.time}</span>
            <button onClick={function(){setLastAlert(null);}} style={{background:"transparent",border:"none",color:"#555",cursor:"pointer",fontSize:12}}>✕</button>
          </div>
        </div>
      )}
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <div>
          <div style={{fontSize:11,color:"#f0b429",fontWeight:700,letterSpacing:1}}>MONITOREO AUTOMÁTICO</div>
          <div style={{fontSize:9,color:"#555",marginTop:2}}>RSI · EMA cruces · Divergencias · Canales · FVG</div>
        </div>
        <div style={{display:"flex",gap:5}}>
          <button onClick={function(){
            var next=!globalPaused;
            setGlobalPaused(next);
            globalPausedRef.current=next;
          }} title={globalPaused?"Reanudar notificaciones":"Pausar todas las notificaciones"}
            style={{background:globalPaused?"rgba(240,180,41,.2)":"transparent",border:"1px solid "+(globalPaused?"#f0b429":"#2a2a3a"),color:globalPaused?"#f0b429":"#555",padding:"7px 10px",borderRadius:6,fontSize:11,cursor:"pointer"}}>
            {globalPaused?"▶":"⏸"}
          </button>
          <button onClick={function(){setShowFinnhubConfig(!showFinnhubConfig);setShowTgConfig(false);}} title="Finnhub — acciones y ETFs"
            style={{background:finnhubKey?"rgba(0,180,80,.15)":"transparent",border:"1px solid "+(finnhubKey?"#00b450":"#2a2a3a"),color:finnhubKey?"#00cc66":"#555",padding:"7px 10px",borderRadius:6,fontSize:10,cursor:"pointer"}}>📈</button>
          <button onClick={function(){if(pushSubStatus==="subscribed")unsubscribePush();else subscribePush();}}
            title={pushSubStatus==="subscribed"?"Web Push activo — pulsa para desactivar":pushSubStatus==="subscribing"?"Activando...":pushSubStatus==="error"?"Error al activar push":"Activar notificaciones push nativas (Android)"}
            style={{background:pushSubStatus==="subscribed"?"rgba(0,255,136,.15)":pushSubStatus==="error"?"rgba(255,68,68,.15)":"transparent",border:"1px solid "+(pushSubStatus==="subscribed"?"#00ff88":pushSubStatus==="error"?"#ff4444":"#2a2a3a"),color:pushSubStatus==="subscribed"?"#00ff88":pushSubStatus==="error"?"#ff4444":"#555",padding:"7px 10px",borderRadius:6,fontSize:11,cursor:"pointer"}}>
            {pushSubStatus==="subscribing"?"…":"🔔"}
          </button>
          <button onClick={function(){setShowTgConfig(!showTgConfig);setShowFinnhubConfig(false);}} title="Notificaciones Telegram"
            style={{background:tgToken&&tgChatId?"rgba(0,136,204,.15)":"transparent",border:"1px solid "+(tgToken&&tgChatId?"#0088cc":"#2a2a3a"),color:tgToken&&tgChatId?"#0088cc":"#555",padding:"7px 10px",borderRadius:6,fontSize:11,cursor:"pointer"}}>✈️</button>
          <button title="Test alerta completa (pipeline real: in-app + Telegram + notificación)" onClick={function(){
            sendAlert("🧪 TEST","1h",28,"rsi_oversold",null,null,null,50000,{});
          }} style={{background:"rgba(0,255,136,.1)",border:"1px solid #00ff88",color:"#00ff88",padding:"7px 8px",borderRadius:6,fontSize:9,cursor:"pointer",fontWeight:700}}>🧪</button>
          {tgToken&&tgChatId&&<button title="Probar conexión Telegram" onClick={function(){
            var tk=localStorage.getItem("td-tg-token")||"";
            var cid=localStorage.getItem("td-tg-chatid")||"";
            if(!tk||!cid)return;
            var msg="✅ TEST — Trading Diary\n\nTelegram configurado correctamente.\nFecha: "+new Date().toLocaleString("es-ES")+"\nAlertas activas: "+(alertsRef.current||[]).filter(function(a){return a.active;}).length;
            fetch("https://api.telegram.org/bot"+tk+"/sendMessage",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:cid,text:msg})})
              .then(function(r){return r.json();})
              .then(function(data){
                if(data.ok){setLogs(function(prev){return [{id:Date.now(),type:"tg_test",title:"✅ Test Telegram enviado",body:"Comprueba tu Telegram.",time:new Date().toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"})}].concat(prev).slice(0,50);});}
                else{setLogs(function(prev){return [{id:Date.now(),type:"tg_error",title:"❌ Test Telegram falló",body:"Error: "+(data.description||data.error_code||"desconocido"),time:new Date().toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"})}].concat(prev).slice(0,50);});}
              }).catch(function(){setLogs(function(prev){return [{id:Date.now(),type:"tg_error",title:"❌ Test Telegram falló",body:"Sin conexión o token inválido",time:new Date().toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"})}].concat(prev).slice(0,50);});});
          }} style={{background:"rgba(0,136,204,.1)",border:"1px solid #0088cc",color:"#0088cc",padding:"7px 8px",borderRadius:6,fontSize:9,cursor:"pointer",fontWeight:700}}>🔔</button>}
          {tgToken&&tgChatId&&<button title="Enviar lista de notificaciones a Telegram" onClick={function(){
            var tk=localStorage.getItem("td-tg-token")||"";
            var cid=localStorage.getItem("td-tg-chatid")||"";
            if(!tk||!cid)return;
            var tfLabel={"1h":"1H","4h":"4H","1d":"Diario","1w":"Semanal"};
            // Leer alertas desde estado en memoria (siempre actualizado, no depende de localStorage)
            var savedAlerts=alertsRef.current||[];
            var alertLines="";
            savedAlerts.forEach(function(a){
              var types=[];
              if(a.rsiOversoldEnabled!==false)types.push("RSI\u2264"+(a.rsiOversoldTarget!=null?a.rsiOversoldTarget:30));
              if(a.rsiOverboughtEnabled!==false)types.push("RSI\u2265"+(a.rsiOverboughtTarget!=null?a.rsiOverboughtTarget:70));
              if(a.rsiCustomEnabled&&a.rsiCustomTarget)types.push("RSI"+(a.rsiCustomCondition==="below"?"\u2264":"\u2265")+a.rsiCustomTarget);
              if(a.emaCross725Enabled!==false)types.push("Cruce Dorado/Muerte EMA 7/25");
              if(a.emaCross50200Enabled!==false)types.push("Cruce Dorado/Muerte EMA 50/200");
              if(a.rsiDivEnabled!==false)types.push("Div RSI");
              if(a.channelEnabled)types.push("Canal");
              if(a.fvgEnabled)types.push("FVG");
              alertLines+="\n"+(a.label||a.symbol)+" — "+(tfLabel[a.interval]||a.interval)+(a.error?" ⚠️ error":a.active?" ✅":" ⏸")+"\n  "+types.join(" | ")+"\n";
            });
            // Leer predicciones pendientes desde memoria (no localStorage — más fiable en móvil)
            var memPreds=predictions||[];
            var pendingPreds=memPreds.filter(function(p){return p.status==="pending";});
            var predLines=pendingPreds.length?pendingPreds.map(function(p,pi){
              var header=p.asset?(p.asset.toUpperCase()+(p.tf?" "+(tfLabel[p.tf]||p.tf):"")):"(sin activo)";
              var preview="";
              if(p.note){preview=" — "+p.note;}
              else if(p.content){
                var txt=typeof p.content==="string"?p.content:String(p.content);
                preview=" — \""+txt.replace(/\n/g," ").slice(0,80)+(txt.length>80?"...":"")+"\"";
              }
              var warn=p.asset?"":" ⚠️";
              return "  "+(pi+1)+". "+header+preview+warn;
            }).join("\n"):"  (ninguna guardada)";
            var msg="📋 NOTIFICACIONES ACTIVAS — Trading Diary\n\n"+
              "📡 ALERTAS DE MERCADO\n"+alertLines+
              "\n🛡 POSICIONES (cada 60s)\n"+
              "  • SL ejecutado\n"+
              "  • TP ejecutado / parcial\n"+
              "  • Breakeven ejecutado\n\n"+
              "🧠 SEGUIMIENTO PREDICCIONES\n"+predLines+"\n\n"+
              "✅ Telegram funcionando correctamente.";
            fetch("https://api.telegram.org/bot"+tk+"/sendMessage",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:cid,text:msg})}).catch(function(){});
          }} style={{background:"rgba(0,136,204,.1)",border:"1px solid #0088cc",color:"#0088cc",padding:"7px 8px",borderRadius:6,fontSize:9,cursor:"pointer",fontWeight:700}}>📋</button>}
        </div>
      </div>

      {/* Telegram config panel */}
      {/* Telegram — compacto si ya está configurado, expandible */}
      {tgToken&&tgChatId&&!showTgConfig?(
        <div style={{background:"rgba(0,136,204,.06)",border:"1px solid rgba(0,136,204,.25)",borderRadius:8,padding:"8px 12px",marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <span style={{fontSize:13}}>✈️</span>
            <div>
              <div style={{fontSize:9,fontWeight:700,color:"#0088cc"}}>Telegram conectado</div>
              <div style={{fontSize:8,color:"#444"}}>Alertas enviadas como mensaje al dispararse</div>
            </div>
          </div>
          <button onClick={function(){setShowTgConfig(true);}}
            style={{background:"transparent",border:"1px solid #2a2a3a",color:"#555",padding:"4px 8px",borderRadius:4,fontSize:8,cursor:"pointer"}}>Editar</button>
        </div>
      ):(
        showTgConfig&&(
        <div style={{background:"#111118",border:"1px solid rgba(0,136,204,.3)",borderRadius:8,padding:12,marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div style={{fontSize:10,color:"#0088cc",fontWeight:700}}>✈️ NOTIFICACIONES TELEGRAM</div>
            {tgToken&&tgChatId&&<button onClick={function(){setShowTgConfig(false);}} style={{background:"transparent",border:"none",color:"#555",cursor:"pointer",fontSize:12}}>✕</button>}
          </div>
          <div style={{fontSize:8,color:"#555",marginBottom:10,lineHeight:1.6}}>
            Cuando salte una alerta, recibirás un mensaje de Telegram aunque el móvil esté bloqueado.<br/>
            1. Abre Telegram → busca <strong style={{color:"#88aaff"}}>@BotFather</strong> → /newbot → copia el token<br/>
            2. Busca <strong style={{color:"#88aaff"}}>@userinfobot</strong> → /start → copia tu Chat ID
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
            <div>
              <div style={{fontSize:8,color:"#888",marginBottom:3}}>TOKEN DEL BOT</div>
              <input value={tgToken} onChange={function(e){setTgToken(e.target.value);}}
                placeholder="123456:ABCdef..."
                style={{...S.inp,width:"100%",fontSize:9,padding:"5px 8px",boxSizing:"border-box"}}/>
            </div>
            <div>
              <div style={{fontSize:8,color:"#888",marginBottom:3}}>CHAT ID</div>
              <input value={tgChatId} onChange={function(e){setTgChatId(e.target.value);}}
                placeholder="123456789"
                style={{...S.inp,width:"100%",fontSize:9,padding:"5px 8px",boxSizing:"border-box"}}/>
            </div>
          </div>
          {tgStatus&&(
            <div style={{fontSize:9,marginBottom:8,padding:"5px 8px",borderRadius:4,
              background:tgStatus==="ok"?"rgba(0,255,136,.08)":"rgba(255,68,68,.08)",
              color:tgStatus==="ok"?"#00ff88":"#ff4444",
              border:"1px solid "+(tgStatus==="ok"?"rgba(0,255,136,.3)":"rgba(255,68,68,.3)")}}>
              {tgStatus==="ok"?"✓ Mensaje enviado — Telegram configurado correctamente":"✗ Error — revisa el token y el Chat ID"}
            </div>
          )}
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            <button onClick={function(){
              var tk=tgToken.trim();var cid=tgChatId.trim();
              if(!tk||!cid){setTgStatus("error");return;}
              localStorage.setItem("td-tg-token",tk);
              localStorage.setItem("td-tg-chatid",cid);
              fetch("https://api.telegram.org/bot"+tk+"/sendMessage",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:cid,text:"✅ Trading Diary conectado!\n\nRecibirás alertas aquí cuando se disparen."})})
                .then(function(r){return r.json();})
                .then(function(d){
                  setTgStatus(d.ok?"ok":"error");
                  if(d.ok)setTimeout(function(){setShowTgConfig(false);},1500);
                })
                .catch(function(){setTgStatus("error");});
            }} style={{flex:2,padding:"7px",background:"#0088cc",color:"#fff",border:"none",borderRadius:4,fontSize:9,fontWeight:700,cursor:"pointer"}}>Guardar y probar</button>
            {tgToken&&tgChatId&&<button onClick={function(){
              var tk2=(tgToken||"").trim();var cid2=(tgChatId||"").trim();
              if(!tk2||!cid2)return;
              var base2="https://api.telegram.org/bot"+tk2+"/sendMessage";
              // ── Mensaje 1: Alerta RSI sobreventa (formato real) ──
              var now2=new Date();
              var ts2=now2.toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"});
              var msg1="📊 📉 RSI Sobreventa\n\n"+
                "📅 Temporalidad: 1H  |  BTC/USD\n"+
                "📊 RSI: 28.4 | Sin div/conv\n"+
                "💰 Precio: $83.240,00\n"+
                "📈 Volumen: Alcista\n\n"+
                "💡 Operación Bot (Long):\n"+
                "   📍 Entrada: $83.240,00\n"+
                "   🎯 TP: $84.906,00 (+2.0%) [2:1]\n"+
                "   🛑 SL: $81.575,00 (-2.0%)\n"+
                "   ⚖️ Ratio: 1:2.00\n\n"+
                "⏰ "+ts2+"\n\n"+
                "⚠️ MENSAJE DE PRUEBA — formato real";
              fetch(base2,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:cid2,text:msg1})}).catch(function(){});
              // ── Mensaje 2: Seguimiento predicción (última pendiente con activo) ──
              setTimeout(function(){
                var preds=D.current.predictions||[];
                var pred2=preds.find(function(p){return p.status==="pending"&&p.asset;})||preds.find(function(p){return p.status==="pending";});
                var msg2;
                if(pred2){
                  var asset2=(pred2.asset||"(sin activo)").toUpperCase();
                  var tf2label={"1h":"1H","4h":"4H","1d":"Diario","1w":"Semanal"};
                  var tf2=tf2label[pred2.tf]||pred2.tf||"";
                  msg2="📊 Seguimiento "+asset2+(tf2?" "+tf2:"")+"\n\n";
                  if(pred2.userQuery){msg2+="💬 Tu análisis:\n\""+pred2.userQuery.slice(0,200)+(pred2.userQuery.length>200?"…":"")+"\"\n\n";}
                  msg2+="🤖 Update:\nEste es el formato real del mensaje que recibirás cuando Claude detecte un cambio relevante en la predicción. Solo se enviará si hay algo concreto que reportar.";
                  if(pred2.note){msg2+="\n\n📌 "+pred2.note;}
                  msg2+="\n\n⚠️ MENSAJE DE PRUEBA — formato real";
                }else{
                  msg2="📊 Seguimiento BTCUSDT 1H\n\n"+
                    "💬 Tu análisis:\n\"Veo FVG pendiente de cubrir en el 4H cerca de los 85.000. RSI en 45, sin señales claras aún...\"\n\n"+
                    "🤖 Update:\nEste es el formato real del mensaje que recibirás cuando Claude detecte un cambio relevante. Solo se envía si hay algo concreto que reportar.\n\n"+
                    "⚠️ MENSAJE DE PRUEBA — no tienes predicciones activas con activo configurado";
                }
                fetch(base2,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:cid2,text:msg2})}).catch(function(){});
              },1200);
              setTgStatus("ok");
            }} style={{flex:2,padding:"7px",background:"rgba(0,136,204,.15)",color:"#0088cc",border:"1px solid #0088cc",borderRadius:4,fontSize:9,fontWeight:700,cursor:"pointer"}}>📨 Enviar mensajes de prueba</button>}
            {tgToken&&<button onClick={function(){
              localStorage.removeItem("td-tg-token");localStorage.removeItem("td-tg-chatid");
              setTgToken("");setTgChatId("");setTgStatus(null);setShowTgConfig(false);
            }} style={{flex:1,padding:"7px",background:"transparent",border:"1px solid #333",color:"#555",borderRadius:4,fontSize:9,cursor:"pointer"}}>Desconectar</button>}
          </div>
        </div>
        )
      )}

      {/* Finnhub config panel */}
      {showFinnhubConfig&&(
        <div style={{background:"#111118",border:"1px solid rgba(0,180,80,.3)",borderRadius:8,padding:12,marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div style={{fontSize:10,color:"#00cc66",fontWeight:700}}>📈 FINNHUB — ACCIONES Y ETFS</div>
            {finnhubKey&&<button onClick={function(){setShowFinnhubConfig(false);}} style={{background:"transparent",border:"none",color:"#555",cursor:"pointer",fontSize:12}}>✕</button>}
          </div>
          <div style={{fontSize:8,color:"#555",marginBottom:10,lineHeight:1.6}}>
            Finnhub permite monitorizar acciones (TLT, AAPL, NVDA...) con datos en tiempo real.<br/>
            Crea una cuenta gratuita en <strong style={{color:"#00cc66"}}>finnhub.io</strong> → Dashboard → API Key
          </div>
          <div style={{marginBottom:8}}>
            <div style={{fontSize:8,color:"#888",marginBottom:3}}>API KEY</div>
            <input value={finnhubKey} onChange={function(e){setFinnhubKey(e.target.value.trim());}}
              placeholder="d72p2phr01qlfd9..."
              style={{...S.inp,width:"100%",fontSize:9,padding:"5px 8px",boxSizing:"border-box",fontFamily:"monospace"}}/>
          </div>
          {finnhubStatus&&(
            <div style={{fontSize:9,marginBottom:8,padding:"5px 8px",borderRadius:4,
              background:finnhubStatus==="ok"?"rgba(0,255,136,.08)":"rgba(255,68,68,.08)",
              color:finnhubStatus==="ok"?"#00ff88":"#ff4444",
              border:"1px solid "+(finnhubStatus==="ok"?"rgba(0,255,136,.3)":"rgba(255,68,68,.3)")}}>
              {finnhubStatus==="ok"?"✓ Conexion correcta — precios de acciones disponibles":"✗ Error — revisa la API key"}
            </div>
          )}
          <div style={{display:"flex",gap:6}}>
            <button onClick={function(){
              var k=finnhubKey.trim();
              if(!k){setFinnhubStatus("error");return;}
              fetch("https://finnhub.io/api/v1/quote?symbol=AAPL&token="+k)
                .then(function(r){return r.json();})
                .then(function(d){
                  if(d.c&&d.c>0){
                    localStorage.setItem("td-finnhub-key",k);
                    setFinnhubStatus("ok");
                    setTimeout(function(){setShowFinnhubConfig(false);},1500);
                  }else{setFinnhubStatus("error");}
                }).catch(function(){setFinnhubStatus("error");});
            }} style={{flex:2,padding:"7px",background:"#00b450",color:"#fff",border:"none",borderRadius:4,fontSize:9,fontWeight:700,cursor:"pointer"}}>Guardar y verificar</button>
            {finnhubKey&&<button onClick={function(){
              localStorage.removeItem("td-finnhub-key");
              setFinnhubKey("");setFinnhubStatus(null);setShowFinnhubConfig(false);
            }} style={{flex:1,padding:"7px",background:"transparent",border:"1px solid #333",color:"#555",borderRadius:4,fontSize:9,cursor:"pointer"}}>Desconectar</button>}
          </div>
        </div>
      )}

      {/* Import panel */}
      {showImport&&(
        <div style={{background:"#111118",border:"1px solid rgba(136,170,255,.3)",borderRadius:8,padding:12,marginBottom:12}}>
          <div style={{fontSize:9,color:"#88aaff",fontWeight:700,marginBottom:6}}>IMPORTAR ALERTAS</div>
          <div style={{fontSize:8,color:"#555",marginBottom:6}}>Copia el texto exportado desde otro dispositivo y pegalo aqui:</div>
          <textarea value={importText} onChange={function(e){setImportText(e.target.value);}}
            placeholder='[{"id":...}]'
            style={{...S.inp,width:"100%",minHeight:70,padding:8,fontSize:9,fontFamily:"monospace",resize:"vertical",boxSizing:"border-box"}}/>
          <div style={{display:"flex",gap:6,marginTop:8}}>
            <button onClick={importAlerts} style={{flex:2,padding:"8px",background:"#88aaff",color:"#0a0a0f",border:"none",borderRadius:5,fontSize:9,fontWeight:700,cursor:"pointer"}}>IMPORTAR</button>
            <button onClick={function(){setShowImport(false);setImportText("");}} style={{flex:1,padding:"8px",background:"transparent",border:"1px solid #333",color:"#555",borderRadius:5,fontSize:9,cursor:"pointer"}}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Pausa global banner */}
      {globalPaused&&(
        <div style={{background:"rgba(240,180,41,.1)",border:"1px solid rgba(240,180,41,.35)",borderRadius:6,padding:"8px 12px",marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:9,color:"#f0b429"}}>⏸ Notificaciones pausadas — el monitoreo sigue activo pero no se envían alertas</span>
          <button onClick={function(){setGlobalPaused(false);globalPausedRef.current=false;}}
            style={{background:"#f0b429",border:"none",color:"#0a0a0f",fontSize:8,fontWeight:700,padding:"4px 10px",borderRadius:4,cursor:"pointer"}}>Reanudar</button>
        </div>
      )}

      {/* Banner de permisos del navegador */}
      {notifPerm!=="granted"&&(
        <div style={{background:notifPerm==="denied"?"rgba(255,68,68,.08)":"rgba(0,136,204,.08)",border:"1px solid "+(notifPerm==="denied"?"rgba(255,68,68,.35)":"rgba(0,136,204,.35)"),borderRadius:6,padding:"8px 12px",marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center",gap:10}}>
          <div>
            <div style={{fontSize:9,color:notifPerm==="denied"?"#ff6666":"#4db8ff",fontWeight:700}}>
              {notifPerm==="denied"?"🔕 Notificaciones del navegador bloqueadas":"🔔 Notificaciones del navegador no activadas"}
            </div>
            <div style={{fontSize:8,color:"#555",marginTop:2}}>
              {notifPerm==="denied"
                ?"Ve a ajustes del navegador → Permisos del sitio → Notificaciones y desbloquéalas."
                :"Necesitas activarlas para recibir alertas aunque la app esté en segundo plano."}
            </div>
          </div>
          {notifPerm!=="denied"&&(
            <button onClick={requestNotif} style={{background:"#0088cc",border:"none",color:"#fff",fontSize:8,fontWeight:700,padding:"5px 10px",borderRadius:4,cursor:"pointer",flexShrink:0}}>Activar</button>
          )}
        </div>
      )}

      {/* Formulario nueva alerta — OBSOLETO, reemplazado por addQuickAsset */}
      {showForm&&(
        <div style={{background:"#111118",border:"1px solid rgba(240,180,41,.35)",borderRadius:8,padding:14,marginBottom:12}}>
          <div style={{fontSize:10,color:"#f0b429",fontWeight:700,marginBottom:12}}>NUEVA ALERTA</div>
          {/* Activos (multi-select) */}
          <div style={{marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <div style={{fontSize:8,color:"#555"}}>ACTIVOS <span style={{color:"#f0b429"}}>({draft.selectedSymbols.length} seleccionados)</span></div>
              <div style={{display:"flex",gap:6}}>
                <button onClick={function(){setDraft({...draft,selectedSymbols:SYMBOLS.map(function(s){return s.symbol;})});}}
                  style={{fontSize:7,color:"#f0b429",background:"transparent",border:"none",cursor:"pointer",padding:0}}>Todo</button>
                <button onClick={function(){setDraft({...draft,selectedSymbols:[]});}}
                  style={{fontSize:7,color:"#555",background:"transparent",border:"none",cursor:"pointer",padding:0}}>Ninguno</button>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:4}}>
              {SYMBOLS.map(function(s){
                const sel=draft.selectedSymbols.indexOf(s.symbol)>-1;
                return(
                  <button key={s.symbol} onClick={function(){
                    const cur=draft.selectedSymbols;
                    const next=sel?cur.filter(function(x){return x!==s.symbol;}):[...cur,s.symbol];
                    setDraft({...draft,selectedSymbols:next});
                  }} style={{padding:"6px 2px",borderRadius:5,border:"1px solid "+(sel?"#f0b429":"#2a2a3a"),background:sel?"rgba(240,180,41,.12)":"transparent",color:sel?"#f0b429":"#444",fontSize:8,fontWeight:sel?700:400,cursor:"pointer",textAlign:"center"}}>
                    {s.label.replace("/USD","")}
                  </button>
                );
              })}
            </div>
          </div>
          {/* Custom symbol */}
          <div style={{marginBottom:10}}>
            <div style={{fontSize:8,color:"#555",marginBottom:4}}>OTRO ACTIVO <span style={{color:"#888"}}>(par Binance o acción/ETF con Finnhub)</span></div>
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <input value={customInput} onChange={function(e){setCustomInput(e.target.value.toUpperCase().trim());setCustomCheckStatus(null);}}
                placeholder="Ej: DOGEUSDT, TLT, AAPL..."
                style={{...S.inp,flex:1,padding:"6px 8px",fontSize:9}}/>
              <button onClick={function(){
                var sym=customInput.trim().toUpperCase();
                if(!sym){return;}
                setCustomCheckStatus("checking");
                function addSym(){
                  setCustomCheckStatus("ok");
                  if(draft.selectedSymbols.indexOf(sym)<0){
                    setDraft({...draft,selectedSymbols:[...draft.selectedSymbols,sym]});
                  }
                  setCustomInput("");
                  setTimeout(function(){setCustomCheckStatus(null);},2000);
                }
                // Try Binance first
                fetch("https://api.binance.com/api/v3/ticker/price?symbol="+sym)
                  .then(function(r){return r.json();})
                  .then(function(d){
                    if(d.price){addSym();}
                    else{
                      // Try Finnhub for stocks/ETFs
                      var fhKeyC=localStorage.getItem("td-finnhub-key");
                      if(!fhKeyC){setCustomCheckStatus("error");return;}
                      fetch("https://finnhub.io/api/v1/quote?symbol="+sym+"&token="+fhKeyC)
                        .then(function(r2){return r2.json();})
                        .then(function(d2){if(d2.c&&d2.c>0){addSym();}else{setCustomCheckStatus("error");}})
                        .catch(function(){setCustomCheckStatus("error");});
                    }
                  }).catch(function(){setCustomCheckStatus("error");});
              }} style={{padding:"6px 10px",borderRadius:5,border:"1px solid "+(customCheckStatus==="ok"?"#00ff88":customCheckStatus==="error"?"#ff4444":"#f0b429"),background:"transparent",color:customCheckStatus==="ok"?"#00ff88":customCheckStatus==="error"?"#ff4444":"#f0b429",fontSize:8,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>
                {customCheckStatus==="checking"?"…":customCheckStatus==="ok"?"✓ Añadido":customCheckStatus==="error"?"✗ No existe":"Verificar"}
              </button>
            </div>
          </div>
          {/* Temporalidad */}
          <div style={{marginBottom:10}}>
            <div style={{fontSize:8,color:"#555",marginBottom:4}}>TEMPORALIDAD</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:4}}>
              {INTERVALS.map(function(iv){
                const act=draft.interval===iv.value;
                return <button key={iv.value} onClick={function(){setDraft({...draft,interval:iv.value});}}
                  style={{padding:"8px 2px",borderRadius:5,border:"1px solid "+(act?"#f0b429":"#333"),background:act?"rgba(240,180,41,.15)":"transparent",color:act?"#f0b429":"#555",fontSize:9,fontWeight:act?700:400,cursor:"pointer"}}>{iv.label}</button>;
              })}
            </div>
          </div>

          {/* RSI personalizado */}
          <div style={{background:"rgba(0,255,136,.04)",border:"1px solid rgba(0,255,136,.2)",borderRadius:6,padding:10,marginBottom:8}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:draft.rsiCustomEnabled?10:0}}>
              <div>
                <div style={{fontSize:9,fontWeight:700,color:draft.rsiCustomEnabled?"#00ff88":"#444"}}>RSI PERSONALIZADO</div>
                <div style={{fontSize:7,color:"#444",marginTop:2}}>Nivel específico entre 30–70</div>
              </div>
              <button onClick={function(){setDraft({...draft,rsiCustomEnabled:!draft.rsiCustomEnabled});}}
                style={{padding:"4px 10px",borderRadius:4,border:"1px solid "+(draft.rsiCustomEnabled?"#00ff88":"#333"),background:"transparent",color:draft.rsiCustomEnabled?"#00ff88":"#555",fontSize:8,fontWeight:700,cursor:"pointer"}}>
                {draft.rsiCustomEnabled?"🔔 ON":"🔕 OFF"}
              </button>
            </div>
            {draft.rsiCustomEnabled&&(
              <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:8,alignItems:"end"}}>
                <div>
                  <div style={{fontSize:8,color:"#555",marginBottom:4}}>NOTIFICAR CUANDO RSI</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
                    <button onClick={function(){setDraft({...draft,rsiCustomCondition:"below"});}}
                      style={{padding:"7px 4px",borderRadius:5,border:"1px solid "+(draft.rsiCustomCondition==="below"?"#00ff88":"#333"),background:draft.rsiCustomCondition==="below"?"rgba(0,255,136,.1)":"transparent",color:draft.rsiCustomCondition==="below"?"#00ff88":"#555",fontSize:8,fontWeight:draft.rsiCustomCondition==="below"?700:400,cursor:"pointer"}}>
                      RSI por debajo
                    </button>
                    <button onClick={function(){setDraft({...draft,rsiCustomCondition:"above"});}}
                      style={{padding:"7px 4px",borderRadius:5,border:"1px solid "+(draft.rsiCustomCondition==="above"?"#f0b429":"#333"),background:draft.rsiCustomCondition==="above"?"rgba(240,180,41,.1)":"transparent",color:draft.rsiCustomCondition==="above"?"#f0b429":"#555",fontSize:8,fontWeight:draft.rsiCustomCondition==="above"?700:400,cursor:"pointer"}}>
                      RSI por encima
                    </button>
                  </div>
                </div>
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:8,color:"#888",marginBottom:3}}>VALOR ({draft.rsiCustomCondition==="below"?"≤":"≥"})</div>
                  <input type="number" min="31" max="69" value={draft.rsiCustomTarget}
                    onChange={function(e){setDraft({...draft,rsiCustomTarget:+e.target.value});}}
                    style={{...S.inp,width:56,padding:"5px",fontSize:22,textAlign:"center",fontWeight:700,color:"#f0b429"}}/>
                </div>
              </div>
            )}
          </div>

          <div style={{display:"flex",gap:6}}>
            <button onClick={addAlert} disabled={draft.selectedSymbols.length===0} style={{flex:2,padding:"10px",background:draft.selectedSymbols.length===0?"#2a2a3a":"#f0b429",color:draft.selectedSymbols.length===0?"#444":"#0a0a0f",border:"none",borderRadius:5,fontSize:10,fontWeight:700,cursor:draft.selectedSymbols.length===0?"not-allowed":"pointer"}}>
              {draft.selectedSymbols.length<=1?"CREAR Y MONITORIZAR":"CREAR "+draft.selectedSymbols.length+" ALERTAS"}
            </button>
            <button onClick={function(){setShowForm(false);}} style={{flex:1,padding:"10px",background:"transparent",border:"1px solid #333",color:"#555",borderRadius:5,fontSize:9,cursor:"pointer"}}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Alertas disponibles info — siempre visible */}
      <div style={{display:"flex",gap:6,marginBottom:12}}>
        <div style={{flex:1,background:"rgba(0,255,136,.04)",border:"1px solid rgba(0,255,136,.12)",borderRadius:6,padding:"8px 10px"}}>
          <div style={{fontSize:8,fontWeight:700,color:"#00ff88",marginBottom:4}}>⚡ AUTOMÁTICOS</div>
          <div style={{fontSize:7,color:"#555",lineHeight:1.7}}>
            RSI ≤30 / ≥70<br/>
            EMA 7/25 cruces<br/>
            EMA 50/200 cruces<br/>
            Divergencias RSI
          </div>
        </div>
        <div style={{flex:1,background:"rgba(255,100,200,.04)",border:"1px solid rgba(255,100,200,.12)",borderRadius:6,padding:"8px 10px"}}>
          <div style={{fontSize:8,fontWeight:700,color:"#ff88dd",marginBottom:4}}>⚡ PATRONES</div>
          <div style={{fontSize:7,color:"#555",lineHeight:1.7}}>
            Canales alcistas/bajistas<br/>
            FVG cubiertas<br/>
            Banderín alcista/falso
          </div>
        </div>
      </div>
      {/* Lista de activos monitoreados */}
      <div style={{marginBottom:10}}>
        {alerts.map(function(alert){
          var rsi=alert.currentRsi;
          var isBtc=alert.symbol==="BTCUSDT";
          var intv=INTERVALS.find(function(i){return i.value===alert.interval;})||{label:alert.interval};
          var rsiColor=rsi===null?"#555":rsi<=30?"#00ff88":rsi>=70?"#ff4444":"#888";
          var dotColor=globalPaused?"#f0b429":alert.active?"#00ff88":alert.error?"#ff4444":"#444";
          return(
            <div key={alert.id} style={{display:"flex",alignItems:"center",gap:8,background:"#111118",border:"1px solid "+(alert.active&&!globalPaused?"rgba(0,255,136,.18)":alert.error?"rgba(255,68,68,.18)":globalPaused&&alert.active?"rgba(240,180,41,.18)":"#1a1a2a"),borderRadius:7,padding:"10px 12px",marginBottom:6}}>
              <div style={{width:8,height:8,borderRadius:"50%",flexShrink:0,background:dotColor,boxShadow:alert.active&&!globalPaused?"0 0 6px "+dotColor:"none"}}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
                  <span style={{fontWeight:700,fontSize:11,color:"#e0e0e0"}}>{alert.label}</span>
                  <span style={{fontSize:8,padding:"2px 5px",borderRadius:3,background:"rgba(240,180,41,.1)",color:"#f0b429"}}>{intv.label}</span>
                  {isBtc&&<span style={{fontSize:7,color:"#444"}}>siempre activo</span>}
                  {alert.error&&<span style={{fontSize:7,color:"#ff4444"}}>{(/USDT$|BTC$|ETH$|BNB$|BUSD$/i.test(alert.symbol))?"error de conexion":"clave Finnhub no configurada"}</span>}
                </div>
                {/* Notificaciones configuradas */}
                <div style={{display:"flex",gap:3,flexWrap:"wrap",marginTop:4}}>
                  {alert.rsiOversoldEnabled!==false&&<span style={{fontSize:7,padding:"1px 5px",borderRadius:3,background:"rgba(0,255,136,.1)",border:"1px solid rgba(0,255,136,.25)",color:"#00ff88"}}>RSI≤{alert.rsiOversoldTarget!=null?alert.rsiOversoldTarget:30}</span>}
                  {alert.rsiOverboughtEnabled!==false&&<span style={{fontSize:7,padding:"1px 5px",borderRadius:3,background:"rgba(255,68,68,.1)",border:"1px solid rgba(255,68,68,.25)",color:"#ff6666"}}>RSI≥{alert.rsiOverboughtTarget!=null?alert.rsiOverboughtTarget:70}</span>}
                  {alert.rsiCustomEnabled&&<span style={{fontSize:7,padding:"1px 5px",borderRadius:3,background:"rgba(240,180,41,.12)",border:"1px solid rgba(240,180,41,.35)",color:"#f0b429"}}>RSI{alert.rsiCustomCondition==="below"?"≤":"≥"}{alert.rsiCustomTarget}</span>}
                  {alert.emaCross725Enabled!==false&&<span style={{fontSize:7,padding:"1px 5px",borderRadius:3,background:"rgba(136,170,255,.1)",border:"1px solid rgba(136,170,255,.25)",color:"#88aaff"}}>Cruce EMA 7/25</span>}
                  {alert.emaCross50200Enabled!==false&&<span style={{fontSize:7,padding:"1px 5px",borderRadius:3,background:"rgba(200,150,255,.1)",border:"1px solid rgba(200,150,255,.25)",color:"#c896ff"}}>Cruce EMA 50/200</span>}
                  {alert.rsiDivEnabled!==false&&<span style={{fontSize:7,padding:"1px 5px",borderRadius:3,background:"rgba(255,136,170,.1)",border:"1px solid rgba(255,136,170,.25)",color:"#ff88aa"}}>Div RSI</span>}
                  {alert.channelEnabled&&<span style={{fontSize:7,padding:"1px 5px",borderRadius:3,background:"rgba(255,200,100,.1)",border:"1px solid rgba(255,200,100,.25)",color:"#ffc864"}}>Canal</span>}
                  {alert.fvgEnabled&&<span style={{fontSize:7,padding:"1px 5px",borderRadius:3,background:"rgba(100,200,255,.1)",border:"1px solid rgba(100,200,255,.25)",color:"#64c8ff"}}>FVG</span>}
                </div>
                {rsi!==null&&(
                  <div style={{marginTop:5}}>
                    <div style={{height:4,borderRadius:2,background:"#1e1e2e",position:"relative",overflow:"hidden",width:"100%"}}>
                      <div style={{position:"absolute",left:0,width:"30%",height:"100%",background:"rgba(0,255,136,.08)"}}/>
                      <div style={{position:"absolute",right:0,width:"30%",height:"100%",background:"rgba(255,68,68,.08)"}}/>
                      <div style={{position:"absolute",left:"calc("+Math.min(99,Math.max(1,rsi))+"% - 3px)",top:0,width:6,height:"100%",background:rsiColor,borderRadius:2,transition:"left .5s"}}/>
                    </div>
                    {(function(){
                      var zoneKey=alert.id.toString()+"_rsizone";
                      var zone=lastTrigRef.current[zoneKey]||"neutral";
                      var obThr=alert.rsiOverboughtTarget!=null?alert.rsiOverboughtTarget:70;
                      var ovThr=alert.rsiOversoldTarget!=null?alert.rsiOversoldTarget:30;
                      if(zone==="overbought")return <span style={{fontSize:7,color:"#ff6666",marginTop:2,display:"block"}}>🔴 Zona sobrecompra — próxima alerta al salir y volver a entrar</span>;
                      if(zone==="oversold")return <span style={{fontSize:7,color:"#00ff88",marginTop:2,display:"block"}}>🟢 Zona sobreventa — próxima alerta al salir y volver a entrar</span>;
                      if(rsi>=obThr-2)return <span style={{fontSize:7,color:"#ff8844",marginTop:2,display:"block"}}>⚡ RSI {rsi.toFixed(1)} — cerca de sobrecompra (umbral: {obThr})</span>;
                      if(rsi<=ovThr+2)return <span style={{fontSize:7,color:"#88ff88",marginTop:2,display:"block"}}>⚡ RSI {rsi.toFixed(1)} — cerca de sobreventa (umbral: {ovThr})</span>;
                      return null;
                    })()}
                  </div>
                )}
                {emaData[alert.id]&&<div style={{fontSize:7,color:"#333",marginTop:6,marginBottom:1,fontWeight:600,letterSpacing:.5}}>ESTADO ACTUAL DEL MERCADO</div>}
                <EmaDisplay data={emaData[alert.id]}/>
              </div>
              <div style={{display:"flex",gap:8,alignItems:"center",flexShrink:0}}>
                {rsi!==null&&<span style={{fontSize:11,fontWeight:700,color:rsiColor,minWidth:34,textAlign:"right"}}>RSI {rsi.toFixed(0)}</span>}
                {alert.currentPrice!=null&&<span style={{fontSize:9,color:"#555"}}>${parseFloat(alert.currentPrice).toLocaleString("es-ES",{maximumFractionDigits:2})}</span>}
                {alert.error&&<button onClick={function(){reconnectCountRef.current[alert.id.toString()]=0;startAlert(alert);}} style={{fontSize:8,padding:"3px 8px",background:"rgba(0,255,136,.1)",border:"1px solid #00ff88",color:"#00ff88",borderRadius:4,cursor:"pointer"}}>▶ Reconectar</button>}
                {!isBtc&&<button onClick={function(){removeAlert(alert);}}
                  style={{width:22,height:22,borderRadius:"50%",background:"rgba(255,68,68,.12)",border:"1px solid rgba(255,68,68,.3)",color:"#ff6666",fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1,flexShrink:0}}
                  title="Dejar de monitorear">×</button>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Añadir activo */}
      <div style={{background:"#0d0d16",border:"1px solid #1e1e2e",borderRadius:7,padding:10,marginBottom:12}}>
        <div style={{fontSize:8,color:"#555",marginBottom:6,fontWeight:700}}>AÑADIR ACTIVO</div>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          <input value={addInput} onChange={function(e){setAddInput(e.target.value.toUpperCase().trim());setAddStatus(null);setAddFound(null);}}
            onKeyDown={function(e){if(e.key==="Enter")addQuickAsset();}}
            placeholder="Ej: BTC, SOL, AAPL, TLT..."
            style={{...S.inp,flex:1,padding:"7px 10px",fontSize:10}}/>
          <select value={addInterval} onChange={function(e){setAddInterval(e.target.value);}}
            style={{...S.inp,padding:"7px 8px",fontSize:9,width:52,cursor:"pointer"}}>
            {INTERVALS.map(function(iv){return <option key={iv.value} value={iv.value}>{iv.label}</option>;})}
          </select>
          <button onClick={addFound?confirmAddAsset:addQuickAsset}
            style={{padding:"7px 12px",
              background:addStatus==="ok"?"rgba(0,255,136,.15)":(addStatus==="error"||addStatus==="nofinnhub")?"rgba(255,68,68,.15)":addStatus==="found"?"rgba(0,255,136,.1)":"rgba(240,180,41,.15)",
              border:"1px solid "+(addStatus==="ok"?"#00ff88":(addStatus==="error"||addStatus==="nofinnhub")?"#ff4444":addStatus==="found"?"#00ff88":"#f0b429"),
              color:addStatus==="ok"?"#00ff88":(addStatus==="error"||addStatus==="nofinnhub")?"#ff4444":addStatus==="found"?"#00ff88":"#f0b429",
              borderRadius:5,fontSize:9,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>
            {addStatus==="checking"?"Buscando…":addStatus==="ok"?"✓ Añadido":addStatus==="error"?"✗ No encontrado":addStatus==="nofinnhub"?"✗ Sin clave Finnhub":addStatus==="dup"?"Ya existe":addStatus==="found"?"✓ Confirmar":"Buscar"}
          </button>
        </div>
        <div style={{fontSize:7,color:"#333",marginTop:5}}>Crypto: BTC, SOL, ETH… o par completo BTCUSDT. Acciones/ETFs: AAPL, TLT — requiere Finnhub (📈 arriba)</div>
        {addStatus==="nofinnhub"&&<div style={{fontSize:8,color:"#ff6666",marginTop:4}}>Para acciones y ETFs necesitas configurar la clave Finnhub — pulsa 📈 arriba para añadirla.</div>}

        {/* Config panel shown after asset is found */}
        {addFound&&(
          <div style={{marginTop:10,padding:10,background:"rgba(0,255,136,.04)",border:"1px solid rgba(0,255,136,.15)",borderRadius:6}}>
            <div style={{fontSize:8,color:"#00ff88",fontWeight:700,marginBottom:8}}>⚙️ ALERTAS PARA {addFound.label} · {addInterval.toUpperCase()}</div>
            {/* RSI Sobreventa */}
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
              <label style={{display:"flex",alignItems:"center",gap:5,cursor:"pointer",flex:1}}>
                <input type="checkbox" checked={addConfig.rsiOversoldEnabled} onChange={function(e){setAddConfig(function(c){return{...c,rsiOversoldEnabled:e.target.checked};});}} style={{accentColor:"#00ff88"}}/>
                <span style={{fontSize:9,color:"#ccc"}}>📉 RSI Sobreventa ≤</span>
              </label>
              <input type="number" min="10" max="45" value={addConfig.rsiOversoldTarget}
                onChange={function(e){setAddConfig(function(c){return{...c,rsiOversoldTarget:e.target.value};});}}
                disabled={!addConfig.rsiOversoldEnabled}
                style={{width:44,padding:"3px 5px",background:"#111",border:"1px solid #333",color:addConfig.rsiOversoldEnabled?"#e0e0e0":"#444",borderRadius:4,fontSize:9,textAlign:"center"}}/>
            </div>
            {/* RSI Sobrecompra */}
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
              <label style={{display:"flex",alignItems:"center",gap:5,cursor:"pointer",flex:1}}>
                <input type="checkbox" checked={addConfig.rsiOverboughtEnabled} onChange={function(e){setAddConfig(function(c){return{...c,rsiOverboughtEnabled:e.target.checked};});}} style={{accentColor:"#f0b429"}}/>
                <span style={{fontSize:9,color:"#ccc"}}>📈 RSI Sobrecompra ≥</span>
              </label>
              <input type="number" min="55" max="90" value={addConfig.rsiOverboughtTarget}
                onChange={function(e){setAddConfig(function(c){return{...c,rsiOverboughtTarget:e.target.value};});}}
                disabled={!addConfig.rsiOverboughtEnabled}
                style={{width:44,padding:"3px 5px",background:"#111",border:"1px solid #333",color:addConfig.rsiOverboughtEnabled?"#e0e0e0":"#444",borderRadius:4,fontSize:9,textAlign:"center"}}/>
            </div>
            {/* RSI Personalizado */}
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
              <label style={{display:"flex",alignItems:"center",gap:5,cursor:"pointer",flex:1}}>
                <input type="checkbox" checked={addConfig.rsiCustomEnabled} onChange={function(e){setAddConfig(function(c){return{...c,rsiCustomEnabled:e.target.checked};});}} style={{accentColor:"#88aaff"}}/>
                <span style={{fontSize:9,color:"#ccc"}}>🎯 RSI personalizado</span>
              </label>
              <select value={addConfig.rsiCustomCondition} onChange={function(e){setAddConfig(function(c){return{...c,rsiCustomCondition:e.target.value};});}}
                disabled={!addConfig.rsiCustomEnabled}
                style={{padding:"3px 4px",background:"#111",border:"1px solid #333",color:addConfig.rsiCustomEnabled?"#e0e0e0":"#444",borderRadius:4,fontSize:9}}>
                <option value="below">≤</option>
                <option value="above">≥</option>
              </select>
              <input type="number" min="1" max="99" value={addConfig.rsiCustomTarget}
                onChange={function(e){setAddConfig(function(c){return{...c,rsiCustomTarget:e.target.value};});}}
                disabled={!addConfig.rsiCustomEnabled}
                style={{width:44,padding:"3px 5px",background:"#111",border:"1px solid #333",color:addConfig.rsiCustomEnabled?"#e0e0e0":"#444",borderRadius:4,fontSize:9,textAlign:"center"}}/>
            </div>
            {/* Divergencias RSI */}
            <div style={{marginBottom:6}}>
              <label style={{display:"flex",alignItems:"center",gap:5,cursor:"pointer"}}>
                <input type="checkbox" checked={addConfig.rsiDivEnabled} onChange={function(e){setAddConfig(function(c){return{...c,rsiDivEnabled:e.target.checked};});}} style={{accentColor:"#88aaff"}}/>
                <span style={{fontSize:9,color:"#ccc"}}>🔀 Divergencias RSI</span>
              </label>
            </div>
            {/* EMA Cruces */}
            <div style={{marginBottom:6}}>
              <label style={{display:"flex",alignItems:"center",gap:5,cursor:"pointer"}}>
                <input type="checkbox" checked={addConfig.emaCross725Enabled} onChange={function(e){setAddConfig(function(c){return{...c,emaCross725Enabled:e.target.checked};});}} style={{accentColor:"#f0b429"}}/>
                <span style={{fontSize:9,color:"#ccc"}}>✂️ Cruces EMA 7/25</span>
              </label>
            </div>
            <div style={{marginBottom:8}}>
              <label style={{display:"flex",alignItems:"center",gap:5,cursor:"pointer"}}>
                <input type="checkbox" checked={addConfig.emaCross50200Enabled} onChange={function(e){setAddConfig(function(c){return{...c,emaCross50200Enabled:e.target.checked};});}} style={{accentColor:"#f0b429"}}/>
                <span style={{fontSize:9,color:"#ccc"}}>✂️ Cruces EMA 50/200</span>
              </label>
            </div>
            <div style={{display:"flex",gap:6}}>
              <button onClick={confirmAddAsset}
                style={{flex:1,padding:"7px",background:"rgba(0,255,136,.15)",border:"1px solid #00ff88",color:"#00ff88",borderRadius:5,fontSize:9,fontWeight:700,cursor:"pointer"}}>
                ✓ Añadir con esta configuración
              </button>
              <button onClick={function(){setAddFound(null);setAddStatus(null);setAddInput("");}}
                style={{padding:"7px 10px",background:"transparent",border:"1px solid #333",color:"#555",borderRadius:5,fontSize:9,cursor:"pointer"}}>
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Operaciones Bot */}
      {(function(){
        var bops=[];
        try{bops=JSON.parse(localStorage.getItem("td-bot-ops")||"[]");}catch(e){}
        if(bops.length===0)return null;
        var wins=bops.filter(function(b){return b.hit==="tp";});
        var losses=bops.filter(function(b){return b.hit==="sl";});
        var closed=bops.filter(function(b){return b.hit;});
        var winRate=closed.length>0?Math.round(wins.length/closed.length*100):null;
        var ratios=bops.filter(function(b){return b.ratio>0;}).map(function(b){return b.ratio;});
        var avgRatio=ratios.length>0?(ratios.reduce(function(a,v){return a+v;},0)/ratios.length).toFixed(2):null;
        var maxRatio=ratios.length>0?Math.max.apply(null,ratios).toFixed(2):null;
        var minRatio=ratios.length>0?Math.min.apply(null,ratios).toFixed(2):null;
        return(
          React.createElement("div",{style:{background:"#111118",border:"1px solid rgba(136,170,255,.25)",borderRadius:8,padding:12,marginTop:8}},
            React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}},
              React.createElement("div",{style:{fontSize:9,color:"#88aaff",fontWeight:700,letterSpacing:1}},"🤖 OPERACIONES BOT"),
              React.createElement("button",{onClick:function(){try{localStorage.removeItem("td-bot-ops");}catch(e){}},
                style:{background:"transparent",border:"none",color:"#444",fontSize:8,cursor:"pointer"}},"Limpiar")
            ),
            React.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginBottom:10}},
              [{l:"TOTAL",v:bops.length,c:"#e0e0e0"},{l:"TASA ACIERTO",v:winRate!==null?winRate+"%":"--",c:winRate>=50?"#00ff88":"#ff4444"},
               {l:"RATIO MEDIO",v:avgRatio?"1:"+avgRatio:"--",c:"#88aaff"},
               {l:"MEJOR/PEOR",v:maxRatio?maxRatio+"/"+minRatio:"--",c:"#f0b429"}].map(function(s){
                return React.createElement("div",{key:s.l,style:{background:"#0d0d16",borderRadius:6,padding:"7px 8px",textAlign:"center"}},
                  React.createElement("div",{style:{fontSize:7,color:"#555",marginBottom:3}},[s.l]),
                  React.createElement("div",{style:{fontSize:11,fontWeight:700,color:s.c}},[s.v])
                );
              })
            ),
            bops.slice(0,20).map(function(b){
              function markResult(hitVal){
                try{
                  var ops=JSON.parse(localStorage.getItem("td-bot-ops")||"[]");
                  ops=ops.map(function(op){return op.id===b.id?Object.assign({},op,{hit:hitVal}):op;});
                  localStorage.setItem("td-bot-ops",JSON.stringify(ops));
                  if(!b.hit){
                    var fb2={};try{fb2=JSON.parse(localStorage.getItem("td-pattern-fb")||"{}");}catch(e){}
                    if(!fb2[b.signal])fb2[b.signal]={total:0,correct:0,wrong:0};
                    fb2[b.signal].total=(fb2[b.signal].total||0)+1;
                    if(hitVal==="tp")fb2[b.signal].correct=(fb2[b.signal].correct||0)+1;
                    else fb2[b.signal].wrong=(fb2[b.signal].wrong||0)+1;
                    localStorage.setItem("td-pattern-fb",JSON.stringify(fb2));
                    setPatternFb(fb2);
                  }
                }catch(e){}
                setAlerts(function(prev){return prev.slice();});
              }
              var hitColor=b.hit==="tp"?"#00ff88":b.hit==="sl"?"#ff4444":"#555";
              var hitLabel=b.hit==="tp"?"✅ TP":b.hit==="sl"?"❌ SL":"?";
              return React.createElement("div",{key:b.id,style:{padding:"7px 0",borderBottom:"1px solid #1a1a2a",fontSize:8}},
                React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}},
                  React.createElement("div",null,
                    React.createElement("span",{style:{color:"#88aaff",fontWeight:700}},[b.asset]),
                    React.createElement("span",{style:{color:"#555",margin:"0 4px"}},[b.interval]),
                    React.createElement("span",{style:{color:b.dir==="Long"?"#00ff88":"#ff4444",fontSize:7,border:"1px solid "+(b.dir==="Long"?"#00ff88":"#ff4444"),padding:"1px 4px",borderRadius:3}},[b.dir]),
                    React.createElement("span",{style:{color:"#666",marginLeft:4,fontSize:7}},[(b.signal||"").replace("rsi_","RSI ").replace(/_/g," ")]),
                    React.createElement("div",{style:{color:"#555",marginTop:2}},["$"+parseFloat(b.entry).toLocaleString("es-ES",{maximumFractionDigits:2})+" → TP $"+parseFloat(b.tp).toLocaleString("es-ES",{maximumFractionDigits:2})+" | SL $"+parseFloat(b.sl).toLocaleString("es-ES",{maximumFractionDigits:2})+" | R:"+b.ratio]),
                    React.createElement("div",{style:{color:"#444",fontSize:7}},[ b.date+" "+b.time])
                  ),
                  React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:3,alignItems:"flex-end",flexShrink:0,marginLeft:8}},
                    b.hit
                      ? React.createElement("span",{style:{color:hitColor,fontWeight:700,fontSize:9}},hitLabel)
                      : React.createElement("div",{style:{display:"flex",gap:3}},
                          React.createElement("button",{onClick:function(){markResult("tp");},style:{background:"rgba(0,255,136,.15)",border:"1px solid #00ff88",color:"#00ff88",padding:"3px 7px",borderRadius:4,fontSize:8,cursor:"pointer",fontWeight:700}},"✅ TP"),
                          React.createElement("button",{onClick:function(){markResult("sl");},style:{background:"rgba(255,68,68,.15)",border:"1px solid #ff4444",color:"#ff4444",padding:"3px 7px",borderRadius:4,fontSize:8,cursor:"pointer",fontWeight:700}},"❌ SL")
                        )
                  )
                )
              );
            })
          )
        );
      })()}

      {/* Panel diagnóstico feedback Telegram */}
      {(function(){
        var tk3=localStorage.getItem("td-tg-token");
        var cid3=localStorage.getItem("td-tg-chatid");
        if(!tk3||!cid3)return null;
        var lastPoll=localStorage.getItem("td-tg-last-poll");
        var lastPollStr=lastPoll?new Date(parseInt(lastPoll)).toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"nunca";
        var offset3=localStorage.getItem("td-tg-offset")||"0";
        var fbCount=0;try{var fbD=JSON.parse(localStorage.getItem("td-pattern-fb")||"{}");fbCount=Object.values(fbD).reduce(function(a,v){return a+(v.total||0);},0);}catch(e){}
        return(
          <div style={{background:"#0d1117",border:"1px solid rgba(0,136,204,.25)",borderRadius:8,padding:10,marginTop:8,marginBottom:4}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <div style={{fontSize:9,color:"#0088cc",fontWeight:700,letterSpacing:1}}>FEEDBACK TELEGRAM</div>
              <button onClick={function(){
                var testType="rsi_oversold";
                var msg="🧪 PRUEBA FEEDBACK\n\nEste mensaje verifica que el sistema de feedback funciona.\nPulsa uno de los botones para confirmar que se registra correctamente.\n\nFeedback acumulado: "+fbCount+" respuestas\nÚltimo poll: "+lastPollStr;
                fetch("https://api.telegram.org/bot"+tk3+"/sendMessage",{
                  method:"POST",headers:{"Content-Type":"application/json"},
                  body:JSON.stringify({chat_id:cid3,text:msg,reply_markup:{inline_keyboard:[[
                    {text:"✅ Se cumplió",callback_data:"fb_correct_"+testType},
                    {text:"❌ No se cumplió",callback_data:"fb_wrong_"+testType}
                  ]]}})
                }).then(function(r){return r.json();}).then(function(d){
                  if(d.ok){alert("Mensaje de prueba enviado a Telegram. Pulsa un botón allí y espera ~15s para ver si se registra aquí.");}
                  else{alert("Error enviando: "+JSON.stringify(d));}
                }).catch(function(e){alert("Error de red: "+e.message);});
              }} style={{background:"rgba(0,136,204,.15)",border:"1px solid #0088cc",color:"#0088cc",padding:"3px 8px",borderRadius:4,fontSize:8,cursor:"pointer",fontWeight:700}}>Enviar prueba</button>
            </div>
            <div style={{display:"flex",gap:12,fontSize:8,color:"#555"}}>
              <span>Último poll: <span style={{color:"#888"}}>{lastPollStr}</span></span>
              <span>Offset: <span style={{color:"#888"}}>{offset3}</span></span>
              <span>Respuestas totales: <span style={{color:fbCount>0?"#00ff88":"#888"}}>{fbCount}</span></span>
            </div>
          </div>
        );
      })()}

      {/* Precisión de patrones chartistas */}
      {(function(){
        var FB_LABELS={
          rsi_div_bull:"🟢 Div. Alcista RSI",rsi_div_bear:"🔴 Div. Bajista RSI",
          rsi_conv_bull:"📈 Conv. Alcista RSI",rsi_conv_bear:"📉 Conv. Bajista RSI",
          canal_bajista_ruptura_alcista:"🚀 Canal Baj. Ruptura ↑",canal_bajista_ruptura_bajista:"📐 Canal Baj. Ruptura ↓",
          canal_bajista_soporte:"📐 Canal Baj. Soporte",canal_bajista_resistencia:"📐 Canal Baj. Resistencia",
          canal_alcista_ruptura_alcista:"🚀 Canal Alc. Ruptura ↑",canal_alcista_ruptura_bajista:"⚠️ Canal Alc. Ruptura ↓",
          canal_alcista_soporte:"📐 Canal Alc. Soporte",canal_alcista_resistencia:"📐 Canal Alc. Resistencia"
        };
        var entries=Object.keys(patternFb).filter(function(k){return patternFb[k]&&patternFb[k].total>0;});
        if(entries.length===0)return null;
        return(
          <div style={{background:"#111118",border:"1px solid rgba(255,136,221,.2)",borderRadius:8,padding:12,marginTop:8,marginBottom:4}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div style={{fontSize:9,color:"#ff88dd",fontWeight:700,letterSpacing:1}}>PRECISIÓN PATRONES (feedback)</div>
              <div style={{display:"flex",gap:5,alignItems:"center"}}>
                {(function(){
                  var tk2=localStorage.getItem("td-tg-token");
                  var cid2=localStorage.getItem("td-tg-chatid");
                  if(!tk2||!cid2)return null;
                  return <button onClick={function(){
                    var LABELS2={rsi_oversold:"📉 RSI Sobreventa",rsi_overbought:"📈 RSI Sobrecompra",rsi_custom:"🎯 RSI Personalizado",golden:"🌟 Cruce Dorado 7/25",death:"💀 Cruce Muerte 7/25",ema200_golden:"🌟 Cruce Dorado 50/200",ema200_death:"💀 Cruce Muerte 50/200",rsi_div_bull:"🟢 Div Alcista RSI",rsi_div_bear:"🔴 Div Bajista RSI",rsi_conv_bull:"📈 Conv Alcista",rsi_conv_bear:"📉 Conv Bajista",canal_bajista_ruptura_alcista:"📐 Canal Baj. Rup↑",canal_alcista_ruptura_bajista:"📐 Canal Alc. Rup↓",canal_alcista_soporte:"📐 Canal Alc. Soporte",patron_fvg:"⚡ FVG Cubierta",patron_combo:"🔥 Patrón Combo"};
                    var fb2={};try{fb2=JSON.parse(localStorage.getItem("td-pattern-fb")||"{}");}catch(e){}
                    var ts2=Object.keys(fb2).filter(function(t){return fb2[t].total>0;});
                    if(!ts2.length){alert("Sin datos de feedback todavía.");return;}
                    var totC=0,totA=0;
                    var lines2=ts2.sort(function(a,b){return fb2[b].total-fb2[a].total;}).map(function(t){
                      var s=fb2[t];var pct=Math.round(s.correct/(s.total||1)*100);
                      var ic=pct>=70?"✅":pct>=50?"⚠️":"❌";
                      totC+=s.correct;totA+=s.total;
                      return (LABELS2[t]||t)+": "+pct+"% "+ic+" ("+s.correct+"/"+s.total+")";
                    });
                    var gp=totA>0?Math.round(totC/totA*100):0;
                    var now3=new Date();
                    var msg3="📊 INFORME — Precisión de Señales\n📅 "+now3.toLocaleDateString("es-ES")+"\n\n"+lines2.join("\n")+"\n\n━━━━━━━━━━━━\n🎯 Global: "+gp+"% ("+totC+"/"+totA+")\n"+(gp>=70?"✅ Buen rendimiento":"⚠️ Revisar señales");
                    fetch("https://api.telegram.org/bot"+tk2+"/sendMessage",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:cid2,text:msg3})}).then(function(r){if(r.ok)localStorage.setItem("td-pattern-fb-last-report",String(Date.now()));}).catch(function(){});
                  }} style={{background:"rgba(255,136,221,.1)",border:"1px solid rgba(255,136,221,.3)",color:"#ff88dd",padding:"3px 7px",borderRadius:4,fontSize:8,cursor:"pointer"}}>✈️ Enviar</button>;
                })()}
                <button onClick={function(){localStorage.removeItem("td-pattern-fb");localStorage.removeItem("td-tg-offset");setPatternFb({});}}
                  style={{background:"transparent",border:"none",color:"#444",fontSize:8,cursor:"pointer"}}>Reset</button>
              </div>
            </div>
            {entries.map(function(k){
              var s=patternFb[k];
              var pct=s.total>0?Math.round(s.correct/s.total*100):0;
              var barColor=pct>=60?"#00ff88":pct>=40?"#f0b429":"#ff4444";
              var remaining=50-s.total;
              return(
                <div key={k} style={{marginBottom:8}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                    <span style={{fontSize:8,color:"#e0e0e0"}}>{FB_LABELS[k]||k}</span>
                    <span style={{fontSize:8,fontWeight:700,color:barColor}}>{pct}% ({s.correct}/{s.total}){s.total<50?" — "+remaining+" restantes":""}</span>
                  </div>
                  <div style={{height:4,background:"#1e1e2e",borderRadius:2,overflow:"hidden"}}>
                    <div style={{width:pct+"%",height:"100%",background:barColor,borderRadius:2,transition:"width .4s"}}/>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })()}

      {/* Log de alertas disparadas */}
      {logs.length>0&&(
        <div style={{background:"#111118",border:"1px solid #1e1e2e",borderRadius:8,padding:12,marginTop:4}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div style={{fontSize:9,color:"#f0b429",fontWeight:700}}>HISTORIAL DE ALERTAS</div>
            <button onClick={function(){setLogs([]);try{localStorage.removeItem("td-alert-logs");}catch(e){}}} style={{background:"transparent",border:"none",color:"#444",fontSize:8,cursor:"pointer"}}>Limpiar</button>
          </div>
          {logs.slice(0,20).map(function(log){
            var icon="🔔";
            var color="#88aaff";
            if(log.type==="rsi_oversold"){icon="📉";color="#00ff88";}
            else if(log.type==="rsi_overbought"){icon="📈";color="#ff4444";}
            else if(log.type==="golden"||log.type==="ema200_golden"){icon="🌟";color="#ffd700";}
            else if(log.type==="death"||log.type==="ema200_death"){icon="💀";color="#cc44cc";}
            else if(log.type==="price_target"){icon="🎯";color="#f0b429";}
            else if(log.type==="rsi_div_bull"||log.type==="rsi_conv_bull"){icon="🟢";color="#00ff88";}
            else if(log.type==="rsi_div_bear"||log.type==="rsi_conv_bear"){icon="🔴";color="#ff4444";}
            else if(log.type&&log.type.indexOf("canal_alcista")===0){icon="📈";color="#88aaff";}
            else if(log.type&&log.type.indexOf("canal_bajista")===0){icon="📉";color="#ff8844";}
            var fb=patternStats[log.type]||null;
            var fbPct=fb&&fb.total>0?Math.round(fb.correct/fb.total*100):null;
            var rated=ratedLogs[log.id];
            var ALL_FB_TYPES=["rsi_oversold","rsi_overbought","rsi_custom","golden","death","ema200_golden","ema200_death",
              "rsi_div_bull","rsi_div_bear","rsi_conv_bull","rsi_conv_bear",
              "canal_bajista_soporte","canal_bajista_resistencia","canal_bajista_ruptura_alcista","canal_bajista_ruptura_bajista",
              "canal_alcista_soporte","canal_alcista_resistencia","canal_alcista_ruptura_alcista","canal_alcista_ruptura_bajista",
              "patron_combo","patron_fvg"];
            var canRate=ALL_FB_TYPES.indexOf(log.type)>=0;
            return(
              <div key={log.id} style={{padding:"7px 0",borderBottom:"1px solid #1a1a2a",fontSize:9}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                    <span style={{fontSize:14,lineHeight:1}}>{icon}</span>
                    <div>
                      <span style={{fontWeight:700,color:"#e0e0e0"}}>{log.label}</span>
                      <span style={{color:"#555",marginLeft:5,background:"rgba(240,180,41,.1)",padding:"1px 5px",borderRadius:3}}>{log.interval}</span>
                      {fbPct!==null&&<span style={{color:fbPct>=60?"#00ff88":fbPct>=40?"#f0b429":"#ff4444",marginLeft:5,fontSize:7}}>
                        {fbPct}% precisión ({fb.total})
                      </span>}
                      <div style={{color:color,marginTop:2,fontWeight:700,fontSize:8}}>{log.body}</div>
                    </div>
                  </div>
                  <span style={{color:"#444",fontSize:8,whiteSpace:"nowrap",marginLeft:8}}>{log.date&&log.date!==new Date().toLocaleDateString("es-ES")?log.date+" ":""}{log.time}</span>
                </div>
                {canRate&&!rated&&(
                  <div style={{display:"flex",alignItems:"center",gap:6,marginTop:5,marginLeft:22}}>
                    <span style={{fontSize:7,color:"#444"}}>¿Señal correcta?</span>
                    <button onClick={function(){rateFeedback(log.id,log.type,true);}}
                      style={{background:"rgba(0,255,136,.12)",border:"1px solid #00ff88",color:"#00ff88",padding:"2px 8px",borderRadius:3,fontSize:8,cursor:"pointer",fontWeight:700}}>
                      ✓ Sí
                    </button>
                    <button onClick={function(){rateFeedback(log.id,log.type,false);}}
                      style={{background:"rgba(255,68,68,.12)",border:"1px solid #ff4444",color:"#ff4444",padding:"2px 8px",borderRadius:3,fontSize:8,cursor:"pointer",fontWeight:700}}>
                      ✗ No
                    </button>
                  </div>
                )}
                {canRate&&rated&&(
                  <div style={{marginTop:4,marginLeft:22,fontSize:7,color:rated==="correct"?"#00ff88":"#ff4444"}}>
                    {rated==="correct"?"✓ Marcada como correcta":"✗ Marcada como falsa señal"}
                    {fb&&fb.total>0&&<span style={{color:"#444",marginLeft:6}}>· Acumulado: {fb.correct}/{fb.total}</span>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// - GOAL TRACKER -
function GoalTracker({h0Total,ethT,actPnl,xhist,S}){
  // GOAL: perdida historica fija de Quantfury (246 ops hasta 23/03/2026)
  var GOAL=7471.73;
  // Net P&L de los cierres hechos via app desde el 23/03/2026
  var recovered=parseFloat(xhist.reduce(function(a,h){return a+(h.result||0);},0).toFixed(2));
  var potentialExtra=actPnl>0?actPnl:0;
  // Porcentaje: solo cuenta lo recuperado (recovered>0); si hay regresion, queda en 0%
  var pct=Math.min(100,Math.round(Math.max(0,recovered)/GOAL*100));
  // Deficit actual = objetivo original + perdidas nuevas (si recovered<0)
  var currentDeficit=parseFloat((GOAL-recovered).toFixed(2));
  var remaining=parseFloat(Math.max(0,currentDeficit).toFixed(2));

  // Milestone messages
  var milestone="";
  if(xhist.length===0)milestone="Sin operaciones cerradas via app. Los cierres aqui actualizaran el progreso.";
  else if(recovered<0)milestone="Perdidas recientes. Mantén el plan y recupera el ritmo.";
  else if(pct>=100)milestone="OBJETIVO COMPLETADO";
  else if(pct>=75)milestone="Casi ahi. Ultimo tramo.";
  else if(pct>=50)milestone="Mas de la mitad del camino.";
  else if(pct>=25)milestone="Buen progreso. Sigue el plan.";
  else if(pct>=10)milestone="En marcha. Cada operacion cuenta.";
  else milestone="El viaje de mil millas empieza con un paso.";

  // Recent wins
  const recentWins=xhist.filter(h=>h.result>0).slice(0,5);

  return(
    <div style={{...S.card,border:"1px solid rgba(240,180,41,.4)",marginBottom:10}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
        <div>
          <div style={{fontSize:10,color:"#f0b429",fontWeight:700,letterSpacing:1}}>RECUPERACION — OBJETIVO: ${GOAL.toLocaleString()}</div>
          <div style={{fontSize:9,color:"#555",marginTop:2}}>Perdida Quantfury historica (fija) · P&L via app: <span style={{color:recovered>=0?"#00ff88":"#ff4444",fontWeight:700}}>{recovered>=0?"+":""}{recovered.toFixed(2)}</span></div>
          {recovered<0&&<div style={{fontSize:8,color:"#ff4444",marginTop:2}}>⚠️ Deficit actual: ${remaining.toLocaleString()} (objetivo + nuevas perdidas)</div>}
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:28,fontWeight:700,color:pct>=100?"#00ff88":pct>=50?"#f0b429":"#e0e0e0"}}>{pct}%</div>
          <div style={{fontSize:8,color:"#444"}}>completado</div>
        </div>
      </div>

      {/* Barra de progreso */}
      <div style={{marginBottom:10}}>
        <div style={{height:14,borderRadius:7,background:"#1e1e2e",overflow:"hidden",position:"relative"}}>
          <div style={{
            height:"100%",
            width:pct+"%",
            background:pct>=100?"#00ff88":pct>=50?"linear-gradient(90deg,#f0b429,#00ff88)":"linear-gradient(90deg,#ff4444,#f0b429)",
            borderRadius:7,
            transition:"width 1s ease",
            position:"relative"
          }}>
            {pct>8&&<span style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",fontSize:9,fontWeight:700,color:"#0a0a0f"}}>{pct}%</span>}
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:8,color:"#444",marginTop:3}}>
          <span style={{color:recovered>=0?"#00ff88":"#ff4444"}}>{recovered>=0?"Recuperado: +":"Regresion: "}{Math.abs(recovered).toFixed(2)}</span>
          <span style={{color:"#ff4444"}}>Restante: ${remaining.toLocaleString()}{recovered<0?" (objetivo + "+Math.abs(recovered).toFixed(0)+" perdidas)":""}</span>
        </div>
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:10}}>
        <div style={{background:"#0d0d16",borderRadius:6,padding:"8px",textAlign:"center"}}>
          <div style={{fontSize:16,fontWeight:700,color:recovered>=0?"#00ff88":"#ff4444"}}>{recovered>=0?"+":""}{recovered.toFixed(0)}</div>
          <div style={{fontSize:7,color:"#555"}}>RECUPERADO</div>
        </div>
        <div style={{background:"#0d0d16",borderRadius:6,padding:"8px",textAlign:"center"}}>
          <div style={{fontSize:16,fontWeight:700,color:"#ff4444"}}>${remaining.toFixed(0)}</div>
          <div style={{fontSize:7,color:"#555"}}>RESTANTE</div>
        </div>
        <div style={{background:"#0d0d16",borderRadius:6,padding:"8px",textAlign:"center"}}>
          <div style={{fontSize:16,fontWeight:700,color:actPnl>0?"#f0b429":"#555"}}>${potentialExtra.toFixed(0)}</div>
          <div style={{fontSize:7,color:"#555"}}>EN CURSO</div>
        </div>
      </div>

      {/* Mensaje motivador */}
      <div style={{padding:"8px 10px",background:"rgba(240,180,41,.05)",border:"1px solid rgba(240,180,41,.15)",borderRadius:6,marginBottom:recentWins.length>0?10:0}}>
        <span style={{fontSize:10,color:"#f0b429"}}>{milestone}</span>
      </div>

      {/* Ultimas victorias que suman al objetivo */}
      {recentWins.length>0&&(
        <div>
          <div style={{fontSize:8,color:"#555",marginBottom:5,letterSpacing:1}}>ULTIMAS OPERACIONES QUE SUMAN</div>
          {recentWins.map((h,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:9,padding:"3px 0",borderBottom:"1px solid #1a1a2a"}}>
              <span style={{color:"#888"}}>{h.asset} · {h.date}</span>
              <span style={{color:"#00ff88",fontWeight:700}}>+${h.result.toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// - POSITION ADVISOR -
function PositionAdvisor({pos,PM,getPnL,fmtNum,S}){
  const advices=[];

  pos.forEach(p=>{
    const currentPrice=PM[p.asset]||p.entry;
    const pnl=getPnL(p);
    const isBE=p.be||p.sl===p.entry;

    // Calcular ratio riesgo/beneficio — si hay tpLevels usar media ponderada de los activos
    let effectiveTp=p.tp||0;
    if((!effectiveTp)&&p.tpLevels&&p.tpLevels.length>0){
      const activeLvls=p.tpLevels.filter(function(l){return!l.hit;});
      if(activeLvls.length>0){
        const totPct=activeLvls.reduce(function(a,l){return a+l.pct;},0);
        effectiveTp=activeLvls.reduce(function(a,l){return a+l.price*(l.pct/totPct);},0);
      }
    }
    const risk=p.sl?Math.abs(p.entry-p.sl)/p.entry*100:null;
    const reward=effectiveTp?Math.abs(effectiveTp-p.entry)/p.entry*100:null;
    const ratio=risk&&reward?reward/risk:null;

    // Distancia al TP en %
    const distToTP=effectiveTp?Math.abs(currentPrice-effectiveTp)/Math.abs(effectiveTp-p.entry)*100:null;
    const pnlPct=p.capital>0?pnl/p.capital*100:0;

    const tips=[];

    // Solo mostrar consejos cuando hay algo que mejorar o requiere accion
    // Ratio insuficiente
    if(ratio&&ratio<2&&!isBE){
      tips.push({
        type:"danger",
        icon:"🔴",
        text:"Ratio 1:"+ratio.toFixed(1)+" es insuficiente. El riesgo no justifica el beneficio potencial. Considera ajustar el TP o cerrar."
      });
    }
    // Ratio extremadamente alto (poco realista)
    if(ratio&&ratio>20){
      tips.push({
        type:"warn",
        icon:"⚠",
        text:"Ratio 1:"+ratio.toFixed(0)+" es muy alto. Revisa si el TP es realista. Considera tomar beneficio parcial en niveles intermedios."
      });
    }

    // SL muy alejado
    if(risk&&risk>5&&!isBE){
      tips.push({
        type:"warn",
        icon:"⚠",
        text:"SL al "+risk.toFixed(1)+"% de la entrada. Riesgo elevado. Asegurate de que el nivel tiene justificacion tecnica (soporte/resistencia clave)."
      });
    }

    // Cerca del TP — accion concreta: tomar parciales
    if(distToTP!==null&&distToTP<30&&pnl>0){
      const partialProfit=pnl*0.5;
      tips.push({
        type:"good",
        icon:"🎯",
        text:"Estas al "+Math.round(100-distToTP)+"% del recorrido al TP. Considera cerrar el 30-50% ahora ("+fmtNum(partialProfit)+") y dejar correr el resto con SL en BE."
      });
    }

    // Beneficio flotante importante sin BE — accion: mover SL
    if(pnlPct>15&&!isBE){
      tips.push({
        type:"good",
        icon:"💰",
        text:"Llevas +"+pnlPct.toFixed(1)+"% sobre el capital. Mueve el SL a breakeven ahora para proteger la ganancia y operar sin riesgo."
      });
    }

    // Sin TP definido (tpLevels parciales también cuentan)
    const hasTp=(p.tp&&p.tp!==0)||(p.tpLevels&&p.tpLevels.length>0);
    if(!hasTp){
      tips.push({
        type:"warn",
        icon:"⚠",
        text:"Sin Take Profit definido. Define un objetivo antes de que el mercado lo haga por ti. Busca la proxima ineficiencia o zona de resistencia relevante."
      });
    }

    if(tips.length>0){
      advices.push({position:p,tips,pnl});
    }
  });

  if(advices.length===0)return null;

  const typeColor={good:"#00ff88",info:"#f0b429",warn:"#ff8844",danger:"#ff4444"};

  return(
    <div style={{marginTop:4}}>
      <div style={{fontSize:10,color:"#f0b429",fontWeight:700,marginBottom:8,letterSpacing:1}}>CONSEJOS DE GESTION</div>
      {advices.map(({position:p,tips,pnl})=>(
        <div key={p.id} style={{...S.card,border:"1px solid rgba(240,180,41,.2)",marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <span style={{fontSize:12,fontWeight:700}}>{p.asset}</span>
              <span style={{fontSize:9,color:p.dir==="Short"?"#ff4444":"#00ff88",border:"1px solid "+(p.dir==="Short"?"#ff4444":"#00ff88"),padding:"1px 5px",borderRadius:3}}>{p.dir}</span>
            </div>
            <span style={{fontSize:12,fontWeight:700,color:pnl>=0?"#00ff88":"#ff4444"}}>{fmtNum(pnl)}</span>
          </div>
          {tips.map((tip,i)=>(
            <div key={i} style={{
              display:"flex",gap:8,alignItems:"flex-start",
              padding:"8px 10px",marginBottom:i<tips.length-1?6:0,
              background:"#0d0d16",borderRadius:6,
              borderLeft:"3px solid "+typeColor[tip.type]
            }}>
              <span style={{fontSize:14,flexShrink:0}}>{tip.icon}</span>
              <span style={{fontSize:10,color:"#888",lineHeight:1.6}}>{tip.text}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}


function ModalCloseEth({pr,closeEthLegacy,setModal,S}){
  const[price,setPrice]=useState(String(pr.ETH||""));
  const ethQty=1.95209253;
  const entryAvg=3621.58;
  const cp=parseFloat(price);
  const unrealized=isNaN(cp)?0:(cp-entryAvg)*ethQty;
  const total=isNaN(cp)?0:parseFloat((unrealized-796.09).toFixed(2));
  return(
    <div style={S.modal}><div style={S.mc}>
      <div style={{fontSize:13,color:"#ff6666",fontWeight:700,marginBottom:4}}>CERRAR ETH LEGADO</div>
      <div style={{fontSize:9,color:"#555",marginBottom:14,lineHeight:1.8}}>
        1.9521 ETH · Entrada media: $3,621.58<br/>
        Esta operacion desaparecera del resumen y quedara registrada en el historial.
      </div>
      <div style={{marginBottom:14}}>
        <div style={{fontSize:9,color:"#555",marginBottom:5}}>PRECIO DE CIERRE</div>
        <input
          style={{...S.inp,fontSize:18,textAlign:"center",padding:"12px"}}
          type="number"
          value={price}
          onFocus={e=>e.target.select()}
          onChange={e=>setPrice(e.target.value)}
          placeholder={"$"+pr.ETH}
          autoFocus
        />
      </div>
      {!isNaN(cp)&&cp>0&&(
        <div style={{padding:"12px",background:"#0d0d16",borderRadius:8,marginBottom:14,textAlign:"center",border:"1px solid "+(total>=0?"rgba(0,255,136,.3)":"rgba(255,68,68,.3)")}}>
          <div style={{fontSize:9,color:"#555",marginBottom:4}}>RESULTADO FINAL ETH LEGADO</div>
          <div style={{fontSize:26,fontWeight:700,color:total>=0?"#00ff88":"#ff4444"}}>
            {total>=0?"+":""}{total.toFixed(2)}$
          </div>
          <div style={{fontSize:8,color:"#555",marginTop:3}}>
            Perdida realizada -$796.09 + no realizada {unrealized>=0?"+":""}{unrealized.toFixed(2)}$
          </div>
        </div>
      )}
      <div style={{display:"flex",gap:8}}>
        <button
          onClick={()=>{if(!isNaN(cp)&&cp>0)closeEthLegacy(cp);}}
          disabled={isNaN(cp)||cp<=0}
          style={{...S.btn(true),flex:2,padding:10,opacity:isNaN(cp)||cp<=0?0.4:1}}
        >CONFIRMAR CIERRE</button>
        <button onClick={()=>setModal(m=>({...m,closeEth:false}))} style={{...S.btn(false),flex:1}}>CANCELAR</button>
      </div>
    </div></div>
  );
}


function ProfileAnalysis({ps,pats,jnl,hist,xhist,sc,S,predictions}){
  const summary=generateProfileSummary(ps,pats,jnl,hist,xhist,sc,predictions);
  const catColor={positive:"#00ff88",neutral:"#f0b429",negative:"#ff4444"};
  const catDot={positive:"●",neutral:"●",negative:"●"};
  return(
    <div style={{...S.card,marginBottom:10,border:"1px solid rgba(240,180,41,.2)"}}>
      <div style={{fontSize:10,color:"#f0b429",fontWeight:700,marginBottom:10}}>ANALISIS DE TU TRADING</div>
      {summary.length===0&&(
        <div style={{fontSize:10,color:"#555",padding:"8px 0"}}>Sin suficientes datos todavia. Cierra al menos 5 operaciones para ver el analisis.</div>
      )}
      {summary.map(function(item,i){
        var col=catColor[item.cat]||"#f0b429";
        return(
          <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"8px 0",borderBottom:i<summary.length-1?"1px solid #1a1a2a":"none"}}>
            <span style={{fontSize:8,flexShrink:0,color:col,marginTop:3}}>●</span>
            <span style={{fontSize:10,color:item.cat==="negative"?"#cc8888":item.cat==="positive"?"#88bb88":"#999",lineHeight:1.7}}>{item.text}</span>
          </div>
        );
      })}
      <div style={{marginTop:8,paddingTop:8,borderTop:"1px solid #1a1a2a",fontSize:8,color:"#444"}}>
        Basado en tus operaciones cerradas y diario psicologico
      </div>
    </div>
  );
}


function TpRows({ps}){
  const rows=[
    {l:"TP Automatico",v:ps.tpAuto||0,c:"#00ff88",d:"Precio llego al TP"},
    {l:"TP Manual ganador",v:ps.tpManual||0,c:"#f0b429",d:"Cerrado ganando antes del TP"},
    {l:"Cierre prematuro",v:ps.earlyClose||0,c:"#ff6600",d:"Cerrado con perdida antes del TP"},
    {l:"Manual BE",v:ps.manualClose||0,c:"#888",d:"Cerrado a cero"},
  ];
  const tot=rows.reduce((a,r)=>a+r.v,0);
  return(
    <React.Fragment>
      {rows.map(x=>{
        const pct=tot>0?Math.round(x.v/tot*100):0;
        return(
          <div key={x.l} style={{marginBottom:6,padding:"6px 8px",background:"#0d0d16",borderRadius:5,border:"1px solid "+x.c+"33"}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:9,marginBottom:1}}>
              <span style={{color:x.c,fontWeight:700}}>{x.l}</span>
              <span style={{color:x.c,fontWeight:700}}>{x.v} ({pct}%)</span>
            </div>
            <div style={{fontSize:7,color:"#444",marginBottom:3}}>{x.d}</div>
            <div style={{height:3,borderRadius:2,background:"#1e1e2e",overflow:"hidden"}}>
              <div style={{height:"100%",width:pct+"%",background:x.c,borderRadius:2}}/>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
}


function PriceField({label,value,onChange}){
  const[v,setV]=useState(String(value));
  useEffect(()=>setV(String(value)),[value]);
  return(
    <div style={{marginBottom:9}}>
      <div style={{fontSize:9,color:"#555",marginBottom:3}}>{label}</div>
      <input
        style={{background:"#0d0d16",border:"1px solid #2a2a3a",color:"#e0e0e0",padding:"7px 10px",borderRadius:4,fontSize:11,width:"100%",boxSizing:"border-box",outline:"none"}}
        type="text" inputMode="decimal" value={v}
        onFocus={()=>setV("")}
        onChange={e=>setV(e.target.value.replace(/[^0-9.]/g,""))}
        onBlur={()=>{const n=parseFloat(v);if(!isNaN(n)&&n>0){setV(String(n));onChange(n);}else setV(String(value));}}
      />
    </div>
  );
}

function ModalCerrar({p,PM,getPnL,fmtNum,fmtP,closePos,setModal,S}){
  const isBE=p.be||p.sl===p.entry;
  const mL=p.sl?p.capital*Math.abs(p.entry-p.sl)/p.entry:0;
  const mG=p.tp?p.capital*Math.abs(p.tp-p.entry)/p.entry:null;
  const curMktG=getPnL(p);
  const[step,setStep]=useState(1); // 1=elegir tipo, 2=confirmar precio manual
  const[closePrice,setClosePrice]=useState("");

  function calcManualPnL(){
    const cp=parseFloat(closePrice);
    if(isNaN(cp)||cp<=0)return curMktG;
    const r=p.dir==="Short"?(p.entry-cp)/p.entry:(cp-p.entry)/p.entry;
    return p.capital*r;
  }
  const manualPnL=calcManualPnL();

  if(step===2){
    return(
      <div style={S.modal}><div style={S.mc}>
        <div style={{fontSize:12,color:"#f0b429",fontWeight:700,marginBottom:4}}>CONFIRMAR PRECIO DE CIERRE</div>
        <div style={{fontSize:14,fontWeight:700,marginBottom:4}}>{p.asset} <span style={{fontSize:10,color:p.dir==="Short"?"#ff4444":"#00ff88"}}>{p.dir}</span></div>
        <div style={{fontSize:9,color:"#555",marginBottom:14}}>{"Entrada: "+fmtP(p.entry)+" · Precio mercado: "+fmtP(PM[p.asset]||p.entry)}</div>
        <div style={{marginBottom:14}}>
          <div style={{fontSize:9,color:"#555",marginBottom:5}}>A QUE PRECIO HAS CERRADO?</div>
          <input
            style={{...S.inp,fontSize:16,textAlign:"center",padding:"12px"}}
            type="number"
            placeholder={"Ej: "+fmtP(PM[p.asset]||p.entry).replace("$","")}
            value={closePrice}
            onChange={e=>setClosePrice(e.target.value)}
            autoFocus
          />
        </div>
        {closePrice&&parseFloat(closePrice)>0&&(
          <div style={{padding:"10px 14px",background:"#0d0d16",borderRadius:6,border:"1px solid #2a2a3a",marginBottom:14,textAlign:"center"}}>
            <div style={{fontSize:9,color:"#555",marginBottom:3}}>RESULTADO ESTIMADO</div>
            <div style={{fontSize:22,fontWeight:700,color:manualPnL>=0?"#00ff88":"#ff4444"}}>{fmtNum(manualPnL)}</div>
          </div>
        )}
        <div style={{display:"flex",gap:8}}>
          <button
            onClick={()=>{if(!closePrice||parseFloat(closePrice)<=0)return;closePos(p,"manual",parseFloat(closePrice));}}
            style={{...S.btn(true),flex:2,padding:10}}
          >CONFIRMAR CIERRE</button>
          <button onClick={()=>setStep(1)} style={{...S.btn(false),flex:1}}>ATRAS</button>
        </div>
      </div></div>
    );
  }

  return(
    <div style={S.modal}><div style={S.mc}>
      <div style={{fontSize:12,color:"#f0b429",fontWeight:700,marginBottom:4}}>CERRAR POSICION</div>
      <div style={{fontSize:14,fontWeight:700,marginBottom:14}}>
        {p.asset} <span style={{fontSize:10,color:p.dir==="Short"?"#ff4444":"#00ff88"}}>{p.dir}</span>
      </div>
      <button onClick={()=>closePos(p,"sl")} style={{background:"rgba(255,68,68,.1)",border:"1px solid #ff4444",borderRadius:8,padding:"12px 14px",cursor:"pointer",textAlign:"left",marginBottom:8,width:"100%",display:"block"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:11,color:"#ff4444",fontWeight:700,marginBottom:3}}>SALTO EL STOP LOSS</div>
            <div style={{fontSize:9,color:"#555"}}>{"SL: "+(p.sl?fmtP(p.sl):"--")}</div>
          </div>
          <div style={{fontSize:15,fontWeight:700,color:"#ff4444"}}>{fmtNum(-mL)}</div>
        </div>
        <div style={{fontSize:9,color:"#555",marginTop:4}}>SL respetado +1 · pérdida controlada</div>
      </button>
      <button onClick={()=>closePos(p,"be")} style={{background:"rgba(136,170,255,.08)",border:"1px solid rgba(136,170,255,.4)",borderRadius:8,padding:"12px 14px",cursor:"pointer",textAlign:"left",marginBottom:8,width:"100%",display:"block"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:11,color:"#88aaff",fontWeight:700,marginBottom:3}}>⚖️ SALTO EL BREAKEVEN</div>
            <div style={{fontSize:9,color:"#555"}}>{"SL movido a entrada: "+(p.entry?fmtP(p.entry):"--")}</div>
          </div>
          <div style={{fontSize:15,fontWeight:700,color:"#88aaff"}}>$0.00</div>
        </div>
        <div style={{fontSize:9,color:"#888",marginTop:4}}>BE +1 · vale 0.5 en disciplina SL</div>
      </button>
      <button onClick={()=>closePos(p,"tp")} style={{background:"rgba(0,255,136,.1)",border:"1px solid #00ff88",borderRadius:8,padding:"12px 14px",cursor:"pointer",textAlign:"left",marginBottom:8,width:"100%",display:"block"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:11,color:"#00ff88",fontWeight:700,marginBottom:3}}>
              {(p.tpLevels&&p.tpLevels.length>0)?"TODOS LOS TPs ALCANZADOS":"LLEGO AL TAKE PROFIT"}
            </div>
            {(p.tpLevels&&p.tpLevels.length>0)?(
              <div style={{fontSize:9,color:"#555"}}>
                {p.tpLevels.filter(function(l){return l.hit;}).length}/{p.tpLevels.length} niveles cerrados — cierra como 1 operación
              </div>
            ):(
              <div style={{fontSize:9,color:"#555"}}>{"TP: "+(p.tp?fmtP(p.tp):"--")}</div>
            )}
          </div>
          <div style={{fontSize:15,fontWeight:700,color:"#00ff88"}}>{mG?fmtNum(mG):"--"}</div>
        </div>
        <div style={{fontSize:9,color:"#555",marginTop:4}}>1 operación cerrada · TP automático +1</div>
      </button>
      <button onClick={()=>setStep(2)} style={{background:"rgba(240,180,41,.08)",border:"1px solid #f0b429",borderRadius:8,padding:"12px 14px",cursor:"pointer",textAlign:"left",marginBottom:8,width:"100%",display:"block"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:11,color:"#f0b429",fontWeight:700,marginBottom:3}}>CIERRE MANUAL</div>
            <div style={{fontSize:9,color:"#555"}}>{"Precio mercado: "+fmtP(PM[p.asset]||p.entry)}</div>
          </div>
          <div style={{fontSize:15,fontWeight:700,color:curMktG>=0?"#00ff88":"#ff4444"}}>{fmtNum(curMktG)}</div>
        </div>
        <div style={{fontSize:9,color:"#f0b429",marginTop:4}}>Te pedira el precio exacto de cierre</div>
      </button>
      <button onClick={()=>setModal(m=>({...m,close:null}))} style={{...S.btn(false),width:"100%",padding:8}}>CANCELAR</button>
    </div></div>
  );
}

// - AUDITORIA -
function AuditoriaTab({xhist,S,fmtNum,reaudit}){
  const[selTrade,setSelTrade]=useState(null);
  const[auditFilter,setAuditFilter]=useState("all");

  var audited=(xhist||[]).filter(function(x){return x.audit_report&&!x.audit_report.error&&!x.audit_report.nonAuditable&&x.audit_score!=null;});
  var pending=(xhist||[]).filter(function(x){return !x.audit_report||x.audit_report.error;});
  var avgScore=audited.length>0?parseFloat((audited.reduce(function(a,x){return a+(x.audit_score||0);},0)/audited.length).toFixed(1)):null;

  // Rule violation counts
  var RULE_IDS=["R1","R2","R3","R4","R5"];
  var RULE_NAMES={R1:"SL es Ley",R2:"Sin hold indefinido",R3:"Sin ego",R4:"Trailing estructural",R5:"Tesis técnica"};
  var failCounts={};
  RULE_IDS.forEach(function(id){failCounts[id]=0;});
  audited.forEach(function(x){
    var rules=(x.audit_report&&x.audit_report.rules)||[];
    rules.forEach(function(r){
      if(r.status==="fail"&&failCounts[r.id]!=null)failCounts[r.id]++;
    });
  });
  var maxFail=Math.max.apply(null,RULE_IDS.map(function(id){return failCounts[id];}));

  var scoreColor=function(s){return s>=4?"#00ff88":s>=3?"#f0b429":s>=2?"#ff9944":"#ff4444";};

  var displayList=(auditFilter==="pending"?pending:auditFilter==="audited"?audited:(xhist||[])).slice(0,80);

  var modal=selTrade;

  return(
    <div>
      {/* KPIs */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:12}}>
        <div style={S.card}>
          <div style={S.lbl}>SCORE MEDIO</div>
          <div style={{fontSize:22,fontWeight:700,color:avgScore!=null?scoreColor(avgScore):"#555"}}>{avgScore!=null?avgScore+"/5":"—"}</div>
        </div>
        <div style={S.card}>
          <div style={S.lbl}>AUDITADAS</div>
          <div style={{fontSize:22,fontWeight:700,color:"#00ff88"}}>{audited.length}</div>
        </div>
        <div style={S.card}>
          <div style={S.lbl}>PENDIENTES</div>
          <div style={{fontSize:22,fontWeight:700,color:pending.length>0?"#f0b429":"#555"}}>{pending.length}</div>
        </div>
      </div>

      {/* Violation bars */}
      {audited.length>0&&(
        <div style={{...S.card,marginBottom:12}}>
          <div style={{fontSize:10,color:"#f0b429",fontWeight:700,marginBottom:8}}>REGLAS MÁS VIOLADAS</div>
          {RULE_IDS.map(function(id){
            var count=failCounts[id];
            var pct=maxFail>0?Math.round(count/maxFail*100):0;
            var col=count===0?"#00ff88":count<=2?"#f0b429":"#ff4444";
            return(
              <div key={id} style={{marginBottom:6}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:9,marginBottom:2}}>
                  <span style={{color:"#aaa"}}>{id} — {RULE_NAMES[id]}</span>
                  <span style={{color:col,fontWeight:700}}>{count} fail</span>
                </div>
                <div style={S.bar}>
                  <div style={S.fill(pct,col)}></div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Filter + list */}
      <div style={{display:"flex",gap:6,marginBottom:8}}>
        {["all","audited","pending"].map(function(f){
          return(
            <button key={f} onClick={function(){setAuditFilter(f);}} style={{...S.btn(auditFilter===f),fontSize:9,padding:"4px 10px"}}>
              {f==="all"?"TODAS":f==="audited"?"AUDITADAS":"PENDIENTES"}
            </button>
          );
        })}
      </div>

      <div style={S.card}>
        {displayList.length===0&&(
          <div style={{fontSize:10,color:"#555",textAlign:"center",padding:20}}>No hay operaciones</div>
        )}
        {displayList.map(function(x){
          var rep=x.audit_report&&!x.audit_report.error&&!x.audit_report.nonAuditable?x.audit_report:null;
          var nonAudit=x.audit_report&&x.audit_report.nonAuditable;
          var score=x.audit_score;
          var rules=rep?(rep.rules||[]):[];
          var missing=detectMissingFields(x);
          var limited=(rep&&rep.missingEnriched&&rep.missingEnriched.length>=3)||(!rep&&!nonAudit&&missing.enriched.length>=3);
          return(
            <div key={x.id} onClick={function(){setSelTrade(x);}} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 4px",borderBottom:"1px solid #1a1a2a",cursor:"pointer"}}>
              <div style={{width:28,height:28,borderRadius:14,background:rep?scoreColor(score):nonAudit?"#444":"#2a2a3a",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:rep?"#0a0a0f":"#555",flexShrink:0}}>
                {rep?score:nonAudit?"—":"?"}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:10,fontWeight:700,color:"#e0e0e0"}}>{x.asset} {x.dir} — {fmtNum(x.result)}</div>
                <div style={{fontSize:9,color:"#555"}}>{x.date} {x.note&&x.note.slice(0,30)}</div>
                {limited&&(
                  <div style={{fontSize:8,color:"#888",marginTop:2}}>📋 Auditoría limitada</div>
                )}
              </div>
              {rep&&(
                <div style={{display:"flex",gap:3,flexShrink:0}}>
                  {rules.filter(function(r){return r.status==="fail";}).map(function(r){
                    return <span key={r.id} style={S.bdg("#ff4444")}>{r.id}</span>;
                  })}
                  {rules.filter(function(r){return r.status==="pass";}).slice(0,3).map(function(r){
                    return <span key={r.id} style={S.bdg("#00ff88")}>{r.id}</span>;
                  })}
                </div>
              )}
              {!rep&&(
                <button onClick={function(e){e.stopPropagation();reaudit(x.id);}} style={{...S.btn(true),fontSize:8,padding:"3px 7px"}}>AUDITAR</button>
              )}
            </div>
          );
        })}
      </div>

      {/* Detail modal */}
      {modal&&(
        <div style={S.modal} onClick={function(){setSelTrade(null);}}>
          <div style={{...S.mc,maxWidth:500}} onClick={function(e){e.stopPropagation();}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{fontSize:12,fontWeight:700,color:"#e0e0e0"}}>{modal.asset} {modal.dir} — {fmtNum(modal.result)}</div>
              <button onClick={function(){setSelTrade(null);}} style={{...S.btn(false),padding:"4px 8px",fontSize:10}}>✕</button>
            </div>
            {modal.audit_report&&modal.audit_report.nonAuditable?(
              <div>
                <div style={{padding:"10px 12px",background:"rgba(255,170,68,.08)",border:"1px solid rgba(255,170,68,.3)",borderRadius:6,marginBottom:12}}>
                  <div style={{fontSize:11,fontWeight:700,color:"#ffaa44",marginBottom:6}}>⚠️ Esta operación no se puede auditar</div>
                  <div style={{fontSize:9,color:"#aaa",lineHeight:1.5}}>Motivo: {modal.audit_report.reason}</div>
                  <div style={{fontSize:8,color:"#666",marginTop:4}}>Causa probable: operación registrada antes de la feature de auditoría.</div>
                </div>
                {modal.audit_report.availableFields&&modal.audit_report.availableFields.length>0&&(
                  <div style={{fontSize:9,color:"#888",marginBottom:10}}>
                    <div style={{fontWeight:700,color:"#aaa",marginBottom:3}}>Datos disponibles:</div>
                    {modal.audit_report.availableFields.join(", ")}
                  </div>
                )}
                {modal.audited_at&&(
                  <div style={{fontSize:8,color:"#333",marginTop:8}}>Evaluado: {new Date(modal.audited_at).toLocaleString("es-ES")}</div>
                )}
              </div>
            ):modal.audit_report&&!modal.audit_report.error?(
              <div>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                  <div style={{width:44,height:44,borderRadius:22,background:scoreColor(modal.audit_score),display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:700,color:"#0a0a0f"}}>{modal.audit_score}/5</div>
                  <div style={{fontSize:10,color:"#aaa",flex:1}}>{modal.audit_report.summary}</div>
                </div>
                {modal.audit_report.missingEnriched&&modal.audit_report.missingEnriched.length>0&&(
                  <div style={{padding:"6px 10px",background:"rgba(136,136,136,.08)",border:"1px solid #2a2a3a",borderRadius:4,marginBottom:10,fontSize:8,color:"#888",lineHeight:1.5}}>
                    📋 Auditoría limitada — campos no registrados: {modal.audit_report.missingEnriched.join(", ")}
                  </div>
                )}
                {(modal.audit_report.rules||[]).map(function(r){
                  var isNa=r.status==="na";
                  var col=r.status==="pass"?"#00ff88":r.status==="fail"?"#ff4444":"#888";
                  var icon=r.status==="pass"?"✅":r.status==="fail"?"❌":"🔘";
                  var label=isNa?"N/D":r.status.toUpperCase();
                  return(
                    <div key={r.id} style={{display:"flex",gap:8,padding:"6px 0",borderBottom:"1px solid #1a1a2a",alignItems:"flex-start"}}>
                      <span style={{fontSize:12,marginTop:1,flexShrink:0}}>{icon}</span>
                      <span style={{...S.bdg(col),marginTop:1,flexShrink:0}}>{label}</span>
                      <div>
                        <div style={{fontSize:10,color:"#ccc",fontWeight:700}}>{r.id} — {r.name}</div>
                        <div style={{fontSize:9,color:"#666",marginTop:2}}>{r.evidence}</div>
                      </div>
                    </div>
                  );
                })}
                {modal.audited_at&&(
                  <div style={{fontSize:8,color:"#333",marginTop:8}}>Auditado: {new Date(modal.audited_at).toLocaleString("es-ES")}</div>
                )}
                <button onClick={function(){reaudit(modal.id);setSelTrade(null);}} style={{...S.btn(false),width:"100%",marginTop:10,fontSize:9}}>RE-AUDITAR</button>
              </div>
            ):(
              <div>
                {modal.audit_report&&modal.audit_report.error?(
                  <div style={{padding:"10px 12px",background:"rgba(255,68,68,.08)",border:"1px solid rgba(255,68,68,.3)",borderRadius:6,marginBottom:12}}>
                    <div style={{fontSize:11,fontWeight:700,color:"#ff6666",marginBottom:4}}>Auditoría no completada</div>
                    <div style={{fontSize:9,color:"#aaa",lineHeight:1.5}}>{modal.audit_report.error}</div>
                    {modal.audit_report.missingEnriched&&modal.audit_report.missingEnriched.length>0&&(
                      <div style={{fontSize:8,color:"#888",marginTop:6}}>Campos no registrados: {modal.audit_report.missingEnriched.join(", ")}</div>
                    )}
                  </div>
                ):(
                  <div style={{fontSize:10,color:"#555",marginBottom:12}}>No auditado todavía</div>
                )}
                <button onClick={function(){reaudit(modal.id);setSelTrade(null);}} style={{...S.btn(true),width:"100%",fontSize:10}}>AUDITAR AHORA</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// - CALENDARIO -
function CalendarioTab({hist,fmtNum}){
  const MONTH_NAMES=["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  const DOW=["L","M","X","J","V","S","D"];

  // Build date->ops map from all history
  const byDate={};
  hist.forEach(h=>{
    if(!h.date)return;
    const p=h.date.split("/");
    if(p.length!==3)return;
    const k=p[2]+"-"+p[1].padStart(2,"0")+"-"+p[0].padStart(2,"0"); // YYYY-MM-DD
    if(!byDate[k])byDate[k]={total:0,ops:[]};
    byDate[k].total=parseFloat((byDate[k].total+h.result).toFixed(2));
    byDate[k].ops.push(h);
  });

  // All months that have data
  const allMonths=[...new Set(Object.keys(byDate).map(k=>k.slice(0,7)))].sort();
  const nowYM=new Date().getFullYear()+"-"+String(new Date().getMonth()+1).padStart(2,"0");
  if(!allMonths.includes(nowYM))allMonths.push(nowYM);
  allMonths.sort();

  const[selMonth,setSelMonth]=useState(allMonths[allMonths.length-1]||nowYM);
  const[selDay,setSelDay]=useState(null);

  const[yr,mo]=selMonth.split("-").map(Number);
  const firstDow=(new Date(yr,mo-1,1).getDay()+6)%7; // Mon=0
  const daysInMo=new Date(yr,mo,0).getDate();

  const moDays=Object.entries(byDate).filter(([k])=>k.startsWith(selMonth));
  const moTotal=moDays.reduce((a,[,v])=>a+v.total,0);
  const moBest=moDays.length?Math.max(...moDays.map(([,v])=>v.total)):0;
  const moWorst=moDays.length?Math.min(...moDays.map(([,v])=>v.total)):0;
  const moWin=moDays.filter(([,v])=>v.total>0).length;
  const moLoss=moDays.filter(([,v])=>v.total<0).length;
  const moOps=moDays.reduce((a,[,v])=>a+v.ops.length,0);

  const selData=selDay?byDate[selDay]:null;

  return(
    <div>
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <div style={{fontSize:11,color:"#f0b429",fontWeight:700,letterSpacing:2}}>CALENDARIO P&L</div>
        <select
          value={selMonth}
          onChange={e=>{setSelMonth(e.target.value);setSelDay(null);}}
          style={{background:"#0d0d16",border:"1px solid #2a2a3a",color:"#f0b429",padding:"5px 10px",borderRadius:6,fontSize:10,cursor:"pointer"}}
        >
          {allMonths.map(m=>{
            const[y,mm]=m.split("-");
            return <option key={m} value={m}>{MONTH_NAMES[+mm-1]+" "+y}</option>;
          })}
        </select>
      </div>

      {/* Resumen del mes */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginBottom:14}}>
        {[
          {l:"TOTAL MES",v:fmtNum(moTotal),c:moTotal>=0?"#00ff88":"#ff4444"},
          {l:"DIAS +",v:moWin,c:"#00ff88"},
          {l:"DIAS -",v:moLoss,c:"#ff4444"},
          {l:"MEJOR DIA",v:moBest>0?fmtNum(moBest):"--",c:"#00ff88"},
          {l:"PEOR DIA",v:moWorst<0?fmtNum(moWorst):"--",c:"#ff4444"},
          {l:"OPERACIONES",v:moOps,c:"#f0b429"},
        ].map(x=>(
          <div key={x.l} style={{background:"#111118",border:"1px solid #1e1e2e",borderRadius:7,padding:"8px 6px",textAlign:"center"}}>
            <div style={{fontSize:7,color:"#555",marginBottom:3,letterSpacing:0.5}}>{x.l}</div>
            <div style={{fontSize:x.l==="TOTAL MES"?15:13,fontWeight:700,color:x.c}}>{x.v}</div>
          </div>
        ))}
      </div>

      {/* Dias semana header */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3,marginBottom:3}}>
        {DOW.map(d=><div key={d} style={{textAlign:"center",fontSize:8,color:"#555",fontWeight:700,padding:"3px 0"}}>{d}</div>)}
      </div>

      {/* Celdas */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3,marginBottom:14}}>
        {Array(firstDow).fill(null).map((_,i)=><div key={"e"+i}/>)}
        {Array(daysInMo).fill(null).map((_,i)=>{
          const day=i+1;
          const k=selMonth+"-"+String(day).padStart(2,"0");
          const data=byDate[k];
          const isToday=new Date().toISOString().slice(0,10)===k;
          const isSel=selDay===k;
          const hasData=!!data;
          const pos2=hasData&&data.total>0;
          const neg=hasData&&data.total<0;
          const be=hasData&&data.total===0;
          return(
            <div
              key={day}
              onClick={()=>hasData&&setSelDay(isSel?null:k)}
              style={{
                borderRadius:6,
                border:"2px solid "+(isSel?"#f0b429":isToday?"rgba(240,180,41,.4)":pos2?"rgba(0,255,136,.3)":neg?"rgba(255,68,68,.3)":"#1e1e2e"),
                background:isSel?"rgba(240,180,41,.12)":pos2?"rgba(0,255,136,.06)":neg?"rgba(255,68,68,.06)":"#0d0d16",
                cursor:hasData?"pointer":"default",
                padding:"4px 2px",
                minHeight:46,
                display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",
                paddingTop:5,
              }}
            >
              <div style={{fontSize:10,color:isToday?"#f0b429":hasData?"#e0e0e0":"#444",fontWeight:isToday||hasData?700:400,lineHeight:1}}>
                {day}
              </div>
              {hasData&&(
                <div style={{fontSize:7,fontWeight:700,color:pos2?"#00ff88":neg?"#ff4444":"#888",marginTop:3,textAlign:"center",lineHeight:1.2}}>
                  {data.total>0?"+":""}{Math.abs(data.total)>=10?Math.round(data.total):data.total.toFixed(1)}
                </div>
              )}
              {hasData&&(
                <div style={{fontSize:6,color:"#555",marginTop:1}}>{data.ops.length}op</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Detalle dia seleccionado */}
      {selDay&&selData&&(
        <div style={{background:"#111118",border:"1px solid rgba(240,180,41,.4)",borderRadius:8,padding:14,marginBottom:10}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{fontSize:11,color:"#f0b429",fontWeight:700}}>
              {selDay.split("-").reverse().join("/")}
            </div>
            <div style={{fontSize:18,fontWeight:700,color:selData.total>=0?"#00ff88":"#ff4444"}}>
              {fmtNum(selData.total)}
            </div>
          </div>
          {selData.ops.map((op,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:"1px solid #1a1a2a",fontSize:10}}>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                <span style={{fontWeight:700}}>{op.asset}</span>
                <span style={{fontSize:8,color:op.dir==="Short"?"#ff4444":"#00ff88",border:"1px solid "+(op.dir==="Short"?"#ff4444":"#00ff88"),padding:"1px 4px",borderRadius:3}}>{op.dir}</span>
                {op.note&&<span style={{fontSize:8,color:"#555"}}>{op.note}</span>}
              </div>
              <span style={{fontWeight:700,minWidth:60,textAlign:"right",color:op.result>0?"#00ff88":op.result<0?"#ff4444":"#666"}}>
                {op.result===0?"$0.00":fmtNum(op.result)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Resumen anual */}
      <div style={{background:"#111118",border:"1px solid #1e1e2e",borderRadius:8,padding:12}}>
        <div style={{fontSize:9,color:"#f0b429",fontWeight:700,marginBottom:10,letterSpacing:1}}>RESUMEN POR MES</div>
        {allMonths.map(m=>{
          const mData=Object.entries(byDate).filter(([k])=>k.startsWith(m));
          const mTot=mData.reduce((a,[,v])=>a+v.total,0);
          const[y,mm]=m.split("-");
          return(
            <div key={m} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 0",borderBottom:"1px solid #1a1a2a",cursor:"pointer"}} onClick={()=>setSelMonth(m)}>
              <span style={{fontSize:10,color:m===selMonth?"#f0b429":"#e0e0e0",fontWeight:m===selMonth?700:400}}>{MONTH_NAMES[+mm-1]+" "+y}</span>
              <div style={{display:"flex",gap:10,alignItems:"center"}}>
                <span style={{fontSize:9,color:"#555"}}>{mData.reduce((a,[,v])=>a+v.ops.length,0)} ops</span>
                <span style={{fontSize:11,fontWeight:700,color:mTot>=0?"#00ff88":"#ff4444",minWidth:70,textAlign:"right"}}>{fmtNum(mTot)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==================== IMPORTAR TAB ====================
function ImportarTab({S,qfTrades,qfOpen,qfMeta,setQfTrades,setQfOpen,setQfMeta}){
  const[importing,setImporting]=useState(false);
  const[progress,setProgress]=useState(0);
  const[error,setError]=useState(null);
  const[result,setResult]=useState(null);

  async function handleFile(ev){
    var file=ev.target.files&&ev.target.files[0];
    if(!file)return;
    if(file.type!=="application/pdf"&&file.name.indexOf(".pdf")<0){setError("El archivo debe ser un PDF");return;}
    setImporting(true);setProgress(5);setError(null);setResult(null);
    try{
      // Hash for duplicate detection
      var buf=await file.arrayBuffer();
      var hashBuf=await crypto.subtle.digest("SHA-256",buf);
      var hashArr=Array.from(new Uint8Array(hashBuf));
      var hash=hashArr.map(function(b){return b.toString(16).padStart(2,"0");}).join("").substring(0,16);
      if(qfMeta&&qfMeta.hash===hash){
        setError("Este PDF ya fue importado el "+(qfMeta.importedAt?new Date(qfMeta.importedAt).toLocaleDateString("es-ES"):""));
        setImporting(false);return;
      }
      setProgress(10);
      var textRows=await qfExtractTextRows(file,function(p){setProgress(p);});
      setProgress(80);
      var parsed=qfParseAllRows(textRows,function(p){setProgress(p);});
      setProgress(92);
      var closedTrades=parsed.closedGroups.map(qfCalcMetrics).filter(Boolean);
      var openPositions=parsed.openGroups.map(qfCalcMetrics).filter(Boolean);
      var meta={hash:hash,importedAt:Date.now(),count:closedTrades.length,openCount:openPositions.length,filename:file.name};
      try{localStorage.setItem("td-qf-trades",JSON.stringify(closedTrades));}catch(e){}
      try{localStorage.setItem("td-qf-open",JSON.stringify(openPositions));}catch(e){}
      try{localStorage.setItem("td-qf-meta",JSON.stringify(meta));}catch(e){}
      setQfTrades(closedTrades);setQfOpen(openPositions);setQfMeta(meta);
      setResult({count:closedTrades.length,openCount:openPositions.length});setProgress(100);
    }catch(err2){
      setError("Error al parsear el PDF: "+((err2&&err2.message)||String(err2)));
    }
    setImporting(false);
  }

  return(
    <div style={{padding:16,maxWidth:680}}>
      <div style={{fontSize:13,color:"#00ff88",fontWeight:700,marginBottom:16,letterSpacing:1}}>IMPORTAR HISTORIAL QUANTFURY</div>

      {!result&&(
        <div style={{background:"rgba(255,255,255,.03)",border:"1px solid #333",borderRadius:8,padding:20,marginBottom:16}}>
          <div style={{fontSize:10,color:"#777",marginBottom:14,lineHeight:1.6}}>
            Sube el PDF "Informe del historial de trading" exportado desde Quantfury.
            Los datos se guardan localmente — el PDF se descarta tras el parseo.
            Importar el mismo PDF dos veces no duplica datos (detectado por hash).
          </div>
          <label style={{cursor:importing?"not-allowed":"pointer",display:"block"}}>
            <div style={{border:"2px dashed "+(importing?"#333":"#444"),borderRadius:8,padding:28,textAlign:"center",color:importing?"#444":"#666",fontSize:11,transition:"border-color .2s"}}>
              {importing?"Procesando... "+progress+"%":"📄 Clic para seleccionar PDF"}
            </div>
            <input type="file" accept=".pdf,application/pdf" style={{display:"none"}} onChange={handleFile} disabled={importing}/>
          </label>
          {importing&&(
            <div style={{marginTop:10,background:"#111",borderRadius:4,height:6,overflow:"hidden"}}>
              <div style={{background:"#00ff88",height:6,borderRadius:4,width:progress+"%",transition:"width .3s"}}/>
            </div>
          )}
        </div>
      )}

      {error&&(
        <div style={{background:"rgba(255,68,68,.08)",border:"1px solid rgba(255,68,68,.4)",borderRadius:6,padding:12,marginBottom:12,fontSize:11,color:"#ff6666"}}>
          ⚠️ {error}
        </div>
      )}

      {result&&(
        <div style={{background:"rgba(0,255,136,.05)",border:"1px solid rgba(0,255,136,.4)",borderRadius:8,padding:16,marginBottom:16}}>
          <div style={{fontSize:12,color:"#00ff88",fontWeight:700,marginBottom:8}}>✅ Importación completada</div>
          <div style={{fontSize:11,color:"#ccc",lineHeight:1.8}}>
            <div>Operaciones cerradas: <strong style={{color:"#fff"}}>{result.count}</strong></div>
            <div>Posiciones abiertas (snapshot): <strong style={{color:"#fff"}}>{result.openCount}</strong></div>
            <div style={{marginTop:8,fontSize:9,color:"#555"}}>Ve a la tab Diagnóstico para ver el análisis completo.</div>
          </div>
          <button onClick={function(){setResult(null);setError(null);}} style={{marginTop:10,background:"transparent",border:"1px solid #444",borderRadius:4,color:"#666",padding:"4px 12px",fontSize:9,cursor:"pointer"}}>
            Reimportar otro PDF
          </button>
        </div>
      )}

      {qfMeta&&!result&&(
        <div style={{background:"rgba(255,255,255,.02)",border:"1px solid #222",borderRadius:6,padding:12,fontSize:9,color:"#444"}}>
          <div style={{color:"#666",marginBottom:3}}>Última importación:</div>
          <div style={{color:"#555"}}>{qfMeta.filename}</div>
          <div>{qfMeta.count} operaciones cerradas · {qfMeta.openCount} abiertas</div>
          <div>{new Date(qfMeta.importedAt).toLocaleString("es-ES")}</div>
        </div>
      )}
    </div>
  );
}

// ==================== DIAGNÓSTICO TAB ====================
function DiagnosticoTab({S,qfTrades,qfOpen,qfMeta}){
  var trades=qfTrades||[];
  var diag=trades.length>0?qfGenerateDiagnosis(trades):null;

  function fmtD(d){
    if(!d)return "N/D";
    return new Date(d).toLocaleDateString("es-ES",{day:"2-digit",month:"short",year:"numeric"});
  }
  function fmtPct(v){
    if(v===null||v===undefined||isNaN(v))return "N/D";
    return(v*100).toFixed(1)+"%";
  }
  function sign(v){return v>=0?"+":"";}

  if(trades.length===0){
    return(
      <div style={{padding:40,textAlign:"center",color:"#333"}}>
        <div style={{fontSize:28,marginBottom:12}}>📊</div>
        <div style={{fontSize:12,color:"#444"}}>No hay datos importados.</div>
        <div style={{fontSize:10,color:"#333",marginTop:6}}>Ve a la tab "Importar" y sube el PDF de Quantfury.</div>
      </div>
    );
  }
  if(!diag)return <div style={{padding:16,fontSize:11,color:"#666"}}>Error calculando diagnóstico.</div>;

  var pf=diag.profitFactor;
  var pfColor=pf>=2?"#00ff88":pf>=1.5?"#f0b429":pf>=1?"#ff8800":"#ff4444";
  var pfLabel=pf>=2?"Bueno (>2.0)":pf>=1.5?"Decente (1.5–2.0)":pf>=1?"Marginal (1.0–1.5)":"Sistema perdedor (<1.0)";
  var maxBkt=Math.max(1,diag.buckets.loss_cat,diag.buckets.loss_large,diag.buckets.loss_med,diag.buckets.loss_small,diag.buckets.gain_small,diag.buckets.gain_med,diag.buckets.gain_large,diag.buckets.gain_cat);

  function BucketBar(props){
    var pct=Math.round(props.val/maxBkt*100);
    return(
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
        <div style={{fontSize:9,color:"#555",width:140,textAlign:"right",flexShrink:0}}>{props.label}</div>
        <div style={{flex:1,background:"#0d0d14",height:14,borderRadius:2,overflow:"hidden"}}>
          <div style={{background:props.color,height:14,width:pct+"%"}}/>
        </div>
        <div style={{fontSize:9,color:"#666",width:28,flexShrink:0}}>{props.val}</div>
      </div>
    );
  }

  var block={background:"rgba(255,255,255,.025)",border:"1px solid #1e1e2e",borderRadius:6,padding:14,marginBottom:12};
  var bh={fontSize:9,color:"#555",fontWeight:700,marginBottom:10,letterSpacing:1.5};
  var warn={background:"rgba(255,68,68,.07)",border:"1px solid rgba(255,68,68,.25)",borderRadius:4,padding:10,fontSize:10,color:"#ff7777",marginTop:8,lineHeight:1.5};
  var note={background:"rgba(240,180,41,.07)",border:"1px solid rgba(240,180,41,.25)",borderRadius:4,padding:10,fontSize:10,color:"#f0b429",marginTop:8,lineHeight:1.5};

  return(
    <div style={{padding:16,maxWidth:720}}>
      <div style={{fontSize:13,color:"#00ff88",fontWeight:700,marginBottom:4,letterSpacing:1}}>DIAGNÓSTICO — HISTORIAL QUANTFURY</div>
      {qfMeta&&<div style={{fontSize:9,color:"#333",marginBottom:20}}>{qfMeta.filename} · importado {new Date(qfMeta.importedAt).toLocaleDateString("es-ES")}</div>}

      {/* ── Bloque 1: Resumen ejecutivo ── */}
      <div style={block}>
        <div style={bh}>RESUMEN EJECUTIVO</div>
        <div style={{fontSize:11,color:"#aaa",lineHeight:2}}>
          <div>Período analizado: <span style={{color:"#ccc"}}>{fmtD(diag.firstDate)} — {fmtD(diag.lastDate)}</span></div>
          <div>Operaciones cerradas: <strong style={{color:"#fff"}}>{diag.n}</strong></div>
          <div>Posiciones abiertas al corte: <strong style={{color:"#fff"}}>{(qfOpen||[]).length}</strong></div>
          <div>P&amp;L total realizado: <strong style={{color:diag.totalPnl>=0?"#00ff88":"#ff4444",fontSize:13}}>{sign(diag.totalPnl)}{diag.totalPnl.toFixed(2)} $</strong></div>
        </div>
      </div>

      {/* ── Bloque 2: Métricas estadísticas ── */}
      <div style={block}>
        <div style={bh}>MÉTRICAS ESTADÍSTICAS</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px 20px",fontSize:10,color:"#888"}}>
          <div>Win rate: <span style={{color:"#ccc"}}>{fmtPct(diag.winRate)} ({diag.winners}W / {diag.losers}L / {diag.breakeven}BE)</span></div>
          <div>Expectancy/trade: <span style={{color:diag.expectancy>=0?"#00ff88":"#ff4444",fontWeight:700}}>{sign(diag.expectancy)}{diag.expectancy.toFixed(2)} $</span></div>
          <div>Ganancia promedio: <span style={{color:"#00ff88"}}>+{diag.avgWin.toFixed(2)} $</span></div>
          <div>Pérdida promedio: <span style={{color:"#ff4444"}}>-{diag.avgLossAbs.toFixed(2)} $</span></div>
          <div>Mayor ganancia: <span style={{color:"#00ff88"}}>{diag.maxWin?"+"+diag.maxWin.pnl_usd.toFixed(2)+" $ ("+diag.maxWin.symbol+")":"N/D"}</span></div>
          <div>Mayor pérdida: <span style={{color:"#ff4444"}}>{diag.maxLoss?diag.maxLoss.pnl_usd.toFixed(2)+" $ ("+diag.maxLoss.symbol+")":"N/D"}</span></div>
          <div style={{gridColumn:"1/3"}}>Profit Factor: <span style={{color:pfColor,fontWeight:700}}>{pf>=999?"∞":pf.toFixed(2)}</span> <span style={{color:pfColor}}>— {pfLabel}</span></div>
        </div>
        {(diag.expectancy<0||pf<1)&&(
          <div style={warn}>⚠️ <strong>Interpretación:</strong> Con estas métricas, operar con mayor tamaño amplifica pérdidas, no ganancias. La prioridad no es ganar más — es dejar de perder.</div>
        )}
      </div>

      {/* ── Bloque 3: Distribución ── */}
      <div style={block}>
        <div style={bh}>DISTRIBUCIÓN DE RESULTADOS</div>
        <BucketBar val={diag.buckets.loss_cat} color="#ff1111" label="Pérdida >$500"/>
        <BucketBar val={diag.buckets.loss_large} color="#ff4444" label="Pérdida $100–500"/>
        <BucketBar val={diag.buckets.loss_med} color="#ff7777" label="Pérdida $10–100"/>
        <BucketBar val={diag.buckets.loss_small} color="#ffaaaa" label="Pérdida <$10"/>
        <BucketBar val={diag.buckets.gain_small} color="#aaffe0" label="Ganancia <$10"/>
        <BucketBar val={diag.buckets.gain_med} color="#66ff99" label="Ganancia $10–100"/>
        <BucketBar val={diag.buckets.gain_large} color="#33ff88" label="Ganancia $100–500"/>
        <BucketBar val={diag.buckets.gain_cat} color="#00ff88" label="Ganancia >$500"/>
        {(diag.buckets.loss_cat/diag.n>0.03&&diag.buckets.gain_small/diag.n>0.30)&&(
          <div style={warn}>⚠️ <strong>Perfil detectado:</strong> pérdidas grandes vs ganancias pequeñas. Matemáticamente, pocos trades malos deshacen muchos trades buenos.</div>
        )}
      </div>

      {/* ── Bloque 4: Patrones de comportamiento ── */}
      <div style={block}>
        <div style={bh}>PATRONES DE COMPORTAMIENTO DETECTADOS</div>
        {[
          {label:"Averaged down (promediado a la baja)",arr:diag.avgDownTrades,critical:diag.avgDownTrades.length/diag.n>0.10},
          {label:"Micro gains (ganancia <$5 con posición >$500)",arr:diag.microGainTrades,critical:false},
          {label:"Catastrophic losses (pérdida >$500)",arr:diag.catLossTrades,critical:diag.catLossTrades.length>0},
          {label:"Held >30 días",arr:diag.heldLongTrades,critical:false}
        ].map(function(item){
          var pnlSum=item.arr.reduce(function(s,t){return s+t.pnl_usd;},0);
          return(
            <div key={item.label} style={{marginBottom:10,paddingBottom:10,borderBottom:"1px solid #111"}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:10,marginBottom:3}}>
                <span style={{color:item.critical?"#ff6666":"#888"}}>{item.label}</span>
                <span style={{color:"#ccc"}}>{item.arr.length} ({fmtPct(item.arr.length/diag.n)})</span>
              </div>
              <div style={{fontSize:9,color:"#444"}}>P&amp;L agregado: <span style={{color:pnlSum>=0?"#00ff88":"#ff4444"}}>{sign(pnlSum)}{pnlSum.toFixed(2)} $</span></div>
            </div>
          );
        })}
        {diag.catLossTrades.length>0&&(
          <div>
            <div style={{fontSize:9,color:"#444",marginBottom:4}}>Top pérdidas catastróficas:</div>
            {diag.catLossTrades.slice().sort(function(a,b){return a.pnl_usd-b.pnl_usd;}).slice(0,5).map(function(t,i){
              return <div key={i} style={{fontSize:9,color:"#ff4444",marginBottom:2}}>{t.symbol} {t.opened_at?new Date(t.opened_at).toLocaleDateString("es-ES"):""} → {t.pnl_usd.toFixed(2)} $</div>;
            })}
          </div>
        )}
      </div>

      {/* ── Bloque 5: Por activo ── */}
      <div style={block}>
        <div style={bh}>DISPERSIÓN POR ACTIVO</div>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:9}}>
          <thead>
            <tr style={{color:"#444",borderBottom:"1px solid #1a1a2a"}}>
              <th style={{textAlign:"left",padding:"3px 6px",fontWeight:400}}>Activo</th>
              <th style={{textAlign:"right",padding:"3px 6px",fontWeight:400}}>Trades</th>
              <th style={{textAlign:"right",padding:"3px 6px",fontWeight:400}}>P&amp;L total</th>
              <th style={{textAlign:"right",padding:"3px 6px",fontWeight:400}}>Win%</th>
              <th style={{textAlign:"right",padding:"3px 6px",fontWeight:400}}>Contribución</th>
            </tr>
          </thead>
          <tbody>
            {diag.assets.map(function(a){
              return(
                <tr key={a.symbol} style={{borderBottom:"1px solid #0d0d14"}}>
                  <td style={{padding:"4px 6px",color:"#ccc"}}>{a.symbol}</td>
                  <td style={{padding:"4px 6px",textAlign:"right",color:"#555"}}>{a.trades}</td>
                  <td style={{padding:"4px 6px",textAlign:"right",color:a.pnl>=0?"#00ff88":"#ff4444"}}>{sign(a.pnl)}{a.pnl.toFixed(2)}</td>
                  <td style={{padding:"4px 6px",textAlign:"right",color:"#555"}}>{fmtPct(a.winRate)}</td>
                  <td style={{padding:"4px 6px",textAlign:"right",color:"#333"}}>{isFinite(a.pct)?(a.pct*100).toFixed(0)+"%":"—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {diag.assets.filter(function(a){return a.trades<5;}).length>5&&(
          <div style={note}>⚠️ Dispersión alta: estás operando {diag.assets.length} activos con muestra insuficiente. Concentra en 2-3 principales para construir edge estadístico.</div>
        )}
      </div>

      {/* ── Bloque 6: Análisis temporal ── */}
      <div style={block}>
        <div style={bh}>P&amp;L MENSUAL</div>
        {(function(){
          var maxAbs=Math.max(1,Math.max.apply(null,diag.months.map(function(m){return Math.abs(m.pnl);})));
          return diag.months.map(function(m){
            var pct=Math.round(Math.abs(m.pnl)/maxAbs*100);
            var parts=m.month.split("-");
            var lbl=["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"][parseInt(parts[1])-1]+" "+parts[0];
            return(
              <div key={m.month} style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                <div style={{fontSize:8,color:"#444",width:60,flexShrink:0}}>{lbl}</div>
                <div style={{flex:1,background:"#0d0d14",height:12,borderRadius:2,overflow:"hidden"}}>
                  <div style={{background:m.pnl>=0?"#00ff88":"#ff4444",height:12,width:pct+"%"}}/>
                </div>
                <div style={{fontSize:8,color:m.pnl>=0?"#00ff88":"#ff4444",width:60,flexShrink:0,textAlign:"right"}}>{sign(m.pnl)}{m.pnl.toFixed(0)}$</div>
              </div>
            );
          });
        })()}
        <div style={{fontSize:9,color:"#444",marginTop:10}}>
          Mejor mes: <span style={{color:"#00ff88"}}>{diag.bestMonth.month} ({sign(diag.bestMonth.pnl)}{diag.bestMonth.pnl.toFixed(2)}$)</span>
          {"  ·  "}
          Peor mes: <span style={{color:"#ff4444"}}>{diag.worstMonth.month} ({diag.worstMonth.pnl.toFixed(2)}$)</span>
        </div>
      </div>

      {/* ── Bloque 7: Posiciones abiertas ── */}
      {(qfOpen||[]).length>0&&(
        <div style={block}>
          <div style={bh}>POSICIONES ABIERTAS AL CORTE</div>
          {(qfOpen||[]).map(function(p,i){
            var daysOpen=p.opened_at?Math.round((Date.now()-new Date(p.opened_at))/(86400000)):null;
            var danger=(p.auto_flags&&p.auto_flags.averaged_down)&&daysOpen!==null&&daysOpen>60;
            return(
              <div key={i} style={{marginBottom:10,padding:10,background:danger?"rgba(255,68,68,.04)":"rgba(255,255,255,.015)",border:"1px solid "+(danger?"rgba(255,68,68,.25)":"#1a1a2a"),borderRadius:4}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{fontSize:11,color:danger?"#ff7777":"#ccc",fontWeight:700}}>{p.symbol}</span>
                  <span style={{fontSize:9,color:p.direction==="long"?"#00ff88":"#ff4444",border:"1px solid "+(p.direction==="long"?"rgba(0,255,136,.3)":"rgba(255,68,68,.3)"),padding:"1px 6px",borderRadius:3}}>{(p.direction||"").toUpperCase()}</span>
                </div>
                <div style={{fontSize:9,color:"#555",display:"flex",gap:14,flexWrap:"wrap"}}>
                  {p.entry_avg_price&&<span>Entry avg: <span style={{color:"#777"}}>{p.entry_avg_price.toLocaleString("en-US",{maximumFractionDigits:4})}</span></span>}
                  {p.total_size_usd>0&&<span>Tamaño: <span style={{color:"#777"}}>{p.total_size_usd.toFixed(0)} $</span></span>}
                  {daysOpen!==null&&<span>Días abierta: <span style={{color:"#777"}}>{daysOpen}</span></span>}
                  {p.num_additions>0&&<span>Añadidos: <span style={{color:"#777"}}>{p.num_additions}</span></span>}
                  {(p.auto_flags&&p.auto_flags.averaged_down)&&<span style={{color:"#ff8800"}}>⚠ averaged_down</span>}
                </div>
                {danger&&(
                  <div style={{marginTop:6,fontSize:9,color:"#ff9966",lineHeight:1.5}}>
                    ⚠️ Señales de anclaje emocional detectadas. Evalúa si la tesis original sigue siendo válida o si es retención por aversión a pérdida.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── Bloque 8: Conclusiones ── */}
      <div style={block}>
        <div style={bh}>CONCLUSIONES AUTOMÁTICAS</div>
        {pf<1&&(
          <div style={warn}>🔴 <strong>CONCLUSIÓN CRÍTICA:</strong> Tu sistema actual tiene expectancy negativa. Operar más amplifica pérdidas. Prioridad #1: NO AÑADIR RIESGO. Reducir tamaño o pausar operativa hasta construir proceso disciplinado.</div>
        )}
        {diag.avgDownTrades.length/diag.n>0.10&&(
          <div style={{...warn,marginTop:pf<1?8:0}}>🔴 <strong>PATRÓN CRÍTICO:</strong> Promediado a la baja recurrente ({(diag.avgDownTrades.length/diag.n*100).toFixed(0)}% de trades). Estadísticamente asociado con la causa #1 de cuentas liquidadas. Activar regla "prohibido añadir a pérdida".</div>
        )}
        {diag.microGainTrades.length/diag.n>0.30&&(
          <div style={note}>🟡 <strong>PATRÓN DETECTADO:</strong> Cierre prematuro de ganadores ({(diag.microGainTrades.length/diag.n*100).toFixed(0)}% de trades terminan con ganancia &lt;$5 sobre posición grande). Define TPs técnicos y respétalos.</div>
        )}
        {diag.assets.filter(function(a){return a.trades>=10&&a.winRate<0.30;}).map(function(a){
          return(
            <div key={a.symbol} style={note}>🟡 <strong>Edge negativo en {a.symbol}:</strong> win rate {fmtPct(a.winRate)} sobre {a.trades} trades — muestra suficiente para ser significativo. Considera excluirlo de la operativa nueva.</div>
          );
        })}
        {pf>=1.5&&diag.expectancy>0&&(
          <div style={{background:"rgba(0,255,136,.05)",border:"1px solid rgba(0,255,136,.2)",borderRadius:4,padding:10,fontSize:10,color:"#00ff88",lineHeight:1.5,marginTop:8}}>
            🟢 Profit Factor de {pf.toFixed(2)} indica sistema con edge positivo. El problema es gestión de tamaño y consistencia, no la dirección del sistema.
          </div>
        )}
        {pf>=1&&pf<1.5&&(
          <div style={note}>🟡 Sistema marginalmente rentable (PF {pf.toFixed(2)}). Pequeños cambios en gestión de riesgo y filtrado de setups pueden llevarlo a terreno sólido.</div>
        )}
      </div>

      {/* ── Bloque 9: Reglas sugeridas ── */}
      <div style={block}>
        <div style={bh}>REGLAS SUGERIDAS POR EL SISTEMA</div>
        <div style={{fontSize:9,color:"#333",marginBottom:10}}>Basadas en tu histórico. Aplícalas manualmente en tu operativa.</div>
        {[
          {text:"Max 1% riesgo por trade",active:true},
          {text:"Solo BTC/ETH operables sin override justificado",active:true},
          {text:"Prohibido añadir a posición en pérdida",active:diag.avgDownTrades.length/diag.n>0.05},
          {text:"TPs técnicos obligatorios — no cerrar antes de TP1 sin motivo escrito",active:diag.microGainTrades.length/diag.n>0.20},
          {text:"Max 2 trades simultáneos abiertos",active:true},
          {text:"Cooldown 24h tras 2 SL consecutivos",active:true},
          {text:"Freeze 48h tras día negativo >2%",active:true},
          {text:"Freeze 7 días tras semana negativa >5%",active:true},
          {text:"Revisión semanal de posiciones abiertas >60 días",active:(qfOpen||[]).some(function(p){return(p.auto_flags&&p.auto_flags.averaged_down)&&p.opened_at&&(Date.now()-new Date(p.opened_at))>5184000000;})}
        ].map(function(rule,i){
          return(
            <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:7}}>
              <span style={{color:rule.active?"#00ff88":"#2a2a2a",fontSize:11,flexShrink:0}}>{rule.active?"☑":"☐"}</span>
              <span style={{fontSize:9,color:rule.active?"#aaa":"#333"}}>{rule.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ModalPos({form,editId,currentPos,PM,pr,SPr,SPos,setModal,fmtNum,S,pats,jnl,SJ}){
  const[f,setF]=useState(function(){
    // Pre-poblar capInput en niveles existentes al editar
    var cap=parseFloat(form.capital)||0;
    if(cap>0&&form.tpLevels&&form.tpLevels.length>0){
      return{...form,tpLevels:form.tpLevels.map(function(l){
        var pctN=parseFloat(l.pct)||0;
        return{...l,capInput:pctN>0?(cap*pctN/100).toFixed(2):(l.capInput||"")};
      })};
    }
    return form;
  });
  const[liveCheck,setLiveCheck]=useState(null); // null | "loading" | {ticker,price,name} | "error"
  const[formError,setFormError]=useState("");
  const[preReflection,setPreReflection]=useState(form.preReflection||"");
  function addTpLevel(){setF(function(prev){return{...prev,tpLevels:[...(prev.tpLevels||[]),{id:Date.now(),price:"",pct:"",capInput:""}]};});}
  function removeTpLevel(id){setF(function(prev){return{...prev,tpLevels:(prev.tpLevels||[]).filter(function(l){return l.id!==id;})};});}
  function updateTpLevel(id,key,val){setF(function(prev){
    var cap=parseFloat(prev.capital)||0;
    var newLevels=(prev.tpLevels||[]).map(function(l){
      if(l.id!==id)return l;
      var updated={...l,[key]:val};
      // Auto-calc the other field
      if(key==="pct"&&cap>0){
        var pctN=parseFloat(val)||0;
        updated.capInput=pctN>0?(cap*pctN/100).toFixed(2):"";
      }else if(key==="capInput"&&cap>0){
        var capN=parseFloat(val)||0;
        updated.pct=capN>0?(capN/cap*100).toFixed(1):"";
      }
      return updated;
    });
    return{...prev,tpLevels:newLevels};
  });}
  const CRYPTO_BINANCE={"BTC":"BTCUSDT","ETH":"ETHUSDT","SOL":"SOLUSDT","LINK":"LINKUSDT","MARA":"MARAUSDT","RGTI":"RGTIUSDT","BNB":"BNBUSDT","ADA":"ADAUSDT","DOGE":"DOGEUSDT","AVAX":"AVAXUSDT","DOT":"DOTUSDT","MATIC":"MATICUSDT","POL":"POLUSDT","XRP":"XRPUSDT","LTC":"LTCUSDT","AAVE":"AAVEUSDT","UNI":"UNIUSDT","CRV":"CRVUSDT","SUSHI":"SUSHIUSDT","COMP":"COMPUSDT","SNX":"SNXUSDT","MKR":"MKRUSDT","ALGO":"ALGOUSDT","ATOM":"ATOMUSDT","FIL":"FILUSDT","ICP":"ICPUSDT","NEAR":"NEARUSDT","APT":"APTUSDT","ARB":"ARBUSDT","OP":"OPUSDT","SUI":"SUIUSDT","TIA":"TIAUSDT","INJ":"INJUSDT","JUP":"JUPUSDT","WIF":"WIFUSDT","PEPE":"PEPEUSDT","BONK":"BONKUSDT","FLOKI":"FLOKIUSDT","SEI":"SEIUSDT","RENDER":"RENDERUSDT","WLD":"WLDUSDT","FET":"FETUSDT","AGIX":"AGIXUSDT","BCH":"BCHUSDT","ETC":"ETCUSDT","DASH":"DASHUSDT","ZEC":"ZECUSDT","MANA":"MANAUSDT","SAND":"SANDUSDT","AXS":"AXSUSDT","ENJ":"ENJUSDT","CHZ":"CHZUSDT","URA":"URAUSDT","PENDLE":"PENDLEUSDT","EIGEN":"EIGENUSDT","ENA":"ENAUSDT","STRK":"STRKUSDT","ZK":"ZKUSDT","W":"WUSDT","TAO":"TAOUSDT","PYTH":"PYTHUSDT","JTO":"JTOUSDT","ONDO":"ONDOUSDT"};

  // Obtener precio de una accion/ETF via Finnhub (si hay key), Stooq, Yahoo
  async function fetchStockPrice(base){
    // 0. Finnhub — fuente primaria si la key está configurada
    var fhKeyFS=localStorage.getItem("td-finnhub-key");
    if(fhKeyFS){
      try{
        var rfh2=await fetch("https://finnhub.io/api/v1/quote?symbol="+base+"&token="+fhKeyFS);
        if(rfh2.ok){var dfh2=await rfh2.json();if(dfh2.c&&dfh2.c>0)return{price:dfh2.c.toFixed(2),name:base+" (Finnhub)",source:"finnhub"};}
      }catch(e){}
    }
    // 1. Stooq — CSV con sufijo .us para bolsa americana
    const stooqSuffixes=[".us",""];
    for(var s=0;s<stooqSuffixes.length;s++){
      try{
        var url="https://stooq.com/q/l/?s="+base.toLowerCase()+stooqSuffixes[s]+"&f=sd2t2ohlcvn&e=csv";
        var r=await fetch(url,{signal:AbortSignal.timeout?AbortSignal.timeout(5000):undefined});
        if(!r.ok)continue;
        var text=await r.text();
        var lines=text.trim().split("\n");
        if(lines.length<2)continue;
        var fields=lines[1].split(",");
        var close=parseFloat(fields[6]);
        if(!isNaN(close)&&close>0)return{price:close.toFixed(2),name:base+" (Stooq)",source:"stooq"};
      }catch(e){}
    }
    // 2. Yahoo Finance directo
    var yahooUrls=[
      "https://query1.finance.yahoo.com/v8/finance/chart/"+base+"?interval=1d&range=1d",
      "https://query2.finance.yahoo.com/v8/finance/chart/"+base+"?interval=1d&range=1d",
    ];
    for(var y=0;y<yahooUrls.length;y++){
      try{
        var ry=await fetch(yahooUrls[y],{credentials:"omit"});
        if(!ry.ok)continue;
        var dy=await ry.json();
        var meta=dy.chart&&dy.chart.result&&dy.chart.result[0]&&dy.chart.result[0].meta;
        if(meta&&meta.regularMarketPrice)
          return{price:meta.regularMarketPrice.toFixed(2),name:(meta.shortName||base)+" (Yahoo)",source:"yahoo"};
      }catch(e){}
    }
    // 3. allorigins proxy — evita bloqueos CORS de Yahoo
    try{
      var proxyUrl="https://api.allorigins.win/get?url="+encodeURIComponent("https://query1.finance.yahoo.com/v8/finance/chart/"+base+"?interval=1d&range=1d");
      var rp=await fetch(proxyUrl);
      if(rp.ok){
        var dp=await rp.json();
        var inner=typeof dp.contents==="string"?JSON.parse(dp.contents):dp.contents;
        var pmeta=inner&&inner.chart&&inner.chart.result&&inner.chart.result[0]&&inner.chart.result[0].meta;
        if(pmeta&&pmeta.regularMarketPrice)
          return{price:pmeta.regularMarketPrice.toFixed(2),name:(pmeta.shortName||base)+" (proxy)",source:"proxy"};
      }
    }catch(e){}
    // 4. corsproxy.io — segundo proxy como respaldo
    try{
      var cp2Url="https://corsproxy.io/?url="+encodeURIComponent("https://query1.finance.yahoo.com/v8/finance/chart/"+base+"?interval=1d&range=1d");
      var rcp2=await fetch(cp2Url);
      if(rcp2.ok){
        var dcp2=await rcp2.json();
        var pmeta2=dcp2.chart&&dcp2.chart.result&&dcp2.chart.result[0]&&dcp2.chart.result[0].meta;
        if(pmeta2&&pmeta2.regularMarketPrice)
          return{price:pmeta2.regularMarketPrice.toFixed(2),name:(pmeta2.shortName||base)+" (Yahoo)",source:"yahoo"};
      }
    }catch(e){}
    return null;
  }

  async function checkLivePrice(){
    if(!f.asset)return;
    const raw=f.asset.trim();
    const base=raw.replace(/\/.*$/,"").replace(/[^A-Za-z0-9]/g,"").toUpperCase().slice(0,10);
    if(!base){setLiveCheck("error");return;}
    setLiveCheck("loading");
    setF(function(prev){return{...prev,asset:base};});
    // Helper: aplica precio encontrado, guarda en mapa global y auto-rellena entrada si está vacía
    function applyFoundPrice(ticker,priceStr,name){
      var p=parseFloat(priceStr);
      if(SPr&&pr)SPr({...pr,[ticker]:p});
      setLiveCheck({ticker:ticker,price:priceStr,name:name});
      setF(function(prev){return{...prev,entry:prev.entry?prev.entry:priceStr};});
    }
    // 1. Binance para crypto conocida
    if(CRYPTO_BINANCE[base]){
      try{
        const r=await fetch("https://api.binance.com/api/v3/ticker/price?symbol="+CRYPTO_BINANCE[base]);
        if(r.ok){const d=await r.json();if(d.price){applyFoundPrice(base,parseFloat(d.price).toFixed(2),base+" (Binance)");return;}}
      }catch(e){}
    }
    // 2. Binance con USDT dinamico (otras cryptos — BCH, DOGE, etc.)
    try{
      const r=await fetch("https://api.binance.com/api/v3/ticker/price?symbol="+base+"USDT");
      if(r.ok){const d=await r.json();if(d.price){applyFoundPrice(base,parseFloat(d.price).toFixed(2),base+" (Binance)");return;}}
    }catch(e){}
    // 3. Stooq + Yahoo + proxy CORS para acciones y ETFs
    const result=await fetchStockPrice(base);
    if(result){
      const p=parseFloat(result.price);
      if(SPr&&pr)SPr({...pr,[base]:p});
      applyFoundPrice(base,result.price,result.name);
      return;
    }
    // 4. Proxy CORS allorigins.win como último recurso
    try{
      var proxyUrl="https://api.allorigins.win/get?url="+encodeURIComponent("https://query1.finance.yahoo.com/v8/finance/chart/"+base+"?interval=1d&range=1d");
      var rp=await fetch(proxyUrl);
      if(rp.ok){
        var dp=await rp.json();
        var inner=typeof dp.contents==="string"?JSON.parse(dp.contents):dp.contents;
        var meta=inner&&inner.chart&&inner.chart.result&&inner.chart.result[0]&&inner.chart.result[0].meta;
        if(meta&&meta.regularMarketPrice){
          var p2=parseFloat(meta.regularMarketPrice.toFixed(2));
          if(SPr&&pr)SPr({...pr,[base]:p2});
          applyFoundPrice(base,p2.toFixed(2),(meta.shortName||base)+" (Yahoo)");
          return;
        }
      }
    }catch(e){}
    setLiveCheck("error");
  }
  function doSavePosForm(){
    try{
      if(!f.asset){setFormError("Falta: ticker del activo (BTC, AAPL...)");return;}
      if(!f.entry){setFormError("Falta: precio de entrada");return;}
      if(!f.capital){setFormError("Falta: capital de la operacion");return;}
      setFormError("");
      var tpLvls=(f.tpLevels||[]).filter(function(l){return l.price&&l.pct;}).map(function(l){return{id:l.id,price:+l.price,pct:+l.pct,hit:l.hit||false};});
      var posId=editId||Date.now();
      var reflText=preReflection?preReflection.trim():"";
      var finalStatus=f.status||"open";
      var slInitVal=f.sl_initial!=null&&f.sl_initial!==""?(+f.sl_initial):(+f.sl);
      var slMods=f.sl_modifications||[];
      if(editId){
        var prevPos=(currentPos||[]).filter(function(x){return x.id===editId;})[0];
        var prevSl=prevPos&&prevPos.sl?+prevPos.sl:null;
        if(prevSl!=null&&+f.sl!==prevSl){
          slMods=slMods.concat([{timestamp:new Date().toISOString(),precio_anterior:prevSl,precio_nuevo:+f.sl}]);
        }
      }
      var obj=Object.assign({},f,{id:posId,capital:+f.capital,entry:+f.entry,sl:+f.sl,tp:+f.tp,tpLevels:tpLvls,capitalRemaining:+f.capital,be:false,preReflection:reflText,status:finalStatus,sl_initial:slInitVal,sl_modifications:slMods,thesis_text:f.thesis_text||"",thesis_screenshot_url:f.thesis_screenshot_url||"",broker:f.broker||"quantfury"});
      var nv=editId?currentPos.map(function(x){return x.id===editId?obj:x;}):currentPos.concat([obj]);
      SPos(nv);
      if(reflText&&SJ&&!editId){
        var jnlEntry={id:Date.now()+1,type:"analysis",
          text:"[Pre-trade "+f.asset+"] "+reflText.slice(0,600),
          date:new Date().toLocaleDateString("es-ES"),
          preTradeReflection:true,linkedPos:posId};
        SJ([jnlEntry].concat(jnl||[]));
      }
      setModal(function(m){return Object.assign({},m,{pos:false,posForm:null,editPosId:null});});
    }catch(err){
      setFormError("Error: "+(err&&err.message?err.message:"desconocido. Revisa los campos e inténtalo de nuevo."));
    }
  }
  const e2=+f.entry,sl=+f.sl,tp2=+f.tp,cap=+f.capital;
  const hasCalc=f.entry&&f.sl&&f.tp&&f.capital;
  const isShort=f.dir==="Short";
  // Direction-aware validation: for SHORT, SL must be above entry and TP below; for LONG, reversed
  const slValid=(!f.sl||!f.entry)||(isShort?(sl>e2):(sl<e2))&&(sl!==e2);
  const tpValid=(!f.tp||!f.entry)||(isShort?(tp2<e2):(tp2>e2));
  const hasTpLvls=(f.tpLevels&&f.tpLevels.length>0&&f.tpLevels.some(function(l){return l.price&&(l.pct||l.capInput);}));
  const hasCalcFull=f.entry&&f.sl&&f.capital&&(f.tp||hasTpLvls);
  const risk=hasCalcFull?cap*Math.abs(e2-sl)/e2:0;
  // Ganancia: si hay niveles parciales, sumar cada nivel por separado
  var reward=0;var rewardValid=false;
  if(hasTpLvls&&cap>0&&e2>0){
    var lvlSum=(f.tpLevels||[]).reduce(function(sum,lvl){
      var lvlCap=parseFloat(lvl.capInput)||0;
      if(!lvlCap){var pN=parseFloat(lvl.pct)||0;lvlCap=pN>0?cap*pN/100:0;}
      var lvlP=parseFloat(lvl.price)||0;
      if(!lvlP||!lvlCap)return sum;
      if(isShort&&lvlP>=e2)return sum;
      if(!isShort&&lvlP<=e2)return sum;
      return sum+lvlCap*Math.abs(lvlP-e2)/e2;
    },0);
    reward=lvlSum;rewardValid=lvlSum>0;
  }else if(hasCalcFull&&tpValid){
    reward=cap*Math.abs(tp2-e2)/e2;rewardValid=true;
  }
  const ratio=risk>0&&rewardValid?reward/risk:0;
  return(
    <div style={S.modal}><div style={{...S.mc,display:"flex",flexDirection:"column",padding:0,maxHeight:"92vh"}}>
      <div style={{padding:"12px 20px 10px",borderBottom:"1px solid #1e1e2e",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
          <div style={{fontSize:12,color:"#f0b429",fontWeight:700}}>{editId?"EDITAR OPERACION":"NUEVA OPERACION"}</div>
          <div style={{display:"flex",gap:6}}>
            <button onClick={doSavePosForm} style={{...S.btn(true),padding:"6px 16px",fontSize:10}}>{editId?"GUARDAR":"ANADIR"}</button>
            <button onClick={function(){setModal(function(m){return{...m,pos:false,posForm:null,editPosId:null};});}} style={{...S.btn(false),padding:"6px 12px",fontSize:10}}>✕</button>
          </div>
        </div>
        {formError&&<div style={{marginTop:6,padding:"5px 8px",background:"rgba(255,68,68,.1)",border:"1px solid rgba(255,68,68,.35)",borderRadius:4,color:"#ff6666",fontSize:9}}>{formError}</div>}
      </div>
      <div style={{flex:1,overflowY:"auto",padding:20,paddingBottom:20,minHeight:0}}>
      <div style={{marginBottom:9}}>
        <div style={S.lbl}>ACTIVO</div>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          <input style={{...S.inp,flex:1}} placeholder="Ticker: TLT · AAPL · BTC · SOL..." value={f.asset} onChange={function(e){setF({...f,asset:e.target.value.toUpperCase()});setLiveCheck(null);}}/>
          <button onClick={checkLivePrice} disabled={!f.asset||liveCheck==="loading"}
            style={{background:"rgba(0,255,136,.1)",border:"1px solid rgba(0,255,136,.3)",color:"#00ff88",padding:"6px 10px",borderRadius:5,fontSize:9,cursor:"pointer",whiteSpace:"nowrap"}}>
            {liveCheck==="loading"?"⏳":"⚡ Check"}</button>
        </div>
        <div style={{fontSize:8,color:"#444",marginTop:3}}>Escribe el ticker del activo (TLT, AAPL, MSFT…), no el nombre completo</div>
        {liveCheck&&liveCheck!=="loading"&&liveCheck!=="error"&&(
          <div style={{marginTop:5,padding:"6px 8px",background:"rgba(0,255,136,.08)",border:"1px solid rgba(0,255,136,.3)",borderRadius:4,fontSize:9,color:"#00ff88"}}>
            <div>✓ <strong>{liveCheck.name}</strong></div>
            <div style={{marginTop:2}}>Ticker: <strong>{liveCheck.ticker}</strong> · Precio actual: <strong>${liveCheck.price}</strong></div>
          </div>
        )}
        {liveCheck==="error"&&(
          <div style={{marginTop:5,padding:"8px",background:"rgba(255,136,68,.08)",border:"1px solid rgba(255,136,68,.3)",borderRadius:4,fontSize:9}}>
            <div style={{color:"#ff8844",marginBottom:6}}>⚠ No se pudo obtener precio automáticamente.</div>
            <div style={{color:"#888",marginBottom:6}}>Introduce el precio actual manualmente para calcular el P&L:</div>
            <div style={{display:"flex",gap:6}}>
              <input type="number" id="manualPriceInput" placeholder="ej: 88.45"
                style={{...S.inp,flex:1,fontSize:10,padding:"5px 8px"}}/>
              <button onClick={function(){
                var val=parseFloat(document.getElementById("manualPriceInput").value);
                if(isNaN(val)||val<=0)return;
                var base=f.asset.replace(/\/.*$/,"").replace(/[^A-Za-z0-9]/g,"").toUpperCase().slice(0,10)||f.asset;
                if(SPr&&pr)SPr({...pr,[base]:val}); // guardar en mapa global
                setLiveCheck({ticker:base,price:val.toFixed(2),name:base+" (Manual)"});
                setF(function(prev){return{...prev,entry:prev.entry?prev.entry:val.toFixed(2)};});
              }} style={{background:"rgba(255,136,68,.2)",border:"1px solid #ff8844",color:"#ff8844",padding:"5px 10px",borderRadius:4,fontSize:9,cursor:"pointer",fontWeight:700}}>Usar</button>
            </div>
            <div style={{marginTop:5,color:"#555",fontSize:8}}>Tickers válidos: TLT · AAPL · MSFT · SPY · NVDA · cualquier símbolo de bolsa</div>
          </div>
        )}
      </div>
      <div style={{marginBottom:9}}>
        <div style={S.lbl}>ESTADO</div>
        <div style={{display:"flex",gap:7}}>
          {[{v:"open",l:"Abrir ahora",c:"#00ff88"},{v:"pending",l:"En espera",c:"#f0b429"}].map(function(opt){
            var sel=(f.status||"open")===opt.v;
            return <button key={opt.v} onClick={function(){setF({...f,status:opt.v});}}
              style={{flex:1,padding:"7px",borderRadius:4,fontSize:9,fontWeight:700,
                border:"1px solid "+(sel?opt.c:"#333"),
                background:sel?"rgba("+( opt.v==="open"?"0,255,136":"240,180,41")+", .12)":"transparent",
                color:sel?opt.c:"#555",cursor:"pointer"}}>{opt.l}</button>;
          })}
        </div>
        {(f.status||"open")==="pending"&&<div style={{fontSize:8,color:"#555",marginTop:3}}>No contabilizada hasta que la actives manualmente.</div>}
      </div>
      <div style={{marginBottom:9}}>
        <div style={S.lbl}>DIRECCION</div>
        <div style={{display:"flex",gap:7}}>
          {["Short","Long"].map(d=>(
            <button key={d} onClick={()=>setF({...f,dir:d})} style={{flex:1,padding:"7px",borderRadius:4,fontSize:10,fontWeight:700,border:"1px solid "+(d==="Short"?"#ff4444":"#00ff88"),background:f.dir===d?(d==="Short"?"rgba(255,68,68,.15)":"rgba(0,255,136,.15)"):"transparent",color:d==="Short"?"#ff4444":"#00ff88",cursor:"pointer"}}>{d.toUpperCase()}</button>
          ))}
        </div>
      </div>
      <div style={{marginBottom:9}}>
        <div style={S.lbl}>PATRÓN CHARTISTA</div>
        <select value={f.patternId||""} onChange={function(e){setF({...f,patternId:e.target.value});}}
          style={{...S.inp,width:"100%",cursor:"pointer"}}>
          <option value="">— Ninguno / Tesis propia —</option>
          {(pats||[]).map(function(p){
            var rate=p.obs>0?Math.round(p.conf/p.obs*100):0;
            return <option key={p.id} value={p.id}>{p.name}{p.obs>0?" ("+rate+"% · "+p.obs+" tests)":""}</option>;
          })}
        </select>
        {f.patternId&&(function(){
          var pat=(pats||[]).find(function(p){return String(p.id)===String(f.patternId);});
          if(!pat)return null;
          return <div style={{fontSize:8,color:"#f0b429",marginTop:3}}>📊 {pat.name} — {pat.obs} observaciones, {pat.obs>0?Math.round(pat.conf/pat.obs*100):0}% confirmado</div>;
        })()}
      </div>
      {[["CAPITAL ($)","capital","2000"],["PRECIO ENTRADA","entry","70800"],["PRECIO STOP LOSS","sl","71775"],["PRECIO TAKE PROFIT","tp","44000"]].map(function(row){var l=row[0],k=row[1],ph=row[2];return(
        <div key={k} style={{marginBottom:9}}>
          <div style={S.lbl}>{l}</div>
          <input style={S.inp} type="number" placeholder={ph} value={f[k]||""} onChange={function(e){
            var val=e.target.value;
            if(k==="capital"){
              // Al cambiar capital: recalcular capInput de todos los niveles
              var newCap=parseFloat(val)||0;
              setF(function(prev){
                var newLevels=(prev.tpLevels||[]).map(function(lv){
                  var pctN=parseFloat(lv.pct)||0;
                  return{...lv,capInput:pctN>0&&newCap>0?(newCap*pctN/100).toFixed(2):(lv.capInput||"")};
                });
                return{...prev,capital:val,tpLevels:newLevels};
              });
            }else{
              setF(function(prev){return{...prev,[k]:val};});
            }
          }}/>
        </div>
      ))}
      {/* Ventas parciales */}
      <div style={{marginBottom:9}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
          <div style={S.lbl}>VENTAS PARCIALES</div>
          <button type="button" onClick={addTpLevel} style={{background:"rgba(0,255,136,.1)",border:"1px solid rgba(0,255,136,.3)",color:"#00ff88",padding:"3px 8px",borderRadius:4,fontSize:9,cursor:"pointer"}}>+ Añadir nivel</button>
        </div>
        {(f.tpLevels||[]).length===0&&(
          <div style={{fontSize:8,color:"#333",padding:"4px 0"}}>Sin ventas parciales — el TP único cierra toda la posición.</div>
        )}
        {(f.tpLevels||[]).map(function(lvl,i){
          var totalPct=(f.tpLevels||[]).reduce(function(a,l){return a+(+l.pct||0);},0);
          var pctOver=totalPct>100;
          return(
            <div key={lvl.id} style={{marginBottom:8,padding:"8px",background:"rgba(0,255,136,.03)",border:"1px solid #1e1e2e",borderRadius:4}}>
              <div style={{fontSize:8,color:"#555",marginBottom:5}}>NIVEL {i+1} ({isShort?"↓ por debajo entrada":"↑ por encima entrada"})</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr auto",gap:5,alignItems:"end"}}>
                <div>
                  <div style={{fontSize:7,color:"#444",marginBottom:2}}>PRECIO TP</div>
                  <input type="number" value={lvl.price||""} onChange={function(e){updateTpLevel(lvl.id,"price",e.target.value);}}
                    style={{...S.inp,padding:"5px 8px",fontSize:10}} placeholder={isShort?"69000":"72000"}/>
                </div>
                <div>
                  <div style={{fontSize:7,color:pctOver?"#ff4444":"#444",marginBottom:2}}>% POSICIÓN</div>
                  <input type="number" min="1" max="100" value={lvl.pct||""} onChange={function(e){updateTpLevel(lvl.id,"pct",e.target.value);}}
                    style={{...S.inp,padding:"5px 8px",fontSize:10,color:pctOver?"#ff4444":"#e0e0e0"}} placeholder="50"/>
                </div>
                <div>
                  <div style={{fontSize:7,color:"#444",marginBottom:2}}>CAPITAL ($)</div>
                  <input type="number" value={lvl.capInput||""} onChange={function(e){updateTpLevel(lvl.id,"capInput",e.target.value);}}
                    style={{...S.inp,padding:"5px 8px",fontSize:10}} placeholder="1000"/>
                </div>
                <button type="button" onClick={function(){removeTpLevel(lvl.id);}} style={{background:"transparent",border:"1px solid #333",color:"#555",padding:"7px 8px",borderRadius:4,fontSize:11,cursor:"pointer",lineHeight:1,alignSelf:"flex-end"}}>×</button>
              </div>
              <div style={{fontSize:7,color:"#444",marginTop:3}}>Introduce % o capital — el otro se calcula automáticamente</div>
            </div>
          );
        })}
        {(f.tpLevels||[]).length>0&&(function(){
          var tot=(f.tpLevels||[]).reduce(function(a,l){return a+(+l.pct||0);},0);
          return <div style={{fontSize:8,color:tot>100?"#ff4444":tot===100?"#00ff88":"#f0b429",textAlign:"right",marginTop:2}}>Total: {tot}%{tot>100?" ⚠ supera 100%":tot===100?" ✓":""}</div>;
        })()}
      </div>
      {hasCalcFull&&(
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
          <div style={{background:slValid?"rgba(255,68,68,.06)":"rgba(255,136,68,.1)",border:slValid?"none":"1px solid rgba(255,136,68,.4)",borderRadius:4,padding:"8px 10px"}}>
            <div style={{fontSize:8,color:slValid?"#555":"#ff8844",marginBottom:2}}>
              SL - PÉRDIDA MÁXIMA
              {!slValid&&<span> ⚠ {isShort?"debe ser MAYOR que entrada":"debe ser MENOR que entrada"}</span>}
            </div>
            {risk===0
              ? <div style={{fontSize:10,fontWeight:700,color:"#00ff88"}}>RIESGO CERO<br/><span style={{fontSize:8,color:"#555",fontWeight:400}}>SL en precio de entrada</span></div>
              : <div style={{fontSize:11,fontWeight:700,color:"#ff4444"}}>{fmtNum(-risk)}</div>
            }
          </div>
          <div style={{background:rewardValid?"rgba(0,255,136,.06)":"rgba(255,136,68,.1)",border:rewardValid?"none":"1px solid rgba(255,136,68,.4)",borderRadius:4,padding:"8px 10px"}}>
            <div style={{fontSize:8,color:rewardValid?"#555":"#ff8844",marginBottom:2}}>
              TP - GANANCIA MÁXIMA
              {hasTpLvls&&<span style={{color:"#444"}}> (parciales)</span>}
              {!rewardValid&&!hasTpLvls&&<span> ⚠ {isShort?"debe ser MENOR que entrada":"debe ser MAYOR que entrada"}</span>}
            </div>
            {rewardValid
              ? <div style={{fontSize:11,fontWeight:700,color:"#00ff88"}}>{fmtNum(reward)}</div>
              : <div style={{fontSize:10,fontWeight:700,color:"#ff8844"}}>—</div>
            }
          </div>
          {risk>0&&rewardValid&&(
            <div style={{gridColumn:"1/-1",textAlign:"center",fontSize:10,color:ratio>=3?"#00ff88":ratio>=2?"#f0b429":"#ff4444",fontWeight:700}}>
              {"Ratio R:B 1:"+ratio.toFixed(1)+" "+(ratio>=3?"Sólido":ratio>=2?"Aceptable":"Insuficiente")}
            </div>
          )}
          {risk===0&&reward>0&&(
            <div style={{gridColumn:"1/-1",textAlign:"center",fontSize:10,color:"#00ff88",fontWeight:700}}>
              Posición protegida — ganancia potencial {fmtNum(reward)}
            </div>
          )}
        </div>
      )}
      {/* ── Audit fields ── */}
      <div style={{marginBottom:9}}>
        <div style={S.lbl}>TESIS TÉCNICA <span style={{color:"#ff4444"}}>*</span></div>
        <textarea value={f.thesis_text||""} onChange={function(e){setF(function(prev){return{...prev,thesis_text:e.target.value};});}}
          placeholder="FVG alcista en 4H + canal bajista roto al alza. RSI divergencia bullish en 1H. SL bajo mínimo del canal..."
          style={{...S.inp,width:"100%",minHeight:60,padding:"8px",fontSize:9,lineHeight:1.6,resize:"vertical",boxSizing:"border-box",color:"#e0e0e0"}}/>
        {(f.thesis_text||"").trim().length<20&&(f.thesis_text||"").trim().length>0&&(
          <div style={{fontSize:7,color:"#ff4444",marginTop:2}}>Mínimo 20 caracteres para auditoría</div>
        )}
      </div>
      <div style={{marginBottom:9}}>
        <div style={S.lbl}>SL INICIAL (inmutable — se registra al abrir) <span style={{color:"#ff4444"}}>*</span></div>
        <input style={S.inp} type="number" placeholder={f.sl||"Igual que SL arriba"} value={f.sl_initial!=null?f.sl_initial:""} onChange={function(e){setF(function(prev){return{...prev,sl_initial:e.target.value};});}}/>
        <div style={{fontSize:7,color:"#444",marginTop:2}}>Sirve como baseline para R1. Si no rellenas, se usa el SL indicado.</div>
      </div>
      <div style={{marginBottom:9}}>
        <div style={S.lbl}>BROKER</div>
        <select value={f.broker||"quantfury"} onChange={function(e){setF(function(prev){return{...prev,broker:e.target.value};});}} style={{...S.inp,cursor:"pointer"}}>
          <option value="quantfury">Quantfury</option>
          <option value="margex">Margex</option>
          <option value="otro">Otro</option>
        </select>
      </div>
      <div style={{marginBottom:9}}>
        <div style={S.lbl}>CAPTURA DE PANTALLA (URL opcional)</div>
        <input style={S.inp} type="url" placeholder="https://..." value={f.thesis_screenshot_url||""} onChange={function(e){setF(function(prev){return{...prev,thesis_screenshot_url:e.target.value};});}}/>
      </div>
      {!editId&&(
        <div style={{marginBottom:12}}>
          <div style={{fontSize:8,color:"#888",marginBottom:4,letterSpacing:1}}>REFLEXION PREVIA AL TRADE <span style={{color:"#555"}}>(opcional)</span></div>
          <textarea value={preReflection} onChange={function(e){setPreReflection(e.target.value);}}
            placeholder="Que te dice el mercado? Como te sientes respecto a esta operacion? Por que crees que funcionara esta tesis?..."
            style={{...S.inp,width:"100%",minHeight:72,padding:"8px",fontSize:9,lineHeight:1.6,resize:"vertical",boxSizing:"border-box",color:"#e0e0e0"}}/>
          {preReflection.trim()&&(
            <div style={{fontSize:7,color:"#555",marginTop:3}}>Se guardara en el diario vinculado a esta operacion</div>
          )}
        </div>
      )}
      </div>
      <div style={{padding:"8px 20px 16px",borderTop:"1px solid #1e1e2e",background:"#111118",borderRadius:"0 0 12px 12px",flexShrink:0}}>
      </div>
    </div></div>
  );
}

function PhotoBtn({patId,hasPhoto,onFile}){
  // Usar label visible con input visible pero muy pequeno - funciona en todos los moviles
  const uid="photo-"+patId;
  return(
    <span style={{position:"relative",display:"inline-block"}}>
      <label
        htmlFor={uid}
        style={{
          display:"inline-block",
          background:"rgba(136,136,136,.12)",
          border:"1px solid #666",
          color:"#aaa",
          padding:"5px 12px",
          borderRadius:5,
          fontSize:9,
          cursor:"pointer",
          userSelect:"none"
        }}
      >
        {hasPhoto?"📷 Cambiar foto":"📷 Subir foto"}
      </label>
      <input
        id={uid}
        type="file"
        accept="image/*"
        capture="environment"
        style={{
          position:"absolute",
          left:0,top:0,
          width:"100%",height:"100%",
          opacity:0,
          cursor:"pointer"
        }}
        onChange={e=>{
          if(e.target.files&&e.target.files[0]){
            onFile(patId,e.target.files[0]);
            e.target.value="";
          }
        }}
      />
    </span>
  );
}

function calcSRLevels(highs,lows,price){
  var range=5;
  var supports=[],resistances=[];
  for(var i=range;i<highs.length-range;i++){
    var isR=true,iS=true;
    for(var j=i-range;j<=i+range;j++){
      if(j===i)continue;
      if(highs[j]>=highs[i])isR=false;
      if(lows[j]<=lows[i])iS=false;
    }
    if(isR)resistances.push(parseFloat(highs[i].toFixed(4)));
    if(iS)supports.push(parseFloat(lows[i].toFixed(4)));
  }
  return{
    supports:supports.filter(function(s){return s<price;}).sort(function(a,b){return b-a;}).slice(0,3),
    resistances:resistances.filter(function(r){return r>price;}).sort(function(a,b){return a-b;}).slice(0,3)
  };
}

// --- Channel & FVG pattern detection (for real-time alerts) ---

function detectRSIDivergence(ohlcArr,rsiArr){
  if(!ohlcArr||!rsiArr||ohlcArr.length<12||rsiArr.length<12)return null;
  var n=Math.min(ohlcArr.length,rsiArr.length,40);
  var highs=ohlcArr.slice(-n).map(function(c){return c.h;});
  var lows=ohlcArr.slice(-n).map(function(c){return c.l;});
  var rsis=rsiArr.slice(-n);
  function pivots(arr,type){
    var out=[];
    for(var i=3;i<arr.length-3;i++){
      var ok=true;
      for(var j=i-3;j<=i+3;j++){
        if(j===i)continue;
        if(type==="high"&&arr[j]>=arr[i]){ok=false;break;}
        if(type==="low"&&arr[j]<=arr[i]){ok=false;break;}
      }
      if(ok)out.push({i:i,v:arr[i]});
    }
    return out;
  }
  var ph=pivots(highs,"high");
  var pl=pivots(lows,"low");
  // ── DIVERGENCIAS (precio e indicador en dirección opuesta → posible giro) ──
  // Divergencia bajista: precio HH + RSI LH → agotamiento alcista
  if(ph.length>=2){
    var h1=ph[ph.length-2],h2=ph[ph.length-1];
    var rh1=rsis[h1.i],rh2=rsis[h2.i];
    if(h2.v>h1.v&&rh2<rh1&&(rh1-rh2)>3&&rh1<82&&rh2>45)
      return{type:"bearish",kind:"divergence"};
  }
  // Divergencia alcista: precio LL + RSI HL → agotamiento bajista
  if(pl.length>=2){
    var l1=pl[pl.length-2],l2=pl[pl.length-1];
    var rl1=rsis[l1.i],rl2=rsis[l2.i];
    if(l2.v<l1.v&&rl2>rl1&&(rl2-rl1)>3&&rl1>18&&rl2<55)
      return{type:"bullish",kind:"divergence"};
  }
  // ── CONVERGENCIAS (precio e indicador en la misma dirección → confirma tendencia) ──
  // Convergencia bajista: precio LH + RSI LH → confirma bajista
  if(ph.length>=2){
    var ch1=ph[ph.length-2],ch2=ph[ph.length-1];
    var crh1=rsis[ch1.i],crh2=rsis[ch2.i];
    if(ch2.v<ch1.v&&crh2<crh1&&(crh1-crh2)>4&&crh1>45&&crh2<68)
      return{type:"bearish",kind:"convergence"};
  }
  // Convergencia alcista: precio HL + RSI HL → confirma alcista
  if(pl.length>=2){
    var cl1=pl[pl.length-2],cl2=pl[pl.length-1];
    var crl1=rsis[cl1.i],crl2=rsis[cl2.i];
    if(cl2.v>cl1.v&&crl2>crl1&&(crl2-crl1)>4&&crl1>32&&crl2<65)
      return{type:"bullish",kind:"convergence"};
  }
  // ── DIVERGENCIAS OCULTAS (corrección contra tendencia principal — confirma continuación) ──
  // Oculta bajista: precio LH (corrección) + RSI HH → tendencia bajista intacta
  if(ph.length>=2){
    var oh1=ph[ph.length-2],oh2=ph[ph.length-1];
    var orh1=rsis[oh1.i],orh2=rsis[oh2.i];
    if(oh2.v<oh1.v&&orh2>orh1&&(orh2-orh1)>3&&orh1<80&&orh2>20)
      return{type:"bearish",kind:"hidden_divergence"};
  }
  // Oculta alcista: precio HL (corrección) + RSI LL → tendencia alcista intacta
  if(pl.length>=2){
    var ol1=pl[pl.length-2],ol2=pl[pl.length-1];
    var orl1=rsis[ol1.i],orl2=rsis[ol2.i];
    if(ol2.v>ol1.v&&orl2<orl1&&(orl1-orl2)>3&&orl1>20&&orl2<80)
      return{type:"bullish",kind:"hidden_divergence"};
  }
  return null;
}

function detectPivots(highs,lows,win){
  win=win||3;
  var pH=[],pL=[];
  for(var i=win;i<highs.length-win;i++){
    var isH=true,isL=true;
    for(var j=1;j<=win;j++){
      if(highs[i]<=highs[i-j]||highs[i]<=highs[i+j])isH=false;
      if(lows[i]>=lows[i-j]||lows[i]>=lows[i+j])isL=false;
    }
    if(isH)pH.push({x:i,y:highs[i]});
    if(isL)pL.push({x:i,y:lows[i]});
  }
  return{pH:pH,pL:pL};
}

function linReg(pts){
  var n=pts.length;
  if(n<2)return null;
  var sx=0,sy=0,sxy=0,sx2=0;
  for(var i=0;i<n;i++){sx+=pts[i].x;sy+=pts[i].y;sxy+=pts[i].x*pts[i].y;sx2+=pts[i].x*pts[i].x;}
  var denom=n*sx2-sx*sx;
  if(denom===0)return null;
  var m=(n*sxy-sx*sy)/denom;
  var b=(sy-m*sx)/n;
  return{slope:m,intercept:b};
}


// ─── CANAL DETECTADO (descendente / ascendente) ───
// Retorna null o {canalType, topLine, botLine, channelHeight, slope, atr, quality, supportTouches, resistTouches, pos}
// Breakout logic is handled by the WS state machine — this function only detects the channel shape.
function detectChannelAlert(ohlc){
  if(!ohlc||ohlc.length<40)return null;
  var recent=ohlc.slice(-80);
  var n=recent.length-1;
  var highs=recent.map(function(c){return c.h;});
  var lows=recent.map(function(c){return c.l;});
  var price=recent[n].c;
  if(!price||price<=0)return null;

  // ATR (14-period Wilder)
  var atr=calcATR(recent,14);
  if(!atr||atr<=0)return null;

  // Pivot detection window=3 (stricter — requires 3 candles each side)
  var pivs=detectPivots(highs,lows,3);
  if(pivs.pH.length<2||pivs.pL.length<2)return null;

  var rH=linReg(pivs.pH);
  var rL=linReg(pivs.pL);
  if(!rH||!rL)return null;

  // Lines projected to current index
  var topLine=rH.slope*n+rH.intercept;
  var botLine=rL.slope*n+rL.intercept;
  var ch=topLine-botLine;
  if(ch<=0)return null;

  // ATR width check: channel must be at least 1.5× ATR wide to be meaningful
  if(ch<atr*1.5)return null;

  // Parallelism: same slope direction + ratio 0.20–5
  var sameSign=(rH.slope<0&&rL.slope<0)||(rH.slope>0&&rL.slope>0);
  if(!sameSign)return null;
  var sRatio=Math.abs(rH.slope)/(Math.abs(rL.slope)||0.0001);
  if(sRatio<0.20||sRatio>5)return null;

  // Age check: first pivot to last pivot must span >= 20 candles
  var allPivXs=[];
  pivs.pH.forEach(function(p){allPivXs.push(p.x);});
  pivs.pL.forEach(function(p){allPivXs.push(p.x);});
  var pivMin=Math.min.apply(null,allPivXs);
  var pivMax=Math.max.apply(null,allPivXs);
  if(pivMax-pivMin<20)return null;

  // Touch validation: pivot within 35% of channel height from its line
  var touchMargin=ch*0.35;
  var supportTouches=pivs.pL.filter(function(pt){
    var lineVal=rL.slope*pt.x+rL.intercept;
    return pt.y<=lineVal+touchMargin;
  }).length;
  var resistTouches=pivs.pH.filter(function(pt){
    var lineVal=rH.slope*pt.x+rH.intercept;
    return pt.y>=lineVal-touchMargin;
  }).length;
  // Min 2 per side, 5 total
  if(supportTouches<2||resistTouches<2||supportTouches+resistTouches<5)return null;

  // Quality score 0–100
  var qTouches=Math.min(40,Math.round((supportTouches+resistTouches-4)*8));
  var qParallel=Math.min(30,Math.round(30*(1-Math.abs(sRatio-1)/4)));
  var atrWidthRatio=ch/atr;
  var qWidth=Math.min(20,Math.round(20*Math.min(1,(atrWidthRatio-1.5)/3.5)));
  var ageSpan=pivMax-pivMin;
  var qAge=Math.min(10,Math.round(10*Math.min(1,(ageSpan-20)/60)));
  var quality=Math.max(0,qTouches+qParallel+qWidth+qAge);
  if(quality<50)return null;

  var isDescending=rH.slope<0;
  var canalType=isDescending?"bajista":"alcista";
  var pos=(price-botLine)/ch;

  return{
    canalType:canalType,
    topLine:topLine,botLine:botLine,channelHeight:ch,
    slope:rH.slope,atr:atr,quality:quality,
    supportTouches:supportTouches,resistTouches:resistTouches,
    pos:pos
  };
}

// Tamaño mínimo del imbalance por TF (% del precio) — filtro anti-ruido
var IMB_MIN_SIZE_PCT={"1h":0.003,"4h":0.006,"1d":0.012,"1w":0.025};
var IMB_ATR_MULT={"1h":0.5,"4h":0.7,"1d":1.0,"1w":1.2};

// Estado de mitigación: ¿el precio llenó el hueco desde que se formó?
// Devuelve "unmitigated" | "partial" | "mitigated"
function checkImbalanceMitigation(ohlc,formedIdx,bot,top,isBull){
  if(!ohlc||formedIdx==null||formedIdx>=ohlc.length-1)return "unmitigated";
  var touchedFar=false; // tocó el borde lejano → mitigado
  var touchedNear=false; // tocó el borde cercano → parcial
  for(var i=formedIdx+1;i<ohlc.length;i++){
    var c=ohlc[i];
    if(isBull){
      // borde lejano = bot (abajo del gap); cercano = top (arriba del gap)
      if(c.l<=bot)touchedFar=true;
      if(c.l<=top)touchedNear=true;
    }else{
      // borde lejano = top (arriba del gap); cercano = bot (abajo)
      if(c.h>=top)touchedFar=true;
      if(c.h>=bot)touchedNear=true;
    }
    if(touchedFar)return "mitigated";
  }
  return touchedNear?"partial":"unmitigated";
}

// Puntuación de calidad 0-100 — ver rubrica en CLAUDE.md (Fase 1 imbalances)
function calcImbalanceScore(opts){
  var score=0;
  var minSize=opts.minSizePct||0.003;
  var sizePct=opts.sizePct||0;
  if(sizePct>=minSize*1.5)score+=30;
  else if(sizePct>=minSize)score+=15;
  if(opts.formVolMult!=null&&opts.formVolMult>=1.8)score+=20;
  else if(opts.formVolMult!=null&&opts.formVolMult>=1.3)score+=10;
  if(opts.htfAligned===true)score+=20;
  if(opts.liquiditySwept===true)score+=15;
  if(opts.kind==="fvg"||opts.kind==="void")score+=10;
  else if(opts.kind==="vi"||opts.kind==="gap")score+=5;
  return Math.min(100,score);
}

// Opening Gap: hueco completo entre close[t-1] y open[t], sin solapamiento de mechas
// Raro en crypto 24/7 pero muy potente (alta probabilidad de rellenarse)
function detectOpeningGap(ohlc,price){
  if(!ohlc||ohlc.length<4)return null;
  var n=ohlc.length;
  var scanStart=Math.max(1,n-60);
  for(var i=scanStart;i<n-1;i++){
    var c0=ohlc[i-1],c1=ohlc[i];
    var age=n-1-i;
    if(age<2)continue;
    // Gap alcista: low[t] > high[t-1] (sin solapamiento de mechas)
    if(c1.l>c0.h&&price>=c0.h&&price<=c1.l){
      return{subtype:"alcista",kind:"gap",top:c1.l,bot:c0.h,age:age,formedIdx:i};
    }
    // Gap bajista: high[t] < low[t-1]
    if(c1.h<c0.l&&price<=c0.l&&price>=c1.h){
      return{subtype:"bajista",kind:"gap",top:c0.l,bot:c1.h,age:age,formedIdx:i};
    }
  }
  return null;
}

// Liquidity Void: secuencia de ≥5 velas mismo color con retrocesos <25% del cuerpo
// El "void" es la zona completa recorrida sin testear niveles intermedios
function detectLiquidityVoid(ohlc,price){
  if(!ohlc||ohlc.length<10)return null;
  var n=ohlc.length;
  var scanStart=Math.max(0,n-50);
  // Buscar secuencias hacia atrás
  for(var end=n-2;end>=scanStart+4;end--){
    // probar secuencias de 5..10 velas terminando en end
    for(var len=5;len<=Math.min(10,end-scanStart+1);len++){
      var startIdx=end-len+1;
      if(startIdx<1)break;
      var seq=ohlc.slice(startIdx,end+1);
      // todas mismo color
      var bullSeq=seq.every(function(c){return c.c>c.o;});
      var bearSeq=seq.every(function(c){return c.c<c.o;});
      if(!bullSeq&&!bearSeq)continue;
      // continuación: cada close más allá del anterior en la dirección
      var continuation=true;
      for(var si=1;si<seq.length;si++){
        if(bullSeq&&seq[si].c<=seq[si-1].c){continuation=false;break;}
        if(bearSeq&&seq[si].c>=seq[si-1].c){continuation=false;break;}
      }
      if(!continuation)continue;
      // Retrocesos < 25% del cuerpo
      var smallRetraces=true;
      for(var ri=0;ri<seq.length;ri++){
        var body=Math.abs(seq[ri].c-seq[ri].o);
        if(body<=0){smallRetraces=false;break;}
        var retrace=bullSeq?(seq[ri].c-seq[ri].l):(seq[ri].h-seq[ri].c);
        if(retrace/body>0.25){smallRetraces=false;break;}
      }
      if(!smallRetraces)continue;
      // Volumen promedio de la secuencia ≥ 1.3x MA20 previo
      var volAvg=seq.reduce(function(a,c){return a+(c.v||0);},0)/seq.length;
      var ma20Prev=startIdx>=20?ohlc.slice(startIdx-20,startIdx).reduce(function(a,c){return a+(c.v||0);},0)/20:0;
      if(ma20Prev>0&&volAvg/ma20Prev<1.3)continue;
      // Rango del void: low mínimo .. high máximo de la secuencia
      var voidLow=Math.min.apply(null,seq.map(function(c){return c.l;}));
      var voidHigh=Math.max.apply(null,seq.map(function(c){return c.h;}));
      // Zona operable: el precio actual debe estar DENTRO del void o aproximándose (<0.3%)
      var within=price>=voidLow&&price<=voidHigh;
      var near=Math.abs(price-(bullSeq?voidLow:voidHigh))/price<0.003;
      if(!within&&!near)continue;
      return{subtype:bullSeq?"alcista":"bajista",kind:"void",top:voidHigh,bot:voidLow,age:n-1-end,formedIdx:end,seqLen:seq.length};
    }
  }
  return null;
}

// Hierarchy resolver: busca imbalances alineados en TFs superiores cubriendo la zona del precio
// Devuelve array de TFs con imbalance activo de la MISMA dirección
function resolveImbalanceHierarchy(ohlcByTf,price,subtype,currentTf){
  var result=[];
  var htfOrder={"1h":["4h","1d","1w"],"4h":["1d","1w"],"1d":["1w"],"1w":[]};
  var htfList=htfOrder[currentTf]||[];
  var labels={"4h":"4H","1d":"1D","1w":"1W"};
  htfList.forEach(function(htf){
    var ohtf=ohlcByTf[htf];
    if(!ohtf||ohtf.length<10)return;
    var imb=checkFVGCovered(ohtf,price);
    if(!imb)imb=detectVolumeImbalance(ohtf,price);
    if(!imb)imb=detectOpeningGap(ohtf,price);
    if(!imb)imb=detectLiquidityVoid(ohtf,price);
    if(imb&&imb.subtype===subtype){
      var mit=checkImbalanceMitigation(ohtf,imb.formedIdx,imb.bot,imb.top,subtype==="alcista");
      if(mit!=="mitigated"){
        result.push({tf:labels[htf]||htf,kind:imb.kind,bot:imb.bot,top:imb.top,mitigation:mit});
      }
    }
  });
  return result;
}

// Detecta Volume Imbalances (cuerpos sin solapar entre velas consecutivas, mechas tocándose)
function detectVolumeImbalance(ohlc,price){
  if(!ohlc||ohlc.length<5)return null;
  var n=ohlc.length;
  var scanStart=Math.max(1,n-60);
  for(var i=scanStart;i<n-1;i++){
    var c0=ohlc[i-1],c1=ohlc[i];
    var age=n-1-i;
    if(age<2)continue;
    // VI alcista: open[t] > close[t-1] y mechas se tocan
    if(c1.o>c0.c&&c0.h>=c1.l){
      var botB=c0.c,topB=c1.o;
      if(topB>botB&&price>=botB&&price<=topB){
        return{subtype:"alcista",kind:"vi",top:topB,bot:botB,age:age,formedIdx:i};
      }
    }
    // VI bajista: open[t] < close[t-1] y mechas se tocan
    if(c1.o<c0.c&&c0.l<=c1.h){
      var topS=c0.c,botS=c1.o;
      if(topS>botS&&price<=topS&&price>=botS){
        return{subtype:"bajista",kind:"vi",top:topS,bot:botS,age:age,formedIdx:i};
      }
    }
  }
  return null;
}

function checkFVGCovered(ohlc,price){
  if(!ohlc||ohlc.length<10)return null;
  var n=ohlc.length;
  // Solo escanear las últimas 60 velas — FVGs muy antiguos no son relevantes visualmente
  var scanStart=Math.max(2,n-60);
  for(var i=scanStart;i<n-2;i++){
    var h0=ohlc[i-2].h,l0=ohlc[i-2].l;
    var h2=ohlc[i].h,l2=ohlc[i].l;
    var age=n-1-i;
    if(age<3)continue; // skip very recent, need some gap
    // Bullish FVG: low[i] > high[i-2] → gap above h0 up to l2
    if(l2>h0&&price>=h0&&price<=l2){
      return{subtype:"alcista",kind:"fvg",top:l2,bot:h0,age:age,formedIdx:i};
    }
    // Bearish FVG: high[i] < low[i-2] → gap below l0 down to h2
    if(h2<l0&&price<=l0&&price>=h2){
      return{subtype:"bajista",kind:"fvg",top:l0,bot:h2,age:age,formedIdx:i};
    }
  }
  return null;
}

function detectFVGs(klines,price){
  var fvgs=[];
  for(var i=2;i<klines.length;i++){
    var h0=parseFloat(klines[i-2][2]),l0=parseFloat(klines[i-2][3]);
    var h2=parseFloat(klines[i][2]),l2=parseFloat(klines[i][3]);
    var ageCandels=klines.length-i;
    if(l2>h0){
      var mid=(l2+h0)/2;
      if(Math.abs(mid-price)/price<0.05)
        fvgs.push({type:"alcista",top:l2.toFixed(4),bot:h0.toFixed(4),age:ageCandels});
    }
    if(h2<l0){
      var mid2=(h2+l0)/2;
      if(Math.abs(mid2-price)/price<0.05)
        fvgs.push({type:"bajista",top:l0.toFixed(4),bot:h2.toFixed(4),age:ageCandels});
    }
  }
  return fvgs.sort(function(a,b){return a.age-b.age;}).slice(0,4);
}

async function getBinanceData(selAsset,selTF,ASSETS,TFS){
  var klines=[],ticker={};
  try{
    var r1=await fetch("https://api.binance.com/api/v3/klines?symbol="+selAsset+"&interval="+selTF+"&limit=150");
    var r2=await fetch("https://api.binance.com/api/v3/ticker/24hr?symbol="+selAsset);
    klines=await r1.json();
    ticker=await r2.json();
  }catch(e){return null;}
  var closes=klines.map(function(k){return parseFloat(k[4]);});
  var highs=klines.map(function(k){return parseFloat(k[2]);});
  var lows=klines.map(function(k){return parseFloat(k[3]);});
  var volumes=klines.map(function(k){return parseFloat(k[5]);});
  var rsi=calcRSI(closes,14);
  var ema7=calcEMA(closes,7);
  var ema25=calcEMA(closes,25);
  var ema50=calcEMA(closes,50);
  var price=closes[closes.length-1];
  var last10h=highs.slice(-10);
  var last10l=lows.slice(-10);
  var maxPrevH=Math.max.apply(null,last10h.slice(0,-1));
  var minPrevL=Math.min.apply(null,last10l.slice(0,-5));
  var hh=last10h[last10h.length-1]>maxPrevH;
  var hl=last10l[last10l.length-1]>minPrevL;
  var lh=last10h[last10h.length-1]<maxPrevH;
  var ll=last10l[last10l.length-1]<minPrevL;
  var trend="lateral";
  if(hh&&hl)trend="alcista (HH+HL)";
  else if(lh&&ll)trend="bajista (LH+LL)";
  var avgVol=volumes.slice(-20).reduce(function(a,v){return a+v;},0)/20;
  var volRatio=(volumes[volumes.length-1]/avgVol).toFixed(1);
  var assetLabel=(ASSETS.find(function(a){return a.v===selAsset;})||{l:selAsset}).l;
  var tfLabel=(TFS.find(function(t){return t.v===selTF;})||{l:selTF}).l;
  var emaRel=ema7&&ema25?(ema7>ema25?"EMA7 sobre EMA25 (alcista)":"EMA7 bajo EMA25 (bajista)"):"--";
  var sr=calcSRLevels(highs,lows,price);
  var fvgs=detectFVGs(klines,price);
  var ohlcSeries=klines.map(function(k){return{o:parseFloat(k[1]),h:parseFloat(k[2]),l:parseFloat(k[3]),c:parseFloat(k[4]),v:parseFloat(k[5]||0)};});
  var rsiSeries=calcRSISeries(closes,14);
  var divResult=detectRSIDivergence(ohlcSeries,rsiSeries);
  return{asset:assetLabel,tf:tfLabel,price:price.toFixed(4),change24h:ticker.priceChangePercent,
    rsi:rsi,ema7:ema7?ema7.toFixed(4):null,ema25:ema25?ema25.toFixed(4):null,ema50:ema50?ema50.toFixed(4):null,
    emaRelation:emaRel,trend:trend,volRatio:volRatio,high24h:ticker.highPrice,low24h:ticker.lowPrice,
    supports:sr.supports,resistances:sr.resistances,fvgs:fvgs,divResult:divResult};
}
