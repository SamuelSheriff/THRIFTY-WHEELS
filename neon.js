/* ═══════════════════════════════════════════════════════════════
   3FTYWHLS — Neon Serverless PostgreSQL Client Integration
   ═══════════════════════════════════════════════════════════════ */

const NEON_STORAGE_KEY = '3ftywhls_neon_db_url';
const DEFAULT_NEON_URL = 'postgresql://neondb_owner:npg_ncImAMLqST80@ep-bold-cake-ayd4uup4-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require';

// Reads configured connection string or default
function getNeonConnectionString() {
  return localStorage.getItem(NEON_STORAGE_KEY) || DEFAULT_NEON_URL;
}

function setNeonConnectionString(url) {
  if (url) {
    localStorage.setItem(NEON_STORAGE_KEY, url.trim());
  } else {
    localStorage.removeItem(NEON_STORAGE_KEY);
  }
}

function isNeonConfigured() {
  const url = getNeonConnectionString();
  return !!(url && (url.startsWith('postgres://') || url.startsWith('postgresql://')));
}

// Executes SQL query against Neon Postgres using Neon Serverless SDK or HTTP API
async function executeNeonQuery(sqlText, params = []) {
  const connString = getNeonConnectionString();
  if (!connString) {
    throw new Error('Neon database connection string is not configured.');
  }

  // 1. If Neon IIFE driver is loaded in browser window
  if (window.neon && typeof window.neon === 'function') {
    const sql = window.neon(connString);
    return await sql(sqlText, params);
  } 
  // 2. Fallback using Neon HTTP API fetch
  else {
    const match = connString.match(/@([^/]+)\/([^?]+)/);
    if (!match) throw new Error('Invalid Neon connection string format.');

    const host = match[1];
    const httpUrl = `https://${host}/sql`;

    const res = await fetch(httpUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Neon-Connection-String': connString,
      },
      body: JSON.stringify({ query: sqlText, params }),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.message || `Neon API query error (${res.status})`);
    }

    const data = await res.json();
    return data.rows || data;
  }
}

// ─── High-Level Database Operations ─────────────────────────────
async function fetchVehiclesFromNeonDB() {
  try {
    const rows = await executeNeonQuery('SELECT * FROM vehicles ORDER BY created_at DESC');
    if (Array.isArray(rows)) {
      return rows.map(r => ({
        id: r.id,
        name: r.name,
        subtitle: r.subtitle || '',
        price: r.price,
        priceNum: Number(r.price_num || r.pricenum) || 0,
        negotiable: !!r.negotiable,
        status: r.status || 'available',
        tags: r.tags || ['suv'],
        specs: typeof r.specs === 'string' ? JSON.parse(r.specs) : (r.specs || []),
        features: r.features || [],
        location: r.location || 'Nairobi',
        images: r.images || []
      }));
    }
    return [];
  } catch (err) {
    console.warn('Neon DB Fetch Error:', err.message);
    throw err;
  }
}

async function saveVehicleToNeonDB(vehicle) {
  const sql = `
    INSERT INTO vehicles (id, name, subtitle, price, price_num, negotiable, status, tags, specs, features, location, images)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, $10, $11, $12)
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      subtitle = EXCLUDED.subtitle,
      price = EXCLUDED.price,
      price_num = EXCLUDED.price_num,
      negotiable = EXCLUDED.negotiable,
      status = EXCLUDED.status,
      tags = EXCLUDED.tags,
      specs = EXCLUDED.specs,
      features = EXCLUDED.features,
      location = EXCLUDED.location,
      images = EXCLUDED.images;
  `;

  const params = [
    vehicle.id,
    vehicle.name,
    vehicle.subtitle || '',
    vehicle.price,
    vehicle.priceNum || 0,
    !!vehicle.negotiable,
    vehicle.status || 'available',
    vehicle.tags || ['suv'],
    JSON.stringify(vehicle.specs || []),
    vehicle.features || [],
    vehicle.location || 'Nairobi',
    vehicle.images || []
  ];

  return await executeNeonQuery(sql, params);
}

async function deleteVehicleFromNeonDB(id) {
  return await executeNeonQuery('DELETE FROM vehicles WHERE id = $1', [id]);
}

// Expose Neon API globally
window.NeonInventory = {
  getConnString: getNeonConnectionString,
  setConnString: setNeonConnectionString,
  isConfigured: isNeonConfigured,
  fetchAll: fetchVehiclesFromNeonDB,
  saveVehicle: saveVehicleToNeonDB,
  deleteVehicle: deleteVehicleFromNeonDB
};
