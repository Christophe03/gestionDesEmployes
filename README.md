# Gestion des Employés (Angular 16+)

Application Angular Material minimaliste pour gérer des employés.

## Prérequis
- Node.js LTS
- Angular CLI

## Installation
```bash
npm install
```

## Lancement
```bash
npm start
# ou
ng serve
```

## Structure
- `src/app/features/employees` : module lazy-loaded (liste, formulaire, détails)
- `src/app/shared` : composants réutilisables (`ConfirmDialog`, `SearchBar`)
- `src/app/core` : interceptors/guards/services globaux

## Données
- Service `EmployeeService` avec mocks en mémoire (remplaçable par API).

## Accessibilité & UX
- Labels et aria
- Feedback via `MatSnackBar`
- Responsive mobile-first
