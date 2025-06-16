export interface Task {
  id?: number;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'complete';
  taskkey: string;
  created_at: Date;
  deleted_at: Date;
  updated_at: Date;

}