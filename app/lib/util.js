export function capitalizeFirstLetter(word) {
  if (!word || word.length < 1) {
    return word;
  } else if (word.length === 1) {
    return word.charAt(0).toUpperCase() + "";
  }

  return word.charAt(0).toUpperCase() + word.slice(1);
}
