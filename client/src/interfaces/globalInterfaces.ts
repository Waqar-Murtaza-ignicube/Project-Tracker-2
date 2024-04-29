export interface ApiResponse {
  data?: any | undefined;
  error?: any;
}

export interface ComponentProp {
  Component: React.ComponentType<any>;
}

export interface AccessToken {
  token: string;
}
