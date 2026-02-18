// ===== LOGO DYNAMIC LOADING =====
function updateLogo(){
    let logo=localStorage.getItem('logoData');
    if(logo){
        const brandLogo=document.querySelector('.brand-logo');
        if(brandLogo){
            brandLogo.innerHTML='';
            let img=document.createElement('img');
            img.src=logo;
            img.style.cssText='width:100%;height:100%;border-radius:inherit;object-fit:cover';
            brandLogo.appendChild(img);
        }
    }
}

function updateDisplayName(){
    let displayName=localStorage.getItem('displayName');
    if(displayName&&document.getElementById('headerBrandName')){
        document.getElementById('headerBrandName').textContent=displayName;
    }
}

window.addEventListener('DOMContentLoaded',function(){
    updateLogo();
    updateDisplayName();
});

// ===== DATA =====
const ladangs=[
    {name:'Ladang Gua Musang',loc:'Gua Musang, Kelantan',units:[
        {id:'FG-001',name:'FG-Unit-001',on:true,batt:87,armed:true,alert:'Motion — Zone A'},
        {id:'FG-002',name:'FG-Unit-002',on:true,batt:62,armed:true,alert:'Motion — Zone B'},
        {id:'FG-003',name:'FG-Unit-003',on:false,batt:12,armed:false,alert:'Device offline'},
    ]},
    {name:'Ladang Jeli',loc:'Jeli, Kelantan',units:[
        {id:'FG-004',name:'FG-Unit-004',on:true,batt:95,armed:true,alert:'All clear'},
        {id:'FG-005',name:'FG-Unit-005',on:true,batt:78,armed:false,alert:'Siren test OK'},
    ]}
];

const activities=[
    {ic:'bi-exclamation-triangle-fill',cls:'ar',msg:'Motion detected — Zone A',unit:'FG-Unit-001',ladang:'Ldg Gua Musang',time:new Date(Date.now()-120000)},
    {ic:'bi-exclamation-triangle-fill',cls:'ar',msg:'Motion detected — Zone B',unit:'FG-Unit-002',ladang:'Ldg Gua Musang',time:new Date(Date.now()-600000)},
    {ic:'bi-wifi-off',cls:'aa',msg:'Device offline — Battery low',unit:'FG-Unit-003',ladang:'Ldg Gua Musang',time:new Date(Date.now()-3600000)},
    {ic:'bi-check-circle-fill',cls:'ag',msg:'System armed successfully',unit:'FG-Unit-004',ladang:'Ldg Jeli',time:new Date(Date.now()-900000)},
    {ic:'bi-speaker-fill',cls:'ab',msg:'Siren test completed — All OK',unit:'FG-Unit-005',ladang:'Ldg Jeli',time:new Date(Date.now()-1800000)},
];

const chartData={
    daily:{labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],det:[8,12,5,15,9,3,7],alerts:[2,4,1,6,3,0,2],resolved:[2,3,1,5,3,0,1]},
    weekly:{labels:['W1','W2','W3','W4'],det:[42,58,35,47],alerts:[12,18,8,14],resolved:[10,16,7,12]},
    monthly:{labels:['Jan','Feb','Mac','Apr','Mei','Jun'],det:[180,210,165,220,195,140],alerts:[45,62,38,58,50,32],resolved:[40,55,35,52,45,28]}
};

// ===== RENDER =====
function timeAgo(d){const s=Math.floor((Date.now()-d)/1000);if(s<60)return s+'s';if(s<3600)return Math.floor(s/60)+'m';if(s<86400)return Math.floor(s/3600)+'h';return Math.floor(s/86400)+'d'}

function renderDate(){
    const d=new Date(),days=['Ahad','Isnin','Selasa','Rabu','Khamis','Jumaat','Sabtu'],
    months=['Jan','Feb','Mac','Apr','Mei','Jun','Jul','Ogo','Sep','Okt','Nov','Dis'];
    document.getElementById('wDate').textContent=`${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function renderChart(period='daily'){
    const d=chartData[period],area=document.getElementById('chartArea');
    const max=Math.max(...d.det,...d.alerts,...d.resolved,1);
    area.innerHTML=d.labels.map((l,i)=>{
        const hD=Math.round(d.det[i]/max*130),hA=Math.round(d.alerts[i]/max*130),hR=Math.round(d.resolved[i]/max*130);
        return`<div class="chart-bar-wrap">
            <div class="chart-bar-val">${d.det[i]}</div>
            <div style="display:flex;gap:3px;align-items:flex-end;width:100%;height:140px">
                <div class="chart-bar b-blue" style="height:${hD}px;flex:1"></div>
                <div class="chart-bar b-red" style="height:${hA}px;flex:1"></div>
                <div class="chart-bar b-green" style="height:${hR}px;flex:1"></div>
            </div>
            <div class="chart-bar-lbl">${l}</div>
        </div>`;
    }).join('');
}

function setFilter(p,el){
    document.querySelectorAll('.cf-item').forEach(e=>e.classList.remove('active'));
    el.classList.add('active');
    renderChart(p);
}

function renderActivity(){
    document.getElementById('actFeed').innerHTML=activities.slice(0,5).map(a=>`
        <div class="act-item">
            <div class="act-ic ${a.cls}"><i class="bi ${a.ic}"></i></div>
            <div class="act-body">
                <div class="act-msg">${a.msg}</div>
                <div class="act-meta"><span style="font-weight:600;color:var(--txt2)">${a.unit}</span><span class="am-dot"></span><span>${a.ladang}</span><span class="am-dot"></span><span>${timeAgo(a.time)} ago</span></div>
            </div>
        </div>
    `).join('');
}

function renderLadangs(){
    document.getElementById('ladangList').innerHTML=ladangs.map(l=>{
        const onC=l.units.filter(u=>u.on).length,offC=l.units.length-onC;
        return`<div class="lg-group">
            <div class="lg-hd">
                <div class="lg-left"><div class="lg-ic"><i class="bi bi-tree-fill"></i></div><div><div class="lg-name">${l.name}</div><div class="lg-loc"><i class="bi bi-geo-alt"></i> ${l.loc}</div></div></div>
                <div class="lg-badges"><span class="lg-b lb-on">${onC} ON</span>${offC?`<span class="lg-b lb-off">${offC} OFF</span>`:''}</div>
            </div>
            <div class="u-list">${l.units.map(u=>`
                <div class="u-item" onclick="goDevice('${u.id}')">
                    <div class="u-dot ${u.on?'u-on':'u-off'}"></div>
                    <div class="u-info"><div class="u-name">${u.name}</div><div class="u-sub">${u.on?'Online':'Offline'} · ${u.alert}</div></div>
                    <div class="u-right">
                        <div class="u-batt ${u.batt<20?'low':''}"><i class="bi ${u.batt<20?'bi-battery':'bi-battery-full'}"></i>${u.batt}%</div>
                        <span class="u-armed ${u.armed?'ua-on':'ua-off'}">${u.armed?'Armed':'Off'}</span>
                        <i class="bi bi-chevron-right u-arrow"></i>
                    </div>
                </div>`).join('')}
            </div>
        </div>`;
    }).join('');
}

function goDevice(id){console.log('Navigate →',id)}
function goPage(p){console.log('Navigate →',p)}

// Navigation
function navHome(){window.location.href='index.html'}
function navDevice(){window.location.href='device-list.html'}
function navAccount(){window.location.href='account.html'}

// Dark mode
let dk=localStorage.getItem('darkMode')==='true';
if(dk)document.documentElement.classList.add('dark-mode');
function toggleDark(){
    dk=!dk;
    document.documentElement.classList.toggle('dark-mode',dk);
    localStorage.setItem('darkMode',String(dk));
}

// ===== TABS =====
document.querySelectorAll('.tab-item').forEach(t=>t.addEventListener('click',()=>{
    document.querySelectorAll('.tab-item').forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
}));

// ===== NAV - Set active based on current page =====
function setActiveNav(){
    const page=window.location.pathname.split('/').pop()||'index.html';
    const navButtons=document.querySelectorAll('.ni');
    navButtons.forEach(btn=>btn.classList.remove('act'));
    
    if(page==='index.html' || page===''){
        navButtons[0].classList.add('act');
    }else if(page==='device-list.html'){
        navButtons[1].classList.add('act');
    }
}
setActiveNav();

// ===== INIT =====
renderDate();setInterval(renderDate,60000);
renderChart('daily');
renderActivity();
renderLadangs();
