import { FormEvent } from "react";

export interface AdminDashboardCategory {
  id: string;
  name: string;
  description: string | null;
}

export type Category = AdminDashboardCategory;

export interface AdminDashboardAttraction {
  id: string;
  category_id: string;
  category_name: string;
  name: string;
  slug: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  image: string | null;
  images: string[] | string | null;
  distance_km: number;
  duration: string | null;
  highlights: string[] | string | null;
  radial_zone: string | null;
  subtitle?: string | null;
  about_title?: string | null;
  about_paragraphs?: string[] | string | null;
  quote?: string | null;
}

export type Attraction = AdminDashboardAttraction;

export interface AdminDashboardAttractionForm {
  name: string;
  slug: string;
  categoryId: string;
  description: string;
  location: string;
  latitude: string;
  longitude: string;
  image: string;
  images: string[];
  distanceKm: string;
  duration: string;
  highlights: string;
  radialZone: string;
  subtitle: string;
  aboutTitle: string;
  aboutParagraphs: string;
  quote: string;
}

export type AttractionForm = AdminDashboardAttractionForm;

export type AdminSection = "dashboard" | "places" | "categories";

export interface AdminSidebarProps {
  activeSection: AdminSection;
  onSelectSection: (section: AdminSection) => void;
}

export interface AdminHeaderProps {
  activeSection: AdminSection;
  onAddPlaceClick: () => void;
}

export interface AdminAlertsProps {
  loading: boolean;
  error: string;
  message: string;
}

export interface AdminOverviewProps {
  attractionsCount: number;
  categoriesCount: number;
  onAddFirstPlace: () => void;
}

export interface CategoryManagementProps {
  categories: AdminDashboardCategory[];
  categoryName: string;
  categoryDescription: string;
  editingCategory: AdminDashboardCategory | null;
  onCategoryNameChange: (value: string) => void;
  onCategoryDescriptionChange: (value: string) => void;
  onSubmitCategory: (event: FormEvent) => void;
  onEditCategory: (category: AdminDashboardCategory) => void;
  onCancelEdit: () => void;
  onDeleteCategory: (category: AdminDashboardCategory) => void;
}

export interface AttractionFormProps {
  form: AdminDashboardAttractionForm;
  editingId: string | null;
  categories: AdminDashboardCategory[];
  imageUrls: string;
  imageFiles: File[];
  onFormChange: (key: keyof AdminDashboardAttractionForm, value: string) => void;
  onImageUrlsChange: (value: string) => void;
  onImageFilesChange: (files: File[]) => void;
  onRemoveExistingImage: (index: number) => void;
  onRemoveImageFile: (index: number) => void;
  isSubmitting?: boolean;
  onSubmit: (event: FormEvent) => void;
  onCancel: () => void;
  onError: (message: string) => void;
}

export interface PlacesTableProps {
  attractions: AdminDashboardAttraction[];
  onStartEditing: (attraction: AdminDashboardAttraction) => void;
  onDeleteAttraction: (attraction: AdminDashboardAttraction) => void;
  onOpenAddPlace: () => void;
}
