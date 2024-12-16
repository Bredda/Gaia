export interface SimplicityThreadRequest {
  query: string;
}

export interface SimplicityThreadResponse {
  queries?: string[];
  sources?: any[];
  response?: string;
  videos?: any[];
  images?: any[];
  related_queries?: any[];
}

export interface SimplicityThread {
  id: string;
  title?: string;
  request: SimplicityThreadRequest;
  response?: SimplicityThreadResponse;
}
