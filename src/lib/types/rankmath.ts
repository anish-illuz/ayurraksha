export interface RankMathMetadata {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: {
    index?: boolean;
    follow?: boolean;
    maxSnippet?: number;
    maxImagePreview?: string;
    maxVideoPreview?: number;
  };
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    type?: string;
    siteName?: string;
    locale?: string;
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
  };
  focusKeyword?: string;
  schema?: Record<string, any>;
}
