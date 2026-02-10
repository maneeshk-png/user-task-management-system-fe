export interface FormField {
  name: string;
  label: string;
  type: string; // text, password, textarea, select, custom
  validators?: any[];
  options?: { label: string, value: any }[]; // for select
  placeholder?: string;
  template?: any; // optional for custom components
}