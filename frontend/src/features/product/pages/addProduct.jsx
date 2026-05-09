import React, { useState, useRef } from "react";
import ProductNavbar from "../components/ProductNavbar";
import ProductInfoCard from "../components/ProductInfoCard";
import ImageUploadCard from "../components/ImageUploadCard";
import PricingCard from "../components/PricingCard";
import ChecklistCard from "../components/ChecklistCard";
import PublishCard from "../components/PublishCard";
import useProduct from "../hooks/useProduct.hook";

const CURRENCIES = [
  { code: "INR", symbol: "₹", label: "Indian Rupee" },
  { code: "USD", symbol: "$", label: "US Dollar" },
  { code: "EUR", symbol: "€", label: "Euro" },
  { code: "GBP", symbol: "£", label: "British Pound" },
  { code: "AED", symbol: "د.إ", label: "UAE Dirham" },
];

const MAX_IMAGES = 7;

const AddProduct = () => {
  const [form, setForm] = useState({ title: "", description: "", price: "", currency: "INR" });
  const [images, setImages] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const update = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const fieldClass = (field) => {
    if (errors[field]) return "border-red-500/40 bg-red-500/5";
    if (focused === field) return "border-[#ff6b35]/50 bg-[#ff6b35]/4 shadow-[0_0_0_3px_rgba(255,107,53,0.07)]";
    return "border-white/8 bg-white/3 hover:border-white/14";
  };

  const handleImageAdd = (files) => {
    const remaining = MAX_IMAGES - images.length;
    const arr = Array.from(files).slice(0, remaining);

    if (!arr.length) {
      alert(`Maximum ${MAX_IMAGES} photos allowed.`);
      return;
    }

    arr.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages((prev) => [
          ...prev,
          { id: `${Date.now()}-${Math.random()}`, file, preview: e.target.result },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageRemove = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e) => { 
		e.preventDefault(); 
		setDragging(true); 
	};

  const handleDragLeave = (e) => { 
		e.preventDefault(); 
		setDragging(false); 
	};
	
  const handleDrop = (e) => { 
		e.preventDefault(); 
		setDragging(false); 
		handleImageAdd(e.dataTransfer.files); 
	};
  const handleFileChange = (e) => { 
		handleImageAdd(e.target.files); 
		e.target.value = ""; 
	};

	const {handleCreateProduct} = useProduct();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.price || images.length === 0) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    // TODO: connect to useProduct hook
		const formData = new FormData();
		formData.append("title", form.title);
		formData.append("description", form.description);
		formData.append("priceAmount", form.price);
		formData.append("priceCurrency", form.currency);
		images.forEach(
			(img) =>
				formData.append("images", img.file)
		);
    // Debug: Check what's actually in formData
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    
    try{
      handleCreateProduct(formData);
    }catch(err){
      console.warning("Error creating product:", err);
      alert("Failed to create product. Please try again.");
    }finally{
      setLoading(false);
    }

    clearFileds();
  };

  function clearFileds(){
    setForm({ title: "", description: "", price: "", currency: "INR" });
    setImages([]);
    setErrors({});
  }

  const selectedCurrency = CURRENCIES.find((c) => c.code === form.currency);

  const checklist = [
    { label: "Title (5–100 chars)", done: form.title.length >= 5 && form.title.length <= 100 },
    { label: "Description (20–1000 chars)", done: form.description.length >= 20 && form.description.length <= 1000 },
    { label: "Price set", done: form.price !== "" && Number(form.price) >= 0 },
    { label: "At least 1 photo", done: images.length > 0 },
  ];

  const allGood = checklist.every((c) => c.done);

  return (
    <div className="min-h-screen bg-[#07090F] font-['Inter',system-ui,sans-serif]">
      <ProductNavbar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

            <div className="lg:col-span-3 flex flex-col gap-5">
              <ProductInfoCard
                form={form}
                errors={errors}
                focused={focused}
                onUpdate={update}
                onFocus={setFocused}
                onBlur={() => setFocused(null)}
                fieldClass={fieldClass}
              />
              <ImageUploadCard
                images={images}
                dragging={dragging}
                maxImages={MAX_IMAGES}
                fileInputRef={fileInputRef}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onFileChange={handleFileChange}
                onImageRemove={handleImageRemove}
              />
            </div>

            <div className="lg:col-span-2 flex flex-col gap-5">
              <PricingCard
                form={form}
                errors={errors}
                focused={focused}
                currencies={CURRENCIES}
                selectedCurrency={selectedCurrency}
                onUpdate={update}
                onFocus={setFocused}
                onBlur={() => setFocused(null)}
                fieldClass={fieldClass}
              />
              <ChecklistCard checklist={checklist} />
              <PublishCard loading={loading} allGood={allGood} />
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
