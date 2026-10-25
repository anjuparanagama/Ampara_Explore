"use client";

import Input from "@/components/Input";
import { CategoryManagementProps } from "@/interface";

export default function CategoryManagement({
  categories,
  categoryName,
  categoryDescription,
  editingCategory,
  onCategoryNameChange,
  onCategoryDescriptionChange,
  onSubmitCategory,
  onEditCategory,
  onCancelEdit,
  onDeleteCategory,
}: CategoryManagementProps) {
  return (
    <section className="mb-8 rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-bold">
          {editingCategory ? "Edit category" : "Category management"}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Add or manage destination categories ({categories.length})
        </p>
      </div>

      <form
        onSubmit={onSubmitCategory}
        className="grid gap-3 md:grid-cols-[1fr_2fr_auto] md:items-end"
      >
        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700">
          <span>
            Category name <span className="text-rose-500">*</span>
          </span>
          <Input
            required
            value={categoryName}
            onChange={(event) => onCategoryNameChange(event.target.value)}
            placeholder="e.g. Wildlife & Nature"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700">
          <span>
            Short description <span className="font-normal text-slate-400">(optional)</span>
          </span>
          <Input
            value={categoryDescription}
            onChange={(event) => onCategoryDescriptionChange(event.target.value)}
            placeholder="e.g. National parks, sanctuaries, and eco-tours"
          />
        </label>

        <div className="flex gap-2">
          <button className="h-[38px] rounded-xl bg-[#0e7490] px-5 text-sm font-semibold text-white hover:bg-[#155e75]">
            {editingCategory ? "Update" : "Add category"}
          </button>
          {editingCategory && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="h-[38px] rounded-xl border border-slate-300 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-8 border-t border-slate-100 pt-6">
        <h3 className="mb-4 text-base font-bold text-slate-900">All Categories</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase text-slate-500">
                <th className="p-3">Name</th>
                <th className="p-3">Description</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-slate-400">
                    No categories found.
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr
                    key={category.id}
                    className="border-b border-slate-100 hover:bg-slate-50/50"
                  >
                    <td className="p-3 font-semibold text-slate-900">{category.name}</td>
                    <td className="p-3 text-slate-600">
                      {category.description ? (
                        category.description
                      ) : (
                        <span className="italic text-slate-400">No description</span>
                      )}
                    </td>
                    <td className="p-3">
                      <button
                        type="button"
                        onClick={() => onEditCategory(category)}
                        className="mr-3 font-semibold text-sky-600 hover:text-sky-800"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteCategory(category)}
                        className="font-semibold text-rose-600 hover:text-rose-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
