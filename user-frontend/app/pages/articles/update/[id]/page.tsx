'use client'
import { useRouter } from 'next/navigation';
import { PG } from '@/app/component/common/enums/PG';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { jwtDecode } from 'jwt-decode';
import { parseCookies } from 'nookies';
import { Typography } from '@mui/material';
import { articleDeleteById, findArticleById, modifyArticle } from '@/app/component/article/service/article-service';
import { findAllBoards } from '@/app/component/board/service/board-service';
import { getArticleById, getArticleSave } from '@/app/component/article/service/article-slice';
import { getAllBoards } from '@/app/component/board/service/board-slice';
import { IArticle } from '@/app/component/article/model/article';

export default function ArticleUpdatePage({ params }: any) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const result = useSelector(getArticleSave);
  const getArticle: IArticle = useSelector(getArticleById);

  useEffect(() => {
    dispatch(findArticleById(params.id)).then((res: any) => {
      setValue('title', res.payload.title);
      setValue('content', res.payload.content);
    });
    console.log("토큰을 jwtDecode(언박싱)한 내용" + JSON.stringify(jwtDecode<any>(parseCookies().accessToken)));
  }, [dispatch, params.id, setValue]);

  const onSubmit = (data: any) => {
    console.log(JSON.stringify(data));
    dispatch(modifyArticle(data))
      .then((res: any) => {
        alert('게시글 수정 완료');
        console.log(res.payload);
        router.back();
      })
      .catch((err: any) => {
        console.log("실패");
      });
  };

  const handleCancel = () => {
    alert('게시글 수정 취소');
    router.back();
  };

  const handleDelete = () => {
    console.log('삭제Id' + params.id);
    dispatch(articleDeleteById(params.id))
      .then((res: any) => {
        if (res.payload.message === "SUCCESS") {
          alert('게시글 삭제 완료');
          router.back();
        } else {
          alert('게시글 삭제 실패');
        }
      })
      .catch((err: any) => {
        console.log("실패");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="relative bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <button
          className="absolute top-4 right-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleDelete}
        >
          Delete
        </button>

        <Typography textAlign="center" sx={{ fontSize: "1.5rem", marginBottom: "1rem" }}>{params.id}번 게시글</Typography>

        <input {...register('userId', { required: true, maxLength: 30 })} type="hidden" value={JSON.stringify(jwtDecode<any>(parseCookies().accessToken).userId)} />
        <input {...register('id', { required: true, maxLength: 30 })} type="hidden" value={params.id} />

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
          <input
            {...register('title', { required: true, maxLength: 30 })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter the title"
          />
          {errors.title && <p className="text-red-500 text-xs italic">Please enter a title.</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">Content</label>
          <textarea
            {...register('content', { required: true, maxLength: 300 })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="content"
            placeholder="Describe everything about this post here"
            rows={6}
          ></textarea>
          {errors.content && <p className="text-red-500 text-xs italic">Please enter the content.</p>}
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
