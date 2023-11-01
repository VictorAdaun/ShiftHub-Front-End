type Config = {
    API_URL?: string;
};

export const config: Config = {
    /*
    todo: set `API_URL` from environmental variable
    available at build time.
   
    This is a hacky approach to setting API URL until
    environmental variable substitution works properly
    while building the frontend on circle ci.
    
    API_URL: NEXT_PUBLIC_API_URL
    */
    // API_URL: 'https://.herokuapp.com',
  };
  