/* ═══════════════════════════════════════════════════════════════
   3FTYWHLS — Admin Management Portal Script
   ═══════════════════════════════════════════════════════════════ */

const ADMIN_PIN = '3FTY2026';
const AUTH_KEY = '3ftywhls_admin_auth';

let editingCarId = null;
let uploadedDataUrls = [];

// ─── Auth / Lock Screen ─────────────────────────────────────────
function checkAuth() {
  const isAuth = localStorage.getItem(AUTH_KEY) === 'true';
  const overlay = document.getElementById('pin-overlay');
  const main = document.getElementById('admin-main');

  if (isAuth) {
    overlay.classList.remove('open');
    main.style.display = 'block';
    renderAdminTable();
    updateMetrics();
  } else {
    overlay.classList.add('open');
    main.style.display = 'none';
  }
}

function unlockAdmin() {
  const input = document.getElementById('pin-input');
  const errEl = document.getElementById('pin-error');
  const val = input.value.trim();

  if (val === ADMIN_PIN) {
    localStorage.setItem(AUTH_KEY, 'true');
    errEl.style.display = 'none';
    input.value = '';
    checkAuth();
    showToast('🔓 Portal Unlocked Successfully');
  } else {
    errEl.style.display = 'block';
    input.select();
  }
}

function lockAdmin() {
  localStorage.removeItem(AUTH_KEY);
  checkAuth();
  showToast('🔒 Portal Locked');
}

// ─── Metrics Dashboard ─────────────────────────────────────────
function updateMetrics() {
  const vehicles = window.ThriftyInventory ? window.ThriftyInventory.getAll() : [];
  
  const totalCars = vehicles.length;
  const availableCars = vehicles.filter(v => (v.status || 'available') === 'available').length;
  const soldCars = totalCars - availableCars;

  const totalValNum = vehicles.reduce((sum, v) => sum + (Number(v.priceNum) || 0), 0);
  const formattedVal = totalValNum >= 1000000 
    ? `KSh ${(totalValNum / 1000000).toFixed(2)}M` 
    : `KSh ${(totalValNum / 1000).toFixed(0)}K`;

  document.getElementById('metric-total-cars').textContent = totalCars;
  document.getElementById('metric-total-value').textContent = formattedVal;
  document.getElementById('metric-available-cars').textContent = availableCars;
  document.getElementById('metric-sold-cars').textContent = soldCars;
}

// ─── Table Rendering ───────────────────────────────────────────
function renderAdminTable() {
  updateMetrics();
  const vehicles = window.ThriftyInventory ? window.ThriftyInventory.getAll() : [];
  const tbody = document.getElementById('admin-table-body');
  
  const query = (document.getElementById('admin-search')?.value || '').toLowerCase();
  const statusFilter = document.getElementById('admin-status-filter')?.value || 'all';
  const tagFilter = document.getElementById('admin-tag-filter')?.value || 'all';

  let filtered = vehicles.filter(v => {
    const status = v.status || 'available';
    const matchesSearch = v.name.toLowerCase().includes(query) || 
                          (v.subtitle && v.subtitle.toLowerCase().includes(query)) ||
                          (v.price && v.price.toLowerCase().includes(query));
    
    const matchesStatus = statusFilter === 'all' || status === statusFilter;
    const matchesTag = tagFilter === 'all' || (v.tags && v.tags.includes(tagFilter));

    return matchesSearch && matchesStatus && matchesTag;
  });

  tbody.innerHTML = '';

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 40px; color: var(--text3);">
          No vehicles match your filter criteria.
        </td>
      </tr>`;
    return;
  }

  filtered.forEach(v => {
    const tr = document.createElement('tr');
    
    const thumbSrc = v.images && v.images.length > 0 ? v.images[0] : '';
    const status = v.status || 'available';
    
    let yearSpec = 'N/A';
    if (v.specs) {
      const y = v.specs.find(s => s.label.toLowerCase() === 'year');
      if (y) yearSpec = y.value;
    }

    const tagsHtml = (v.tags || []).map(t => `<span class="tag-chip">${t}</span>`).join('');

    tr.innerHTML = `
      <td>
        <div class="table-car-cell">
          <img src="${thumbSrc}" alt="${v.name}" class="table-thumb" onerror="this.src='https://via.placeholder.com/80x60?text=No+Img'" />
          <div>
            <div class="table-car-name">${v.name}</div>
            <div class="table-car-sub">${v.subtitle || ''}</div>
          </div>
        </div>
      </td>
      <td>${tagsHtml}</td>
      <td>
        <span class="price-text">${v.price}</span>
        ${v.negotiable ? '<span class="neg-pill">neg.</span>' : ''}
      </td>
      <td>
        <span class="status-badge ${status}" onclick="cycleCarStatus('${v.id}')" style="cursor: pointer;" title="Click to change status">
          ${status} 🔄
        </span>
      </td>
      <td>${yearSpec}</td>
      <td>📷 ${v.images ? v.images.length : 0}</td>
      <td style="text-align: right;">
        <div class="action-btns">
          <button class="btn-act btn-act-price" onclick="openQuickPrice('${v.id}')" title="Quick Edit Price">💰 Price</button>
          <button class="btn-act btn-act-edit" onclick="openEditModal('${v.id}')" title="Edit Vehicle Specs & Info">✏️ Edit</button>
          <button class="btn-act btn-act-delete" onclick="deleteVehicle('${v.id}')" title="Delete Listing">🗑️</button>
        </div>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

// ─── Status Cycle Helper ───────────────────────────────────────
function cycleCarStatus(id) {
  const vehicles = window.ThriftyInventory.getAll();
  const car = vehicles.find(v => v.id === id);
  if (!car) return;

  const current = car.status || 'available';
  const nextMap = {
    'available': 'reserved',
    'reserved': 'sold',
    'sold': 'available'
  };

  car.status = nextMap[current] || 'available';
  window.ThriftyInventory.saveAll(vehicles);
  renderAdminTable();
  showToast(`Updated status to ${car.status.toUpperCase()}`);
}

// ─── Add & Edit Modal Logic ────────────────────────────────────
function openAddModal() {
  editingCarId = null;
  uploadedDataUrls = [];
  document.getElementById('afm-title').textContent = 'Add New Vehicle';
  document.getElementById('vehicle-form').reset();
  document.getElementById('form-car-id').value = '';
  document.getElementById('image-previews').innerHTML = '';
  document.getElementById('form-status').value = 'available';

  document.getElementById('vehicle-modal').classList.add('open');
}

function openEditModal(id) {
  const vehicles = window.ThriftyInventory.getAll();
  const car = vehicles.find(v => v.id === id);
  if (!car) return;

  editingCarId = id;
  uploadedDataUrls = [];

  document.getElementById('afm-title').textContent = `Edit — ${car.name}`;
  document.getElementById('form-car-id').value = car.id;
  document.getElementById('form-name').value = car.name || '';
  document.getElementById('form-subtitle').value = car.subtitle || '';
  document.getElementById('form-price').value = car.price || '';
  document.getElementById('form-price-num').value = car.priceNum || '';
  document.getElementById('form-status').value = car.status || 'available';
  document.getElementById('form-negotiable').checked = !!car.negotiable;

  // Category tags
  const tagChks = document.querySelectorAll('.tag-chk');
  tagChks.forEach(chk => {
    chk.checked = car.tags && car.tags.includes(chk.value);
  });

  // Specs
  let engine = '', year = '', seats = '', fuel = '';
  if (car.specs) {
    car.specs.forEach(s => {
      const l = s.label.toLowerCase();
      if (l === 'engine') engine = s.value;
      if (l === 'year') year = s.value;
      if (l === 'seats') seats = s.value;
      if (l === 'fuel') fuel = s.value;
    });
  }

  document.getElementById('spec-engine').value = engine;
  document.getElementById('spec-year').value = year;
  document.getElementById('spec-seats').value = seats;
  document.getElementById('spec-fuel').value = fuel;

  // Features
  document.getElementById('form-features').value = (car.features || []).join(', ');

  // Images
  document.getElementById('form-images-text').value = (car.images || []).join('\n');
  renderImagePreviews(car.images || []);

  document.getElementById('vehicle-modal').classList.add('open');
}

function closeVehicleModal() {
  document.getElementById('vehicle-modal').classList.remove('open');
}

function renderImagePreviews(imgs) {
  const container = document.getElementById('image-previews');
  container.innerHTML = '';
  imgs.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'preview-thumb';
    img.onerror = () => img.style.display = 'none';
    container.appendChild(img);
  });
}

function handleImageFiles(e) {
  const files = Array.from(e.target.files);
  if (files.length === 0) return;

  const textarea = document.getElementById('form-images-text');
  let currentPaths = textarea.value ? textarea.value.split('\n').map(s => s.trim()).filter(Boolean) : [];

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      currentPaths.unshift(dataUrl);
      textarea.value = currentPaths.join('\n');
      renderImagePreviews(currentPaths);
    };
    reader.readAsDataURL(file);
  });
}

function saveVehicleForm() {
  const vehicles = window.ThriftyInventory.getAll();
  
  const id = editingCarId || `car-${Date.now()}`;
  const name = document.getElementById('form-name').value.trim();
  const subtitle = document.getElementById('form-subtitle').value.trim();
  const price = document.getElementById('form-price').value.trim();
  const priceNum = Number(document.getElementById('form-price-num').value) || 0;
  const status = document.getElementById('form-status').value;
  const negotiable = document.getElementById('form-negotiable').checked;

  // Tags
  const tags = [];
  document.querySelectorAll('.tag-chk:checked').forEach(chk => tags.push(chk.value));
  if (tags.length === 0) tags.push('suv'); // default tag

  // Specs
  const specs = [];
  const engine = document.getElementById('spec-engine').value.trim();
  const year = document.getElementById('spec-year').value.trim();
  const seats = document.getElementById('spec-seats').value.trim();
  const fuel = document.getElementById('spec-fuel').value.trim();

  if (engine) specs.push({ label: 'Engine', value: engine });
  if (year)   specs.push({ label: 'Year', value: year });
  if (seats)  specs.push({ label: 'Seats', value: seats });
  if (fuel)   specs.push({ label: 'Fuel', value: fuel });

  // Features
  const featStr = document.getElementById('form-features').value;
  const features = featStr ? featStr.split(',').map(s => s.trim()).filter(Boolean) : [];

  // Images
  const imgStr = document.getElementById('form-images-text').value;
  const images = imgStr ? imgStr.split('\n').map(s => s.trim()).filter(Boolean) : [];

  const carObj = {
    id,
    name,
    subtitle,
    price,
    priceNum,
    status,
    negotiable,
    tags,
    specs,
    features,
    location: 'Nairobi',
    images: images.length > 0 ? images : ['https://via.placeholder.com/600x400?text=No+Image']
  };

  if (editingCarId) {
    const idx = vehicles.findIndex(v => v.id === editingCarId);
    if (idx !== -1) vehicles[idx] = carObj;
  } else {
    vehicles.unshift(carObj);
  }

  window.ThriftyInventory.saveAll(vehicles);
  closeVehicleModal();
  renderAdminTable();
  showToast(editingCarId ? '✅ Vehicle Updated Successfully' : '🎉 New Vehicle Published!');
}

// ─── Quick Price Edit Modal ────────────────────────────────────
function openQuickPrice(id) {
  const vehicles = window.ThriftyInventory.getAll();
  const car = vehicles.find(v => v.id === id);
  if (!car) return;

  document.getElementById('qp-car-id').value = car.id;
  document.getElementById('qp-car-name').textContent = car.name;
  document.getElementById('qp-price-text').value = car.price || '';
  document.getElementById('qp-price-num').value = car.priceNum || '';

  document.getElementById('price-modal').classList.add('open');
}

function closePriceModal() {
  document.getElementById('price-modal').classList.remove('open');
}

function saveQuickPrice() {
  const id = document.getElementById('qp-car-id').value;
  const priceText = document.getElementById('qp-price-text').value.trim();
  const priceNum = Number(document.getElementById('qp-price-num').value) || 0;

  const vehicles = window.ThriftyInventory.getAll();
  const car = vehicles.find(v => v.id === id);
  if (car) {
    car.price = priceText;
    car.priceNum = priceNum;
    window.ThriftyInventory.saveAll(vehicles);
    closePriceModal();
    renderAdminTable();
    showToast(`💰 Price updated to ${priceText}`);
  }
}

// ─── Delete & Reset ────────────────────────────────────────────
function deleteVehicle(id) {
  const vehicles = window.ThriftyInventory.getAll();
  const car = vehicles.find(v => v.id === id);
  if (!car) return;

  if (confirm(`Are you sure you want to delete "${car.name}" from inventory?`)) {
    const updated = vehicles.filter(v => v.id !== id);
    window.ThriftyInventory.saveAll(updated);
    renderAdminTable();
    showToast('🗑️ Vehicle Removed from Inventory');
  }
}

function confirmResetData() {
  if (confirm('Are you sure you want to reset inventory back to default cars? Any custom additions will be overwritten.')) {
    window.ThriftyInventory.resetToDefaults();
    renderAdminTable();
    showToast('🔄 Inventory Reset to Defaults');
  }
}

// ─── Import & Export JSON ──────────────────────────────────────
function exportDataJSON() {
  const vehicles = window.ThriftyInventory.getAll();
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(vehicles, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `3ftywhls_inventory_${new Date().toISOString().slice(0,10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('📥 Data exported to JSON');
}

function triggerImportJSON() {
  document.getElementById('import-file-input').click();
}

function importDataJSON(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      if (Array.isArray(data) && data.length > 0) {
        window.ThriftyInventory.saveAll(data);
        renderAdminTable();
        showToast('📤 Inventory Imported Successfully!');
      } else {
        alert('Invalid JSON file structure. Expected an array of vehicle objects.');
      }
    } catch (err) {
      alert('Error parsing JSON file: ' + err.message);
    }
  };
  reader.readAsText(file);
}

// ─── Toast Notification Helper ─────────────────────────────────
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ─── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
});
