// set cookies
export const setJWTAsCookie = (res, token, token_type) => {
  res.cookie(`${token_type}`, token, {
    httpOnly: true,                          
    sameSite: "strict",                       
    maxAge: 1000 * 60 * 60,
  });
};

// remove cookies
export const removeCookie = (res) => {
  res.cookie(`access_token`, "", {
    httpOnly: true,     
    sameSite: "strict",
    expires: new Date(0), 
    path: "/",            
  });
  res.cookie(`refresh_token`, "", {
    httpOnly: true,     
    sameSite: "strict",
    expires: new Date(0), 
    path: "/",            
  });
};
