import React, { useEffect, useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import MetaData from '../layout/MetaData'
import { useNavigate, useParams } from 'react-router-dom'
import { FOOD_CATEGORIES } from '../../constants/constants'
import {  useGetFoodDetailsQuery, useUpdateFoodMutation } from '../../redux/api/foodApi'
import toast from 'react-hot-toast'

const UpdateFood = () => {
  const navigate = useNavigate()
  const params = useParams()

  const [food, setFood] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    seller: '',
  })

  const [errors, setErrors] = useState({})

  const { name, description, price, category, stock, seller } = food

  const [updateFood, { isLoading, error, isSuccess }] = useUpdateFoodMutation()

  const {data}  = useGetFoodDetailsQuery(params?.id)

  useEffect(() => {
    if (data?.food) {
        setFood({
          name: data?.food?.name,
          description: data?.food?.description,
          price: data?.food?.price,
          category: data?.food?.category,
          stock: data?.food?.stock,
          seller: data?.food?.seller,
        });
    }

    if (error) toast.error(error?.data?.message)
    if (isSuccess) {
      toast.success('Food Item updated')
      navigate('/admin/foods')
    }
  }, [error, isSuccess, navigate, data])

  const validate = () => {
    const newErrors = {}

    if (!name.trim()) newErrors.name = 'Name is required'
    if (!description.trim()) newErrors.description = 'Description is required'
    if (!price || isNaN(price)) newErrors.price = 'Valid price is required'
    if (!stock || isNaN(stock)) newErrors.stock = 'Valid stock count is required'
    if (!category) newErrors.category = 'Category must be selected'
    if (!seller.trim()) newErrors.seller = 'Seller name is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onChange = (e) => {
    setFood({ ...food, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' }) // clear error on change
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (!validate()) return
    updateFood({ id: params?.id, body: food })
  }

  return (
    <AdminLayout>
      <MetaData title="Update Food" />
      <div className="container-fluid px-3 px-md-5 py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-7">
            <div className="shadow rounded p-4 p-md-5 bg-white">
              <h2 className="mb-4 text-center fw-bold text-danger">
                Update Food Item
              </h2>
              <form onSubmit={submitHandler} noValidate>
                {/* Name */}
                <div className="mb-3">
                  <label htmlFor="name_field" className="form-label fw-semibold">
                    Food Name
                  </label>
                  <input
                    type="text"
                    id="name_field"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    name="name"
                    value={name}
                    onChange={onChange}
                    placeholder="Enter food name"
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label htmlFor="description_field" className="form-label fw-semibold">
                    Description
                  </label>
                  <textarea
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    id="description_field"
                    rows="5"
                    name="description"
                    value={description}
                    onChange={onChange}
                    placeholder="Short description of the food..."
                  ></textarea>
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>

                {/* Price & Stock */}
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="price_field" className="form-label fw-semibold">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      id="price_field"
                      className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                      name="price"
                      value={price}
                      onChange={onChange}
                      placeholder="e.g. 10.99"
                    />
                    {errors.price && (
                      <div className="invalid-feedback">{errors.price}</div>
                    )}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="stock_field" className="form-label fw-semibold">
                      Stock
                    </label>
                    <input
                      type="number"
                      id="stock_field"
                      className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                      name="stock"
                      value={stock}
                      onChange={onChange}
                      placeholder="e.g. 25"
                      min={0}
                    />
                    {errors.stock && (
                      <div className="invalid-feedback">{errors.stock}</div>
                    )}
                  </div>
                </div>

                {/* Category & Seller */}
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="category_field" className="form-label fw-semibold">
                      Category
                    </label>
                    <select
                      className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                      id="category_field"
                      name="category"
                      value={category}
                      onChange={onChange}
                    >
                      <option value="">-- Select Category --</option>
                      {FOOD_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <div className="invalid-feedback">{errors.category}</div>
                    )}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="seller_field" className="form-label fw-semibold">
                      Seller Name
                    </label>
                    <input
                      type="text"
                      id="seller_field"
                      className={`form-control ${errors.seller ? 'is-invalid' : ''}`}
                      name="seller"
                      value={seller}
                      onChange={onChange}
                      placeholder="e.g. Chef Mike"
                    />
                    {errors.seller && (
                      <div className="invalid-feedback">{errors.seller}</div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-danger py-2"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Updating...' : 'UPDATE FOOD ITEM'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default UpdateFood;