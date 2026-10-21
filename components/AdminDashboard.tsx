"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { ImagePlus, Link2, Trash2, Upload, X } from "lucide-react";

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
  images: string[] | string | null;
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
  images: string[];
  distanceKm: string;
  duration: string;
  highlights: string;
  rating: string;
  reviewsCount: string;
  radialZone: string;
};

const blankAttraction: AttractionForm = {
  name: "", slug: "", categoryId: "", description: "", location: "",
  image: "", images: [], distanceKm: "0", duration: "", highlights: "", rating: "0",
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
  let images: string[] = [];
  if (Array.isArray(attraction.images)) images = attraction.images;
  else if (typeof attraction.images === "string") {
    try {
      const parsed = JSON.parse(attraction.images);
      if (Array.isArray(parsed)) images = parsed.filter((item): item is string => typeof item === "string");
    } catch { images = []; }
  }
  if (!images.length && attraction.image) images = [attraction.image];
  return {
    name: attraction.name, slug: attraction.slug, categoryId: attraction.category_id,
    description: attraction.description, location: attraction.location,
    image: attraction.image || "", images, distanceKm: String(attraction.distance_km),
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
  const [imageUrls, setImageUrls] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);

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
    const urlImages = imageUrls.split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
    if (urlImages.some((url) => !/^https?:\/\//i.test(url))) {
      setError("Image URLs must start with http:// or https://.");
      return;
    }
    if (imageFiles.length + urlImages.length + form.images.length > 5) {
      setError("An attraction can have a maximum of 5 images.");
      return;
    }
    let uploadedImages: string[] = [];
    if (imageFiles.length) {
      const uploadData = new FormData();
      imageFiles.forEach((file) => uploadData.append("images", file));
      const uploadResult = await requestJson("/api/admin/attractions/upload", { method: "POST", body: uploadData });
      uploadedImages = uploadResult.urls;
    }
    const images = [...form.images, ...uploadedImages, ...urlImages].slice(0, 5);
    const payload = {
      ...form,
      image: images[0] || "",
      images,
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
      setForm(blankAttraction); setImageUrls(""); setImageFiles([]); setEditingId(null); setMessage("Attraction saved."); await loadData();
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

  const removeExistingImage = (index: number) => {
    setForm((current) => ({
      ...current,
      images: current.images.filter((_, imageIndex) => imageIndex !== index),
    }));
  };

  const startEditing = (attraction: Attraction) => {
    setEditingId(attraction.id);
    const nextForm = toForm(attraction);
    setForm(nextForm);
    setImageUrls("");
    setImageFiles([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
            {(["name", "slug", "location", "distanceKm", "duration", "rating", "reviewsCount", "radialZone"] as const).map((key) => (
              <input key={key} required={["name", "slug", "location", "distanceKm", "rating", "reviewsCount"].includes(key)} value={form[key]} onChange={(event) => updateForm(key, event.target.value)} placeholder={key === "slug" ? "slug (example: gal-oya-park)" : key} className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
            ))}
            <select required value={form.categoryId} onChange={(event) => updateForm("categoryId", event.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <option value="">Select category</option>
              {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
            <input value={form.highlights} onChange={(event) => updateForm("highlights", event.target.value)} placeholder="Highlights separated by commas" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
            <div className="rounded-xl border-2 border-sky-100 bg-sky-50/40 p-4 md:col-span-2">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-sky-600 p-2 text-white">
                  <ImagePlus className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Place photos</h3>
                  <p className="mt-0.5 text-xs text-slate-600">
                    Add up to 5 photos. The first photo becomes the main card image.
                  </p>
                </div>
                <span className="ml-auto rounded-full bg-white px-2.5 py-1 text-xs font-bold text-sky-700 shadow-sm">
                  {form.images.length + imageFiles.length + imageUrls.split(/\r?\n/).filter((url) => url.trim()).length}/5
                </span>
              </div>

              <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-sky-300 bg-white px-4 py-6 text-center transition hover:border-sky-500 hover:bg-sky-50">
                <Upload className="h-8 w-8 text-sky-600" />
                <span className="mt-2 text-sm font-bold text-slate-800">Click to choose photos</span>
                <span className="mt-1 text-xs text-slate-500">JPG, PNG, WEBP, or GIF · Maximum 5 MB each</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  multiple
                  onChange={(event) => {
                    const files = Array.from(event.target.files || []);
                    const remaining = Math.max(0, 5 - form.images.length - imageUrls.split(/\r?\n/).filter((url) => url.trim()).length);
                    setImageFiles(files.slice(0, remaining));
                    if (files.length > remaining) setError(`You can add only ${remaining} more photo${remaining === 1 ? "" : "s"}.`);
                    event.target.value = "";
                  }}
                  className="sr-only"
                />
              </label>

              {form.images.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Saved photos</p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                    {form.images.map((image, index) => (
                      <div key={`${image}-${index}`} className="group relative aspect-video overflow-hidden rounded-lg border border-slate-200 bg-white">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={image} alt={`Saved place photo ${index + 1}`} className="h-full w-full object-cover" />
                        {index === 0 && <span className="absolute bottom-1 left-1 rounded bg-slate-900/75 px-1.5 py-0.5 text-[10px] font-bold text-white">Main photo</span>}
                        <button type="button" onClick={() => removeExistingImage(index)} aria-label={`Remove saved photo ${index + 1}`} className="absolute right-1 top-1 rounded-full bg-white/90 p-1 text-rose-600 shadow-sm opacity-0 transition group-hover:opacity-100">
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {imageFiles.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Ready to upload</p>
                  <div className="space-y-2">
                    {imageFiles.map((file, index) => (
                      <div key={`${file.name}-${file.lastModified}`} className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-xs">
                        <span className="truncate font-medium text-slate-700">{index + 1}. {file.name}</span>
                        <button type="button" onClick={() => setImageFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))} className="ml-3 text-rose-600" aria-label={`Remove ${file.name}`}><Trash2 className="h-4 w-4" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 rounded-lg border border-slate-200 bg-white p-3">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700"><Link2 className="h-4 w-4 text-sky-600" /> Add photo URLs</label>
                <p className="mt-1 text-xs text-slate-500">Optional: paste one public image URL per line.</p>
                <textarea value={imageUrls} onChange={(event) => setImageUrls(event.target.value)} placeholder={"https://example.com/photo-1.jpg\nhttps://example.com/photo-2.jpg"} className="mt-2 min-h-20 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
              </div>
            </div>
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
                  <td className="p-3"><button onClick={() => startEditing(attraction)} className="mr-3 font-semibold text-sky-600">Edit</button><button onClick={() => void deleteAttraction(attraction)} className="font-semibold text-rose-600">Delete</button></td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
