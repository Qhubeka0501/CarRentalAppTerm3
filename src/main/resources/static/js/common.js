(() => {
    const icons = {
        dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg>',
        vehicle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 17h14l1-5-2.5-5h-11L4 12l1 5Z"/><path d="M3 12h18M7 17v2M17 17v2"/><circle cx="7.5" cy="14.5" r="1" fill="currentColor"/><circle cx="16.5" cy="14.5" r="1" fill="currentColor"/></svg>',
        customers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="8" r="3"/><path d="M3.5 19c.5-4 2.4-6 5.5-6s5 2 5.5 6"/><path d="M16 8.5c2.6.2 4.2 1.8 4.5 4.5M16.5 13.5c2.2.7 3.4 2.5 3.8 5.5"/></svg>',
        bookings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16M8 14h3M8 17h6"/></svg>',
        payments: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h3"/></svg>',
        maintenance: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m14 6 4-4 4 4-4 4M16 8 7 17l-2 2-2-2 2-2 9-9"/><circle cx="6" cy="6" r="3"/></svg>',
        staff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2.8 20c.4-4.3 2.1-6.5 5.2-6.5s4.8 2.2 5.2 6.5M13.5 15c.8-.7 1.9-1.1 3.3-1.1 2.7 0 4.1 1.8 4.4 5.4"/></svg>',
        reviews: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3.5 14.6 9l6 .8-4.3 4.2 1.1 6-5.4-2.9L6.6 20l1.1-6-4.3-4.2 6-.8L12 3.5Z"/></svg>',
        notifications: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 9a6 6 0 0 1 12 0c0 7 3 7 3 8H3c0-1 3-1 3-8Z"/><path d="M10 21h4"/></svg>',
        plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
        search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
        edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m4 20 4.5-1 10-10-3.5-3.5-10 10L4 20Z"/><path d="m13.8 6.7 3.5 3.5"/></svg>',
        trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5"/></svg>',
        x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 6 12 12M18 6 6 18"/></svg>',
        menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
        logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 5H5v14h5M14 8l4 4-4 4M18 12H9"/></svg>',
        refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 7v5h-5M4 17v-5h5"/><path d="M18.5 9A7 7 0 0 0 6 6.5L4 9M5.5 15A7 7 0 0 0 18 17.5l2-2.5"/></svg>',
        check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 4 4L19 6"/></svg>',
        info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/></svg>',
        warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3 2.8 20h18.4L12 3Z"/><path d="M12 9v5M12 17h.01"/></svg>',
        arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M14 7l5 5-5 5"/></svg>'
    };

    const navItems = [
        ['dashboard', 'Dashboard', '/dashboard.html', 'dashboard'],
        ['vehicles', 'Vehicles', '/vehicles.html', 'vehicle'],
        ['customers', 'Customers', '/customers.html', 'customers'],
        ['bookings', 'Bookings', '/bookings.html', 'bookings'],
        ['payments', 'Payments', '/payments.html', 'payments'],
        ['maintenance', 'Maintenance', '/maintenance.html', 'maintenance'],
        ['staff', 'Staff & Roles', '/staff.html', 'staff'],
        ['reviews', 'Reviews', '/reviews.html', 'reviews'],
        ['notifications', 'Notifications', '/notifications.html', 'notifications']
    ];

    let resolveReady;
    const ready = new Promise(resolve => { resolveReady = resolve; });

    const App = {
        icons,
        ready,
        currentUser: null,
        icon(name) { return icons[name] || ''; },
        uuid() {
            return (crypto?.randomUUID?.() || 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                const r = Math.random() * 16 | 0;
                const v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            }));
        },
        formatMoney(value) {
            const amount = Number(value || 0);
            return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(amount);
        },
        formatDate(value) {
            if (!value) return '—';
            const date = new Date(`${String(value).slice(0, 10)}T00:00:00`);
            return Number.isNaN(date.getTime()) ? String(value) : new Intl.DateTimeFormat('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
        },
        formatDateTime(value) {
            if (!value) return '—';
            const date = new Date(value);
            return Number.isNaN(date.getTime()) ? String(value) : new Intl.DateTimeFormat('en-ZA', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
        },
        escape(value) {
            const div = document.createElement('div');
            div.textContent = value ?? '';
            return div.innerHTML;
        },
        statusBadge(status) {
            const value = String(status || 'UNKNOWN').toUpperCase();
            let cls = 'badge-neutral';
            if (['AVAILABLE', 'PAID', 'COMPLETED', 'CONFIRMED', 'ACTIVE', 'SUCCESS'].includes(value)) cls = 'badge-success';
            else if (['PENDING', 'RESERVED', 'UNDER_MAINTENANCE'].includes(value)) cls = 'badge-warning';
            else if (['FAILED', 'CANCELLED', 'RENTED', 'INACTIVE'].includes(value)) cls = 'badge-danger';
            else if (['CARD', 'CASH', 'EFT', 'PAYPAL', 'EMAIL', 'SMS', 'PUSH_NOTIFICATION'].includes(value)) cls = 'badge-info';
            return `<span class="badge ${cls}">${App.escape(value.replaceAll('_', ' '))}</span>`;
        },
        initials(email) {
            if (!email) return 'CR';
            const name = email.split('@')[0].replace(/[._-]+/g, ' ').trim();
            const bits = name.split(/\s+/).filter(Boolean);
            return ((bits[0]?.[0] || '') + (bits[1]?.[0] || bits[0]?.[1] || '')).toUpperCase() || 'CR';
        },
        setBusy(active) {
            document.getElementById('globalLoading')?.classList.toggle('active', Boolean(active));
        },
        async api(url, options = {}) {
            const opts = { ...options, headers: { ...(options.headers || {}) } };
            if (opts.body && typeof opts.body !== 'string') {
                opts.headers['Content-Type'] = 'application/json';
                opts.body = JSON.stringify(opts.body);
            }
            const response = await fetch(url, opts);
            const contentType = response.headers.get('content-type') || '';
            let data = null;
            if (response.status !== 204) {
                if (contentType.includes('application/json')) data = await response.json();
                else data = await response.text();
            }
            if (!response.ok) {
                const message = data?.message || (typeof data === 'string' && data) || `Request failed (${response.status})`;
                const error = new Error(message);
                error.status = response.status;
                error.data = data;
                throw error;
            }
            return data;
        },
        toast(message, type = 'success', title = '') {
            let root = document.getElementById('toastRoot');
            if (!root) {
                root = document.createElement('div');
                root.id = 'toastRoot';
                root.className = 'toast-root';
                document.body.appendChild(root);
            }
            const label = title || (type === 'error' ? 'Something went wrong' : type === 'info' ? 'Information' : 'Success');
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.innerHTML = `<div class="toast-icon">${icons[type === 'error' ? 'warning' : type === 'info' ? 'info' : 'check']}</div><div class="toast-copy"><strong>${App.escape(label)}</strong><span>${App.escape(message)}</span></div>`;
            root.appendChild(toast);
            setTimeout(() => toast.remove(), 3600);
        },
        modal({ title, subtitle = '', body = '', size = '', submitText = '', submitClass = 'btn-primary', onSubmit = null }) {
            return new Promise(resolve => {
                const backdrop = document.createElement('div');
                backdrop.className = 'modal-backdrop';
                backdrop.innerHTML = `
                    <div class="modal ${size === 'sm' ? 'modal-sm' : ''}" role="dialog" aria-modal="true">
                        <div class="modal-head">
                            <div><h2>${App.escape(title)}</h2>${subtitle ? `<p>${App.escape(subtitle)}</p>` : ''}</div>
                            <button class="modal-close" type="button" aria-label="Close">${icons.x}</button>
                        </div>
                        <div class="modal-body">${body}</div>
                        <div class="modal-foot">
                            <button class="btn btn-secondary modal-cancel" type="button">Cancel</button>
                            ${submitText ? `<button class="btn ${submitClass} modal-submit" type="button">${App.escape(submitText)}</button>` : ''}
                        </div>
                    </div>`;
                document.body.appendChild(backdrop);
                const close = result => { backdrop.remove(); resolve(result); };
                backdrop.querySelector('.modal-close').addEventListener('click', () => close(null));
                backdrop.querySelector('.modal-cancel').addEventListener('click', () => close(null));
                backdrop.addEventListener('click', e => { if (e.target === backdrop) close(null); });
                if (submitText) {
                    const submit = backdrop.querySelector('.modal-submit');
                    submit.addEventListener('click', async () => {
                        if (!onSubmit) return close(true);
                        submit.disabled = true;
                        const old = submit.textContent;
                        submit.textContent = 'Please wait…';
                        try {
                            const result = await onSubmit(backdrop);
                            if (result !== false) close(result ?? true);
                        } catch (error) {
                            App.toast(error.message || 'Unable to complete the request.', 'error');
                        } finally {
                            if (document.body.contains(submit)) {
                                submit.disabled = false;
                                submit.textContent = old;
                            }
                        }
                    });
                }
                setTimeout(() => backdrop.querySelector('input, select, textarea, button')?.focus(), 30);
            });
        },
        confirm(title, message, confirmText = 'Delete') {
            return App.modal({
                title,
                subtitle: message,
                body: '<div class="note">This action cannot be undone.</div>',
                size: 'sm',
                submitText: confirmText,
                submitClass: 'btn-danger'
            });
        },
        empty(title = 'Nothing here yet', text = 'There are no records to display.') {
            return `<div class="empty-state"><div class="empty-icon">${icons.info}</div><h3>${App.escape(title)}</h3><p>${App.escape(text)}</p></div>`;
        },
        filterRows(items, query, fields) {
            const q = String(query || '').trim().toLowerCase();
            if (!q) return items;
            return items.filter(item => fields.some(field => {
                const value = typeof field === 'function' ? field(item) : item?.[field];
                return String(value ?? '').toLowerCase().includes(q);
            }));
        },
        actionButtons(id, { edit = true, remove = true } = {}) {
            const safe = App.escape(id);
            return `<div class="table-actions">
                ${edit ? `<button class="action-btn" data-action="edit" data-id="${safe}" title="Edit">${icons.edit}</button>` : ''}
                ${remove ? `<button class="action-btn danger" data-action="delete" data-id="${safe}" title="Delete">${icons.trash}</button>` : ''}
            </div>`;
        }
    };

    window.App = App;

    function renderShell() {
        const page = document.body.dataset.page || 'dashboard';
        const pageTitle = document.body.dataset.title || 'Dashboard';
        const side = document.getElementById('appSidebar');
        const top = document.getElementById('appTopbar');
        if (!side || !top) return;

        side.innerHTML = `
            <div class="sidebar-brand">
                <a class="brand" href="/dashboard.html">
                    <span class="brand-mark">${icons.vehicle}</span>
                    <span>CareRent<small>Management System</small></span>
                </a>
            </div>
            <nav class="sidebar-nav">
                <div class="nav-label">Workspace</div>
                ${navItems.slice(0, 6).map(([key,label,href,icon]) => `<a class="nav-link ${page === key ? 'active' : ''}" href="${href}">${icons[icon]}<span>${label}</span></a>`).join('')}
                <div class="nav-label">Administration</div>
                ${navItems.slice(6).map(([key,label,href,icon]) => `<a class="nav-link ${page === key ? 'active' : ''}" href="${href}">${icons[icon]}<span>${label}</span></a>`).join('')}
            </nav>
            <div class="sidebar-footer"><div class="sidebar-user"><span class="user-email" data-user-email>Checking session…</span><span class="user-role">Authenticated staff</span></div></div>`;

        top.innerHTML = `
            <div class="topbar-left">
                <button class="mobile-menu" id="mobileMenu" type="button" aria-label="Open menu">${icons.menu}</button>
                <div class="breadcrumb">CareRent / <strong>${App.escape(pageTitle)}</strong></div>
            </div>
            <div class="topbar-actions">
                <button class="icon-btn" id="refreshPage" type="button" title="Refresh">${icons.refresh}</button>
                <div class="top-user"><div class="avatar" data-user-initials>CR</div><div class="top-user-copy"><strong data-user-name>Staff user</strong><span data-user-email>Loading…</span></div></div>
                <button class="icon-btn" id="logoutButton" type="button" title="Log out">${icons.logout}</button>
            </div>`;

        document.getElementById('mobileMenu')?.addEventListener('click', () => document.body.classList.toggle('sidebar-open'));
        document.getElementById('appOverlay')?.addEventListener('click', () => document.body.classList.remove('sidebar-open'));
        document.getElementById('refreshPage')?.addEventListener('click', () => window.location.reload());
        document.getElementById('logoutButton')?.addEventListener('click', logout);
    }

    async function logout() {
        try { await App.api('/login/logout', { method: 'POST' }); }
        catch (_) { /* session may already be gone */ }
        window.location.replace('/login.html');
    }

    async function boot() {
        renderShell();
        if (!document.body.classList.contains('app-page')) {
            resolveReady(null);
            return;
        }
        try {
            const data = await App.api('/login/status');
            App.currentUser = data;
            document.querySelectorAll('[data-user-email]').forEach(el => el.textContent = data.email || 'Staff user');
            document.querySelectorAll('[data-user-name]').forEach(el => el.textContent = (data.email || 'Staff user').split('@')[0]);
            document.querySelectorAll('[data-user-initials]').forEach(el => el.textContent = App.initials(data.email));
            resolveReady(data);
        } catch (_) {
            resolveReady(null);
            window.location.replace('/login.html');
        }
    }

    document.addEventListener('DOMContentLoaded', boot);
})();
