let customers = [];
let customerQuery = '';

document.addEventListener('DOMContentLoaded', async () => {
    if (!await App.ready) return;
    document.getElementById('addCustomer').addEventListener('click', () => openCustomerModal());
    document.getElementById('customerSearch').addEventListener('input', e => { customerQuery = e.target.value; renderCustomers(); });
    document.getElementById('customerRows').addEventListener('click', handleCustomerAction);
    await loadCustomers();
});

async function loadCustomers() {
    App.setBusy(true);
    try {
        customers = await App.api('/customer/getAll') || [];
        renderCustomers();
    } catch (error) {
        App.toast(error.message, 'error');
        document.getElementById('customerEmpty').innerHTML = App.empty('Unable to load customers', 'Check the server connection and refresh.');
    } finally { App.setBusy(false); }
}

function customerId(c) { return c.customerId || c.userId; }
function customerName(c) { return `${c.firstName || ''} ${c.lastName || ''}`.trim() || 'Unnamed customer'; }

function renderCustomers() {
    const rows = App.filterRows(customers, customerQuery, [customerName, 'email', 'phoneNumber', 'driverLicenseNumber', c => c.address?.city]);
    document.getElementById('customerCount').textContent = `${rows.length} customer${rows.length === 1 ? '' : 's'}`;
    const tbody = document.getElementById('customerRows');
    const empty = document.getElementById('customerEmpty');
    if (!rows.length) {
        tbody.innerHTML = '';
        empty.innerHTML = App.empty('No customers found', customerQuery ? 'Try a different search.' : 'Add a customer to begin building your rental customer list.');
        return;
    }
    empty.innerHTML = '';
    tbody.innerHTML = rows.map(c => `<tr>
        <td><div class="table-title">${App.escape(customerName(c))}</div><div class="table-sub">${App.escape((customerId(c) || '').slice(0,8))}</div></td>
        <td><div>${App.escape(c.email || '—')}</div><div class="table-sub">${App.escape(c.phoneNumber || '—')}</div></td>
        <td>${App.escape(c.driverLicenseNumber || '—')}</td>
        <td>${App.formatDate(c.dateOfBirth)}</td>
        <td>${App.escape([c.address?.city, c.address?.province].filter(Boolean).join(', ') || '—')}</td>
        <td>${App.actionButtons(customerId(c))}</td>
    </tr>`).join('');
}

async function handleCustomerAction(event) {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const item = customers.find(c => customerId(c) === button.dataset.id);
    if (!item) return;
    if (button.dataset.action === 'edit') return openCustomerModal(item);
    const confirmed = await App.confirm('Delete customer?', `${customerName(item)} will be removed from the system.`);
    if (!confirmed) return;
    try {
        await App.api(`/customer/delete/${encodeURIComponent(customerId(item))}`, { method: 'DELETE' });
        customers = customers.filter(c => customerId(c) !== customerId(item));
        renderCustomers();
        App.toast('Customer deleted.');
    } catch (error) { App.toast(error.message, 'error'); }
}

function customerForm(c = {}) {
    const a = c.address || {};
    const k = c.nextOfKin || {};
    return `<form id="customerForm" class="form-grid">
      <div class="field"><label>First name</label><input name="firstName" value="${App.escape(c.firstName || '')}" required></div>
      <div class="field"><label>Last name</label><input name="lastName" value="${App.escape(c.lastName || '')}" required></div>
      <div class="field"><label>Email address</label><input name="email" type="email" value="${App.escape(c.email || '')}" required></div>
      <div class="field"><label>Phone number</label><input name="phoneNumber" value="${App.escape(c.phoneNumber || '')}" required></div>
      <div class="field"><label>Driver licence number</label><input name="driverLicenseNumber" value="${App.escape(c.driverLicenseNumber || '')}" required></div>
      <div class="field"><label>Date of birth</label><input name="dateOfBirth" type="date" value="${App.escape(c.dateOfBirth || '')}" required></div>
      <div class="full form-section"><div class="form-section-title">Home address</div></div>
      <div class="field"><label>Street number / name</label><input name="streetNumber" value="${App.escape(a.streetNumber || '')}"></div>
      <div class="field"><label>House / unit number</label><input name="houseNumber" value="${App.escape(a.houseNumber || '')}"></div>
      <div class="field"><label>City</label><input name="city" value="${App.escape(a.city || '')}"></div>
      <div class="field"><label>Province</label><input name="province" value="${App.escape(a.province || '')}"></div>
      <div class="field"><label>Postal code</label><input name="postalCode" value="${App.escape(a.postalCode || '')}"></div>
      <div class="field"><label>Country</label><input name="country" value="${App.escape(a.country || 'South Africa')}"></div>
      <div class="full form-section"><div class="form-section-title">Next of kin</div></div>
      <div class="field"><label>First name</label><input name="kinFirstName" value="${App.escape(k.firstName || '')}"></div>
      <div class="field"><label>Last name</label><input name="kinLastName" value="${App.escape(k.lastName || '')}"></div>
      <div class="field"><label>Phone number</label><input name="kinPhoneNumber" value="${App.escape(k.phoneNumber || '')}"></div>
      <div class="field"><label>Relationship</label><input name="relationship" value="${App.escape(k.relationship || '')}" placeholder="Parent, sibling, spouse…"></div>
    </form>`;
}

async function openCustomerModal(customer = null) {
    const editing = Boolean(customer);
    await App.modal({
        title: editing ? 'Edit customer' : 'Add customer',
        subtitle: editing ? 'Update this customer record.' : 'Create a new customer record.',
        body: customerForm(customer || {}),
        submitText: editing ? 'Save changes' : 'Add customer',
        onSubmit: async backdrop => {
            const form = backdrop.querySelector('#customerForm');
            if (!form.reportValidity()) return false;
            const f = new FormData(form);
            const hasAddress = ['streetNumber','houseNumber','city','province','postalCode','country'].some(k => String(f.get(k) || '').trim());
            const hasKin = ['kinFirstName','kinLastName','kinPhoneNumber','relationship'].some(k => String(f.get(k) || '').trim());
            const payload = {
                ...(customer || {}),
                firstName: f.get('firstName').trim(),
                lastName: f.get('lastName').trim(),
                email: f.get('email').trim(),
                phoneNumber: f.get('phoneNumber').trim(),
                driverLicenseNumber: f.get('driverLicenseNumber').trim(),
                dateOfBirth: f.get('dateOfBirth'),
                role: customer?.role || null,
                address: hasAddress ? {
                    ...(customer?.address || {}), streetNumber: f.get('streetNumber').trim(), houseNumber: f.get('houseNumber').trim(), city: f.get('city').trim(), province: f.get('province').trim(), postalCode: f.get('postalCode').trim(), country: f.get('country').trim()
                } : null,
                nextOfKin: hasKin ? { firstName: f.get('kinFirstName').trim(), lastName: f.get('kinLastName').trim(), phoneNumber: f.get('kinPhoneNumber').trim(), relationship: f.get('relationship').trim() } : null
            };
            if (!editing) { delete payload.customerId; delete payload.userId; }
            const saved = await App.api(editing ? '/customer/update' : '/customer/create', { method: editing ? 'PUT' : 'POST', body: payload });
            if (editing) customers = customers.map(c => customerId(c) === customerId(customer) ? saved : c);
            else customers.unshift(saved);
            renderCustomers();
            App.toast(editing ? 'Customer updated.' : 'Customer added.');
            return true;
        }
    });
}
