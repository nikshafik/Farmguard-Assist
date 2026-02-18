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

// Device data
const ladangs=[
    {name:'Ladang Gua Musang',loc:'Gua Musang, Kelantan',devices:[
        {no:1,id:'FG-001',name:'FG-Unit-001',on:true,batt:87,loc:'Zone A'},
        {no:2,id:'FG-002',name:'FG-Unit-002',on:true,batt:62,loc:'Zone B'},
        {no:3,id:'FG-003',name:'FG-Unit-003',on:false,batt:12,loc:'Zone C'},
    ]},
    {name:'Ladang Jeli',loc:'Jeli, Kelantan',devices:[
        {no:4,id:'FG-004',name:'FG-Unit-004',on:true,batt:95,loc:'Zone A'},
        {no:5,id:'FG-005',name:'FG-Unit-005',on:true,batt:78,loc:'Zone B'},
    ]}
];

// Render device list
function renderDeviceList(){
    document.getElementById('devList').innerHTML=ladangs.map(l=>`
        <div class="dev-group">
            <div class="dg-hd">
                <div class="dg-left">
                    <div class="dg-ic"><i class="bi bi-tree-fill"></i></div>
                    <div>
                        <div class="dg-name">${l.name}</div>
                        <div class="dg-loc"><i class="bi bi-geo-alt"></i> ${l.loc}</div>
                    </div>
                </div>
                <div class="dg-count">${l.devices.length} Unit</div>
            </div>
            <div class="dev-list">
                ${l.devices.map(d=>`
                    <div class="dev-item" onclick="goToDevice('${d.id}','${d.name}')">
                        <div class="dev-dot ${d.on?'d-on':'d-off'}"></div>
                        <div class="dev-info">
                            <div class="dev-no">#${String(d.no).padStart(2,'0')}</div>
                            <div class="dev-name">${d.name}</div>
                            <div class="dev-loc">${d.on?'Online':'Offline'} · ${d.loc}</div>
                        </div>
                        <div class="dev-right">
                            <div class="dev-batt ${d.batt<20?'low':''}">
                                <i class="bi ${d.batt<20?'bi-battery':'bi-battery-full'}"></i>${d.batt}%
                            </div>
                            <i class="bi bi-chevron-right dev-arrow"></i>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Navigation
function goToDevice(id,name){
    localStorage.setItem('selectedDeviceId',id);
    localStorage.setItem('selectedDeviceName',name);
    window.location.href='devices.html';
}

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

// ===== NAV - Set active based on current page =====
function setActiveNav(){
    const navButtons=document.querySelectorAll('.ni');
    navButtons.forEach(btn=>btn.classList.remove('act'));
    navButtons[1].classList.add('act'); // Device is always active on this page
}

// Bottom nav listeners
document.querySelectorAll('.ni').forEach(n=>n.addEventListener('click',()=>{
    document.querySelectorAll('.ni').forEach(x=>x.classList.remove('act'));
    n.classList.add('act');
}));

// Init
renderDeviceList();
setActiveNav();
