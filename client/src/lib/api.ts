export async function register(name: string, email: string, password: string, role: 'customer' | 'influencer', category?: string) {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, role, category }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function login(email: string, password: string) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function logout() {
  const res = await fetch('/api/auth/logout', { method: 'POST' });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getInfluencers() {
  const res = await fetch('/api/influencers');
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function createCampaign(productName: string, productDesc: string, targetAudience: string, platform: string) {
  const res = await fetch('/api/campaigns', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productName, productDesc, targetAudience, platform }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getCampaigns(brandId: string) {
  const res = await fetch(`/api/campaigns/brand/${brandId}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
