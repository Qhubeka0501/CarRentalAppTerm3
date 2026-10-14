let payments = [], paymentBookings = [];
let paymentQuery = '', paymentStatusFilter = '';

document.addEventListener('DOMContentLoaded', async () => {
    if (!await App.ready) return;
    document.getElementById('addPayment').addEventListener('click', () => openPaymentModal());
    document.getElementById('paymentSearch').addEventListener('input', e => { paymentQuery = e.target.value; renderPayments(); });
    document.getElementById('paymentStatusFilter').addEventListener('change', e => { paymentStatusFilter = e.target.value; renderPayments(); });
    document.getElementById('paymentRows').addEventListener('click', handlePaymentAction);
    await loadPayments();
});

async function loadPayments() {
    App.setBusy(true);
    try {
        [payments, paymentBookings] = await Promise.all([App.api('/payment/getAll'), App.api('/bookings/getAll')]);
        payments ||= []; paymentBookings ||= [];
        renderPayments();
    } catch (error) {
        App.toast(error.message, 'error');
        document.getElementById('paymentEmpty').innerHTML = App.empty('Unable to load payments', 'Check the server and refresh.');
    } finally { App.setBusy(false); }
}

function renderPayments() {
    let rows = App.filterRows(payments, paymentQuery, ['paymentId','bookingId','paymentMethod','paymentStatus']);
    if (paymentStatusFilter) rows = rows.filter(p => p.paymentStatus === paymentStatusFilter);
    const paid = payments.filter(p => ['PAID','COMPLETED'].includes(String(p.paymentStatus).toUpperCase())).reduce((s,p) => s + Number(p.amount || 0), 0);
    document.getElementById('paymentTotal').textContent = payments.length;
    document.getElementById('paymentPaid').textContent = App.formatMoney(paid);
    document.getElementById('paymentPending').textContent = payments.filter(p => p.paymentStatus === 'PENDING').length;
    document.getElementById('paymentCount').textContent = `${rows.length} payment${rows.length === 1 ? '' : 's'}`;
    const tbody = document.getElementById('paymentRows'); const empty = document.getElementById('paymentEmpty');
    if (!rows.length) {
        tbody.innerHTML = '';
        empty.innerHTML = App.empty('No payments found', paymentQuery || paymentStatusFilter ? 'Try changing your search or status filter.' : 'Record a payment to start tracking booking payments.');
        return;
    }
    empty.innerHTML = '';
    tbody.innerHTML = rows.map(p => `<tr>
      <td><div class="table-title">#${App.escape((p.paymentId || '').slice(0,8))}</div><div class="table-sub">${App.escape(p.paymentId || '')}</div></td>
      <td><div>${App.escape((p.bookingId || '').slice(0,8))}</div><div class="table-sub">${App.escape(p.bookingId || '')}</div></td>
      <td class="table-title">${App.formatMoney(p.amount)}</td><td>${App.formatDate(p.paymentDate)}</td><td>${App.statusBadge(p.paymentMethod)}</td><td>${App.statusBadge(p.paymentStatus)}</td><td>${App.actionButtons(p.paymentId)}</td>
    </tr>`).join('');
}

async function handlePaymentAction(event) {
    const button = event.target.closest('[data-action]'); if (!button) return;
    const item = payments.find(p => p.paymentId === button.dataset.id); if (!item) return;
    if (button.dataset.action === 'edit') return openPaymentModal(item);
    const confirmed = await App.confirm('Delete payment?', `Payment ${item.paymentId.slice(0,8)} will be removed.`); if (!confirmed) return;
    try { await App.api(`/payment/delete/${encodeURIComponent(item.paymentId)}`, { method:'DELETE' }); payments = payments.filter(p => p.paymentId !== item.paymentId); renderPayments(); App.toast('Payment deleted.'); }
    catch (error) { App.toast(error.message, 'error'); }
}

function paymentForm(p = {}) {
    const options = paymentBookings.map(b => `<option value="${App.escape(b.bookingId)}" ${p.bookingId === b.bookingId ? 'selected' : ''}>Booking ${App.escape((b.bookingId || '').slice(0,8))} · ${App.formatDate(b.rentalDate)}</option>`).join('');
    const today = new Date().toISOString().slice(0,10);
    return `<form id="paymentForm" class="form-grid">
      <div class="field full"><label>Booking</label><select name="bookingId" required><option value="">Select booking</option>${options}</select></div>
      <div class="field"><label>Amount (R)</label><input name="amount" type="number" min="0" step="0.01" value="${App.escape(p.amount ?? '')}" required></div>
      <div class="field"><label>Payment date</label><input name="paymentDate" type="date" value="${App.escape(p.paymentDate || today)}" required></div>
      <div class="field"><label>Method</label><select name="paymentMethod">${['CASH','CARD','EFT','PAYPAL'].map(s => `<option ${p.paymentMethod === s ? 'selected' : ''}>${s}</option>`).join('')}</select></div>
      <div class="field"><label>Status</label><select name="paymentStatus">${['PENDING','PAID','COMPLETED','FAILED','CANCELLED'].map(s => `<option ${p.paymentStatus === s ? 'selected' : ''}>${s}</option>`).join('')}</select></div>
    </form>`;
}

async function openPaymentModal(payment = null) {
    if (!paymentBookings.length && !payment) { App.toast('Create a booking before recording a payment.', 'info'); return; }
    const editing = Boolean(payment);
    await App.modal({ title: editing ? 'Edit payment' : 'Record payment', subtitle: 'Link the payment to an existing booking.', body: paymentForm(payment || {}), submitText: editing ? 'Save changes' : 'Record payment', onSubmit: async backdrop => {
        const form = backdrop.querySelector('#paymentForm'); if (!form.reportValidity()) return false; const f = new FormData(form);
        const payload = { ...(payment || {}), paymentId: payment?.paymentId || App.uuid(), bookingId:f.get('bookingId'), amount:Number(f.get('amount')), paymentDate:f.get('paymentDate'), paymentMethod:f.get('paymentMethod'), paymentStatus:f.get('paymentStatus') };
        const saved = await App.api(editing ? '/payment/update' : '/payment/create', { method: editing ? 'PUT' : 'POST', body:payload });
        if (editing) payments = payments.map(p => p.paymentId === payment.paymentId ? saved : p); else payments.unshift(saved);
        renderPayments(); App.toast(editing ? 'Payment updated.' : 'Payment recorded.'); return true;
    }});
}
