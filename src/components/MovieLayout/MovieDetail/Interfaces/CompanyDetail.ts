export interface ICompanyDetail {
  description: string;
  headquarters: string;
  homepage: string;
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
  parent_company: {
    name: string;
    id: number;
    logo_path: string;
  };
}
