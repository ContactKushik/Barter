import React, { useState } from "react";
import CategorySelection from "./components/Categories";
import PostAdForm from "./components/PostAdForm";

const CreateAdPage = () => {
  const [category, setCategory] = useState(null);

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  return (
    <div className="container mx-auto p-4">
      {!category ? (
        <CategorySelection onSelectCategory={handleCategoryChange} />
      ) : (
        <PostAdForm
          category={category}
          onChangeCategory={() => setCategory(null)}
        />
      )}
    </div>
  );
};

export default CreateAdPage;
