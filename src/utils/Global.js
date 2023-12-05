export const reducer = (state, action) => {
  return {
    ...state,
    [action.field]: action.payload
  }
}

export const roleFinder = (role) => {
  if (role === "merchant") {
    return {
      merchant: true,
      user: true
    }
  }
  if (role === "user") {
    return {
      merchant: false,
      user: true
    }
  }
}
export const removeEmptyValuesFromObject = (state, downloadUrl , field) => {
  const data = {};
  for (const key in state) {
    if (downloadUrl) {
      if (!state[field]) {
        data[field] = downloadUrl
      }
    }

    if (state.hasOwnProperty(key) && state[key] !== null && state[key] !== undefined && state[key] !== "") {
      data[key] = state[key];
    }
    if ((state.hasOwnProperty(key) && state[key] === "merchant") || (state.hasOwnProperty(key) && state[key] === "user")) {
      data[key] = roleFinder(state[key]);
    }
  }
  return data;
};
export const ImageNameGenerator = (image)=>{
    let name = "";
    const string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let i in string){
         const randomChar = string.charAt(Math.floor(Math.random()*string.length));
         name +=randomChar;
        }
        return image?.name?.split(".")[0] + name + new Date()
}

export const isDeletable =  (downloadUrl) =>{
  const excludedUrls = [
    "https://firebasestorage.googleapis.com/v0/b/eshops-bbba3.appspot.com/o/defaultImages%2Fad.jpg?alt=media&token=d0e7c922-9278-44f7-9758-2ca5c9f0a9d1",
    "https://firebasestorage.googleapis.com/v0/b/eshops-bbba3.appspot.com/o/defaultImages%2Fbanner.jpg?alt=media&token=4163ddbe-2c00-44be-b3d8-53c1598897f3",
    "https://firebasestorage.googleapis.com/v0/b/eshops-bbba3.appspot.com/o/defaultImages%2Ffallback.jpg?alt=media&token=483a2d3c-92cf-4c7a-83ac-6cdc582428f9"
  ]
const res = excludedUrls.includes(downloadUrl);
    return res
}

