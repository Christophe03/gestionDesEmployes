export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle?: string | null;
  hireDate?: string | null; // format: YYYY-MM-DD
  isActive: boolean;
  dateCreation: string; // ISO string (Date)
  dateModification: string; // ISO string (Date)
  dateSuppression?: string | null; // ISO string (Date) ou null
  creerPar?: string | null;
  modifierPar?: string | null;
  supprimerPar?: string | null;
}
