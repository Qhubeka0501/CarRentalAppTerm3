document.addEventListener('DOMContentLoaded', async () => {
    const user = await App.ready;
    if (!user) return;
    document.getElementById('welcomeUser').textContent = (user.email || 'staff member').split('@')[0];
    await loadDashboard();
});

async function loadDashboard() {
    App.setBusy(true);
    const requests = [
        App.api('/vehicle/getAll'),
        App.api('/customer/getAll'),
        App.api('/bookings/getAll'),
        App.api('/payment/getAll')
    ];
    const [vehiclesR, customersR, bookingsR, paymentsR] = await Promise.allSettled(requests);
    const vehicles = vehiclesR.status === 'fulfilled' ? vehiclesR.value || [] : [];
    const customers = customersR.status === 'fulfilled' ? customersR.value || [] : [];
    const bookings = bookingsR.status === 'fulfilled' ? bookingsR.value || [] : [];
    const payments = paymentsR.status === 'fulfilled' ? paymentsR.value || [] : [];

    document.getElementById('statVehicles').textContent = vehicles.length;
    document.getElementById('statCustomers').textContent = customers.length;
    document.getElementById('statBookings').textContent = bookings.length;
    document.getElementById('statPayments').textContent = payments.length;

    const available = vehicles.filter(v => v.status === 'AVAILABLE').length;
    const activeFleet = vehicles.filter(v => ['RENTED', 'RESERVED'].includes(v.status)).length;
    const maintenance = vehicles.filter(v => v.status === 'UNDER_MAINTENANCE').length;
    document.getElementById('metaVehicles').textContent = `${available} currently available`;
    document.getElementById('metaBookings').textContent = `${bookings.filter(b => b.bookingStatus === 'CONFIRMED').length} confirmed`;
    const paidTotal = payments.filter(p => ['PAID','COMPLETED'].includes(String(p.paymentStatus).toUpperCase())).reduce((s,p) => s + Number(p.amount || 0), 0);
    document.getElementById('metaPayments').textContent = `${App.formatMoney(paidTotal)} paid`;

    const total = Math.max(vehicles.length, 1);
    document.getElementById('availableCount').textContent = available;
    document.getElementById('activeFleetCount').textContent = activeFleet;
    document.getElementById('maintenanceCount').textContent = maintenance;
    document.getElementById('availableBar').style.width = `${available / total * 100}%`;
    document.getElementById('activeFleetBar').style.width = `${activeFleet / total * 100}%`;
    document.getElementById('maintenanceBar').style.width = `${maintenance / total * 100}%`;

    const customerMap = Object.fromEntries(customers.map(c => [c.customerId || c.userId, `${c.firstName || ''} ${c.lastName || ''}`.trim()]));
    const recent = [...bookings].sort((a,b) => String(b.rentalDate || '').localeCompare(String(a.rentalDate || ''))).slice(0,5);
    const tbody = document.getElementById('recentBookings');
    const empty = document.getElementById('recentBookingsEmpty');
    if (!recent.length) {
        tbody.innerHTML = '';
        empty.innerHTML = App.empty('No bookings yet', 'Create a booking to see recent activity here.');
    } else {
        empty.innerHTML = '';
        tbody.innerHTML = recent.map(b => `<tr><td><div class="table-title">${App.escape(customerMap[b.customerId] || 'Customer')}</div><div class="table-sub">${App.escape((b.bookingId || '').slice(0,8))}</div></td><td>${App.formatDate(b.rentalDate)} → ${App.formatDate(b.returnDate)}</td><td>${App.statusBadge(b.bookingStatus)}</td></tr>`).join('');
    }
    App.setBusy(false);
}
