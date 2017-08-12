//This is the place to transform data in the format we want
export function authorsFormattedForDropdown (authors) {
  return authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });
}
