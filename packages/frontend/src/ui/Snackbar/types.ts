type Severity = 'error' | 'warning' | 'info' | 'success';

export type Snackbar = {
  severity: Severity;
  isVisible: boolean;
  onClose(): void;
};
