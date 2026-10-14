let notifications = [], notificationCustomers = [], notificationBookings = [];
let notificationQuery = '', notificationType = '';

document.addEventListener('DOMContentLoaded', async () => {
    if (!await App.ready) return;
    document.getElementById('addNotification').addEventListener('click', () => openNotificationModal());
    document.getElementById('notificationSearch').addEventListener('input', e => { notificationQuery = e.target.value; renderNotifications(); });
    document.getElementById('notificationTypeFilter').addEventListener('change', e => { notificationType = e.target.value; renderNotifications(); });
    document.getElementById('notificationRows').addEventListener('click', handleNotificationAction);
    await loadNotifications();
});

function ncid(c){return c.customerId||c.userId;} function ncname(c){return `${c.firstName||''} ${c.lastName||''}`.trim()||'Customer';}
function ncustomer(id){return notificationCustomers.find(c=>ncid(c)===id);}

async function loadNotifications(){
    App.setBusy(true);
    try{
        [notifications,notificationCustomers,notificationBookings]=await Promise.all([App.api('/notification/getAll'),App.api('/customer/getAll'),App.api('/bookings/getAll')]);
        notifications||=[];notificationCustomers||=[];notificationBookings||=[];renderNotifications();
    }catch(error){App.toast(error.message,'error');document.getElementById('notificationEmpty').innerHTML=App.empty('Unable to load notifications','Check the server and refresh.');}
    finally{App.setBusy(false);}
}

function renderNotifications(){
    let rows=App.filterRows(notifications,notificationQuery,['notificationId','customerId','bookingId','message','notificationType',n=>ncname(ncustomer(n.customerId)||{})]);
    if(notificationType)rows=rows.filter(n=>n.notificationType===notificationType);
    document.getElementById('notificationCount').textContent=`${rows.length} notification${rows.length===1?'':'s'}`;
    const tbody=document.getElementById('notificationRows'),empty=document.getElementById('notificationEmpty');
    if(!rows.length){tbody.innerHTML='';empty.innerHTML=App.empty('No notifications found',notificationQuery||notificationType?'Try changing your filters.':'Create a communication record to begin.');return;}
    empty.innerHTML='';
    tbody.innerHTML=rows.map(n=>{const c=ncustomer(n.customerId);return `<tr><td><div class="table-title">${App.escape(c?ncname(c):'Unknown customer')}</div><div class="table-sub">${App.escape(c?.email||n.customerId||'')}</div></td><td><div>${App.escape((n.bookingId||'').slice(0,8)||'—')}</div><div class="table-sub">${App.escape(n.bookingId||'')}</div></td><td style="max-width:420px">${App.escape(n.message||'—')}</td><td>${App.statusBadge(n.notificationType)}</td><td>${App.formatDateTime(n.sentAt)}</td><td>${App.actionButtons(n.notificationId)}</td></tr>`;}).join('');
}

async function handleNotificationAction(event){
    const button=event.target.closest('[data-action]');if(!button)return;const item=notifications.find(n=>n.notificationId===button.dataset.id);if(!item)return;
    if(button.dataset.action==='edit')return openNotificationModal(item);
    if(!await App.confirm('Delete notification?','This communication record will be removed.'))return;
    try{await App.api(`/notification/delete/${encodeURIComponent(item.notificationId)}`,{method:'DELETE'});notifications=notifications.filter(n=>n.notificationId!==item.notificationId);renderNotifications();App.toast('Notification deleted.');}catch(error){App.toast(error.message,'error');}
}

function notificationForm(n={}){
    const customerOpts=notificationCustomers.map(c=>`<option value="${App.escape(ncid(c))}" ${n.customerId===ncid(c)?'selected':''}>${App.escape(ncname(c))} · ${App.escape(c.email||'')}</option>`).join('');
    const bookingOpts=notificationBookings.map(b=>`<option value="${App.escape(b.bookingId)}" ${n.bookingId===b.bookingId?'selected':''}>Booking ${App.escape((b.bookingId||'').slice(0,8))}</option>`).join('');
    const defaultDt=new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,16);
    return `<form id="notificationForm" class="form-grid"><div class="field"><label>Customer</label><select name="customerId" required><option value="">Select customer</option>${customerOpts}</select></div><div class="field"><label>Booking</label><select name="bookingId"><option value="">No booking</option>${bookingOpts}</select></div><div class="field"><label>Channel</label><select name="notificationType">${['EMAIL','SMS','PUSH_NOTIFICATION'].map(s=>`<option ${n.notificationType===s?'selected':''}>${s}</option>`).join('')}</select></div><div class="field"><label>Sent at</label><input name="sentAt" type="datetime-local" value="${App.escape((n.sentAt||defaultDt).slice(0,16))}" required></div><div class="field full"><label>Message</label><textarea name="message" required placeholder="Notification message">${App.escape(n.message||'')}</textarea></div></form>`;
}

async function openNotificationModal(notification=null){
    if(!notificationCustomers.length&&!notification){App.toast('Add a customer before creating a notification.','info');return;}
    const editing=Boolean(notification);
    await App.modal({title:editing?'Edit notification':'New notification',subtitle:'Record a customer communication linked to a booking when applicable.',body:notificationForm(notification||{}),submitText:editing?'Save changes':'Create notification',onSubmit:async backdrop=>{
        const form=backdrop.querySelector('#notificationForm');if(!form.reportValidity())return false;const f=new FormData(form);let sentAt=f.get('sentAt');if(sentAt&&sentAt.length===16)sentAt+=':00';
        const payload={...(notification||{}),notificationId:notification?.notificationId||App.uuid(),customerId:f.get('customerId'),bookingId:f.get('bookingId')||null,message:f.get('message').trim(),notificationType:f.get('notificationType'),sentAt};
        const saved=await App.api(editing?'/notification/update':'/notification/create',{method:editing?'PUT':'POST',body:payload});
        if(editing)notifications=notifications.map(n=>n.notificationId===notification.notificationId?saved:n);else notifications.unshift(saved);renderNotifications();App.toast(editing?'Notification updated.':'Notification created.');return true;
    }});
}
