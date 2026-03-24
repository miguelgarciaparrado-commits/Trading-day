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
const P0=[
  {id:4,asset:"SOL/USD",dir:"Short",capital:600,entry:85.77,sl:94.40,tp:34,be:false},
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
const PS0={slOk:14,slBroken:2,earlyClose:8,tpAuto:0,tpManual:2,revenge:1,manualClose:4};
// Precios eliminados - se actualizan manualmente en la app

// - HELPERS -
function fmtNum(v){
  const a=Math.abs(v);
  const s=a>=1000?a.toLocaleString("es-ES",{minimumFractionDigits:2,maximumFractionDigits:2}):a.toFixed(2);
  return (v>=0?"+":"-")+"$"+s;
}
function fmtP(v){return v>=1000?"$"+v.toLocaleString():"$"+v;}
function today(){return new Date().toLocaleDateString("es-ES");}
function calcScore(ps,pats,jnl){
  const t=ps.slOk+ps.slBroken;
  const s1=t>0?(ps.slOk/t)*30:0;
  const tot=(ps.tpAuto||0)+(ps.tpManual||0)+(ps.earlyClose||0);
  const s2=tot>0?((ps.tpAuto||0)+(ps.tpManual||0))/tot*20:0;
  const s3=Math.max(0,20-ps.revenge*5);
  const s4=Math.min(20,pats.filter(p=>p.conf>0).length*7);
  const w=jnl.filter(j=>j.type==="win").length;
  const l=jnl.filter(j=>j.type==="lesson").length;
  const mis=jnl.filter(j=>j.type==="mistake").length;
  const a=jnl.filter(j=>j.type==="analysis").length;
  const s5=Math.min(10,(w*2)+(l*1.5)+a+Math.min(mis,l)*0.5);
  const bon=Math.min(5,jnl.filter(j=>j.linkedClose).length*1.5);
  return Math.min(100,Math.round(s1+s2+s3+s4+s5+bon));
}

// - ANALISIS PERFIL -
function generateProfileSummary(ps,pats,jnl,hist,xhist,sc){
  const lines=[];
  const allHist=[...xhist,...hist];
  const totalOps=allHist.length;
  const wins=allHist.filter(h=>h.result>0).length;
  const losses=allHist.filter(h=>h.result<0).length;
  const winRate=totalOps>0?Math.round(wins/totalOps*100):0;

  // Nivel general
  if(sc>=80)lines.push("Operas con disciplina profesional. Tu gestion del riesgo es solida.");
  else if(sc>=65)lines.push("Estas en la recta final hacia la consistencia. Los fundamentos son buenos.");
  else if(sc>=50)lines.push("En transicion. Ves el camino correcto pero te cuesta mantenerlo.");
  else lines.push("Todavia hay patrones de comportamiento que te cuestan dinero.");

  // SL discipline
  const slTotal=ps.slOk+ps.slBroken;
  if(slTotal>0){
    const slRate=Math.round(ps.slOk/slTotal*100);
    if(slRate===100)lines.push("Respetas el Stop Loss en el 100% de las operaciones. Excelente.");
    else if(slRate>=80)lines.push("Respetas el SL en el "+slRate+"% de casos. Queda margen de mejora en la disciplina.");
    else lines.push("Solo respetas el SL en el "+slRate+"% de casos. Esto es lo que mas dinero te cuesta.");
  }

  // Close behavior
  const totClose=(ps.tpAuto||0)+(ps.tpManual||0)+(ps.earlyClose||0)+(ps.manualClose||0);
  if(totClose>0){
    const earlyPct=Math.round((ps.earlyClose||0)/totClose*100);
    if(earlyPct>40)lines.push("Cierras prematuramente el "+earlyPct+"% de las veces. Dejas dinero sobre la mesa.");
    else if(earlyPct>20)lines.push("Cierras antes de tiempo en el "+earlyPct+"% de casos. Trabaja la paciencia.");
    else if((ps.tpAuto||0)>0)lines.push("Dejas correr las ganancias hasta el TP en el "+Math.round((ps.tpAuto||0)/totClose*100)+"% de las operaciones. Bien.");
  }

  // Revenge trading
  if(ps.revenge>=3)lines.push("Alerta: has hecho trading de revancha "+ps.revenge+" veces. Es el patron mas destructivo.");
  else if(ps.revenge===0)lines.push("Sin trading de revancha registrado. Muy buena senial de control emocional.");

  // Journal quality
  const victories=jnl.filter(j=>j.type==="win").length;
  const lessons=jnl.filter(j=>j.type==="lesson").length;
  const mistakes=jnl.filter(j=>j.type==="mistake").length;
  if(jnl.length===0)lines.push("El diario esta vacio. Documentar cada operacion es clave para mejorar.");
  else if(lessons>mistakes)lines.push("Conviertes los errores en lecciones. Eso es lo que diferencia a un trader profesional.");
  else if(mistakes>lessons*2)lines.push("Tienes muchos errores documentados sin su leccion correspondiente. Reflexiona mas sobre cada uno.");

  // Patterns
  const confPats=pats.filter(p=>p.conf>0);
  if(confPats.length>0){
    const bestPat=confPats.sort((a,b)=>{
      const ra=a.obs>0?(a.conf/a.obs):0;
      const rb=b.obs>0?(b.conf/b.obs):0;
      return rb-ra;
    })[0];
    const bestRate=bestPat.obs>0?Math.round(bestPat.conf/bestPat.obs*100):0;
    if(bestRate>=70)lines.push("Tu patron mas fiable es '"+bestPat.name+"' con un "+bestRate+"% de acierto.");
  }

  // Win rate
  if(winRate>=60)lines.push("Tasa de acierto del "+winRate+"%. Por encima de la media del mercado.");
  else if(winRate<40)lines.push("Solo ganas el "+winRate+"% de las operaciones. Revisa tus criterios de entrada.");

  return lines;
}

const TABS=["Resumen","Posiciones","Historial","Patrones","Perfil","Recuperacion","Calendario","Horarios","Alertas","Chat"];
const TC={win:"#00ff88",mistake:"#ff4444",lesson:"#f0b429",analysis:"#888"};
const TL={win:"VICTORIA",mistake:"ERROR",lesson:"LECCION",analysis:"ANALISIS"};

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

// - MAIN APP -
export default function App(){
  const[ready,setReady]=useState(false);
  const[sv,setSv]=useState("saved");
  const[pr,setPr]=useState({SOL:91.33,BTC:84000,ETH:2000,MSTR:300,GOOGL:170,LINK:9.20});
  const[fetchingPrices,setFetchingPrices]=useState(false);

  // Obtener precios en tiempo real desde Binance (sin CORS, sin API key)
  async function fetchPrices(){
    setFetchingPrices(true);
    const newPr={...D.current.pr};
    // Detectar que cryptos necesitamos segun posiciones abiertas + ETH legado
    const openAssets=D.current.pos.map(p=>p.asset);
    const needsSOL=openAssets.some(a=>a.includes("SOL"));
    const needsBTC=openAssets.some(a=>a.includes("BTC"));
    try{
      // Binance API publica - permite llamadas desde browser
      const pairs=[];
      if(needsSOL)pairs.push({symbol:"SOLUSDT",key:"SOL"});
      if(needsBTC)pairs.push({symbol:"BTCUSDT",key:"BTC"});
      const needsLINK=openAssets.some(a=>a.includes("LINK"));
      if(needsLINK)pairs.push({symbol:"LINKUSDT",key:"LINK"});
      // ETH siempre (posicion legado)
      pairs.push({symbol:"ETHUSDT",key:"ETH"});
      await Promise.all(pairs.map(async function(pair){
        try{
          const r=await fetch("https://api.binance.com/api/v3/ticker/price?symbol="+pair.symbol);
          if(r.ok){const d=await r.json();newPr[pair.key]=parseFloat(parseFloat(d.price).toFixed(2));}
        }catch(e){}
      }));
      D.current.pr=newPr;
      setPr(newPr);
      SPr(newPr);
    }catch(e){
      console.warn("Binance error:",e.message);
    }
    setFetchingPrices(false);
  }
  const[pos,setPos]=useState(P0);
  const[pats,setPats]=useState(PAT0);
  const[jnl,setJnl]=useState(J0);
  const[ps,setPs]=useState(PS0);

  // Closes via la app - se anaden cuando cierras una posicion con el boton CERRAR
  // QUANTFURY_BASE ya incluye las operaciones del PDF + las 5 del 23/03
  const XHIST_DEFAULT=[];
  const[xhist,setXhist]=useState(XHIST_DEFAULT);
  const[ethClosed,setEthClosed]=useState(false);
  const[horarios,setHorarios]=useState([]);
  // fotos eliminadas - se usan URLs externas
  const[tab,setTab]=useState("Resumen");
  const[modal,setModal]=useState({});
  const[hSearch,setHSearch]=useState("");
  const[hFilter,setHFilter]=useState("all");
  const[hSort,setHSort]=useState("desc");

  // D ref always has latest state for storage writes
  const D=useRef({pr:{SOL:91.33,BTC:84000,ETH:2000,MSTR:300,GOOGL:170,LINK:9.20},pos:P0,pats:PAT0,jnl:J0,ps:PS0,
    xhist:[],horarios:[],ethClosed:false});
  const tmr=useRef(null);

  // - LOAD -
  useEffect(()=>{
    (async()=>{
      let rawData=null;
      // 1. Intentar cargar desde Supabase (mas reciente, sincronizado)
      const cfg=window.SUPABASE_CFG;
      if(cfg&&cfg.url&&cfg.key){
        try{
          const res=await fetch(cfg.url+"/rest/v1/trading_data?user_id=eq.miguel&select=data",{
            headers:{"apikey":cfg.key,"Authorization":"Bearer "+cfg.key}
          });
          if(res.ok){
            const rows=await res.json();
            if(rows&&rows.length>0)rawData=JSON.stringify(rows[0].data);
          }
        }catch(e){console.warn("Supabase load failed, using localStorage");}
      }
      // 2. Si no hay Supabase o fallo, usar localStorage
      if(!rawData)rawData=localStorage.getItem("td-user");
      try{
        if(rawData){
          const d=JSON.parse(rawData);
          if(d.pr){D.current.pr=d.pr;setPr(d.pr);}
          if(d.pos&&d.pos.length){D.current.pos=d.pos;setPos(d.pos);}
          if(d.pats&&d.pats.length){D.current.pats=d.pats;setPats(d.pats);}
          if(d.jnl&&d.jnl.length){D.current.jnl=d.jnl;setJnl(d.jnl);}
          if(d.ps){D.current.ps=d.ps;setPs(d.ps);}

          if(d.xhist){D.current.xhist=d.xhist;setXhist(d.xhist);}
          if(d.horarios){D.current.horarios=d.horarios;setHorarios(d.horarios);}
          if(d.ethClosed)setEthClosed(true);
          // carga de fotos eliminada
        }
      }catch(e){console.warn("Load error:",e);}
      setReady(true);
      // Mostrar recordatorio de precios si hay posiciones abiertas
      // Solo una vez al dia
      const todayKey="pr-reminder-"+new Date().toDateString();
      const shown=localStorage.getItem(todayKey);
      if(!shown){
        localStorage.setItem(todayKey,"1");
        setTimeout(()=>setModal(m=>({...m,priceReminder:true})),1500);
      }
    })();
  },[]);

  // - SAVE -
  // saveRef always holds latest doSave - avoids stale closure
  const saveRef=useRef(null);
  saveRef.current=async function doSave(){
    const payload={
      pr:D.current.pr,pos:D.current.pos,pats:D.current.pats,
      jnl:D.current.jnl,ps:D.current.ps,
      xhist:D.current.xhist||[],horarios:D.current.horarios||[],
      ethClosed:D.current.ethClosed||false
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
  const SPos=v=>{D.current.pos=v;setPos(v);save();};
  const SJ=v=>{D.current.jnl=v;setJnl(v);save();};
  const SPs=v=>{D.current.ps=v;setPs(v);save();};
  const SPr=v=>{D.current.pr=v;setPr(v);save();};

  const SX=v=>{D.current.xhist=v;setXhist(v);save();};
  const SH=v=>{D.current.horarios=v;setHorarios(v);save();};

  // - COMPUTED -
  const PM={"BTC/USD":pr.BTC,"BTC/USDT":pr.BTC,"ETH/USDT":pr.ETH,"SOL/USD":pr.SOL,"SOL/USDT":pr.SOL,"LINK/USD":pr.LINK||9.20,"LINK/USDT":pr.LINK||9.20,"MSTR":pr.MSTR,"GOOGL":pr.GOOGL,"GOOGL/USD":pr.GOOGL};
  const getPnL=p=>{const c=PM[p.asset]||p.entry;const r=p.dir==="Short"?(p.entry-c)/p.entry:(c-p.entry)/p.entry;return p.capital*r;};
  const hist=[...xhist,...H0];
  // Base exacta de Quantfury (244 ops cerradas al 23/03/2026) + nuevos cierres via app
  // QUANTFURY_BASE = perdida total oficial Quantfury al 23/03/2026 (246 operaciones cerradas)
  // xhistTotal = P&L de closes hechos VIA LA APP despues del 23/03/2026
  const QUANTFURY_BASE=-7471.73;
  const xhistTotal=xhist.reduce((a,h)=>a+(h.result||0),0);
  const h0Total=QUANTFURY_BASE+xhistTotal;
  const ethU=(pr.ETH-3621.58)*1.95209253;
  const ethT=ethU-796.09;
  const actPnl=pos.reduce((a,p)=>a+getPnL(p),0);
  const wins=hist.filter(h=>h.result>0).length;
  const sc=calcScore(ps,pats,jnl);
  const lvColor=sc<30?"#ff4444":sc<50?"#ff8844":sc<65?"#f0b429":sc<80?"#88cc44":"#00ff88";
  const lvLabel=sc<30?"APOSTADOR":sc<50?"PRINCIPIANTE":sc<65?"EN TRANSICION":sc<80?"AVANZADO":"PROFESIONAL";

  // - HISTORY -
  const fH=hist
    .filter(h=>(hFilter==="all"||hFilter===h.dir.toLowerCase())&&(!hSearch||h.asset.toLowerCase().includes(hSearch.toLowerCase())))
    .sort((a,b)=>{
      const da=a.date.split("/").reverse().join("");
      const db=b.date.split("/").reverse().join("");
      return hSort==="desc"?db.localeCompare(da):da.localeCompare(db);
    });
  const lWin=hist.filter(h=>h.dir==="Long"&&h.result>0).length;
  const lLoss=hist.filter(h=>h.dir==="Long"&&h.result<0).length;
  const lBE=hist.filter(h=>h.dir==="Long"&&h.result===0).length;
  const sWin=hist.filter(h=>h.dir==="Short"&&h.result>0).length;
  const sLoss=hist.filter(h=>h.dir==="Short"&&h.result<0).length;
  const sBE=hist.filter(h=>h.dir==="Short"&&h.result===0).length;
  const lTot=hist.filter(h=>h.dir==="Long").length;
  const sTot=hist.filter(h=>h.dir==="Short").length;

  // - CLOSE POSITION -
  function closePos(p,type,manualPrice){
    const isBE=p.be||p.sl===p.entry;
    let result=0;
    let note="";
    const newPs={...D.current.ps};
    if(type==="sl"){
      result=isBE?0:-(p.capital*Math.abs(p.entry-p.sl)/p.entry);
      note=isBE?"BE - SL en entrada":"SL ejecutado";
      newPs.slOk=(newPs.slOk||0)+1;
    }else if(type==="tp"){
      result=p.tp?p.capital*Math.abs(p.tp-p.entry)/p.entry:0;
      note="TP alcanzado";
      newPs.tpAuto=(newPs.tpAuto||0)+1;
    }else{
      // Si hay precio manual, usar ese; si no, usar precio de mercado
      if(manualPrice&&manualPrice>0){
        const r=p.dir==="Short"?(p.entry-manualPrice)/p.entry:(manualPrice-p.entry)/p.entry;
        result=parseFloat((p.capital*r).toFixed(2));
        note="Cierre manual @ $"+manualPrice.toLocaleString();
      }else{
        result=parseFloat(getPnL(p).toFixed(2));
        note="Cierre manual";
      }
      if(result>0)newPs.tpManual=(newPs.tpManual||0)+1;
      else if(result<0)newPs.earlyClose=(newPs.earlyClose||0)+1;
      else newPs.manualClose=(newPs.manualClose||0)+1;
    }
    const entry={id:Date.now(),asset:p.asset,dir:p.dir,cap:p.capital,result:parseFloat(result.toFixed(2)),date:today(),note:note};
    const newX=[entry,...(D.current.xhist||[])];
    const newPos2=D.current.pos.filter(x=>x.id!==p.id);
    D.current.xhist=newX;D.current.pos=newPos2;D.current.ps=newPs;
    setXhist(newX);setPos(newPos2);setPs(newPs);save();
    setModal(m=>({...m,close:null,postData:{asset:p.asset,type:type,result:parseFloat(result.toFixed(2)),isBE:isBE}}));
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
        <div>
          <div style={{fontSize:22,fontWeight:700,color:"#f0b429",letterSpacing:3}}>TRADING DIARY</div>
          <div style={{fontSize:9,color:"#444"}}>MIGUEL GARCIA PARRADO</div>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <div style={{fontSize:8,padding:"2px 7px",borderRadius:10,border:"1px solid "+svColor,color:svColor}}>{svText}</div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:9,color:"#444"}}>NIVEL</div>
            <div style={{fontSize:11,color:lvColor,fontWeight:700}}>{lvLabel} {sc}%</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:9,color:"#444"}}>P&L ACTIVAS</div>
            <div style={{fontSize:18,fontWeight:700,color:actPnl>=0?"#00ff88":"#ff4444"}}>{fmtNum(actPnl)}</div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div style={S.tabs}>{TABS.map(t=><button key={t} onClick={()=>setTab(t)} style={S.tab(tab===t)}>{t.toUpperCase()}</button>)}</div>

      {/* Boton actualizar precios - solo en pestanas relevantes */}
      {(tab==="Resumen"||tab==="Posiciones")&&(
        <div style={{background:"#080810",borderBottom:"1px solid #1a1a2a",padding:"5px 14px",display:"flex",justifyContent:"flex-end"}}>
          <div style={{display:"flex",gap:6,alignItems:"center"}}>
          <button onClick={fetchPrices} style={{background:"rgba(0,255,136,.1)",border:"1px solid #00ff88",color:"#00ff88",padding:"3px 10px",borderRadius:4,fontSize:9,cursor:"pointer",fontWeight:700}}>
            {fetchingPrices?"⏳ cargando...":"⚡ Precios en tiempo real"}
          </button>
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
                {l:"P&L ACTIVAS",v:fmtNum(actPnl),c:actPnl>=0?"#00ff88":"#ff4444"},
                {l:"PERDIDA TOTAL",v:fmtNum(h0Total+ethT),c:h0Total+ethT>=0?"#00ff88":"#ff4444"},
                {l:"OPS TOTALES",v:hist.length,c:"#e0e0e0"},
                {l:"TASA GANADORA",v:Math.round(wins/hist.length*100)+"%",c:"#f0b429"},
                {l:"ROI HISTORICO",v:(()=>{const inv=hist.reduce((a,h)=>a+(h.cap||0),0);return inv>0?(h0Total/inv*100).toFixed(1)+"%":"--";})(),c:h0Total>=0?"#00ff88":"#ff4444"},
                {l:"ROI ETH LEGADO",v:((pr.ETH-3621.58)/3621.58*100).toFixed(1)+"%",c:pr.ETH>=3621.58?"#00ff88":"#ff4444"},
                {l:"ROI ACTIVAS",v:(()=>{const inv=pos.reduce((a,p)=>a+p.capital,0);return inv>0?(actPnl/inv*100).toFixed(1)+"%":"--";})(),c:actPnl>=0?"#00ff88":"#ff4444"},
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

            {/* Posiciones activas */}
            <div style={S.card}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <div style={{fontSize:10,color:"#f0b429",fontWeight:700}}>POSICIONES ACTIVAS</div>
                <button onClick={()=>setModal(m=>({...m,pos:true,posForm:{asset:"",dir:"Short",capital:"",entry:"",sl:"",tp:""},editPosId:null}))} style={{...S.btn(true),padding:"4px 10px",fontSize:9}}>+ NUEVA OPERACION</button>
              </div>
              {pos.map(p=>{
                const g=getPnL(p);
                return(
                  <div key={p.id} style={S.row}>
                    <div style={{display:"flex",gap:7,alignItems:"center"}}>
                      <span style={{width:5,height:5,borderRadius:"50%",background:g>=0?"#00ff88":"#ff4444",display:"inline-block"}}/>
                      <span>{p.asset}</span>
                      <span style={S.bdg(p.dir==="Short"?"#ff4444":"#00ff88")}>{p.dir}</span>
                      {(p.be||p.sl===p.entry)&&<span style={S.bdg("#00ff88")}>BE</span>}
                    </div>
                    <span style={{fontWeight:700,color:g>=0?"#00ff88":"#ff4444"}}>{fmtNum(g)}</span>
                  </div>
                );
              })}
              <div style={{textAlign:"right",marginTop:8,paddingTop:8,borderTop:"1px solid #1a1a2a"}}>
                <span style={{fontSize:16,fontWeight:700,color:actPnl>=0?"#00ff88":"#ff4444"}}>{fmtNum(actPnl)}</span>
              </div>
            </div>
          </div>
        )}

        {/* ═══ POSICIONES ═══ */}
        {tab==="Posiciones"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{fontSize:10,color:"#f0b429",fontWeight:700}}>POSICIONES ABIERTAS</div>
              <button onClick={()=>setModal(m=>({...m,pos:true,posForm:{asset:"",dir:"Short",capital:"",entry:"",sl:"",tp:""},editPosId:null}))} style={S.btn(true)}>+ NUEVA OPERACION</button>
            </div>
            {pos.map(p=>{
              const g=getPnL(p);
              const isBE=p.be||p.sl===p.entry;
              const mL=p.sl?p.capital*Math.abs(p.entry-p.sl)/p.entry:0;
              const mG=p.tp?p.capital*Math.abs(p.tp-p.entry)/p.entry:null;
              return(
                <div key={p.id} style={{...S.card,border:"1px solid "+(g>=0?"rgba(0,255,136,.25)":"rgba(255,68,68,.15)")}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                    <div style={{display:"flex",gap:7,alignItems:"center"}}>
                      <span style={{fontSize:15,fontWeight:700}}>{p.asset}</span>
                      <span style={S.bdg(p.dir==="Short"?"#ff4444":"#00ff88")}>{p.dir}</span>
                      {isBE&&<span style={S.bdg("#00ff88")}>BE</span>}
                    </div>
                    <div style={{display:"flex",gap:7,alignItems:"center"}}>
                      <span style={{fontSize:19,fontWeight:700,color:g>=0?"#00ff88":"#ff4444"}}>{fmtNum(g)}</span>
                      <button onClick={()=>setModal(m=>({...m,pos:true,posForm:{asset:p.asset,dir:p.dir,capital:p.capital,entry:p.entry,sl:p.sl||"",tp:p.tp||""},editPosId:p.id}))} style={{background:"transparent",border:"1px solid #2a2a3a",color:"#f0b429",padding:"3px 7px",borderRadius:4,fontSize:9,cursor:"pointer"}}>editar</button>
                      <button onClick={()=>setModal(m=>({...m,close:p}))} style={{background:"rgba(240,180,41,.15)",border:"1px solid #f0b429",color:"#f0b429",padding:"3px 8px",borderRadius:4,fontSize:9,cursor:"pointer",fontWeight:700}}>CERRAR</button>
                    </div>
                  </div>
                  <div style={S.grid(105)}>
                    {[
                      {l:"CAPITAL",v:"$"+p.capital.toLocaleString()},
                      {l:"ENTRADA",v:fmtP(p.entry)},
                      {l:"ACTUAL",v:fmtP(PM[p.asset]||p.entry),c:g>=0?"#00ff88":"#ff4444"},
                    ].map(i=><div key={i.l}><div style={S.lbl}>{i.l}</div><div style={{fontSize:11,fontWeight:600,color:i.c||"#e0e0e0"}}>{i.v}</div></div>)}
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:4}}>
                    <div style={{background:"rgba(255,68,68,.06)",border:"1px solid rgba(255,68,68,.2)",borderRadius:6,padding:"9px 11px"}}>
                      <div style={{fontSize:8,color:"#555",marginBottom:3}}>STOP LOSS</div>
                      <div style={{fontSize:14,fontWeight:700,color:"#ff6600"}}>{p.sl?fmtP(p.sl):"--"}</div>
                      <div style={{fontSize:12,fontWeight:700,color:"#ff4444"}}>{isBE?"$0.00":fmtNum(-mL)}</div>
                      {isBE&&<div style={{fontSize:8,color:"#00ff88",marginTop:2}}>RIESGO CERO</div>}
                    </div>
                    <div style={{background:"rgba(0,255,136,.06)",border:"1px solid rgba(0,255,136,.2)",borderRadius:6,padding:"9px 11px"}}>
                      <div style={{fontSize:8,color:"#555",marginBottom:3}}>TAKE PROFIT</div>
                      <div style={{fontSize:14,fontWeight:700,color:"#00cc66"}}>{p.tp?fmtP(p.tp):"--"}</div>
                      <div style={{fontSize:12,fontWeight:700,color:"#00ff88"}}>{mG?fmtNum(mG):"--"}</div>
                      {mG&&mL&&!isBE&&<div style={{fontSize:8,color:"#555",marginTop:2}}>Ratio 1:{Math.round(mG/mL)}</div>}
                    </div>
                  </div>
                </div>
              );
            })}
          {pos.length>0&&<PositionAdvisor pos={pos} PM={PM} getPnL={getPnL} fmtNum={fmtNum} S={S}/>}
          </div>
        )}

        {/* ═══ HISTORIAL ═══ */}
        {tab==="Historial"&&(
          <div>
            <div style={{fontSize:10,color:"#f0b429",fontWeight:700,marginBottom:4}}>HISTORIAL QUANTFURY</div>
            <div style={{fontSize:9,color:"#555",marginBottom:10}}>239 ops. PDF oficial</div>
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
            </div>
            <div style={S.card}>
              <div style={{maxHeight:500,overflowY:"auto"}}>
                {fH.map(h=>(
                  <div key={h.id} style={S.row}>
                    <div style={{display:"flex",gap:7,alignItems:"center"}}>
                      <span style={{fontSize:9,color:"#444",width:70}}>{h.date}</span>
                      <span style={{fontWeight:600}}>{h.asset}</span>
                      <span style={S.bdg(h.dir==="Short"?"#ff4444":"#00ff88")}>{h.dir}</span>
                      {h.note&&<span style={S.bdg(h.note.includes("LIQUIDACION")?"#ff6600":"#555")}>{h.note}</span>}
                    </div>
                    <div style={{display:"flex",gap:8,alignItems:"center"}}>
                      <span style={{fontSize:9,color:"#444"}}>${h.cap>=1000?h.cap.toLocaleString():h.cap}</span>
                      <span style={{fontWeight:700,color:h.result>0?"#00ff88":h.result<0?"#ff4444":"#666",minWidth:68,textAlign:"right"}}>{h.result===0?"$0.00":fmtNum(h.result)}</span>
                    </div>
                  </div>
                ))}
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
                  <div style={{fontSize:9,color:"#555",fontWeight:700,marginBottom:8}}>STOP LOSS</div>
                  <div style={{marginBottom:7}}>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:9,marginBottom:2}}><span style={{color:"#555"}}>SL Respetados</span><span style={{color:"#00ff88",fontWeight:700}}>{ps.slOk}/{ps.slOk+ps.slBroken}</span></div>
                    <div style={S.bar}><div style={S.fill((ps.slOk+ps.slBroken)>0?ps.slOk/(ps.slOk+ps.slBroken)*100:0,"#00ff88")}/></div>
                  </div>
                  <div>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:9,marginBottom:2}}><span style={{color:"#555"}}>SL Eliminados</span><span style={{color:"#ff4444",fontWeight:700}}>{ps.slBroken}/{ps.slOk+ps.slBroken}</span></div>
                    <div style={S.bar}><div style={S.fill((ps.slOk+ps.slBroken)>0?ps.slBroken/(ps.slOk+ps.slBroken)*100:0,"#ff4444")}/></div>
                  </div>
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
                <div style={{fontSize:10,color:"#f0b429",fontWeight:700,marginBottom:8}}>DIARIO DESGLOSE</div>
                {[
                  {l:"Victorias +2pts",v:jnl.filter(j=>j.type==="win").length,c:"#00ff88"},
                  {l:"Lecciones +1.5pts",v:jnl.filter(j=>j.type==="lesson").length,c:"#f0b429"},
                  {l:"Analisis +1pt",v:jnl.filter(j=>j.type==="analysis").length,c:"#888"},
                  {l:"Errores +-0",v:jnl.filter(j=>j.type==="mistake").length,c:"#ff4444"},
                  {l:"Cierres doc.",v:jnl.filter(j=>j.linkedClose).length,c:"#f0b429"},
                ].map(x=><div key={x.l} style={{display:"flex",justifyContent:"space-between",fontSize:9,marginBottom:6}}><span style={{color:"#555"}}>{x.l}</span><span style={{color:x.c,fontWeight:700}}>{x.v}</span></div>)}
              </div>
              <div style={S.card}>
                <div style={{fontSize:10,color:"#f0b429",fontWeight:700,marginBottom:8}}>COMO SUBE EL SCORE</div>
                {[
                  {l:"VICTORIA",c:"#00ff88",pts:"+2 pts"},
                  {l:"LECCION",c:"#f0b429",pts:"+1.5 pts"},
                  {l:"ANALISIS",c:"#888",pts:"+1 pt"},
                  {l:"ERROR+LECCION",c:"#ff6600",pts:"+0.5 extra"},
                ].map(x=>(
                  <div key={x.l} style={{background:"#0d0d16",borderRadius:5,padding:"6px 8px",border:"1px solid "+x.c+"22",marginBottom:5,display:"flex",justifyContent:"space-between"}}>
                    <span style={{fontSize:9,color:x.c,fontWeight:700}}>{x.l}</span>
                    <span style={{fontSize:9,color:x.c}}>{x.pts}</span>
                  </div>
                ))}
                <div style={{fontSize:8,color:"#555",marginTop:4}}>Cierres documentados +1.5 bonus</div>
              </div>
            </div>
            <ProfileAnalysis ps={ps} pats={pats} jnl={jnl} hist={hist} xhist={xhist} sc={sc} S={S}/>
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

            <div style={S.card}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <div style={{fontSize:10,color:"#f0b429",fontWeight:700}}>DIARIO PSICOLOGICO</div>
                <button onClick={()=>setModal(m=>({...m,journal:true,journalForm:{text:"",emoji:"💪",type:"analysis"}}))} style={S.btn(true)}>+ ENTRADA</button>
              </div>
              {jnl.map(e=>(
                <div key={e.id} style={{padding:"8px 10px",background:"#0d0d16",borderRadius:6,border:"1px solid "+TC[e.type]+"1a",marginBottom:6}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <div style={{display:"flex",gap:6,alignItems:"center"}}>
                      <span style={{fontSize:13}}>{e.emoji}</span>
                      <span style={{fontSize:8,color:TC[e.type],border:"1px solid "+TC[e.type],padding:"1px 5px",borderRadius:3}}>{TL[e.type]}</span>
                      {e.linkedClose&&<span style={{fontSize:8,color:"#555",border:"1px solid #333",padding:"1px 4px",borderRadius:3}}>{e.linkedClose==="tp"?"TP":e.linkedClose==="sl"?"SL":"MANUAL"}</span>}
                    </div>
                    <span style={{fontSize:8,color:"#444"}}>{e.date}</span>
                  </div>
                  <div style={{fontSize:10,color:"#666",lineHeight:1.5}}>{e.text}</div>
                </div>
              ))}
            </div>
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
                {l:"PERD. HISTORICA",v:fmtNum(-7608.69),c:"#ff4444"},
                {l:"PERDIDA GLOBAL",v:fmtNum(-7608.69+ethT),c:"#ff4444"},
                {l:"BREAKEVEN ETH",v:"$4,029",c:"#f0b429"},
              ].map(k=><div key={k.l} style={S.card}><div style={S.lbl}>{k.l}</div><div style={S.val(k.c)}>{k.v}</div></div>)}
            </div>
            <div style={S.card}>
              <div style={{fontSize:10,color:"#f0b429",fontWeight:700,marginBottom:10}}>ESCENARIOS POR PRECIO ETH</div>
              {[2000,2500,3000,3621,4029,5000,6000,7000,7390,9000].map(price=>{
                const ethG=(price-3621.58)*1.95209253-796.09;
                const tot=ethG-7608.69;
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

        {/* ═══ HORARIOS ═══ */}
        {tab==="Horarios"&&(
          <HorariosTab horarios={horarios} SH={SH} S={S} fmtNum={fmtNum}/>
        )}

        {tab==="Alertas"&&(
          <AlertasTab S={S}/>
        )}

        {tab==="Chat"&&(
          <ChatTab S={S} pos={pos} PM={PM} pats={pats} ps={ps} sc={sc} jnl={jnl} SPs={SPs} SJ={SJ} D={D} save={save}/>
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

      {/* ═══ MODAL POST CIERRE ═══ */}
      {modal.postData&&(
        <ModalPostCierre
          data={modal.postData}
          jnl={D.current.jnl}
          SJ={SJ}
          setModal={setModal}
          fmtNum={fmtNum}
          S={S}
          TC={TC}
        />
      )}

      {/* ═══ MODAL PRECIOS ═══ */}
      {modal.prices&&(
        <div style={S.modal}><div style={S.mc}>
          <div style={{fontSize:12,color:"#f0b429",fontWeight:700,marginBottom:6}}>ACTUALIZAR PRECIOS</div>
          <div style={{fontSize:9,color:"#555",marginBottom:14}}>Activos abiertos + ETH legado</div>
          {(function(){
            var priceKeys=["SOL","BTC","ETH","MSTR","GOOGL","LINK"].filter(function(k){
              return pos.some(function(p){return p.asset.includes(k);}) || k==="ETH";
            });
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
          form={modal.posForm||{asset:"",dir:"Short",capital:"",entry:"",sl:"",tp:""}}
          editId={modal.editPosId}
          currentPos={D.current.pos}
          PM={PM}
          SPos={SPos}
          setModal={setModal}
          fmtNum={fmtNum}
          S={S}
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

      {/* ═══ MODAL DIARIO ═══ */}
      {modal.journal&&(
        <div style={S.modal}><div style={S.mc}>
          <div style={{fontSize:12,color:"#f0b429",fontWeight:700,marginBottom:14}}>NUEVA ENTRADA DIARIO</div>
          <div style={S.lbl}>QUE PASO? COMO TE SENTISTE?</div>
          <textarea style={{...S.inp,height:80,resize:"none",marginBottom:10}} placeholder="Describe la operacion, tus pensamientos..." value={(modal.journalForm&&modal.journalForm.text)||""||""} onChange={e=>setModal(m=>({...m,journalForm:{...m.journalForm,text:e.target.value}}))}/>
          <div style={S.lbl}>EMOCION</div>
          <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>
            {["😰","😅","💪","🎯","😤","🧘","😊","😬"].map(em=>(
              <button key={em} onClick={()=>setModal(m=>({...m,journalForm:{...m.journalForm,emoji:em}}))} style={{fontSize:17,background:(modal.journalForm&&modal.journalForm.emoji)===em?"rgba(240,180,41,.15)":"transparent",border:"1px solid "+((modal.journalForm&&modal.journalForm.emoji)===em?"#f0b429":"#2a2a3a"),borderRadius:5,padding:"3px 6px",cursor:"pointer"}}>{em}</button>
            ))}
          </div>
          <div style={S.lbl}>TIPO</div>
          <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12}}>
            {[["win","VICTORIA +2","#00ff88"],["lesson","LECCION +1.5","#f0b429"],["analysis","ANALISIS +1","#888"],["mistake","ERROR","#ff4444"]].map(([v,l,c])=>(
              <button key={v} onClick={()=>setModal(m=>({...m,journalForm:{...m.journalForm,type:v}}))} style={{padding:"4px 9px",borderRadius:4,fontSize:9,fontWeight:700,border:"1px solid "+c,background:(modal.journalForm&&modal.journalForm.type)===v?c+"22":"transparent",color:c,cursor:"pointer"}}>{l}</button>
            ))}
          </div>
          <div style={{display:"flex",gap:7}}>
            <button onClick={()=>{
              const jf=modal.journalForm||{};
              if(!jf.text)return;
              SJ([{...jf,id:Date.now(),date:today()},...D.current.jnl]);
              setModal(m=>({...m,journal:false,journalForm:null}));
            }} style={{...S.btn(true),flex:1,padding:8}}>GUARDAR</button>
            <button onClick={()=>setModal(m=>({...m,journal:false,journalForm:null}))} style={{...S.btn(false),flex:1}}>CANCELAR</button>
          </div>
        </div></div>
      )}

      {/* ═══ MODAL METRICAS ═══ */}
      {modal.psych&&(
        <div style={S.modal}><div style={S.mc}>
          <div style={{fontSize:12,color:"#f0b429",fontWeight:700,marginBottom:14}}>METRICAS PSICOLOGICAS</div>
          {[
            ["SL Respetados","slOk"],["SL Eliminados","slBroken"],
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

      {/* ═══ RECORDATORIO DE PRECIOS (una vez al dia) ═══ */}
      {modal.priceReminder&&(
        <div style={S.modal}><div style={S.mc}>
          <div style={{textAlign:"center",marginBottom:16}}>
            <div style={{fontSize:28,marginBottom:8}}>⏰</div>
            <div style={{fontSize:13,fontWeight:700,color:"#f0b429"}}>Actualizacion de precios</div>
            <div style={{fontSize:10,color:"#555",marginTop:4}}>Tienes posiciones abiertas. Actualiza los precios para ver el P&L real.</div>
          </div>
          <div style={{marginBottom:14}}>
            {pos.map(p=>(
              <div key={p.id} style={{display:"flex",justifyContent:"space-between",fontSize:10,padding:"5px 0",borderBottom:"1px solid #1a1a2a"}}>
                <span style={{color:"#e0e0e0"}}>{p.asset}</span>
                <span style={{color:"#f0b429",fontWeight:700}}>precio actual: ${(PM[p.asset]||p.entry).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>{setModal(m=>({...m,priceReminder:false,prices:true,tmpPr:{...pr}}));}} style={{...S.btn(true),flex:2,padding:8}}>ACTUALIZAR PRECIOS</button>
            <button onClick={()=>setModal(m=>({...m,priceReminder:false}))} style={{...S.btn(false),flex:1}}>Luego</button>
          </div>
        </div></div>
      )}

    </div>
  );
}

// - SUBCOMPONENTS -
// - INDICADORES -
// - CHAT TAB -
function ChatTab({S,pos,PM,pats,ps,sc,jnl,SPs,SJ,D,save}){
  const[messages,setMessages]=useState([{
    role:"assistant",
    content:"Hola Miguel. Soy tu analista personal. Tengo acceso en tiempo real a tus posiciones, patrones y estadisticas.\n\nPuedo analizar cualquier activo con datos de Binance: precio, RSI, EMAs 7/25/50. Describeme lo que ves en el grafico y te doy mi opinion.\n\n¿Que quieres analizar?",
    time:new Date().toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"})
  }]);
  const[input,setInput]=useState("");
  const[loading,setLoading]=useState(false);
  const[selAsset,setSelAsset]=useState("BTCUSDT");
  const[selTF,setSelTF]=useState("4h");
  const[marketData,setMarketData]=useState(null);
  const[fetchingMD,setFetchingMD]=useState(false);
  const listRef=useRef(null);

  const ASSETS=[
    {v:"BTCUSDT",l:"BTC/USD"},{v:"SOLUSDT",l:"SOL/USD"},{v:"ETHUSDT",l:"ETH/USD"},
    {v:"LINKUSDT",l:"LINK/USD"},{v:"BNBUSDT",l:"BNB/USD"},{v:"XRPUSDT",l:"XRP/USD"},
  ];
  const TFS=[{v:"15m",l:"15m"},{v:"1h",l:"1H"},{v:"4h",l:"4H"},{v:"1d",l:"D"},{v:"1w",l:"W"}];

  useEffect(()=>{
    if(listRef.current)listRef.current.scrollTop=listRef.current.scrollHeight;
  },[messages]);

  async function fetchMarketData(){
    setFetchingMD(true);
    try{
      const md=await getBinanceData(selAsset,selTF,ASSETS,TFS);
      if(md)setMarketData(md);
      return md;
    }catch(e){
      console.error(e);
      return null;
    }finally{
      setFetchingMD(false);
    }
  }

  function buildSystemPrompt(md){
    const openPositions=pos.map(p=>{
      return p.asset+" "+p.dir+" entrada $"+p.entry+" SL $"+(p.sl||"--")+" TP $"+(p.tp||"--")+(p.be?" [BE]":"");
    }).join(", ")||"Sin posiciones abiertas";
    const confirmedPats=pats.filter(p=>p.conf>0).map(p=>p.name+" ("+Math.round(p.conf/(p.obs||1)*100)+"% exito)").join(", ")||"Sin patrones confirmados";
    const recentJournal=jnl.slice(0,3).map(j=>j.type.toUpperCase()+": "+j.text.slice(0,80)).join(" | ")||"Sin entradas";
    let mdContext="";
    if(md){
      const rsiStatus=md.rsi<30?"SOBREVENTA":md.rsi>70?"SOBRECOMPRA":"NEUTRO";
      mdContext="\nMERCADO ("+md.asset+" "+md.tf+"): $"+md.price+" | 24h: "+md.change24h+"%"+
        " | RSI: "+md.rsi+" "+rsiStatus+" | EMA7: "+md.ema7+" EMA25: "+md.ema25+" EMA50: "+md.ema50+
        " | "+md.emaRelation+" | Estructura: "+md.trend+" | Vol: "+md.volRatio+"x | H:"+md.high24h+" L:"+md.low24h;
    }
    return "Eres analista de trading y coach personal de Miguel Garcia Parrado (Quantfury). Analiza graficos y ayudale a mejorar.\n\n"+
      "PERFIL: Nivel "+sc+"/100 | SL respetados "+ps.slOk+" | SL eliminados "+ps.slBroken+"\n"+
      "Estrategia: ineficiencias FVG + patrones chartistas (cunas, banderines, canales)\n"+
      "Patrones confirmados: "+confirmedPats+"\n"+
      "Posiciones abiertas: "+openPositions+"\n"+
      "Diario reciente: "+recentJournal+"\n"+
      mdContext+"\n\n"+
      "INSTRUCCIONES:\n"+
      "- Responde en espanol, directo, max 200 palabras\n"+
      "- Menciona RSI, EMAs y estructura de precio\n"+
      "- Si el setup es arriesgado, dilo claro\n"+
      "- Si hay confluencia (RSI + EMA + patron), destacalo\n"+
      "- Termina con: EVALUACION_TRADER:[positivo|negativo|neutro]:[descripcion breve]";
  }

  async function sendMessage(){
    if(!input.trim()||loading)return;
    const userMsg={role:"user",content:input,time:new Date().toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"})};
    const newMessages=[...messages,userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try{
      // Fetch fresh market data if not recent
      let md=marketData;
      if(!md)md=await fetchMarketData();

      const systemPrompt=buildSystemPrompt(md);
      const apiMessages=newMessages.map(m=>({role:m.role==="assistant"?"assistant":"user",content:m.content}));

      const response=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          system:systemPrompt,
          messages:apiMessages,
        })
      });

      if(!response.ok)throw new Error("API error "+response.status);
      const data=await response.json();
      const raw=data.content[0].text;

      // Extract evaluation for profile update
      const evalMatch=raw.match(/EVALUACION_TRADER:(positivo|negativo|neutro):(.+)/);
      if(evalMatch){
        const evalType=evalMatch[1];
        const evalDesc=evalMatch[2].trim();
        // Add journal entry based on chat evaluation
        const jEntry={
          id:Date.now(),
          date:new Date().toLocaleDateString("es-ES"),
          text:"[Chat] "+evalDesc,
          emoji:evalType==="positivo"?"💪":evalType==="negativo"?"😤":"🧘",
          type:evalType==="positivo"?"win":evalType==="negativo"?"lesson":"analysis",
          linkedClose:null
        };
        const newJnl=[jEntry,...D.current.jnl];
        D.current.jnl=newJnl;
        // SJ updates jnl state and saves
        // We use SJ directly
      }

      // Clean response (remove evaluation line from display)
      const clean=raw.replace(/EVALUACION_TRADER:.+/,"").trim();
      const assistantMsg={role:"assistant",content:clean,time:new Date().toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"})};
      setMessages(prev=>[...prev,assistantMsg]);

    }catch(e){
      const errMsg={role:"assistant",content:"Error al conectar con la IA: "+e.message+". Verifica tu conexion.",time:new Date().toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"})};
      setMessages(prev=>[...prev,errMsg]);
    }
    setLoading(false);
  }

  return(
    <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 160px)"}}>
      {/* Selector activo + temporalidad */}
      <div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap",alignItems:"center"}}>
        <select value={selAsset} onChange={e=>setSelAsset(e.target.value)} style={{...S.inp,width:"auto",padding:"5px 8px",fontSize:9,flex:1}}>
          {ASSETS.map(a=><option key={a.v} value={a.v}>{a.l}</option>)}
        </select>
        <div style={{display:"flex",gap:3}}>
          {TFS.map(t=>(
            <button key={t.v} onClick={()=>setSelTF(t.v)} style={{padding:"5px 8px",borderRadius:4,fontSize:9,fontWeight:700,border:"none",cursor:"pointer",background:selTF===t.v?"#f0b429":"#1e1e2e",color:selTF===t.v?"#0a0a0f":"#666"}}>
              {t.l}
            </button>
          ))}
        </div>
        <button
          onClick={fetchMarketData}
          style={{background:"rgba(0,255,136,.1)",border:"1px solid #00ff88",color:"#00ff88",padding:"5px 10px",borderRadius:4,fontSize:9,cursor:"pointer",fontWeight:700,whiteSpace:"nowrap"}}
        >
          {fetchingMD?"⏳":"⚡"} {marketData?"Actualizar":"Cargar datos"}
        </button>
      </div>

      {/* Market data pill */}
      {marketData&&(
        <div style={{background:"#0d0d16",border:"1px solid #1e1e2e",borderRadius:6,padding:"6px 10px",marginBottom:8,display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}}>
          <span style={{fontSize:10,fontWeight:700,color:"#f0b429"}}>{marketData.asset} {marketData.tf}</span>
          <span style={{fontSize:10,fontWeight:700,color:"#e0e0e0"}}>${marketData.price}</span>
          <span style={{fontSize:9,color:parseFloat(marketData.change24h)>=0?"#00ff88":"#ff4444"}}>{parseFloat(marketData.change24h)>=0?"+":""}{marketData.change24h}%</span>
          <span style={{fontSize:9,color:marketData.rsi<=30?"#00ff88":marketData.rsi>=70?"#ff4444":"#888"}}>RSI {marketData.rsi}</span>
          <span style={{fontSize:9,color:parseFloat(marketData.ema7)>parseFloat(marketData.ema25)?"#00ff88":"#ff4444"}}>{marketData.emaRelation}</span>
        </div>
      )}

      {/* Messages */}
      <div ref={listRef} style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:8,paddingBottom:8}}>
        {messages.map((m,i)=>(
          <div key={i} style={{display:"flex",flexDirection:"column",alignItems:m.role==="user"?"flex-end":"flex-start"}}>
            <div style={{
              maxWidth:"85%",
              padding:"10px 12px",
              borderRadius:m.role==="user"?"12px 12px 2px 12px":"12px 12px 12px 2px",
              background:m.role==="user"?"rgba(240,180,41,.15)":"#111118",
              border:"1px solid "+(m.role==="user"?"rgba(240,180,41,.3)":"#1e1e2e"),
              fontSize:11,
              color:"#e0e0e0",
              lineHeight:1.7,
              whiteSpace:"pre-wrap",
            }}>
              {m.content}
            </div>
            <span style={{fontSize:8,color:"#333",marginTop:2,marginLeft:m.role==="user"?0:4,marginRight:m.role==="user"?4:0}}>
              {m.role==="user"?"Tu":"Claude"} · {m.time}
            </span>
          </div>
        ))}
        {loading&&(
          <div style={{alignSelf:"flex-start"}}>
            <div style={{padding:"10px 14px",background:"#111118",border:"1px solid #1e1e2e",borderRadius:"12px 12px 12px 2px",fontSize:11,color:"#555"}}>
              Analizando...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{display:"flex",gap:6,paddingTop:8,borderTop:"1px solid #1a1a2a"}}>
        <input
          style={{...S.inp,flex:1,fontSize:12,padding:"10px 12px"}}
          placeholder={marketData?"Describe lo que ves en el grafico o pregunta lo que quieras...":"Carga los datos del mercado primero con ⚡"}
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMessage();}}}
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
        Pulsa ⚡ para cargar datos en tiempo real antes de preguntar · Enter para enviar
      </div>
    </div>
  );
}



function EmaDisplay({data}){
  if(!data)return null;
  const isGolden=data.relation==="above";
  const crossLabel=data.cross==="golden"?"CRUCE DORADO":data.cross==="death"?"CRUCE MUERTE":null;
  return(
    <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",marginTop:4}}>
      <div style={{background:"rgba(136,170,255,.1)",border:"1px solid rgba(136,170,255,.3)",borderRadius:4,padding:"4px 8px",fontSize:9}}>
        <span style={{color:"#88aaff"}}>EMA7 </span>
        <span style={{color:"#e0e0e0",fontWeight:700}}>{data.ema7.toFixed(0)}</span>
      </div>
      <div style={{background:"rgba(255,136,170,.1)",border:"1px solid rgba(255,136,170,.3)",borderRadius:4,padding:"4px 8px",fontSize:9}}>
        <span style={{color:"#ff88aa"}}>EMA25 </span>
        <span style={{color:"#e0e0e0",fontWeight:700}}>{data.ema25.toFixed(0)}</span>
      </div>
      <div style={{background:isGolden?"rgba(0,255,136,.1)":"rgba(255,68,68,.1)",border:"1px solid "+(isGolden?"rgba(0,255,136,.3)":"rgba(255,68,68,.3)"),borderRadius:4,padding:"4px 8px",fontSize:9,fontWeight:700,color:isGolden?"#00ff88":"#ff4444"}}>
        {isGolden?"EMA7 > EMA25":"EMA7 < EMA25"}
      </div>
      {crossLabel&&(
        <div style={{background:data.cross==="golden"?"rgba(255,215,0,.15)":"rgba(100,0,100,.15)",border:"1px solid "+(data.cross==="golden"?"#ffd700":"#cc00cc"),borderRadius:4,padding:"4px 8px",fontSize:9,fontWeight:700,color:data.cross==="golden"?"#ffd700":"#cc44cc"}}>
          {crossLabel}
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
  // Returns null | "golden" | "death"
  if(closes.length<30)return null;
  const ema7=calcEMASeries(closes,7);
  const ema25=calcEMASeries(closes,25);
  if(ema7.length<2||ema25.length<2)return null;
  // Align arrays (ema25 starts later)
  const offset=ema7.length-ema25.length;
  const prevE7=ema7[ema7.length-2];
  const currE7=ema7[ema7.length-1];
  const prevE25=ema25[ema25.length-2];
  const currE25=ema25[ema25.length-1];
  if(prevE7<=prevE25&&currE7>currE25)return"golden";
  if(prevE7>=prevE25&&currE7<currE25)return"death";
  return null;
}

function AlertasTab({S}){
  const SYMBOLS=[
    {symbol:"BTCUSDT",label:"BTC/USD"},
  ];
  const INTERVALS=[
    {value:"1h",label:"1 hora"},
    {value:"4h",label:"4 horas"},
    {value:"1d",label:"Diario"},
    {value:"1w",label:"Semanal"},
  ];

  const[alerts,setAlerts]=useState([]);
  const[customAlerts,setCustomAlerts]=useState([]);
  const[showCustomForm,setShowCustomForm]=useState(false);
  const[customForm,setCustomForm]=useState({symbol:"BTCUSDT",label:"BTC/USD",interval:"1d",condition:"below",threshold:30,description:""});
  const[logs,setLogs]=useState([]);
  const[notifPerm,setNotifPerm]=useState("default");
  const wsRefs=useRef({});
  const closesRef=useRef({});
  const lastCrossRef=useRef({});
  const lastCustomRef=useRef({});
  const[emaData,setEmaData]=useState({});

  useEffect(()=>{
    if("Notification" in window)setNotifPerm(Notification.permission);
    // Load saved alerts - if none, init the 4 default BTC alerts
    try{
      const savedCustom=localStorage.getItem("td-custom-alerts");
      if(savedCustom)setCustomAlerts(JSON.parse(savedCustom));
    }catch(e){}
    try{
      const saved=localStorage.getItem("td-rsi-alerts");
      if(saved){
        const parsed=JSON.parse(saved);
        if(parsed.length>0){setAlerts(parsed);return;}
      }
      // First time: create the 4 BTC alerts automatically
      const defaults=[
        {id:1,symbol:"BTCUSDT",label:"BTC/USD",interval:"1h",oversold:30,overbought:70,active:false,rsi:null},
        {id:2,symbol:"BTCUSDT",label:"BTC/USD",interval:"4h",oversold:30,overbought:70,active:false,rsi:null},
        {id:3,symbol:"BTCUSDT",label:"BTC/USD",interval:"1d",oversold:30,overbought:70,active:false,rsi:null},
        {id:4,symbol:"BTCUSDT",label:"BTC/USD",interval:"1w",oversold:30,overbought:70,active:false,rsi:null},
      ];
      setAlerts(defaults);
      localStorage.setItem("td-rsi-alerts",JSON.stringify(defaults));
    }catch(e){}
  },[]);

  function saveAlerts(newAlerts){
    setAlerts(newAlerts);
    localStorage.setItem("td-rsi-alerts",JSON.stringify(newAlerts));
  }

  function saveCustomAlerts(arr){
    setCustomAlerts(arr);
    localStorage.setItem("td-custom-alerts",JSON.stringify(arr));
  }

  function addCustomAlert(){
    if(!customForm.threshold)return;
    const na={...customForm,id:Date.now(),triggered:false};
    saveCustomAlerts([...customAlerts,na]);
    setShowCustomForm(false);
    setCustomForm({symbol:"BTCUSDT",label:"BTC/USD",interval:"1d",condition:"below",threshold:30,description:""});
  }

  function requestNotif(){
    if(!("Notification" in window)){alert("Tu navegador no soporta notificaciones");return;}
    Notification.requestPermission().then(p=>{
      setNotifPerm(p);
      if(p==="granted")sendTestNotif();
    });
  }

  function sendTestNotif(){
    new Notification("Trading Diary - Alertas RSI",{
      body:"Las notificaciones funcionan correctamente",
      icon:"https://cdn.iconscout.com/icon/free/png-256/free-trading-2742759-2274860.png"
    });
  }

  function sendAlert(label,interval,rsi,type,ema7,ema25,customDesc){
    const rsiPart=rsi!==null?(type==="oversold"?"RSI SOBREVENTA "+rsi:type==="overbought"?"RSI SOBRECOMPRA "+rsi:""):"";
    const emaPart=type==="golden"?"CRUCE DORADO EMA7 > EMA25":type==="death"?"CRUCE DE LA MUERTE EMA7 < EMA25":"";
    const customPart=customDesc||"";
    const title=type==="golden"||type==="death"?"Alerta EMA":type.startsWith("custom")?"Alerta Personalizada":"Alerta RSI";
    const body=customDesc?customDesc:[rsiPart,emaPart].filter(Boolean).join(" + ");
    const tf=interval==="1h"?"1H":interval==="4h"?"4H":interval==="1d"?"Diario":"Semanal";
    const msg=label+" "+tf+" — "+body;
    const log={id:Date.now(),label,interval:tf,rsi,type,ema7:ema7?ema7.toFixed(0):null,ema25:ema25?ema25.toFixed(0):null,time:new Date().toLocaleTimeString("es-ES")};
    setLogs(prev=>[log,...prev.slice(0,49)]);
    if(Notification.permission==="granted"){
      new Notification(title,{body:msg,icon:"https://em-content.zobj.net/source/apple/391/chart-increasing_1f4c8.png"});
    }
  }

  function startAlert(alert){
    const key=alert.symbol+alert.interval;
    if(wsRefs.current[key])wsRefs.current[key].close();
    closesRef.current[key]=[];

    // First fetch historical data for RSI calculation
    fetch("https://api.binance.com/api/v3/klines?symbol="+alert.symbol+"&interval="+alert.interval+"&limit=50")
      .then(r=>r.json())
      .then(data=>{
        closesRef.current[key]=data.map(k=>parseFloat(k[4]));
        // Open WebSocket for live updates
        const ws=new WebSocket("wss://stream.binance.com:9443/ws/"+alert.symbol.toLowerCase()+"@kline_"+alert.interval);
        ws.onmessage=e=>{
          const d=JSON.parse(e.data);
          const k=d.k;
          const closePrice=parseFloat(k.c);
          const closes=[...closesRef.current[key]];
          if(k.x){closes.push(closePrice);if(closes.length>100)closes.shift();}
          else{if(closes.length>0)closes[closes.length-1]=closePrice;}
          closesRef.current[key]=closes;

          const rsi=calcRSI(closes,14);
          const ema7=calcEMA(closes,7);
          const ema25=calcEMA(closes,25);
          const cross=detectCross(closes);
          const relation=ema7&&ema25?(ema7>ema25?"above":"below"):null;

          // Update UI
          setAlerts(prev=>prev.map(a=>a.id===alert.id?{...a,rsi,active:true}:a));
          if(ema7&&ema25){
            setEmaData(prev=>({...prev,[alert.id]:{ema7,ema25,relation,cross}}));
          }

          // RSI alerts
          if(rsi!==null){
            if(rsi<=alert.oversold)sendAlert(alert.label,alert.interval,rsi,"oversold",ema7,ema25);
            if(rsi>=alert.overbought)sendAlert(alert.label,alert.interval,rsi,"overbought",ema7,ema25);
          }

          // EMA cross alerts - only fire once per cross (not every tick)
          if(cross){
            const crossKey=key+"_cross";
            const lastCross=lastCrossRef.current[crossKey];
            if(lastCross!==cross){
              lastCrossRef.current[crossKey]=cross;
              sendAlert(alert.label,alert.interval,rsi,cross,ema7,ema25);
            }
          }

          // Combined: RSI oversold + EMA relation favorable
          if(rsi!==null&&rsi<=alert.oversold&&relation==="above"){
            sendAlert(alert.label,alert.interval,rsi,"oversold_golden",ema7,ema25);
          }
          // Check custom personalized alerts
          if(rsi!==null){
            customAlerts.forEach(function(ca){
              if(ca.symbol!==alert.symbol||ca.interval!==alert.interval)return;
              const thresh=parseFloat(ca.threshold);
              const triggered=(ca.condition==="below"&&rsi<=thresh)||(ca.condition==="above"&&rsi>=thresh);
              const ck=ca.id+"_"+alert.symbol+alert.interval;
              if(triggered&&lastCustomRef.current[ck]!==true){
                lastCustomRef.current[ck]=true;
                const desc=ca.description||("RSI "+(ca.condition==="below"?"por debajo de":"por encima de")+" "+thresh);
                sendAlert(alert.label,alert.interval,rsi,"custom_"+ca.condition,ema7,ema25,desc);
              }
              if(!triggered)lastCustomRef.current[ck]=false;
            });
          }
        };
        ws.onerror=()=>setAlerts(prev=>prev.map(a=>a.id===alert.id?{...a,active:false,error:true}:a));
        wsRefs.current[key]=ws;
        setAlerts(prev=>prev.map(a=>a.id===alert.id?{...a,active:true,error:false}:a));
      })
      .catch(()=>setAlerts(prev=>prev.map(a=>a.id===alert.id?{...a,active:false,error:true}:a)));
  }

  function stopAlert(alert){
    const key=alert.symbol+alert.interval;
    if(wsRefs.current[key])wsRefs.current[key].close();
    delete wsRefs.current[key];
    setAlerts(prev=>prev.map(a=>a.id===alert.id?{...a,active:false,rsi:null}:a));
  }

  function addAlert(){
    const newAlert={
      id:Date.now(),symbol:"BTCUSDT",label:"BTC/USD",interval:"1h",
      oversold:30,overbought:70,active:false,rsi:null
    };
    saveAlerts([...alerts,newAlert]);
  }

  function initDefaultAlerts(){
    const defaults=[
      {id:Date.now()+1,symbol:"BTCUSDT",label:"BTC/USD",interval:"1h",oversold:30,overbought:70,active:false,rsi:null},
      {id:Date.now()+2,symbol:"BTCUSDT",label:"BTC/USD",interval:"4h",oversold:30,overbought:70,active:false,rsi:null},
      {id:Date.now()+3,symbol:"BTCUSDT",label:"BTC/USD",interval:"1d",oversold:30,overbought:70,active:false,rsi:null},
      {id:Date.now()+4,symbol:"BTCUSDT",label:"BTC/USD",interval:"1w",oversold:30,overbought:70,active:false,rsi:null},
    ];
    saveAlerts(defaults);
  }

  function updateAlert(id,field,val){
    saveAlerts(alerts.map(a=>a.id===id?{...a,[field]:val}:a));
  }

  function removeAlert(alert){
    stopAlert(alert);
    saveAlerts(alerts.filter(a=>a.id!==alert.id));
  }

  return(
    <div>
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
        <div>
          <div style={{fontSize:11,color:"#f0b429",fontWeight:700,letterSpacing:1}}>ALERTAS RSI</div>
          <div style={{fontSize:9,color:"#555",marginTop:2}}>Notificaciones en tiempo real via Binance</div>
        </div>
        <button onClick={initDefaultAlerts} style={{background:"transparent",border:"1px solid #2a2a3a",color:"#555",padding:"8px 12px",borderRadius:6,fontSize:9,cursor:"pointer"}}>Resetear</button>
      </div>

      {/* Notificaciones permission */}
      <div style={{background:"#111118",border:"1px solid "+(notifPerm==="granted"?"rgba(0,255,136,.3)":"rgba(240,180,41,.3)"),borderRadius:8,padding:12,marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:10,fontWeight:700,color:notifPerm==="granted"?"#00ff88":"#f0b429"}}>
              {notifPerm==="granted"?"✓ Notificaciones activadas":"Notificaciones del navegador"}
            </div>
            <div style={{fontSize:9,color:"#555",marginTop:2}}>
              {notifPerm==="granted"
                ?"Recibiras alertas aunque la app este en segundo plano"
                :"Activa para recibir avisos cuando el RSI alcance los limites"}
            </div>
          </div>
          {notifPerm!=="granted"&&(
            <button onClick={requestNotif} style={{background:"#f0b429",color:"#0a0a0f",border:"none",padding:"6px 12px",borderRadius:5,fontSize:9,fontWeight:700,cursor:"pointer"}}>ACTIVAR</button>
          )}
          {notifPerm==="granted"&&(
            <button onClick={sendTestNotif} style={{background:"transparent",border:"1px solid #00ff88",color:"#00ff88",padding:"6px 10px",borderRadius:5,fontSize:9,cursor:"pointer"}}>Probar</button>
          )}
        </div>
      </div>

      {/* Alertas configuradas */}
      {alerts.length===0&&(
        <div style={{textAlign:"center",padding:"30px 20px",color:"#333",fontSize:10,lineHeight:2}}>
          Sin alertas. Pulsa + NUEVA ALERTA para monitorizar un activo.
        </div>
      )}
      {alerts.map(alert=>{
        const rsiColor=alert.rsi===null?"#555":alert.rsi<=alert.oversold?"#00ff88":alert.rsi>=alert.overbought?"#ff4444":"#e0e0e0";
        return(
          <div key={alert.id} style={{background:"#111118",border:"1px solid "+(alert.active?"rgba(0,255,136,.25)":alert.error?"rgba(255,68,68,.25)":"#1e1e2e"),borderRadius:8,padding:12,marginBottom:8}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:alert.active?"#00ff88":alert.error?"#ff4444":"#555"}}/>
                <span style={{fontSize:12,fontWeight:700,color:"#e0e0e0"}}>{alert.label}</span>
                <span style={{fontSize:10,color:"#f0b429",background:"rgba(240,180,41,.1)",padding:"2px 8px",borderRadius:4}}>
                  {alert.interval==="1h"?"1H":alert.interval==="4h"?"4H":alert.interval==="1d"?"DIARIO":"SEMANAL"}
                </span>
              </div>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:22,fontWeight:700,color:rsiColor}}>{alert.rsi!==null?alert.rsi:"--"}</div>
                <div style={{fontSize:7,color:"#444"}}>RSI 14</div>
              </div>
            </div>

            {/* Umbrales RSI */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:8}}>
              <div style={{background:"rgba(0,255,136,.06)",border:"1px solid rgba(0,255,136,.2)",borderRadius:6,padding:"8px",textAlign:"center"}}>
                <div style={{fontSize:8,color:"#00ff88",marginBottom:2}}>SOBREVENTA</div>
                <div style={{fontSize:18,fontWeight:700,color:"#00ff88"}}>{"< "+alert.oversold}</div>
                <div style={{fontSize:7,color:"#444"}}>RSI por debajo = compra</div>
              </div>
              <div style={{background:"rgba(255,68,68,.06)",border:"1px solid rgba(255,68,68,.2)",borderRadius:6,padding:"8px",textAlign:"center"}}>
                <div style={{fontSize:8,color:"#ff4444",marginBottom:2}}>SOBRECOMPRA</div>
                <div style={{fontSize:18,fontWeight:700,color:"#ff4444"}}>{"> "+alert.overbought}</div>
                <div style={{fontSize:7,color:"#444"}}>RSI por encima = venta</div>
              </div>
            </div>

            {/* RSI + EMA display */}
            <div style={{marginBottom:8}}>
              {alert.rsi!==null&&(
                <div style={{marginBottom:8}}>
                  <div style={{height:8,borderRadius:4,background:"#1e1e2e",position:"relative",overflow:"hidden"}}>
                    <div style={{position:"absolute",left:0,width:"30%",height:"100%",background:"rgba(0,255,136,.12)"}}/>
                    <div style={{position:"absolute",right:0,width:"30%",height:"100%",background:"rgba(255,68,68,.12)"}}/>
                    <div style={{
                      position:"absolute",
                      left:"calc("+Math.min(99,Math.max(1,alert.rsi))+"% - 4px)",
                      top:0,width:8,height:"100%",
                      background:rsiColor,borderRadius:2,
                      transition:"left .5s"
                    }}/>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:8,marginTop:3}}>
                    <span style={{color:"#00ff88"}}>SV &lt;{alert.oversold}</span>
                    <span style={{color:rsiColor,fontWeight:700}}>RSI {alert.rsi}</span>
                    <span style={{color:"#ff4444"}}>SC &gt;{alert.overbought}</span>
                  </div>
                </div>
              )}
              {/* EMA 7/25 */}
              <EmaDisplay data={emaData[alert.id]}/>
            </div>

            {/* Acciones */}
            <div style={{display:"flex",gap:6}}>
              {!alert.active?(
                <button onClick={()=>startAlert(alert)}
                  style={{flex:2,padding:"7px",background:"rgba(0,255,136,.1)",border:"1px solid #00ff88",color:"#00ff88",borderRadius:5,fontSize:9,fontWeight:700,cursor:"pointer"}}>
                  INICIAR MONITOR
                </button>
              ):(
                <button onClick={()=>stopAlert(alert)}
                  style={{flex:2,padding:"7px",background:"rgba(255,68,68,.1)",border:"1px solid #ff4444",color:"#ff4444",borderRadius:5,fontSize:9,fontWeight:700,cursor:"pointer"}}>
                  DETENER
                </button>
              )}
              <button onClick={()=>removeAlert(alert)}
                style={{flex:1,padding:"7px",background:"transparent",border:"1px solid #333",color:"#444",borderRadius:5,fontSize:9,cursor:"pointer"}}>
                Eliminar
              </button>
            </div>
            {alert.error&&<div style={{fontSize:8,color:"#ff4444",marginTop:5}}>Error de conexion. Verifica tu internet.</div>}
          </div>
        );
      })}

      {/* ── ALERTAS PERSONALIZADAS ── */}
      <div style={{background:"#111118",border:"1px solid rgba(136,170,255,.3)",borderRadius:8,padding:12,marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <div>
            <div style={{fontSize:10,color:"#88aaff",fontWeight:700}}>ALERTAS PERSONALIZADAS</div>
            <div style={{fontSize:8,color:"#555",marginTop:2}}>Notificaciones fuera de los umbrales estandar</div>
          </div>
          <button onClick={()=>setShowCustomForm(!showCustomForm)} style={{background:"#88aaff",color:"#0a0a0f",border:"none",padding:"6px 10px",borderRadius:5,fontSize:9,fontWeight:700,cursor:"pointer"}}>+ Nueva</button>
        </div>

        {showCustomForm&&(
          <div style={{background:"#0d0d16",borderRadius:6,padding:12,marginBottom:10,border:"1px solid rgba(136,170,255,.2)"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:8}}>
              <div>
                <div style={{fontSize:8,color:"#555",marginBottom:3}}>ACTIVO</div>
                <select value={customForm.symbol} onChange={e=>{
                  const s=SYMBOLS.find(function(x){return x.symbol===e.target.value;})||{label:e.target.value};
                  setCustomForm({...customForm,symbol:e.target.value,label:s.label||e.target.value});
                }} style={{...S.inp,padding:"5px",fontSize:9}}>
                  {SYMBOLS.map(s=><option key={s.symbol} value={s.symbol}>{s.label}</option>)}
                </select>
              </div>
              <div>
                <div style={{fontSize:8,color:"#555",marginBottom:3}}>TEMPORALIDAD</div>
                <select value={customForm.interval} onChange={e=>setCustomForm({...customForm,interval:e.target.value})} style={{...S.inp,padding:"5px",fontSize:9}}>
                  {INTERVALS.map(i=><option key={i.value} value={i.value}>{i.label}</option>)}
                </select>
              </div>
              <div>
                <div style={{fontSize:8,color:"#555",marginBottom:3}}>CONDICION</div>
                <select value={customForm.condition} onChange={e=>setCustomForm({...customForm,condition:e.target.value})} style={{...S.inp,padding:"5px",fontSize:9}}>
                  <option value="below">RSI por debajo de</option>
                  <option value="above">RSI por encima de</option>
                </select>
              </div>
              <div>
                <div style={{fontSize:8,color:customForm.condition==="below"?"#00ff88":"#ff4444",marginBottom:3}}>VALOR RSI</div>
                <input type="number" min="1" max="99" value={customForm.threshold}
                  onChange={e=>setCustomForm({...customForm,threshold:+e.target.value})}
                  style={{...S.inp,padding:"5px",fontSize:14,textAlign:"center",fontWeight:700}}/>
              </div>
            </div>
            <div style={{marginBottom:8}}>
              <div style={{fontSize:8,color:"#555",marginBottom:3}}>DESCRIPCION (opcional)</div>
              <input style={S.inp} placeholder="Ej: BTC en zona de decision diario"
                value={customForm.description}
                onChange={e=>setCustomForm({...customForm,description:e.target.value})}/>
            </div>
            <div style={{background:"rgba(136,170,255,.08)",border:"1px solid rgba(136,170,255,.2)",borderRadius:5,padding:"8px 10px",marginBottom:8,fontSize:9,color:"#88aaff"}}>
              Notificar cuando {customForm.label} en {INTERVALS.find(function(i){return i.value===customForm.interval;})||{label:customForm.interval}}.label tenga RSI {customForm.condition==="below"?"por debajo de":"por encima de"} {customForm.threshold}
            </div>
            <div style={{display:"flex",gap:6}}>
              <button onClick={addCustomAlert} style={{flex:2,padding:"8px",background:"#88aaff",color:"#0a0a0f",border:"none",borderRadius:5,fontSize:10,fontWeight:700,cursor:"pointer"}}>GUARDAR ALERTA</button>
              <button onClick={()=>setShowCustomForm(false)} style={{flex:1,padding:"8px",background:"transparent",border:"1px solid #333",color:"#555",borderRadius:5,fontSize:9,cursor:"pointer"}}>Cancelar</button>
            </div>
          </div>
        )}

        {customAlerts.length===0&&!showCustomForm&&(
          <div style={{fontSize:9,color:"#333",textAlign:"center",padding:"10px 0"}}>
            Sin alertas personalizadas. Pulsa + Nueva para crear una.
          </div>
        )}

        {customAlerts.map(ca=>{
          const itvLabel=(INTERVALS.find(function(i){return i.value===ca.interval;})||{label:ca.interval}).label;
          return(
            <div key={ca.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 10px",background:"#0d0d16",borderRadius:6,marginBottom:4,border:"1px solid rgba(136,170,255,.15)"}}>
              <div>
                <span style={{fontSize:10,fontWeight:700,color:"#88aaff"}}>{ca.label}</span>
                <span style={{fontSize:9,color:"#f0b429",marginLeft:6}}>{itvLabel}</span>
                <div style={{fontSize:9,color:ca.condition==="below"?"#00ff88":"#ff4444",marginTop:2}}>
                  RSI {ca.condition==="below"?"menores de":"mayores de"} {ca.threshold}
                  {ca.description&&<span style={{color:"#555"}}> · {ca.description}</span>}
                </div>
              </div>
              <button onClick={()=>saveCustomAlerts(customAlerts.filter(function(x){return x.id!==ca.id;}))}
                style={{background:"transparent",border:"none",color:"#333",cursor:"pointer",fontSize:16}}>✕</button>
            </div>
          );
        })}

        {customAlerts.length>0&&(
          <div style={{fontSize:8,color:"#444",marginTop:6,textAlign:"center"}}>
            Las alertas personalizadas se comprueban cuando el monitor estandar esta activo
          </div>
        )}
      </div>

      {/* Log de alertas disparadas */}
      {logs.length>0&&(
        <div style={{background:"#111118",border:"1px solid #1e1e2e",borderRadius:8,padding:12,marginTop:4}}>
          <div style={{fontSize:9,color:"#f0b429",fontWeight:700,marginBottom:8}}>HISTORIAL DE ALERTAS</div>
          {logs.slice(0,20).map(log=>(
            <div key={log.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 0",borderBottom:"1px solid #1a1a2a",fontSize:9}}>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <span style={{fontSize:13}}>{log.type==="oversold"?"🟢":"🔴"}</span>
                <div>
                  <span style={{fontWeight:700,color:"#e0e0e0"}}>{log.label}</span>
                  <span style={{color:"#555",marginLeft:5}}>{log.interval}</span>
                  <span style={{color:log.type==="oversold"?"#00ff88":"#ff4444",marginLeft:5,fontWeight:700}}>
                    RSI {log.rsi} — {log.type==="oversold"?"SOBREVENTA":"SOBRECOMPRA"}
                  </span>
                </div>
              </div>
              <span style={{color:"#444",fontSize:8}}>{log.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// - GOAL TRACKER -
function GoalTracker({h0Total,ethT,actPnl,xhist,S}){
  const GOAL=7641; // euros = approx USD (close enough for tracking)
  // Total recovered = positive results from xhist (new closes via app)
  const recovered=xhist.reduce((a,h)=>a+(h.result>0?h.result:0),0);
  // Also count actPnl if positive (open positions in profit)
  const potentialExtra=actPnl>0?actPnl:0;
  const totalRecovered=parseFloat((recovered).toFixed(2));
  const pct=Math.min(100,Math.round(totalRecovered/GOAL*100));
  const remaining=parseFloat((GOAL-totalRecovered).toFixed(2));

  // Milestone messages
  let milestone="";
  if(pct>=100)milestone="OBJETIVO COMPLETADO";
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
          <div style={{fontSize:10,color:"#f0b429",fontWeight:700,letterSpacing:1}}>OBJETIVO: RECUPERAR $7.641</div>
          <div style={{fontSize:9,color:"#555",marginTop:2}}>Perdidas de octubre 2025</div>
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
          <span style={{color:"#00ff88"}}>Recuperado: +${totalRecovered.toLocaleString()}</span>
          <span style={{color:"#ff4444"}}>Restante: ${remaining.toLocaleString()}</span>
        </div>
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:10}}>
        <div style={{background:"#0d0d16",borderRadius:6,padding:"8px",textAlign:"center"}}>
          <div style={{fontSize:16,fontWeight:700,color:"#00ff88"}}>${totalRecovered.toFixed(0)}</div>
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

    // Calcular ratio riesgo/beneficio
    const risk=p.sl?Math.abs(p.entry-p.sl)/p.entry*100:null;
    const reward=p.tp?Math.abs(p.tp-p.entry)/p.entry*100:null;
    const ratio=risk&&reward?reward/risk:null;

    // Distancia al TP en %
    const distToTP=p.tp?Math.abs(currentPrice-p.tp)/Math.abs(p.tp-p.entry)*100:null;
    const pnlPct=p.capital>0?pnl/p.capital*100:0;

    const tips=[];

    // Ratio extremo
    if(ratio&&ratio>20){
      tips.push({
        type:"warn",
        icon:"⚠",
        text:"Ratio "+ratio.toFixed(0)+":1 es muy alto. Considera tomar beneficio parcial (25-50%) en niveles intermedios en lugar de esperar al TP completo."
      });
    }else if(ratio&&ratio>10){
      tips.push({
        type:"info",
        icon:"💡",
        text:"Ratio "+ratio.toFixed(1)+":1 es excelente. Cuando llegues al 50% del recorrido, mueve el SL a breakeven para asegurar la operacion."
      });
    }else if(ratio&&ratio<2&&!isBE){
      tips.push({
        type:"danger",
        icon:"🔴",
        text:"Ratio "+ratio.toFixed(1)+":1 es insuficiente. El riesgo no justifica el beneficio potencial. Considera ajustar el TP o cerrar."
      });
    }

    // SL muy alejado
    if(risk&&risk>5&&!isBE){
      tips.push({
        type:"warn",
        icon:"⚠",
        text:"SL al "+risk.toFixed(1)+"% de la entrada. Esto representa un riesgo alto. Asegurate de que el nivel tiene justificacion tecnica (soporte/resistencia clave)."
      });
    }

    // Cerca del TP - sugerir parciales
    if(distToTP!==null&&distToTP<30&&pnl>0){
      const partialProfit=pnl*0.5;
      tips.push({
        type:"good",
        icon:"🎯",
        text:"Estas al "+Math.round(100-distToTP)+"% del recorrido al TP. Considera cerrar el 30-50% ahora ("+fmtNum(partialProfit)+") y dejar correr el resto con SL en BE."
      });
    }

    // Beneficio flotante importante
    if(pnlPct>15&&!isBE){
      tips.push({
        type:"good",
        icon:"💰",
        text:"Llevas +"+pnlPct.toFixed(1)+"% sobre el capital. Mueve el SL a breakeven ahora para proteger la ganancia y operar sin riesgo."
      });
    }

    // En BE con TP lejano
    if(isBE&&p.tp&&distToTP!==null&&distToTP>50){
      tips.push({
        type:"info",
        icon:"🧘",
        text:"SL en breakeven. Riesgo cero. Deja trabajar la posicion sin intervenir. La paciencia es tu ventaja ahora."
      });
    }

    // Sin TP definido
    if(!p.tp||p.tp===0){
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


function ProfileAnalysis({ps,pats,jnl,hist,xhist,sc,S}){
  const summary=generateProfileSummary(ps,pats,jnl,hist,xhist,sc);
  return(
    <div style={{...S.card,marginBottom:10,border:"1px solid rgba(240,180,41,.2)"}}>
      <div style={{fontSize:10,color:"#f0b429",fontWeight:700,marginBottom:10}}>ANALISIS DE TU TRADING</div>
      {summary.map((line,i)=>{
        const isGood=line.includes("Excelente")||line.includes("100%")||line.includes("solida")||line.includes("Bien")||line.includes("profesional")||line.includes("fiable")||line.includes("No hay")||line.includes("Por encima");
        const isBad=line.includes("Alerta")||line.includes("cuestan")||line.includes("destructivo")||line.includes("Solo ganas")||line.includes("vacio");
        const icon=isGood?"✓":isBad?"⚠":"→";
        const col=isGood?"#00ff88":isBad?"#ff4444":"#f0b429";
        return(
          <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",padding:"7px 0",borderBottom:i<summary.length-1?"1px solid #1a1a2a":"none"}}>
            <span style={{fontSize:13,flexShrink:0,color:col,fontWeight:700}}>{icon}</span>
            <span style={{fontSize:10,color:"#888",lineHeight:1.6}}>{line}</span>
          </div>
        );
      })}
      <div style={{marginTop:8,paddingTop:8,borderTop:"1px solid #1a1a2a",fontSize:8,color:"#444"}}>
        Analisis en tiempo real segun operaciones y diario
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
          <div style={{fontSize:15,fontWeight:700,color:isBE?"#00ff88":"#ff4444"}}>{isBE?"$0.00":fmtNum(-mL)}</div>
        </div>
        <div style={{fontSize:9,color:"#555",marginTop:4}}>SL respetado +1</div>
      </button>
      <button onClick={()=>closePos(p,"tp")} style={{background:"rgba(0,255,136,.1)",border:"1px solid #00ff88",borderRadius:8,padding:"12px 14px",cursor:"pointer",textAlign:"left",marginBottom:8,width:"100%",display:"block"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:11,color:"#00ff88",fontWeight:700,marginBottom:3}}>LLEGO AL TAKE PROFIT</div>
            <div style={{fontSize:9,color:"#555"}}>{"TP: "+(p.tp?fmtP(p.tp):"--")}</div>
          </div>
          <div style={{fontSize:15,fontWeight:700,color:"#00ff88"}}>{mG?fmtNum(mG):"--"}</div>
        </div>
        <div style={{fontSize:9,color:"#555",marginTop:4}}>TP automatico +1</div>
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

function ModalPostCierre({data,jnl,SJ,setModal,fmtNum,S,TC}){
  const[form,setForm]=useState({text:"",emoji:"💪",type:"analysis"});
  const typeColor=data.type==="tp"?"#00ff88":data.isBE?"#f0b429":"#ff6600";
  const typeLabel=data.type==="tp"?"Take Profit":data.isBE?"Breakeven":"Stop Loss / Cierre";
  return(
    <div style={S.modal}><div style={S.mc}>
      <div style={{textAlign:"center",marginBottom:14}}>
        <div style={{fontSize:26,marginBottom:4}}>{form.emoji}</div>
        <div style={{fontSize:13,fontWeight:700,color:typeColor}}>{typeLabel}</div>
        <div style={{fontSize:10,color:"#555",marginTop:3}}>{data.asset} - {data.result===0?"$0.00":fmtNum(data.result)}</div>
      </div>
      <div style={{padding:"7px 10px",background:"rgba(240,180,41,.05)",borderRadius:5,border:"1px solid rgba(240,180,41,.2)",marginBottom:12,fontSize:9,color:"#888"}}>
        Documenta este cierre para sumar puntos al score
      </div>
      <div style={{fontSize:9,color:"#555",marginBottom:3}}>QUE APRENDISTE?</div>
      <textarea style={{...S.inp,height:75,resize:"none",marginBottom:10}} value={form.text} onChange={e=>setForm(f=>({...f,text:e.target.value}))}/>
      <div style={{fontSize:9,color:"#555",marginBottom:5}}>EMOCION</div>
      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>
        {["😰","😅","💪","🎯","😤","🧘","😊","😬"].map(em=>(
          <button key={em} onClick={()=>setForm(f=>({...f,emoji:em}))} style={{fontSize:17,background:form.emoji===em?"rgba(240,180,41,.15)":"transparent",border:"1px solid "+(form.emoji===em?"#f0b429":"#2a2a3a"),borderRadius:5,padding:"3px 6px",cursor:"pointer"}}>{em}</button>
        ))}
      </div>
      <div style={{fontSize:9,color:"#555",marginBottom:5}}>TIPO</div>
      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12}}>
        {[["win","VICTORIA +2","#00ff88"],["lesson","LECCION +1.5","#f0b429"],["analysis","ANALISIS +1","#888"],["mistake","ERROR","#ff4444"]].map(([v,l,c])=>(
          <button key={v} onClick={()=>setForm(f=>({...f,type:v}))} style={{padding:"4px 9px",borderRadius:4,fontSize:9,fontWeight:700,border:"1px solid "+c,background:form.type===v?c+"22":"transparent",color:c,cursor:"pointer"}}>{l}</button>
        ))}
      </div>
      <div style={{display:"flex",gap:7}}>
        <button onClick={()=>{
          if(form.text){
            SJ([{...form,id:Date.now(),date:new Date().toLocaleDateString("es-ES"),linkedClose:data.type},...jnl]);
          }
          setModal(m=>({...m,postData:null}));
        }} style={{...S.btn(true),flex:1,padding:8}}>GUARDAR (+SCORE)</button>
        <button onClick={()=>setModal(m=>({...m,postData:null}))} style={{...S.btn(false),flex:1}}>SALTAR</button>
      </div>
    </div></div>
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

function HorariosTab({horarios,SH,S,fmtNum}){
  const DOW_FULL=["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
  const DOW_SHORT=["Dom","Lun","Mar","Mie","Jue","Vie","Sab"];
  const DOW_COL={"Lunes":"#f0b429","Martes":"#88aaff","Miercoles":"#ff88cc","Jueves":"#00ff88","Viernes":"#ff8844","Sabado":"#aa88ff","Domingo":"#888"};

  const[showForm,setShowForm]=useState(false);
  const[form,setForm]=useState({
    hora:"19:30",activo:"BTC/USDT",
    tendenciaInicio:"",tendenciaFin:"",
    resultado:"",notas:""
  });

  function getFecha(){
    return new Date().toLocaleDateString("es-ES");
  }
  function getDOW(fechaStr){
    if(!fechaStr)return"";
    const p=fechaStr.split("/");
    if(p.length!==3)return"";
    const d=new Date(+p[2],+p[1]-1,+p[0]);
    return DOW_FULL[d.getDay()]||"";
  }
  function getFechaLarga(fechaStr){
    if(!fechaStr)return fechaStr;
    const p=fechaStr.split("/");
    if(p.length!==3)return fechaStr;
    const d=new Date(+p[2],+p[1]-1,+p[0]);
    const meses=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
    return DOW_FULL[d.getDay()]+" "+p[0]+" de "+meses[d.getMonth()]+" "+p[2];
  }

  function guardar(){
    if(!form.resultado){alert("Selecciona el resultado: Acierto, Fallo o Pendiente");return;}
    const fecha=getFecha();
    const entry={
      ...form,
      id:Date.now(),
      fecha:fecha,
      diaSemana:getDOW(fecha)
    };
    SH([entry,...horarios]);
    setForm({hora:"19:30",activo:"BTC/USDT",tendenciaInicio:"",tendenciaFin:"",resultado:"",notas:""});
    setShowForm(false);
  }

  // Agrupar por fecha para la vista de calendario
  const byFecha={};
  horarios.forEach(h=>{
    const k=h.fecha||"?";
    if(!byFecha[k])byFecha[k]={fecha:k,dow:h.diaSemana||getDOW(k),entries:[]};
    byFecha[k].entries.push(h);
  });
  const fechasOrdenadas=Object.keys(byFecha).sort((a,b)=>{
    const pa=a.split("/").reverse().join("");
    const pb=b.split("/").reverse().join("");
    return pb.localeCompare(pa);
  });

  // Stats por dia de semana
  const statsDOW={};
  horarios.forEach(h=>{
    const d=h.diaSemana||getDOW(h.fecha)||"?";
    if(!statsDOW[d])statsDOW[d]={total:0,aciertos:0,fallos:0};
    statsDOW[d].total++;
    if(h.resultado==="Acierto")statsDOW[d].aciertos++;
    if(h.resultado==="Fallo")statsDOW[d].fallos++;
  });

  return(
    <div>
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
        <div>
          <div style={{fontSize:11,color:"#f0b429",fontWeight:700,letterSpacing:1}}>PATRONES HORARIOS</div>
          <div style={{fontSize:9,color:"#555",marginTop:2}}>Registra el cambio de tendencia 19:30-20:00</div>
        </div>
        <button
          onClick={()=>setShowForm(!showForm)}
          style={{background:"#f0b429",color:"#0a0a0f",border:"none",padding:"8px 14px",borderRadius:6,fontSize:10,fontWeight:700,cursor:"pointer"}}
        >
          {showForm?"CANCELAR":"+ REGISTRAR HOY"}
        </button>
      </div>

      {/* Info patron */}
      <div style={{background:"#0d0d16",border:"1px solid rgba(240,180,41,.2)",borderRadius:8,padding:12,marginBottom:12}}>
        <div style={{fontSize:9,color:"#f0b429",fontWeight:700,marginBottom:4}}>PATRON OBSERVADO</div>
        <div style={{fontSize:10,color:"#666",lineHeight:1.7}}>
          A las <b style={{color:"#f0b429"}}>19:30-20:00</b> el mercado tiende a cambiar de tendencia.
          Registra cada dia para descubrir en que dias de la semana se cumple mas.
        </div>
      </div>

      {/* Formulario */}
      {showForm&&(
        <div style={{background:"#111118",border:"1px solid #f0b429",borderRadius:8,padding:14,marginBottom:14}}>
          <div style={{fontSize:10,color:"#f0b429",fontWeight:700,marginBottom:10}}>
            REGISTRAR HOY — {getFechaLarga(getFecha())}
          </div>

          {/* Hora y activo */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
            <div>
              <div style={{fontSize:9,color:"#555",marginBottom:3}}>HORA EXACTA</div>
              <input style={S.inp} type="time" value={form.hora}
                onChange={e=>setForm({...form,hora:e.target.value})}/>
            </div>
            <div>
              <div style={{fontSize:9,color:"#555",marginBottom:3}}>ACTIVO</div>
              <input style={S.inp} value={form.activo}
                onChange={e=>setForm({...form,activo:e.target.value})}/>
            </div>
          </div>

          {/* Tendencia inicio */}
          <div style={{marginBottom:10}}>
            <div style={{fontSize:9,color:"#555",marginBottom:5}}>TENDENCIA ANTES DEL CAMBIO</div>
            <div style={{display:"flex",gap:6}}>
              {["Alcista","Bajista","Lateral"].map(d=>(
                <button key={d} onClick={()=>setForm({...form,tendenciaInicio:d})}
                  style={{flex:1,padding:"8px 4px",borderRadius:5,fontSize:9,fontWeight:700,cursor:"pointer",
                    border:"1px solid "+(d==="Alcista"?"#00ff88":d==="Bajista"?"#ff4444":"#555"),
                    background:form.tendenciaInicio===d?(d==="Alcista"?"rgba(0,255,136,.2)":d==="Bajista"?"rgba(255,68,68,.2)":"rgba(136,136,136,.2)"):"transparent",
                    color:d==="Alcista"?"#00ff88":d==="Bajista"?"#ff4444":"#888"
                  }}>{d}</button>
              ))}
            </div>
          </div>

          {/* Tendencia fin */}
          <div style={{marginBottom:10}}>
            <div style={{fontSize:9,color:"#555",marginBottom:5}}>GIRO A (despues del cambio)</div>
            <div style={{display:"flex",gap:6}}>
              {["Alcista","Bajista","Lateral"].map(d=>(
                <button key={d} onClick={()=>setForm({...form,tendenciaFin:d})}
                  style={{flex:1,padding:"8px 4px",borderRadius:5,fontSize:9,fontWeight:700,cursor:"pointer",
                    border:"1px solid "+(d==="Alcista"?"#00ff88":d==="Bajista"?"#ff4444":"#555"),
                    background:form.tendenciaFin===d?(d==="Alcista"?"rgba(0,255,136,.2)":d==="Bajista"?"rgba(255,68,68,.2)":"rgba(136,136,136,.2)"):"transparent",
                    color:d==="Alcista"?"#00ff88":d==="Bajista"?"#ff4444":"#888"
                  }}>{d}</button>
              ))}
            </div>
          </div>

          {/* Resultado */}
          <div style={{marginBottom:10}}>
            <div style={{fontSize:9,color:"#555",marginBottom:5}}>RESULTADO DEL PATRON *</div>
            <div style={{display:"flex",gap:6}}>
              {[["Acierto","#00ff88"],["Fallo","#ff4444"],["Pendiente","#888"]].map(([r,col])=>(
                <button key={r} onClick={()=>setForm({...form,resultado:r})}
                  style={{flex:1,padding:"10px 4px",borderRadius:5,fontSize:10,fontWeight:700,cursor:"pointer",
                    border:"2px solid "+(form.resultado===r?col:"#2a2a3a"),
                    background:form.resultado===r?col+"22":"transparent",
                    color:col
                  }}>{r}</button>
              ))}
            </div>
          </div>

          {/* Notas */}
          <div style={{marginBottom:12}}>
            <div style={{fontSize:9,color:"#555",marginBottom:3}}>NOTAS (opcional)</div>
            <input style={S.inp} placeholder="Que observaste, como fue el movimiento..."
              value={form.notas} onChange={e=>setForm({...form,notas:e.target.value})}/>
          </div>

          <button
            onClick={guardar}
            style={{
              width:"100%",padding:"12px",borderRadius:6,fontSize:12,fontWeight:700,cursor:"pointer",
              background:form.resultado?"#f0b429":"#2a2a3a",
              color:form.resultado?"#0a0a0f":"#555",
              border:"none"
            }}
          >
            {form.resultado?"GUARDAR OBSERVACION":"Selecciona el resultado primero"}
          </button>
        </div>
      )}

      {/* Stats por dia de semana */}
      {Object.keys(statsDOW).length>0&&(
        <div style={{background:"#111118",border:"1px solid #1e1e2e",borderRadius:8,padding:12,marginBottom:12}}>
          <div style={{fontSize:9,color:"#f0b429",fontWeight:700,marginBottom:10,letterSpacing:1}}>
            ESTADISTICAS POR DIA DE LA SEMANA
          </div>
          {["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"]
            .filter(d=>statsDOW[d])
            .map(dow=>{
              const s=statsDOW[dow];
              const rate=s.total>0?Math.round(s.aciertos/s.total*100):0;
              const col=DOW_COL[dow]||"#888";
              return(
                <div key={dow} style={{marginBottom:8,padding:"8px 10px",background:"#0d0d16",borderRadius:6,border:"1px solid "+col+"33"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                    <span style={{fontSize:11,fontWeight:700,color:col}}>{dow}</span>
                    <div style={{display:"flex",gap:12,alignItems:"center"}}>
                      <span style={{fontSize:9,color:"#00ff88"}}>{s.aciertos} ok</span>
                      <span style={{fontSize:9,color:"#ff4444"}}>{s.fallos} fallo</span>
                      <span style={{fontSize:16,fontWeight:700,color:rate>=70?"#00ff88":rate>=50?"#f0b429":"#ff4444"}}>{rate}%</span>
                    </div>
                  </div>
                  <div style={{height:5,borderRadius:3,background:"#1e1e2e",overflow:"hidden",display:"flex"}}>
                    <div style={{width:rate+"%",background:"#00ff88",transition:"width .5s"}}/>
                    <div style={{width:(s.total>0?Math.round(s.fallos/s.total*100):0)+"%",background:"#ff4444"}}/>
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* Historial agrupado por fecha */}
      {fechasOrdenadas.length===0?(
        <div style={{textAlign:"center",padding:"40px 20px",color:"#333",fontSize:10,lineHeight:2}}>
          Sin registros todavia.<br/>
          Pulsa + REGISTRAR HOY cada dia que observes el patron.
        </div>
      ):(
        <div>
          <div style={{fontSize:9,color:"#f0b429",fontWeight:700,marginBottom:8,letterSpacing:1}}>
            HISTORIAL POR DIA ({horarios.length} registros)
          </div>
          {fechasOrdenadas.map(fecha=>{
            const grupo=byFecha[fecha];
            const nAciertos=grupo.entries.filter(e=>e.resultado==="Acierto").length;
            const nFallos=grupo.entries.filter(e=>e.resultado==="Fallo").length;
            const col=DOW_COL[grupo.dow]||"#888";
            return(
              <div key={fecha} style={{background:"#111118",border:"1px solid #1e1e2e",borderRadius:8,marginBottom:8,overflow:"hidden"}}>
                {/* Cabecera del dia */}
                <div style={{background:"#0d0d16",padding:"8px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <span style={{fontSize:12,fontWeight:700,color:col}}>{grupo.dow}</span>
                    <span style={{fontSize:10,color:"#666",marginLeft:8}}>{getFechaLarga(fecha)}</span>
                  </div>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    {nAciertos>0&&<span style={{fontSize:9,color:"#00ff88",fontWeight:700}}>{nAciertos} ok</span>}
                    {nFallos>0&&<span style={{fontSize:9,color:"#ff4444",fontWeight:700}}>{nFallos} fallo</span>}
                  </div>
                </div>
                {/* Entradas del dia */}
                {grupo.entries.map(h=>(
                  <div key={h.id} style={{padding:"8px 12px",borderBottom:"1px solid #1a1a2a"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div style={{display:"flex",gap:8,alignItems:"center"}}>
                        <span style={{fontSize:13,fontWeight:700,color:"#f0b429"}}>{h.hora}</span>
                        <span style={{fontSize:9,color:"#e0e0e0"}}>{h.activo}</span>
                        {h.tendenciaInicio&&h.tendenciaFin&&(
                          <span style={{fontSize:9,color:"#555"}}>
                            <span style={{color:h.tendenciaInicio==="Alcista"?"#00ff88":"#ff4444"}}>{h.tendenciaInicio}</span>
                            <span style={{color:"#444"}}> → </span>
                            <span style={{color:h.tendenciaFin==="Alcista"?"#00ff88":"#ff4444"}}>{h.tendenciaFin}</span>
                          </span>
                        )}
                      </div>
                      <div style={{display:"flex",gap:8,alignItems:"center"}}>
                        <span style={{
                          fontSize:9,fontWeight:700,
                          color:h.resultado==="Acierto"?"#00ff88":h.resultado==="Fallo"?"#ff4444":"#888",
                          border:"1px solid "+(h.resultado==="Acierto"?"#00ff8844":h.resultado==="Fallo"?"#ff444444":"#55544"),
                          padding:"2px 7px",borderRadius:3
                        }}>{h.resultado}</span>
                        <button onClick={()=>SH(horarios.filter(x=>x.id!==h.id))}
                          style={{background:"transparent",border:"none",color:"#333",cursor:"pointer",fontSize:12,lineHeight:1}}>✕</button>
                      </div>
                    </div>
                    {h.notas&&<div style={{fontSize:9,color:"#444",marginTop:4}}>{h.notas}</div>}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ModalPos({form,editId,currentPos,PM,SPos,setModal,fmtNum,S}){
  const[f,setF]=useState(form);
  function doSavePosForm(){
    if(!f.asset||!f.capital||!f.entry)return;
    const obj={...f,id:editId||Date.now(),capital:+f.capital,entry:+f.entry,sl:+f.sl,tp:+f.tp,be:false};
    const nv=editId?currentPos.map(x=>x.id===editId?obj:x):[...currentPos,obj];
    SPos(nv);
    setModal(m=>({...m,pos:false,posForm:null,editPosId:null}));
  }
  const e2=+f.entry,sl=+f.sl,tp2=+f.tp,cap=+f.capital;
  const hasCalc=f.entry&&f.sl&&f.tp&&f.capital;
  const risk=hasCalc?cap*Math.abs(e2-sl)/e2:0;
  const reward=hasCalc?cap*Math.abs(tp2-e2)/e2:0;
  const ratio=risk>0?reward/risk:0;
  return(
    <div style={S.modal}><div style={S.mc}>
      <div style={{fontSize:12,color:"#f0b429",fontWeight:700,marginBottom:14}}>{editId?"EDITAR OPERACION":"NUEVA OPERACION"}</div>
      <div style={{marginBottom:9}}>
        <div style={S.lbl}>ACTIVO</div>
        <input style={S.inp} placeholder="BTC/USDT, AAPL, SOL/USD..." value={f.asset} onChange={e=>setF({...f,asset:e.target.value.toUpperCase()})}/>
      </div>
      <div style={{marginBottom:9}}>
        <div style={S.lbl}>DIRECCION</div>
        <div style={{display:"flex",gap:7}}>
          {["Short","Long"].map(d=>(
            <button key={d} onClick={()=>setF({...f,dir:d})} style={{flex:1,padding:"7px",borderRadius:4,fontSize:10,fontWeight:700,border:"1px solid "+(d==="Short"?"#ff4444":"#00ff88"),background:f.dir===d?(d==="Short"?"rgba(255,68,68,.15)":"rgba(0,255,136,.15)"):"transparent",color:d==="Short"?"#ff4444":"#00ff88",cursor:"pointer"}}>{d.toUpperCase()}</button>
          ))}
        </div>
      </div>
      {[["CAPITAL ($)","capital","2000"],["PRECIO ENTRADA","entry","70800"],["PRECIO STOP LOSS","sl","71775"],["PRECIO TAKE PROFIT","tp","44000"]].map(([l,k,ph])=>(
        <div key={k} style={{marginBottom:9}}>
          <div style={S.lbl}>{l}</div>
          <input style={S.inp} type="number" placeholder={ph} value={f[k]||""} onChange={e=>setF({...f,[k]:e.target.value})}/>
        </div>
      ))}
      {hasCalc&&(
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
          <div style={{background:"rgba(255,68,68,.06)",borderRadius:4,padding:"8px 10px"}}>
            <div style={{fontSize:8,color:"#555",marginBottom:2}}>SL - PERDIDA MAXIMA</div>
            <div style={{fontSize:11,fontWeight:700,color:"#ff4444"}}>{fmtNum(-risk)}</div>
          </div>
          <div style={{background:"rgba(0,255,136,.06)",borderRadius:4,padding:"8px 10px"}}>
            <div style={{fontSize:8,color:"#555",marginBottom:2}}>TP - GANANCIA MAXIMA</div>
            <div style={{fontSize:11,fontWeight:700,color:"#00ff88"}}>{fmtNum(reward)}</div>
          </div>
          <div style={{gridColumn:"1/-1",textAlign:"center",fontSize:10,color:ratio>=3?"#00ff88":ratio>=2?"#f0b429":"#ff4444",fontWeight:700}}>
            {"Ratio R:B 1:"+ratio.toFixed(1)+" "+(ratio>=3?"Solido":ratio>=2?"Aceptable":"Insuficiente")}
          </div>
        </div>
      )}
      <div style={{display:"flex",gap:7,marginTop:12}}>
        <button onClick={doSavePosForm} style={{...S.btn(true),flex:1,padding:8}}>{editId?"GUARDAR CAMBIOS":"ANADIR"}</button>
        <button onClick={()=>setModal(m=>({...m,pos:false,posForm:null,editPosId:null}))} style={{...S.btn(false),flex:1}}>CANCELAR</button>
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

async function getBinanceData(selAsset,selTF,ASSETS,TFS){
  var klines=[],ticker={};
  try{
    var r1=await fetch("https://api.binance.com/api/v3/klines?symbol="+selAsset+"&interval="+selTF+"&limit=100");
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
  return{asset:assetLabel,tf:tfLabel,price:price.toFixed(2),change24h:ticker.priceChangePercent,
    rsi:rsi,ema7:ema7?ema7.toFixed(2):null,ema25:ema25?ema25.toFixed(2):null,ema50:ema50?ema50.toFixed(2):null,
    emaRelation:emaRel,trend:trend,volRatio:volRatio,high24h:ticker.highPrice,low24h:ticker.lowPrice};
}
