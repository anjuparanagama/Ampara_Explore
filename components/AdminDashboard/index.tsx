"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  AdminSidebar,
  AdminHeader,
  AdminAlerts,
  AdminOverview,
  CategoryManagement,
  AttractionForm,
  PlacesTable,
} from "./components";
import type {
  AdminDashboardCategory,
  AdminDashboardAttraction,
  AdminDashboardAttractionForm,
  AdminSection,
} from "@/interface";

export type {
  AdminDashboardCategory,
  AdminDashboardAttraction,
  AdminDashboardAttractionForm,
  AdminSection,
};
export type Category = AdminDashboardCategory;
export type Attraction = AdminDashboardAttraction;
export type AttractionForm = AdminDashboardAttractionForm;

const blankAttraction: AdminDashboardAttractionForm = {
  name: "",
  slug: "",
  categoryId: "",
  description: "",
  location: "",
  latitude: "",
  longitude: "",
  image: "",
  images: [],
  distanceKm: "",
  duration: "",
  highlights: "",
  rating: "",
  reviewsCount: "",
  radialZone: "",
  subtitle: "",
  aboutTitle: "",
  aboutParagraphs: "",
  quote: "",
};

async function requestJson(url: string, options?: RequestInit) {
  const response = await fetch(url, options);
  const body = await response.json();
  if (!response.ok) throw new Error(body.message || "Request failed.");
  return body;
}

function toForm(attraction: AdminDashboardAttraction): AdminDashboardAttractionForm {
  let highlights: string[] = [];
  if (Array.isArray(attraction.highlights)) highlights = attraction.highlights;
  else if (typeof attraction.highlights === "string") {
    try {
      highlights = JSON.parse(attraction.highlights);
    } catch {
      highlights = [];
    }
  }
  let images: string[] = [];
  if (Array.isArray(attraction.images)) images = attraction.images;
  else if (typeof attraction.images === "string") {
    try {
      const parsed = JSON.parse(attraction.images);
      if (Array.isArray(parsed))
        images = parsed.filter((item): item is string => typeof item === "string");
    } catch {
      images = [];
    }
  }
  if (!images.length && attraction.image) images = [attraction.image];

  let aboutParagraphs = "";
  if (Array.isArray(attraction.about_paragraphs)) {
    aboutParagraphs = attraction.about_paragraphs.join("\n\n");
  } else if (typeof attraction.about_paragraphs === "string") {
    try {
      const parsed = JSON.parse(attraction.about_paragraphs);
      if (Array.isArray(parsed)) {
        aboutParagraphs = parsed.join("\n\n");
      } else {
        aboutParagraphs = attraction.about_paragraphs;
      }
    } catch {
      aboutParagraphs = attraction.about_paragraphs;
    }
  }

  return {
    name: attraction.name,
    slug: attraction.slug,
    categoryId: attraction.category_id,
    description: attraction.description,
    location: attraction.location,
    latitude: String(attraction.latitude ?? ""),
    longitude: String(attraction.longitude ?? ""),
    image: attraction.image || "",
    images,
    distanceKm: String(attraction.distance_km),
    duration: attraction.duration || "",
    highlights: highlights.join(", "),
    rating: String(attraction.rating),
    reviewsCount: String(attraction.reviews_count),
    radialZone: attraction.radial_zone || "",
    subtitle: attraction.subtitle || "",
    aboutTitle: attraction.about_title || "",
    aboutParagraphs,
    quote: attraction.quote || "",
  };
}

export default function AdminDashboard() {
  const [categories, setCategories] = useState<AdminDashboardCategory[]>([]);
  const [attractions, setAttractions] = useState<AdminDashboardAttraction[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [editingCategory, setEditingCategory] = useState<AdminDashboardCategory | null>(null);
  const [form, setForm] = useState<AdminDashboardAttractionForm>(blankAttraction);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");
  const [showPlaceForm, setShowPlaceForm] = useState(false);

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
    const timer = window.setTimeout(() => {
      void loadData();
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const submitCategory = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");
    try {
      const url = editingCategory
        ? `/api/admin/categories/${editingCategory.id}`
        : "/api/admin/categories";
      await requestJson(url, {
        method: editingCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName, description: categoryDescription }),
      });
      setCategoryName("");
      setCategoryDescription("");
      setEditingCategory(null);
      setMessage("Category saved.");
      await loadData();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save category.");
    }
  };

  const deleteCategory = async (category: AdminDashboardCategory) => {
    if (
      !window.confirm(
        `Delete "${category.name}"? Categories with attractions cannot be deleted.`
      )
    )
      return;
    try {
      await requestJson(`/api/admin/categories/${category.id}`, { method: "DELETE" });
      setMessage("Category deleted.");
      await loadData();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete category.");
    }
  };

  const submitAttraction = async (event: FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;
    setError("");
    setMessage("");

    if (!form.name.trim()) {
      setError("Place Name is required.");
      return;
    }

    const sanitizedSlug = form.slug
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    if (!sanitizedSlug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(sanitizedSlug)) {
      setError("Slug must contain only lowercase letters, numbers, and hyphens without spaces (e.g. buddhangala-temple).");
      return;
    }

    if (!form.location.trim()) {
      setError("Location / Area is required.");
      return;
    }

    if (!form.categoryId) {
      setError("Please select a category.");
      return;
    }

    if (!form.description.trim()) {
      setError("Overview description / tagline is required.");
      return;
    }

    if (!form.aboutParagraphs.trim()) {
      setError("About description is required.");
      return;
    }

    const urlImages = imageUrls
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean);

    if (urlImages.some((url) => !/^https?:\/\//i.test(url))) {
      setError("Image URLs must start with http:// or https://.");
      return;
    }

    if (imageFiles.length + urlImages.length + form.images.length > 5) {
      setError("An attraction can have a maximum of 5 images.");
      return;
    }

    setIsSubmitting(true);
    try {
      let uploadedImages: string[] = [];
      if (imageFiles.length) {
        const uploadData = new FormData();
        imageFiles.forEach((file) => uploadData.append("images", file));
        const uploadResult = await requestJson("/api/admin/attractions/upload", {
          method: "POST",
          body: uploadData,
        });
        uploadedImages = uploadResult.urls;
      }
      const images = [...form.images, ...uploadedImages, ...urlImages].slice(0, 5);

      const payload = {
        ...form,
        slug: sanitizedSlug,
        image: images[0] || "",
        images,
        distanceKm: Number(form.distanceKm || 0),
        rating: Number(form.rating || 0),
        reviewsCount: Number(form.reviewsCount || 0),
        latitude: Number(form.latitude || 0),
        longitude: Number(form.longitude || 0),
        highlights: form.highlights
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        subtitle: form.description.trim(),
        aboutTitle: form.aboutTitle.trim(),
        aboutParagraphs: form.aboutParagraphs.trim(),
        quote: form.quote.trim(),
      };

      await requestJson(
        editingId ? `/api/admin/attractions/${editingId}` : "/api/admin/attractions",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      setForm(blankAttraction);
      setImageUrls("");
      setImageFiles([]);
      setEditingId(null);
      setShowPlaceForm(false);
      setMessage("Attraction saved.");
      await loadData();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save attraction.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteAttraction = async (attraction: AdminDashboardAttraction) => {
    if (!window.confirm(`Delete "${attraction.name}"?`)) return;
    try {
      await requestJson(`/api/admin/attractions/${attraction.id}`, { method: "DELETE" });
      setMessage("Attraction deleted.");
      await loadData();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete attraction.");
    }
  };

  const updateForm = (key: keyof AdminDashboardAttractionForm, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  const removeExistingImage = (index: number) => {
    setForm((current) => ({
      ...current,
      images: current.images.filter((_, imageIndex) => imageIndex !== index),
    }));
  };

  const startEditing = (attraction: AdminDashboardAttraction) => {
    setEditingId(attraction.id);
    setActiveSection("places");
    setShowPlaceForm(true);
    const nextForm = toForm(attraction);
    setForm(nextForm);
    setImageUrls("");
    setImageFiles([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const averageRating = attractions.length
    ? (
        attractions.reduce((sum, item) => sum + Number(item.rating || 0), 0) /
        attractions.length
      ).toFixed(1)
    : "0.0";

  return (
    <main className="min-h-screen bg-[#f5f8fc] text-slate-900">
      <div className="flex min-h-screen">
        <AdminSidebar
          activeSection={activeSection}
          onSelectSection={setActiveSection}
        />

        <div className="min-w-0 flex-1 px-4 py-6 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <AdminHeader
              activeSection={activeSection}
              onAddPlaceClick={() => {
                setEditingId(null);
                setForm(blankAttraction);
                setImageUrls("");
                setImageFiles([]);
                setShowPlaceForm(true);
              }}
            />

            <AdminAlerts loading={loading} error={error} message={message} />

            {activeSection === "dashboard" && (
              <AdminOverview
                attractionsCount={attractions.length}
                categoriesCount={categories.length}
                averageRating={averageRating}
                onAddFirstPlace={() => {
                  setActiveSection("places");
                  setShowPlaceForm(true);
                }}
              />
            )}

            {activeSection === "categories" && (
              <CategoryManagement
                categories={categories}
                categoryName={categoryName}
                categoryDescription={categoryDescription}
                editingCategory={editingCategory}
                onCategoryNameChange={setCategoryName}
                onCategoryDescriptionChange={setCategoryDescription}
                onSubmitCategory={submitCategory}
                onEditCategory={(category) => {
                  setEditingCategory(category);
                  setCategoryName(category.name);
                  setCategoryDescription(category.description || "");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onCancelEdit={() => {
                  setEditingCategory(null);
                  setCategoryName("");
                  setCategoryDescription("");
                }}
                onDeleteCategory={deleteCategory}
              />
            )}

            {activeSection === "places" && showPlaceForm && (
              <AttractionForm
                form={form}
                editingId={editingId}
                categories={categories}
                imageUrls={imageUrls}
                imageFiles={imageFiles}
                onFormChange={updateForm}
                onImageUrlsChange={setImageUrls}
                onImageFilesChange={setImageFiles}
                onRemoveExistingImage={removeExistingImage}
                onRemoveImageFile={(index) =>
                  setImageFiles((current) =>
                    current.filter((_, fileIndex) => fileIndex !== index)
                  )
                }
                isSubmitting={isSubmitting}
                onSubmit={submitAttraction}
                onCancel={() => {
                  setEditingId(null);
                  setForm(blankAttraction);
                  setImageUrls("");
                  setImageFiles([]);
                  setShowPlaceForm(false);
                }}
                onError={setError}
              />
            )}

            {activeSection === "places" && (
              <PlacesTable
                attractions={attractions}
                onStartEditing={startEditing}
                onDeleteAttraction={deleteAttraction}
                onOpenAddPlace={() => setShowPlaceForm(true)}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
