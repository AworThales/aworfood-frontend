import React, { useEffect, useRef, useState } from 'react';
import AdminLayout from '../layout/AdminLayout';
import MetaData from '../layout/MetaData';
import { useDeleteFoodImageMutation, useGetFoodDetailsQuery, useUploadFoodImagesMutation } from '../../redux/api/foodApi';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast'


const UploadImages = () => {
    const params = useParams();
    const naviagte = useNavigate();
    const fileInputRef = useRef(null)

    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);

    const [uploadFoodImages, {isLoading, error, isSuccess }] = useUploadFoodImagesMutation()

    const [deleteFoodImage, {isLoading: isDeleteLoading, error: deleteError, isSuccess: deleteSuccess}] = useDeleteFoodImageMutation();

    const {data} = useGetFoodDetailsQuery(params?.id);
    console.log(data)

    useEffect(() => {
        if (data?.food) {
            setUploadedImages(data?.food.images);
        }
        if (error) toast.error(error?.data?.message)
        
        if(deleteError) {
            toast.error(deleteError?.data.message)
        }

        if(deleteSuccess) {
            toast.success("Images deleted successfully")
        }
        
        if (isSuccess) {
        setImagesPreview([])
        toast.success('Images Uploaded Successfully!')
        naviagte('/admin/foods')
        }
    },[data, error, isSuccess, naviagte, deleteError, deleteSuccess]);

    const onChangeImages = (e) => {
        const files = Array.from(e.target.files);

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
              if (reader.readyState === 2) {
                setImagesPreview((oldArray) => [...oldArray, reader.result]);
                setImages((oldArray) => [...oldArray, reader.result]);
              }
            };
            reader.readAsDataURL(file);
          });
    }

    // clearing existing file input
    const handleResetFileInput = () => {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
    };

    const handleImagesPreviewDelete = (image) => {
        const filteredImagesPreview = imagesPreview.filter(img => img != image);
        setImages(filteredImagesPreview);
        setImagesPreview(filteredImagesPreview);
    }

    const submitHandler = (e) => {
        e.preventDefault();
    
        uploadFoodImages({ id: params?.id, body: { images } });
    };
    
    const HandleDeleteImage = (imgId) => {
        deleteFoodImage({ id: params?.id, body: { imgId } });
    };
    

  return (
    <AdminLayout>
     
      <MetaData title="Upload Images" />

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <form className="shadow p-4 rounded bg-light" encType="multipart/form-data" onSubmit={submitHandler}>
              <h2 className="mb-4 text-center">Upload Food Images</h2>

              <div className="mb-4">
                <label htmlFor="customFile" className="form-label fw-bold">Choose Images</label>
                <input
                ref={fileInputRef}
                  type="file"
                  name="product_images"
                  className="form-control"
                  id="customFile"
                  multiple
                  onChange={onChangeImages}
                  onClick={handleResetFileInput}
                />
              </div>

              {imagesPreview?.length > 0 && (
                <div className="new-images my-4">
                    <h5 className="text-warning fw-semibold">New Images:</h5>
                    <div className="row g-3 mt-2">
                        {imagesPreview?.map((img) => (
                            <div className="col-6 col-md-4 col-lg-3">
                                <div className="card">
                                <img
                                    src={img}
                                    alt="Preview"
                                    className="card-img-top p-2"
                                    style={{ width: '100%', height: '100px', objectFit: 'contain' }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-danger w-100 py-1"
                                    onClick={() => handleImagesPreviewDelete(img)}
                                >
                                    <i className="fa fa-times"></i> Remove
                                </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
              )}

              {uploadedImages?.length > 0 && (
                <div className="uploaded-images my-4">
                    <h5 className="text-success fw-semibold">Food Uploaded Images:</h5>
                    <div className="row g-3 mt-2">
                        {uploadedImages?.map((img) => (
                            <div className="col-6 col-md-4 col-lg-3">
                                <div className="card">
                                <img
                                    src={img?.url}
                                    alt="Uploaded"
                                    className="card-img-top p-2"
                                    style={{ width: '100%', height: '100px', objectFit: 'cover' }}
                                />
                                <button
                                    className="btn btn-danger w-100 py-1"
                                    disabled={isLoading || isDeleteLoading}
                                    type="button"
                                    onClick={() => HandleDeleteImage(img?.public_id)}
                                >
                                    <i className="fa fa-trash"></i> Delete
                                </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
              )}

              <button disabled={isLoading || isDeleteLoading} type="submit" className="btn btn-danger w-100 py-2">
                {isLoading ? "Uploading" : "Upload"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UploadImages;
