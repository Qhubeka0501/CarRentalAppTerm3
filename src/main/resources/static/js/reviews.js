let reviews = [], reviewCustomers = [];
let reviewQuery = '', reviewRating = '';

document.addEventListener('DOMContentLoaded', async () => {
    if (!await App.ready) return;
    document.getElementById('addReview').addEventListener('click', () => openReviewModal());
    document.getElementById('reviewSearch').addEventListener('input', e => { reviewQuery = e.target.value; renderReviews(); });
    document.getElementById('reviewRatingFilter').addEventListener('change', e => { reviewRating = e.target.value; renderReviews(); });
    document.getElementById('reviewRows').addEventListener('click', handleReviewAction);
    await loadReviews();
});

function rcid(c) { return c.customerId || c.userId; }
function rcname(c) { return `${c.firstName || ''} ${c.lastName || ''}`.trim() || 'Customer'; }
function reviewCustomer(id) { return reviewCustomers.find(c => rcid(c) === id); }

async function loadReviews() {
    App.setBusy(true);
    try {
        [reviews, reviewCustomers] = await Promise.all([App.api('/review/getAll'), App.api('/customer/getAll')]);
        reviews ||= []; reviewCustomers ||= []; renderReviews();
    } catch (error) { App.toast(error.message,'error'); document.getElementById('reviewEmpty').innerHTML = App.empty('Unable to load reviews','Check the server and refresh.'); }
    finally { App.setBusy(false); }
}

function renderReviews() {
    let rows = App.filterRows(reviews, reviewQuery, ['reviewId','customerId','comments', r => rcname(reviewCustomer(r.customerId) || {})]);
    if (reviewRating) rows = rows.filter(r => Number(r.rating) === Number(reviewRating));
    const avg = reviews.length ? reviews.reduce((s,r) => s + Number(r.rating || 0),0) / reviews.length : 0;
    document.getElementById('reviewTotal').textContent = reviews.length;
    document.getElementById('reviewAverage').textContent = reviews.length ? avg.toFixed(1) : '—';
    document.getElementById('reviewFive').textContent = reviews.filter(r => Number(r.rating) === 5).length;
    document.getElementById('reviewCount').textContent = `${rows.length} review${rows.length === 1 ? '' : 's'}`;
    const tbody = document.getElementById('reviewRows'), empty = document.getElementById('reviewEmpty');
    if (!rows.length) { tbody.innerHTML=''; empty.innerHTML=App.empty('No reviews found', reviewQuery || reviewRating ? 'Try changing your filters.' : 'Add a customer review to begin tracking feedback.'); return; }
    empty.innerHTML='';
    tbody.innerHTML = rows.map(r => { const c=reviewCustomer(r.customerId); const stars='★'.repeat(Math.max(0,Math.min(5,Number(r.rating)||0)))+'☆'.repeat(Math.max(0,5-(Number(r.rating)||0))); return `<tr><td><div class="table-title">${App.escape(c ? rcname(c) : 'Unknown customer')}</div><div class="table-sub">${App.escape(c?.email || r.customerId || '')}</div></td><td><span class="rating">${stars}</span><div class="table-sub">${App.escape(r.rating)}/5</div></td><td style="max-width:420px">${App.escape(r.comments || '—')}</td><td><span class="table-sub">${App.escape(r.reviewId || '')}</span></td><td>${App.actionButtons(r.reviewId)}</td></tr>`; }).join('');
}

async function handleReviewAction(event) {
    const button=event.target.closest('[data-action]'); if(!button)return; const item=reviews.find(r=>r.reviewId===button.dataset.id); if(!item)return;
    if(button.dataset.action==='edit')return openReviewModal(item);
    if(!await App.confirm('Delete review?','This customer feedback record will be removed.'))return;
    try{await App.api(`/review/delete/${encodeURIComponent(item.reviewId)}`,{method:'DELETE'});reviews=reviews.filter(r=>r.reviewId!==item.reviewId);renderReviews();App.toast('Review deleted.');}catch(error){App.toast(error.message,'error');}
}

function reviewForm(r={}) {
    const opts=reviewCustomers.map(c=>`<option value="${App.escape(rcid(c))}" ${r.customerId===rcid(c)?'selected':''}>${App.escape(rcname(c))} · ${App.escape(c.email||'')}</option>`).join('');
    return `<form id="reviewForm" class="form-grid"><div class="field full"><label>Customer</label><select name="customerId" required><option value="">Select customer</option>${opts}</select></div><div class="field"><label>Rating</label><select name="rating" required>${[5,4,3,2,1].map(n=>`<option value="${n}" ${Number(r.rating)===n?'selected':''}>${n} star${n===1?'':'s'}</option>`).join('')}</select></div><div class="field full"><label>Comments</label><textarea name="comments" required placeholder="Customer feedback">${App.escape(r.comments||'')}</textarea></div></form>`;
}

async function openReviewModal(review=null) {
    if(!reviewCustomers.length&&!review){App.toast('Add a customer before recording a review.','info');return;}
    const editing=Boolean(review);
    await App.modal({title:editing?'Edit review':'Add review',subtitle:'Capture customer feedback and service rating.',body:reviewForm(review||{}),submitText:editing?'Save changes':'Add review',onSubmit:async backdrop=>{
        const form=backdrop.querySelector('#reviewForm');if(!form.reportValidity())return false;const f=new FormData(form);
        const payload={...(review||{}),reviewId:review?.reviewId||App.uuid(),customerId:f.get('customerId'),rating:Number(f.get('rating')),comments:f.get('comments').trim()};
        const saved=await App.api(editing?'/review/update':'/review/create',{method:editing?'PUT':'POST',body:payload});
        if(editing)reviews=reviews.map(r=>r.reviewId===review.reviewId?saved:r);else reviews.unshift(saved);renderReviews();App.toast(editing?'Review updated.':'Review added.');return true;
    }});
}
