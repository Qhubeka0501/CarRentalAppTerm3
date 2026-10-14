let bookings = [], bookingCustomers = [], bookingVehicles = [];
let bookingQuery = '', bookingStatusFilter = '';

document.addEventListener('DOMContentLoaded', async () => {
    if (!await App.ready) return;
    document.getElementById('addBooking').addEventListener('click', () => openBookingModal());
    document.getElementById('bookingSearch').addEventListener('input', e => { bookingQuery = e.target.value; renderBookings(); });
    document.getElementById('bookingStatusFilter').addEventListener('change', e => { bookingStatusFilter = e.target.value; renderBookings(); });
    document.getElementById('bookingRows').addEventListener('click', handleBookingAction);
    await loadBookings();
});

function cid(c) { return c.customerId || c.userId; }
function cName(c) { return `${c.firstName || ''} ${c.lastName || ''}`.trim() || 'Customer'; }
function vName(v) { return `${v.make || ''} ${v.model || ''}`.trim() || v.licensePlate || 'Vehicle'; }

async function loadBookings() {
    App.setBusy(true);
    try {
        [bookings, bookingCustomers, bookingVehicles] = await Promise.all([
            App.api('/bookings/getAll'), App.api('/customer/getAll'), App.api('/vehicle/getAll')
        ]);
        bookings ||= []; bookingCustomers ||= []; bookingVehicles ||= [];
        renderBookings();
    } catch (error) {
        App.toast(error.message, 'error');
        document.getElementById('bookingEmpty').innerHTML = App.empty('Unable to load bookings', 'Check the server and refresh.');
    } finally { App.setBusy(false); }
}

function customerById(id) { return bookingCustomers.find(c => cid(c) === id); }
function vehicleById(id) { return bookingVehicles.find(v => v.vehicleId === id); }

function renderBookings() {
    let rows = App.filterRows(bookings, bookingQuery, ['bookingId','customerId','vehicleId', b => cName(customerById(b.customerId) || {}), b => vName(vehicleById(b.vehicleId) || {})]);
    if (bookingStatusFilter) rows = rows.filter(b => b.bookingStatus === bookingStatusFilter);
    document.getElementById('bookingTotal').textContent = bookings.length;
    document.getElementById('bookingConfirmed').textContent = bookings.filter(b => b.bookingStatus === 'CONFIRMED').length;
    document.getElementById('bookingPending').textContent = bookings.filter(b => b.bookingStatus === 'PENDING').length;
    document.getElementById('bookingCount').textContent = `${rows.length} booking${rows.length === 1 ? '' : 's'}`;
    const tbody = document.getElementById('bookingRows');
    const empty = document.getElementById('bookingEmpty');
    if (!rows.length) {
        tbody.innerHTML = '';
        empty.innerHTML = App.empty('No bookings found', bookingQuery || bookingStatusFilter ? 'Try changing your filters.' : 'Create your first booking to start tracking rentals.');
        return;
    }
    empty.innerHTML = '';
    tbody.innerHTML = rows.map(b => {
        const customer = customerById(b.customerId), vehicle = vehicleById(b.vehicleId);
        return `<tr>
          <td><div class="table-title">#${App.escape((b.bookingId || '').slice(0,8))}</div><div class="table-sub">${App.escape(b.bookingId || '')}</div></td>
          <td><div class="table-title">${App.escape(customer ? cName(customer) : 'Unknown customer')}</div><div class="table-sub">${App.escape(customer?.email || b.customerId || '')}</div></td>
          <td><div>${App.escape(vehicle ? vName(vehicle) : 'Unknown vehicle')}</div><div class="table-sub">${App.escape(vehicle?.licensePlate || b.vehicleId || '')}</div></td>
          <td>${App.formatDate(b.rentalDate)}<div class="table-sub">to ${App.formatDate(b.returnDate)}</div></td>
          <td>${App.statusBadge(b.paymentStatus)}</td><td>${App.statusBadge(b.bookingStatus)}</td>
          <td>${App.actionButtons(b.bookingId)}</td>
        </tr>`;
    }).join('');
}

async function handleBookingAction(event) {
    const button = event.target.closest('[data-action]'); if (!button) return;
    const item = bookings.find(b => b.bookingId === button.dataset.id); if (!item) return;
    if (button.dataset.action === 'edit') return openBookingModal(item);
    const confirmed = await App.confirm('Delete booking?', `Booking ${item.bookingId.slice(0,8)} will be permanently removed.`);
    if (!confirmed) return;
    try {
        await App.api(`/bookings/delete/${encodeURIComponent(item.bookingId)}`, { method: 'DELETE' });
        bookings = bookings.filter(b => b.bookingId !== item.bookingId); renderBookings(); App.toast('Booking deleted.');
    } catch (error) { App.toast(error.message, 'error'); }
}

function bookingForm(b = {}) {
    const customerOptions = bookingCustomers.map(c => `<option value="${App.escape(cid(c))}" ${b.customerId === cid(c) ? 'selected' : ''}>${App.escape(cName(c))} · ${App.escape(c.email || '')}</option>`).join('');
    const vehicleOptions = bookingVehicles.map(v => `<option value="${App.escape(v.vehicleId)}" ${b.vehicleId === v.vehicleId ? 'selected' : ''}>${App.escape(vName(v))} · ${App.escape(v.licensePlate || '')} · ${App.escape(v.status || '')}</option>`).join('');
    return `<form id="bookingForm" class="form-grid">
      <div class="field full"><label>Customer</label><select name="customerId" required><option value="">Select customer</option>${customerOptions}</select></div>
      <div class="field full"><label>Vehicle</label><select name="vehicleId" required><option value="">Select vehicle</option>${vehicleOptions}</select></div>
      <div class="field"><label>Rental date</label><input name="rentalDate" type="date" value="${App.escape(b.rentalDate || '')}" required></div>
      <div class="field"><label>Return date</label><input name="returnDate" type="date" value="${App.escape(b.returnDate || '')}" required></div>
      <div class="field"><label>Payment status</label><select name="paymentStatus">${['PENDING','PAID','COMPLETED','FAILED','CANCELLED'].map(s => `<option ${b.paymentStatus === s ? 'selected' : ''}>${s}</option>`).join('')}</select></div>
      <div class="field"><label>Booking status</label><select name="bookingStatus">${['PENDING','CONFIRMED','CANCELLED'].map(s => `<option ${b.bookingStatus === s ? 'selected' : ''}>${s}</option>`).join('')}</select></div>
    </form>`;
}

async function openBookingModal(booking = null) {
    if (!bookingCustomers.length || !bookingVehicles.length) {
        App.toast('Add at least one customer and one vehicle before creating a booking.', 'info');
        if (!booking) return;
    }
    const editing = Boolean(booking);
    await App.modal({
        title: editing ? 'Edit booking' : 'New booking',
        subtitle: editing ? 'Update rental dates and statuses.' : 'Reserve a vehicle for a customer.',
        body: bookingForm(booking || {}),
        submitText: editing ? 'Save changes' : 'Create booking',
        onSubmit: async backdrop => {
            const form = backdrop.querySelector('#bookingForm'); if (!form.reportValidity()) return false;
            const f = new FormData(form);
            if (f.get('returnDate') < f.get('rentalDate')) { App.toast('Return date cannot be before the rental date.', 'error'); return false; }
            const payload = { ...(booking || {}), bookingId: booking?.bookingId || App.uuid(), customerId: f.get('customerId'), vehicleId: f.get('vehicleId'), rentalDate: f.get('rentalDate'), returnDate: f.get('returnDate'), paymentStatus: f.get('paymentStatus'), bookingStatus: f.get('bookingStatus') };
            const saved = await App.api(editing ? '/bookings/update' : '/bookings/create', { method: editing ? 'PUT' : 'POST', body: payload });
            if (editing) bookings = bookings.map(b => b.bookingId === booking.bookingId ? saved : b); else bookings.unshift(saved);
            renderBookings(); App.toast(editing ? 'Booking updated.' : 'Booking created.'); return true;
        }
    });
}
