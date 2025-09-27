export const toggleCategorySelection = (
  categoryValue: string,
  selectedCategories: string[],
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>
) => {
  if (selectedCategories.includes(categoryValue)) {
    setSelectedCategories(
      selectedCategories.filter((cat) => cat !== categoryValue)
    );
  } else {
    setSelectedCategories([...selectedCategories, categoryValue]);
  }
};
