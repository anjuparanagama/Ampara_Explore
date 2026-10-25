"use client";

import { Plus } from "lucide-react";
import { PlacesTableProps } from "@/interface";

export default function PlacesTable({
  attractions,
  onStartEditing,
  onDeleteAttraction,
  onOpenAddPlace,
}: PlacesTableProps) {
  return (
    <section className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">Places</h2>
          <p className="mt-1 text-sm text-slate-500">
            All tourist attractions in your database ({attractions.length})
          </p>
        </div>
        <button
          onClick={onOpenAddPlace}
          className="inline-flex items-center gap-2 rounded-lg border border-sky-200 px-3 py-2 text-sm font-bold text-sky-700 hover:bg-sky-50"
        >
          <Plus className="h-4 w-4" /> Add place
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase text-slate-500">
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Location</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attractions.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-slate-400">
                  No places found.
                </td>
              </tr>
            ) : (
              attractions.map((attraction) => (
                <tr key={attraction.id} className="border-b border-slate-100">
                  <td className="p-3 font-semibold">
                    {attraction.name}
                    <div className="text-xs font-normal text-slate-400">
                      {attraction.slug}
                    </div>
                  </td>
                  <td className="p-3">{attraction.category_name}</td>
                  <td className="p-3">{attraction.location}</td>
                  <td className="p-3">{attraction.rating}</td>
                  <td className="p-3">
                    <button
                      onClick={() => onStartEditing(attraction)}
                      className="mr-3 font-semibold text-sky-600 hover:text-sky-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => void onDeleteAttraction(attraction)}
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
    </section>
  );
}
