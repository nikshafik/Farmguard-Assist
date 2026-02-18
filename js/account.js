// Dark mode
let dk=localStorage.getItem('darkMode')==='true';
if(dk)document.documentElement.classList.add('dark-mode');
function toggleDark(){
    dk=!dk;
    document.documentElement.classList.toggle('dark-mode',dk);
    localStorage.setItem('darkMode',String(dk));
}

// Display Name Management
function editDisplayName(){
    document.getElementById('nameInput').value=localStorage.getItem('displayName')||'FarmGuard';
    document.getElementById('editNameModal').style.display='flex';
}
function closeEditNameModal(){
    document.getElementById('editNameModal').style.display='none';
}
function saveDisplayName(){
    let name=document.getElementById('nameInput').value.trim();
    if(name){
        localStorage.setItem('displayName',name);
        document.getElementById('displayNameText').textContent=name;
        if(document.getElementById('headerBrandName')){
            document.getElementById('headerBrandName').textContent=name;
        }
        updateAllLogos();
        closeEditNameModal();
    }
}

// Logo Upload Handler
function triggerLogoUpload(){
    document.getElementById('logoUpload').click();
}
function handleLogoUpload(event){
    let file=event.target.files[0];
    if(file){
        let reader=new FileReader();
        reader.onload=function(e){
            let img=new Image();
            img.onload=function(){
                localStorage.setItem('logoData',e.target.result);
                updateAllLogos();
            };
            img.src=e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Update logo on current page and store in localStorage
function updateAllLogos(){
    let logo=localStorage.getItem('logoData');
    if(logo){
        document.getElementById('headerLogo').innerHTML='';
        let img=document.createElement('img');
        img.src=logo;
        img.style.cssText='width:100%;height:100%;border-radius:inherit;object-fit:cover';
        document.getElementById('headerLogo').appendChild(img);
        
        if(document.getElementById('profileLogo')){
            document.getElementById('profileLogo').src=logo;
        }
    }
}

// Initialize logo on page load
window.addEventListener('DOMContentLoaded',function(){
    let displayName=localStorage.getItem('displayName');
    if(displayName){
        document.getElementById('displayNameText').textContent=displayName;
        if(document.getElementById('headerBrandName')){
            document.getElementById('headerBrandName').textContent=displayName;
        }
    }
    updateAllLogos();
});

// Collapse/Expand Panels
function toggleNotifications(){
    let panel=document.getElementById('notificationsPanel');
    let arrow=document.getElementById('notifArrow');
    panel.style.display=panel.style.display==='none'?'block':'none';
    arrow.classList.toggle('open');
}
function toggleAbout(){
    let panel=document.getElementById('aboutPanel');
    let arrow=document.getElementById('aboutArrow');
    panel.style.display=panel.style.display==='none'?'block':'none';
    arrow.classList.toggle('open');
}
function toggleContacts(){
    let panel=document.getElementById('contactsPanel');
    let arrow=document.getElementById('contactsArrow');
    panel.style.display=panel.style.display==='none'?'block':'none';
    arrow.classList.toggle('open');
}

// Navigation
function navHome(){
    window.location.href='index.html';
}
function navDevice(){
    window.location.href='device-list.html';
}
function navAnalytics(){
    alert('Analytics page coming soon');
}
function navSettings(){
    alert('Settings page coming soon');
}
function navAccount(){
    // Already on account page
}
function navAddFarm(){
    alert('Add Ladang feature coming soon');
}

// Set active nav
function setActiveNav(){
    // Account page sets Account as active
}
setActiveNav();
