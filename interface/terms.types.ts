import { ReactNode } from "react";

export interface TermsSection {
  id: string;
  title: string;
  icon: ReactNode;
  content: ReactNode;
}

export interface TermsHeroProps {
  lastUpdated?: string;
  sections: Array<{
    id: string;
    title: string;
  }>;
}

export interface TermsSectionCardProps {
  section: TermsSection;
}

export interface TermsSectionsListProps {
  sections: TermsSection[];
}
