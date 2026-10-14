let employees=[], managers=[], roles=[];
let employeeQuery='', managerQuery='';

document.addEventListener('DOMContentLoaded',async()=>{
    if(!await App.ready)return;
    document.querySelectorAll('.tab-btn').forEach(btn=>btn.addEventListener('click',()=>switchTab(btn.dataset.tab)));
    document.getElementById('employeeSearch').addEventListener('input',e=>{employeeQuery=e.target.value;renderEmployees();});
    document.getElementById('managerSearch').addEventListener('input',e=>{managerQuery=e.target.value;renderManagers();});
    document.getElementById('addEmployee').addEventListener('click',()=>openStaffModal('employee'));
    document.getElementById('addManager').addEventListener('click',()=>openStaffModal('manager'));
    document.getElementById('addRole').addEventListener('click',()=>openRoleModal());
    document.getElementById('employeeRows').addEventListener('click',e=>handleStaffAction(e,'employee'));
    document.getElementById('managerRows').addEventListener('click',e=>handleStaffAction(e,'manager'));
    document.getElementById('roleRows').addEventListener('click',handleRoleAction);
    await loadStaff();
});

function switchTab(tab){document.querySelectorAll('.tab-btn').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));document.querySelectorAll('.tab-panel').forEach(p=>p.classList.toggle('active',p.id===`tab-${tab}`));}
function staffId(x,type){return type==='manager'?(x.managerId||x.employeeId||x.userId):(x.employeeId||x.userId);}
function staffName(x){return `${x.firstName||''} ${x.lastName||''}`.trim()||'Unnamed staff';}
function roleName(x){return x.role?.name||'Unassigned';}

async function loadStaff(){
    App.setBusy(true);
    const results=await Promise.allSettled([App.api('/employee/getAll'),App.api('/manager/getAll'),App.api('/role/getAll')]);
    employees=results[0].status==='fulfilled'?(results[0].value||[]):[];
    managers=results[1].status==='fulfilled'?(results[1].value||[]):[];
    roles=results[2].status==='fulfilled'?(results[2].value||[]):[];
    const managerIds=new Set(managers.map(m=>staffId(m,'manager')));
    employees=employees.filter(e=>!managerIds.has(staffId(e,'employee')) && !e.managerCode);
    renderEmployees();renderManagers();renderRoles();
    if(results.some(r=>r.status==='rejected'))App.toast('Some staff data could not be loaded.','error');
    App.setBusy(false);
}

function renderEmployees(){
    const rows=App.filterRows(employees,employeeQuery,[staffName,'email','phoneNumber',roleName]);const tbody=document.getElementById('employeeRows'),empty=document.getElementById('employeeEmpty');
    if(!rows.length){tbody.innerHTML='';empty.innerHTML=App.empty('No employees found',employeeQuery?'Try another search.':'Add an employee to create a staff record.');return;}empty.innerHTML='';
    tbody.innerHTML=rows.map(e=>`<tr><td><div class="table-title">${App.escape(staffName(e))}</div><div class="table-sub">${App.escape((staffId(e,'employee')||'').slice(0,8))}</div></td><td><div>${App.escape(e.email||'—')}</div><div class="table-sub">${App.escape(e.phoneNumber||'—')}</div></td><td>${App.formatMoney(e.salary)}</td><td>${App.statusBadge(roleName(e))}</td><td>${App.actionButtons(staffId(e,'employee'))}</td></tr>`).join('');
}

function renderManagers(){
    const rows=App.filterRows(managers,managerQuery,[staffName,'email','phoneNumber','managerCode',roleName]);const tbody=document.getElementById('managerRows'),empty=document.getElementById('managerEmpty');
    if(!rows.length){tbody.innerHTML='';empty.innerHTML=App.empty('No managers found',managerQuery?'Try another search.':'Add a manager to create a management staff record.');return;}empty.innerHTML='';
    tbody.innerHTML=rows.map(m=>`<tr><td><div class="table-title">${App.escape(staffName(m))}</div><div class="table-sub">${App.escape((staffId(m,'manager')||'').slice(0,8))}</div></td><td><div>${App.escape(m.email||'—')}</div><div class="table-sub">${App.escape(m.phoneNumber||'—')}</div></td><td>${App.escape(m.managerCode||'—')}</td><td>${App.formatMoney(m.salary)}</td><td>${App.statusBadge(roleName(m))}</td><td>${App.actionButtons(staffId(m,'manager'))}</td></tr>`).join('');
}

function renderRoles(){
    const tbody=document.getElementById('roleRows'),empty=document.getElementById('roleEmpty');if(!roles.length){tbody.innerHTML='';empty.innerHTML=App.empty('No roles found','Add a role before assigning it to staff.');return;}empty.innerHTML='';
    tbody.innerHTML=roles.map(r=>`<tr><td class="table-title">${App.escape(r.name||'—')}</td><td><span class="table-sub">${App.escape(r.roleId||'')}</span></td><td>${App.actionButtons(r.roleId)}</td></tr>`).join('');
}

function roleOptions(selected){return `<option value="">No role</option>`+roles.map(r=>`<option value="${App.escape(r.roleId)}" ${selected===r.roleId?'selected':''}>${App.escape(r.name)}</option>`).join('');}
function staffForm(x={},type='employee'){
    return `<form id="staffForm" class="form-grid"><div class="field"><label>First name</label><input name="firstName" value="${App.escape(x.firstName||'')}" required></div><div class="field"><label>Last name</label><input name="lastName" value="${App.escape(x.lastName||'')}" required></div><div class="field"><label>Email</label><input name="email" type="email" value="${App.escape(x.email||'')}" required></div><div class="field"><label>Phone number</label><input name="phoneNumber" value="${App.escape(x.phoneNumber||'')}" required></div><div class="field"><label>Salary (R)</label><input name="salary" type="number" min="0" step="0.01" value="${App.escape(x.salary??'')}" required></div><div class="field"><label>Role</label><select name="roleId">${roleOptions(x.role?.roleId||'')}</select></div>${type==='manager'?`<div class="field full"><label>Manager code</label><input name="managerCode" value="${App.escape(x.managerCode||'')}" required></div>`:''}<div class="field full"><label>Password</label><input name="password" type="password" ${x.userId||x.employeeId||x.managerId?'':'required'} placeholder="${x.userId||x.employeeId||x.managerId?'Leave blank to keep the current password':'Create a login password'}"><small>${x.userId||x.employeeId||x.managerId?'Leave blank unless you want to change this password.':'This employee can use the email and password to sign in.'}</small></div></form>`;
}

async function openStaffModal(type,item=null){
    const editing=Boolean(item);const endpoint=type==='manager'?'/manager':'/employee';
    await App.modal({title:`${editing?'Edit':'Add'} ${type}`,subtitle:type==='manager'?'Manage manager identity, code and login details.':'Manage employee contact, salary and login details.',body:staffForm(item||{},type),submitText:editing?'Save changes':`Add ${type}`,onSubmit:async backdrop=>{
        const form=backdrop.querySelector('#staffForm');if(!form.reportValidity())return false;const f=new FormData(form);const selectedRole=roles.find(r=>r.roleId===f.get('roleId'))||null;
        const payload={...(item||{}),firstName:f.get('firstName').trim(),lastName:f.get('lastName').trim(),email:f.get('email').trim(),phoneNumber:f.get('phoneNumber').trim(),salary:Number(f.get('salary')),role:selectedRole};
        if(type==='manager')payload.managerCode=f.get('managerCode').trim();
        const newPassword=f.get('password');if(newPassword)payload.password=newPassword;else if(!editing)payload.password='';
        if(!editing){delete payload.userId;delete payload.employeeId;delete payload.managerId;}
        const saved=await App.api(`${endpoint}/${editing?'update':'create'}`,{method:editing?'PUT':'POST',body:payload});
        if(type==='employee'){if(editing)employees=employees.map(e=>staffId(e,'employee')===staffId(item,'employee')?saved:e);else employees.unshift(saved);renderEmployees();}
        else{if(editing)managers=managers.map(m=>staffId(m,'manager')===staffId(item,'manager')?saved:m);else managers.unshift(saved);renderManagers();}
        App.toast(`${type[0].toUpperCase()+type.slice(1)} ${editing?'updated':'added'}.`);return true;
    }});
}

async function handleStaffAction(event,type){
    const button=event.target.closest('[data-action]');if(!button)return;const list=type==='manager'?managers:employees;const item=list.find(x=>staffId(x,type)===button.dataset.id);if(!item)return;
    if(button.dataset.action==='edit')return openStaffModal(type,item);
    if(!await App.confirm(`Delete ${type}?`,`${staffName(item)} will be removed from the system.`))return;
    const endpoint=type==='manager'?'/manager':'/employee';try{await App.api(`${endpoint}/delete/${encodeURIComponent(staffId(item,type))}`,{method:'DELETE'});if(type==='manager'){managers=managers.filter(x=>staffId(x,type)!==staffId(item,type));renderManagers();}else{employees=employees.filter(x=>staffId(x,type)!==staffId(item,type));renderEmployees();}App.toast(`${type[0].toUpperCase()+type.slice(1)} deleted.`);}catch(error){App.toast(error.message,'error');}
}

function roleForm(role={}){return `<form id="roleForm"><div class="field"><label>Role name</label><input name="name" value="${App.escape(role.name||'')}" placeholder="e.g. ADMIN, AGENT" required></div></form>`;}
async function openRoleModal(role=null){const editing=Boolean(role);await App.modal({title:editing?'Edit role':'Add role',subtitle:'Roles can be assigned to employees and managers.',body:roleForm(role||{}),size:'sm',submitText:editing?'Save changes':'Add role',onSubmit:async backdrop=>{const form=backdrop.querySelector('#roleForm');if(!form.reportValidity())return false;const f=new FormData(form);const payload={...(role||{}),name:f.get('name').trim()};if(!editing)delete payload.roleId;const saved=await App.api(editing?'/role/update':'/role/create',{method:editing?'PUT':'POST',body:payload});if(editing)roles=roles.map(r=>r.roleId===role.roleId?saved:r);else roles.unshift(saved);renderRoles();App.toast(editing?'Role updated.':'Role added.');return true;}});}
async function handleRoleAction(event){const button=event.target.closest('[data-action]');if(!button)return;const role=roles.find(r=>r.roleId===button.dataset.id);if(!role)return;if(button.dataset.action==='edit')return openRoleModal(role);if(!await App.confirm('Delete role?',`${role.name} will be removed. Assigned users may prevent this action.`))return;try{await App.api(`/role/delete/${encodeURIComponent(role.roleId)}`,{method:'DELETE'});roles=roles.filter(r=>r.roleId!==role.roleId);renderRoles();App.toast('Role deleted.');}catch(error){App.toast(error.message,'error');}}
