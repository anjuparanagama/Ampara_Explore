"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";

type Category = { id: string; name: string; description: string | null };
type Attraction = {
  id: string;
  category_id: string;
  category_name: string;
  name: string;
  slug: string;
  description: string;
  location: string;
  image: string | null;
  distance_km: number;
  duration: string | null;
  highlights: string[] | string | null;
  rating: number;
  reviews_count: number;
  radial_zone: string | null;
};

type AttractionForm = {
  name: string;
  slug: string;
  categoryId: string;
  description: string;
  location: string;
  image: string;
  distanceKm: string;
  duration: string;
  highlights: string;
  rating: string;
  reviewsCount: string;
  radialZone: string;
};

const blankAttraction: AttractionForm = {
  name: "", slug: "", categoryId: "", description: "", location: "",
  image: "", distanceKm: "0", duration: "", highlights: "", rating: "0",
  reviewsCount: "0", radialZone: "",
};

async function requestJson(url: string, options?: RequestInit) {
  const response = await fetch(url, options);
  const body = await response.json();
  if (!response.ok) throw new Error(body.message || "Request failed.");
  return body;
}

function toForm(attraction: Attraction): AttractionForm {
  let highlights: string[] = [];
  if (Array.isArray(attraction.highlights)) highlights = attraction.highlights;
  else if (typeof attraction.highlights === "string") {
    try { highlights = JSON.parse(attraction.highlights); } catch { highlights = []; }
  }
  return {
    name: attraction.name, slug: attraction.slug, categoryId: attraction.category_id,
    description: attraction.description, location: attraction.location,
    image: attraction.image || "", distanceKm: String(attraction.distance_km),
    duration: attraction.duration || "", highlights: highlights.join(", "),
    rating: String(attraction.rating), reviewsCount: String(attraction.reviews_count),
    radialZone: attraction.radial_zone || "",
  };
}

export default function AdminDashboard() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form, setForm] = useState<AttractionForm>(blankAttraction);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [categoryResult, attractionResult] = await Promise.all([
        requestJson("/api/admin/categories"),
        requestJson("/api/admin/attractions"),
      ]);
      setCategories(categoryResult.categories);
      setAttractions(attractionResult.attractions);
      setError("");
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load admin data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => { void loadData(); }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const submitCategory = async (event: FormEvent) => {
    event.preventDefault();
    setError(""); setMessage("");
    try {
      const url = editingCategory ? `/api/admin/categories/${editingCategory.id}` : "/api/admin/categories";
      await requestJson(url, {
        method: editingCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName, description: categoryDescription }),
      });
      setCategoryName(""); setCategoryDescription(""); setEditingCategory(null);
      setMessage("Category saved."); await loadData();
    } catch (saveError) { setError(saveError instanceof Error ? saveError.message : "Unable to save category."); }
  };

  const deleteCategory = async (category: Category) => {
    if (!window.confirm(`Delete "${category.name}"? Categories with attractions cannot be deleted.`)) return;
    try {
      await requestJson(`/api/admin/categories/${category.id}`, { method: "DELETE" });
      setMessage("Category deleted."); await loadData();
    } catch (deleteError) { setError(deleteError instanceof Error ? deleteError.message : "Unable to delete category."); }
  };

  const submitAttraction = async (event: FormEvent) => {
    event.preventDefault();
    setError(""); setMessage("");
    const payload = {
      ...form,
      distanceKm: Number(form.distanceKm),
      rating: Number(form.rating),
      reviewsCount: Number(form.reviewsCount),
      highlights: form.highlights.split(",").map((item) => item.trim()).filter(Boolean),
    };
    try {
      await requestJson(editingId ? `/api/admin/attractions/${editingId}` : "/api/admin/attractions", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setForm(blankAttraction); setEditingId(null); setMessage("Attraction saved."); await loadData();
    } catch (saveError) { setError(saveError instanceof Error ? saveError.message : "Unable to save attraction."); }
  };

  const deleteAttraction = async (attraction: Attraction) => {
    if (!window.confirm(`Delete "${attraction.name}"?`)) return;
    try {
      await requestJson(`/api/admin/attractions/${attraction.id}`, { method: "DELETE" });
      setMessage("Attraction deleted."); await loadData();
    } catch (deleteError) { setError(deleteError instanceof Error ? deleteError.message : "Unable to delete attraction."); }
  };

  const updateForm = (key: keyof AttractionForm, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">Ampara Explore</p>
            <h1 className="mt-1 text-3xl font-bold">Administrator dashboard</h1>
            <p className="mt-1 text-sm text-slate-500">Manage attractions and destination categories.</p>
          </div>
          <Link href="/" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:text-sky-600">Back to website</Link>
        </header>

        {loading && <p className="rounded-lg bg-white p-4 text-sm text-slate-600">Loading admin data...</p>}
        {error && <p role="alert" className="mb-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
        {message && <p role="status" className="mb-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">{message}</p>}

        <section className="mb-8 rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Category management</h2>
          <form onSubmit={submitCategory} className="grid gap-3 md:grid-cols-[1fr_2fr_auto]">
            <input required value={categoryName} onChange={(event) => setCategoryName(event.target.value)} placeholder="Category name" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
            <input value={categoryDescription} onChange={(event) => setCategoryDescription(event.target.value)} placeholder="Short description (optional)" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
            <button className="rounded-lg bg-sky-600 px-5 py-2 text-sm font-semibold text-white hover:bg-sky-700">{editingCategory ? "Update" : "Add category"}</button>
          </form>
          {editingCategory && <button onClick={() => { setEditingCategory(null); setCategoryName(""); setCategoryDescription(""); }} className="mt-2 text-xs font-semibold text-slate-500 hover:text-slate-800">Cancel editing</button>}
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-sm">
                <span>{category.name}</span>
                <button onClick={() => { setEditingCategory(category); setCategoryName(category.name); setCategoryDescription(category.description || ""); }} className="font-semibold text-sky-600">Edit</button>
                <button onClick={() => void deleteCategory(category)} className="font-semibold text-rose-600">Delete</button>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">{editingId ? "Edit attraction" : "Create attraction"}</h2>
          <form onSubmit={submitAttraction} className="grid gap-3 md:grid-cols-2">
            {(["name", "slug", "location", "image", "distanceKm", "duration", "rating", "reviewsCount", "radialZone"] as const).map((key) => (
              <input key={key} required={["name", "slug", "location", "distanceKm", "rating", "reviewsCount"].includes(key)} value={form[key]} onChange={(event) => updateForm(key, event.target.value)} placeholder={key === "slug" ? "slug (example: gal-oya-park)" : key} className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
            ))}
            <select required value={form.categoryId} onChange={(event) => updateForm("categoryId", event.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <option value="">Select category</option>
              {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
            <input value={form.highlights} onChange={(event) => updateForm("highlights", event.target.value)} placeholder="Highlights separated by commas" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
            <textarea required value={form.description} onChange={(event) => updateForm("description", event.target.value)} placeholder="Description" className="min-h-24 rounded-lg border border-slate-200 px-3 py-2 text-sm md:col-span-2" />
            <div className="flex gap-3 md:col-span-2">
              <button className="rounded-lg bg-sky-600 px-5 py-2 text-sm font-semibold text-white hover:bg-sky-700">{editingId ? "Update attraction" : "Create attraction"}</button>
              {editingId && <button type="button" onClick={() => { setEditingId(null); setForm(blankAttraction); }} className="rounded-lg border border-slate-300 px-5 py-2 text-sm font-semibold">Cancel</button>}
            </div>
          </form>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Attractions ({attractions.length})</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead><tr className="border-b border-slate-200 text-xs uppercase text-slate-500"><th className="p-3">Name</th><th className="p-3">Category</th><th className="p-3">Location</th><th className="p-3">Rating</th><th className="p-3">Actions</th></tr></thead>
              <tbody>
                {attractions.map((attraction) => <tr key={attraction.id} className="border-b border-slate-100">
                  <td className="p-3 font-semibold">{attraction.name}<div className="text-xs font-normal text-slate-400">{attraction.slug}</div></td>
                  <td className="p-3">{attraction.category_name}</td><td className="p-3">{attraction.location}</td><td className="p-3">{attraction.rating}</td>
                  <td className="p-3"><button onClick={() => { setEditingId(attraction.id); setForm(toForm(attraction)); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="mr-3 font-semibold text-sky-600">Edit</button><button onClick={() => void deleteAttraction(attraction)} className="font-semibold text-rose-600">Delete</button></td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
