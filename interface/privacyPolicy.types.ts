import { ReactNode } from "react";

export interface PrivacyPolicySection {
  id: string;
  title: string;
  icon: ReactNode;
  content: ReactNode;
}

export interface PrivacyHeroProps {
  lastUpdated?: string;
  sections: Array<{
    id: string;
    title: string;
  }>;
}

export interface PrivacySectionCardProps {
  section: PrivacyPolicySection;
}

export interface PrivacySectionsListProps {
  sections: PrivacyPolicySection[];
}
