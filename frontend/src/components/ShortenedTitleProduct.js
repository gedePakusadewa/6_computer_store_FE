const ShortenedTitle = (title) => {
  let shortTitle = title.slice(0, 15);
  if (title.length > 15){
    shortTitle += "...";
  }

  return shortTitle;
}

export default ShortenedTitle 
