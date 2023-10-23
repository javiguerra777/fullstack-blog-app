/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import UseGetStoreUser from '../../../common/hooks/UseGetStoreUser';

type CommentFormProps = {
  post_id: number;
};
type CommentInput = {
  comment: string;
};
export default function CommentForm({ post_id }: CommentFormProps) {
  const { id } = UseGetStoreUser();
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<CommentInput>({
    mode: 'all',
  });
  const onSubmit: SubmitHandler<CommentInput> = (data) => {
    const payload = {
      comment: data.comment,
      post_id,
      user_id: id,
    };
    console.log(payload);
    reset();
  };
  return (
    <form
      className="w-full flex items-center fixed bottom-0 py-3 bg-black"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        id="comment"
        placeholder="Share your thoughts..."
        className="h-10 w-full rounded-l-lg px-2 ml-1 text-black"
        {...register('comment', { required: true })}
      />
      <button
        type="submit"
        disabled={!isValid}
        className={`h-10 w-20 rounded-r-lg mr-1 ${
          !isValid ? 'bg-gray-400' : 'bg-green-700'
        }`}
      >
        <i className="fa-solid fa-paper-plane" />
      </button>
    </form>
  );
}
