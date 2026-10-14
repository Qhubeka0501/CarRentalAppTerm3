let vehicles = [];
let vehicleQuery = '';
let vehicleStatus = '';

document.addEventListener('DOMContentLoaded', async () => {
    if (!await App.ready) return;
    document.getElementById('addVehicle').addEventListener('click', () => openVehicleModal());
    document.getElementById('vehicleSearch').addEventListener('input', e => { vehicleQuery = e.target.value; renderVehicles(); });
    document.getElementById('vehicleStatusFilter').addEventListener('change', e => { vehicleStatus = e.target.value; renderVehicles(); });
    document.getElementById('vehicleRows').addEventListener('click', handleVehicleAction);
    await loadVehicles();
});

async function loadVehicles() {
    App.setBusy(true);
    try {
        vehicles = await App.api('/vehicle/getAll') || [];
        renderVehicles();
    } catch (error) {
        App.toast(error.message, 'error');
        document.getElementById('vehicleEmpty').innerHTML = App.empty('Unable to load vehicles', 'Check the server and database connection, then refresh.');
    } finally { App.setBusy(false); }
}

function renderVehicles() {
    let rows = App.filterRows(vehicles, vehicleQuery, ['licensePlate','make','model','color','status']);
    if (vehicleStatus) rows = rows.filter(v => v.status === vehicleStatus);
    document.getElementById('vehicleCount').textContent = `${rows.length} vehicle${rows.length === 1 ? '' : 's'}`;
    const tbody = document.getElementById('vehicleRows');
    const empty = document.getElementById('vehicleEmpty');
    if (!rows.length) {
        tbody.innerHTML = '';
        empty.innerHTML = App.empty('No vehicles found', vehicleQuery || vehicleStatus ? 'Try changing your search or filter.' : 'Add your first vehicle to begin managing the fleet.');
        return;
    }
    empty.innerHTML = '';
    tbody.innerHTML = rows.map(v => `<tr>
        <td><div class="table-title">${App.escape(v.make)} ${App.escape(v.model)}</div><div class="table-sub">${App.escape(v.licensePlate || 'No plate')}</div></td>
        <td><div>${App.escape(v.year)}</div><div class="table-sub">${App.escape(v.color || '—')}</div></td>
        <td>${Number(v.mileage || 0).toLocaleString('en-ZA')} km</td>
        <td>${App.formatMoney(v.dailyRate)}</td>
        <td>${App.formatMoney(v.weeklyRate)}</td>
        <td>${App.statusBadge(v.status)}</td>
        <td>${App.actionButtons(v.vehicleId)}</td>
    </tr>`).join('');
}

async function handleVehicleAction(event) {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const item = vehicles.find(v => v.vehicleId === button.dataset.id);
    if (!item) return;
    if (button.dataset.action === 'edit') return openVehicleModal(item);
    const confirmed = await App.confirm('Delete vehicle?', `${item.make || ''} ${item.model || ''} (${item.licensePlate || 'no plate'}) will be removed.`);
    if (!confirmed) return;
    try {
        await App.api(`/vehicle/delete/${encodeURIComponent(item.vehicleId)}`, { method: 'DELETE' });
        vehicles = vehicles.filter(v => v.vehicleId !== item.vehicleId);
        renderVehicles();
        App.toast('Vehicle deleted.');
    } catch (error) { App.toast(error.message, 'error'); }
}

function vehicleForm(v = {}) {
    return `<form id="vehicleForm" class="form-grid">
      <div class="field"><label>License plate</label><input name="licensePlate" value="${App.escape(v.licensePlate || '')}" placeholder="CA 123-456" required></div>
      <div class="field"><label>Status</label><select name="status" required>${['AVAILABLE','RENTED','RESERVED','UNDER_MAINTENANCE'].map(s => `<option ${v.status === s ? 'selected' : ''}>${s}</option>`).join('')}</select></div>
      <div class="field"><label>Make</label><input name="make" value="${App.escape(v.make || '')}" placeholder="Toyota" required></div>
      <div class="field"><label>Model</label><input name="model" value="${App.escape(v.model || '')}" placeholder="Corolla" required></div>
      <div class="field"><label>Year</label><input name="year" type="number" min="1980" max="2100" value="${App.escape(v.year || '')}" required></div>
      <div class="field"><label>Colour</label><input name="color" value="${App.escape(v.color || '')}" placeholder="Silver"></div>
      <div class="field"><label>Mileage (km)</label><input name="mileage" type="number" min="0" step="0.1" value="${App.escape(v.mileage ?? '')}" required></div>
      <div class="field"><label>Daily rate (R)</label><input name="dailyRate" type="number" min="0" step="0.01" value="${App.escape(v.dailyRate ?? '')}" required></div>
      <div class="field full"><label>Weekly rate (R)</label><input name="weeklyRate" type="number" min="0" step="0.01" value="${App.escape(v.weeklyRate ?? '')}" required></div>
    </form>`;
}

async function openVehicleModal(vehicle = null) {
    const editing = Boolean(vehicle);
    await App.modal({
        title: editing ? 'Edit vehicle' : 'Add vehicle',
        subtitle: editing ? 'Update the vehicle details below.' : 'Add a new vehicle to the rental fleet.',
        body: vehicleForm(vehicle || {}),
        submitText: editing ? 'Save changes' : 'Add vehicle',
        onSubmit: async backdrop => {
            const form = backdrop.querySelector('#vehicleForm');
            if (!form.reportValidity()) return false;
            const f = new FormData(form);
            const payload = {
                ...(vehicle || {}),
                licensePlate: f.get('licensePlate').trim(),
                make: f.get('make').trim(),
                model: f.get('model').trim(),
                year: Number(f.get('year')),
                color: f.get('color').trim(),
                mileage: Number(f.get('mileage')),
                dailyRate: Number(f.get('dailyRate')),
                weeklyRate: Number(f.get('weeklyRate')),
                status: f.get('status')
            };
            const saved = await App.api(editing ? '/vehicle/update' : '/vehicle/create', { method: editing ? 'PUT' : 'POST', body: payload });
            if (editing) vehicles = vehicles.map(v => v.vehicleId === vehicle.vehicleId ? saved : v);
            else vehicles.unshift(saved);
            renderVehicles();
            App.toast(editing ? 'Vehicle updated.' : 'Vehicle added.');
            return true;
        }
    });
}
