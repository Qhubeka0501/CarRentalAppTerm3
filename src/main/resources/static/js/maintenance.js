let maintenanceRecords = [], maintenanceVehicles = [];
let maintenanceQuery = '';

document.addEventListener('DOMContentLoaded', async () => {
    if (!await App.ready) return;
    document.getElementById('addMaintenance').addEventListener('click', () => openMaintenanceModal());
    document.getElementById('maintenanceSearch').addEventListener('input', e => { maintenanceQuery = e.target.value; renderMaintenance(); });
    document.getElementById('maintenanceRows').addEventListener('click', handleMaintenanceAction);
    await loadMaintenance();
});

async function loadMaintenance() {
    App.setBusy(true);
    try {
        [maintenanceRecords, maintenanceVehicles] = await Promise.all([App.api('/maintenanceRecord/getAll'), App.api('/vehicle/getAll')]);
        maintenanceRecords ||= []; maintenanceVehicles ||= [];
        renderMaintenance();
    } catch (error) {
        App.toast(error.message, 'error');
        document.getElementById('maintenanceEmpty').innerHTML = App.empty('Unable to load maintenance records', 'Check the server and refresh.');
    } finally { App.setBusy(false); }
}

function maintVehicle(id) { return maintenanceVehicles.find(v => v.vehicleId === id); }
function vehicleLabel(v) { return v ? `${v.make || ''} ${v.model || ''}`.trim() : 'Unknown vehicle'; }

function renderMaintenance() {
    const rows = App.filterRows(maintenanceRecords, maintenanceQuery, ['description','technicianName','vehicleId', r => vehicleLabel(maintVehicle(r.vehicleId))]);
    document.getElementById('maintenanceCount').textContent = `${rows.length} record${rows.length === 1 ? '' : 's'}`;
    const tbody = document.getElementById('maintenanceRows'); const empty = document.getElementById('maintenanceEmpty');
    if (!rows.length) {
        tbody.innerHTML = '';
        empty.innerHTML = App.empty('No maintenance records found', maintenanceQuery ? 'Try a different search.' : 'Add a service record to build vehicle maintenance history.');
        return;
    }
    empty.innerHTML = '';
    tbody.innerHTML = rows.map(r => {
        const v = maintVehicle(r.vehicleId);
        return `<tr><td><div class="table-title">${App.escape(vehicleLabel(v))}</div><div class="table-sub">${App.escape(v?.licensePlate || r.vehicleId || '')}</div></td><td>${App.formatDate(r.date)}</td><td><div class="table-title">${App.escape(r.description || '—')}</div><div class="table-sub">#${App.escape((r.recordId || r.maintenanceId || '').slice(0,8))}</div></td><td>${App.escape(r.technicianName || '—')}</td><td>${App.formatMoney(r.cost)}</td><td>${App.actionButtons(r.recordId || r.maintenanceId)}</td></tr>`;
    }).join('');
}

async function handleMaintenanceAction(event) {
    const button = event.target.closest('[data-action]'); if (!button) return;
    const item = maintenanceRecords.find(r => (r.recordId || r.maintenanceId) === button.dataset.id); if (!item) return;
    if (button.dataset.action === 'edit') return openMaintenanceModal(item);
    const id = item.recordId || item.maintenanceId;
    const confirmed = await App.confirm('Delete maintenance record?', 'This service-history record will be removed.'); if (!confirmed) return;
    try { await App.api(`/maintenanceRecord/delete/${encodeURIComponent(id)}`, { method:'DELETE' }); maintenanceRecords = maintenanceRecords.filter(r => (r.recordId || r.maintenanceId) !== id); renderMaintenance(); App.toast('Maintenance record deleted.'); }
    catch (error) { App.toast(error.message, 'error'); }
}

function maintenanceForm(r = {}) {
    const options = maintenanceVehicles.map(v => `<option value="${App.escape(v.vehicleId)}" ${r.vehicleId === v.vehicleId ? 'selected' : ''}>${App.escape(vehicleLabel(v))} · ${App.escape(v.licensePlate || '')}</option>`).join('');
    return `<form id="maintenanceForm" class="form-grid"><div class="field full"><label>Vehicle</label><select name="vehicleId" required><option value="">Select vehicle</option>${options}</select></div><div class="field"><label>Service date</label><input name="date" type="date" value="${App.escape(r.date || '')}" required></div><div class="field"><label>Cost (R)</label><input name="cost" type="number" min="0" step="0.01" value="${App.escape(r.cost ?? '')}" required></div><div class="field full"><label>Description</label><textarea name="description" required placeholder="Describe the work completed">${App.escape(r.description || '')}</textarea></div><div class="field full"><label>Technician name</label><input name="technicianName" value="${App.escape(r.technicianName || '')}" required></div></form>`;
}

async function openMaintenanceModal(record = null) {
    if (!maintenanceVehicles.length && !record) { App.toast('Add a vehicle before creating a maintenance record.', 'info'); return; }
    const editing = Boolean(record);
    await App.modal({ title: editing ? 'Edit maintenance record' : 'Add maintenance record', subtitle:'Record service work and cost against a vehicle.', body:maintenanceForm(record || {}), submitText: editing ? 'Save changes' : 'Add record', onSubmit: async backdrop => {
        const form = backdrop.querySelector('#maintenanceForm'); if (!form.reportValidity()) return false; const f = new FormData(form);
        const id = record?.recordId || record?.maintenanceId || App.uuid();
        const payload = { ...(record || {}), recordId:id, vehicleId:f.get('vehicleId'), date:f.get('date'), description:f.get('description').trim(), cost:Number(f.get('cost')), technicianName:f.get('technicianName').trim() };
        const saved = await App.api(editing ? '/maintenanceRecord/update' : '/maintenanceRecord/create', { method: editing ? 'PUT' : 'POST', body:payload });
        if (editing) maintenanceRecords = maintenanceRecords.map(r => (r.recordId || r.maintenanceId) === id ? saved : r); else maintenanceRecords.unshift(saved);
        renderMaintenance(); App.toast(editing ? 'Maintenance record updated.' : 'Maintenance record added.'); return true;
    }});
}
