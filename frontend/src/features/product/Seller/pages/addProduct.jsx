import React, { useState, useRef } from "react";
import ProductNavbar from "../components/ProductNavbar";
import ProductInfoCard from "../components/ProductInfoCard";
import ImageUploadCard from "../components/ImageUploadCard";
import PricingCard from "../components/PricingCard";
import VariantsCard from "../components/VariantsCard";
import ChecklistCard from "../components/ChecklistCard";
import PublishCard from "../components/PublishCard";
import useProduct from "../hooks/useProduct.hook";

const CURRENCIES = [
  { code: "INR", symbol: "₹", label: "Indian Rupee" },
  { code: "USD", symbol: "$", label: "US Dollar" },
  { code: "EUR", symbol: "€", label: "Euro" },
  { code: "GBP", symbol: "£", label: "British Pound" },
  { code: "JPY", symbol: "¥", label: "Japanese Yen" },
  { code: "PKR", symbol: "₨", label: "Pakistani Rupee" },
];

const CATEGORIES = ["Electronics", "Clothing", "Books", "Home", "Beauty", "Sports", "Other"];

const MAX_IMAGES = 7;
const MAX_VARIANT_IMAGES = 3;

const uid = () => `${Date.now()}-${Math.random()}`;

// Read a File into a preview object { id, file, preview } via FileReader.
const readPreview = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve({ id: uid(), file, preview: e.target.result });
    reader.readAsDataURL(file);
  });

const AddProduct = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    currency: "INR",
    stock: "",
  });
  const [images, setImages] = useState([]); // root: { id, file, preview }
  const [variants, setVariants] = useState([]); // { id, attributes:[{key,value}], price, currency, stock, images:[] }
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const fileInputRef = useRef(null);

  // Receipts cache so a failed /create retry does NOT re-upload already-uploaded groups.
  // { root: null | [{url,fileId,name}], variants: { [variantId]: [{...}] } }
  const uploadCache = useRef({ root: null, variants: {} });

  const { handleUploadImages, handleCreateProduct } = useProduct();

  const update = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const fieldClass = (field) => {
    if (errors[field]) return "border-red-500/40 bg-red-500/5";
    if (focused === field) return "border-[#ff6b35]/50 bg-[#ff6b35]/4 shadow-[0_0_0_3px_rgba(255,107,53,0.07)]";
    return "border-white/8 bg-white/3 hover:border-white/14";
  };

  // ---------- Root images ----------
  const handleImageAdd = async (files) => {
    const remaining = MAX_IMAGES - images.length;
    const arr = Array.from(files).slice(0, remaining);
    if (!arr.length) {
      alert(`Maximum ${MAX_IMAGES} photos allowed.`);
      return;
    }
    const items = await Promise.all(arr.map(readPreview));
    setImages((prev) => [...prev, ...items]);
    uploadCache.current.root = null; // images changed -> must re-upload on submit
  };

  const handleImageRemove = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    uploadCache.current.root = null;
  };

  const handleDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setDragging(false); };
  const handleDrop = (e) => { e.preventDefault(); setDragging(false); handleImageAdd(e.dataTransfer.files); };
  const handleFileChange = (e) => { handleImageAdd(e.target.files); e.target.value = ""; };

  // ---------- Variants ----------
  const addVariant = () =>
    setVariants((vs) => [
      ...vs,
      { id: uid(), attributes: [{ key: "", value: "" }], price: "", currency: form.currency, stock: "", images: [] },
    ]);

  const removeVariant = (id) => {
    setVariants((vs) => vs.filter((v) => v.id !== id));
    delete uploadCache.current.variants[id];
  };

  const updateVariantField = (id, key, value) =>
    setVariants((vs) => vs.map((v) => (v.id === id ? { ...v, [key]: value } : v)));

  const addVariantAttr = (id) =>
    setVariants((vs) => vs.map((v) => (v.id === id ? { ...v, attributes: [...v.attributes, { key: "", value: "" }] } : v)));

  const removeVariantAttr = (id, idx) =>
    setVariants((vs) => vs.map((v) => (v.id === id ? { ...v, attributes: v.attributes.filter((_, i) => i !== idx) } : v)));

  const updateVariantAttr = (id, idx, field, value) =>
    setVariants((vs) =>
      vs.map((v) =>
        v.id === id
          ? { ...v, attributes: v.attributes.map((a, i) => (i === idx ? { ...a, [field]: value } : a)) }
          : v,
      ),
    );

  const addVariantImages = async (id, files) => {
    const variant = variants.find((v) => v.id === id);
    if (!variant) return;
    const remaining = MAX_VARIANT_IMAGES - variant.images.length;
    const arr = Array.from(files).slice(0, remaining);
    if (!arr.length) {
      alert(`Maximum ${MAX_VARIANT_IMAGES} images per variant.`);
      return;
    }
    const items = await Promise.all(arr.map(readPreview));
    setVariants((vs) => vs.map((v) => (v.id === id ? { ...v, images: [...v.images, ...items] } : v)));
    uploadCache.current.variants[id] = undefined; // changed -> re-upload this group
  };

  const removeVariantImage = (id, idx) => {
    setVariants((vs) => vs.map((v) => (v.id === id ? { ...v, images: v.images.filter((_, i) => i !== idx) } : v)));
    uploadCache.current.variants[id] = undefined;
  };

  // ---------- Helpers ----------
  const attrsToObject = (attributes) =>
    attributes.reduce((obj, { key, value }) => {
      const k = key.trim();
      if (k) obj[k] = value;
      return obj;
    }, {});

  const validate = () => {
    const e = {};
    const t = form.title.trim();
    const d = form.description.trim();
    if (t.length < 5 || t.length > 100) e.title = "Title must be 5–100 characters";
    if (d.length < 20 || d.length > 1000) e.description = "Description must be 20–1000 characters";
    if (!form.category) e.category = "Select a category";
    if (!form.brand.trim()) e.brand = "Brand is required";
    if (form.price === "" || Number(form.price) < 0) e.price = "Enter a valid price";
    if (images.length === 0) e.images = "Add at least one product photo";
    if (!variants.length && (form.stock === "" || Number(form.stock) < 0)) e.stock = "Enter stock quantity";
    variants.forEach((v) => {
      if (v.price === "" || Number(v.price) < 0) e[`variant-${v.id}`] = "Each variant needs a valid price";
    });
    setErrors(e);
    if (Object.keys(e).length) {
      setSubmitError("Please fix the highlighted fields.");
      return false;
    }
    return true;
  };

  const clearFields = () => {
    setForm({ title: "", description: "", category: "", brand: "", price: "", currency: "INR", stock: "" });
    setImages([]);
    setVariants([]);
    setErrors({});
    setSubmitError("");
  };

  // ---------- Submit: upload-on-click, per-group, retry-safe ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return; // guard double-submit
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      // 1) Root images — upload only if not already uploaded this session.
      let root = uploadCache.current.root;
      if (!root) {
        root = await handleUploadImages(images.map((i) => i.file));
        uploadCache.current.root = root;
      }

      // 2) Variant images — one upload request per variant, skip cached groups.
      const variantReceipts = {};
      for (const v of variants) {
        if (uploadCache.current.variants[v.id]) {
          variantReceipts[v.id] = uploadCache.current.variants[v.id];
          continue;
        }
        if (v.images.length === 0) {
          variantReceipts[v.id] = [];
          uploadCache.current.variants[v.id] = [];
          continue;
        }
        const receipts = await handleUploadImages(v.images.map((i) => i.file));
        variantReceipts[v.id] = receipts;
        uploadCache.current.variants[v.id] = receipts;
      }

      // 3) Assemble JSON body matching the backend schema.
      const body = {
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category,
        brand: form.brand.trim(),
        price: { amount: Number(form.price), currency: form.currency },
        stock: Number(form.stock || 0),
        images: root.map((img, i) => ({
          url: img.url,
          fileId: img.fileId,
          alt: form.title.trim(),
          isThumbnail: i === 0,
        })),
        variants: variants.map((v) => ({
          attributes: attrsToObject(v.attributes),
          stock: Number(v.stock || 0),
          price: { amount: Number(v.price), currency: v.currency },
          images: (variantReceipts[v.id] || []).map((img, i) => ({
            url: img.url,
            fileId: img.fileId,
            alt: form.title.trim(),
            isThumbnail: i === 0,
          })),
        })),
      };

      // 4) Create. Throws on failure (uploadCache retained so retry skips uploads).
      await handleCreateProduct(body);

      clearFields();
      uploadCache.current = { root: null, variants: {} };
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || "Failed to create product. Please try again.";
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedCurrency = CURRENCIES.find((c) => c.code === form.currency);
  const hasVariants = variants.length > 0;

  const checklist = [
    { label: "Title (5–100 chars)", done: form.title.trim().length >= 5 && form.title.trim().length <= 100 },
    { label: "Description (20–1000 chars)", done: form.description.trim().length >= 20 && form.description.trim().length <= 1000 },
    { label: "Category selected", done: !!form.category },
    { label: "Brand added", done: !!form.brand.trim() },
    { label: "Price set", done: form.price !== "" && Number(form.price) >= 0 },
    { label: "At least 1 photo", done: images.length > 0 },
    {
      label: hasVariants ? "All variants priced" : "Stock set",
      done: hasVariants
        ? variants.every((v) => v.price !== "" && Number(v.price) >= 0)
        : form.stock !== "" && Number(form.stock) >= 0,
    },
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
                categories={CATEGORIES}
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
              <VariantsCard
                variants={variants}
                currencies={CURRENCIES}
                maxImages={MAX_VARIANT_IMAGES}
                errors={errors}
                onAdd={addVariant}
                onRemove={removeVariant}
                onField={updateVariantField}
                onAddImages={addVariantImages}
                onRemoveImage={removeVariantImage}
                onAddAttr={addVariantAttr}
                onRemoveAttr={removeVariantAttr}
                onAttr={updateVariantAttr}
              />
            </div>

            <div className="lg:col-span-2 flex flex-col gap-5">
              <PricingCard
                form={form}
                errors={errors}
                focused={focused}
                currencies={CURRENCIES}
                selectedCurrency={selectedCurrency}
                hasVariants={hasVariants}
                onUpdate={update}
                onFocus={setFocused}
                onBlur={() => setFocused(null)}
                fieldClass={fieldClass}
              />
              <ChecklistCard checklist={checklist} />
              {submitError && (
                <div className="rounded-xl border border-red-500/25 bg-red-500/8 px-4 py-3">
                  <p className="text-red-400 text-[12px] font-medium">{submitError}</p>
                </div>
              )}
              <PublishCard loading={submitting} allGood={allGood} />
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
