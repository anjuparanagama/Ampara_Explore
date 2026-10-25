"use client";

import { BookOpen, ImagePlus, Link2, Trash2, Upload, X } from "lucide-react";
import Input from "@/components/Input";
import { AttractionFormProps } from "@/interface";

export default function AttractionForm({
  form,
  editingId,
  categories,
  imageUrls,
  imageFiles,
  onFormChange,
  onImageUrlsChange,
  onImageFilesChange,
  onRemoveExistingImage,
  onRemoveImageFile,
  isSubmitting = false,
  onSubmit,
  onCancel,
  onError,
}: AttractionFormProps) {
  const currentUrlCount = imageUrls
    .split(/\r?\n/)
    .filter((url) => url.trim()).length;
  const totalPhotosCount = form.images.length + imageFiles.length + currentUrlCount;

  return (
    <section className="mb-8 rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">
        {editingId ? "Edit attraction" : "Create attraction"}
      </h2>
      <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700">
          <span>
            Place Name <span className="text-rose-500">*</span>
          </span>
          <Input
            required
            value={form.name}
            onChange={(event) => onFormChange("name", event.target.value)}
            placeholder="e.g. Gal Oya National Park"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700">
          <span>
            Slug (URL identifier) <span className="text-rose-500">*</span>
          </span>
          <Input
            required
            value={form.slug}
            onChange={(event) =>
              onFormChange(
                "slug",
                event.target.value.toLowerCase().replace(/\s+/g, "-")
              )
            }
            placeholder="e.g. gal-oya-national-park"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700">
          <span>
            Location / Area <span className="text-rose-500">*</span>
          </span>
          <Input
            required
            value={form.location}
            onChange={(event) => onFormChange("location", event.target.value)}
            placeholder="e.g. Inginiyagala, Ampara"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700">
          <span>
            Category <span className="text-rose-500">*</span>
          </span>
          <select
            required
            value={form.categoryId}
            onChange={(event) => onFormChange("categoryId", event.target.value)}
            className="h-[38px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700">
          <span>
            Latitude <span className="text-rose-500">*</span>
          </span>
          <Input
            type="number"
            min={-90}
            max={90}
            step="any"
            required
            value={form.latitude}
            onChange={(event) => onFormChange("latitude", event.target.value)}
            placeholder="e.g. 7.291"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700">
          <span>
            Longitude <span className="text-rose-500">*</span>
          </span>
          <Input
            type="number"
            min={-180}
            max={180}
            step="any"
            required
            value={form.longitude}
            onChange={(event) => onFormChange("longitude", event.target.value)}
            placeholder="e.g. 81.672"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700">
          <span>
            Distance from Town (km) <span className="text-rose-500">*</span>
          </span>
          <Input
            type="number"
            min={0}
            step="any"
            required
            value={form.distanceKm}
            onChange={(event) => onFormChange("distanceKm", event.target.value)}
            placeholder="e.g. 15"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700">
          <span>
            Recommended Duration <span className="font-normal text-slate-400">(optional)</span>
          </span>
          <Input
            value={form.duration}
            onChange={(event) => onFormChange("duration", event.target.value)}
            placeholder="e.g. 2 - 3 hours"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700">
          <span>
            Rating (0 - 5) <span className="text-rose-500">*</span>
          </span>
          <Input
            type="number"
            min={0}
            max={5}
            step="0.1"
            required
            value={form.rating}
            onChange={(event) => onFormChange("rating", event.target.value)}
            placeholder="e.g. 4.5"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700">
          <span>
            Reviews Count <span className="text-rose-500">*</span>
          </span>
          <Input
            type="number"
            min={0}
            step="1"
            required
            value={form.reviewsCount}
            onChange={(event) => onFormChange("reviewsCount", event.target.value)}
            placeholder="e.g. 120"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700">
          <span>
            Radial Zone <span className="font-normal text-slate-400">(optional)</span>
          </span>
          <Input
            value={form.radialZone}
            onChange={(event) => onFormChange("radialZone", event.target.value)}
            placeholder="e.g. Zone A"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700">
          <span>
            Featured Highlight Tags <span className="font-normal text-slate-400">(optional)</span>
          </span>
          <Input
            value={form.highlights}
            onChange={(event) => onFormChange("highlights", event.target.value)}
            placeholder="e.g. Ancient Stupa, Jungle Trekking, Wildlife (comma separated)"
          />
        </label>

        <div className="rounded-xl border-2 border-sky-100 bg-sky-50/40 p-4 md:col-span-2">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-[#0e7490] p-2 text-white">
              <ImagePlus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Place photos</h3>
              <p className="mt-0.5 text-xs text-slate-600">
                Add up to 5 photos. The first photo becomes the main card image.
              </p>
            </div>
            <span className="ml-auto rounded-full bg-white px-2.5 py-1 text-xs font-bold text-sky-700 shadow-sm">
              {totalPhotosCount}/5
            </span>
          </div>

          <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-sky-300 bg-white px-4 py-6 text-center transition hover:border-sky-500 hover:bg-sky-50">
            <Upload className="h-8 w-8 text-sky-600" />
            <span className="mt-2 text-sm font-bold text-slate-800">
              Click to choose photos
            </span>
            <span className="mt-1 text-xs text-slate-500">
              JPG, PNG, WEBP, or GIF · Maximum 5 MB each
            </span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              multiple
              onChange={(event) => {
                const files = Array.from(event.target.files || []);
                const remaining = Math.max(
                  0,
                  5 -
                    form.images.length -
                    imageUrls
                      .split(/\r?\n/)
                      .filter((url) => url.trim()).length
                );
                onImageFilesChange(files.slice(0, remaining));
                if (files.length > remaining) {
                  onError(
                    `You can add only ${remaining} more photo${
                      remaining === 1 ? "" : "s"
                    }.`
                  );
                }
                event.target.value = "";
              }}
              className="sr-only"
            />
          </label>

          {form.images.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                Saved photos
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {form.images.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="group relative aspect-video overflow-hidden rounded-lg border border-slate-200 bg-white"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image}
                      alt={`Saved place photo ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    {index === 0 && (
                      <span className="absolute bottom-1 left-1 rounded bg-slate-900/75 px-1.5 py-0.5 text-[10px] font-bold text-white">
                        Main photo
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => onRemoveExistingImage(index)}
                      aria-label={`Remove saved photo ${index + 1}`}
                      className="absolute right-1 top-1 rounded-full bg-white/90 p-1 text-rose-600 shadow-sm opacity-0 transition group-hover:opacity-100"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {imageFiles.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                Ready to upload
              </p>
              <div className="space-y-2">
                {imageFiles.map((file, index) => (
                  <div
                    key={`${file.name}-${file.lastModified}`}
                    className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-xs"
                  >
                    <span className="truncate font-medium text-slate-700">
                      {index + 1}. {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemoveImageFile(index)}
                      className="ml-3 text-rose-600"
                      aria-label={`Remove ${file.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 rounded-lg border border-slate-200 bg-white p-3">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <Link2 className="h-4 w-4 text-sky-600" /> Add photo URLs
            </label>
            <p className="mt-1 text-xs text-slate-500">
              Optional: paste one public image URL per line.
            </p>
            <textarea
              value={imageUrls}
              onChange={(event) => onImageUrlsChange(event.target.value)}
              placeholder={"https://example.com/photo-1.jpg\nhttps://example.com/photo-2.jpg"}
              className="mt-2 min-h-20 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700 md:col-span-2">
          <span>
            Overview Description / Tagline <span className="text-rose-500">*</span>
          </span>
          <textarea
            required
            value={form.description}
            onChange={(event) => onFormChange("description", event.target.value)}
            placeholder="A concise overview / tagline shown on explore cards, search results, and the top hero banner..."
            className="min-h-20 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
          <span className="text-[11px] font-normal text-slate-500">
            Displayed on explore directory cards, search highlights, and the top hero banner.
          </span>
        </label>

        {/* Detailed Destination Story & About Page Section */}
        <div className="space-y-4 rounded-xl border-2 border-sky-100 bg-sky-50/40 p-4 md:col-span-2">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-[#0084d1] p-2 text-white">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Destination Story &amp; About Section
              </h3>
              <p className="mt-0.5 text-xs text-slate-600">
                Powers the &ldquo;About Destination&rdquo; section on the destination details page.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700 md:col-span-2">
              <span>
                About Card Heading <span className="font-normal text-slate-400">(optional)</span>
              </span>
              <Input
                value={form.aboutTitle}
                onChange={(event) => onFormChange("aboutTitle", event.target.value)}
                placeholder={`e.g. About ${form.name || "this destination"} (defaults to "About [Place Name]" if blank)`}
              />
            </label>

            <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700 md:col-span-2">
              <span>
                About Description <span className="text-rose-500">*</span>
              </span>
              <textarea
                required
                value={form.aboutParagraphs}
                onChange={(event) => onFormChange("aboutParagraphs", event.target.value)}
                placeholder={"Built by King Saddhatissa in the 3rd century BC, Dighavapi (Deegawapi) is venerated as one of the Solosmasthana...\n\nWith an immense ancient circumference that rivalled the great stupas of Anuradhapura, ongoing national archaeological excavations..."}
                rows={6}
                className="min-h-32 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
              <span className="text-[11px] font-normal text-slate-500">
                Powers the About section beside the gallery. Separate paragraphs with a blank line (press Enter twice) if needed.
              </span>
            </label>

            <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700 md:col-span-2">
              <span>
                Inspirational Quote <span className="font-normal text-slate-400">(optional)</span>
              </span>
              <Input
                value={form.quote}
                onChange={(event) => onFormChange("quote", event.target.value)}
                placeholder="e.g. A sacred sanctuary where centuries of royal devotion and spiritual silence converge under the eastern skies."
              />
              <span className="text-[11px] font-normal text-slate-500">
                Displayed in the stylized blue accent quote box inside the About section.
              </span>
            </label>
          </div>
        </div>

        <div className="flex gap-3 md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-xl bg-[#0e7490] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#155e75] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Saving...</span>
              </>
            ) : editingId ? (
              "Update attraction"
            ) : (
              "Create attraction"
            )}
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onCancel}
            className="rounded-lg border border-slate-300 px-5 py-2 text-sm font-semibold transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
