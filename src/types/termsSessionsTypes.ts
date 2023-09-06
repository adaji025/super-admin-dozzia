export type TermType = {
  term_id: string;
  term: number;
  start_date: string;
  end_date: string;
  is_current: boolean;
};

export type SessionType = {
  session_id: string;
  start_year: string;
  end_year: string;
  is_current: boolean;
};
