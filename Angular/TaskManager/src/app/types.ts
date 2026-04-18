export interface Task {
  id: string;
  title: string;
  description: string;
  priority: priority;
  dueDate: string;
  category: category;
  tags: string;
  done: boolean;
}
type priority = 'Low' | 'Medium' | 'High';
type category = 'Work' | 'Personal' | 'Study';
