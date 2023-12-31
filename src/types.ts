export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
};

export type Task = {
  id: Id;
  columnId: Id;
  header: string;
  content?: string;
  flagId: Id;
};

export type Flag = {
  id: Id;
  name: string;
  color: string;
  abbr: string;
}